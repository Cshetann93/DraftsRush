const fs = require('node:fs');
const path = require('node:path');

const root = process.cwd();
const ignored = new Set(['node_modules', '.git', '.vercel']);
const htmlFiles = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.isFile() && entry.name.endsWith('.html')) htmlFiles.push(full);
  }
}

walk(root);
const duplicates = [];
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const matches = html.match(/href=["']\/assets\/draftsrush-sitewide\.css["']/gi) || [];
  if (matches.length > 1) duplicates.push({ file: path.relative(root, file).split(path.sep).join('/'), count: matches.length });
}

console.log('HTML files scanned: ' + htmlFiles.length);
console.log('Pages with duplicate sitewide stylesheet links: ' + duplicates.length);
for (const item of duplicates) console.log(item.file + ': ' + item.count + ' references');
fs.writeFileSync('sitewide-css-duplicate-audit.json', JSON.stringify({ scanned: htmlFiles.length, duplicates }, null, 2) + '\n');
if (duplicates.length) process.exitCode = 1;
