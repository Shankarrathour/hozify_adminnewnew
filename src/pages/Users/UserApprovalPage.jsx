import React, { useState } from "react";
import AdminShell from "../../components/layouts/AdminShell";
import { useApp } from "../../hooks/useApp";
import { ROUTES } from "../../config/routes";
import { useToast } from "../../components/common/ToastNotification";
import { triggerDownload, generateCSV } from "../../utils/downloadHelper";
import {
  Filter,
  Download,
  CheckCircle2,
  AlertCircle,
  Clock,
  Ban,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

import Select from "../../components/ui/Select";

const queueData = [
  {
    id: 1,
    name: "Alexander Thorne",
    email: "alex.thorne@provider.com",
    date: "Oct 24, 2023 · 14:20",
    type: "Personal",
    typeBg: "#f1f5f9",
    typeColor: "#475569",
    docTags: ["ID CARD", "SELFIE", "TAX DOC"],
    docTagColors: {
      "ID CARD": { bg: "#eff6ff", color: "#2563eb" },
      SELFIE: { bg: "#f0fdf4", color: "#16a34a" },
      "TAX DOC": { bg: "#fdf2f8", color: "#9333ea" },
    },
    docStatus: "Blurred Scan · Action Required",
    docStatusIcon: "warn",
    priority: true,
    action: "review",
    initials: "AT",
    avatarBg: "#e0e7ff",
    avatarColor: "#4338ca",
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    email: "s.jenkins@enterprise.io",
    date: "Oct 24, 2023 · 15:05",
    type: "Business",
    typeBg: "#fef3c7",
    typeColor: "#b45309",
    docTags: [],
    docStatus: "Pending Review",
    docStatusIcon: "pending",
    priority: false,
    action: "approve",
    initials: "SJ",
    avatarBg: "#fce7f3",
    avatarColor: "#be185d",
  },
  {
    id: 3,
    name: "Marcus Vane",
    email: "m.vane@consultancy.net",
    date: "Oct 24, 2023 · 15:12",
    type: "Personal",
    typeBg: "#f1f5f9",
    typeColor: "#475569",
    docTags: [],
    docStatus: "Pending Review",
    docStatusIcon: "pending",
    priority: false,
    action: "approve",
    initials: "MV",
    avatarBg: "#e0f2fe",
    avatarColor: "#0369a1",
  },
  {
    id: 4,
    name: "Emily Carter",
    email: "e.carter@business.com",
    date: "Oct 24, 2023 · 15:22",
    type: "Business",
    typeBg: "#fef3c7",
    typeColor: "#b45309",
    docTags: [],
    docStatus: "Pending Review",
    docStatusIcon: "pending",
    priority: false,
    action: "approve",
    initials: "EC",
    avatarBg: "#ecfdf5",
    avatarColor: "#059669",
  },
];

function DocStatusBadge({ icon, label }) {
  if (icon === "warn") {
    return (
      <span style={{
        display: "inline-flex", alignItems: "center", gap: "5px",
        fontSize: "10px", fontWeight: "700", color: "#b45309",
        background: "#fef9c3", border: "1px solid #fde68a",
        borderRadius: "5px", padding: "3px 8px",
      }}>
        <AlertCircle size={11} style={{ color: "#ca8a04" }} />
        {label}
      </span>
    );
  }
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "5px",
      fontSize: "10px", fontWeight: "700", color: "#2563eb",
      background: "#eff6ff", border: "1px solid #bfdbfe",
      borderRadius: "5px", padding: "3px 8px",
    }}>
      <Clock size={11} style={{ color: "#3b82f6" }} />
      {label}
    </span>
  );
}

