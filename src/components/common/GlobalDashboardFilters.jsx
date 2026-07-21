import React from 'react';
import { ChevronDown, Calendar, MapPin, Building, Wrench, Users } from 'lucide-react';
import Select from "../ui/Select";
import { useDashboardFilters } from '../../contexts/DashboardFilterContext';

export default function GlobalDashboardFilters({ showService = true, showPartner = true }) {
  const { filters, updateFilter } = useDashboardFilters();

  const handleTimeframeChange = (e) => {
    const newTimeframe = e.target.value;
    updateFilter('timeframe', newTimeframe);
    if (newTimeframe !== 'Monthly') updateFilter('month', 'January');
    if (newTimeframe !== 'Yearly') updateFilter('year', '2026');
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => String(2026 + i));
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const selectStyle = {
    padding: '8px 12px',
    paddingRight: '32px',
    borderRadius: '6px',
    border: '1px solid #e2e8f0',
    background: '#ffffff',
    color: '#334155',
    fontSize: '13px',
    fontWeight: '600',
    appearance: 'none',
    cursor: 'pointer',
    outline: 'none',
    minWidth: '130px',
  };

  const wrapperStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  };

  const leftIconStyle = {
    position: 'absolute',
    left: '10px',
    color: '#64748b',
    pointerEvents: 'none'
  };

  const getSelectStyleWithIcon = () => ({
    ...selectStyle,
    paddingLeft: '32px'
  });

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '12px',
      padding: '12px 16px',
      background: '#f8fafc',
      borderRadius: '8px',
      border: '1px solid #e2e8f0',
      marginBottom: '20px',
      alignItems: 'center',
      position: 'relative',
      zIndex: 100
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginRight: '8px' }}>
        <strong style={{ fontSize: '13px', color: '#1e293b' }}>Filters:</strong>
      </div>
      <div style={wrapperStyle}>
        <MapPin size={14} style={leftIconStyle} />
        <Select
          style={getSelectStyleWithIcon()}
          value={filters.city}
          onChange={(e) => updateFilter('city', e.target.value)}
          options={[
            { label: "All Cities", value: "All Cities" },
            { label: "Mumbai", value: "Mumbai" },
            { label: "Delhi", value: "Delhi" },
            { label: "Bangalore", value: "Bangalore" },
            { label: "Hyderabad", value: "Hyderabad" }
          ]} />
      </div>
      <div style={wrapperStyle}>
        <Building size={14} style={leftIconStyle} />
        <Select
          style={getSelectStyleWithIcon()}
          value={filters.district}
          onChange={(e) => updateFilter('district', e.target.value)}
          options={[
            { label: "All Districts", value: "All Districts" },
            { label: "North District", value: "North" },
            { label: "South District", value: "South" },
            { label: "East District", value: "East" },
            { label: "West District", value: "West" }
          ]} />
      </div>
      {showService && (
        <div style={wrapperStyle}>
          <Wrench size={14} style={leftIconStyle} />
          <Select
            style={getSelectStyleWithIcon()}
            value={filters.service}
            onChange={(e) => updateFilter('service', e.target.value)}
            options={[
              { label: "All Services", value: "All Services" },
              { label: "Cleaning", value: "Cleaning" },
              { label: "Plumbing", value: "Plumbing" },
              { label: "Electrical", value: "Electrical" },
              { label: "Carpentry", value: "Carpentry" }
            ]} />
        </div>
      )}
      
      {showPartner && (
        <div style={wrapperStyle}>
          <Users size={14} style={leftIconStyle} />
          <Select
            style={getSelectStyleWithIcon()}
            value={filters.partner}
            onChange={(e) => updateFilter('partner', e.target.value)}
            options={[
              { label: "All Partners", value: "All Partners" },
              { label: "Premium Partners", value: "Premium" },
              { label: "Standard Partners", value: "Standard" }
            ]} />
        </div>
      )}

      {/* Timeframe Toggle Buttons (Joined Pill Style) */}
      <div className="ref-period-toggle" style={{ marginLeft: '12px', height: '32px' }}>
        {['Daily', 'Weekly', 'Monthly', 'Yearly'].map(tf => (
          <button
            key={tf}
            onClick={() => handleTimeframeChange({ target: { value: tf } })}
            className={`ref-period-btn${filters.timeframe === tf ? ' active' : ''}`}
            style={{ padding: '0 16px', height: '100%' }}
          >
            {tf}
          </button>
        ))}
      </div>
      
      {filters.timeframe === 'Monthly' && (
        <div className="ref-select-wrap" style={{ marginLeft: '12px' }}>
          <Select
            style={selectStyle}
            value={filters.month}
            onChange={(e) => updateFilter('month', e.target.value)}
            options={months.map(m => ({ label: m.substring(0, 3), value: m }))} />
        </div>
      )}

      {filters.timeframe === 'Yearly' && (
        <div className="ref-select-wrap" style={{ marginLeft: '12px' }}>
          <Select
            style={selectStyle}
            value={filters.year}
            onChange={(e) => updateFilter('year', e.target.value)}
            options={years.map(y => ({ label: y, value: y }))} />
        </div>
      )}

      {/* Apply and Reset Buttons */}
      <div style={{ display: 'flex', gap: '8px', marginLeft: 'auto' }}>
        <button className="ref-btn-primary">Apply</button>
        <button className="ref-btn-secondary" onClick={() => updateFilter('timeframe', 'Monthly')}>Reset</button>
      </div>
    </div>
  );
}
