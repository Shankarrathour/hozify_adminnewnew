const fs = require('fs');
let content = fs.readFileSync('src/styles.css', 'utf8');

const regex = /\.admin-donut-legend-item\s*\{\s*display:\s*flex;\s*align-items:\s*center;\s*gap:\s*6px;\s*font-size:\s*12\.5px;\s*\n*\/\*\s*──\s*Bottom\s*Row\s*\(Modules\s*\+\s*Security\)\s*──\s*\*\/\s*\.admin-dash-bottom-row\s*\{\s*display:\s*grid;\s*grid-template-columns:\s*1fr;\s*gap:\s*14px;\s*\}\s*@media\s*\(max-width:\s*1100px\)\s*\{\s*\.admin-dash-bottom-row\s*\{\s*grid-template-columns:\s*1fr;\s*\}\s*\}/s;
const goodChunk = `.admin-donut-legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12.5px;
}

.admin-donut-legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.admin-donut-legend-name {
  flex: 1;
  color: var(--text);
  font-weight: 500;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.admin-donut-legend-val {
  font-weight: 700;
  color: var(--text);
}

.admin-donut-legend-pct {
  color: var(--muted);
  font-size: 11.5px;
}

/* ── Mid Row (Teams + Activity) ── */
.admin-dash-mid-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

@media (max-width: 1100px) {
  .admin-dash-mid-row { grid-template-columns: 1fr; }
}

/* ── Bottom Row (Modules + Security) ── */
.admin-dash-bottom-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

@media (max-width: 1100px) {
  .admin-dash-bottom-row { grid-template-columns: 1fr; }
}`;

content = content.replace(regex, goodChunk);

// If the regex didn't match, let's just do a brutal replace for the exact text we saw in view_file
const brokenText = `.admin-donut-legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12.5px;

/* ── Bottom Row (Modules + Security) ── */
.admin-dash-bottom-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
}

@media (max-width: 1100px) {
  .admin-dash-bottom-row { grid-template-columns: 1fr; }
}`;

const brokenTextCrLf = brokenText.replace(/\n/g, '\r\n');

if (content.includes(brokenText)) {
  content = content.replace(brokenText, goodChunk);
} else if (content.includes(brokenTextCrLf)) {
  content = content.replace(brokenTextCrLf, goodChunk.replace(/\n/g, '\r\n'));
}

fs.writeFileSync('src/styles.css', content);
console.log('Fixed CSS');
