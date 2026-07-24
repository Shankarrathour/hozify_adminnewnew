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
  },

  /**
   * Get specific User feature access configuration
   */
  async getUserAccessConfig(userId) {
    const globalConfig = await this.getAppConfig('user');
    if (!userId) return globalConfig;
    const key = `hozify_user_access_${userId}`;
    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        return { ...globalConfig, ...JSON.parse(stored) };
      }
    } catch (err) {
      console.warn(`[configService] Error loading user access for ${userId}:`, err);
    }
    return globalConfig;
  },

  /**
   * Save specific User feature access configuration
   */
  async saveUserAccessConfig(userId, configMap) {
    if (!userId) return;
    const key = `hozify_user_access_${userId}`;
    try {
      localStorage.setItem(key, JSON.stringify(configMap));
      return { success: true, timestamp: new Date().toISOString() };
    } catch (err) {
      console.error(`[configService] Error saving user access for ${userId}:`, err);
      throw err;
    }
  },

  /**
   * Reset specific User feature access configuration
   */
  async resetUserAccessConfig(userId) {
    if (!userId) return;
    const key = `hozify_user_access_${userId}`;
    try {
      localStorage.removeItem(key);
      return await this.getUserAccessConfig(userId);
    } catch (err) {
      console.error(`[configService] Error resetting user access for ${userId}:`, err);
      throw err;
    }
  },

  /**
   * Get specific Partner feature access configuration
   */
  async getPartnerAccessConfig(partnerId) {
    const globalConfig = await this.getAppConfig('partner');
    if (!partnerId) return globalConfig;
    const key = `hozify_partner_access_${partnerId}`;
    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        return { ...globalConfig, ...JSON.parse(stored) };
      }
    } catch (err) {
      console.warn(`[configService] Error loading partner access for ${partnerId}:`, err);
    }
    return globalConfig;
  },

  /**
   * Save specific Partner feature access configuration
   */
  async savePartnerAccessConfig(partnerId, configMap) {
    if (!partnerId) return;
    const key = `hozify_partner_access_${partnerId}`;
    try {
      localStorage.setItem(key, JSON.stringify(configMap));
      return { success: true, timestamp: new Date().toISOString() };
    } catch (err) {
      console.error(`[configService] Error saving partner access for ${partnerId}:`, err);
      throw err;
    }
  },

  /**
   * Reset specific Partner feature access configuration
   */
  async resetPartnerAccessConfig(partnerId) {
    if (!partnerId) return;
    const key = `hozify_partner_access_${partnerId}`;
    try {
      localStorage.removeItem(key);
      return await this.getPartnerAccessConfig(partnerId);
    } catch (err) {
      console.error(`[configService] Error resetting partner access for ${partnerId}:`, err);
      throw err;
    }
  }
};
