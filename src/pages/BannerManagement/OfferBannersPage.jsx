import React, { useState } from "react";
import AdminShell from "../../components/layouts/AdminShell";
import { 
  Filter, Trash2, Eye, Layers, Edit2, MoreVertical,
  ExternalLink, Calendar, Clock, RefreshCw, AlertTriangle, Globe, Plus, X, CheckCircle2
} from "lucide-react";
import { useToast } from '../../components/common/ToastNotification';

import Select from "../../components/ui/Select";

// ========================================================================
// 1. HELPER COMPONENTS
// ========================================================================

function CampaignRow({ name, id, targeting, reach, ctr, change, expiry, urgent, onEdit, onDelete }) {
  return (
    <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors text-xs text-slate-700">
      <td className="py-4 px-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-slate-400">
            <Layers size={14} />
          </div>
          <div>
            <p className="font-semibold text-slate-900">{name}</p>
            <p className="text-[10px] text-slate-400 ">ID: {id}</p>
          </div>
        </div>
      </td>
      <td className="py-4 px-4 text-slate-500">{targeting}</td>
      <td className="py-4 px-4 font-semibold text-slate-800">{reach}</td>
      <td className="py-4 px-4">
        <div className="flex items-center space-x-1.5 font-bold text-slate-900">
          <span>{ctr}</span>
          <span className="text-[10px] font-medium text-emerald-500">{change}</span>
        </div>
      </td>
      <td className="py-4 px-4">
        <div>
          <p className={`font-semibold ${urgent ? "text-rose-500" : "text-slate-700"}`}>{expiry}</p>
          {urgent && <p className="text-[9px] font-bold text-rose-500 uppercase mt-0.5">Expires Today</p>}
        </div>
      </td>
      <td className="py-4 px-4 text-right">
        <div className="flex items-center justify-end space-x-3 text-slate-400">
          <button onClick={() => onEdit(id)} className="hover:text-slate-600 cursor-pointer" title="Edit campaign"><Edit2 size={15} /></button>
          <button onClick={() => onDelete(id, name)} className="hover:text-rose-500 cursor-pointer" title="Delete campaign"><Trash2 size={15} /></button>
        </div>
      </td>
    </tr>
  );
}

