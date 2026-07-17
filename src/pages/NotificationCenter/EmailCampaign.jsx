import React, { useState, useRef, useEffect } from "react";
import AdminShell from "../../components/layouts/AdminShell";
import { useToast } from "../../components/common/ToastNotification";
import {
  Search,
  ChevronDown,
  Calendar,
  SlidersHorizontal,
  MoreVertical,
  Download,
  Plus,
  Mail,
  Users,
  MousePointerClick,
  ChevronLeft,
  ChevronRight,
  X,
  Trash2,
  Copy,
  Eye
} from "lucide-react";

import Select from "../../components/ui/Select";

// Mock Data Matrix
const INITIAL_CAMPAIGNS = [
  { id: "CAM-7294", name: "Q4 Seasonal Product Launch", status: "SENT", sent: "42,500", openRate: "24.8%", clickRate: "3.2%", date: "Oct 24, 2023" },
  { id: "CAM-7301", name: "Weekly Newsletter #42", status: "SCHEDULED", sent: "--", openRate: "--", clickRate: "--", date: "Oct 28, 2023" },
  { id: "CAM-6855", name: "Customer Re-engagement Beta", status: "SENT", sent: "12,100", openRate: "18.2%", clickRate: "1.5%", date: "Oct 15, 2023" },
  { id: "CAM-7312", name: "Referral Program Update", status: "DRAFT", sent: "--", openRate: "--", clickRate: "--", date: "Today, 09:12 AM" },
  { id: "CAM-7002", name: "Abandoned Cart - Recovery A", status: "SENT", sent: "8,450", openRate: "44.1%", clickRate: "7.8%", date: "Oct 12, 2023" },
  { id: "CAM-7123", name: "Welcome Series - Email 1", status: "SENT", sent: "54,200", openRate: "52.3%", clickRate: "12.4%", date: "Oct 01, 2023" },
  { id: "CAM-7154", name: "VIP Exclusive Offer", status: "DRAFT", sent: "--", openRate: "--", clickRate: "--", date: "Oct 05, 2023" },
];

