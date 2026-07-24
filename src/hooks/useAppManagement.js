import { useContext } from 'react';
import { AppManagementContext } from '../contexts/AppManagementContext';

export function useAppManagement() {
  const context = useContext(AppManagementContext);
  if (!context) {
    return {
      userAppConfig: {},
      partnerAppConfig: {},
      centralData: [],
      isLoading: false,
      toggleModule: () => {},
      selectAllModules: () => {},
      deselectAllModules: () => {},
      resetModuleConfig: () => {},
      saveModuleConfig: () => {},
      isModuleEnabled: () => true,
      getText: (key, fallback = '') => fallback
    };
  }
  return context;
}
