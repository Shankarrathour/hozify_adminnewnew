import React, { useState, useRef, useEffect } from "react";
import AdminShell from "../../components/layouts/AdminShell";

export default function CSVExportPage() {
  // --- States ---
  const [activeTab, setActiveTab] = useState("All"); // All, Completed, Processing
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showQueueModal, setShowQueueModal] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showCalendarDropdown, setShowCalendarDropdown] = useState(false);
  
  // Ref for handling click outside calendar dropdown
  const calendarRef = useRef(null);

  // Exact Contextual Date States (June 2026 Basis)
  const [selectedDate, setSelectedDate] = useState("June 2026");
  const [currentMonthIndex, setCurrentMonthIndex] = useState(5); // 5 = June
  const [currentYear, setCurrentYear] = useState(2026);

  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  // Storage and dynamic state data matrix
  const [storageMetrics, setStorageMetrics] = useState({
    used: 84.2,
    csv: 62.4,
    json: 18.1,
    logs: 3.7,
    activeCount: 12
  });

  // Close calendar when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendarDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- Handlers ---
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setStorageMetrics(prev => ({
        ...prev,
        used: parseFloat((prev.used + (Math.random() * 0.4 - 0.2)).toFixed(1)),
        csv: parseFloat((prev.csv + (Math.random() * 0.2)).toFixed(1)),
        activeCount: Math.floor(Math.random() * 5) + 10
      }));
      setIsRefreshing(false);
    }, 800);
  };

  const handlePrevMonth = (e) => {
    e.stopPropagation(); // Prevent dropdown from closing
    if (currentMonthIndex === 0) {
      setCurrentMonthIndex(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonthIndex(prev => prev - 1);
    }
  };

  const handleNextMonth = (e) => {
    e.stopPropagation(); // Prevent dropdown from closing
    if (currentMonthIndex === 11) {
      setCurrentMonthIndex(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonthIndex(prev => prev + 1);
    }
  };

  const handleDateSelect = (day) => {
    setSelectedDate(`${months[currentMonthIndex]} ${day}, ${currentYear}`);
    setShowCalendarDropdown(false);
  };

  // Helper to generate dummy days array for the grid layout
  const generateDays = () => {
    const totalDays = 30; // Kept fixed for UI design symmetry
    return Array.from({ length: totalDays }, (_, i) => i + 1);
  };

  const rawExports = [
    { id: "EXP-9022-X", name: "q4_financial_audit_final.csv", status: "Processing", size: "--", user: "Jane Doe", initial: "JD", date: "Oct 24, 2:45 PM", isFailed: false },
    { id: "EXP-8841-A", name: "marketing_leads_october.csv", status: "Completed", size: "1.4 GB", user: "Sarah Young", initial: "SY", date: "Oct 24, 11:20 AM", isFailed: false },
    { id: "EXP-8832-B", name: "inventory_stock_levels.csv", status: "Completed", size: "422 MB", user: "Admin User", initial: "AU", date: "Oct 23, 04:15 PM", isFailed: false },
    { id: "EXP-8820-F", name: "user_behavior_analytics_raw.csv", status: "Failed", size: "--", user: "Mike Ross", initial: "MR", date: "Oct 23, 01:30 PM", isFailed: true }
  ];

  const filteredExports = rawExports.filter(item => {
    if (activeTab === "All") return true;
    return item.status === activeTab;
  });

  return (
    <AdminShell activeTab="Reports & Analytics">
      <div className="w-full min-h-screen bg-[#f8fafd] p-8 text-slate-700 antialiased  relative">
        
        {/* TOP HEADER ROW */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Export Center</h1>
            <p className="text-xs text-gray-400 mt-0.5 font-medium">
              Manage and monitor enterprise-wide data extraction tasks.
            </p>
          </div>
          
          <div className="flex items-center gap-3 self-end sm:self-auto relative" ref={calendarRef}>
            {/* Interactive Calendar Anchor Input/Button */}
            <button 
              onClick={() => setShowCalendarDropdown(!showCalendarDropdown)}
              className="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm text-xs font-bold gap-2 text-slate-700 hover:bg-gray-50 transition-all select-none"
            >
              <span className="text-base text-slate-500">📅</span>
              <span className="min-w-[100px] text-left">{selectedDate}</span>
              <span className="text-[10px] text-gray-400">▼</span>
            </button>

            {/* DROP-DOWN MINI CALENDAR */}
            {showCalendarDropdown && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 shadow-xl rounded-xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-100">
                  <button onClick={handlePrevMonth} className="p-1 hover:bg-gray-100 rounded text-slate-600 font-bold transition-colors">‹</button>
                  <span className="text-xs font-black text-slate-800">{months[currentMonthIndex]} {currentYear}</span>
                  <button onClick={handleNextMonth} className="p-1 hover:bg-gray-100 rounded text-slate-600 font-bold transition-colors">›</button>
                </div>
                
                {/* Calendar Days Heading Matrix */}
                <div className="grid grid-cols-7 gap-1 text-center text-[9px] font-black text-gray-400 uppercase mb-1">
                  <span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span><span>Su</span>
                </div>

                {/* Calendar Day Grid Layout Mapping */}
                <div className="grid grid-cols-7 gap-1">
                  {generateDays().map((day) => (
                    <button
                      key={day}
                      onClick={() => handleDateSelect(day)}
                      className="py-1 text-[11px] font-bold text-slate-700 rounded hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button 
              onClick={handleRefresh}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold border border-gray-200 bg-white rounded text-slate-600 hover:bg-gray-50 shadow-sm transition-all active:scale-95"
            >
              <svg className={`w-3.5 h-3.5 text-slate-500 ${isRefreshing ? "animate-spin" : ""}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
              {isRefreshing ? "Refreshing..." : "Refresh"}
            </button>
          </div>
        </div>

        {/* CLOUD STORAGE USAGE & ACTIVE EXPORTS WIDGETS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white border border-gray-200/70 rounded-xl p-6 shadow-sm lg:col-span-2 flex flex-col justify-between">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <span className="text-base">☁️</span>
                <h3 className="text-sm font-bold text-slate-800">Cloud Storage Usage</h3>
              </div>
              <span className="text-[10px] text-gray-400 font-semibold">{isRefreshing ? "Syncing..." : "Updated just now"}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-2 space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1.5">
                    <span className="text-slate-500">{storageMetrics.used} GB used of 100 GB</span>
                    <span className="text-slate-900">{Math.round(storageMetrics.used)}%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-700 rounded-full transition-all duration-500" style={{ width: `${storageMetrics.used}%` }}></div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-[#f8fafd] p-2.5 rounded-lg border border-gray-100">
                    <span className="text-[9px] font-bold text-gray-400 block uppercase">CSV FILES</span>
                    <span className="text-xs font-black text-slate-800 mt-0.5 block">{storageMetrics.csv} GB</span>
                  </div>
                  <div className="bg-[#f8fafd] p-2.5 rounded-lg border border-gray-100">
                    <span className="text-[9px] font-bold text-gray-400 block uppercase">JSON SNAPSHOTS</span>
                    <span className="text-xs font-black text-slate-800 mt-0.5 block">{storageMetrics.json} GB</span>
                  </div>
                  <div className="bg-[#f8fafd] p-2.5 rounded-lg border border-gray-100">
                    <span className="text-[9px] font-bold text-gray-400 block uppercase">LOGS & META</span>
                    <span className="text-xs font-black text-slate-800 mt-0.5 block">{storageMetrics.logs} GB</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-center md:justify-end">
                <div className="relative w-24 h-24 flex items-center justify-center rounded-full border-8 border-gray-100 border-t-indigo-700 border-r-indigo-700 border-b-indigo-700 transform rotate-[45deg]">
                  <div className="transform rotate-[-45deg] text-center">
                    <span className="text-base font-black text-slate-900 block tracking-tighter">{Math.round(storageMetrics.used)}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-[#1d0094] text-white p-5 rounded-xl shadow-md flex items-center justify-between min-h-[95px] relative overflow-hidden">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-indigo-200 block">ACTIVE EXPORTS</span>
                <span className="text-3xl font-black block mt-0.5 tracking-tight transition-all duration-300">{storageMetrics.activeCount}</span>
                <span className="text-[10px] text-indigo-200 font-medium block mt-1">+4 from yesterday</span>
              </div>
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-xl">⏳</div>
            </div>

            <div className="bg-white border border-gray-200/70 p-5 rounded-xl shadow-sm flex items-center justify-between min-h-[95px]">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400 block">AVG. EXPORT TIME</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-2xl font-black text-slate-900 tracking-tight">3.2</span>
                  <span className="text-xs font-bold text-slate-500">min</span>
                </div>
                <span className="text-[10px] text-emerald-500 font-bold block mt-1">↗ +12s since last week</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-50 border border-gray-100 flex items-center justify-center text-base">⏱️</div>
            </div>
          </div>
        </div>

        {/* RECENT EXPORTS TABLE MATRIX */}
        <div className="bg-white border border-gray-200/80 rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center px-6 py-3.5 border-b border-gray-100 gap-3 bg-white">
            <h3 className="text-xs font-black text-slate-800 tracking-wide uppercase">Recent Exports</h3>
            
            <div className="flex items-center gap-1.5 bg-gray-100/80 p-0.5 rounded-lg text-[11px] font-bold">
              {["All", "Completed", "Processing"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1 rounded-md transition-all ${
                    activeTab === tab ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="table-responsive-wrapper">
<table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#f8fafd] text-gray-400 border-b border-gray-200/60 uppercase text-[9px] font-black tracking-wider">
                  <th className="py-3 px-6 w-[35%]">File Name</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Size</th>
                  <th className="py-3 px-4">Created By</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-bold text-slate-700 bg-white">
                {filteredExports.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-gray-400 font-medium">
                      No matching records found for configuration perspective filter.
                    </td>
                  </tr>
                ) : (
                  filteredExports.map((row, index) => (
                    <tr key={index} className="hover:bg-slate-50/40 transition-colors">
                      <td className="py-3.5 px-6">
                        <div className="flex items-center gap-3">
                          <span className={`w-7 h-7 rounded flex items-center justify-center text-xs ${row.isFailed ? "bg-rose-50 border border-rose-100" : "bg-indigo-50 border border-indigo-100/50"}`}>
                            {row.isFailed ? "⚠️" : "📄"}
                          </span>
                          <div>
                            <span className={`font-extrabold text-xs block ${row.isFailed ? "text-rose-600" : "text-slate-900"}`}>{row.name}</span>
                            <span className="text-[10px] text-gray-400 font-medium block mt-0.5">ID: {row.id}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wide ${
                          row.status === "Completed" ? "bg-emerald-50 text-emerald-600" : row.status === "Processing" ? "bg-indigo-50 text-indigo-600" : "bg-rose-50 text-rose-600"
                        }`}>
                          ● {row.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 font-semibold">{row.size}</td>
                      <td className="py-3.5 px-4 flex items-center gap-2">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] border ${row.initial === "AU" ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-600 border-gray-200"}`}>
                          {row.initial}
                        </div>
                        <span className="text-xs text-slate-800 font-medium">{row.user}</span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 font-medium text-[11px]">{row.date}</td>
                      <td className="py-3.5 px-6 text-right">
                        <button className="text-indigo-600 hover:text-[#1d0094] font-bold text-sm">
                          {row.status === "Completed" ? "📥" : row.status === "Processing" ? "✕" : "🔄"}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
</div>
          </div>

          <div className="bg-[#f8fafd] border-t border-gray-100 px-6 py-3.5 flex justify-between items-center text-xs font-bold text-gray-400">
            <span>Showing {filteredExports.length} of 128 exports</span>
            <div className="flex items-center gap-1.5">
              <button className="p-1 px-2.5 bg-white border border-gray-200 rounded text-slate-700 text-[11px] shadow-sm hover:bg-gray-50">‹</button>
              <button className="p-1 px-3 bg-[#1d0094] rounded text-white text-[11px] shadow-sm">1</button>
              <button className="p-1 px-3 bg-white border border-gray-200 rounded text-slate-700 text-[11px] shadow-sm hover:bg-gray-50">2</button>
              <button className="p-1 px-3 bg-white border border-gray-200 rounded text-slate-700 text-[11px] shadow-sm hover:bg-gray-50">3</button>
              <button className="p-1 px-2.5 bg-white border border-gray-200 rounded text-slate-700 text-[11px] shadow-sm hover:bg-gray-50">›</button>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: SCHEDULE RECURRING & EXPORT QUEUE */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200/70 rounded-xl p-6 shadow-sm lg:col-span-2 flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 bg-slate-900 rounded-xl shrink-0 flex items-center justify-center text-xl text-indigo-400 shadow-md">
              ✨
            </div>
            <div className="space-y-3 flex-1 text-center md:text-left">
              <div>
                <h4 className="text-sm font-black text-slate-900">Schedule Recurring Exports</h4>
                <p className="text-xs text-gray-400 font-medium mt-1 leading-relaxed">
                  Automate your reporting workflow by scheduling CSV generations to be delivered directly to your S3 bucket or email every Monday at 8:00 AM.
                </p>
              </div>
              <button 
                onClick={() => setShowScheduleModal(true)}
                className="px-4 py-2 bg-[#1d0094] hover:bg-[#130066] text-white text-xs font-bold rounded-lg shadow-sm transition-all active:scale-[0.98]"
              >
                Set Automation Rule
              </button>
            </div>
          </div>

          <div className="bg-white border border-gray-200/70 rounded-xl p-5 shadow-sm flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-black text-slate-800 uppercase tracking-wide mb-3">Export Queue</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2.5 border border-gray-50 bg-[#f8fafd]/60 rounded-lg">
                  <span className="text-xs font-bold text-slate-900 truncate max-w-[150px]">Legacy_User_Data.csv</span>
                  <span className="text-[9px] font-black bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded uppercase">Queued</span>
                </div>
                <div className="flex justify-between items-center p-2.5 border border-gray-50 bg-[#f8fafd]/60 rounded-lg">
                  <span className="text-xs font-bold text-slate-900 truncate max-w-[150px]">Inventory_Backup_Full.csv</span>
                  <span className="text-[9px] font-black bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded uppercase">Queued</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setShowQueueModal(true)}
              className="w-full text-center text-xs text-[#1d0094] font-black hover:underline mt-4 focus:outline-none"
            >
              View Full Queue ➔
            </button>
          </div>
        </div>

        {/* MODAL OVERLAY TRIGGER FOR QUEUE */}
        {showQueueModal && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-sm w-full overflow-hidden border border-gray-100">
              <div className="p-4 bg-[#1d0094] text-white flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-wider">Full Export Queue</span>
                <button onClick={() => setShowQueueModal(false)} className="text-white hover:text-gray-200 font-bold focus:outline-none">✕</button>
              </div>
              <div className="p-5 text-xs space-y-3 max-h-[300px] overflow-y-auto">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-2.5 border border-gray-50 bg-[#f8fafd]/60 rounded-lg">
                    <span className="text-xs font-bold text-slate-900 truncate max-w-[180px]">Legacy_User_Data.csv</span>
                    <span className="text-[9px] font-black bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded uppercase">Queued</span>
                  </div>
                  <div className="flex justify-between items-center p-2.5 border border-gray-50 bg-[#f8fafd]/60 rounded-lg">
                    <span className="text-xs font-bold text-slate-900 truncate max-w-[180px]">Inventory_Backup_Full.csv</span>
                    <span className="text-[9px] font-black bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded uppercase">Queued</span>
                  </div>
                  <div className="flex justify-between items-center p-2.5 border border-gray-50 bg-[#f8fafd]/60 rounded-lg">
                    <span className="text-xs font-bold text-slate-900 truncate max-w-[180px]">System_Logs_Q3.csv</span>
                    <span className="text-[9px] font-black bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded uppercase">Queued</span>
                  </div>
                  <div className="flex justify-between items-center p-2.5 border border-gray-50 bg-[#f8fafd]/60 rounded-lg">
                    <span className="text-xs font-bold text-slate-900 truncate max-w-[180px]">Marketing_Leads_Sept.csv</span>
                    <span className="text-[9px] font-black bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded uppercase">Queued</span>
                  </div>
                  <div className="flex justify-between items-center p-2.5 border border-gray-50 bg-[#f8fafd]/60 rounded-lg">
                    <span className="text-xs font-bold text-slate-900 truncate max-w-[180px]">Financial_Audit_2023.csv</span>
                    <span className="text-[9px] font-black bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded uppercase">Queued</span>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-gray-50 border-t border-gray-100 flex justify-end gap-2">
                <button onClick={() => setShowQueueModal(false)} className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-bold transition-colors">
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL OVERLAY TRIGGER FOR INTERACTIVE VIEW SUGGESTIONS */}
        {showScheduleModal && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-sm w-full overflow-hidden border border-gray-100">
              <div className="p-4 bg-[#1d0094] text-white flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-wider">Configuration Panel</span>
                <button onClick={() => setShowScheduleModal(false)} className="text-white hover:text-gray-200 font-bold">✕</button>
              </div>
              <div className="p-5 text-xs space-y-3">
                <p className="font-semibold text-slate-700">
                  Automated analytics engine rules suggestion processed successfully for <span className="text-[#1d0094] font-bold">{selectedDate}</span> iteration.
                </p>
                <div className="p-3 bg-slate-50 border border-gray-100 rounded text-gray-500 leading-relaxed font-medium">
                  S3 storage snapshot pipelines will be synchronized automatically. No manual extraction is needed at this time.
                </div>
              </div>
              <div className="p-3 bg-gray-50 border-t border-gray-100 flex justify-end gap-2">
                <button onClick={() => setShowScheduleModal(false)} className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-bold transition-colors">
                  Apply Rule
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </AdminShell>
  );
}