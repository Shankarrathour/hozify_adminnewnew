import React, { useState, useRef, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import { useApp } from "../../hooks/useApp";
import AdminShell from "../../components/layouts/AdminShell";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";

export default function ReferralReport() {
  const { navigate } = useApp();
  const [showFilters, setShowFilters] = useState(false);
  
  // Date Range Picker state
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [calendarPos, setCalendarPos] = useState({ top: 0, left: 0 });
  const datePickerRef = useRef(null);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(2026, 5, 27),
      endDate: new Date(2026, 5, 27),
      key: 'selection'
    }
  ]);

  const handleDateTriggerClick = useCallback(() => {
    if (datePickerRef.current) {
      const rect = datePickerRef.current.getBoundingClientRect();
      setCalendarPos({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX
      });
    }
    setShowDatePicker(prev => !prev);
  }, []);

  useEffect(() => {
    if (!showDatePicker) return;
    const handler = (e) => {
      if (datePickerRef.current && datePickerRef.current.contains(e.target)) return;
      const portal = document.getElementById('referral-date-portal');
      if (portal && portal.contains(e.target)) return;
      setShowDatePicker(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showDatePicker]);

  const dateLabel = dateRange[0].startDate.getTime() === dateRange[0].endDate.getTime()
    ? format(dateRange[0].startDate, 'MMM d, yyyy')
    : `${format(dateRange[0].startDate, 'MMM d, yyyy')} - ${format(dateRange[0].endDate, 'MMM d, yyyy')}`;

  return (
    <AdminShell activeTab="Reports & Analytics">
      <div className="w-full min-h-screen bg-[#f8fafd] p-6 text-slate-800 antialiased ">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#111827]">Referral Reports</h1>
            <p className="text-xs text-gray-500 mt-0.5">Performance tracking for the Q3 Loyalty Program</p>
          </div>
          
          <div className="flex items-center gap-3 relative">
            {/* Functional Calendar */}
            <div 
              ref={datePickerRef}
              onClick={handleDateTriggerClick}
              className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 bg-white rounded shadow-sm cursor-pointer"
            >
              <span className="text-gray-400 text-sm">📅</span>
              <span className="text-xs font-semibold">{dateLabel}</span>
            </div>
            {/* Filter Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-1.5 text-xs font-semibold border border-gray-200 bg-white rounded shadow-sm hover:bg-gray-50"
              >
                📊 Filters {showFilters ? "▲" : "▼"}
              </button>
              
              {showFilters && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-lg shadow-xl z-50 p-2 animate-in fade-in zoom-in duration-200">
                  <div className="text-xs font-bold text-gray-400 uppercase p-2">Status</div>
                  {["Active", "Pending", "Completed"].map((opt) => (
                    <label key={opt} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer text-xs">
                      <input type="checkbox" className="rounded" /> {opt}
                    </label>
                  ))}
                  <hr className="my-1" />
                  <button onClick={() => setShowFilters(false)} className="w-full text-center text-xs font-bold text-[#5d55fa] p-2 hover:bg-indigo-50 rounded">Apply Filters</button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* TOP 4 METRICS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
          <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">TOTAL REFERRALS</span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">12,482</h2>
            <p className="text-[11px] font-semibold mt-2 text-emerald-500">↗ +14.2% vs last month</p>
          </div>
          <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">CONVERSION RATE</span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">28.4%</h2>
            <p className="text-[11px] font-semibold mt-2 text-emerald-500">↗ +2.1% vs last month</p>
          </div>
          <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">REWARD COST</span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">$42,850</h2>
            <p className="text-[11px] font-semibold mt-2 text-rose-500">↗ +8.5% spend increase</p>
          </div>
          <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">FRAUD FLAGS</span>
            <h2 className="text-2xl font-bold text-rose-600 mt-1">214</h2>
            <p className="text-[11px] font-semibold mt-2 text-rose-500">⚠️ 12 critical alerts</p>
          </div>
        </div>

        {/* MIDDLE SECTION - PROGRAM HEALTH & FUNNEL */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
          <div className="lg:col-span-2 bg-white border border-gray-100 rounded-xl p-5 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-bold text-slate-900">Program Health</h3>
              <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#1d0094] block"></span> Active Users</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#e5e7eb] block"></span> Inactive</span>
              </div>
            </div>
            <div className="flex-1 flex items-end justify-between gap-2 pt-8 border-b border-gray-100 pb-2 min-h-[200px]">
              {/* Bars */}
              {["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"].map((m, i) => (
                 <div key={m} className="flex flex-col items-center flex-1"><div className={`w-full ${i % 3 === 0 ? "bg-[#1d0094]" : "bg-gray-200"} h-[60px] rounded-t-sm max-w-[20px]`}></div><span className="text-[10px] text-gray-400 font-semibold mt-2">{m}</span></div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-4">Referral Funnel</h3>
            <div className="space-y-4">
              {[{l: "SENT", w: "100%"}, {l: "CLICKED", w: "72%"}, {l: "SIGNED UP", w: "33%"}, {l: "CONVERTED", w: "28%"}].map(item => (
                <div key={item.l}>
                  <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1"><span>{item.l}</span></div>
                  <div className="w-full bg-gray-100 h-6 rounded overflow-hidden"><div className="h-full bg-[#1d0094]" style={{ width: item.w }}></div></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
             <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-slate-900">Top Referral Sources</h3>
              <button 
                onClick={() => navigate('/referrals/sources')} 
                className="text-xs font-bold text-[#1a0dab] hover:underline"
              >
                View All
              </button>
            </div>
            <div className="table-responsive-wrapper">
<table className="w-full text-left text-xs border-collapse">
               <thead>
                <tr className="text-gray-400 border-b border-gray-100 uppercase text-[10px] font-bold tracking-wider">
                  <th className="pb-3 pl-2">Source</th><th className="pb-3 text-center">Referrals</th><th className="pb-3 text-center">CR%</th><th className="pb-3 text-right pr-2">Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 font-medium text-slate-700">
                {[{s: "Email Direct", r: "4,821", c: "32.1%", v: "$12,400"}, {s: "Social Links", r: "3,140", c: "24.5%", v: "$8,920"}, {s: "Partner Portal", r: "2,845", c: "41.8%", v: "$15,280"}, {s: "Offline QR", r: "1,676", c: "18.2%", v: "$4,120"}].map(row => (
                  <tr key={row.s}>
                    <td className="py-3.5 pl-2 font-bold text-slate-800">{row.s}</td>
                    <td className="py-3.5 text-center text-slate-500">{row.r}</td>
                    <td className="py-3.5 text-center text-slate-500">{row.c}</td>
                    <td className="py-3.5 text-right pr-2 font-bold text-slate-900">{row.v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
</div>
          </div>
          <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
            <h3 className="text-sm font-bold text-rose-600 mb-4">Anomalies Detected</h3>
            <div className="space-y-3.5">
               {["IP Cluster Attack", "Cyclic Referral Chain", "High Reward Velocity"].map(a => (
                 <div key={a} className="border border-rose-100 bg-rose-50/30 rounded-xl p-3 text-xs">
                   <span className="font-bold text-slate-800">{a}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* DateRange Portal */}
      {showDatePicker && ReactDOM.createPortal(
        <div
          id="referral-date-portal"
          style={{
            position: 'fixed',
            top: calendarPos.top,
            left: calendarPos.left,
            zIndex: 99999,
            boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
            borderRadius: '12px',
            overflow: 'hidden',
            background: '#fff',
            border: '1.5px solid #e5e7eb'
          }}
        >
          <DateRange
            editableDateInputs={true}
            onChange={item => setDateRange([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={dateRange}
            rangeColors={['#25108f']}
          />
          <div style={{ padding: '12px 16px', borderTop: '1px solid #eee', background: '#f9f9f9', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <button
              onClick={() => setShowDatePicker(false)}
              style={{ padding: '6px 14px', background: '#fff', color: '#25108f', border: '1.5px solid #25108f', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '700' }}
              type="button"
            >
              Cancel
            </button>
            <button
              onClick={() => setShowDatePicker(false)}
              style={{ padding: '6px 16px', background: '#25108f', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '700' }}
              type="button"
            >
              Apply Range
            </button>
          </div>
        </div>,
        document.body
      )}
    </AdminShell>
  );
}