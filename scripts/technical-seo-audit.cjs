const fs = require('node:fs');
const path = require('node:path');

const ROOT = process.cwd();
const ORIGIN = 'https://www.draftsrush.com';
const SKIP = new Set(['.git', 'node_modules', '.vercel', '.next']);
const htmlFiles = [];
const stats = {
  htmlFiles: 0,
  tailwindCdnPages: [],
  canonicalMissing: [],
  canonicalMultiple: [],
  canonicalInvalid: [],
  titleMissing: [],
  titleMultiple: [],
  descriptionMissing: [],
  socialMetadataMissing: [],
  h1Missing: [],
  h1Multiple: [],
  sitemap: {
    entries: 0,
    missingLoc: 0,
    duplicateUrls: [],
    nonCanonicalUrls: [],
    pathsWithoutFile: [],
    liveFetchFailures: [],
    liveNon200: [],
    liveRedirects: [],
    liveCanonicalMissing: [],
    liveCanonicalMismatch: [],
    liveCanonicalMultiple: []
  }
};

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.isFile() && entry.name.endsWith('.html')) htmlFiles.push(full);
  }
}
function rel(file) {
  return path.relative(ROOT, file).split(path.sep).join('/');
}
function attr(tag, name) {
  const match = tag.match(new RegExp('\\b' + name + '\\s*=\\s*(?:"([^"]*)"|\\'([^\\']*)\\'|([^\\s>]+))', 'i'));
  return match ? (match[1] ?? match[2] ?? match[3] ?? '').trim() : '';
}
function normalizeUrl(value) {
  const url = new URL(value);
  url.hash = '';
  url.search = '';
  if (url.pathname !== '/') url.pathname = url.pathname.replace(/\/+$/, '');
  return url.href;
}
function canonicalTags(html) {
  return [...html.matchAll(/<link\b[^>]*>/gi)]
    .map(match => match[0])
    .filter(tag => /\brel\s*=\s*["']?canonical["']?/i.test(tag));
}
function recordPageMetadata(file, html) {
  const titleMatches = [...html.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)];
  const descriptions = [...html.matchAll(/<meta\b[^>]*>/gi)]
    .map(match => match[0])
    .filter(tag => /\bname\s*=\s*["']description["']/i.test(tag));
  const canonicals = canonicalTags(html);
  const h1Count = (html.match(/<h1\b/gi) || []).length;

  if (/cdn\.tailwindcss\.com/i.test(html)) stats.tailwindCdnPages.push(rel(file));
  if (!canonicals.length) stats.canonicalMissing.push(rel(file));
  if (canonicals.length > 1) stats.canonicalMultiple.push({ file: rel(file), count: canonicals.length });
  if (canonicals.length === 1 && !attr(canonicals[0], 'href')) stats.canonicalInvalid.push(rel(file));
  if (!titleMatches.length || !titleMatches[0][1].trim()) stats.titleMissing.push(rel(file));
  if (titleMatches.length > 1) stats.titleMultiple.push({ file: rel(file), count: titleMatches.length });
  if (!descriptions.length) stats.descriptionMissing.push(rel(file));
  if (!/property\s*=\s*["']og:title["']/i.test(html) || !/property\s*=\s*["']og:description["']/i.test(html)) {
    stats.socialMetadataMissing.push(rel(file));
  }
  if (h1Count === 0) stats.h1Missing.push(rel(file));
  if (h1Count > 1) stats.h1Multiple.push({ file: rel(file), count: h1Count });
}

async function fetchWithTimeout(url) {
  return fetch(url, {
    redirect: 'follow',
    signal: AbortSignal.timeout(12000),
    headers: { 'user-agent': 'DraftsRush-Technical-SEO-Audit/1.0' }
  });
}

async function auditLiveUrl(url) {
  try {
    let response = await fetchWithTimeout(url);
    if (response.status === 405 || response.status === 403) {
      response = await fetch(url, {
        method: 'GET',
        redirect: 'follow',
        signal: AbortSignal.timeout(12000),
        headers: { 'user-agent': 'DraftsRush-Technical-SEO-Audit/1.0' }
      });
    }
    if (response.url && normalizeUrl(response.url) !== normalizeUrl(url)) {
      stats.sitemap.liveRedirects.push({ url, finalUrl: response.url, status: response.status });
    }
    if (response.status !== 200) {
      stats.sitemap.liveNon200.push({ url, status: response.status, finalUrl: response.url });
    }
    const contentType = response.headers.get('content-type') || '';
    if (response.status === 200 && contentType.includes('text/html')) {
      const html = await response.text();
      const tags = canonicalTags(html);
      if (!tags.length) {
        stats.sitemap.liveCanonicalMissing.push(url);
      } else if (tags.length > 1) {
        stats.sitemap.liveCanonicalMultiple.push({ url, count: tags.length });
      } else {
        const href = attr(tags[0], 'href');
        try {
          const canonical = new URL(href, response.url).href;
          if (normalizeUrl(canonical) !== normalizeUrl(url)) {
            stats.sitemap.liveCanonicalMismatch.push({ url, canonical });
          }
        } catch {
          stats.sitemap.liveCanonicalMismatch.push({ url, canonical: href || '(empty or invalid href)' });
        }
      }
    }
  } catch (error) {
    stats.sitemap.liveFetchFailures.push({ url, error: error.name + ': ' + error.message });
  }
}

async function main() {
  walk(ROOT);
  stats.htmlFiles = htmlFiles.length;

  for (const file of htmlFiles) {
    recordPageMetadata(file, fs.readFileSync(file, 'utf8'));
  }

  const sitemapPath = path.join(ROOT, 'sitemap.xml');
  const urls = [];
  if (fs.existsSync(sitemapPath)) {
    const xml = fs.readFileSync(sitemapPath, 'utf8');
    const blocks = [...xml.matchAll(/<url\b[^>]*>([\s\S]*?)<\/url>/gi)].map(match => match[1]);
    stats.sitemap.entries = blocks.length;

    for (const block of blocks) {
      const loc = (block.match(/<loc>\s*([^<]+)\s*<\/loc>/i) || [])[1];
      if (!loc) {
        stats.sitemap.missingLoc++;
        continue;
      }
      const url = loc.trim();
      urls.push(url);
      try {
        const parsed = new URL(url);
        if (parsed.hostname !== 'www.draftsrush.com' || parsed.protocol !== 'https:' || parsed.search || parsed.hash) {
          stats.sitemap.nonCanonicalUrls.push(url);
        }
        const pathname = decodeURIComponent(parsed.pathname);
        const candidate = path.join(ROOT, pathname === '/' ? 'index.html' : pathname.replace(/^\//, '') + '.html');
        const extensionlessCandidate = path.join(ROOT, pathname.replace(/^\//, ''));
        if (!fs.existsSync(candidate) && !fs.existsSync(extensionlessCandidate)) {
          stats.sitemap.pathsWithoutFile.push({ url, expected: path.relative(ROOT, candidate).split(path.sep).join('/') });
        }
      } catch {
        stats.sitemap.nonCanonicalUrls.push(url);
      }
    }

    const seen = new Set();
    for (const url of urls) {
      if (seen.has(url)) stats.sitemap.duplicateUrls.push(url);
      seen.add(url);
    }
  } else {
    stats.sitemap.missingFile = true;
  }

  // Live checks are report-only: transient network errors must not break the static build.
  for (let i = 0; i < urls.length; i += 5) {
    await Promise.all(urls.slice(i, i + 5).map(auditLiveUrl));
  }

  const output = path.join(ROOT, 'technical-seo-audit.json');
  fs.writeFileSync(output, JSON.stringify(stats, null, 2) + '\n');

  const summary = {
    scannedHtmlFiles: stats.htmlFiles,
    tailwindCdnPages: stats.tailwindCdnPages.length,
    canonicalMissing: stats.canonicalMissing.length,
    canonicalMultiple: stats.canonicalMultiple.length,
    canonicalInvalid: stats.canonicalInvalid.length,
    titleMissing: stats.titleMissing.length,
    titleMultiple: stats.titleMultiple.length,
    descriptionMissing: stats.descriptionMissing.length,
    socialMetadataMissing: stats.socialMetadataMissing.length,
    h1Missing: stats.h1Missing.length,
    h1Multiple: stats.h1Multiple.length,
    sitemapEntries: stats.sitemap.entries,
    sitemapMissingLoc: stats.sitemap.missingLoc,
    sitemapDuplicateUrls: stats.sitemap.duplicateUrls.length,
    sitemapNonCanonicalUrls: stats.sitemap.nonCanonicalUrls.length,
    sitemapPathsWithoutFile: stats.sitemap.pathsWithoutFile.length,
    liveFetchFailures: stats.sitemap.liveFetchFailures.length,
    liveNon200: stats.sitemap.liveNon200.length,
    liveRedirects: stats.sitemap.liveRedirects.length,
    liveCanonicalMissing: stats.sitemap.liveCanonicalMissing.length,
    liveCanonicalMismatch: stats.sitemap.liveCanonicalMismatch.length,
    liveCanonicalMultiple: stats.sitemap.liveCanonicalMultiple.length,
    report: 'technical-seo-audit.json'
  };
  console.log(JSON.stringify(summary, null, 2));
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
