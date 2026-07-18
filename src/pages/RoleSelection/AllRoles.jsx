import React, { useState } from "react";
import AdminShell from "../../components/layouts/AdminShell";
import { 
  Shield, 
  ShieldAlert, 
  Plus, 
  Search, 
  SlidersHorizontal, 
  Save, 
  Trash2, 
  CheckCircle2,
  Lock,
  Users
} from "lucide-react";

export default function AllRoles() {
  // ==========================================
  // STATE MANAGEMENT
  // ==========================================
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("admin"); // Default active role id
  const [showAddModal, setShowAddModal] = useState(false);
  const [newRoleName, setNewRoleName] = useState("");
  const [newRoleDesc, setNewRoleDesc] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [showRoleFilter, setShowRoleFilter] = useState(false);
  const [roleFilter, setRoleFilter] = useState('all');

  // Master Mock Roles Data structure with complete functional schemas
  const [roles, setRoles] = useState([
    {
      id: "admin",
      name: "Super Administrator",
      description: "Full system access, billing controls, and master system infrastructure management.",
      usersCount: 4,
      isSystem: true,
      permissions: {
        dashboard: { view: true, create: true, edit: true, delete: true, export: true },
        inventory: { view: true, create: true, edit: true, delete: true, export: true },
        orders: { view: true, create: true, edit: true, delete: true, export: true },
        users: { view: true, create: true, edit: true, delete: true, export: true },
      }
    },
    {
      id: "manager",
      name: "Operations Manager",
      description: "Manage dispatch channels, inventory allocations, and standard staff monitoring.",
      usersCount: 12,
      isSystem: false,
      permissions: {
        dashboard: { view: true, create: false, edit: true, delete: false, export: true },
        inventory: { view: true, create: true, edit: true, delete: false, export: true },
        orders: { view: true, create: true, edit: true, delete: true, export: true },
        users: { view: true, create: false, edit: false, delete: false, export: false },
      }
    },
    {
      id: "support",
      name: "Support Executive",
      description: "Read-only analytics view and processing customer ticket logs.",
      usersCount: 28,
      isSystem: false,
      permissions: {
        dashboard: { view: true, create: false, edit: false, delete: false, export: false },
        inventory: { view: true, create: false, edit: false, delete: false, export: false },
        orders: { view: true, create: false, edit: true, delete: false, export: false },
        users: { view: false, create: false, edit: false, delete: false, export: false },
      }
    }
  ]);

  // System Modules Mapping List
  const systemModules = [
    { key: "dashboard", name: "Analytics Dashboard", description: "System charts, core matrix and revenue metrics logs" },
    { key: "inventory", name: "Inventory Management", description: "Stock items, warehouse configuration and supplier trails" },
    { key: "orders", name: "Order Processing", description: "Invoices, tracking logs, shipping batch updates" },
    { key: "users", name: "User Directory", description: "Customer records, personnel data profiles and settings" }
  ];

  // Find active role data profile safely
  const activeRoleData = roles.find(r => r.id === selectedRole) || roles[0];

  // ==========================================
  // CLICKABLE INTERACTIVE HANDLERS
  // ==========================================
  
  // Dynamic Checkbox Switch Toggler
  const handlePermissionChange = (moduleKey, action) => {
    setIsSaved(false);
    setRoles(prevRoles => prevRoles.map(role => {
      if (role.id === selectedRole) {
        return {
          ...role,
          permissions: {
            ...role.permissions,
            [moduleKey]: {
              ...role.permissions[moduleKey],
              [action]: !role.permissions[moduleKey]?.[action]
            }
          }
        };
      }
      return role;
    }));
  };

  // Form Submission: Create Custom Identity Template
  const handleCreateRole = (e) => {
    e.preventDefault();
    if (!newRoleName.trim()) return;

    const newId = newRoleName.toLowerCase().replace(/\s+/g, "-");
    const newRoleObj = {
      id: newId,
      name: newRoleName,
      description: newRoleDesc || "Custom generated access management role.",
      usersCount: 0,
      isSystem: false,
      permissions: {
        dashboard: { view: true, create: false, edit: false, delete: false, export: false },
        inventory: { view: false, create: false, edit: false, delete: false, export: false },
        orders: { view: false, create: false, edit: false, delete: false, export: false },
        users: { view: false, create: false, edit: false, delete: false, export: false },
      }
    };

    setRoles([...roles, newRoleObj]);
    setSelectedRole(newId);
    setNewRoleName("");
    setNewRoleDesc("");
    setShowAddModal(false);
    setIsSaved(false);
  };

  // Clickable Delete Action Trigger
  const handleDeleteRole = (id, e) => {
    e.stopPropagation();
    const targetRole = roles.find(r => r.id === id);
    if (targetRole?.isSystem) return;
    
    if (confirm(`Are you sure you want to completely erase ${targetRole?.name}?`)) {
      const remaining = roles.filter(r => r.id !== id);
      setRoles(remaining);
      setSelectedRole(remaining[0]?.id || "");
      setIsSaved(false);
    }
  };

  // Commit Save Changes Trigger
  const handleCommitSettings = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  // Filter query configuration
  const filteredRoles = roles.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = roleFilter === 'all' ? true : roleFilter === 'system' ? r.isSystem : !r.isSystem;
    return matchesSearch && matchesType;
  });

  return (
    <AdminShell activeTab="Role & Permissions">
      <div className="space-y-6">
        
        {/* ==========================================
            1. PAGE HEADER
           ========================================== */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-3 rounded-xl border border-slate-100 shadow-xs">
          <div className="flex items-center gap-3 pl-2">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-black text-indigo-950 tracking-tight">Role & Access Permissions</h1>
              <p className="text-[11px] text-slate-400 font-medium">Define master authentication clearance tiers and core infrastructure privileges</p>
            </div>
          </div>
          
          <div className="pr-2">
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-950 text-white rounded-lg text-xs font-bold hover:bg-indigo-900 shadow-xs transition-all cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Create New Role</span>
            </button>
          </div>
        </div>

        {/* ==========================================
            2. UTILITY SEARCH STRIP
           ========================================== */}
        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search internal role indices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:bg-white focus:border-indigo-950"
            />
          </div>
          <div className="relative">
            <button 
              onClick={() => setShowRoleFilter(!showRoleFilter)}
              className="text-[11px] font-bold text-slate-400 flex items-center gap-1.5 hover:text-indigo-600 hover:bg-indigo-50 px-2 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="h-3 w-3" />
              <span>Active Roles Configured: <strong className="text-slate-700">{filteredRoles.length}</strong></span>
            </button>
            
            {showRoleFilter && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                <div className="p-2 border-b border-slate-100 bg-slate-50">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Filter Roles By Type</span>
                </div>
                <div className="p-1.5 flex flex-col gap-1">
                  <button onClick={() => {setRoleFilter('all'); setShowRoleFilter(false)}} className={`text-left px-3 py-2 text-xs font-semibold rounded-lg ${roleFilter === 'all' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}>All Roles</button>
                  <button onClick={() => {setRoleFilter('system'); setShowRoleFilter(false)}} className={`text-left px-3 py-2 text-xs font-semibold rounded-lg ${roleFilter === 'system' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}>Core System Roles</button>
                  <button onClick={() => {setRoleFilter('custom'); setShowRoleFilter(false)}} className={`text-left px-3 py-2 text-xs font-semibold rounded-lg ${roleFilter === 'custom' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}>Custom Roles</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ==========================================
            3. MAIN WORKSPACE MATRIX SPLIT
           ========================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT PANEL: ROLES SELECTOR DIRECTORY */}
          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
            <div className="px-4 py-3.5 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-bold text-xs text-indigo-950 tracking-tight uppercase">System Security Profiles</h3>
            </div>
            
            <div className="p-2 space-y-1">
              {filteredRoles.map((role) => {
                const isActive = role.id === selectedRole;
                return (
                  <div
                    key={role.id}
                    onClick={() => {
                      setSelectedRole(role.id);
                      setIsSaved(false);
                    }}
                    className={`p-3 rounded-lg border transition-all cursor-pointer relative group flex justify-between items-start ${
                      isActive 
                        ? "bg-indigo-50/70 border-indigo-400 pl-2.5" 
                        : "bg-white border-transparent hover:bg-slate-50"
                    }`}
                  >
                    <div className="space-y-1 pr-6">
                      <div className="flex items-center gap-1.5">
                        <h4 className={`text-xs font-bold ${isActive ? "text-indigo-950" : "text-slate-700"}`}>
                          {role.name}
                        </h4>
                        {role.isSystem && (
                          <span className="text-[9px] font-extrabold bg-slate-100 text-slate-400 px-1.5 py-0.2 rounded border border-slate-200 uppercase tracking-wider">
                            Core
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed font-medium">
                        {role.description}
                      </p>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 pt-1">
                        <Users className="h-3 w-3" />
                        <span>{role.usersCount} Assigned Members</span>
                      </div>
                    </div>

                    {/* Trash Execution Trigger */}
                    {!role.isSystem && (
                      <button
                        onClick={(e) => handleDeleteRole(role.id, e)}
                        className="text-slate-300 hover:text-rose-600 p-1 rounded-md hover:bg-rose-50 transition-colors opacity-0 group-hover:opacity-100 absolute right-2 top-2 cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                );
              })}

              {filteredRoles.length === 0 && (
                <div className="text-center py-6 text-xs text-slate-400 font-medium">
                  No matching access definitions found.
                </div>
              )}
            </div>
          </div>

          {/* RIGHT PANEL: DYNAMIC INTERACTIVE PERMISSIONS CHECKLIST */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
            
            {/* Target Header Metadata */}
            <div className="px-4 py-3.5 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <span className="text-[9px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded uppercase tracking-wider inline-block">
                  RBAC Node Configuration
                </span>
                <h2 className="text-base font-black text-slate-900 tracking-tight mt-0.5">
                  {activeRoleData.name} Workspace
                </h2>
                <p className="text-xs text-slate-400 font-medium mt-0.5">{activeRoleData.description}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
                {isSaved && (
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-1 rounded-lg flex items-center gap-1 animate-fade-in">
                    <CheckCircle2 className="h-3 w-3" /> Settings Deployed
                  </span>
                )}
                <button
                  onClick={handleCommitSettings}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-950 hover:bg-indigo-900 text-white rounded-lg text-xs font-bold transition-all shadow-3xs cursor-pointer"
                >
                  <Save className="h-3.5 w-3.5" />
                  <span>Commit Settings</span>
                </button>
              </div>
            </div>

            {/* Matrix Shell Tables Container */}
            <div className="p-4 space-y-4">
              <h3 className="text-xs font-bold text-indigo-950 uppercase tracking-tight flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5 text-slate-400" />
                <span>Granular Module Access Matrix</span>
              </h3>

              <div className="overflow-x-auto border border-slate-200 rounded-xl bg-slate-50/30">
                <div className="table-responsive-wrapper">
<table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#1d0094] border-b border-[#1d0094] text-[10px] uppercase font-bold text-white tracking-wider">
                      <th className="p-3 w-1/3 rounded-tl-lg">Module Endpoint</th>
                      <th className="p-3 text-center">Read / View</th>
                      <th className="p-3 text-center">Create</th>
                      <th className="p-3 text-center">Edit</th>
                      <th className="p-3 text-center">Delete</th>
                      <th className="p-3 text-center rounded-tr-lg">Export</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white text-xs font-semibold text-slate-700">
                    {systemModules.map((mod) => {
                      const itemPerms = activeRoleData.permissions?.[mod.key] || {};
                      const isAdminLock = activeRoleData.id === "admin";
                      
                      return (
                        <tr key={mod.key} className="hover:bg-slate-50/40 transition-colors">
                          <td className="p-3">
                            <span className="font-bold text-slate-900 block">{mod.name}</span>
                            <span className="text-[10px] text-slate-400 font-medium block  mt-0.5 leading-tight">{mod.description}</span>
                          </td>
                          
                          {/* Map actions inside cleanly driven input checklist arrays */}
                          {["view", "create", "edit", "delete", "export"].map((action) => (
                            <td key={action} className="p-3 text-center">
                              <label className="inline-flex items-center justify-center cursor-pointer p-1">
                                <input 
                                  type="checkbox"
                                  checked={!!itemPerms[action]}
                                  onChange={() => handlePermissionChange(mod.key, action)}
                                  className="h-4 w-4 rounded border-slate-300 text-indigo-950 focus:ring-indigo-950/20 cursor-pointer accent-indigo-950 transition-all"
                                />
                              </label>
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
</div>
              </div>

              {/* Warning Strip */}
              {activeRoleData.isSystem && (
                <div className="bg-amber-50/60 border border-amber-200 rounded-lg p-3 flex items-start gap-2.5">
                  <ShieldAlert className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-[11px] font-medium text-amber-800 leading-normal">
                    <strong>Core Protected Profile:</strong> This deployment structure belongs to the platform root administrator framework. Downgrading privileges from the client-side matrix layer is locked to prevent infrastructure lockouts.
                  </p>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* ==========================================
            4. CREATE ROLE MODAL LAYER OVERLAY
           ========================================== */}
        {showAddModal && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
              <div className="bg-indigo-950 p-4 text-white">
                <h3 className="text-sm font-black tracking-tight">Create Custom System Scope</h3>
                <p className="text-[11px] text-indigo-200 mt-0.5">Generate customized administrative groups with isolated security clearances.</p>
              </div>

              <form onSubmit={handleCreateRole} className="p-4 space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Role Identity Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g., Regional Logistics Inspector"
                    value={newRoleName}
                    onChange={(e) => setNewRoleName(e.target.value)}
                    className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:bg-white focus:border-indigo-950"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Scope Profile Description</label>
                  <textarea 
                    rows="3"
                    placeholder="Write a clear functional summary describing what standard access triggers this identity possesses..."
                    value={newRoleDesc}
                    onChange={(e) => setNewRoleDesc(e.target.value)}
                    className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:bg-white focus:border-indigo-950 resize-none font-medium"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-3 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 bg-white hover:bg-slate-50 cursor-pointer"
                  >
                    Discard
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-950 hover:bg-indigo-900 text-white font-bold text-xs rounded-lg shadow-2xs cursor-pointer"
                  >
                    Build Identity Template
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </AdminShell>
  );
}
