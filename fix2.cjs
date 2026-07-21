const fs = require('fs');
const path = 'src/pages/Users/index.jsx';
let content = fs.readFileSync(path, 'utf8');

let lines = content.split(/\r?\n/);

// Find the start of the rogue block: "        {drawerUser && ("
// Find the pagination block: "          <div style={{ padding: '16px 24px', borderTop: '1px solid var(--materio-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>"

let startIndex = -1;
let endIndex = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes("          <div style={{ padding: '16px 24px', borderTop: '1px solid var(--materio-border)'")) {
    endIndex = i;
    break;
  }
}

// Search backwards from endIndex for the rogue drawerUser footer
for (let i = endIndex - 1; i >= 0; i--) {
  if (lines[i].includes("        {drawerUser && (")) {
    // Make sure it's the duplicate one, right after recent bookings (around line 460)
    if (lines[i+1] && lines[i+1].includes('materio-drawer-footer')) {
       startIndex = i;
       break;
    }
  }
}

if (startIndex !== -1 && endIndex !== -1) {
  // delete lines from startIndex up to (but not including) endIndex
  lines.splice(startIndex, endIndex - startIndex);
  fs.writeFileSync(path, lines.join('\n'));
  console.log('Successfully removed duplicate drawer footer from Users/index.jsx!');
} else {
  console.log('Could not find the duplicate drawer footer.', { startIndex, endIndex });
}
