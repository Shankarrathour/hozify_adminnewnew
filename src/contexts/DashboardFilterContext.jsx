import React, { createContext, useContext, useState, useMemo } from 'react';

const DashboardFilterContext = createContext();

export const useDashboardFilters = () => {
  const context = useContext(DashboardFilterContext);
  if (!context) {
    throw new Error('useDashboardFilters must be used within a DashboardFilterProvider');
  }
  return context;
};

export const DashboardFilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    city: 'All Cities',
    district: 'All Districts',
    service: 'All Services',
    partner: 'All Partners',
    timeframe: 'Daily',
    month: 'January',
    year: '2026'
  });

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      city: 'All Cities',
      district: 'All Districts',
      service: 'All Services',
      partner: 'All Partners',
      timeframe: 'Daily',
      month: 'January',
      year: '2026'
    });
  };

  const value = useMemo(() => ({
    filters,
    updateFilter,
    resetFilters
  }), [filters]);

  return (
    <DashboardFilterContext.Provider value={value}>
      {children}
    </DashboardFilterContext.Provider>
  );
};
