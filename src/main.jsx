import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App';
import './styles.css';
import './materio-theme.css';
import './premium-table.css';

import { DashboardFilterProvider } from './contexts/DashboardFilterContext';

createRoot(document.getElementById('root')).render(
  <DashboardFilterProvider>
    <App />
  </DashboardFilterProvider>
);
