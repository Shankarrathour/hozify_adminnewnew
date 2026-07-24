import React from 'react';
import { renderToString } from 'react-dom/server';
import AppAccessManagementPage from '../src/modules/cms/appManagement/accessControl/pages/AppAccessManagementPage.jsx';
import { MemoryRouter } from 'react-router-dom';

try {
  const html = renderToString(
    React.createElement(MemoryRouter, null,
      React.createElement(AppAccessManagementPage)
    )
  );
  console.log("RENDER SUCCESSFUL, length:", html.length);
} catch (err) {
  console.error("RENDER ERROR DETECTED:", err);
}
