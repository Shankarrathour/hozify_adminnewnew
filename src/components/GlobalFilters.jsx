import React from 'react';
import { useDashboardFilters } from '../contexts/DashboardFilterContext';
import { Filter, RefreshCcw } from 'lucide-react';

const GlobalFilters = () => {
  const { filters, updateFilter, resetFilters } = useDashboardFilters();

  const handleTimeframeChange = (e) => {
    const newTimeframe = e.target.value;
    updateFilter('timeframe', newTimeframe);
    // Reset specific timeframe filters when changing the main timeframe
    if (newTimeframe !== 'Monthly') updateFilter('month', 'January');
    if (newTimeframe !== 'Yearly') updateFilter('year', '2026');
  };

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const years = Array.from({ length: 10 }, (_, i) => String(2026 + i));

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6 flex flex-wrap items-end gap-4">
      <div className="flex items-center gap-2 mr-2 text-slate-700 font-semibold">
        <Filter size={18} className="text-indigo-600" />
        <span>Global Filters</span>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">City</label>
        <select 
          className="px-3 py-1.5 text-sm border border-slate-200 rounded-lg bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          value={filters.city}
          onChange={(e) => updateFilter('city', e.target.value)}
        >
          <option value="All Cities">All Cities</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Delhi">Delhi</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Hyderabad">Hyderabad</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">District</label>
        <select 
          className="px-3 py-1.5 text-sm border border-slate-200 rounded-lg bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          value={filters.district}
          onChange={(e) => updateFilter('district', e.target.value)}
        >
          <option value="All Districts">All Districts</option>
          <option value="North">North District</option>
          <option value="South">South District</option>
          <option value="East">East District</option>
          <option value="West">West District</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Service</label>
        <select 
          className="px-3 py-1.5 text-sm border border-slate-200 rounded-lg bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          value={filters.service}
          onChange={(e) => updateFilter('service', e.target.value)}
        >
          <option value="All Services">All Services</option>
          <option value="Cleaning">Cleaning</option>
          <option value="Plumbing">Plumbing</option>
          <option value="Electrical">Electrical</option>
          <option value="Carpentry">Carpentry</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Partner Wise</label>
        <select 
          className="px-3 py-1.5 text-sm border border-slate-200 rounded-lg bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          value={filters.partner}
          onChange={(e) => updateFilter('partner', e.target.value)}
        >
          <option value="All Partners">All Partners</option>
          <option value="Premium">Premium Partners</option>
          <option value="Standard">Standard Partners</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Timeframe</label>
        <select 
          className="px-3 py-1.5 text-sm border border-slate-200 rounded-lg bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          value={filters.timeframe}
          onChange={handleTimeframeChange}
        >
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
          <option value="Yearly">Yearly</option>
        </select>
      </div>

      {filters.timeframe === 'Monthly' && (
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Month</label>
          <select 
            className="px-3 py-1.5 text-sm border border-slate-200 rounded-lg bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            value={filters.month}
            onChange={(e) => updateFilter('month', e.target.value)}
          >
            {months.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
      )}

      {filters.timeframe === 'Yearly' && (
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Year</label>
          <select 
            className="px-3 py-1.5 text-sm border border-slate-200 rounded-lg bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            value={filters.year}
            onChange={(e) => updateFilter('year', e.target.value)}
          >
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
      )}

      <div className="flex-1"></div>

      <button 
        onClick={resetFilters}
        className="flex items-center gap-2 px-4 py-1.5 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200"
      >
        <RefreshCcw size={14} />
        Reset Filters
      </button>
    </div>
  );
};

export default GlobalFilters;
