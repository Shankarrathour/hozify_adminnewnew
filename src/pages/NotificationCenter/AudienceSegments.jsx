import React, { useState } from "react";
import AdminShell from "../../components/layouts/AdminShell";
import { useToast } from "../../components/common/ToastNotification";
import {
  Users,
  TrendingUp,
  Download,
  Plus,
  SlidersHorizontal,
  ChevronDown,
  Star,
  AlertTriangle,
  UserPlus,
  Smartphone,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Zap,
  Layers,
  X
} from "lucide-react";

import Select from "../../components/ui/Select";

// Initial Static Dataset
const INITIAL_SEGMENTS = [
  { id: 1, name: "Power Users", description: "Spent > $500 total", size: 42805, growth: "▲ +5.2%", growthType: "pos", activity: "2 hours ago", iconType: "star" },
  { id: 2, name: "Churn Risk", description: "No activity in 30 days", size: 15221, growth: "▼ -2.1%", growthType: "neg", activity: "14 mins ago", iconType: "alert" },
  { id: 3, name: "New Signups", description: "Joined in last 7 days", size: 8443, growth: "▲ +18.4%", growthType: "pos", activity: "Just now", iconType: "userplus" },
  { id: 4, name: "Mobile App Users", description: "Android and iOS active sessions", size: 312900, growth: "— 0.0%", growthType: "neutral", activity: "5 hours ago", iconType: "phone" }
];

