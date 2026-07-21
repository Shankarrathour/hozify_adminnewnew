const fs = require('fs');
const { execSync } = require('child_process');

// Find all JSX files
const files = execSync('dir /s /b *.jsx').toString().split('\r\n').filter(Boolean);

let updatedFiles = 0;

files.forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  let original = c;

  // Regex to match the common redundant header blocks in the dashboards
  // It looks for {/* ── HEADER ── */} or {/* ── PAGE HEADER ── */}
  // followed by a div containing an h1 and optional p, closing the div.
  
  const headerRegex = /\{\/\* ── (?:PAGE )?HEADER ── \*\/\}\s*<div style=\{\{\s*marginBottom:\s*(?:16|18)\s*\}\}>\s*<h1[^>]*>.*?<\/h1>\s*(?:<p[^>]*>.*?<\/p>\s*)?<\/div>/g;
  
  if (headerRegex.test(c)) {
    c = c.replace(headerRegex, '');
    fs.writeFileSync(f, c);
    console.log('Removed header from:', f);
    updatedFiles++;
  }
});

console.log('Total files updated:', updatedFiles);
