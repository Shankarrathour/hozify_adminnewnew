import React, { useState, useRef, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import AdminShell from "../../components/layouts/AdminShell";
import { useToast } from "../../components/common/ToastNotification";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";

export default function SettlementReport() {
  const settlementLogs = [
    {
      id: "STL-01923-X",
      merchant: "Aura Zero Retail",
      initials: "AZ",
      avatarBg: "bg-[#1e1b4b]",
      date: "Oct 24, 2023 09:12 AM",
      amount: "$12,450.00",
      status: "SUCCESS",
      statusStyle: "bg-emerald-50 text-emerald-600 border border-emerald-100",
    },
    {
      id: "STL-90122-Y",
      merchant: "Blue Line Logistics",
      initials: "BL",
      avatarBg: "bg-sky-100 text-sky-700",
      date: "Oct 24, 2023 08:45 AM",
      amount: "$8,122.50",
      status: "PENDING",
      statusStyle: "bg-amber-50 text-amber-600 border border-amber-100",
    },
    {
      id: "STL-90121-Z",
      merchant: "Nova Kitchens",
      initials: "NK",
      avatarBg: "bg-slate-200 text-slate-700",
      date: "Oct 23, 2023 11:20 PM",
      amount: "$3,900.00",
      status: "FAILED",
      statusStyle: "bg-rose-50 text-rose-500 border border-rose-100",
    },
    {
      id: "STL-90120-W",
      merchant: "Evolve Fitness",
      initials: "EV",
      avatarBg: "bg-[#120e3a] text-white",
      date: "Oct 23, 2023 04:30 PM",
      amount: "$15,700.00",
      status: "SUCCESS",
      statusStyle: "bg-emerald-50 text-emerald-600 border border-emerald-100",
    },
  ];

  const { addToast } = useToast();
  
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [calendarPos, setCalendarPos] = useState({ top: 0, left: 0 });
  const datePickerRef = useRef(null);
  
  const [showFilter, setShowFilter] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const filterRef = useRef(null);

  const handleDateTriggerClick = useCallback(() => {
    if (datePickerRef.current) {
      const rect = datePickerRef.current.getBoundingClientRect();
      setCalendarPos({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX - 250
      });
    }
    setShowDatePicker(prev => !prev);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (showDatePicker) {
        if (datePickerRef.current && datePickerRef.current.contains(e.target)) return;
        const portal = document.getElementById('settlement-date-portal');
        if (portal && portal.contains(e.target)) return;
        setShowDatePicker(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showDatePicker]);

  useEffect(() => {
    const handler = (e) => {
      if (showFilter && filterRef.current && !filterRef.current.contains(e.target)) {
        setShowFilter(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showFilter]);

  const selectedDateLabel = dateRange[0].startDate.getTime() === dateRange[0].endDate.getTime()
    ? format(dateRange[0].startDate, 'MMM d, yyyy')
    : `${format(dateRange[0].startDate, 'MMM d, yyyy')} - ${format(dateRange[0].endDate, 'MMM d, yyyy')}`;

  const filteredLogs = settlementLogs.filter((log) => {
    return selectedStatus === "ALL" ? true : log.status === selectedStatus;
  });

  return (
    <AdminShell activeTab="Reports & Analytics">
      <div className="w-full min-h-screen bg-[#f8fafd] p-6 text-slate-800 antialiased">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl font-bold text-[#1a165a]">Settlement Reports</h1>
            <p className="text-xs text-gray-400 mt-0.5">Real-time status of merchant fund transfers.</p>
          </div>
          
          <div className="flex items-center gap-2 relative">
            <button 
              ref={datePickerRef}
              onClick={handleDateTriggerClick}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold border border-gray-200 bg-white rounded text-slate-600 hover:bg-gray-50 shadow-sm"
            >
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {selectedDateLabel}
            </button>
            <div className="relative" ref={filterRef}>
              <button 
                onClick={() => setShowFilter(!showFilter)}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold border border-gray-200 bg-white rounded text-slate-600 hover:bg-gray-50 shadow-sm"
              >
                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filter: {selectedStatus}
              </button>
              {showFilter && (
                <div className="absolute top-10 right-0 bg-white border border-gray-200 shadow-xl p-2 rounded-lg z-50 w-36 text-xs text-slate-700">
                  {["ALL", "SUCCESS", "PENDING", "FAILED"].map(status => (
                    <div 
                      key={status} 
                      className={`cursor-pointer py-1.5 px-3 rounded-md transition-colors ${selectedStatus === status ? "bg-[#1a165a] text-white font-bold" : "hover:bg-gray-100 font-semibold"}`} 
                      onClick={() => {setSelectedStatus(status); setShowFilter(false);}}
                    >
                      {status}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* TOP METRICS 3-CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm relative">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">SETTLED VOLUME</span>
            <div className="flex items-baseline gap-2 mt-1.5">
              <h2 className="text-2xl font-bold text-slate-900">$4,281,092.40</h2>
              <span className="text-emerald-500 font-bold text-[11px] flex items-center">↗ 12%</span>
            </div>
            <p className="text-[11px] text-gray-400 font-medium mt-1">vs previous period</p>
            <div className="absolute top-5 right-5 text-gray-300">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm relative flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">PENDING PAYOUTS</span>
              <div className="flex items-baseline gap-2 mt-1.5">
                <h2 className="text-2xl font-bold text-slate-900">128</h2>
                <span className="text-gray-400 font-medium text-xs">Active Queue</span>
              </div>
            </div>
            <div className="w-full bg-gray-100 h-1 rounded-full mt-4 overflow-hidden">
              <div className="h-full bg-slate-900 rounded-full" style={{ width: "45%" }}></div>
            </div>
            <div className="absolute top-5 right-5 text-gray-300">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm relative">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">ERROR RATE</span>
            <div className="flex items-baseline gap-2 mt-1.5">
              <h2 className="text-2xl font-bold text-slate-900">0.02%</h2>
              <span className="text-emerald-500 font-bold text-[11px]">↓ 0.01%</span>
            </div>
            <p className="text-[11px] text-gray-400 font-medium mt-1">Stable performance</p>
            <div className="absolute top-5 right-5 text-gray-300">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION - GRAPH AREA & STATUS BREAKDOWN */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col justify-between min-h-[320px]">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold text-slate-900">Daily Settlement Volume</h3>
              <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-slate-900 block"></span> Success</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-slate-200 block"></span> Pending</span>
              </div>
            </div>
            <div className="w-full flex-1 flex items-end justify-between px-2 pt-8 pb-2">
              <div className="text-[11px] text-gray-400 font-semibold w-full text-center">Mon</div>
              <div className="text-[11px] text-gray-400 font-semibold w-full text-center">Tue</div>
              <div className="text-[11px] text-gray-400 font-semibold w-full text-center">Wed</div>
              <div className="text-[11px] text-gray-400 font-semibold w-full text-center">Thu</div>
              <div className="text-[11px] text-gray-400 font-semibold w-full text-center">Fri</div>
              <div className="text-[11px] text-gray-400 font-semibold w-full text-center">Sat</div>
              <div className="text-[11px] text-gray-400 font-semibold w-full text-center">Sun</div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-900 mb-4">Status Breakdown</h3>
              <div className="space-y-3.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="flex items-center gap-2 font-medium text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 block"></span> Successful Settlements
                  </span>
                  <span className="font-bold text-slate-900">94.2%</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="flex items-center gap-2 font-medium text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 block"></span> Pending Verification
                  </span>
                  <span className="font-bold text-slate-900">5.1%</span>
                </div>
                <div className="flex justify-between items-center text-xs border-b border-gray-100 pb-4">
                  <span className="flex items-center gap-2 font-medium text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 block"></span> Failed/Flagged
                  </span>
                  <span className="font-bold text-slate-900">0.7%</span>
                </div>
              </div>
            </div>
            <div className="w-full h-24 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg relative overflow-hidden flex items-center justify-center p-3">
              <div className="w-full h-full opacity-20 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:10px_10px]"></div>
              <div className="absolute w-16 h-10 border border-white/20 rounded transform rotate-12 bg-white/5 flex flex-col justify-between p-1.5">
                <div className="w-3 h-1.5 bg-white/40 rounded-sm"></div>
                <div className="w-full h-1 bg-white/20 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION - SETTLEMENT LOGS TABLE */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
            <h3 className="text-xs font-bold text-slate-900">Settlement Logs</h3>
            <div className="flex items-center gap-3 text-gray-400">
              <button className="hover:text-gray-600" type="button" onClick={() => addToast('Refreshing Logs...', 'success')}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 15H19" /></svg>
              </button>
              <button className="hover:text-gray-600 font-bold text-sm" type="button" onClick={() => addToast('Options Menu Opened', 'info')}>•••</button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="table-responsive-wrapper">
              <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#f8fafd] text-gray-400 uppercase text-[10px] font-bold tracking-wider border-b border-gray-200">
                  <th className="p-4 pl-6 font-semibold">Settlement ID</th>
                  <th className="p-4 font-semibold">Merchant</th>
                  <th className="p-4 font-semibold">Date / Time</th>
                  <th className="p-4 font-semibold">Amount</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 text-center pr-6"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-slate-700 font-medium">
                {filteredLogs.map((log, index) => (
                  <tr key={index} className="hover:bg-slate-50/50 group transition-colors">
                    <td className="p-4 pl-6 text-slate-500 font-semibold">{log.id}</td>
                    <td className="p-4 flex items-center gap-2.5">
                      <div className={`w-6 h-6 rounded-full ${log.avatarBg} text-[9px] font-bold flex items-center justify-center`}>
                        {log.initials}
                      </div>
                      <span className="font-bold text-slate-800">{log.merchant}</span>
                    </td>
                    <td className="p-4 text-gray-400 font-medium">{log.date}</td>
                    <td className="p-4 text-slate-900 font-bold">{log.amount}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded font-black text-[9px] tracking-wide ${log.statusStyle}`}>
                        {log.status}
                      </span>
                    </td>
                    <td className="p-4 text-center pr-6 text-gray-300 group-hover:text-gray-500 transition-colors cursor-pointer" onClick={() => addToast(`Opening details for ${log.id}`, 'info')}>
                      ➔
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>

          <div className="flex justify-between items-center px-6 py-4 border-t border-gray-100 text-xs text-gray-400 font-medium">
            <span>Showing {filteredLogs.length} of {settlementLogs.length} results</span>
            <div className="flex items-center gap-1">
              <button className="p-1 border border-gray-200 bg-white rounded text-gray-400 hover:bg-gray-50 cursor-not-allowed" type="button" onClick={() => addToast('Already on first page', 'warning')}>🡨</button>
              <button className="p-1 border border-gray-200 bg-white rounded text-slate-600 hover:bg-gray-50 shadow-sm" type="button" onClick={() => addToast('Loading next page...', 'info')}>🡪</button>
            </div>
          </div>
        </div>

      </div>
      
      {/* DateRange Portal */}
      {showDatePicker && ReactDOM.createPortal(
        <div
          id="settlement-date-portal"
          style={{
            position: 'fixed',
            top: calendarPos.top,
            left: Math.max(10, calendarPos.left),
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
            rangeColors={['#1a165a']}
          />
          <div style={{ padding: '12px 16px', borderTop: '1px solid #eee', background: '#f9f9f9', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <button
              onClick={() => setShowDatePicker(false)}
              style={{ padding: '6px 14px', background: '#fff', color: '#1a165a', border: '1.5px solid #1a165a', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '700' }}
              type="button"
            >
              Cancel
            </button>
            <button
              onClick={() => setShowDatePicker(false)}
              style={{ padding: '6px 16px', background: '#1a165a', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '700' }}
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