export default function AudienceSegments() {
  const { addToast } = useToast();
  const [segments, setSegments] = useState(INITIAL_SEGMENTS);
  const [exporting, setExporting] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");
  const [trendRange, setTrendRange] = useState("30D");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Modal
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newSegment, setNewSegment] = useState({ name: "", description: "", size: "" });

  // Filtering
  const filteredSegments = segments.filter(item => filterStatus === "All" || (filterStatus === "Large" && item.size > 15000));

  // Pagination Logic
  const totalPages = Math.max(1, Math.ceil(filteredSegments.length / itemsPerPage));
  const currentItems = filteredSegments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const dynamicTotalReach = segments.reduce((acc, curr) => acc + curr.size, 1200133);

  // Handlers
  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!newSegment.name || !newSegment.size) return addToast("Please fill out all required fields", "warning");

    const randomId = Math.floor(Math.random() * 1000) + 10;
    const created = {
      id: randomId,
      name: newSegment.name,
      description: newSegment.description || "Custom audience segment",
      size: parseInt(newSegment.size, 10),
      growth: "▲ +1.5%",
      growthType: "pos",
      activity: "Just now",
      iconType: "zap"
    };

    setSegments([created, ...segments]);
    setIsCreateModalOpen(false);
    setNewSegment({ name: "", description: "", size: "" });
    setCurrentPage(1);
    addToast(`Segment "${created.name}" created successfully!`, "success");
  };

  const handleExportData = () => {
    setExporting(true);
    setTimeout(() => {
      const headers = ['Segment Name', 'Description', 'Volume Size', 'Growth', 'Activity'];
      const csvContent = [
        headers.join(','),
        ...filteredSegments.map(item => `"${item.name}","${item.description}","${item.size}","${item.growth}","${item.activity}"`)
      ].join('\n');
  
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'audience_segments.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setExporting(false);
      addToast(`Successfully exported ${filteredSegments.length} segments to CSV!`, "success");
    }, 600);
  };

  const handleDeleteSegment = (id) => {
    setSegments(segments.filter(item => item.id !== id));
    addToast("Segment removed from matrix.", "success");
    if (currentItems.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const generateBars = (range) => {
    // Generate random heights based on range to make it look dynamic
    let count = range === '7D' ? 7 : range === '30D' ? 12 : 24;
    let base = range === '7D' ? 30 : range === '30D' ? 45 : 60;
    return Array.from({length: count}).map((_, i) => (
      <div key={i} className={`w-full rounded-sm transition-all duration-500 ${i === count - 1 ? 'bg-[#251fa3]' : 'bg-blue-100/70'}`} style={{ height: `${Math.max(15, Math.min(100, base + Math.sin(i) * 20 + Math.random() * 30))}%` }} />
    ));
  };

  return (
    <AdminShell activeTab="Audience" searchPlaceholder="Search audience or segments...">
      <div className="min-h-screen bg-slate-50 p-8 text-slate-800 space-y-6">
        
        {/* ================= EXACT TOP BREADCRUMB HEADING & ACTIONS ================= */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <span>Audience</span>
              <span className="text-[10px] font-normal text-slate-300">&gt;</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-950 mt-1 tracking-tight">
              Audience Segments
            </h1>
            <p className="text-xs text-slate-500 mt-1 font-normal">
              Manage and organize your user base into targeted groups.
            </p>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            <button 
              onClick={handleExportData}
              disabled={exporting || filteredSegments.length === 0}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-white text-slate-700 border border-slate-200 font-semibold text-sm hover:bg-slate-50 transition-all shadow-sm active:scale-95 disabled:opacity-60 cursor-pointer"
            >
              <Download size={15} className={exporting ? "animate-bounce text-[#251fa3]" : "text-slate-500"} />
              {exporting ? "Compiling..." : "Export Segment"}
            </button>
            <button 
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-[#251fa3] text-white font-semibold text-sm hover:bg-[#1d1880] transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <Plus size={15} />
              Create Segment
            </button>
          </div>
        </div>

        {/* ================= TOP STATS & TRENDS GRID (Dark Blue Borders) ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Total Reach Card */}
          <div className="bg-white rounded-xl border border-[#251fa3]/30 hover:border-[#251fa3] transition-colors p-6 shadow-sm flex flex-col justify-between cursor-pointer">
            <div className="flex justify-between items-start">
              <div className="p-2.5 bg-indigo-50 text-[#251fa3] rounded-md">
                <Users size={20} />
              </div>
              <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-sm">
                +12.4%
              </span>
            </div>
            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                TOTAL REACH
              </p>
              <h3 className="mt-1 text-3xl font-extrabold text-slate-900 tracking-tight transition-all">
                {dynamicTotalReach.toLocaleString()}
              </h3>
              <p className="mt-2 text-xs text-slate-400 font-medium">
                Active subscribers across {segments.length} working segments
              </p>
            </div>
          </div>

          {/* Growth Trend Bar Graph Card */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-[#251fa3]/30 hover:border-[#251fa3] transition-colors p-6 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-bold text-slate-900">Growth Trend Summary</h4>
              <div className="flex bg-slate-100 p-0.5 rounded-md text-xs font-bold text-slate-500">
                <button onClick={() => { setTrendRange("7D"); addToast("Showing 7-day trend", "info"); }} className={`px-3 py-1 rounded cursor-pointer transition-colors ${trendRange === "7D" ? "bg-[#0a0f29] text-white shadow-sm" : "hover:text-slate-800"}`}>7D</button>
                <button onClick={() => { setTrendRange("30D"); addToast("Showing 30-day trend", "info"); }} className={`px-3 py-1 rounded cursor-pointer transition-colors ${trendRange === "30D" ? "bg-[#0a0f29] text-white shadow-sm" : "hover:text-slate-800"}`}>30D</button>
                <button onClick={() => { setTrendRange("12M"); addToast("Showing 12-month trend", "info"); }} className={`px-3 py-1 rounded cursor-pointer transition-colors ${trendRange === "12M" ? "bg-[#0a0f29] text-white shadow-sm" : "hover:text-slate-800"}`}>12M</button>
              </div>
            </div>

            {/* Dynamic Bar Metrics */}
            <div className="h-24 flex items-end gap-2 sm:gap-3 pt-4">
              {generateBars(trendRange)}
            </div>
          </div>

        </div>

        {/* ================= ALL SEGMENTS LIST TABLE (Excel Format Design) ================= */}
        <div className="bg-white border-2 border-slate-300 rounded shadow-sm overflow-hidden  text-xs">
          
          {/* Spreadsheet Header Controller Row */}
          <div className="p-4 bg-slate-100 border-b-2 border-slate-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <h3 className="text-xs font-bold text-slate-700 tracking-tight">💾 ActiveWorkbook: segments_compiled_sheet.xlsx</h3>
            </div>
            
            <div className="relative self-end sm:self-auto">
              <Select
                value={filterStatus}
                onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}
                className="appearance-none pl-8 pr-10 py-1.5 rounded-md border border-slate-300 bg-white text-slate-700 text-xs font-semibold focus:outline-none focus:border-[#251fa3] min-w-[140px] cursor-pointer"
                options={[{
                  label: "Status: All Rows",
                  value: "All"
                }, {
                  label: "Size > 15,000",
                  value: "Large"
                }]} />
              <SlidersHorizontal className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" size={12} />

            </div>
          </div>

          {/* Hardcore Grid-Border Excel Layout */}
          <div className="overflow-x-auto min-h-[150px]">
            <div className="table-responsive-wrapper">
<table className="w-full border-collapse text-left text-sm min-w-[800px]">
                <thead>
                  <tr className="bg-slate-200 text-slate-600 font-bold border-b border-slate-300 text-left select-none text-[10px]">
                    <th className="border border-slate-300 bg-slate-300/70 w-9 text-center text-slate-500 font-extrabold"></th>
                    <th className="border border-slate-300 px-4 py-1.5 uppercase tracking-wide">A: Segment Node Block</th>
                    <th className="border border-slate-300 px-4 py-1.5 uppercase tracking-wide">B: Volume Size (Count)</th>
                    <th className="border border-slate-300 px-4 py-1.5 uppercase tracking-wide">C: Growth Velocity (30D)</th>
                    <th className="border border-slate-300 px-4 py-1.5 uppercase tracking-wide">D: Stamp Logs</th>
                    <th className="border border-slate-300 px-4 py-1.5 text-center w-24">COMMANDS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-300 bg-white">
                  {currentItems.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="p-8 text-center text-slate-500  font-medium">No segments match your filters.</td>
                    </tr>
                  ) : (
                    currentItems.map((segment, index) => (
                      <tr key={segment.id} className="hover:bg-amber-50/40 transition-colors">
                        
                        {/* Excel Side Index Counter Grid Block */}
                        <td className="border border-slate-300 bg-slate-100 text-center font-bold text-slate-400 text-[10px] select-none">
                          {(currentPage - 1) * itemsPerPage + index + 1}
                        </td>
                        
                        {/* Column A: Meta Title Info */}
                        <td className="border border-slate-300 px-4 py-3 ">
                          <div className="flex items-center gap-3">
                            <div className={`p-1.5 rounded ${
                              segment.iconType === "star" ? "bg-indigo-50 text-[#251fa3]" :
                              segment.iconType === "alert" ? "bg-red-50 text-red-500" :
                              segment.iconType === "userplus" ? "bg-blue-50 text-blue-500" :
                              "bg-slate-100 text-slate-600"
                            }`}>
                              {segment.iconType === "star" && <Star size={14} fill="currentColor" />}
                              {segment.iconType === "alert" && <AlertTriangle size={14} />}
                              {segment.iconType === "userplus" && <UserPlus size={14} />}
                              {segment.iconType === "phone" && <Smartphone size={14} />}
                              {segment.iconType === "zap" && <Zap size={14} fill="currentColor" />}
                            </div>
                            <div>
                              <div className="font-bold text-slate-900 text-sm hover:text-indigo-600 cursor-pointer transition-colors">{segment.name}</div>
                              <div className="text-[11px] text-slate-400 font-normal">{segment.description}</div>
                            </div>
                          </div>
                        </td>

                        {/* Column B: Metrics Size */}
                        <td className="border border-slate-300 px-4 py-3 text-slate-800 text-xs font-bold ">
                          {segment.size.toLocaleString()}
                        </td>

                        {/* Column C: Growth Delta Indicator */}
                        <td className={`border border-slate-300 px-4 py-3 text-xs font-bold  ${
                          segment.growthType === "pos" ? "text-green-600" : 
                          segment.growthType === "neg" ? "text-red-500" : "text-slate-400"
                        }`}>
                          {segment.growth}
                        </td>

                        {/* Column D: Local Activity Time Log */}
                        <td className="border border-slate-300 px-4 py-3 text-slate-400  text-xs">
                          {segment.activity}
                        </td>

                        {/* Explicit Workspace Action Cells */}
                        <td className="border border-slate-300 px-4 py-3 text-center ">
                          <div className="flex justify-center gap-3 text-slate-400">
                            <button 
                              onClick={() => addToast(`Opening row modification pipeline for: ${segment.name}`, "info")}
                              className="hover:text-indigo-600 transition-colors p-1 hover:bg-indigo-50 rounded cursor-pointer"
                              title="Edit Segment"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button 
                              onClick={() => handleDeleteSegment(segment.id)}
                              className="hover:text-red-500 transition-colors p-1 hover:bg-red-50 rounded cursor-pointer"
                              title="Delete Segment"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>

                      </tr>
                    ))
                  )}
                </tbody>
              </table>
</div>
          </div>

          {/* Excel Footer Index Status Meta Bar */}
          {filteredSegments.length > 0 && (
            <div className="flex items-center justify-between p-3 border-t-2 border-slate-300 bg-slate-50  text-[11px] text-slate-500 font-medium">
              <div>Spreadsheet rows active: Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredSegments.length)} of {filteredSegments.length} target arrays parsed.</div>
              <div className="flex items-center gap-1.5">
                <button 
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`p-1 rounded border border-slate-300 ${currentPage === 1 ? 'bg-slate-100 text-slate-300' : 'bg-white text-slate-500 hover:bg-slate-100 cursor-pointer'}`}
                >
                  <ChevronLeft size={14} />
                </button>
                <button className="h-6 w-6 rounded bg-[#0a0f29] text-white flex items-center justify-center font-bold text-[11px]">{currentPage}</button>
                <button 
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className={`p-1 rounded border border-slate-300 ${currentPage === totalPages ? 'bg-slate-100 text-slate-300' : 'bg-white text-slate-500 hover:bg-slate-100 cursor-pointer'}`}
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ================= BOTTOM FOOTER SECTION GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Box Left: Automate Your Audience */}
          <div className="bg-gradient-to-br from-[#0a0c27] to-[#030416] text-white rounded-xl p-6 border border-slate-800 flex flex-col justify-between relative overflow-hidden min-h-[180px]">
            <div className="space-y-2 max-w-sm z-10">
              <h3 className="text-base font-bold tracking-tight">Automate Your Audience</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                Connect your CRM to automatically sync segments in real-time and trigger automated workflows based on user behavior changes.
              </p>
            </div>
            <button 
              onClick={() => addToast("Launching CRM Integration portal...", "info")}
              className="mt-4 self-start px-4 py-2 border border-slate-700 bg-transparent text-xs font-semibold rounded hover:bg-white/10 transition-colors z-10 cursor-pointer"
            >
              Configure Integration
            </button>
            <Layers className="absolute right-4 bottom-4 text-slate-800/40 h-28 w-28 pointer-events-none" />
          </div>

          {/* Box Right: Segment Recommendations (Dark Blue Border Link Layout) */}
          <div className="bg-white rounded-xl border border-[#251fa3]/30 hover:border-[#251fa3] transition-colors p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Segment Recommendations</h3>
            
            <div className="space-y-3.5">
              {/* Item 1 */}
              <div className="flex items-center justify-between text-xs border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-50 text-slate-700 rounded">
                    <Zap size={14} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">At-Risk High LTV</div>
                    <div className="text-[11px] text-slate-400 font-normal mt-0.5">Users with &gt;$1k spent who haven't visited in 14 days.</div>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    const recSegment = { id: Date.now(), name: "At-Risk High LTV", description: "Users with >$1k spent who haven't visited in 14 days.", size: 1205, growth: "▲ +0.9%", growthType: "pos", activity: "Just now", iconType: "zap" };
                    setSegments([recSegment, ...segments]);
                    addToast(`Segment "At-Risk High LTV" generated and added!`, "success");
                  }}
                  className="text-xs font-bold text-[#251fa3] hover:underline px-2 cursor-pointer"
                >
                  Create
                </button>
              </div>

              {/* Item 2 */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-50 text-slate-700 rounded">
                    <Users size={14} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Brand Advocates</div>
                    <div className="text-[11px] text-slate-400 font-normal mt-0.5">Users who shared campaign links &gt; 3 times.</div>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    const advocateSegment = { id: Date.now(), name: "Brand Advocates", description: "Users who shared campaign links > 3 times.", size: 4890, growth: "▲ +4.2%", growthType: "pos", activity: "Just now", iconType: "star" };
                    setSegments([advocateSegment, ...segments]);
                    addToast(`Segment "Brand Advocates" generated and added!`, "success");
                  }}
                  className="text-xs font-bold text-[#251fa3] hover:underline px-2 cursor-pointer"
                >
                  Create
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
      {/* CREATE SEGMENT MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-[9999] backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-fadeIn">
            <div className="flex justify-between items-center p-5 border-b border-slate-100 bg-slate-50">
              <h3 className="font-bold text-slate-900 text-lg">Create Custom Segment</h3>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleCreateSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Segment Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Inactive Spenders"
                  value={newSegment.name}
                  onChange={(e) => setNewSegment({...newSegment, name: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#251fa3] focus:border-[#251fa3] text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Description</label>
                <input 
                  type="text" 
                  placeholder="e.g. Users who spent over $100 but haven't logged in"
                  value={newSegment.description}
                  onChange={(e) => setNewSegment({...newSegment, description: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#251fa3] focus:border-[#251fa3] text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Estimated Initial Target Volume *</label>
                <input 
                  type="number" 
                  required
                  placeholder="e.g. 5000"
                  value={newSegment.size}
                  onChange={(e) => setNewSegment({...newSegment, size: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#251fa3] focus:border-[#251fa3] text-sm"
                />
              </div>
              <div className="pt-4 flex justify-end gap-3 border-t border-slate-100 mt-6">
                <button 
                  type="button" 
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-md text-sm font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-[#251fa3] text-white rounded-md text-sm font-semibold hover:bg-[#1a1575] cursor-pointer"
                >
                  Generate Segment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminShell>
  );
}