import React, { useState } from "react";
import AdminShell from "../../components/layouts/AdminShell";
import { Download, Plus, SlidersHorizontal, ChevronDown, Check, CheckCircle2, XCircle, Trash2, Filter, ShieldAlert } from "lucide-react";
import toast from "react-hot-toast";

import Select from "../../components/ui/Select";

export default function UserReviews() {
  // --- Clickable & Active States ---
  const [activeTab, setActiveTab] = useState("All");
  const [ratingFilter, setRatingFilter] = useState("All Stars");
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showNewRuleForm, setShowNewRuleForm] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  
  // Custom Filters Form State
  const [filterCriteria, setFilterCriteria] = useState({
    productKeyword: "",
    flaggedOnly: false
  });

  // Dynamic Rule Matrix
  const [ruleMeta, setRuleMeta] = useState({ name: "", condition: "Auto-Flag Inappropriate" });

  // Dynamic state for reviews data
  const [reviewsData, setReviewsData] = useState([
    {
      id: 1,
      user: { name: "Sarah Chen", role: "Verified Buyer", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" },
      rating: 5,
      comment: '"The integration was seamless."',
      product: "Enterprise Suite v2",
      status: "Approved",
    },
    {
      id: 2,
      user: { name: "David Miller", role: "Internal Tester", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" },
      rating: 3,
      comment: '"Performance dips significantly"',
      product: "Core Analytics Module",
      status: "Pending",
    },
    {
      id: 3,
      user: { name: "Elena Rodriguez", role: "Enterprise Client", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150" },
      rating: 4,
      comment: '"Great UI, but the API..."',
      product: "Developer Portal",
      status: "Approved",
    },
    {
      id: 4,
      user: { name: "Anonymous_User", role: "Guest", avatar: null },
      rating: 1,
      comment: "Flagged for inappropriate content.",
      product: "Cloud Storage Pack",
      status: "Rejected",
      isCommentFlagged: true,
    },
  ]);

  // Stat Metrics Configuration
  const pendingCount = reviewsData.filter(r => r.status === "Pending").length;
  const flaggedCount = reviewsData.filter(r => r.isCommentFlagged).length;

  const stats = [
    { title: "TOTAL REVIEWS", value: `12,${840 + reviewsData.length}`, badge: "+12%", isPositive: true },
    { title: "AVG. RATING", value: "4.82", isStars: true },
    { title: "PENDING MODERATION", value: String(pendingCount), badge: "High Priority", isAlert: true },
    { title: "FLAGGED CONTENT", value: String(flaggedCount), badge: "-4%", isPositive: false },
  ];

  const sentimentData = [
    { label: "POSITIVE REVIEWS", percentage: 88, color: "bg-black" },
    { label: "NEUTRAL REVIEWS", percentage: 9, color: "bg-slate-200" },
    { label: "NEGATIVE REVIEWS", percentage: 3, color: "bg-rose-600" },
  ];

  // --- Click Interactive Handlers ---
  const handleUpdateStatus = (id, newStatus) => {
    setReviewsData(prev => 
      prev.map(review => review.id === id ? { ...review, status: newStatus } : review)
    );
  };

  const handleDeleteReview = (id) => {
    if(confirm("Kya aap is review ko delete karna chahte hain?")) {
      setReviewsData(prev => prev.filter(review => review.id !== id));
    }
  };

  // --- Actual CSV Exporter ---
  const handleExportCSV = () => {
    const headers = ["User,Role,Rating,Comment,Product,Status\n"];
    const rows = reviewsData.map(r => 
      `"${r.user.name}","${r.user.role}",${r.rating},"${r.comment.replace(/"/g, '""')}","${r.product}","${r.status}"`
    );
    const blob = new Blob([...headers, rows.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Reviews_Audit_Report_${new Date().toLocaleDateString()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- Rule Formulation Trigger ---
  const handleRuleSubmission = (e) => {
    e.preventDefault();
    if(!ruleMeta.name.trim()) {
      toast.error("Please specify target rule constraints mapping parameter index.");
      return;
    }
    toast.success(`Success! Security core compiled operational rule blueprint: [${ruleMeta.name}]`);
    setRuleMeta({ name: "", condition: "Auto-Flag Inappropriate" });
    setShowNewRuleForm(false);
  };

  // --- Filtering Mechanics ---
  const filteredReviews = reviewsData.filter((item) => {
    if (activeTab !== "All" && item.status !== activeTab) return false;
    if (ratingFilter === "5 Stars" && item.rating !== 5) return false;
    if (ratingFilter === "4 Stars" && item.rating !== 4) return false;
    if (ratingFilter === "3 Stars" && item.rating !== 3) return false;
    
    // Advanced contextual inputs filter mapping
    if (filterCriteria.productKeyword && !item.product.toLowerCase().includes(filterCriteria.productKeyword.toLowerCase())) return false;
    if (filterCriteria.flaggedOnly && !item.isCommentFlagged) return false;

    return true;
  });

  const renderStars = (count) => (
    <div className="flex gap-0.5 text-slate-900 text-sm tracking-tighter select-none">
      {"★".repeat(count)}
      {"☆".repeat(5 - count)}
    </div>
  );

  return (
    <AdminShell activeTab="Reviews" searchPlaceholder="Search reviews...">
      <div className="space-y-6">
        
        {/* 1. HEADER SECTION */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mt-2 tracking-tight">Review Management</h1>
            <p className="text-sm text-slate-500 mt-1 max-w-2xl font-normal leading-relaxed">
              Audit and moderate community submissions to ensure quality standards across the product ecosystem.
            </p>
          </div>

          {/* Core Controls */}
          <div className="flex gap-2 mt-4 shrink-0">
            <button 
              onClick={handleExportCSV}
              className="px-2.5 py-1.5 bg-white border border-slate-200 text-slate-800 rounded-lg text-xs font-bold flex items-center gap-1.5 hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
              title="Download CSV Spreadsheet Report"
            >
              <Download className="h-3 w-3 text-slate-500" />
              <span>Export CSV</span>
            </button>
            <button 
              onClick={() => setShowNewRuleForm(!showNewRuleForm)}
              className="px-4 py-2 bg-black text-white rounded-lg text-xs font-bold flex items-center gap-1.5 hover:bg-slate-800 transition-colors shadow-sm cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>New Rule</span>
            </button>
          </div>
        </div>

        {/* COMPACT INTERACTIVE NEW RULE TRIGGER BOX */}
        {showNewRuleForm && (
          <form onSubmit={handleRuleSubmission} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wide border-b border-slate-200 pb-2">
              <ShieldAlert className="h-4 w-4 text-slate-900" />
              <span>Formulate Access Policy / Automation Rule</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Rule Reference Context</label>
                <input 
                  type="text"
                  placeholder="e.g., Profanity string filtering criteria logs"
                  value={ruleMeta.name}
                  onChange={(e) => setRuleMeta(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full text-xs font-semibold bg-white border border-slate-200 rounded-lg p-2 focus:outline-none focus:border-black transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Automated Strategy Pipeline</label>
                <Select
                  value={ruleMeta.condition}
                  onChange={(e) => setRuleMeta(prev => ({ ...prev, condition: e.target.value }))}
                  className="w-full text-xs font-semibold bg-white border border-slate-200 rounded-lg p-2 focus:outline-none focus:border-black transition-all"
                  options={[{
                    label: "Auto-Flag Inappropriate Content",
                    value: "Auto-Flag Inappropriate"
                  }, {
                    label: "Escalate to Senior Admin",
                    value: "Escalate Root Scope"
                  }, {
                    label: "Pre-Reject Lowest Level Entries",
                    value: "Instant Wipe Matrix"
                  }]} />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <button 
                type="button" 
                onClick={() => setShowNewRuleForm(false)} 
                className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-semibold hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-4 py-1.5 bg-black text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Instantiate Rule
              </button>
            </div>
          </form>
        )}

        {/* 2. STATS KPI GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between shadow-sm h-32">
              <div>
                <p className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">{stat.title}</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <h3 className="font-bold text-slate-900 text-3xl tracking-tight">
                    {stat.value}
                  </h3>
                  {stat.isStars && (
                    <div className="flex ml-1 text-slate-950 tracking-tighter text-base select-none">★★★★★</div>
                  )}
                  {stat.badge && !stat.isAlert && (
                    <span className={`text-xs font-bold ${stat.isPositive ? "text-emerald-500" : "text-rose-500"}`}>
                      {stat.badge}
                    </span>
                  )}
                </div>
              </div>
              
              {stat.isAlert && (
                <div className="mt-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-600 border border-indigo-100">
                    {stat.badge}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 3. DATATABLE MODERATION WRAPPER */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          
          {/* Active Filtering Toolbar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-6 py-4 border-b border-slate-100 gap-4">
            
            {/* Tab Switches */}
            <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-lg border border-slate-100">
              {["All", "Pending", "Approved", "Rejected"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                    activeTab === tab
                      ? "bg-black text-white shadow"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Right Meta Controls */}
            <div className="flex items-center gap-3 text-xs font-semibold text-slate-600 w-full sm:w-auto justify-between sm:justify-end">
              
              {/* Dropdown System */}
              <div className="relative">
                <div 
                  onClick={() => setIsRatingOpen(!isRatingOpen)}
                  className="flex items-center gap-1.5 cursor-pointer hover:text-slate-900 select-none px-2 py-1 rounded hover:bg-slate-50"
                >
                  <span>Rating:</span>
                  <span className="text-slate-900 font-bold flex items-center gap-0.5">
                    {ratingFilter} <ChevronDown className="h-3 w-3 mt-0.5" />
                  </span>
                </div>

                {isRatingOpen && (
                  <div className="absolute right-0 mt-2 bg-white border border-slate-200 rounded-lg shadow-xl py-1 w-36 z-30">
                    {["All Stars", "5 Stars", "4 Stars", "3 Stars"].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          setRatingFilter(opt);
                          setIsRatingOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center justify-between cursor-pointer"
                      >
                        <span>{opt}</span>
                        {ratingFilter === opt && <Check className="h-3 w-3 text-slate-900" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* FIXED REWORKED FILTER BUTTON (Icon Trigger Only - Toggle Framework) */}
              <button 
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className={`p-2 rounded-lg border cursor-pointer transition-colors flex items-center justify-center ${
                  showAdvancedFilters 
                    ? "bg-slate-100 text-black border-slate-300" 
                    : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
                }`}
                title="Toggle Advanced Operational Filters Matrix"
              >
                <Filter className="h-4 w-4 stroke-[2.5]" />
              </button>
              
              <span className="text-slate-400 font-normal">Showing {filteredReviews.length} records</span>
            </div>
          </div>

          {/* COLLAPSIBLE ADVANCED FILTER PARAMETERS DRAWER */}
          {showAdvancedFilters && (
            <div className="bg-slate-50/60 border-b border-slate-200 px-6 py-3.5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs animate-in fade-in duration-150">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Keyword Product Target Map</label>
                <input 
                  type="text"
                  placeholder="e.g. Enterprise, Module, Suite..."
                  value={filterCriteria.productKeyword}
                  onChange={(e) => setFilterCriteria(prev => ({ ...prev, productKeyword: e.target.value }))}
                  className="bg-white border border-slate-200 rounded-lg p-2 w-full text-xs font-semibold focus:outline-none focus:border-black shadow-3xs"
                />
              </div>
              <div className="flex items-center sm:pt-5 select-none">
                <label className="inline-flex items-center gap-2 font-bold text-slate-700 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={filterCriteria.flaggedOnly}
                    onChange={(e) => setFilterCriteria(prev => ({ ...prev, flaggedOnly: e.target.checked }))}
                    className="h-4 w-4 text-black rounded accent-black cursor-pointer border-slate-300 focus:ring-0"
                  />
                  <span>Isolate Flagged Infrastructure Comments Only</span>
                </label>
              </div>
            </div>
          )}

          {/* Table Container */}
          <div className="overflow-x-auto">
            <div className="table-responsive-wrapper">
<table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/70 border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="px-6 py-3.5">User</th>
                    <th className="px-6 py-3.5">Rating</th>
                    <th className="px-6 py-3.5">Comment</th>
                    <th className="px-6 py-3.5">Product</th>
                    <th className="px-6 py-3.5">Status</th>
                    <th className="px-6 py-3.5 text-center w-36">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
                  {filteredReviews.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center p-8 text-xs font-medium text-slate-400 ">
                        No active authorization maps or filtered reviews fit these criteria constraints.
                      </td>
                    </tr>
                  ) : (
                    filteredReviews.map((row) => (
                      <tr key={row.id} className="hover:bg-slate-50/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {row.user.avatar ? (
                              <img src={row.user.avatar} alt={row.user.name} className="w-8 h-8 rounded-full object-cover shrink-0" />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 shrink-0">
                                <span className="text-xs text-slate-500 font-bold">👤</span>
                              </div>
                            )}
                            <div>
                              <p className="font-bold text-slate-900 text-sm leading-none">{row.user.name}</p>
                              <p className="text-xs text-slate-400 font-normal mt-1 leading-none">{row.user.role}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">{renderStars(row.rating)}</td>
                        <td className={`px-6 py-4 text-sm font-normal max-w-xs truncate ${row.isCommentFlagged ? "text-rose-500 font-medium" : "text-slate-700"}`}>
                          {row.comment}
                        </td>
                        <td className="px-6 py-4 text-slate-800 text-sm font-semibold">{row.product}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold ${
                            row.status === "Approved" ? "bg-emerald-50 text-emerald-600" :
                            row.status === "Pending" ? "bg-amber-50 text-amber-600" : "bg-rose-50 text-rose-600"
                          }`}>
                            {row.status}
                          </span>
                        </td>

                        {/* FIXED DYNAMIC ACTIONS ALIGNMENT SYSTEM */}
                       {/* FIXED CLEAN ACTION ICONS */}
<td className="px-6 py-4 text-center">
  <div className="flex items-center justify-center gap-2.5">
    {row.status === "Pending" && (
      <>
        <button 
          onClick={() => handleUpdateStatus(row.id, "Approved")}
          title="Approve"
          className="p-1 hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 rounded transition-colors cursor-pointer bg-transparent border-0"
        >
          <CheckCircle2 className="h-4 w-4" />
        </button>
        <button 
          onClick={() => handleUpdateStatus(row.id, "Rejected")}
          title="Reject"
          className="p-1 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded transition-colors cursor-pointer bg-transparent border-0"
        >
          <XCircle className="h-4 w-4" />
        </button>
      </>
    )}
    {row.status === "Approved" && (
      <button 
        onClick={() => handleUpdateStatus(row.id, "Rejected")}
        title="Reject"
        className="p-1 hover:bg-amber-50 text-slate-400 hover:text-amber-600 rounded transition-colors cursor-pointer bg-transparent border-0"
      >
        <XCircle className="h-4 w-4" />
      </button>
    )}
    {row.status === "Rejected" && (
      <button 
        onClick={() => handleUpdateStatus(row.id, "Approved")}
        title="Approve"
        className="p-1 hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 rounded transition-colors cursor-pointer bg-transparent border-0"
      >
        <CheckCircle2 className="h-4 w-4" />
      </button>
    )}
    {/* Always Show Delete */}
    <button 
      onClick={() => handleDeleteReview(row.id)}
      title="Delete"
      className="p-1 hover:bg-slate-100 text-slate-400 hover:text-rose-600 rounded transition-colors cursor-pointer bg-transparent border-0"
    >
      <Trash2 className="h-4 w-4" />
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

          {/* Table Pagination Engine */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 text-xs font-bold text-slate-400">
            <button 
              onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
              className="hover:text-slate-900 transition-colors bg-transparent border-0 cursor-pointer font-bold"
            >
              &lt; Previous
            </button>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3].map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-7 h-7 rounded flex items-center justify-center transition-all cursor-pointer border-0 font-bold ${
                    currentPage === pageNum
                      ? "bg-black text-white"
                      : "bg-transparent hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  {pageNum}
                </button>
              ))}
              <span className="px-1 select-none">...</span>
              <button 
                onClick={() => setCurrentPage(1284)}
                className={`px-2 h-7 rounded flex items-center justify-center transition-all cursor-pointer border-0 font-bold ${
                  currentPage === 1284 ? "bg-black text-white" : "bg-transparent hover:bg-slate-50 text-slate-700"
                }`}
              >
                1,284
              </button>
            </div>
            <button 
              onClick={() => currentPage < 1284 && setCurrentPage(currentPage + 1)}
              className="text-slate-700 hover:text-slate-900 transition-colors bg-transparent border-0 cursor-pointer font-bold"
            >
              Next &gt;
            </button>
          </div>
        </div>

        {/* 4. ANALYTICS LOWER SEGMENT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-6 tracking-tight">Sentiment Analysis</h3>
              <div className="space-y-5">
                {sentimentData.map((sentiment, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-center text-[11px] font-bold text-slate-500 mb-1.5">
                      <span>{sentiment.label}</span>
                      <span className="text-slate-900">{sentiment.percentage}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full w-full">
                      <div 
                        className={`h-2 rounded-full transition-all ${sentiment.color}`} 
                        style={{ width: `${sentiment.percentage}%` }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">Moderator's Spotlight</h3>
              <p className="text-sm text-slate-400 font-normal mt-1.5 leading-relaxed">
                Top-performing reviewer of the month based on community engagement and helpfulness score.
              </p>

              <div className="flex items-center gap-4 mt-6">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0">
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" 
                    alt="Marcus Thorne" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-slate-900 tracking-tight">Marcus Thorne</h4>
                  <p className="text-xs text-slate-500 font-medium">Thorne Industries CTO</p>
                  
                  <div className="flex items-center gap-1 mt-1 text-slate-900 text-[11px] font-bold">
                    <span className="text-xs">🏆</span>
                    <span>Top Reviewer Elite</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </AdminShell>
  );
}