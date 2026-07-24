import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import { configService } from '../services/appManagement/configService';
import { dataService } from '../services/appManagement/dataService';
import { permissionService } from '../services/appManagement/permissionService';
import { USER_APP_MODULES, PARTNER_APP_MODULES } from '../registry/appManagement/moduleRegistry';

export const AppManagementContext = createContext(null);

export function AppManagementProvider({ children }) {
  const [userAppConfig, setUserAppConfigState] = useState({});
  const [partnerAppConfig, setPartnerAppConfigState] = useState({});
  const [centralData, setCentralDataState] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load initial configurations and central data
  useEffect(() => {
    let isMounted = true;
    async function loadInitialData() {
      try {
        const [uConfig, pConfig, cData] = await Promise.all([
          configService.getAppConfig('user'),
          configService.getAppConfig('partner'),
          dataService.getAllData()
        ]);
        if (isMounted) {
          setUserAppConfigState(uConfig);
          setPartnerAppConfigState(pConfig);
          setCentralDataState(cData);
          setIsLoading(false);
        }
      } catch (err) {
        console.error('[AppManagementProvider] Failed to load data:', err);
        if (isMounted) setIsLoading(false);
      }
    }
    loadInitialData();
    return () => { isMounted = false; };
  }, []);

  // --- ACCESS CONTROL ACTIONS ---

  const toggleModule = useCallback(async (appType, moduleId) => {
    if (appType === 'user') {
      setUserAppConfigState(prev => {
        const next = { ...prev, [moduleId]: !prev[moduleId] };
        configService.saveAppConfig('user', next);
        return next;
      });
    } else {
      setPartnerAppConfigState(prev => {
        const next = { ...prev, [moduleId]: !prev[moduleId] };
        configService.saveAppConfig('partner', next);
        return next;
      });
    }
  }, []);

  const selectAllModules = useCallback(async (appType) => {
    const modules = appType === 'user' ? USER_APP_MODULES : PARTNER_APP_MODULES;
    const allEnabled = {};
    modules.forEach(m => { allEnabled[m.id] = true; });

    if (appType === 'user') {
      setUserAppConfigState(allEnabled);
      await configService.saveAppConfig('user', allEnabled);
    } else {
      setPartnerAppConfigState(allEnabled);
      await configService.saveAppConfig('partner', allEnabled);
    }
  }, []);

  const deselectAllModules = useCallback(async (appType) => {
    const modules = appType === 'user' ? USER_APP_MODULES : PARTNER_APP_MODULES;
    const allDisabled = {};
    modules.forEach(m => { allDisabled[m.id] = false; });

    if (appType === 'user') {
      setUserAppConfigState(allDisabled);
      await configService.saveAppConfig('user', allDisabled);
    } else {
      setPartnerAppConfigState(allDisabled);
      await configService.saveAppConfig('partner', allDisabled);
    }
  }, []);

  const resetModuleConfig = useCallback(async (appType) => {
    const defaultConfig = await configService.resetAppConfig(appType);
    if (appType === 'user') {
      setUserAppConfigState(defaultConfig);
    } else {
      setPartnerAppConfigState(defaultConfig);
    }
  }, []);

  const saveModuleConfig = useCallback(async (appType, configMap) => {
    await configService.saveAppConfig(appType, configMap);
    if (appType === 'user') {
      setUserAppConfigState(configMap);
    } else {
      setPartnerAppConfigState(configMap);
    }
  }, []);

  const isModuleEnabled = useCallback((appType, moduleId) => {
    const configMap = appType === 'user' ? userAppConfig : partnerAppConfig;
    return permissionService.isModuleEnabled(configMap, moduleId);
  }, [userAppConfig, partnerAppConfig]);

  // --- CENTRAL DATA ACTIONS ---

  const centralDataMap = useMemo(() => {
    const map = new Map();
    centralData.forEach(item => {
      map.set(item.key, item.value);
    });
    return map;
  }, [centralData]);

  const getText = useCallback((key, fallback = '') => {
    if (centralDataMap.has(key)) {
      return centralDataMap.get(key);
    }
    return fallback;
  }, [centralDataMap]);

  const createCentralData = useCallback(async (newItem) => {
    const { item, updatedList } = await dataService.createItem(newItem, centralData);
    setCentralDataState(updatedList);
    return item;
  }, [centralData]);

  const updateCentralData = useCallback(async (id, updatedFields) => {
    const { updatedList } = await dataService.updateItem(id, updatedFields, centralData);
    setCentralDataState(updatedList);
  }, [centralData]);

  const deleteCentralData = useCallback(async (id) => {
    const { updatedList } = await dataService.deleteItem(id, centralData);
    setCentralDataState(updatedList);
  }, [centralData]);

  const duplicateCentralData = useCallback(async (id) => {
    const { duplicate, updatedList } = await dataService.duplicateItem(id, centralData);
    setCentralDataState(updatedList);
    return duplicate;
  }, [centralData]);

  const restoreDefaultCentralData = useCallback(async (idOrAll) => {
    const { updatedList } = await dataService.restoreDefault(idOrAll, centralData);
    setCentralDataState(updatedList);
  }, [centralData]);

  const bulkUpdateCentralData = useCallback(async (ids, changes) => {
    const { updatedList } = await dataService.bulkUpdate(ids, changes, centralData);
    setCentralDataState(updatedList);
  }, [centralData]);

  const importCentralDataJSON = useCallback(async (jsonString, mode = 'merge') => {
    const { updatedList, count } = await dataService.importJSON(jsonString, centralData, mode);
    setCentralDataState(updatedList);
    return count;
  }, [centralData]);

  const exportCentralDataJSON = useCallback(() => {
    return dataService.exportJSON(centralData);
  }, [centralData]);

  const value = useMemo(() => ({
    userAppConfig,
    partnerAppConfig,
    centralData,
    isLoading,
    toggleModule,
    selectAllModules,
    deselectAllModules,
    resetModuleConfig,
    saveModuleConfig,
    isModuleEnabled,
    getText,
    createCentralData,
    updateCentralData,
    deleteCentralData,
    duplicateCentralData,
    restoreDefaultCentralData,
    bulkUpdateCentralData,
    importCentralDataJSON,
    exportCentralDataJSON
  }), [
    userAppConfig,
    partnerAppConfig,
    centralData,
    isLoading,
    toggleModule,
    selectAllModules,
    deselectAllModules,
    resetModuleConfig,
    saveModuleConfig,
    isModuleEnabled,
    getText,
    createCentralData,
    updateCentralData,
    deleteCentralData,
    duplicateCentralData,
    restoreDefaultCentralData,
    bulkUpdateCentralData,
    importCentralDataJSON,
    exportCentralDataJSON
  ]);

  return (
    <AppManagementContext.Provider value={value}>
      {children}
    </AppManagementContext.Provider>
  );
}
