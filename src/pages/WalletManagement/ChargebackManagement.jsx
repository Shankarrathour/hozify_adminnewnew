import React, { useState } from "react";
import AdminShell from "../../components/layouts/AdminShell";
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Eye,
  Download,
  SlidersHorizontal,
  RefreshCw,
  Clock,
  TrendingUp,
  ShieldAlert,
  FileText,
} from "lucide-react";

const CHARGEBACK_DATA = [
  { id: "CB-88201", txnId: "#TXN-44291", customer: "Johnathan Doe", amount: 1240.00, reason: "Item not received", bank: "HDFC Bank", status: "Pending", statusColor: "amber", date: "2026-10-24", dueDate: "2026-11-03" },
  { id: "CB-88192", txnId: "#TXN-38821", customer: "Sarah McPhee", amount: 345.50, reason: "Duplicate transaction", bank: "ICICI Bank", status: "Under Review", statusColor: "blue", date: "2026-10-23", dueDate: "2026-11-02" },
  { id: "CB-88175", txnId: "#TXN-29901", customer: "Arthur Pendragon", amount: 8500.00, reason: "Unauthorized charge", bank: "Axis Bank", status: "Won", statusColor: "green", date: "2026-10-22", dueDate: "2026-10-29" },
  { id: "CB-88140", txnId: "#TXN-11882", customer: "Lois Lane", amount: 890.00, reason: "Service not as described", bank: "SBI", status: "Lost", statusColor: "red", date: "2026-10-20", dueDate: "2026-10-27" },
  { id: "CB-88131", txnId: "#TXN-09210", customer: "Bruce Wayne", amount: 4200.00, reason: "Credit card fraud", bank: "Kotak Bank", status: "Pending", statusColor: "amber", date: "2026-10-19", dueDate: "2026-10-29" },
];

const STATUS_COLORS = {
  amber: { bg: "#fffbeb", text: "#b45309", border: "#fde68a" },
  blue:  { bg: "#eff6ff", text: "#2563eb", border: "#bfdbfe" },
  green: { bg: "#ecfdf5", text: "#059669", border: "#a7f3d0" },
  red:   { bg: "#fef2f2", text: "#dc2626", border: "#fecaca" },
};

const KPI_CARDS = [
  { label: "Total Chargebacks", value: "142", sub: "+18 this month", subColor: "#dc2626", icon: AlertTriangle, iconBg: "#fef2f2", iconColor: "#dc2626" },
  { label: "Pending Review", value: "38", sub: "Requires action", subColor: "#b45309", icon: Clock, iconBg: "#fffbeb", iconColor: "#b45309" },
  { label: "Won Disputes", value: "74", sub: "52% win rate", subColor: "#059669", icon: CheckCircle2, iconBg: "#ecfdf5", iconColor: "#059669" },
  { label: "Total Value at Risk", value: "$84,320", sub: "Across all open cases", subColor: "#7c3aed", icon: ShieldAlert, iconBg: "#f5f3ff", iconColor: "#7c3aed" },
];

function Toast({ toasts }) {
  return (
    <div style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 10001, display: "flex", flexDirection: "column", gap: "8px" }}>
      {toasts.map(t => (
        <div key={t.id} style={{ background: "#1e293b", color: "#fff", padding: "10px 16px", borderRadius: "8px", fontSize: "13px", fontWeight: "600", boxShadow: "0 4px 16px rgba(0,0,0,0.2)", maxWidth: "320px" }}>{t.message}</div>
      ))}
    </div>
  );
}

