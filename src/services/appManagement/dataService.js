import { INITIAL_CENTRAL_DATA } from '../../registry/appManagement/featureRegistry';

const CENTRAL_DATA_STORAGE_KEY = 'hozify_central_app_data_v1';

export const dataService = {
  /**
   * Fetch all central data entries
   */
  async getAllData() {
    try {
      const stored = localStorage.getItem(CENTRAL_DATA_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (err) {
      console.warn('[dataService] Error reading central app data:', err);
    }
    // Return deep clone of initial central data
    return JSON.parse(JSON.stringify(INITIAL_CENTRAL_DATA));
  },

  /**
   * Save all central data entries to persistent storage
   */
  async saveData(dataArray) {
    try {
      localStorage.setItem(CENTRAL_DATA_STORAGE_KEY, JSON.stringify(dataArray));
      return { success: true, count: dataArray.length };
    } catch (err) {
      console.error('[dataService] Error saving central data:', err);
      throw err;
    }
  },

  /**
   * Create a new central data key-value item
   */
  async createItem(newItem, currentList) {
    const itemWithDefaults = {
      id: `cd-${Date.now()}`,
      defaultValue: newItem.value,
      ...newItem
    };
    const updatedList = [itemWithDefaults, ...currentList];
    await this.saveData(updatedList);
    return { item: itemWithDefaults, updatedList };
  },

  /**
   * Update an existing central data item
   */
  async updateItem(id, updatedFields, currentList) {
    const updatedList = currentList.map(item =>
      item.id === id ? { ...item, ...updatedFields } : item
    );
    await this.saveData(updatedList);
    return { updatedList };
  },

  /**
   * Delete a central data item by ID
   */
  async deleteItem(id, currentList) {
    const updatedList = currentList.filter(item => item.id !== id);
    await this.saveData(updatedList);
    return { updatedList };
  },

  /**
   * Duplicate a central data item
   */
  async duplicateItem(id, currentList) {
    const source = currentList.find(item => item.id === id);
    if (!source) throw new Error('Source item not found');

    const duplicate = {
      ...source,
      id: `cd-${Date.now()}`,
      key: `${source.key}_copy`,
      label: `${source.label} (Copy)`
    };

    const index = currentList.findIndex(item => item.id === id);
    const updatedList = [...currentList];
    updatedList.splice(index + 1, 0, duplicate);

    await this.saveData(updatedList);
    return { duplicate, updatedList };
  },

  /**
   * Restore default value for a single item or all items
   */
  async restoreDefault(idOrAll, currentList) {
    let updatedList;
    if (idOrAll === 'ALL') {
      updatedList = currentList.map(item => ({
        ...item,
        value: item.defaultValue || item.value
      }));
    } else {
      updatedList = currentList.map(item =>
        item.id === idOrAll
          ? { ...item, value: item.defaultValue || item.value }
          : item
      );
    }
    await this.saveData(updatedList);
    return { updatedList };
  },

  /**
   * Perform bulk updates (category, scope, or value prefix/suffix)
   */
  async bulkUpdate(ids, changes, currentList) {
    const idSet = new Set(ids);
    const updatedList = currentList.map(item => {
      if (!idSet.has(item.id)) return item;

      let newValue = item.value;
      if (changes.prefix) newValue = `${changes.prefix}${newValue}`;
      if (changes.suffix) newValue = `${newValue}${changes.suffix}`;
      if (changes.value !== undefined) newValue = changes.value;

      return {
        ...item,
        category: changes.category || item.category,
        scope: changes.scope || item.scope,
        value: newValue
      };
    });

    await this.saveData(updatedList);
    return { updatedList };
  },

  /**
   * Export all central data as a downloadable JSON string
   */
  exportJSON(currentList) {
    return JSON.stringify(currentList, null, 2);
  },

  /**
   * Import JSON data and merge or replace current state
   */
  async importJSON(jsonString, currentList, mode = 'merge') {
    let parsed;
    try {
      parsed = JSON.parse(jsonString);
    } catch (err) {
      throw new Error('Invalid JSON format');
    }

    if (!Array.isArray(parsed)) {
      throw new Error('Imported JSON must be an array of central data objects');
    }

    let updatedList;
    if (mode === 'replace') {
      updatedList = parsed;
    } else {
      // Merge by key
      const existingMap = new Map(currentList.map(item => [item.key, item]));
      parsed.forEach(item => {
        if (item.key) {
          existingMap.set(item.key, { ...existingMap.get(item.key), ...item });
        }
      });
      updatedList = Array.from(existingMap.values());
    }

    await this.saveData(updatedList);
    return { updatedList, count: parsed.length };
  }
};
