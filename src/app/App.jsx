import React from 'react';
import { AppProvider } from './providers/AppProvider';
import { Router } from './router/Router';
import { Toaster } from 'react-hot-toast';
import { DateFilterProvider } from '../contexts/DateFilterContext';
import { AppManagementProvider } from '../contexts/AppManagementContext';

export default function App() {
  return (
    <AppProvider>
      <DateFilterProvider>
        <AppManagementProvider>
          <Toaster position="top-right" />
          <Router />
        </AppManagementProvider>
      </DateFilterProvider>
    </AppProvider>
  );
}