function ApprovalRow({ row, onAction }) {
  return (
    <tr style={{
      borderBottom: "1px solid #f1f5f9",
      background: "#fff",
      transition: "background 0.15s",
      borderLeft: row.priority ? "3px solid #4f46e5" : "3px solid transparent",
    }}
      onMouseEnter={e => e.currentTarget.style.background = "#fafafa"}
      onMouseLeave={e => e.currentTarget.style.background = "#fff"}
    >
      {/* USER PROFILE */}
      <td style={{ padding: "14px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "38px", height: "38px", borderRadius: "10px",
            background: row.avatarBg, color: row.avatarColor,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "13px", fontWeight: "800", flexShrink: 0,
          }}>
            {row.initials}
          </div>
          <div>
            <p style={{ fontSize: "13px", fontWeight: "700", color: "#0f172a", margin: 0 }}>
              {row.name}
            </p>
            <p style={{ fontSize: "11px", color: "#94a3b8", margin: "2px 0 0", fontWeight: "500" }}>
              {row.email}
            </p>
          </div>
        </div>
      </td>

      {/* SUBMISSION DATE */}
      <td style={{ padding: "14px 16px", fontSize: "12px", color: "#64748b", fontWeight: "600", whiteSpace: "nowrap" }}>
        {row.date}
      </td>

      {/* TYPE */}
      <td style={{ padding: "14px 16px" }}>
        <span style={{
          fontSize: "10px", fontWeight: "800", textTransform: "uppercase",
          letterSpacing: "0.4px", padding: "4px 10px", borderRadius: "20px",
          background: row.typeBg, color: row.typeColor,
        }}>
          {row.type}
        </span>
      </td>

      {/* DOC STATUS */}
      <td style={{ padding: "14px 16px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {row.docTags.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
              {row.docTags.map(tag => (
                <span key={tag} style={{
                  fontSize: "9px", fontWeight: "800", textTransform: "uppercase",
                  letterSpacing: "0.5px", padding: "2px 7px", borderRadius: "4px",
                  background: row.docTagColors[tag].bg,
                  color: row.docTagColors[tag].color,
                  border: `1px solid ${row.docTagColors[tag].bg}`,
                }}>
                  {tag}
                </span>
              ))}
            </div>
          )}
          <DocStatusBadge icon={row.docStatusIcon} label={row.docStatus} />
        </div>
      </td>

      {/* ACTIONS */}
      <td style={{ padding: "14px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {row.action === "review" ? (
            <>
              <button
                type="button"
                onClick={() => onAction(row, "review")}
                style={{
                  background: "#0f172a", color: "#fff", border: "none",
                  borderRadius: "7px", padding: "7px 16px", fontSize: "12px",
                  fontWeight: "700", cursor: "pointer", letterSpacing: "0.2px",
                  transition: "all 0.15s",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "#1e293b"}
                onMouseLeave={e => e.currentTarget.style.background = "#0f172a"}
              >
                Review
              </button>
              <button
                type="button"
                title="Reject"
                onClick={() => onAction(row, "reject")}
                style={{
                  background: "#fff0f0", border: "1px solid #fecaca",
                  color: "#dc2626", borderRadius: "7px", padding: "7px 9px",
                  cursor: "pointer", display: "flex", alignItems: "center",
                  justifyContent: "center", transition: "all 0.15s",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "#fee2e2"}
                onMouseLeave={e => e.currentTarget.style.background = "#fff0f0"}
              >
                <Ban size={14} />
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => onAction(row, "approve")}
                style={{
                  background: "#0f172a", color: "#fff", border: "none",
                  borderRadius: "7px", padding: "7px 16px", fontSize: "12px",
                  fontWeight: "700", cursor: "pointer", transition: "all 0.15s",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "#1e293b"}
                onMouseLeave={e => e.currentTarget.style.background = "#0f172a"}
              >
                Approve
              </button>
              <button
                type="button"
                onClick={() => onAction(row, "reject")}
                style={{
                  background: "#fff", color: "#475569",
                  border: "1px solid #e2e8f0",
                  borderRadius: "7px", padding: "7px 16px", fontSize: "12px",
                  fontWeight: "700", cursor: "pointer", transition: "all 0.15s",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "#fee2e2";
                  e.currentTarget.style.color = "#dc2626";
                  e.currentTarget.style.border = "1px solid #fecaca";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "#fff";
                  e.currentTarget.style.color = "#475569";
                  e.currentTarget.style.border = "1px solid #e2e8f0";
                }}
              >
                Reject
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
}

export default function UserApprovalPage() {
  const { navigate } = useApp();
  const { addToast } = useToast();
  const [rows, setRows] = useState(queueData);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterDocStatus, setFilterDocStatus] = useState("All");

  const filteredRows = rows.filter((r) => {
    if (filterDocStatus === "All") return true;
    if (filterDocStatus === "Pending") return r.docStatus.includes("Pending");
    if (filterDocStatus === "Action") return r.docStatus.includes("Required") || r.docStatus.includes("Action");
    return true;
  });

  const handleAction = (userRow, action) => {
    if (action === "approve") {
      setRows(prev => prev.filter(r => r.id !== userRow.id));
      addToast(`KYC successfully approved for ${userRow.name}!`, "success");
    } else if (action === "reject") {
      setRows(prev => prev.filter(r => r.id !== userRow.id));
      addToast(`KYC document submission rejected for ${userRow.name}.`, "success");
    } else if (action === "review") {
      navigate(ROUTES.userDocuments);
      addToast(`Loading document vault for manual inspection: ${userRow.name}`, "success");
    }
  };

  const handleExportCSV = () => {
    const csvContent = generateCSV(
      ["Name", "Email", "SubmissionDate", "AccountType", "Status"],
      filteredRows.map((r) => ({
        Name: r.name,
        Email: r.email,
        SubmissionDate: r.date,
        AccountType: r.type,
        Status: r.docStatus,
      }))
    );
    triggerDownload(csvContent, "kyc_approvals_queue.csv", "text/csv");
    addToast("KYC pending approvals queue exported successfully!", "success");
  };



  const handlePageChange = (direction) => {
    const nextPage = direction === "next" ? currentPage + 1 : Math.max(1, currentPage - 1);
    setCurrentPage(nextPage);
    addToast(`Switched approval list to page ${nextPage}`, "success");
  };

  return (
    <AdminShell
      activeTab="Users"
      headerTitle="User Approvals (KYC)"
      searchPlaceholder="Search bookings, users, or partners..."
    >
      <div style={{ minHeight: "100vh", background: "#f8fafc", paddingBottom: "40px" }}>

      {/* PAGE HEADER */}
      <div style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "flex-start", marginBottom: "24px",
      }}>
        <div>
          <h1 style={{
            fontSize: "26px", fontWeight: "800", color: "#0f172a",
            margin: "0 0 4px", letterSpacing: "-0.4px",
          }}>
            User Approvals (KYC)
          </h1>
          <p style={{ fontSize: "13px", color: "#94a3b8", margin: 0, fontWeight: "500" }}>
            Manage and verify pending identity documentation for new accounts.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <Select
            value={filterDocStatus}
            onChange={(e) => setFilterDocStatus(e.target.value)}
            style={{
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              padding: "8px 14px",
              background: "#fff",
              fontSize: "12px",
              fontWeight: "700",
              color: "#475569",
              cursor: "pointer",
              outline: "none",
            }}
            options={[{
              label: "All Documents Status",
              value: "All"
            }, {
              label: "Pending Review",
              value: "Pending"
            }, {
              label: "Action Required",
              value: "Action"
            }]} />
          <button
            type="button"
            onClick={handleExportCSV}
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              border: "1px solid #e2e8f0", borderRadius: "8px",
              padding: "8px 14px", background: "#fff",
              fontSize: "12px", fontWeight: "700", color: "#475569",
              cursor: "pointer",
            }}
          >
            <Download size={13} />
            Export CSV
          </button>
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {/* Pending Total */}
        <div 
          onClick={() => addToast("Total pending manual review items: 124", "success")}
          className="bg-white border rounded-xl p-5 hover:shadow-md transition cursor-pointer"
        >
          <p style={{ fontSize: "10px", fontWeight: "800", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.6px", margin: "0 0 8px" }}>
            Pending Total
          </p>
          <h2 style={{ fontSize: "32px", fontWeight: "900", color: "#0f172a", margin: "0 0 8px", lineHeight: 1 }}>
            124
          </h2>
          <p style={{ fontSize: "11px", color: "#6366f1", fontWeight: "700", margin: 0, display: "flex", alignItems: "center", gap: "3px" }}>
            <TrendingUp size={12} />
            +12% from yesterday
          </p>
        </div>

        {/* Avg Processing Time */}
        <div 
          onClick={() => addToast("Platform average processing time is 4.2 hours.", "success")}
          className="bg-white border rounded-xl p-5 hover:shadow-md transition cursor-pointer"
        >
          <p style={{ fontSize: "10px", fontWeight: "800", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.6px", margin: "0 0 8px" }}>
            Avg. Processing Time
          </p>
          <h2 style={{ fontSize: "32px", fontWeight: "900", color: "#0f172a", margin: "0 0 8px", lineHeight: 1 }}>
            4.2 <span style={{ fontSize: "14px", fontWeight: "600", color: "#94a3b8" }}>hrs</span>
          </h2>
          <p style={{ fontSize: "11px", color: "#ef4444", fontWeight: "700", margin: 0, display: "flex", alignItems: "center", gap: "3px" }}>
            <TrendingDown size={12} />
            ↓ 0.5 hrs target
          </p>
        </div>

        {/* Verified Today */}
        <div 
          onClick={() => addToast("48 identity verifications successfully closed today.", "success")}
          className="bg-white border rounded-xl p-5 hover:shadow-md transition cursor-pointer"
          style={{ background: "#f0fdf4", borderColor: "#bbf7d0" }}
        >
          <div style={{ display: "flex", justifyBetween: "space-between", alignItems: "flex-start", width: "100%" }}>
            <div>
              <p style={{ fontSize: "10px", fontWeight: "800", color: "#16a34a", textTransform: "uppercase", letterSpacing: "0.6px", margin: "0 0 8px" }}>
                Verified Today
              </p>
              <h2 style={{ fontSize: "36px", fontWeight: "900", color: "#15803d", margin: "0 0 10px", lineHeight: 1 }}>
                48
              </h2>
            </div>
            <div style={{
              width: "34px", height: "34px", borderRadius: "8px",
              background: "#dcfce7", display: "flex", alignItems: "center",
              justifyContent: "center", marginLeft: "auto"
            }}>
              <CheckCircle2 size={18} style={{ color: "#16a34a" }} />
            </div>
          </div>
          <div style={{ height: "5px", background: "#bbf7d0", borderRadius: "4px", overflow: "hidden" }}>
            <div style={{ width: "80%", height: "100%", background: "#22c55e", borderRadius: "4px" }} />
          </div>
        </div>

        {/* Escalated */}
        <div 
          onClick={() => addToast("7 complex cases escalated to compliance managers.", "success")}
          className="bg-white border rounded-xl p-5 hover:shadow-md transition cursor-pointer"
          style={{ background: "#fff5f5", borderColor: "#fecaca" }}
        >
          <div style={{ display: "flex", justifyBetween: "space-between", alignItems: "flex-start", width: "100%" }}>
            <div>
              <p style={{ fontSize: "10px", fontWeight: "800", color: "#dc2626", textTransform: "uppercase", letterSpacing: "0.6px", margin: "0 0 8px" }}>
                Escalated
              </p>
              <h2 style={{ fontSize: "36px", fontWeight: "900", color: "#dc2626", margin: "0 0 10px", lineHeight: 1 }}>
                7
              </h2>
            </div>
            <div style={{
              width: "34px", height: "34px", borderRadius: "8px",
              background: "#fee2e2", display: "flex", alignItems: "center",
              justifyContent: "center", marginLeft: "auto"
            }}>
              <AlertCircle size={18} style={{ color: "#dc2626" }} />
            </div>
          </div>
          <div style={{ height: "5px", background: "#fecaca", borderRadius: "4px", overflow: "hidden" }}>
            <div style={{ width: "20%", height: "100%", background: "#ef4444", borderRadius: "4px" }} />
          </div>
        </div>
      </div>

      {/* VERIFICATION QUEUE TABLE */}
      <div style={{
        background: "#fff", borderRadius: "12px",
        border: "1px solid #e2e8f0",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)", overflow: "hidden",
      }}>
        {/* TABLE TOP BAR */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", padding: "16px 20px",
          borderBottom: "1px solid #f1f5f9",
        }}>
          <h3 style={{ fontSize: "15px", fontWeight: "800", color: "#0f172a", margin: 0 }}>
            Verification Queue
          </h3>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: "11px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: "600", color: "#4f46e5" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#4f46e5", display: "inline-block" }} />
              Priority
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: "600", color: "#94a3b8" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#cbd5e1", display: "inline-block" }} />
              Standard
            </span>
          </div>
        </div>

        {/* TABLE */}
        <div className="table-wrap" style={{ overflowY: 'auto', maxHeight: '400px' }}>
          <div className="table-responsive-wrapper">
<table className="materio-table" style={{ width: "100%", borderCollapse: 'collapse', minWidth: "900px" }}>
            <thead>
              <tr style={{ background: "#f8fafc", borderBottom: "1px solid #f1f5f9" }}>
                {["USER PROFILE", "SUBMISSION DATE", "TYPE", "DOC STATUS", "ACTIONS"].map(col => (
                  <th key={col} style={{
                    textAlign: "left", padding: "11px 16px",
                    fontSize: "10px", fontWeight: "800",
                    color: "#94a3b8", letterSpacing: "0.6px",
                    textTransform: "uppercase",
                  }}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredRows.map(row => (
                <ApprovalRow key={row.id} row={row} onAction={handleAction} />
              ))}
              {filteredRows.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center", padding: "40px", color: "#94a3b8", fontSize: "13px", fontWeight: "600" }}>
                    No pending approvals. All caught up! 🎉
                  </td>
                </tr>
              )}
            </tbody>
          </table>
</div>
        </div>

        {/* TABLE FOOTER */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", padding: "14px 20px",
          borderTop: "1px solid #f1f5f9",
        }}>
          <p style={{ fontSize: "12px", color: "#94a3b8", fontWeight: "600", margin: 0 }}>
            Showing <strong style={{ color: "#475569" }}>1 – {filteredRows.length}</strong> of <strong style={{ color: "#475569" }}>124</strong> requests
          </p>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              type="button"
              onClick={() => handlePageChange("prev")}
              style={{
                display: "flex", alignItems: "center", gap: "4px",
                border: "1px solid #e2e8f0", borderRadius: "7px",
                padding: "6px 14px", background: "#fff",
                fontSize: "12px", fontWeight: "700", color: "#94a3b8",
                cursor: "pointer",
              }}
            >
              <ChevronLeft size={14} />
              Previous
            </button>
            <button
              type="button"
              onClick={() => handlePageChange("next")}
              style={{
                display: "flex", alignItems: "center", gap: "4px",
                border: "none", borderRadius: "7px",
                padding: "6px 14px", background: "#0f172a",
                fontSize: "12px", fontWeight: "700", color: "#fff",
                cursor: "pointer",
              }}
            >
              Next
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
    </AdminShell>
  );
}