export default function CampaignListing() {
  const { addToast } = useToast();
  const [campaigns, setCampaigns] = useState(INITIAL_CAMPAIGNS);
  
  // Filters and Search
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  
  // Date Picker State
  const [dateRange, setDateRange] = useState("Oct 01, 2023 - Oct 31, 2023");
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const datePickerRef = useRef(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Actions Dropdown
  const [openDropdownId, setOpenDropdownId] = useState(null);

  // Selection
  const [selectedIds, setSelectedIds] = useState([]);

  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newCampaign, setNewCampaign] = useState({ name: "", status: "DRAFT" });

  useEffect(() => {
    function handleClickOutside(event) {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setIsDatePickerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter Engine
  const filteredCampaigns = campaigns.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All Statuses" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination Logic
  const totalPages = Math.max(1, Math.ceil(filteredCampaigns.length / itemsPerPage));
  const currentItems = filteredCampaigns.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Checkbox Logic
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(currentItems.map(item => item.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Actions
  const handleClearAll = () => {
    setSearchTerm("");
    setStatusFilter("All Statuses");
    setDateRange("Oct 01, 2023 - Oct 31, 2023");
    setCurrentPage(1);
    setSelectedIds([]);
    addToast("All active filters cleared.", "success");
  };

  const handleExportData = () => {
    if (filteredCampaigns.length === 0) {
      return addToast("No data to export.", "warning");
    }
    
    const headers = ['ID', 'Campaign Name', 'Status', 'Sent', 'Open Rate', 'Click Rate', 'Last Modified'];
    const csvContent = [
      headers.join(','),
      ...filteredCampaigns.map(item => 
        `"${item.id}","${item.name}","${item.status}","${item.sent}","${item.openRate}","${item.clickRate}","${item.date}"`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'email_campaigns_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast(`Exported ${filteredCampaigns.length} campaigns to CSV!`, "success");
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!newCampaign.name) return addToast("Please provide a campaign name", "warning");

    const randomId = Math.floor(1000 + Math.random() * 9000);
    const newCamp = {
      id: `CAM-${randomId}`,
      name: newCampaign.name,
      status: newCampaign.status,
      sent: "--",
      openRate: "--",
      clickRate: "--",
      date: "Just Now",
    };
    
    setCampaigns([newCamp, ...campaigns]);
    setIsCreateModalOpen(false);
    setNewCampaign({ name: "", status: "DRAFT" });
    setCurrentPage(1);
    addToast(`Campaign "${newCamp.name}" created!`, "success");
  };

  const handleDelete = (id) => {
    setCampaigns(campaigns.filter(c => c.id !== id));
    setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    addToast("Campaign deleted successfully.", "success");
    if (currentItems.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return;
    setCampaigns(campaigns.filter(c => !selectedIds.includes(c.id)));
    addToast(`Deleted ${selectedIds.length} campaigns.`, "success");
    setSelectedIds([]);
    if (currentItems.length === selectedIds.length && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleDuplicate = (campaign) => {
    const randomId = Math.floor(1000 + Math.random() * 9000);
    const clone = {
      ...campaign,
      id: `CAM-${randomId}`,
      name: `${campaign.name} (Copy)`,
      status: "DRAFT",
      sent: "--",
      openRate: "--",
      clickRate: "--",
      date: "Just Now",
    };
    setCampaigns([clone, ...campaigns]);
    addToast(`Duplicated campaign: ${clone.name}`, "success");
  };

  return (
    <AdminShell activeTab="Marketing" searchPlaceholder="Search dashboard...">
      <div className="min-h-screen bg-slate-50 p-8 text-slate-800 space-y-8 relative">
        
        {/* ================= HEADER SECTION ================= */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span>Marketing</span>
              <span>&gt;</span>
              <span className="text-indigo-600 font-medium">Email Campaigns</span>
            </div>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Campaign Listing
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={handleExportData}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-white text-slate-700 border border-slate-200 font-medium text-sm hover:bg-slate-50 transition-colors shadow-sm cursor-pointer"
            >
              <Download size={16} />
              Export Data
            </button>
            <button 
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-indigo-600 text-white font-medium text-sm hover:bg-indigo-700 transition-colors shadow-sm cursor-pointer"
            >
              <Plus size={16} />
              Create Campaign
            </button>
          </div>
        </div>

        {/* ================= FILTERS CONTROLS ================= */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-wrap items-center justify-between gap-4 shadow-sm">
          <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[300px]">
            {/* Search Input */}
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search campaigns by name or ID..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                className="w-full pl-9 pr-4 py-2 rounded-md border border-slate-200 bg-white text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Status Dropdown */}
            <div className="relative">
              <Select
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                className="appearance-none pl-4 pr-10 py-2 rounded-md border border-slate-200 bg-white text-slate-700 text-sm font-normal focus:outline-none focus:border-indigo-500 min-w-[150px] cursor-pointer"
                options={[{
                  label: "All Statuses",
                  value: "All Statuses"
                }, {
                  label: "SENT",
                  value: "SENT"
                }, {
                  label: "SCHEDULED",
                  value: "SCHEDULED"
                }, {
                  label: "DRAFT",
                  value: "DRAFT"
                }]} />

            </div>

            {/* Date Picker Dropdown */}
            <div className="relative flex items-center" ref={datePickerRef}>
              <div 
                className="relative cursor-pointer"
                onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
              >
                <input
                  type="text"
                  value={dateRange}
                  readOnly
                  className="pl-4 pr-10 py-2 rounded-md border border-slate-200 bg-white text-slate-700 text-sm font-normal focus:outline-none focus:border-indigo-500 w-[220px] cursor-pointer"
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              </div>

              {isDatePickerOpen && (
                <div className="absolute top-full left-0 mt-1 w-[220px] bg-white border border-slate-200 rounded-lg shadow-lg z-50 overflow-hidden py-1">
                  {["Today", "Last 7 Days", "Last 30 Days", "This Quarter", "Year to Date", "Oct 01, 2023 - Oct 31, 2023"].map((range) => (
                    <button
                      key={range}
                      onClick={() => {
                        setDateRange(range);
                        setIsDatePickerOpen(false);
                        addToast(`Date range set to ${range}`, "success");
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      {range}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {selectedIds.length > 0 && (
              <button 
                onClick={handleBulkDelete}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-rose-50 text-rose-600 text-sm font-semibold border border-rose-200 hover:bg-rose-100 transition-colors cursor-pointer"
              >
                <Trash2 size={14} />
                Delete Selected ({selectedIds.length})
              </button>
            )}
            <button 
              onClick={() => addToast("Advanced filtering coming soon", "info")}
              className="flex items-center justify-center p-2 rounded-md border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              <SlidersHorizontal size={16} />
            </button>
            <button 
              onClick={handleClearAll}
              className="text-sm font-medium text-slate-500 hover:text-slate-800 hover:underline cursor-pointer"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* ================= CAMPAIGNS TABLE ================= */}
        <div className="bg-white rounded-md border border-slate-300 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <div className="table-responsive-wrapper">
<table className="w-full border-collapse text-left min-w-[800px]">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-300">
                    <th className="p-2 border-r border-slate-300 w-10 text-center bg-slate-100">
                      <input 
                        type="checkbox" 
                        checked={currentItems.length > 0 && selectedIds.length === currentItems.length}
                        onChange={handleSelectAll}
                        className="rounded border-slate-400 text-indigo-600 focus:ring-0 cursor-pointer" 
                      />
                    </th>
                    <th className="p-2 border-r border-slate-300 uppercase tracking-tight text-slate-700 font-semibold">Campaign Name</th>
                    <th className="p-2 border-r border-slate-300 uppercase tracking-tight text-slate-700 font-semibold">Status</th>
                    <th className="p-2 border-r border-slate-300 uppercase tracking-tight text-slate-700 font-semibold text-right">Sent</th>
                    <th className="p-2 border-r border-slate-300 uppercase tracking-tight text-slate-700 font-semibold text-right">Open Rate</th>
                    <th className="p-2 border-r border-slate-300 uppercase tracking-tight text-slate-700 font-semibold text-right">Click Rate</th>
                    <th className="p-2 border-r border-slate-300 uppercase tracking-tight text-slate-700 font-semibold">Last Modified</th>
                    <th className="p-2 text-center bg-slate-100 uppercase tracking-tight text-slate-700 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-xs text-slate-700 bg-white">
                  {currentItems.map((row) => (
                    <tr 
                      key={row.id} 
                      className={`transition-colors border-b border-slate-200 hover:bg-slate-50 ${selectedIds.includes(row.id) ? 'bg-indigo-50/30' : ''}`}
                    >
                      <td className="p-2 border-r border-slate-200 text-center bg-slate-50/50">
                        <input 
                          type="checkbox" 
                          checked={selectedIds.includes(row.id)}
                          onChange={() => handleSelectRow(row.id)}
                          className="rounded border-slate-300 cursor-pointer" 
                        />
                      </td>
                      <td className="p-2 border-r border-slate-200  cursor-pointer" onClick={() => addToast(`Opening builder for ${row.name}`, "success")}>
                        <div className="font-semibold text-slate-900 hover:text-indigo-600">{row.name}</div>
                        <div className="text-[10px] text-indigo-600  mt-0.5">{row.id}</div>
                      </td>
                      <td className="p-2 border-r border-slate-200">
                        <span className={`inline-block px-1.5 py-0.5 rounded-sm text-[10px] font-bold tracking-wide ${
                          row.status === 'SENT' ? 'bg-green-100 text-green-800' :
                          row.status === 'SCHEDULED' ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="p-2 border-r border-slate-200 text-right font-medium text-slate-800">{row.sent}</td>
                      <td className="p-2 border-r border-slate-200 text-right font-semibold text-slate-800">
                        {row.openRate !== "--" ? (
                          <div className="flex items-center justify-end gap-2">
                            <span>{row.openRate}</span>
                            <div className="w-12 h-2 rounded bg-slate-100 overflow-hidden inline-block border border-slate-200">
                              <div className="h-full bg-indigo-600" style={{ width: row.openRate }} />
                            </div>
                          </div>
                        ) : "--"}
                      </td>
                      <td className="p-2 border-r border-slate-200 text-right font-medium text-slate-800">{row.clickRate}</td>
                      <td className="p-2 border-r border-slate-200 text-slate-500 ">{row.date}</td>
                      <td className="p-2 text-center bg-slate-50/30 relative">
                        <button 
                          onClick={(e) => { e.stopPropagation(); setOpenDropdownId(openDropdownId === row.id ? null : row.id); }}
                          className="text-slate-400 hover:text-slate-700 p-1 rounded hover:bg-slate-200 transition-colors cursor-pointer"
                        >
                          <MoreVertical size={16} />
                        </button>
                        {openDropdownId === row.id && (
                          <div className="absolute right-10 top-8 w-36 bg-white border border-slate-200 rounded-lg shadow-xl z-50 py-1 text-left text-xs ">
                            <button onClick={(e) => { e.stopPropagation(); setOpenDropdownId(null); addToast(`Viewing details for ${row.name}`, "info"); }} className="flex items-center gap-2 w-full px-4 py-2 text-slate-700 hover:bg-slate-50 text-left font-medium cursor-pointer">
                              <Eye size={14} /> View Details
                            </button>
                            <button onClick={(e) => { e.stopPropagation(); setOpenDropdownId(null); handleDuplicate(row); }} className="flex items-center gap-2 w-full px-4 py-2 text-indigo-600 hover:bg-slate-50 text-left font-medium cursor-pointer">
                              <Copy size={14} /> Duplicate
                            </button>
                            <button onClick={(e) => { e.stopPropagation(); setOpenDropdownId(null); handleDelete(row.id); }} className="flex items-center gap-2 w-full px-4 py-2 text-rose-600 hover:bg-rose-50 text-left font-medium cursor-pointer">
                              <Trash2 size={14} /> Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                  {currentItems.length === 0 && (
                    <tr>
                      <td colSpan={8} className="p-8 text-center text-slate-500  font-medium">
                        No active rows found matching current filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
</div>
          </div>

          {/* Excel-style Pagination Footer */}
          {filteredCampaigns.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between p-3 border-t border-slate-300 gap-4 bg-slate-50 text-xs text-slate-600 ">
              <div>Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredCampaigns.length)} of {filteredCampaigns.length} spreadsheet records</div>
              <div className="flex items-center gap-1.5">
                <button 
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`p-1 rounded border border-slate-300 ${currentPage === 1 ? 'bg-slate-100 text-slate-300 cursor-not-allowed' : 'bg-white text-slate-600 hover:bg-slate-100 cursor-pointer'}`}
                >
                  <ChevronLeft size={16} />
                </button>
                
                {[...Array(totalPages)].map((_, i) => (
                  <button 
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className={`h-7 w-7 rounded flex items-center justify-center text-[12px] cursor-pointer transition-colors ${
                      currentPage === i + 1 
                        ? 'bg-[#0a0f29] text-white font-semibold' 
                        : 'border border-slate-300 bg-white hover:bg-slate-100 text-slate-600 font-medium'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button 
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`p-1 rounded border border-slate-300 ${currentPage === totalPages ? 'bg-slate-100 text-slate-300 cursor-not-allowed' : 'bg-white text-slate-600 hover:bg-slate-100 cursor-pointer'}`}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ================= PERFORMANCE SNAPSHOT (Dark Blue Outline) ================= */}
        <div className="space-y-4 pt-4">
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Performance Snapshot
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Average Deliverability Card */}
            <div className="bg-white rounded-xl border-2 border-[#0a0f29] p-6 shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-blue-50 text-blue-600 rounded">
                  <Mail size={20} />
                </div>
                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-sm">
                  +12%
                </span>
              </div>
              <div className="mt-6">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Average Deliverability
                </p>
                <h3 className="mt-1 text-4xl font-extrabold text-slate-900">
                  99.2%
                </h3>
                <p className="mt-2 text-xs text-slate-400">
                  Compared to previous month (98.1%)
                </p>
              </div>
            </div>

            {/* Total Subscribers Card */}
            <div className="bg-white rounded-xl border-2 border-[#0a0f29] p-6 shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-purple-50 text-purple-600 rounded">
                  <Users size={20} />
                </div>
                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-sm">
                  +4k
                </span>
              </div>
              <div className="mt-6">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Total Subscribers
                </p>
                <h3 className="mt-1 text-4xl font-extrabold text-slate-900">
                  124,802
                </h3>
                <p className="mt-2 text-xs text-slate-400">
                  Net growth across all segments
                </p>
              </div>
            </div>

            {/* Click-Through Rate Card */}
            <div className="bg-white rounded-xl border-2 border-[#0a0f29] p-6 shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-orange-50 text-orange-600 rounded">
                  <MousePointerClick size={20} />
                </div>
                <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-sm">
                  -0.4%
                </span>
              </div>
              <div className="mt-6">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Click-Through Rate
                </p>
                <h3 className="mt-1 text-4xl font-extrabold text-slate-900">
                  3.42%
                </h3>
                <p className="mt-2 text-xs text-slate-400">
                  Average for the current billing cycle
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
      {/* CREATE CAMPAIGN MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-[9999] backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-fadeIn">
            <div className="flex justify-between items-center p-5 border-b border-slate-100 bg-slate-50">
              <h3 className="font-bold text-slate-900 text-lg">Create New Email Campaign</h3>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleCreateSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Campaign Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Summer Clearance Announcement"
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign({...newCampaign, name: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Initial Status</label>
                <Select
                  value={newCampaign.status}
                  onChange={(e) => setNewCampaign({...newCampaign, status: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white"
                  options={[{
                    label: "Draft",
                    value: "DRAFT"
                  }, {
                    label: "Scheduled",
                    value: "SCHEDULED"
                  }]} />
              </div>
              <div className="pt-4 flex justify-end gap-3 border-t border-slate-100 mt-6">
                <button 
                  type="button" 
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-md text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-semibold hover:bg-indigo-700"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminShell>
  );
}