function Modal({ modal, onClose }) {
  if (!modal) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#fff", borderRadius: "12px", padding: "28px 32px", maxWidth: "500px", width: "90%", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#1e293b", margin: 0 }}>{modal.title}</h3>
          <button onClick={onClose} style={{ border: "none", background: "transparent", cursor: "pointer", color: "#94a3b8", fontSize: "20px", lineHeight: 1 }}>&times;</button>
        </div>
        {modal.details && (
          <div style={{ background: "#f8fafc", borderRadius: "8px", padding: "14px 16px", marginBottom: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
            {Object.entries(modal.details).map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #e2e8f0", paddingBottom: "8px", fontSize: "13px" }}>
                <span style={{ fontWeight: "700", color: "#94a3b8", fontSize: "10px", textTransform: "uppercase" }}>{k}</span>
                <span style={{ fontWeight: "700", color: "#1e293b" }}>{v}</span>
              </div>
            ))}
          </div>
        )}
        {modal.message && <p style={{ fontSize: "13px", color: "#64748b", marginBottom: "20px" }}>{modal.message}</p>}
        <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{ padding: "8px 18px", borderRadius: "6px", border: "1px solid #e2e8f0", background: "#f8fafc", fontWeight: "600", fontSize: "13px", cursor: "pointer", color: "#475569" }}>
            {modal.onConfirm ? "Cancel" : "Close"}
          </button>
          {modal.onConfirm && (
            <button onClick={() => { modal.onConfirm(); onClose(); }} style={{ padding: "8px 18px", borderRadius: "6px", border: "none", background: "#1e1591", color: "#fff", fontWeight: "700", fontSize: "13px", cursor: "pointer" }}>
              Confirm
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ChargebackManagement() {
  const [chargebacks, setChargebacks] = useState(CHARGEBACK_DATA);
  const [filterStatus, setFilterStatus] = useState("All");
  const [toasts, setToasts] = useState([]);
  const [modal, setModal] = useState(null);

  const toast = (message) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  };

  const updateStatus = (id, newStatus, newColor) => {
    setChargebacks(prev => prev.map(c => c.id === id ? { ...c, status: newStatus, statusColor: newColor } : c));
  };

  const handleExportCSV = () => {
    const headers = ["Chargeback ID", "Transaction ID", "Customer", "Amount", "Reason", "Bank", "Status", "Date"];
    const rows = chargebacks.map(c => [c.id, c.txnId, c.customer, `$${c.amount.toFixed(2)}`, c.reason, c.bank, c.status, c.date]);
    const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Chargebacks_Export.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast("Chargebacks report exported successfully!");
  };

  const filtered = filterStatus === "All" ? chargebacks : chargebacks.filter(c => c.status === filterStatus);

  const actionBtnStyle = (bg, color, border, disabled) => ({
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
    transition: "all 0.15s",
  });

  return (
    <AdminShell
      activeTab="Chargebacks"
      searchPlaceholder="Search chargebacks by ID or customer..."
    >
      <Toast toasts={toasts} />
      <Modal modal={modal} onClose={() => setModal(null)} />

      <div style={{ display: "flex", flexDirection: "column", gap: 'var(--spacing-section)', padding: "24px 0" }}>

        {/* ── Page Header ── */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "16px" }}>
          <div>
            <span style={{ fontSize: "10px", fontWeight: "800", background: "#fef2f2", color: "#dc2626", padding: "3px 8px", borderRadius: "4px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              DISPUTE CENTER
            </span>
            <h1 style={{ fontSize: "22px", fontWeight: "800", color: "#1e293b", margin: "8px 0 4px" }}>Chargeback Management</h1>
            <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>Review, dispute, and resolve payment chargeback cases raised by customers or banks.</p>
          </div>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button
              onClick={() => { toast("Refreshing chargeback data..."); }}
              style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px", border: "1px solid #e2e8f0", borderRadius: "6px", background: "#fff", fontSize: "12px", fontWeight: "700", cursor: "pointer", color: "#475569" }}
            >
              <RefreshCw size={13} /> Refresh
            </button>
            <button
              onClick={handleExportCSV}
              style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px", border: "none", borderRadius: "6px", background: "#1e1591", color: "#fff", fontSize: "12px", fontWeight: "700", cursor: "pointer" }}
            >
              <Download size={13} /> Export CSV
            </button>
          </div>
        </div>

        {/* ── KPI Cards ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
          {KPI_CARDS.map(kpi => (
            <div key={kpi.label} style={{ background: "#fff", borderRadius: "10px", padding: "18px 20px", border: "1px solid #e2e8f0", boxShadow: "0 1px 4px rgba(0,0,0,0.05)", display: "flex", flexDirection: "column", gap: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <span style={{ fontSize: "10px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em" }}>{kpi.label}</span>
                <div style={{ background: kpi.iconBg, borderRadius: "6px", padding: "6px", display: "flex", alignItems: "center" }}>
                  <kpi.icon size={14} color={kpi.iconColor} />
                </div>
              </div>
              <span style={{ fontSize: "26px", fontWeight: "900", color: "#1e293b", lineHeight: 1 }}>{kpi.value}</span>
              <span style={{ fontSize: "11px", fontWeight: "600", color: kpi.subColor }}>{kpi.sub}</span>
            </div>
          ))}
        </div>

        {/* ── Chargeback Table ── */}
        <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
          {/* Table Header with Filters */}
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #f1f5f9", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
            <h2 style={{ fontSize: "14px", fontWeight: "800", color: "#1e293b", margin: 0 }}>Chargeback Cases</h2>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
              {/* Status filter tabs */}
              <div style={{ display: "flex", gap: "4px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "3px" }}>
                {["All", "Pending", "Under Review", "Won", "Lost"].map(s => (
                  <button
                    key={s}
                    onClick={() => { setFilterStatus(s); toast(`Filter: ${s}`); }}
                    style={{ padding: "5px 10px", borderRadius: "4px", border: "none", fontSize: "11px", fontWeight: "700", cursor: "pointer", background: filterStatus === s ? "#1e1591" : "transparent", color: filterStatus === s ? "#fff" : "#64748b", transition: "all 0.15s" }}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <span style={{ fontSize: "12px", color: "#94a3b8", fontWeight: "600" }}>{filtered.length} cases</span>
            </div>
          </div>

          {/* Table */}
          <div style={{ overflowY: 'auto', maxHeight: '400px' }}>
            <div className="table-responsive-wrapper">
<table style={{ width: "100%", borderCollapse: 'collapse', fontSize: "13px" }}>
              <thead>
                <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                  {["CASE ID", "TXN ID", "CUSTOMER", "AMOUNT", "REASON", "BANK", "STATUS", "DUE DATE", "ACTIONS"].map(h => (
                    <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: "10px", fontWeight: "800", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(cb => {
                  const sc = STATUS_COLORS[cb.statusColor] || STATUS_COLORS.amber;
                  const isResolved = cb.status === "Won" || cb.status === "Lost";
                  return (
                    <tr key={cb.id} style={{ borderBottom: "1px solid #f1f5f9", transition: "background 0.12s" }} onMouseEnter={e => e.currentTarget.style.background = "#f8fafc"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                      <td style={{ padding: "14px 16px", fontWeight: "800", color: "#1e40af", fontFamily: "var(--materio-space)", whiteSpace: "nowrap" }}>{cb.id}</td>
                      <td style={{ padding: "14px 16px", fontFamily: "var(--materio-space)", color: "#64748b", fontSize: "12px", whiteSpace: "nowrap" }}>{cb.txnId}</td>
                      <td style={{ padding: "14px 16px", fontWeight: "700", color: "#1e293b", whiteSpace: "nowrap" }}>{cb.customer}</td>
                      <td style={{ padding: "14px 16px", fontWeight: "800", color: "#1e293b", whiteSpace: "nowrap" }}>${cb.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                      <td style={{ padding: "14px 16px", color: "#64748b", maxWidth: "180px" }}>{cb.reason}</td>
                      <td style={{ padding: "14px 16px", color: "#64748b", whiteSpace: "nowrap" }}>{cb.bank}</td>
                      <td style={{ padding: "14px 16px" }}>
                        <span style={{ fontSize: "10px", fontWeight: "800", background: sc.bg, color: sc.text, border: `1px solid ${sc.border}`, padding: "3px 8px", borderRadius: "4px", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                          {cb.status}
                        </span>
                      </td>
                      <td style={{ padding: "14px 16px", fontSize: "12px", color: "#64748b", whiteSpace: "nowrap" }}>{cb.dueDate}</td>
                      <td style={{ padding: "14px 16px" }}>
                        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                          {/* Eye - View Details */}
                          <button
                            title="View Chargeback Details"
                            style={actionBtnStyle("#eff6ff", "#3b82f6", "#bfdbfe", false)}
                            onClick={() => setModal({
                              title: `Chargeback Details — ${cb.id}`,
                              details: {
                                "Case ID": cb.id,
                                "Transaction ID": cb.txnId,
                                "Customer": cb.customer,
                                "Amount": `$${cb.amount.toFixed(2)}`,
                                "Reason": cb.reason,
                                "Bank": cb.bank,
                                "Status": cb.status,
                                "Filed On": cb.date,
                                "Due Date": cb.dueDate,
                              }
                            })}
                          >
                            <Eye size={13} />
                          </button>

                          {/* Approve/Accept */}
                          <button
                            title="Accept Chargeback (Mark Won)"
                            style={actionBtnStyle("#ecfdf5", "#059669", "#a7f3d0", isResolved)}
                            disabled={isResolved}
                            onClick={() => setModal({
                              title: "Accept Chargeback",
                              message: `Mark chargeback ${cb.id} for ${cb.customer} ($${cb.amount.toFixed(2)}) as Won? This will initiate the refund process.`,
                              onConfirm: () => { updateStatus(cb.id, "Won", "green"); toast(`Chargeback ${cb.id} marked as Won!`); }
                            })}
                          >
                            <CheckCircle2 size={13} />
                          </button>

                          {/* Dispute / Reject */}
                          <button
                            title="Dispute / Reject Chargeback"
                            style={actionBtnStyle("#fef2f2", "#dc2626", "#fecaca", isResolved)}
                            disabled={isResolved}
                            onClick={() => setModal({
                              title: "Dispute Chargeback",
                              message: `File a dispute against chargeback ${cb.id} for ${cb.customer} ($${cb.amount.toFixed(2)})? This will submit evidence to the bank.`,
                              onConfirm: () => { updateStatus(cb.id, "Lost", "red"); toast(`Dispute filed for chargeback ${cb.id}. Bank notified.`); }
                            })}
                          >
                            <XCircle size={13} />
                          </button>

                          {/* File Report */}
                          <button
                            title="Generate Case Report"
                            style={actionBtnStyle("#f5f3ff", "#7c3aed", "#ddd6fe", false)}
                            onClick={() => { toast(`Case report for ${cb.id} generated and ready to download!`); }}
                          >
                            <FileText size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan="9" style={{ padding: "40px", textAlign: "center", color: "#94a3b8", fontWeight: "700" }}>
                      No chargeback cases match the selected filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
</div>
          </div>

          {/* Table Footer */}
          <div style={{ padding: "12px 20px", background: "#f8fafc", borderTop: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "12px", color: "#94a3b8", fontWeight: "600" }}>Showing {filtered.length} of {chargebacks.length} cases</span>
            <div style={{ display: "flex", gap: "4px" }}>
              <button style={{ padding: "5px 10px", border: "1px solid #e2e8f0", borderRadius: "4px", background: "#fff", fontSize: "12px", cursor: "pointer", color: "#94a3b8" }}>‹</button>
              <button style={{ padding: "5px 10px", border: "none", borderRadius: "4px", background: "#1e1591", color: "#fff", fontSize: "12px", cursor: "pointer", fontWeight: "700" }}>1</button>
              <button style={{ padding: "5px 10px", border: "1px solid #e2e8f0", borderRadius: "4px", background: "#fff", fontSize: "12px", cursor: "pointer", color: "#94a3b8" }}>›</button>
            </div>
          </div>
        </div>

        {/* ── Summary Banner ── */}
        <div style={{ background: "linear-gradient(135deg, #1e1591 0%, #312e81 100%)", borderRadius: "12px", padding: "24px 28px", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "20px" }}>
          <div>
            <h3 style={{ color: "#fff", fontSize: "15px", fontWeight: "800", margin: "0 0 6px" }}>Automated Chargeback Rules</h3>
            <p style={{ color: "#a5b4fc", fontSize: "13px", margin: 0 }}>Cases under $500 with verified delivery proof are automatically disputed. Configure thresholds below.</p>
          </div>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button
              onClick={() => setModal({ title: "Configure Auto-Dispute Rules", message: "Current rule: Auto-dispute all chargebacks under $500 with tracking proof. Confirm to open the rule editor?", onConfirm: () => toast("Auto-dispute rule editor opened. Changes saved!") })}
              style={{ padding: "9px 18px", borderRadius: "6px", border: "none", background: "#fff", color: "#1e1591", fontSize: "12px", fontWeight: "800", cursor: "pointer" }}
            >
              Configure Rules
            </button>
            <button
              onClick={() => setModal({ title: "Run Bulk Dispute", message: "This will automatically file disputes for all 38 pending chargeback cases under the current rule set. Proceed?", onConfirm: () => toast("Bulk dispute filed for 38 pending cases!") })}
              style={{ padding: "9px 18px", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.3)", background: "transparent", color: "#fff", fontSize: "12px", fontWeight: "800", cursor: "pointer" }}
            >
              Run Bulk Dispute
            </button>
          </div>
        </div>

      </div>
    </AdminShell>
  );
}
