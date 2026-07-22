import React, { useState, useMemo } from "react";
import AdminShell from "../../components/layouts/AdminShell"; // Aapka AdminShell
import Select from "../../components/ui/Select";

import {
  ShieldCheck,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  UserCheck,
  FileText,
  AlertCircle,
  ChevronRight,
  Eye,
  ArrowUpRight
} from "lucide-react";

export default function KYCApprovals() {
  // Mock Data: Urban Company KYC Verification Queue
  const [kycRequests, setKycRequests] = useState([
    {
      id: "KYC-9921",
      partnerName: "Amit Kumar",
      category: "Electrician",
      docType: "Driving License",
      submittedDate: "Today, 02:15 PM",
      status: "Pending",
      riskScore: "Low"
    },
    {
      id: "KYC-8842",
      partnerName: "Priya Sharma",
      category: "Salon & Spa Professional",
      docType: "Identity Certificate",
      submittedDate: "Today, 11:30 AM",
      status: "Pending",
      riskScore: "Low"
    },
    {
      id: "KYC-1029",
      partnerName: "Ramesh Chawla",
      category: "Plumber",
      docType: "PAN Card",
      submittedDate: "Yesterday",
      status: "Verified",
      riskScore: "Low"
    },
    {
      id: "KYC-3381",
      partnerName: "Sunita Rao",
      category: "Home Cleaning Expert",
      docType: "Address Proof",
      submittedDate: "22 Jun 2026",
      status: "Rejected",
      riskScore: "Medium"
    }
  ]);

  // States for Search and Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDocType, setSelectedDocType] = useState("All");

  // Dynamic document types extracted from data for the filter dropdown
  const uniqueDocTypes = useMemo(() => {
    const types = kycRequests.map(req => req.docType);
    return ["All", ...new Set(types)];
  }, [kycRequests]);

  // Status handler simulation
  const handleAction = (id, newStatus) => {
    setKycRequests(prev =>
      prev.map(req => req.id === id ? { ...req, status: newStatus } : req)
    );
  };

  // Dynamic Filtering Logic (Search + Dropdown Filter)
  const filteredRequests = useMemo(() => {
    return kycRequests.filter((request) => {
      const matchesSearch = 
        request.partnerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDropdown = 
        selectedDocType === "All" || request.docType === selectedDocType;

      return matchesSearch && matchesDropdown;
    });
  }, [kycRequests, searchQuery, selectedDocType]);

  return (
    <AdminShell
      activeTab="Partners"
      searchPlaceholder="Search by partner name, KYC ID, or document type..."
    >
      <div className="min-h-screen bg-[#f8fafc]  text-slate-700 p-4 md:p-8 space-y-6 overflow-x-hidden">
        
        {/* ================= HEADER SECTION ================= */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <nav className="text-xs font-bold text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
              <span>Approvals</span>
              <ChevronRight size={12} />
              <span className="text-indigo-600">KYC Approvals</span>
            </nav>
            <h1 className="mt-1 text-xl md:text-2xl font-black text-slate-900 tracking-tight">KYC Verification Queue</h1>
            <p className="text-xs md:text-sm text-slate-500 font-medium">
              Review and verify identity documents submitted by incoming service professionals.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2.5 self-start sm:self-center">
            <ShieldCheck size={16} className="text-emerald-600" />
            <span className="text-xs font-bold text-emerald-800">Compliance Protocol Active</span>
          </div>
        </div>

        {/* ================= KYC METRICS COUNTERS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Pending Verifications */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pending Review</p>
              <p className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                {kycRequests.filter(r => r.status === "Pending").length} Requests
              </p>
              <p className="text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded inline-block">
                SLA Expiring Soon
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
              <Clock size={18} />
            </div>
          </div>

          {/* Verified Today */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Approved Today</p>
              <p className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                {kycRequests.filter(r => r.status === "Verified").length} Partners
              </p>
              <p className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded inline-block">
                Onboarding Success
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
              <UserCheck size={18} />
            </div>
          </div>

          {/* Document Rejections */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Rejections (24h)</p>
              <p className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                {kycRequests.filter(r => r.status === "Rejected").length} Suspended
              </p>
              <p className="text-[10px] font-medium text-slate-500">Mainly Blurred Uploads</p>
            </div>
            <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600">
              <XCircle size={18} />
            </div>
          </div>

          {/* Auto Verification Rate */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">OCR Match Rate</p>
              <p className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">91.2%</p>
              <p className="text-[10px] font-semibold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded inline-block flex items-center gap-0.5">
                AI Screening <ArrowUpRight size={10} />
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
              <FileText size={18} />
            </div>
          </div>
        </div>

        {/* ================= FILTER BAR (Fully Dynamic) ================= */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="relative w-full sm:w-80">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, ID or category..."
              className="w-full rounded-lg border border-slate-200 bg-slate-50/50 pl-10 pr-4 py-2 text-xs font-medium focus:outline-none focus:border-indigo-500 focus:bg-white transition"
            />
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto border border-slate-200 rounded-lg px-3 py-1.5 bg-white">
            <Filter size={14} className="text-slate-400" />
            <Select
              value={selectedDocType}
              onChange={(e) => setSelectedDocType(e.target.value)}
              options={uniqueDocTypes.map((type) => ({
                value: type,
                label: type === "All" ? "All Documents" : type
              }))}
              className="w-full sm:w-auto bg-transparent text-xs font-bold text-slate-600 outline-none cursor-pointer border-none"
            />
          </div>
        </div>

        {/* ================= KYC QUEUE CONTENT CONTAINER ================= */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          
          {/* DESKTOP VIEW */}
          <div className="hidden lg:block">
            <div className="table-responsive" style={{ overflowY: 'auto', maxHeight: '400px', width: '100%', WebkitOverflowScrolling: 'touch' }}><table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                  <th className="px-6 py-4">Partner Details</th>
                  <th className="px-6 py-4">Document Type</th>
                  <th className="px-6 py-4">Submission Time</th>
                  <th className="px-6 py-4">Risk Profile</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-600">
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((request) => (
                    <tr key={request.id} className="hover:bg-slate-50/40 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-bold text-slate-900">{request.partnerName}</p>
                          <p className="text-xs text-slate-400 font-semibold mt-0.5">{request.id} • {request.category}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs font-bold text-slate-700">
                        <span className="inline-flex items-center gap-1.5 bg-slate-100 px-2 py-1 rounded-md">
                          <FileText size={12} className="text-slate-400" /> {request.docType}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-500 font-semibold">{request.submittedDate}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-bold ${request.riskScore === 'High' ? 'text-rose-600' : 'text-emerald-600'}`}>
                          ● {request.riskScore} Risk
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-bold ${
                          request.status === "Verified" ? "bg-emerald-50 text-emerald-700" :
                          request.status === "Rejected" ? "bg-rose-50 text-rose-700" : "bg-amber-50 text-amber-700"
                        }`}>
                          {request.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {request.status === "Pending" ? (
                          <div className="flex items-center justify-center gap-1.5">
                            <button 
                              onClick={() => handleAction(request.id, "Verified")}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold px-2.5 py-1.5 rounded-lg shadow-sm transition"
                            >
                              Approve
                            </button>
                            <button 
                              onClick={() => handleAction(request.id, "Rejected")}
                              className="border border-slate-200 hover:bg-rose-50 hover:text-rose-600 text-slate-600 text-[11px] font-bold px-2.5 py-1.5 rounded-lg transition"
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <button 
                            onClick={() => alert(`Displaying secure transaction logs for reference ID: ${request.id}`)}
                            className="inline-flex items-center gap-1 text-xs text-indigo-600 font-bold hover:underline mx-auto"
                          >
                            <Eye size={12} /> View Log
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-12 text-slate-400 font-medium text-sm">
                      No matching pending requests found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table></div>
          </div>

          {/* MOBILE & TABLET RESPONSIVE LIST */}
          <div className="block lg:hidden divide-y divide-slate-100">
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request) => (
                <div key={request.id} className="p-4 space-y-3 hover:bg-slate-50/30 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{request.partnerName}</h3>
                      <p className="text-xs text-slate-400 font-semibold mt-0.5">{request.id} • {request.category}</p>
                    </div>
                    <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-bold ${
                      request.status === "Verified" ? "bg-emerald-50 text-emerald-700" :
                      request.status === "Rejected" ? "bg-rose-50 text-rose-700" : "bg-amber-50 text-amber-700"
                    }`}>
                      {request.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-y-2 gap-x-4 bg-slate-50/60 p-3 rounded-lg text-xs font-semibold">
                    <div>
                      <p className="text-slate-400 text-[10px] uppercase tracking-wider">Document Type</p>
                      <p className="text-slate-800 mt-0.5">{request.docType}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-[10px] uppercase tracking-wider">Submitted</p>
                      <p className="text-slate-700 mt-0.5">{request.submittedDate}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-[10px] uppercase tracking-wider">Risk Profile</p>
                      <p className={`mt-0.5 ${request.riskScore === 'High' ? 'text-rose-600' : 'text-emerald-600'}`}>{request.riskScore} Risk</p>
                    </div>
                  </div>

                  {request.status === "Pending" ? (
                    <div className="flex items-center gap-2 pt-1">
                      <button 
                        onClick={() => handleAction(request.id, "Verified")}
                        className="flex-1 bg-emerald-600 text-white text-xs font-bold py-2 rounded-lg text-center"
                      >
                        Approve KYC
                      </button>
                      <button 
                        onClick={() => handleAction(request.id, "Rejected")}
                        className="flex-1 border border-slate-200 text-slate-600 text-xs font-bold py-2 rounded-lg text-center hover:bg-rose-50 hover:text-rose-600"
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => alert(`Displaying secure transaction logs for reference ID: ${request.id}`)}
                      className="w-full border border-slate-200 text-slate-600 text-xs font-bold py-2 rounded-lg inline-flex items-center justify-center gap-1 hover:bg-slate-50"
                    >
                      <Eye size={12} /> View Action Log
                    </button>
                  )}
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-slate-400 font-medium text-sm">
                No matching pending requests found.
              </div>
            )}
          </div>

          {/* Privacy Note Banner */}
          <div className="bg-slate-50/50 px-6 py-3 border-t border-slate-100 text-xs text-slate-400 font-medium flex items-center gap-1.5">
            <AlertCircle size={14} className="text-slate-400 flex-shrink-0" />
            <span>To maintain partner confidentiality and platform security, raw document unique ID numbers are masked under standard governance protocols. Use internal logs for audits.</span>
          </div>

        </div>

      </div>
    </AdminShell>
  );
}