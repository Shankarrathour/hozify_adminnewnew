import React, { useState, useRef, useEffect } from "react";
import AdminShell from "../../components/layouts/AdminShell";
import { Filter, Clock } from "lucide-react";

export default function ExportCenterPage() {
  // Initial Table State Mock Data
  const initialData = [
    { id: 1, name: "Q3_Revenue_Performance_Final.pdf", category: "Financial", tag: "Enterprise Core", date: "Oct 12, 2023", time: "14:22", size: "4.2 MB", status: "Completed" },
    { id: 2, name: "Marketing_Campaign_Efficiency_v2.pdf", category: "Marketing", tag: "North America", date: "Oct 11, 2023", time: "09:15", size: "8.7 MB", status: "Completed" },
    { id: 3, name: "Weekly_Liability_Check.pdf", category: "Operational", tag: "Global Risk", date: "Oct 12, 2023", time: "16:05", size: "--", status: "Generating..." },
    { id: 4, name: "Inventory_Turnover_Analysis.pdf", category: "Operational", tag: "Supply Chain", date: "Oct 10, 2023", time: "11:40", size: "3.1 MB", status: "Completed" }
  ];

  // States
  const [reportData, setReportData] = useState(initialData);
  const [activeFilter, setActiveFilter] = useState("All");
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [activeRowActionMenu, setActiveRowActionMenu] = useState(null); // stores row ID or 'top-header'
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filterRef = useRef(null);
  const actionMenuRef = useRef(null);

  // Close dropdown modals when clicking anywhere outside
  useEffect(() => {
    function handleOutsideClick(e) {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setIsFilterDropdownOpen(false);
      }
      if (actionMenuRef.current && !actionMenuRef.current.contains(e.target)) {
        setActiveRowActionMenu(null);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // 1. Download File Programmatically
  const triggerDownload = (fileName) => {
    const dataBlob = new Blob([`Dummy data content stream for simulated report: ${fileName}`], { type: "application/pdf" });
    const downloadUrl = URL.createObjectURL(dataBlob);
    const linkElement = document.createElement("a");
    linkElement.href = downloadUrl;
    linkElement.download = fileName;
    document.body.appendChild(linkElement);
    linkElement.click();
    document.body.removeChild(linkElement);
    URL.revokeObjectURL(downloadUrl);
  };

  // 2. Create New Dummy PDF Report Row
  const createNewPdfReport = () => {
    const timestamp = new Date();
    const uniqueId = reportData.length + 1;
    const newReport = {
      id: uniqueId,
      name: `Custom_OnDemand_Report_0${uniqueId}.pdf`,
      category: activeFilter !== "All" ? activeFilter : "Financial",
      tag: "User Generated",
      date: timestamp.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: timestamp.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
      size: "--",
      status: "Generating..."
    };
    setReportData([newReport, ...reportData]);
    
    // Simulate compilation completion after 3 seconds
    setTimeout(() => {
      setReportData(prevData => 
        prevData.map(item => 
          item.id === uniqueId ? { ...item, status: "Completed", size: "2.4 MB" } : item
        )
      );
    }, 3000);
  };

  // 3. Refresh Trigger
  const refreshTableData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setReportData(initialData);
      setActiveFilter("All");
      setIsRefreshing(false);
    }, 800);
  };

  // Filter Categories compiled dynamically
  const categories = ["All", "Financial", "Marketing", "Operational"];
  const filteredReports = activeFilter === "All" 
    ? reportData 
    : reportData.filter(item => item.category === activeFilter);

  return (
    <AdminShell activeTab="Reports & Analytics">
      <div className="w-full min-h-screen bg-[#f8fafd] p-8 text-slate-700 antialiased ">
        
        {/* TOP TITLE HEADER & CTA BUTTONS */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Export Center</h1>
            <p className="text-sm text-gray-400 mt-1 font-medium">
              Manage and track your generated enterprise intelligence reports.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            {/* Filter Toggle Menu via Icon */}
            <div className="relative" ref={filterRef}>
              <button 
                onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold border rounded shadow-sm transition-all h-[36px] ${
                  isFilterDropdownOpen || activeFilter !== "All"
                    ? "bg-indigo-50 border-indigo-400 text-indigo-700"
                    : "bg-white border-gray-200 text-slate-600 hover:bg-gray-50"
                }`}
              >
                <Filter size={14} className={isFilterDropdownOpen || activeFilter !== "All" ? "text-indigo-700" : "text-slate-500"} /> 
                Filter: <span className="text-slate-900 font-extrabold">{activeFilter}</span>
              </button>

              {isFilterDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50 min-w-[140px] origin-top-right animate-fadeIn">
                  <div className="px-3 py-1.5 border-b border-gray-100 text-[9px] font-black text-gray-400 uppercase tracking-wider">
                    Select Segment
                  </div>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setActiveFilter(cat);
                        setIsFilterDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs font-bold block transition-colors ${
                        activeFilter === cat ? "bg-[#1d0094] text-white" : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {cat} {activeFilter === cat && "✓"}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Create PDF Button Action Layer */}
            <button 
              onClick={createNewPdfReport}
              className="flex items-center gap-2 px-4 py-2 h-[36px] text-xs font-bold bg-[#1d0094] text-white rounded hover:bg-[#130066] shadow-sm transition-colors"
            >
              <span className="text-xs font-light">📄</span> Create PDF Report
            </button>
          </div>
        </div>

        {/* METRICS THREE-CARD GRID LAYER */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Card 1: Storage */}
          <div className="bg-white border border-gray-200/70 rounded-xl p-5 shadow-sm flex flex-col justify-between min-h-[125px]">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">STORAGE USED</span>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-3xl font-extrabold text-slate-900 tracking-tight">1.2</span>
                <span className="text-xs font-bold text-gray-400">GB / 5GB</span>
              </div>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden mt-4">
              <div className="h-full bg-slate-900 rounded-full" style={{ width: "24%" }}></div>
            </div>
          </div>

          {/* Card 2: Total Reports */}
          <div className="bg-white border border-gray-200/70 rounded-xl p-5 shadow-sm flex flex-col justify-between min-h-[125px]">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">TOTAL REPORTS</span>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-3xl font-extrabold text-slate-900 tracking-tight">{filteredReports.length}</span>
                <span className="text-xs font-semibold text-gray-400 pl-1">Matching items</span>
              </div>
            </div>
            <p className="text-xs font-bold text-emerald-500 mt-4 flex items-center gap-1">
              <span className="text-sm">↗</span> Live data filtered metrics
            </p>
          </div>

          {/* Card 3: Next Scheduled */}
          <div className="bg-white border border-gray-200/70 rounded-xl p-5 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[125px]">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">NEXT SCHEDULED</span>
              <div className="flex items-baseline gap-1.5 mt-2">
                <span className="text-2xl font-extrabold text-slate-900 tracking-tight">Oct 14</span>
                <span className="text-xs text-gray-400 font-bold">at 09:00 AM</span>
              </div>
            </div>
            <p className="text-[10px] font-black text-slate-500 tracking-wider uppercase mt-4">
              WEEKLY FINANCIAL AUDIT
            </p>
            <div className="absolute right-2 bottom-2 text-slate-100 opacity-80 pointer-events-none">
              <Clock size={80} strokeWidth={1.5} />
            </div>
          </div>
        </div>

        {/* CORE DATA PANEL: GENERATION HISTORY */}
        <div className="bg-white border border-gray-200/80 rounded-xl shadow-sm overflow-hidden" ref={actionMenuRef}>
          
          {/* Table Headline Utilities */}
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-white">
            <h3 className="text-base font-bold text-slate-900">Generation History</h3>
            <div className="flex items-center gap-4 text-gray-400 text-xs relative">
              
              {/* Refresh Action Trigger */}
              <button 
                onClick={refreshTableData}
                title="Refresh Grid Data"
                className={`hover:text-slate-600 transition-all focus:outline-none ${isRefreshing ? "animate-spin text-indigo-600" : ""}`} 
                style={{ fontSize: '22px', lineHeight: '1' }}
              >
                🔄
              </button>

              {/* Three dots core control module global actions */}
              <button 
                onClick={() => setActiveRowActionMenu(activeRowActionMenu === 'top-header' ? null : 'top-header')}
                className="hover:text-slate-600 transition-colors font-black tracking-widest focus:outline-none" 
                style={{ fontSize: '18px', lineHeight: '1' }}
              >
                •••
              </button>

              {activeRowActionMenu === 'top-header' && (
                <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-xl py-1.5 z-50 min-w-[150px] font-bold text-slate-700">
                  <button onClick={() => { alert("All logs marked read"); setActiveRowActionMenu(null); }} className="w-full text-left px-4 py-2 hover:bg-gray-50 text-xs block">Mark All Read</button>
                  <button onClick={() => { alert("Exporting full index spreadsheet..."); setActiveRowActionMenu(null); }} className="w-full text-left px-4 py-2 hover:bg-gray-50 text-xs block text-indigo-600">Bulk Download CSV</button>
                </div>
              )}
            </div>
          </div>

          {/* Data Table Core View */}
          <div className="overflow-x-auto">
            <div className="table-responsive-wrapper">
<table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#f8fafd] text-gray-400 border-b border-gray-200/60 uppercase text-[10px] font-bold tracking-wider">
                  <th className="py-4 px-6 w-[40%]">Report Name</th>
                  <th className="py-4 px-4">Generation Date</th>
                  <th className="py-4 px-4">File Size</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-semibold text-slate-700 bg-white">
                
                {filteredReports.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-gray-400 font-medium">
                      No reports found matching criteria.
                    </td>
                  </tr>
                ) : (
                  filteredReports.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/40 transition-colors">
                      <td className="py-4 px-6 flex items-center gap-3">
                        <span className="w-9 h-9 rounded bg-slate-50 border border-gray-100 flex items-center justify-center text-2xl shadow-sm">
                          {row.category === "Marketing" ? "📊" : row.category === "Operational" ? "🏛️" : "📄"}
                        </span>
                        <div>
                          <span className="font-bold text-slate-900 block text-sm">{row.name}</span>
                          <span className="text-[11px] text-gray-400 font-medium block mt-0.5">{row.category} • {row.tag}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-slate-600">{row.date} • <span className="text-gray-400 font-normal">{row.time}</span></td>
                      <td className="py-4 px-4 text-slate-600">{row.size}</td>
                      <td className="py-4 px-4">
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wide ${
                          row.status === "Completed" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600 animate-pulse"
                        }`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right relative">
                        {row.status === "Completed" ? (
                          <div className="inline-flex items-center gap-3">
                            {/* Functionality attached client side simulation file writer */}
                            <button 
                              onClick={() => triggerDownload(row.name)}
                              className="text-xs font-bold text-slate-700 hover:text-[#1d0094] inline-flex items-center gap-1 bg-gray-50 border border-gray-200 rounded px-2 py-1 transition-all shadow-xs"
                            >
                              📥 Download
                            </button>
                            
                            {/* Action Menu Ellipsis Button */}
                            <button 
                              onClick={() => setActiveRowActionMenu(activeRowActionMenu === row.id ? null : row.id)}
                              className="text-slate-400 hover:text-slate-900 font-black tracking-wider text-sm px-1"
                            >
                              •••
                            </button>
                          </div>
                        ) : (
                          /* Generating Item Ellipsis Configuration */
                          <button 
                            onClick={() => setActiveRowActionMenu(activeRowActionMenu === row.id ? null : row.id)}
                            className="text-gray-400 hover:text-slate-600 text-sm font-black tracking-widest px-1"
                          >
                            •••
                          </button>
                        )}

                        {/* Inline Actions contextual menu row layout trigger */}
                        {activeRowActionMenu === row.id && (
                          <div className="absolute right-6 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl py-1.5 z-50 min-w-[120px] text-left font-bold text-slate-700">
                            <button onClick={() => { alert(`Viewing metadata for item: ${row.name}`); setActiveRowActionMenu(null); }} className="w-full text-left px-3 py-1.5 hover:bg-gray-50 text-xs block">View Info</button>
                            <button onClick={() => { setReportData(reportData.filter(i => i.id !== row.id)); setActiveRowActionMenu(null); }} className="w-full text-left px-3 py-1.5 hover:bg-rose-50 text-xs block text-rose-600">Delete Log</button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}

              </tbody>
            </table>
</div>
          </div>

          {/* Pagination Navigation Footer */}
          <div className="bg-[#f8fafd] border-t border-gray-100 px-6 py-4 flex justify-between items-center text-xs font-bold text-gray-400">
            <span>Showing 1-{filteredReports.length} of {filteredReports.length} results</span>
            <div className="flex items-center gap-2">
              <button disabled className="px-3 py-1.5 bg-white border border-gray-200 rounded text-gray-300 font-bold cursor-not-allowed shadow-sm">Previous</button>
              <button disabled className="px-3 py-1.5 bg-white border border-gray-200 rounded text-gray-300 font-bold cursor-not-allowed shadow-sm">Next</button>
            </div>
          </div>

        </div>

      </div>
    </AdminShell>
  );
}