import { useAppManagement } from './useAppManagement';

export function useVisibilityEngine(appType = 'user') {
  const { isModuleEnabled, userAppConfig, partnerAppConfig } = useAppManagement();

  const isEnabled = (moduleId) => {
    return isModuleEnabled(appType, moduleId);
  };

  const currentConfig = appType === 'user' ? userAppConfig : partnerAppConfig;

  return {
    isEnabled,
    isModuleEnabled: isEnabled,
    config: currentConfig
  };
}
