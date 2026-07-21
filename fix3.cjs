const fs = require('fs');
const path = 'src/pages/Users/index.jsx';
let content = fs.readFileSync(path, 'utf8');
let lines = content.split(/\r?\n/);
lines.splice(458, 29); // Delete exactly 29 lines starting at line 459 (index 458 is line 459 "        {drawerUser && (")
fs.writeFileSync(path, lines.join('\n'));
console.log('Fixed using Node splice line numbers');
