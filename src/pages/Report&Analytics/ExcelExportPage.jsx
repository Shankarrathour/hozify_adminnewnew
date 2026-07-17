import React, { useState } from "react";
import AdminShell from "../../components/layouts/AdminShell";

import Select from "../../components/ui/Select";

export default function ExcelExportPage() {
  // States for interactive actions
  const [currentPage, setCurrentPage] = useState(1);
  const [showSyncContent, setShowSyncContent] = useState(false);
  const [selectedDate, setSelectedDate] = useState("2023-10-01"); // Default date state

  const handleNextPage = () => {
    if (currentPage < 3) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <AdminShell activeTab="Reports & Analytics">
      <div className="w-full min-h-screen bg-[#f8fafd] p-8 text-slate-700 antialiased ">
        
        {/* TOP CONTROLS & TIMELINE FILTER PANEL */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Export Center</h1>
            <p className="text-xs text-gray-400 mt-0.5 font-semibold">
              Manage and download your historical data snapshots.
            </p>
          </div>
          
          {/* Filter Bar Controls */}
          <div className="flex flex-wrap items-end gap-3 mt-4 lg:mt-0">
            
            {/* Date Picker Filter with Integrated More Filters Icon (🎛️) */}
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-gray-400 mb-1">Select Date</span>
              <div className="relative flex items-center bg-white border border-gray-200 rounded shadow-sm px-3 py-[7px] focus-within:border-indigo-500">
                <span className="text-xs mr-2 pointer-events-none">📅</span>
                <input 
                  type="date" 
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="bg-transparent text-xs font-bold text-slate-700 focus:outline-none cursor-pointer w-[110px]"
                />
              </div>
            </div>

            {/* Clean Data Type Dropdown (No Side Icon Here) */}
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-gray-400 mb-1">Data Type</span>
              <Select
                className="px-3 py-[7px] bg-white border border-gray-200 rounded text-xs font-bold text-slate-700 shadow-sm focus:outline-none focus:border-indigo-500 min-w-[130px]"
                options={[{
                  label: "All Types",
                  value: "All Types"
                }, {
                  label: "Financial",
                  value: "Financial"
                }, {
                  label: "Marketing",
                  value: "Marketing"
                }, {
                  label: "System",
                  value: "System"
                }, {
                  label: "Operational",
                  value: "Operational"
                }]} />
            </div>

          </div>
        </div>

        {/* METRICS & ACTIVE JOBS INFRASTRUCTURE */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-5 mb-6">
          {/* Card 1: Total Exports */}
          <div className="bg-white border border-gray-200/60 rounded-xl p-5 shadow-sm md:col-span-1 lg:col-span-1 flex flex-col justify-between min-h-[115px]">
            <div>
              <span className="text-[9px] font-black uppercase tracking-wider text-gray-400 block">TOTAL EXPORTS</span>
              <span className="text-2xl font-black text-slate-900 block mt-1 tracking-tight">1,248</span>
            </div>
            <p className="text-[10px] font-bold text-emerald-500 flex items-center gap-0.5">
              <span>📈</span> 12% from last month
            </p>
          </div>

          {/* Card 2: Storage Used */}
          <div className="bg-white border border-gray-200/60 rounded-xl p-5 shadow-sm md:col-span-1 lg:col-span-1 flex flex-col justify-between min-h-[115px]">
            <div>
              <span className="text-[9px] font-black uppercase tracking-wider text-gray-400 block">STORAGE USED</span>
              <span className="text-2xl font-black text-slate-900 block mt-1 tracking-tight">4.2 GB</span>
            </div>
            <div className="w-full bg-gray-100 h-1 rounded-full overflow-hidden mt-2">
              <div className="h-full bg-slate-800 rounded-full" style={{ width: "84%" }}></div>
            </div>
          </div>

          {/* Card 3: Active Generating Processing Job Status */}
          <div className="bg-[#1d0094] text-white border border-transparent rounded-xl p-5 shadow-md md:col-span-2 lg:col-span-3 flex items-center justify-between min-h-[115px] relative overflow-hidden">
            <div className="space-y-1 z-10">
              <span className="text-[9px] font-bold uppercase tracking-widest text-indigo-200 block">ACTIVE JOBS</span>
              <h2 className="text-xl font-black tracking-tight leading-snug">Generating: Q4 Revenue Report</h2>
              <span className="text-[10px] text-indigo-200 font-medium block">Est. completion in 2 mins</span>
            </div>
            
            <div className="flex flex-col items-center justify-center shrink-0 z-10">
              <span className="text-2xl font-black tracking-tighter">78%</span>
              <span className="text-[9px] uppercase font-bold tracking-widest text-indigo-200 mt-0.5">Progress</span>
            </div>

            <div className="absolute right-[-20px] bottom-[-20px] w-32 h-32 bg-indigo-500/10 rounded-full pointer-events-none"></div>
          </div>
        </div>

        {/* LOG DATA CONTAINER MATRIX */}
        <div className="bg-white border border-gray-200/70 rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="flex justify-between items-center px-5 py-3.5 border-b border-gray-100 bg-white">
            <span className="text-xs font-black text-slate-800 tracking-wide uppercase">Recent Export Logs</span>
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <span className="font-semibold text-[11px]">Sorted by:</span>
              <button className="text-slate-700 font-bold hover:underline inline-flex items-center gap-0.5">
                Newest First <span>▼</span>
              </button>
            </div>
          </div>

          {/* Table Framework */}
          <div className="overflow-x-auto">
            <div className="table-responsive-wrapper">
<table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#f8fafd] text-gray-400 border-b border-gray-200/60 uppercase text-[9px] font-black tracking-wider">
                  <th className="py-3 px-5">File Name</th>
                  <th className="py-3 px-4">Data Type</th>
                  <th className="py-3 px-4">Generated By</th>
                  <th className="py-3 px-4">Date & Time</th>
                  <th className="py-3 px-4">Size</th>
                  <th className="py-3 px-5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-bold text-slate-700 bg-white">
                <tr className="hover:bg-slate-50/40 transition-colors">
                  <td className="py-3.5 px-5 flex items-center gap-3">
                    <span className="w-8 h-8 rounded bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center text-xl shadow-sm">📄</span>
                    <span className="font-black text-slate-900 text-xs">q4_financial_consolidated_2023.xlsx</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded uppercase">Financial</span>
                  </td>
                  <td className="py-3.5 px-4 flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-slate-200 overflow-hidden shrink-0">
                      <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=40&q=80" alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-xs text-slate-800 font-medium">Sarah Jenkins</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 font-medium text-[11px] leading-tight">
                    Oct 24, 2023 <span className="block text-gray-400 text-[10px] mt-0.5">14:22</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-semibold text-xs">24.5 MB</td>
                  <td className="py-3.5 px-5 text-right">
                    <span className="text-[9px] font-black bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded inline-flex items-center gap-1 uppercase tracking-wide">
                      ● Ready
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
</div>
          </div>

          {/* Pagination Controls */}
          <div className="bg-[#f8fafd] border-t border-gray-100 px-5 py-3 flex justify-between items-center text-xs font-bold text-gray-400">
            <span>Showing {(currentPage - 1) * 10 + 1}-{currentPage * 10} of 1,248 exports</span>
            <div className="flex items-center gap-1">
              <button 
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`px-2.5 py-1 bg-white border border-gray-200 rounded font-bold text-[11px] shadow-sm transition-colors ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-slate-700 hover:bg-gray-50'}`}
              >
                Previous
              </button>
              
              {[1, 2, 3].map((page) => (
                <button 
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 border rounded text-[11px] shadow-sm font-bold transition-colors ${currentPage === page ? 'bg-[#1d0094] border-transparent text-white' : 'bg-white border-gray-200 text-slate-700 hover:bg-gray-50'}`}
                >
                  {page}
                </button>
              ))}

              <button 
                onClick={handleNextPage}
                disabled={currentPage === 3}
                className={`px-2.5 py-1 bg-white border border-gray-200 rounded font-bold text-[11px] shadow-sm transition-colors ${currentPage === 3 ? 'text-gray-300 cursor-not-allowed' : 'text-slate-700 hover:bg-gray-50'}`}
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM UTILITY ROW MODULES */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="bg-slate-50/50 border border-gray-200/70 rounded-xl p-5 shadow-sm md:col-span-3 flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-xl text-[#1d0094] shrink-0 font-bold">
              ℹ️
            </div>
            <div>
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wide">Auto-Archival Policy</h4>
              <p className="text-[11px] text-gray-500 leading-relaxed mt-1 font-medium">
                Exports older than 90 days are automatically moved to cold storage to optimize system performance.
              </p>
            </div>
          </div>

          <div className="bg-white border border-gray-200/70 rounded-xl p-5 shadow-sm md:col-span-2 flex flex-col justify-between text-center min-h-[110px]">
            <div className="flex items-center justify-center gap-2 text-gray-500">
              <span className="text-xl">☁️</span>
              <span className="text-xs font-black text-slate-900 uppercase tracking-wide">External Data Bridge</span>
            </div>
            <p className="text-[11px] text-gray-400 font-semibold leading-normal mt-1">
              Connect your AWS S3 bucket to automatically sync daily Excel dumps.
            </p>
            <button 
              onClick={() => setShowSyncContent(!showSyncContent)}
              className="text-xs text-[#1d0094] font-black hover:underline mt-2 cursor-pointer focus:outline-none"
            >
              {showSyncContent ? "Hide Configuration" : "Configure Sync"}
            </button>
          </div>
        </div>

        {/* CONDITIONAL RELATED CONTENT MODULE FOR CONFIGURE SYNC */}
        {showSyncContent && (
          <div className="mt-6 bg-indigo-50/60 border border-indigo-100 rounded-xl p-6 shadow-sm animate-fadeIn">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">⚙️</span>
              <h3 className="text-sm font-bold text-indigo-950 uppercase tracking-wider">Sync Pipeline Related Content</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-white p-4 border border-indigo-100/80 rounded-lg shadow-xs">
                <span className="font-bold block text-slate-900 mb-1">Active Pipeline Status</span>
                <p className="text-gray-500 font-medium">Connected to AWS Bucket <code className="bg-gray-100 px-1 py-0.5 rounded text-rose-600">us-east-1/excel-dumps</code>.</p>
              </div>
              <div className="bg-white p-4 border border-indigo-100/80 rounded-lg shadow-xs">
                <span className="font-bold block text-slate-900 mb-1">Sync Cron Schedule</span>
                <p className="text-gray-500 font-medium">Automated script runs at midnight <code className="text-slate-900 font-bold">00:00 UTC</code> daily.</p>
              </div>
              <div className="bg-white p-4 border border-indigo-100/80 rounded-lg shadow-xs">
                <span className="font-bold block text-slate-900 mb-1">Recent Failure Metrics</span>
                <p className="text-gray-500 font-medium">0 system pipeline drops reported in the past 30 days.</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </AdminShell>
  );
}
