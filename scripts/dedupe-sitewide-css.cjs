const fs = require('node:fs');
const path = require('node:path');

const root = process.cwd();
const ignored = new Set(['node_modules', '.git', '.vercel']);
let filesChanged = 0;
let linksRemoved = 0;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
      continue;
    }
    if (!entry.isFile() || !entry.name.endsWith('.html')) continue;

    const html = fs.readFileSync(full, 'utf8');
    let kept = false;
    let removed = 0;
    const updated = html.replace(/<link\b(?=[^>]*href=["']\/assets\/draftsrush-sitewide\.css["'])[^>]*>/gi, (tag) => {
      if (!kept) {
        kept = true;
        return tag;
      }
      removed += 1;
      return '';
    });
    if (removed > 0) {
      fs.writeFileSync(full, updated);
      filesChanged += 1;
      linksRemoved += removed;
      console.log(path.relative(root, full).split(path.sep).join('/') + ': removed ' + removed);
    }
  }
}

walk(root);
console.log('Files changed: ' + filesChanged);
console.log('Duplicate stylesheet links removed: ' + linksRemoved);
