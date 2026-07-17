import React, { useState } from 'react';
import { ChevronDown, Calendar, MapPin, Building, Wrench, Users } from 'lucide-react';

import Select from "../ui/Select";

export default function GlobalDashboardFilters({ onFilterChange }) {
  const [filters, setFilters] = useState({
    city: 'All Cities',
    district: 'All Districts',
    service: 'All Services',
    partner: 'All Partners',
    timeframe: 'Daily'
  });

  const updateFilter = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    if (onFilterChange) onFilterChange(newFilters);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 2035 - 2026 + 1 }, (_, i) => 2026 + i);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

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

  const iconStyle = {
    position: 'absolute',
    right: '10px',
    color: '#94a3b8',
    pointerEvents: 'none'
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
          options={[{
            label: "All Cities",
            value: "All Cities"
          }, {
            label: "Mumbai",
            value: "Mumbai"
          }, {
            label: "Delhi",
            value: "Delhi"
          }, {
            label: "Bangalore",
            value: "Bangalore"
          }, {
            label: "Hyderabad",
            value: "Hyderabad"
          }]} />

      </div>
      <div style={wrapperStyle}>
        <Building size={14} style={leftIconStyle} />
        <Select
          style={getSelectStyleWithIcon()}
          value={filters.district}
          onChange={(e) => updateFilter('district', e.target.value)}
          options={[{
            label: "All Districts",
            value: "All Districts"
          }, {
            label: "District 1",
            value: "District 1"
          }, {
            label: "District 2",
            value: "District 2"
          }, {
            label: "District 3",
            value: "District 3"
          }]} />

      </div>
      <div style={wrapperStyle}>
        <Wrench size={14} style={leftIconStyle} />
        <Select
          style={getSelectStyleWithIcon()}
          value={filters.service}
          onChange={(e) => updateFilter('service', e.target.value)}
          options={[{
            label: "All Services",
            value: "All Services"
          }, {
            label: "AC Repair",
            value: "AC Repair"
          }, {
            label: "Cleaning",
            value: "Cleaning"
          }, {
            label: "Plumbing",
            value: "Plumbing"
          }, {
            label: "Painting",
            value: "Painting"
          }]} />

      </div>
      <div style={wrapperStyle}>
        <Users size={14} style={leftIconStyle} />
        <Select
          style={getSelectStyleWithIcon()}
          value={filters.partner}
          onChange={(e) => updateFilter('partner', e.target.value)}
          options={[{
            label: "Partner Wise",
            value: "All Partners"
          }, {
            label: "Partner A",
            value: "Partner A"
          }, {
            label: "Partner B",
            value: "Partner B"
          }]} />

      </div>
      <div style={wrapperStyle}>
        <Calendar size={14} style={leftIconStyle} />
        <Select
          style={getSelectStyleWithIcon()}
          value={filters.timeframe}
          onChange={(e) => updateFilter('timeframe', e.target.value)}
          options={[
            { label: "Daily", value: "Daily" },
            { label: "Weekly", value: "Weekly" },
            { label: "Monthly", value: "Monthly" },
            { label: "Yearly", value: "Yearly" }
          ]} />

      </div>
    </div>
  );
}
