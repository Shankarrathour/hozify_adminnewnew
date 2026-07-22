const fs = require('fs');

let cssContent = fs.readFileSync('src/styles.css', 'utf8');

const stickyHeaderCSS = `
/* ── Global Sticky Headers for Dashboard Tables ── */
.rev-dash-table thead th,
.bkd-table thead th,
.admin-dash-table thead th,
.sd-rtable thead th,
.partner-table thead th,
.approval-queue-table thead th,
table thead th {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: inherit;
}

/* Ensure background color is solid for sticky headers if they don't have one */
.rev-dash-table thead tr,
.bkd-table thead tr,
.admin-dash-table thead tr,
.sd-rtable thead tr,
.partner-table thead tr,
.approval-queue-table thead tr,
table thead tr {
  background-color: #f8fafc; /* Default dashboard header background */
}
`;

if (!cssContent.includes('Global Sticky Headers for Dashboard Tables')) {
  fs.appendFileSync('src/styles.css', '\n' + stickyHeaderCSS);
  console.log('Added sticky headers to styles.css');
} else {
  console.log('Sticky headers CSS already exists');
}
