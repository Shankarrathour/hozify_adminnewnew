/**
 * A utility to dynamically perturb mock data based on global filters.
 * This ensures that when a user changes a filter (e.g. from Daily to Monthly, or changes City),
 * the charts and KPI cards visibly update to reflect the new state.
 */

// Simple deterministic hash function for string
const hashString = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0; 
  }
  return Math.abs(hash);
};

// Generates a multiplier based on the current filters state
const getFilterMultiplier = (filters) => {
  const seedStr = `${filters.city}-${filters.district}-${filters.service}-${filters.partner}-${filters.timeframe}-${filters.month}-${filters.year}`;
  const hash = hashString(seedStr);
  
  // Base multiplier logic based on timeframe
  let baseMulti = 1;
  if (filters.timeframe === 'Weekly') baseMulti = 7;
  else if (filters.timeframe === 'Monthly') baseMulti = 30;
  else if (filters.timeframe === 'Yearly') baseMulti = 365;

  // Add some pseudo-randomness based on the hash (between 0.8 and 1.2)
  const randomFactor = 0.8 + ((hash % 100) / 100) * 0.4;
  
  // Specific modifiers
  if (filters.city !== 'All Cities') baseMulti *= 0.25; // A specific city is ~25% of total
  if (filters.partner !== 'All Partners') baseMulti *= 0.5;

  return Math.max(0.1, baseMulti * randomFactor);
};

/**
 * Perturbs a single number based on the filter multiplier.
 */
export const applyFilterToNumber = (value, filters) => {
  const multi = getFilterMultiplier(filters);
  return Math.round(value * multi);
};

/**
 * Perturbs an array of chart data.
 * @param {Array} data - The array of objects (e.g., [{ name: 'Mon', value: 100 }])
 * @param {Object} filters - The global filters object
 * @param {Array<string>} keysToModify - The object keys to multiply (e.g., ['value', 'revenue'])
 */
export const applyFilterToChartData = (data, filters, keysToModify) => {
  const multi = getFilterMultiplier(filters);
  
  return data.map((item, index) => {
    const newItem = { ...item };
    // Add slightly different multipliers for each row to make charts look dynamic and not flat
    const rowMulti = multi * (0.9 + ((index % 5) * 0.05));
    
    keysToModify.forEach(key => {
      if (typeof newItem[key] === 'number') {
        newItem[key] = Math.round(newItem[key] * rowMulti);
      }
    });
    return newItem;
  });
};

/**
 * Format large numbers with commas
 */
export const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
