const fs = require('fs');

let content = fs.readFileSync('src/app/router/Router.jsx', 'utf8');

if (!content.includes('import AdminTabularView')) {
  content = content.replace(
    "import AdminDashboard from '../../pages/Dashboard/AdminDashboard';",
    "import AdminDashboard from '../../pages/Dashboard/AdminDashboard';\nimport AdminTabularView from '../../pages/Dashboard/AdminTabularView';"
  );
}

if (!content.includes('case ROUTES.adminTeams:')) {
  const replacement = `
    // Dashboard sub-routes
    case ROUTES.adminDashboard:
      return <AdminDashboard />;
    case ROUTES.adminTeams:
      return <AdminTabularView type="teams" />;
    case ROUTES.adminActivity:
      return <AdminTabularView type="activity" />;
    case ROUTES.adminModules:
      return <AdminTabularView type="modules" />;
    case ROUTES.adminAlerts:
      return <AdminTabularView type="alerts" />;`;

  content = content.replace(
    /\s*\/\/\s*Dashboard sub-routes\s*case ROUTES\.adminDashboard:\s*return <AdminDashboard \/>;/g,
    replacement
  );
}

fs.writeFileSync('src/app/router/Router.jsx', content);
console.log('Router.jsx updated successfully.');
