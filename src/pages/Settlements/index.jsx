import React, { useState } from "react";
import {
  Wallet,
  Download,
  Calendar,
  Landmark,
  CheckCircle,
  AlertTriangle,
  CreditCard,
  Settings,
  ChevronLeft,
  ChevronRight,
  Eye,
  XCircle,
  CheckCircle2
} from "lucide-react";
import { useApp } from "../../hooks/useApp";
import KpiCard from "../../features/dashboard/KpiCard";
import AdminShell from "../../components/layouts/AdminShell";

import Select from "../../components/ui/Select";

const settlementRequestsList = [
  { id: "SET-99021", bankName: "HDFC Bank Ltd", partnerName: "Nexis Logistics", accNo: "******9902", amount: "24,800", status: "Approved", statusColor: "green" },
  { id: "SET-98911", bankName: "ICICI Bank", partnerName: "Sarah Chen", accNo: "******1128", amount: "15,450", status: "Pending", statusColor: "blue" },
  { id: "SET-98520", bankName: "State Bank of India", partnerName: "Marcus Rodriguez", accNo: "******3402", amount: "8,500", status: "Hold", statusColor: "orange" },
  { id: "SET-98114", bankName: "Axis Bank", partnerName: "Deepak Sharma", accNo: "******8842", amount: "4,200", status: "Processed", statusColor: "gray" }
];

function ConfirmModal({ modal, onClose }) {
  if (!modal) return null;
  const { title, message, onConfirm, details } = modal;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#fff", borderRadius: "12px", padding: "28px 32px", maxWidth: "480px", width: "90%", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
        <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#1e293b", marginBottom: "10px" }}>{title}</h3>
        {details && (
          <div style={{ background: "#f8fafc", borderRadius: "8px", padding: "12px 14px", marginBottom: "14px", fontSize: "13px", color: "#475569", lineHeight: "1.9" }}>
            {Object.entries(details).map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: "600", color: "#94a3b8" }}>{k}</span>
                <span style={{ fontWeight: "700", color: "#1e293b" }}>{v}</span>
              </div>
            ))}
          </div>
        )}
        {message && <p style={{ fontSize: "13px", color: "#64748b", marginBottom: "20px" }}>{message}</p>}
        <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{ padding: "8px 18px", borderRadius: "6px", border: "1px solid #e2e8f0", background: "#f8fafc", fontWeight: "600", fontSize: "13px", cursor: "pointer", color: "#475569" }}>
            {onConfirm ? "Cancel" : "Close"}
          </button>
          {onConfirm && (
            <button onClick={() => { onConfirm(); onClose(); }} style={{ padding: "8px 18px", borderRadius: "6px", border: "none", background: "#1e1591", color: "#fff", fontWeight: "700", fontSize: "13px", cursor: "pointer" }}>
              Confirm
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function ToastStack({ toasts }) {
  return (
    <div style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 10000, display: "flex", flexDirection: "column", gap: "8px" }}>
      {toasts.map((t) => (
        <div key={t.id} style={{ background: "#1e293b", color: "#fff", padding: "10px 16px", borderRadius: "8px", fontSize: "13px", fontWeight: "600", boxShadow: "0 4px 16px rgba(0,0,0,0.25)", maxWidth: "320px" }}>
          {t.message}
        </div>
      ))}
    </div>
  );
}

