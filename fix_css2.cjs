const fs = require('fs');
let content = fs.readFileSync('src/styles.css', 'utf8');

const regex = /\.admin-dash-charts-row\s*\{\s*display:\s*grid;\s*grid-template-columns:\s*1fr;\s*gap:\s*14px;\s*\}\s*@media\s*\(max-width:\s*1300px\)\s*\{\s*\.admin-dash-charts-row\s*\{\s*grid-template-columns:\s*1fr;\s*\}\s*\}/s;

const goodChunk = `.admin-dash-charts-row {
  display: grid;
  grid-template-columns: 1fr 320px 320px;
  gap: 14px;
}

@media (max-width: 1300px) {
  .admin-dash-charts-row { grid-template-columns: 1fr; }
}`;

if (regex.test(content)) {
  content = content.replace(regex, goodChunk);
  fs.writeFileSync('src/styles.css', content);
  console.log('Fixed charts row CSS');
} else {
  // Try precise exact replacement
  const exactBroken = `.admin-dash-charts-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
}

@media (max-width: 1300px) {
  .admin-dash-charts-row { grid-template-columns: 1fr; }
}`;
  if (content.includes(exactBroken)) {
      content = content.replace(exactBroken, goodChunk);
      fs.writeFileSync('src/styles.css', content);
      console.log('Fixed exact broken');
  } else if (content.includes(exactBroken.replace(/\n/g, '\r\n'))) {
      content = content.replace(exactBroken.replace(/\n/g, '\r\n'), goodChunk.replace(/\n/g, '\r\n'));
      fs.writeFileSync('src/styles.css', content);
      console.log('Fixed exact broken with rn');
  } else {
      console.log('Regex did not match at all');
  }
}
