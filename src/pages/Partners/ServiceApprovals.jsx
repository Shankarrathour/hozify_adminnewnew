import React, { useState, useMemo, useEffect } from "react";
import AdminShell from "../../components/layouts/AdminShell"; // Aapka AdminShell
import Select from "../../components/ui/Select";

import {
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  BookOpen,
  Check,
  ChevronRight,
  Sliders,
  MoreVertical,
  Eye,
  RefreshCw,
  Trash2
} from "lucide-react";

export default function ServiceApprovals() {
  // Mock Data: Urban Company Service Category Expansion Request Queue
  const [serviceRequests, setServiceRequests] = useState([
    {
      id: "REQ-7741",
      partnerName: "Rajesh Kumar",
      currentSkills: "AC Repair, Electrician",
      requestedService: "Washing Machine Automation",
      trainingScore: "94/100",
      status: "Pending",
      tier: "Premium"
    },
    {
      id: "REQ-2094",
      partnerName: "Anjali Mehta",
      currentSkills: "Salon Classic",
      requestedService: "Advanced Bridal Makeup & Spa",
      trainingScore: "98/100",
      status: "Pending",
      tier: "Lux"
    },
    {
      id: "REQ-1102",
      partnerName: "Vikram Singh",
      currentSkills: "Home Deep Cleaning",
      requestedService: "Sofa & Carpet Shampooing",
      trainingScore: "88/100",
      status: "Approved",
      tier: "Standard"
    },
    {
      id: "REQ-5519",
      partnerName: "Mohammad Ali",
      currentSkills: "Plumbing Basic",
      requestedService: "Commercial Geyser Installation",
      trainingScore: "72/100",
      status: "Rejected",
      tier: "Standard"
    }
  ]);

  // States for Live Searching and Tier Filtering
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTier, setSelectedTier] = useState("All");
  const [activeDropdownMenu, setActiveDropdownMenu] = useState(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setActiveDropdownMenu(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Dynamically pull unique tiers for filter dropdown options
  const uniqueTiers = useMemo(() => {
    const tiers = serviceRequests.map(item => item.tier);
    return ["All", ...new Set(tiers)];
  }, [serviceRequests]);

  // Handle Approve/Reject status
  const handleStatusChange = (id, newStatus) => {
    setServiceRequests(prev =>
      prev.map(item => item.id === id ? { ...item, status: newStatus } : item)
    );
  };

  // Live Filtering Logic (Combines search query + dropdown select)
  const filteredRequests = useMemo(() => {
    return serviceRequests.filter((item) => {
      const matchesSearch = 
        item.partnerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.requestedService.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.currentSkills.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTier = selectedTier === "All" || item.tier === selectedTier;

      return matchesSearch && matchesTier;
    });
  }, [serviceRequests, searchQuery, selectedTier]);

  return (
    <AdminShell
      activeTab="Partners"
      searchPlaceholder="Search by partner, existing skill, or new request..."
    >
      <div className="min-h-screen bg-[#f8fafc]  text-slate-700 p-4 md:p-8 space-y-6 overflow-x-hidden">
        
        {/* ================= HEADER SECTION ================= */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <nav className="text-xs font-bold text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
              <span>Approvals</span>
              <ChevronRight size={12} />
              <span className="text-indigo-600">Service Approvals</span>
            </nav>
            <h1 className="mt-1 text-xl md:text-2xl font-black text-slate-900 tracking-tight">Category Expansion Requests</h1>
            <p className="text-xs md:text-sm text-slate-500 font-medium">
              Review training performance and grant access to high-value service add-ons for active professionals.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100 rounded-xl px-4 py-2.5 self-start sm:self-center shadow-sm">
            <Sparkles size={16} className="text-indigo-600 animate-pulse" />
            <span className="text-xs font-bold text-indigo-900">Skill Upgradation Module</span>
          </div>
        </div>

        {/* ================= METRICS COUNTERS (Dynamic) ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Pending Service Audits */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Awaiting Audit</p>
              <p className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                {serviceRequests.filter(r => r.status === "Pending").length} Add-ons
              </p>
              <p className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded inline-block">
                SLA Tracked Live
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
              <BookOpen size={18} />
            </div>
          </div>

          {/* Upgraded Today */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Upgraded</p>
              <p className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                {serviceRequests.filter(r => r.status === "Approved").length} Partners
              </p>
              <p className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded inline-block">
                High Potential Tier
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 size={18} />
            </div>
          </div>

          {/* Low Score Rejections */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Retraining Needed</p>
              <p className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                {serviceRequests.filter(r => r.status === "Rejected").length} Requests
              </p>
              <p className="text-[10px] font-medium text-slate-400">Below 80% cutoff</p>
            </div>
            <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600">
              <XCircle size={18} />
            </div>
          </div>

          {/* Queue Capacity Status */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Auto Evaluation</p>
              <p className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Active</p>
              <p className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded inline-block">
                90+ Marks Auto Onboard
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
              <Sliders size={18} />
            </div>
          </div>
        </div>

        {/* ================= SEARCH & INTERACTIVE FILTERS ================= */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="relative w-full sm:w-80">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by partner, skill or ID..."
              className="w-full rounded-lg border border-slate-200 bg-slate-50/50 pl-10 pr-4 py-2 text-xs font-medium focus:outline-none focus:border-indigo-500 focus:bg-white transition"
            />
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto border border-slate-200 rounded-lg px-3 py-1.5 bg-white">
            <Filter size={14} className="text-slate-400" />
            <Select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              options={uniqueTiers.map((tier) => ({
                value: tier,
                label: tier === "All" ? "All Service Tiers" : `${tier} Tier`
              }))}
              className="w-full sm:w-auto bg-transparent text-xs font-bold text-slate-600 outline-none cursor-pointer border-none"
            />
          </div>
        </div>

        {/* ================= MAIN CONTENT QUEUE CONTAINER ================= */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          
          {/* DESKTOP TABLE VIEW */}
          <div className="hidden lg:block">
            <div className="table-responsive" style={{ overflowY: 'auto', maxHeight: '400px', width: '100%', WebkitOverflowScrolling: 'touch' }}><table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                  <th className="px-6 py-4">Partner Details</th>
                  <th className="px-6 py-4">Current Active Catalog</th>
                  <th className="px-6 py-4">Requested New Service</th>
                  <th className="px-6 py-4">Training Academy Score</th>
                  <th className="px-6 py-4">Request Status</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-600">
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/40 transition-colors">
                      {/* Partner Details */}
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-bold text-slate-900">{item.partnerName}</p>
                          <p className="text-xs text-slate-400  font-semibold mt-0.5">
                            {item.id} • <span className="text-indigo-600 ">{item.tier} Tier</span>
                          </p>
                        </div>
                      </td>

                      {/* Current Skills */}
                      <td className="px-6 py-4 text-xs text-slate-500 font-semibold truncate">
                        {item.currentSkills}
                      </td>

                      {/* Requested Service */}
                      <td className="px-6 py-4">
                        <span className="text-xs font-bold text-indigo-950 bg-indigo-50/70 border border-indigo-100/50 px-2 py-1 rounded-md">
                          {item.requestedService}
                        </span>
                      </td>

                      {/* Academy Marks */}
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <span className={`text-xs font-bold ${parseInt(item.trainingScore) < 80 ? 'text-rose-600' : 'text-slate-900'}`}>
                            {item.trainingScore}
                          </span>
                          <div className="h-1 w-20 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${parseInt(item.trainingScore) < 80 ? 'bg-rose-500' : 'bg-indigo-600'}`} 
                              style={{ width: `${parseInt(item.trainingScore)}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>

                      {/* Status Badge */}
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-bold ${
                          item.status === "Approved" ? "bg-emerald-50 text-emerald-700" :
                          item.status === "Rejected" ? "bg-rose-50 text-rose-700" : "bg-amber-50 text-amber-700"
                        }`}>
                          {item.status}
                        </span>
                      </td>

                      {/* Interaction Buttons */}
                      <td className="px-6 py-4 text-center">
                        {item.status === "Pending" ? (
                          <div className="flex items-center justify-center gap-1.5">
                            <button 
                              onClick={() => handleStatusChange(item.id, "Approved")}
                              className="bg-indigo-900 hover:bg-indigo-950 text-white text-[11px] font-bold p-1.5 rounded-lg shadow-sm transition"
                              title="Approve Skills"
                            >
                              <Check size={14} />
                            </button>
                            <button 
                              onClick={() => handleStatusChange(item.id, "Rejected")}
                              className="border border-slate-200 hover:bg-rose-50 hover:text-rose-600 text-slate-600 p-1.5 rounded-lg transition"
                              title="Send to Retraining"
                            >
                              <XCircle size={14} />
                            </button>
                          </div>
                        ) : (
                          <div className="relative inline-block text-left" onClick={(e) => e.stopPropagation()}>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveDropdownMenu(activeDropdownMenu === item.id ? null : item.id);
                              }}
                              className={`p-1 rounded-lg transition-colors ${activeDropdownMenu === item.id ? "bg-slate-100 text-slate-800" : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"}`}
                            >
                              <MoreVertical size={16} />
                            </button>
                            
                            {activeDropdownMenu === item.id && (
                              <div className="absolute right-0 mt-2 w-48 rounded-xl border border-slate-100 bg-white shadow-lg shadow-slate-200/50 z-50 py-2">
                                <button
                                  onClick={() => { setActiveDropdownMenu(null); alert(`Viewing details for ${item.id}`); }}
                                  className="w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition"
                                >
                                  <Eye size={14} /> View Details
                                </button>
                                <button
                                  onClick={() => { setActiveDropdownMenu(null); handleStatusChange(item.id, "Pending"); }}
                                  className="w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition"
                                >
                                  <RefreshCw size={14} /> Re-evaluate
                                </button>
                                <div className="h-px bg-slate-100 my-1"></div>
                                <button
                                  onClick={() => {
                                    setActiveDropdownMenu(null);
                                    setServiceRequests(prev => prev.filter(r => r.id !== item.id));
                                  }}
                                  className="w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition"
                                >
                                  <Trash2 size={14} /> Delete Record
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-12 text-slate-400 font-medium text-sm">
                      No matching requests found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table></div>
          </div>

          {/* MOBILE RESPONSIVE CARD VIEW (Anti-Horizontal Scroll) */}
          <div className="block lg:hidden divide-y divide-slate-100">
            {filteredRequests.length > 0 ? (
              filteredRequests.map((item) => (
                <div key={item.id} className="p-4 space-y-3 hover:bg-slate-50/30 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{item.partnerName}</h3>
                      <p className="text-xs text-slate-400  mt-0.5">{item.id} • {item.tier}</p>
                    </div>
                    <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-bold ${
                      item.status === "Approved" ? "bg-emerald-50 text-emerald-700" :
                      item.status === "Rejected" ? "bg-rose-50 text-rose-700" : "bg-amber-50 text-amber-700"
                    }`}>
                      {item.status}
                    </span>
                  </div>

                  <div className="bg-slate-50/60 p-3 rounded-lg text-xs font-semibold space-y-2">
                    <div>
                      <p className="text-slate-400 text-[10px] uppercase tracking-wider">Current Catalog</p>
                      <p className="text-slate-700 truncate mt-0.5">{item.currentSkills}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-[10px] uppercase tracking-wider">Requested Upgrade</p>
                      <p className="text-indigo-900 font-bold mt-0.5">{item.requestedService}</p>
                    </div>
                    <div className="flex justify-between items-center pt-1 border-t border-slate-200/50">
                      <span className="text-slate-400 text-[10px] uppercase tracking-wider">Academy Test Score</span>
                      <span className={`font-bold ${parseInt(item.trainingScore) < 80 ? 'text-rose-600' : 'text-slate-900'}`}>{item.trainingScore}</span>
                    </div>
                  </div>

                  {item.status === "Pending" ? (
                    <div className="flex items-center gap-2 pt-1">
                      <button 
                        onClick={() => handleStatusChange(item.id, "Approved")}
                        className="flex-1 bg-indigo-900 text-white text-xs font-bold py-2 rounded-lg text-center shadow-sm"
                      >
                        Approve Upgrade
                      </button>
                      <button 
                        onClick={() => handleStatusChange(item.id, "Rejected")}
                        className="flex-1 border border-slate-200 text-slate-600 text-xs font-bold py-2 rounded-lg text-center hover:bg-rose-50 hover:text-rose-600"
                      >
                        Reject Request
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => alert(`Audit Logs: Expansion item ${item.id} status modified to "${item.status}"`)}
                      className="w-full text-center border border-slate-200 text-slate-500 font-bold py-2 rounded-lg text-xs hover:bg-slate-50"
                    >
                      View Operational History
                    </button>
                  )}
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-slate-400 font-medium text-sm">
                No matching requests found.
              </div>
            )}
          </div>

          {/* Audit Disclaimer Banner */}
          <div className="bg-slate-50/50 px-6 py-3 border-t border-slate-100 text-xs text-slate-400 font-semibold flex items-center gap-1.5">
            <Clock size={14} className="text-slate-400 flex-shrink-0" />
            <span>Approved service add-ons will immediately update the partner's app catalog and trigger their mandatory inventory allocation.</span>
          </div>

        </div>

      </div>
    </AdminShell>
  );
}