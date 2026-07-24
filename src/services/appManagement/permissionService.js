// Permission and Visibility Rule Engine for User & Partner Apps

export const permissionService = {
  /**
   * Check if a specific module is enabled in the configuration map
   */
  isModuleEnabled(configMap, moduleId) {
    if (!configMap) return true;
    return configMap[moduleId] !== false;
  },

  /**
   * Filter an array of items based on their associated module key
   */
  filterVisibleItems(items, configMap, getModuleKey = (item) => item.moduleId) {
    if (!items || !Array.isArray(items)) return [];
    if (!configMap) return items;

    return items.filter(item => {
      const moduleKey = getModuleKey(item);
      if (!moduleKey) return true;
      return this.isModuleEnabled(configMap, moduleKey);
    });
  },

  /**
   * Get all disabled module IDs for a given application configuration
   */
  getDisabledModules(configMap) {
    if (!configMap) return [];
    return Object.keys(configMap).filter(key => configMap[key] === false);
  }
};
