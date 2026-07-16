import React, { useState } from 'react';
import { Search } from 'lucide-react';
import Button from './Button';
import Select from './Select';

export default function FilterBar({ 
  onSearch, 
  searchPlaceholder = "Search...", 
  filters = [], 
  onFilterChange,
  onReset,
  onApply
}) {
  const [localSearch, setLocalSearch] = useState('');
  const [localFilters, setLocalFilters] = useState({});

  const handleSearchChange = (val) => {
    setLocalSearch(val);
    if (onSearch) onSearch(val);
  };

  const handleFilterSelect = (key, val) => {
    setLocalFilters(prev => ({ ...prev, [key]: val }));
    if (onFilterChange) onFilterChange(key, val);
  };

  const handleResetClick = () => {
    setLocalSearch('');
    setLocalFilters({});
    if (onReset) onReset();
  };

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '16px',
      alignItems: 'center',
      background: '#fff',
      padding: '16px',
      borderRadius: 'var(--radius-card)',
      border: '1.5px solid #25108f',
      boxShadow: '0 1px 2px rgba(15, 23, 42, 0.04)',
      marginBottom: 'var(--spacing-section)'
    }}>
      <div style={{ position: 'relative', flex: '1', minWidth: '200px' }}>
        <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
        <input 
          type="text"
          value={localSearch}
          placeholder={searchPlaceholder}
          onChange={(e) => handleSearchChange(e.target.value)}
          style={{
            width: '100%',
            height: '40px',
            padding: '0 16px 0 36px',
            borderRadius: 'var(--radius-input)',
            border: '1px solid #cbd5e1',
            fontSize: 'var(--text-body)',
            outline: 'none'
          }}
          onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
          onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
        />
      </div>

      {filters.map((filter, index) => (
        <Select
          key={index}
          value={localFilters[filter.key] || ''}
          onChange={(e) => handleFilterSelect(filter.key, e.target.value)}
          options={[
            { value: "", label: filter.label },
            ...(filter.options || [])
          ]}
          style={{ minWidth: '200px' }}
        />
      ))}

      <div style={{ display: 'flex', gap: '8px', marginLeft: 'auto' }}>
        {onReset && <Button variant="ghost" onClick={handleResetClick}>Reset</Button>}
        {onApply && <Button variant="primary" onClick={onApply}>Apply Filters</Button>}
      </div>
    </div>
  );
}


