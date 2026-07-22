const fs = require('fs');
const path = require('path');

function findFiles(dir, filter, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findFiles(filePath, filter, fileList);
    } else if (filter.test(filePath)) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

const allJSX = findFiles('src/pages', /\.jsx$/);
let updatedFiles = 0;

allJSX.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let original = content;

  // Replace overflowX: 'auto' with overflowY: 'auto', maxHeight: '400px'
  // Also handle double quotes
  content = content.replace(/overflowX\s*:\s*['"]auto['"]/g, "overflowY: 'auto', maxHeight: '400px'");

  if (content !== original) {
    fs.writeFileSync(f, content);
    console.log('Updated:', f);
    updatedFiles++;
  }
});

console.log('Total files updated:', updatedFiles);
