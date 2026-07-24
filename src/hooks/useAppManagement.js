import { useContext } from 'react';
import { AppManagementContext } from '../contexts/AppManagementContext';

export function useAppManagement() {
  const context = useContext(AppManagementContext);
  if (!context) {
    throw new Error('useAppManagement must be used within an AppManagementProvider');
  }
  return context;
}
