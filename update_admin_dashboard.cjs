const fs = require('fs');

let content = fs.readFileSync('src/pages/Dashboard/AdminDashboard.jsx', 'utf8');

// 1. Remove old data declarations
content = content.replace(/const teamsOverview = \[\s*\{[\s\S]*?\];/g, '');
content = content.replace(/const recentActivity = \[\s*\{[\s\S]*?\];/g, '');
content = content.replace(/const moduleAccess = \[\s*\{[\s\S]*?\];/g, '');
content = content.replace(/const securityAlerts = \[\s*\{[\s\S]*?\];/g, '');

// 2. Add import for data
content = content.replace(
  "import AdminShell from '../../components/layouts/AdminShell';",
  "import AdminShell from '../../components/layouts/AdminShell';\nimport { teamsOverview, recentActivity, moduleAccess, securityAlerts } from '../../data/AdminData';"
);

// Add useApp import if not present
if (!content.includes('import { useApp }')) {
  content = content.replace(
    "import React, { useState, useMemo } from 'react';",
    "import React, { useState, useMemo } from 'react';\nimport { useApp } from '../../hooks/useApp';\nimport { ROUTES } from '../../config/routes';"
  );
}

// 3. Update onClick handlers
content = content.replace(
  /<button onClick=\{\(\) => setViewAllModal\('teams'\)\}>View All Teams <ChevronRight size=\{14\} \/><\/button>/g,
  `<button onClick={() => navigate(ROUTES.adminTeams)}>View All Teams <ChevronRight size={14} /></button>`
);
content = content.replace(
  /<button onClick=\{\(\) => setViewAllModal\('activity'\)\}>View All Activity <ChevronRight size=\{14\} \/><\/button>/g,
  `<button onClick={() => navigate(ROUTES.adminActivity)}>View All Activity <ChevronRight size={14} /></button>`
);
content = content.replace(
  /<button onClick=\{\(\) => setViewAllModal\('modules'\)\}>View All Modules <ChevronRight size=\{14\} \/><\/button>/g,
  `<button onClick={() => navigate(ROUTES.adminModules)}>View All Modules <ChevronRight size={14} /></button>`
);
content = content.replace(
  /<button onClick=\{\(\) => setViewAllModal\('alerts'\)\}>View All Alerts <ChevronRight size=\{14\} \/><\/button>/g,
  `<button onClick={() => navigate(ROUTES.adminAlerts)}>View All Alerts <ChevronRight size={14} /></button>`
);

// Inject const { navigate } = useApp();
if (!content.includes('const { navigate } = useApp();')) {
  content = content.replace(
    "const [dateRange, setDateRange] = useState('01 May 2026 - 31 May 2026');",
    "const { navigate } = useApp();\n  const [dateRange, setDateRange] = useState('01 May 2026 - 31 May 2026');"
  );
}

// 4. Remove viewAllModal state
content = content.replace(/const \[viewAllModal, setViewAllModal\] = useState\(null\);\n?/g, '');

// 5. Remove Modal code
content = content.replace(/\{\/\* ════════════════════ MODAL ════════════════════ \*\/\}([\s\S]*?)<\/AdminShell>/g, '</AdminShell>');

fs.writeFileSync('src/pages/Dashboard/AdminDashboard.jsx', content);
console.log('AdminDashboard.jsx updated');
