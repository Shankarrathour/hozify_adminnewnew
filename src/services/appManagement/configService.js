import { USER_APP_MODULES, PARTNER_APP_MODULES } from '../../registry/appManagement/moduleRegistry';

const USER_CONFIG_STORAGE_KEY = 'hozify_user_app_modules_config_v1';
const PARTNER_CONFIG_STORAGE_KEY = 'hozify_partner_app_modules_config_v1';

// Build initial default state maps
const buildDefaultConfig = (modules) => {
  const map = {};
  modules.forEach(m => {
    map[m.id] = m.defaultEnabled;
  });
  return map;
};

export const configService = {
  /**
   * Get application configuration for specified appType ('user' | 'partner')
   */
  async getAppConfig(appType) {
    const key = appType === 'user' ? USER_CONFIG_STORAGE_KEY : PARTNER_CONFIG_STORAGE_KEY;
    const defaultModules = appType === 'user' ? USER_APP_MODULES : PARTNER_APP_MODULES;
    const defaultConfig = buildDefaultConfig(defaultModules);

    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Merge with defaults to guarantee all modules have entries
        return { ...defaultConfig, ...parsed };
      }
    } catch (err) {
      console.warn(`[configService] Error loading config for ${appType}:`, err);
    }
    return defaultConfig;
  },

  /**
   * Save configuration for specified appType
   */
  async saveAppConfig(appType, configMap) {
    const key = appType === 'user' ? USER_CONFIG_STORAGE_KEY : PARTNER_CONFIG_STORAGE_KEY;
    try {
      localStorage.setItem(key, JSON.stringify(configMap));
      return { success: true, timestamp: new Date().toISOString() };
    } catch (err) {
      console.error(`[configService] Error saving config for ${appType}:`, err);
      throw err;
    }
  },

  /**
   * Reset configuration to system defaults
   */
  async resetAppConfig(appType) {
    const defaultModules = appType === 'user' ? USER_APP_MODULES : PARTNER_APP_MODULES;
    const defaultConfig = buildDefaultConfig(defaultModules);
    await this.saveAppConfig(appType, defaultConfig);
    return defaultConfig;
  }
};