function BadgTag({ text, styles }) {
  return (
    <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded tracking-wide ${styles}`}>
      {text}
    </span>
  );
}

// ========================================================================
// 2. MAIN BANNERS PAGE COMPONENTS EXPORT
// ========================================================================

export default function OfferBannersPage() {
  const { addToast } = useToast();
  const [activeFilter, setActiveFilter] = useState("Active");

  const [campaigns, setCampaigns] = useState([
    { name: "Holiday Special 24", id: "OFF-9821", targeting: "Global / Premium", reach: "84.2k", ctr: "8.1%", change: "▲ 2%", expiry: "12 Oct 2024", urgent: true, status: "Active" },
    { name: "New User Welcome", id: "OFF-7712", targeting: "New Accounts", reach: "12.5k", ctr: "15.4%", change: "▲ 4%", expiry: "Evergreen", urgent: false, status: "Active" },
    { name: "Black Friday Pre-launch", id: "OFF-6621", targeting: "Cart Abandoners", reach: "0k", ctr: "0%", change: "-", expiry: "24 Nov 2024", urgent: false, status: "Scheduled" },
    { name: "Spring Clearance", id: "OFF-2210", targeting: "All Users", reach: "105k", ctr: "4.2%", change: "▼ 1%", expiry: "Passed", urgent: false, status: "Archived" }
  ]);

  // Card specific interactive states
  const [appRewardStatus, setAppRewardStatus] = useState("In Review");
  const [summerSaleStats, setSummerSaleStats] = useState({ ctr: "12.5%", isArchived: false });
  const [techUpgradeExpiring, setTechUpgradeExpiring] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("Create");
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: "", targeting: "", expiry: "", status: "Active" });

  const filteredCampaigns = campaigns.filter(c => c.status === activeFilter);

  const handleDelete = (id, name) => {
    setCampaigns(campaigns.filter(c => c.id !== id));
    addToast(`Campaign "${name}" deleted successfully`, 'success');
  };

  const openCreateModal = () => {
    setModalMode("Create");
    setFormData({ name: "", targeting: "", expiry: "", status: activeFilter === "All" ? "Active" : activeFilter });
    setIsModalOpen(true);
  };

  const openEditModal = (id, isStaticCard = false, cardData = null) => {
    setModalMode("Edit");
    if (isStaticCard && cardData) {
      setEditingId(`static-${id}`);
      setFormData(cardData);
    } else {
      const camp = campaigns.find(c => c.id === id);
      if (camp) {
        setEditingId(id);
        setFormData({ name: camp.name, targeting: camp.targeting, expiry: camp.expiry, status: camp.status });
      }
    }
    setIsModalOpen(true);
  };

  const handleSaveModal = () => {
    if (!formData.name) {
      addToast("Campaign name is required", "error");
      return;
    }

    if (modalMode === "Create") {
      const newCamp = {
        name: formData.name,
        id: `OFF-${Math.floor(1000 + Math.random() * 9000)}`,
        targeting: formData.targeting || "General",
        reach: "0k",
        ctr: "0%",
        change: "-",
        expiry: formData.expiry || "Evergreen",
        urgent: false,
        status: formData.status
      };
      setCampaigns([...campaigns, newCamp]);
      addToast(`Banner "${formData.name}" created`, "success");
    } else {
      if (editingId && String(editingId).startsWith('static-')) {
        addToast(`Card "${formData.name}" updated successfully!`, "success");
      } else {
        setCampaigns(campaigns.map(c => 
          c.id === editingId ? { ...c, ...formData } : c
        ));
        addToast(`Banner "${formData.name}" updated`, "success");
      }
    }
    setIsModalOpen(false);
  };

  const handleExportCSV = () => {
    if (filteredCampaigns.length === 0) return addToast("No campaigns to export in this tab.", "warning");
    
    const headers = ['Name', 'ID', 'Targeting', 'Reach', 'CTR', 'Expiry', 'Status'];
    const csvContent = [
      headers.join(','),
      ...filteredCampaigns.map(item => 
        `"${item.name}","${item.id}","${item.targeting}","${item.reach}","${item.ctr}","${item.expiry}","${item.status}"`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `offer_banners_${activeFilter.toLowerCase()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast(`Exported ${filteredCampaigns.length} campaigns to CSV!`, "success");
  };

  const handleRefreshAppReward = () => {
    addToast("Checking approval systems...", "info");
    setTimeout(() => {
      setAppRewardStatus("Live");
      addToast("App Exclusive Reward is now Live!", "success");
    }, 800);
  };

  return (
    <AdminShell activeTab="Banners" searchPlaceholder="Search campaigns or users...">
      <div className="p-8 bg-black-50 min-h-screen space-y-6 max-w-[1400px] w-full mx-auto  antialiased relative">
        
        {/* HEADER TOP NAV-BAR */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-2">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Offer Banners</h1>
            <p className="text-xs text-black-400 mt-1">Manage promotional assets and limited-time offer visibility.</p>
          </div>
          
          <div className="flex items-center flex-wrap gap-3 w-full sm:w-auto justify-end">
            <div className="bg-black-100 p-1 rounded-lg flex items-center space-x-1 text-xs font-semibold">
              {["Active", "Scheduled", "Archived"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                    activeFilter === filter ? "bg-indigo-950 text-white shadow-sm" : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* HERO MAIN TRACKER SECTION */}
        {activeFilter === "Active" && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* SUMMER FLASH SALE CARD (Spans 2 columns) */}
              <div className={`lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col justify-between transition-opacity ${summerSaleStats.isArchived ? 'opacity-50 grayscale' : ''}`}>
                <div className="h-64 bg-slate-800 relative p-6 flex flex-col justify-between text-white" 
                     style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, #142643, #1a3c8a)' }}>
                  <div className="flex items-center space-x-2">
                    <BadgTag text="★ Top Performer" styles="bg-slate-900/60 text-white backdrop-blur-sm" />
                    <BadgTag text={summerSaleStats.isArchived ? "Archived" : "Active"} styles={summerSaleStats.isArchived ? "bg-slate-600 text-white" : "bg-indigo-600 text-white"} />
                  </div>
                  <div className="space-y-1 text-center my-auto">
                    <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">Summer Sale</p>
                    <h2 className="text-5xl font-black tracking-tight text-white">40%</h2>
                  </div>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-base font-bold text-slate-900">Summer Solstice Flash Sale</h3>
                        <ExternalLink size={14} className="text-slate-400 cursor-pointer hover:text-indigo-600" onClick={() => window.open('https://hozify.com/offers', '_blank')} />
                      </div>
                      <p className="text-xs text-slate-400 max-w-lg leading-relaxed">
                        Our highest-converting banner this quarter. Targeted at premium segment users with personalized discount tiers.
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Ctr Rate</p>
                      <p className="text-xl font-black text-emerald-500 mt-0.5">{summerSaleStats.ctr}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs pt-2 border-t border-slate-50">
                    <div className="flex items-center space-x-4 text-slate-500 font-medium">
                      <span className="flex items-center space-x-1.5"><Layers size={13} /> <span className="underline">://hozify.com</span></span>
                      {!summerSaleStats.isArchived && <span className="flex items-center space-x-1.5 text-rose-500 font-bold"><Clock size={13} /> <span>Expires in 42h 12m</span></span>}
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <button onClick={() => openEditModal('summer', true, { name: 'Summer Solstice Flash Sale', targeting: 'Premium Segment', expiry: '42h 12m', status: 'Active' })} className="p-1.5 border border-slate-200 rounded-lg text-slate-500 bg-white hover:bg-slate-50 cursor-pointer" title="Edit Settings"><Edit2 size={13} /></button>
                      <button onClick={() => {
                        setSummerSaleStats(prev => ({ ...prev, isArchived: !prev.isArchived }));
                        addToast(summerSaleStats.isArchived ? 'Banner Reactivated' : 'Banner Archived', 'info');
                      }} className="p-1.5 border border-slate-200 rounded-lg text-slate-500 bg-white hover:bg-slate-50 cursor-pointer" title="Toggle Archive State"><MoreVertical size={13} /></button>
                    </div>
                  </div>
                </div>
              </div>

              {/* NEWSLETTER OPT-IN SIDEBAR */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden p-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="h-32 rounded-xl bg-slate-100 border border-dashed border-slate-200 flex items-center justify-center">
                    <BadgTag text="Desktop Only" styles="bg-slate-700 text-white " />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-sm font-bold text-slate-900">Newsletter Opt-in Promo</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">Floating sidebar banner for first-time visitors.</p>
                  </div>
                  <div className="flex justify-between items-center text-xs pt-1.5">
                    <span className="text-slate-400 font-medium flex items-center space-x-1"><Calendar size={13} /> <span>Exp. Date:</span></span>
                    <span className="font-bold text-slate-800">Dec 31, 2024</span>
                  </div>
                  <div className="space-y-1 pt-2 border-t border-slate-50">
                    <div className="h-1.5 w-full bg-black-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-400 rounded-full w-[65%]" />
                    </div>
                    <p className="text-[10px] text-slate-400 font-medium">65% of budget consumed</p>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-4 text-xs">
                  <span className="font-bold text-slate-900">CTA: Join Now</span>
                  <div className="flex items-center space-x-1.5">
                    <button onClick={() => openEditModal('newsletter', true, { name: 'Newsletter Opt-in Promo', targeting: 'Desktop Visitors', expiry: 'Dec 31, 2024', status: 'Active' })} className="p-1.5 border border-slate-100 rounded-lg text-slate-400 bg-white hover:bg-slate-50 cursor-pointer" title="Edit"><Edit2 size={12} /></button>
                  </div>
                </div>
              </div>

            </div>
            
            {/* SECOND LEVEL ASSETS PACK BLOCKS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Tech Upgrade Card */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col justify-between space-y-5">
                <div className="space-y-4">
                  <div className="h-36 rounded-xl bg-gradient-to-br from-slate-700 to-indigo-700 p-4 flex items-start text-white">
                    <BadgTag text="New Launch" styles="bg-indigo-600 text-white" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-slate-900">Tech Upgrade 2024</h3>
                    <p className="text-xs text-slate-400">Electronics category specific hero banner.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100/50">
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Clicks</p>
                      <p className="text-sm font-black text-slate-800 mt-0.5">4.2k</p>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100/50">
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Conv.</p>
                      <p className="text-sm font-black text-slate-800 mt-0.5">2.1%</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-2 text-xs">
                  {techUpgradeExpiring ? (
                    <span className="text-rose-500 font-bold flex items-center space-x-1"><AlertTriangle size={13} /> <span>Expiring soon</span></span>
                  ) : (
                    <span className="text-emerald-500 font-bold flex items-center space-x-1"><CheckCircle2 size={13} /> <span>Extended</span></span>
                  )}
                  <button onClick={() => {
                    setTechUpgradeExpiring(false);
                    addToast('Banner duration extended successfully', 'success');
                  }} className="font-bold text-indigo-950 hover:underline cursor-pointer">Extend →</button>
                </div>
              </div>

              {/* App Exclusive Reward */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col justify-between space-y-5">
                <div className="space-y-4">
                  <div className="h-36 rounded-xl bg-slate-50 border border-slate-100 flex items-start p-4">
                    <BadgTag text="App Only" styles="bg-slate-200 text-slate-600" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-slate-900">App Exclusive Reward</h3>
                    <p className="text-xs text-slate-400">Deep-linked mobile app exclusive discount campaign.</p>
                  </div>
                  <div className="flex items-center space-x-2 pt-1">
                    <div className="flex -space-x-1.5 overflow-hidden">
                      <div className="inline-block h-5 w-5 rounded-full ring-2 ring-white bg-indigo-400" />
                      <div className="inline-block h-5 w-5 rounded-full ring-2 ring-white bg-purple-400" />
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">5 managers assigned</span>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-2 text-xs">
                  <BadgTag text={appRewardStatus} styles={appRewardStatus === 'Live' ? "bg-emerald-50 text-emerald-600 lowercase border border-emerald-100 px-2.5" : "bg-purple-50 text-purple-600 lowercase border border-purple-100 px-2.5"} />
                  <button onClick={handleRefreshAppReward} className="p-1.5 border border-slate-100 rounded-lg text-slate-400 bg-white hover:bg-slate-50 cursor-pointer" title="Refresh status"><RefreshCw size={12} className={appRewardStatus === 'Live' ? 'text-emerald-500' : ''} /></button>
                </div>
              </div>

              {/* CREATE NEW OFFER BANNER BOX BUTTON */}
              <div onClick={openCreateModal} className="border-2 border-dashed border-slate-200 bg-slate-50/50 hover:bg-slate-50 rounded-2xl p-6 flex flex-col items-center justify-center text-center group cursor-pointer transition-all space-y-3 min-h-[300px]">
                <div className="text-2xl text-slate-400 group-hover:text-indigo-950 font-bold">+</div>
                <div className="space-y-1 max-w-[200px]">
                  <h3 className="text-sm font-bold text-slate-900">Create Offer Banner</h3>
                  <p className="text-[11px] text-slate-400 leading-relaxed">Add a new promotional asset to the rotation</p>
                </div>
              </div>

            </div>
          </>
        )}

        {/* LIVE PERFORMANCE DATAGRID TABLE */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
            <h3 className="text-sm font-bold text-slate-900">{activeFilter} Campaigns Overview</h3>
            <div className="flex items-center space-x-2 text-xs font-semibold">
              <button onClick={handleExportCSV} className="text-slate-500 hover:text-slate-800 px-3 py-1.5 bg-slate-50 rounded-lg hover:bg-slate-100 cursor-pointer">Export CSV</button>
              <button onClick={() => {
                const markAllStatus = activeFilter === 'Active' ? 'Archived' : 'Active';
                setCampaigns(campaigns.map(c => c.status === activeFilter ? { ...c, status: markAllStatus } : c));
                addToast(`Bulk updated all to ${markAllStatus}`, 'success');
              }} className="bg-indigo-950 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-900 shadow-sm cursor-pointer">Move All to {activeFilter === 'Active' ? 'Archive' : 'Active'}</button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="table-responsive-wrapper">
<table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
                  <th className="pb-3 px-4">Campaign Name</th>
                  <th className="pb-3 px-4">Targeting</th>
                  <th className="pb-3 px-4">Reach</th>
                  <th className="pb-3 px-4">Ctr</th>
                  <th className="pb-3 px-4">Expiry</th>
                  <th className="pb-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCampaigns.map((camp) => (
                  <CampaignRow 
                    key={camp.id} 
                    {...camp} 
                    onEdit={openEditModal}
                    onDelete={handleDelete}
                  />
                ))}
                {filteredCampaigns.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center py-12 text-slate-400 text-sm font-medium">
                      No {activeFilter.toLowerCase()} campaigns found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
</div>
          </div>
        </div>

        {/* MODAL FOR CREATE / EDIT */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
              <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h3 className="font-bold text-slate-900 text-lg">
                  {modalMode === "Create" ? "Create New Banner" : "Edit Banner Settings"}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Campaign Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. Holiday Special"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Targeting Segment</label>
                  <input 
                    type="text" 
                    value={formData.targeting}
                    onChange={(e) => setFormData({...formData, targeting: e.target.value})}
                    placeholder="e.g. Premium Users, All"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Expiry Date / Status</label>
                  <input 
                    type="text" 
                    value={formData.expiry}
                    onChange={(e) => setFormData({...formData, expiry: e.target.value})}
                    placeholder="e.g. 12 Oct 2024 or Evergreen"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Lifecycle Status</label>
                  <Select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500 transition-all bg-white"
                    options={[{
                      label: "Active",
                      value: "Active"
                    }, {
                      label: "Scheduled",
                      value: "Scheduled"
                    }, {
                      label: "Archived",
                      value: "Archived"
                    }]} />
                </div>
              </div>
              <div className="px-6 py-4 border-t border-slate-100 flex justify-end space-x-3 bg-slate-50">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveModal}
                  className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-sm"
                >
                  {modalMode === "Create" ? "Publish Banner" : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </AdminShell>
  );
}
