const fs = require('node:fs');
const path = require('node:path');

const ROOT = process.cwd();
const PUBLIC_ORIGIN = 'https://www.draftsrush.com';
const SKIP = new Set(['.git', 'node_modules', '.vercel']);
const htmlFiles = [];
const issues = [];
const stats = { htmlFiles: 0, tailwindCdnPages: [], canonicalMissing: [], canonicalMultiple: [], titleMissing: [], titleDuplicate: [], descriptionMissing: [], socialMetadataMissing: [], h1Missing: [], h1Multiple: [], sitemap: { entries: 0, missingLoc: 0, duplicateUrls: [], nonCanonicalHost: [], pathsWithoutFile: [] } };

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.isFile() && entry.name.endsWith('.html')) htmlFiles.push(full);
  }
}
function rel(file) { return path.relative(ROOT, file).split(path.sep).join('/'); }
function report(list, file, note) { list.push({ file: rel(file), note }); }
walk(ROOT);
stats.htmlFiles = htmlFiles.length;

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const titleMatches = [...html.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)];
  const descMatches = [...html.matchAll(/<meta\b(?=[^>]*\bname\s*=\s*["']description["'])[^>]*>/gi)];
  const canonicalMatches = [...html.matchAll(/<link\b(?=[^>]*\brel\s*=\s*["']canonical["'])[^>]*>/gi)];
  const h1Count = (html.match(/<h1\b/gi) || []).length;
  if (/cdn\.tailwindcss\.com/i.test(html)) stats.tailwindCdnPages.push(rel(file));
  if (!canonicalMatches.length) stats.canonicalMissing.push(rel(file));
  if (canonicalMatches.length > 1) stats.canonicalMultiple.push({ file: rel(file), count: canonicalMatches.length });
  if (!titleMatches.length || !titleMatches[0][1].trim()) stats.titleMissing.push(rel(file));
  if (titleMatches.length > 1) stats.titleDuplicate.push({ file: rel(file), count: titleMatches.length });
  if (!descMatches.length) stats.descriptionMissing.push(rel(file));
  if (!/property\s*=\s*["']og:title["']/i.test(html) || !/property\s*=\s*["']og:description["']/i.test(html)) stats.socialMetadataMissing.push(rel(file));
  if (h1Count === 0) stats.h1Missing.push(rel(file));
  if (h1Count > 1) stats.h1Multiple.push({ file: rel(file), count: h1Count });
}

const sitemapPath = path.join(ROOT, 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  const xml = fs.readFileSync(sitemapPath, 'utf8');
  const blocks = [...xml.matchAll(/<url\b[^>]*>([\s\S]*?)<\/url>/gi)].map(m => m[1]);
  const urls = [];
  for (const block of blocks) {
    const loc = (block.match(/<loc>\s*([^<]+)\s*<\/loc>/i) || [])[1];
    if (!loc) { stats.sitemap.missingLoc++; continue; }
    const url = loc.trim(); urls.push(url);
    try {
      const parsed = new URL(url);
      if (parsed.hostname !== 'www.draftsrush.com' || parsed.protocol !== 'https:' || parsed.search || parsed.hash) stats.sitemap.nonCanonicalHost.push(url);
      const pathname = parsed.pathname === '/' ? 'index.html' : parsed.pathname.replace(/^\//, '') + '.html';
      const candidate = path.join(ROOT, pathname);
      const toolCandidate = path.join(ROOT, parsed.pathname.replace(/^\//, ''));
      if (!fs.existsSync(candidate) && !fs.existsSync(toolCandidate)) stats.sitemap.pathsWithoutFile.push({ url, expected: pathname });
    } catch { stats.sitemap.nonCanonicalHost.push(url); }
  }
  stats.sitemap.entries = blocks.length;
  const seen = new Set();
  for (const url of urls) {
    if (seen.has(url)) stats.sitemap.duplicateUrls.push(url);
    seen.add(url);
  }
} else {
  stats.sitemap.missingFile = true;
}

const outPath = path.join(ROOT, 'technical-seo-audit.json');
fs.writeFileSync(outPath, JSON.stringify(stats, null, 2) + '\n');
console.log(JSON.stringify({
  scannedHtmlFiles: stats.htmlFiles,
  tailwindCdnPages: stats.tailwindCdnPages.length,
  canonicalMissing: stats.canonicalMissing.length,
  canonicalMultiple: stats.canonicalMultiple.length,
  titleMissing: stats.titleMissing.length,
  titleDuplicate: stats.titleDuplicate.length,
  descriptionMissing: stats.descriptionMissing.length,
  socialMetadataMissing: stats.socialMetadataMissing.length,
  h1Missing: stats.h1Missing.length,
  h1Multiple: stats.h1Multiple.length,
  sitemapEntries: stats.sitemap.entries,
  sitemapMissingLoc: stats.sitemap.missingLoc,
  sitemapDuplicateUrls: stats.sitemap.duplicateUrls.length,
  sitemapNonCanonicalHost: stats.sitemap.nonCanonicalHost.length,
  sitemapPathsWithoutFile: stats.sitemap.pathsWithoutFile.length,
  report: 'technical-seo-audit.json'
}, null, 2));