export default function Settlements() {
  const { navigate } = useApp();
  const [selectedMonth, setSelectedMonth] = useState("October 2023");
  const [filterStatus, setFilterStatus] = useState("All");
  const [requests, setRequests] = useState(settlementRequestsList);
  const [modal, setModal] = useState(null);
  const [toasts, setToasts] = useState([]);

  const toast = (message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
  };

  const colorMap = { Approved: "green", Pending: "blue", Hold: "orange", Processed: "gray", Rejected: "red" };

  const updateStatus = (id, newStatus) => {
    setRequests((prev) => prev.map((req) => req.id === id ? { ...req, status: newStatus, statusColor: colorMap[newStatus] || "gray" } : req));
  };

  const getFilteredRequests = () => {
    if (filterStatus === "All") return requests;
    return requests.filter((r) => r.status.toLowerCase() === filterStatus.toLowerCase());
  };

  const handleDownloadCSV = () => {
    const headers = ["Settlement ID", "Bank Name", "Partner", "Account", "Amount", "Status"];
    const rows = requests.map((r) => [r.id, r.bankName, r.partnerName, r.accNo, r.amount, r.status]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Settlements_${selectedMonth.replace(" ", "_")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast("Settlement report downloaded successfully!");
  };

  const settlementKPIs = [
    { title: "Total Paid out", value: "$428,920.00", topLabel: "Oct Settled", topLabelClass: "gray-badge font-bold", icon: CheckCircle },
    { title: "Pending Approval", value: "$15,450.00", topLabel: "1 Awaiting", topLabelClass: "blue-text bg-blue-soft font-bold", icon: Landmark },
    { title: "Approved in Queue", value: "$24,800.00", topLabel: "Ready for batch", topLabelClass: "green-badge font-bold", icon: Wallet },
    { title: "Audit / On Hold", value: "$8,500.00", topLabel: "Risk check", topLabelClass: "red-text bg-red-soft font-bold", icon: AlertTriangle }
  ];

  const actionBtn = (bg, color, border, disabled) => ({
    background: disabled ? "#f1f5f9" : bg,
    color: disabled ? "#cbd5e1" : color,
    border: `1px solid ${disabled ? "#e2e8f0" : border}`,
    borderRadius: "50%",
    width: "28px",
    height: "28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: disabled ? "not-allowed" : "pointer",
    flexShrink: 0,
    transition: "all 0.15s"
  });

  return (
    <AdminShell showGlobalExport={true}
      activeTab="Settlements"
      searchPlaceholder="Search banks, transactions, or account IDs..."
      headerTitle="Financial Ledger Services"
      pageTitle="Settlements & Payouts"
      pageSubtitle="Monitor transaction ledgers, partner payouts and financial reconciliation in real-time."
    >
      <ToastStack toasts={toasts} />
      <ConfirmModal modal={modal} onClose={() => setModal(null)} />
      <div className="partners-page-header">
        <div>
          <span className="queue-verification-control-tag font-bold green-text bg-green-soft" style={{ padding: "4px 8px", borderRadius: "4px", color: "#047857", background: "#ecfdf5" }}>
            LEDGER CONTROL
          </span>
          <h1 className="page-title margin-top-4">Settlement Management</h1>
          <p className="page-subtitle">Process batch payments, verify bank accounts, and configure auto-compliance payout criteria.</p>
        </div>
        <div className="partners-header-buttons">
          <div className="date-select-picker-wrap" style={{ display: "flex", alignItems: "center", gap: "8px", border: "1.5px solid #25108f", padding: "6px 12px", borderRadius: "6px", background: "#fff" }}>
            <Calendar size={16} />
            <Select
              style={{ border: "none", background: "transparent", outline: "none", fontWeight: "700", fontSize: "13px", cursor: "pointer" }}
              value={selectedMonth}
              onChange={(e) => { setSelectedMonth(e.target.value); toast(`Settlement period changed to ${e.target.value}`); }}
              aria-label="Settlement month selection"
              options={[{
                label: "October 2023",
                value: "October 2023"
              }, {
                label: "September 2023",
                value: "September 2023"
              }, {
                label: "August 2023",
                value: "August 2023"
              }]} />
          </div>
          <button className="primary-action-btn font-bold" type="button" onClick={handleDownloadCSV}>
            <Download size={16} /><span>Download CSV</span>
          </button>
        </div>
      </div>
      <section className="kpi-grid queue-kpi-grid" style={{ gridTemplateColumns: "repeat(4, minmax(0, 1fr))" }}>
        {settlementKPIs.map((kpi, idx) => <KpiCard key={idx} {...kpi} />)}
      </section>
      <section className="panel approval-queue-directory-panel">
        <div className="directory-panel-header">
          <h2>Settlement Request Queue</h2>
          <div className="approval-header-filters-wrap">
            <div className="segmented-tab-filter">
              {["All", "Pending", "Hold"].map((f) => (
                <button key={f} className={filterStatus === f ? "active" : ""} onClick={() => setFilterStatus(f)} type="button">
                  {f === "Hold" ? "On Hold" : f}
                </button>
              ))}
            </div>
            <span className="queue-showing-results-text">Showing {getFilteredRequests().length} requests</span>
          </div>
        </div>

        <div className="table-wrap">
          <div className="table-responsive-wrapper">
<table className="approval-queue-table">
              <thead>
                <tr>
                  <th>SETTLEMENT ID</th>
                  <th>PARTNER</th>
                  <th>BANK NAME</th>
                  <th>BANK ACCOUNT</th>
                  <th>AMOUNT</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {getFilteredRequests().map((req) => {
                  const isDone = req.status === "Approved" || req.status === "Processed";
                  const isRejected = req.status === "Rejected";
                  return (
                    <tr key={req.id}>
                      <td><strong style={{ fontFamily: "var(--materio-space)", color: "#1e40af" }}>{req.id}</strong></td>
                      <td><strong>{req.partnerName}</strong></td>
                      <td>{req.bankName}</td>
                      <td><span className="acc-details-lbl">{req.accNo}</span></td>
                      <td><strong className="settlement-amount-lbl">&#8377;{req.amount}</strong></td>
                      <td><span className={`kyc-status-badge ${req.statusColor} status-cell-badge`}>{req.status}</span></td>
                      <td>
                        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                          <button type="button" title="Approve Settlement" style={actionBtn("#dcfce7", "#16a34a", "#bbf7d0", isDone)} disabled={isDone}
                            onClick={() => setModal({ title: "Approve Settlement", message: `Approve settlement ${req.id} for ${req.partnerName} (&#8377;${req.amount})?`, onConfirm: () => { updateStatus(req.id, "Approved"); toast(`Settlement ${req.id} approved!`); } })}>
                            <CheckCircle2 size={13} />
                          </button>
                          <button type="button" title="View Details" style={actionBtn("#eff6ff", "#3b82f6", "#bfdbfe", false)}
                            onClick={() => setModal({ title: `Settlement Details - ${req.id}`, details: { "Settlement ID": req.id, "Partner": req.partnerName, "Bank": req.bankName, "Account": req.accNo, "Amount": `&#8377;${req.amount}`, "Status": req.status } })}>
                            <Eye size={13} />
                          </button>
                          <button type="button" title="Reject Settlement" style={actionBtn("#fef2f2", "#ef4444", "#fecaca", isRejected)} disabled={isRejected}
                            onClick={() => setModal({ title: "Reject Settlement", message: `Are you sure you want to reject settlement ${req.id} for ${req.partnerName}? This cannot be undone.`, onConfirm: () => { updateStatus(req.id, "Rejected"); toast(`Settlement ${req.id} rejected.`); } })}>
                            <XCircle size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
</div>
        </div>

        <div className="directory-table-footer">
          <div className="rows-per-page-combo">
            <span>Rows per page:</span>
            <Select
              aria-label="Rows per page select"
              options={[{
                label: "10",
                value: "10"
              }, {
                label: "20",
                value: "20"
              }]} />
          </div>
          <div className="pagination-wrap">
            <button className="pag-nav-btn" type="button" disabled><ChevronLeft size={16} /></button>
            <button className="pag-num-btn active" type="button">1</button>
            <button className="pag-nav-btn" type="button" disabled><ChevronRight size={16} /></button>
          </div>
        </div>
      </section>
      <section className="panel queue-automation-big-panel" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", border: "1px solid #334155" }}>
        <div className="automation-panel-left-content">
          <h2>Automated Settlement Rules</h2>
          <p>Settlement requests from partners with high compliance status (<strong>&gt;90% KYC Score</strong>) and no outstanding security flags bypass standard manual hold reviews automatically.</p>
          <div className="rule-adjust-buttons-row" style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
            <button className="btn-configure-rules" type="button" style={{ background: "var(--primary)", color: "#fff" }}
              onClick={() => setModal({ title: "Modify Compliance Rule", message: "Update the KYC threshold for automatic settlement bypass. Current: 90% KYC Score. Confirm to open rule editor?", onConfirm: () => toast("Compliance rule saved successfully!") })}>
              Modify Compliance Rule
            </button>
            <button className="btn-configure-rules" type="button" style={{ background: "transparent", color: "#fff", border: "1px solid #475569" }}
              onClick={() => setModal({ title: "Configure Batch Payout Timing", message: "Current schedule: Daily at 18:00 UTC. Confirm to save new batch payout configuration?", onConfirm: () => toast("Batch payout timing saved!") })}>
              <Settings size={14} style={{ marginRight: "6px", display: "inline" }} />
              Configure Batch Payout Timing
            </button>
          </div>
        </div>
        <div className="automation-panel-right-illustration" style={{ background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <CreditCard size={80} style={{ color: "var(--primary-3)" }} />
        </div>
      </section>
    </AdminShell>
  );
}


