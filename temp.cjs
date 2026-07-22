const fs = require('fs');
const path = require('path');

function searchDir(dir, results) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      searchDir(fullPath, results);
    } else if (fullPath.endsWith('.jsx') && (file.includes('Dashboard') || file.includes('Analytics') || file === 'index.jsx' || file.includes('ActivityCenter'))) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('Export Report')) continue; 
      
      const hasFilterActions = /className=[\"'][^\"']*filter-actions[\"']/.test(content);
      const hasDashFilters = /className=[\"'][^\"']*dash-filters[\"']/.test(content);
      
      results.push({ file: fullPath, hasFilterActions, hasDashFilters });
    }
  }
}

const results = [];
searchDir('src/pages', results);
console.log(JSON.stringify(results, null, 2));
