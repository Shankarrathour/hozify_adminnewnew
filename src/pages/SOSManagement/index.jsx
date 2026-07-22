import React, { useMemo, useState } from "react";
import {
  Activity,
  AlertOctagon,
  AlertTriangle,
  Ambulance,
  BarChart3,
  Bell,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  Edit3,
  Eye,
  FileText,
  Filter,
  Flame,
  Gauge,
  MapPin,
  MessageSquare,
  Phone,
  Plus,
  Radio,
  RefreshCcw,
  Search,
  Send,
  Settings,
  ShieldAlert,
  ShieldCheck,
  Siren,
  Target,
  Trash2,
  UserCheck,
  Users,
  X,
} from "lucide-react";
import AdminShell from "../../components/layouts/AdminShell";
import { useApp } from "../../hooks/useApp";
import { ROUTES } from "../../config/routes";
import { useToast } from "../../components/common/ToastNotification";
import Select from "../../components/ui/Select";
import {
  audits,
  categories,
  communications,
  contacts,
  escalations,
  fraudAlerts,
  incidentReports,
  responders,
  sosCases,
  timeline,
  vehicles,
} from "./data";

const routeMeta = {
  [ROUTES.sos]: [
    "dashboard",
    "SOS Command Center",
    "Real-time emergency performance and incident response metrics.",
  ],
  [ROUTES.sosDashboard]: [
    "dashboard",
    "SOS Command Center",
    "Real-time emergency performance and incident response metrics.",
  ],
  [ROUTES.sosActive]: [
    "active",
    "Active SOS Queue",
    "Tactical triage console for live emergency requests.",
  ],
  [ROUTES.sosDetails]: [
    "details",
    "SOS Details",
    "Critical incident overview and response workspace.",
  ],
  [ROUTES.sosDispatch]: [
    "dispatch",
    "Emergency Dispatch Center",
    "Assign responders, vehicles, and partner resources.",
  ],
  [ROUTES.sosResolved]: [
    "resolution",
    "Resolution Center",
    "Capture closure notes and finalize SOS outcomes.",
  ],
  [ROUTES.sosTracking]: [
    "tracking",
    "Live SOS Tracking",
    "Monitor user location, route, responder ETA, and incident zone.",
  ],
  [ROUTES.sosResponseQueue]: [
    "responseQueue",
    "Emergency Response Queue",
    "Track responder assignments and action status.",
  ],
  [ROUTES.sosCategories]: [
    "categories",
    "Incident Categories",
    "Manage emergency taxonomy and SLA expectations.",
  ],
  [ROUTES.sosEscalated]: [
    "escalations",
    "Escalation Center",
    "Active triage and strategic response for high-priority incidents.",
  ],
  [ROUTES.sosContacts]: [
    "contacts",
    "Emergency Contact Management",
    "Verify family, authority, and company contacts.",
  ],
  [ROUTES.sosCommunication]: [
    "communication",
    "Emergency Communication Center",
    "Coordinate voice, SMS, WhatsApp, push, and email messaging.",
  ],
  [ROUTES.sosResources]: [
    "resources",
    "Emergency Resource Management",
    "Manage vehicles, teams, operations staff, and agencies.",
  ],
  [ROUTES.sosInvestigationCenter]: [
    "investigationCenter",
    "Incident Investigation Center",
    "Post-incident evidence review and root cause analysis.",
  ],
  [ROUTES.sosHeatmap]: [
    "heatmap",
    "Emergency Heatmap",
    "High-risk areas, density patterns, and time-based analytics.",
  ],
  [ROUTES.sosIncidentReports]: [
    "reportsListing",
    "Incident Reports Listing",
    "Review generated emergency reports and exports.",
  ],
  [ROUTES.sosIncidentReportDetails]: [
    "reportDetails",
    "Incident Report Details",
    "Evidence, resolution, and corrective action summary.",
  ],
  [ROUTES.sosResolution]: [
    "resolution",
    "Resolution Center",
    "Capture closure notes and finalize SOS outcomes.",
  ],
  [ROUTES.sosPerformance]: [
    "performance",
    "Response Performance Dashboard",
    "Team performance, response speed, and service levels.",
  ],
  [ROUTES.sosAnalytics]: [
    "analytics",
    "Emergency Analytics",
    "Category, response, escalation, and risk analysis.",
  ],
  [ROUTES.sosFraud]: [
    "fraud",
    "SOS Fraud Detection",
    "Identify false alarms, spoofing, and abnormal usage patterns.",
  ],
  [ROUTES.sosInvestigation]: [
    "investigation",
    "SOS Investigation",
    "Investigate suspicious users, evidence, and location verification.",
  ],
  [ROUTES.sosReports]: [
    "reports",
    "Emergency Reports",
    "Generate operational, incident, response, and escalation reports.",
  ],
  [ROUTES.sosSettings]: [
    "settings",
    "Emergency Settings",
    "Configure timeouts, escalation rules, dispatch logic, and communications.",
  ],
  [ROUTES.sosAuthority]: [
    "authority",
    "Authority Integration Center",
    "Police, ambulance, fire, and security agency integrations.",
  ],
  [ROUTES.sosAudit]: [
    "audit",
    "Emergency Audit Center",
    "Dispatch, communication, escalation, and resolution logs.",
  ],
  [ROUTES.sosCommandCenter]: [
    "command",
    "Emergency Command Center",
    "Dense real-time command workspace for emergency operations.",
  ],
};

function metaFor(route) {
  return routeMeta[route] || routeMeta[ROUTES.sos];
}

function Button({ children, icon: Icon, primary, danger, ghost, onClick }) {
  return (
    <button
      className={`sos-btn ${primary ? "primary" : ""} ${danger ? "danger" : ""} ${ghost ? "ghost" : ""}`}
      type="button"
      onClick={onClick}
    >
      {Icon && <Icon size={16} />}
      {children}
    </button>
  );
}

function Badge({ children, tone }) {
  const key = String(tone || children)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");
  return <span className={`sos-badge ${key}`}>{children}</span>;
}

function Card({ children, className = "" }) {
  return <article className={`sos-card ${className}`}>{children}</article>;
}

function Kpi({ label, value, note, icon: Icon, danger }) {
  return (
    <Card className="sos-kpi">
      <div className="sos-kpi-top">
        <span>{label}</span>
        {Icon && <Icon size={20} />}
      </div>
      <strong>{value}</strong>
      {note && <small className={danger ? "danger" : ""}>{note}</small>}
      <i />
    </Card>
  );
}

function MiniBars({ values = [28, 38, 52, 44, 62, 76, 68] }) {
  return (
    <div className="sos-bars">
      {values.map((value, index) => (
        <span key={index} style={{ height: `${value}%` }} />
      ))}
    </div>
  );
}

function LineChart() {
  return (
    <div className="sos-line-chart">
      <svg viewBox="0 0 600 260" role="img" aria-label="SOS trend chart">
        <path
          d="M20 215 L90 185 L150 198 L220 150 L280 172 L350 96 L420 126 L500 70 L580 88"
          className="line-a"
        />
        <path
          d="M20 230 L90 205 L150 214 L220 180 L280 198 L350 130 L420 156 L500 104 L580 118"
          className="line-b"
        />
      </svg>
      <div className="sos-axis">
        <span>08:00</span>
        <span>10:00</span>
        <span>12:00</span>
        <span>14:00</span>
        <span>16:00</span>
        <span>18:00</span>
        <span>20:00</span>
      </div>
    </div>
  );
}

function Donut({ value = 72, label = "Resolved" }) {
  return (
    <div className="sos-donut" style={{ "--value": `${value * 3.6}deg` }}>
      <strong>{value}%</strong>
      <span>{label}</span>
    </div>
  );
}

function MapPanel({ full }) {
  const { addToast } = useToast();
  const [zoom, setZoom] = useState(1);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.5, 0.5));
  };

  return (
    <div className={`sos-map ${full ? "full" : ""}`} style={{ overflow: "hidden", position: "relative" }}>
      <div style={{ transform: `scale(${zoom})`, transformOrigin: "center center", transition: "transform 0.3s ease", width: "100%", height: "100%", position: "absolute", inset: 0 }}>
        <div className="sos-map-grid" />
        <span className="pin critical" style={{ left: "48%", top: "42%" }} />
        <span className="pin safe" style={{ left: "35%", top: "62%" }} />
        <span className="pin responder" style={{ left: "72%", top: "54%" }} />
      </div>
      <div className="sos-map-label" style={{ zIndex: 10 }}>Incident Zone</div>
      <div className="sos-map-actions" style={{ zIndex: 10 }}>
        <button onClick={handleZoomIn}>+</button>
        <button onClick={handleZoomOut}>-</button>
      </div>
    </div>
  );
}

function Table({ columns, rows, actions, selectable, disableWrapper }) {
  const content = (
    <table className="sos-table">
      <thead>
        <tr>
          {selectable && (
            <th>
              <input type="checkbox" />
            </th>
          )}
          {columns.map((col) => (
            <th key={col.key}>{col.label}</th>
          ))}
          {actions && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id}>
            {selectable && (
              <td>
                <input type="checkbox" />
              </td>
            )}
            {columns.map((col) => (
              <td key={col.key}>
                {col.render ? col.render(row) : row[col.key]}
              </td>
            ))}
            {actions && (
              <td>
                <div className="sos-row-actions">{actions(row)}</div>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );

  if (disableWrapper) return content;

  return (
    <div className="sos-table-wrap">
      {content}
    </div>
  );
}

function Filters({ children, onApply, onRefresh }) {
  const defaultOptions = {
    "Priority Level": ["All", "Critical", "High", "Medium", "Low"],
    "Incident Type": [
      "All",
      "Medical Emergency",
      "Theft / Security",
      "Fire Hazard",
      "Road Accident",
    ],
    Status: ["All", "Pending", "Dispatched", "On-Site", "Escalated"],
    "City / Region": [
      "Global View",
      "New York",
      "London",
      "Tokyo",
      "Sydney",
    ],
    Date: ["All Time", "Today", "Last 7 Days", "Last 30 Days", "This Month"],
  };

  const [filterValues, setFilterValues] = useState({});

  return (
    <div className="sos-filters">
      {children ||
        Object.entries(defaultOptions).map(([label, options]) => (
          <label key={label}>
            {label}
            <Select
              value={filterValues[label] || (label === "City / Region" ? "Global View" : label === "Date" ? "All Time" : "All")}
              onChange={(e) => setFilterValues(prev => ({ ...prev, [label]: e.target.value }))}
              options={options.map((opt) => ({ value: opt, label: opt }))}
            />
          </label>
        ))}
      <Button primary onClick={() => { if(onApply) onApply(filterValues); }}>
        Apply Filter
      </Button>
      <Button icon={RefreshCcw} ghost onClick={() => {
        setFilterValues({});
        if(onRefresh) onRefresh();
      }} />
    </div>
  );
}

function CaseIdentity({ item }) {
  return (
    <div className="sos-identity">
      <span>{item.avatar}</span>
      <div>
        <b>{item.user}</b>
        <small>{item.id}</small>
      </div>
    </div>
  );
}

function SosCaseTable({ nav, setDrawer, setModal, rows }) {
  return (
    <Table
      columns={[
        {
          key: "id",
          label: "SOS ID",
          render: (row) => <b className="sos-link">{row.id}</b>,
        },
        {
          key: "user",
          label: "User",
          render: (row) => <CaseIdentity item={row} />,
        },
        { key: "type", label: "Incident Type" },
        { key: "location", label: "Location" },
        {
          key: "priority",
          label: "Priority",
          render: (row) => <Badge tone={row.priority}>{row.priority}</Badge>,
        },
        {
          key: "status",
          label: "Status",
          render: (row) => <Badge tone={row.status}>{row.status}</Badge>,
        },
        { key: "created", label: "Created" },
      ]}
      rows={rows || sosCases}
      actions={(row) => (
        <>
          <button onClick={() => nav(ROUTES.sosDetails)}>
            <Eye size={17} />
          </button>
          <button onClick={() => nav(ROUTES.sosTracking)}>
            <Target size={17} />
          </button>
          <button
            onClick={() =>
              setModal({ type: "dispatch", title: `Dispatch ${row.id}` })
            }
          >
            Dispatch
          </button>
          <button
            onClick={() => setDrawer({ type: "tracking", title: row.id })}
          >
            Live
          </button>
        </>
      )}
    />
  );
}

function Timeline({ items = timeline }) {
  return (
    <div className="sos-timeline">
      {items.map((item, index) => (
        <div key={item}>
          <span>{index + 1}</span>
          <b>{item}</b>
          <small>
            {index < 2 ? "Completed" : index === 2 ? "In progress" : "Pending"}
          </small>
        </div>
      ))}
    </div>
  );
}

function Dashboard({ nav, setModal }) {
  const { addToast } = useToast();
  return (
    <>
      <div className="sos-page-toolbar">
        <div />
        <div>
          <Button
            icon={Filter}
            onClick={() => addToast("Filters Applied", "success")}
          >
            Filter View
          </Button>
          <Button
            primary
            icon={Download}
            onClick={() =>
              setModal({ type: "export", title: "Export SOS Dashboard" })
            }
          >
            Export Report
          </Button>
        </div>
      </div>
      <section className="sos-kpi-grid six">
        <Kpi
          label="Active SOS"
          value="12"
          note="+4 this hour"
          icon={AlertOctagon}
          danger
        />
        <Kpi
          label="Resolved SOS"
          value="142"
          note="98.2% rate"
          icon={CheckCircle2}
        />
        <Kpi
          label="Escalated SOS"
          value="03"
          note="Stable vs last 24h"
          icon={AlertTriangle}
        />
        <Kpi
          label="Critical Emergencies"
          value="08"
          note="Immediate action"
          icon={Siren}
          danger
        />
        <Kpi
          label="Avg. Response Time"
          value="1.4m"
          note="-12s improved"
          icon={Clock}
        />
        <Kpi
          label="Avg. Resolution Time"
          value="14.5m"
          note="Target: 15.0m"
          icon={RefreshCcw}
        />
      </section>
      <section className="sos-layout">
        <div className="sos-stack">
          <Card>
            <div className="sos-card-head">
              <div>
                <h3>SOS Trends</h3>
                <p>Hourly incident frequency vs. response velocity</p>
              </div>
              <span className="legend">Incidents • Resolved</span>
            </div>
            <LineChart />
          </Card>
          <Card>
            <div className="sos-card-head">
              <h3>Active Emergencies</h3>
              <Badge tone="Critical">Live Feed</Badge>
            </div>
            <SosCaseTable nav={nav} setModal={setModal} setDrawer={() => {}} />
          </Card>
        </div>
        <div className="sos-stack">
          <Card>
            <h3>Incident Categories</h3>
            <Donut value={65} label="Medical" />
            <ul className="sos-list">
              <li>
                Medical Emergencies <b>45%</b>
              </li>
              <li>
                Security Alerts <b>30%</b>
              </li>
              <li>
                Fire Hazards <b>15%</b>
              </li>
              <li>
                Others <b>10%</b>
              </li>
            </ul>
          </Card>
          <Card>
            <h3>Emergency Heatmap</h3>
            <MapPanel />
            <Button ghost onClick={() => nav(ROUTES.sosHeatmap)}>
              Open Heatmap
            </Button>
          </Card>
          <Card>
            <h3>Live Dispatch Feed</h3>
            <Timeline
              items={[
                "Dispatch Unit #42 Assigned",
                "Automated Check-in Successful",
                "Priority 1 Triggered",
              ]}
            />
          </Card>
        </div>
      </section>
    </>
  );
}

function ActiveQueue({ nav, setModal, setDrawer }) {
  const { addToast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState({});
  
  const allCases = useMemo(() => {
    let arr = [];
    for (let i = 0; i < 11; i++) {
      arr = arr.concat(
        sosCases.map((c) => ({ ...c, id: `${c.id}-${i}` }))
      );
    }
    return arr.slice(0, 42);
  }, []);

  const filteredCases = useMemo(() => {
    return allCases.filter(c => {
      if (activeFilters["Priority Level"] && activeFilters["Priority Level"] !== "All" && c.priority !== activeFilters["Priority Level"]) return false;
      if (activeFilters["Incident Type"] && activeFilters["Incident Type"] !== "All" && c.type !== activeFilters["Incident Type"]) return false;
      if (activeFilters["Status"] && activeFilters["Status"] !== "All" && c.status !== activeFilters["Status"]) return false;
      if (activeFilters["City / Region"] && activeFilters["City / Region"] !== "Global View" && activeFilters["City / Region"] !== "All") {
        if (!c.location.includes(activeFilters["City / Region"]) && !c.city.includes(activeFilters["City / Region"])) return false;
      }
      return true;
    });
  }, [allCases, activeFilters]);

  const paginatedCases = filteredCases.slice(
    (currentPage - 1) * 10,
    currentPage * 10
  );

  return (
    <>
      <div className="sos-page-toolbar" style={{ justifyContent: "flex-end" }}>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <Button
            icon={Download}
            onClick={() =>
              setModal({ type: "export", title: "Export Active SOS Log" })
            }
          >
            Export Log
          </Button>
          <Button
            primary
            icon={Siren}
            onClick={() =>
              setModal({ type: "create", title: "Create Manual SOS" })
            }
          >
            Manual SOS
          </Button>
        </div>
      </div>
      <Filters
        onRefresh={() => {
          setActiveFilters({});
          setCurrentPage(1);
          addToast("Queue Refreshed", "success");
        }}
        onApply={(filters) => {
          setActiveFilters(filters);
          setCurrentPage(1);
          addToast("Filters Applied", "success");
        }}
      />
      <div style={{
        background: "#fff",
        border: "1px solid #cbc9da",
        borderRadius: "8px",
        boxShadow: "0 1px 2px rgba(15,23,42,0.08)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}>
        <div className="sos-table-wrap" style={{ maxHeight: "450px" }}>
          <SosCaseTable nav={nav} setModal={setModal} setDrawer={setDrawer} rows={paginatedCases} disableWrapper />
        </div>
        <div className="sos-pagination" style={{ borderTop: "1px solid #e5e7eb", padding: "14px 20px" }}>
          <span>
            Showing {filteredCases.length === 0 ? 0 : (currentPage - 1) * 10 + 1}–{Math.min(currentPage * 10, filteredCases.length)} of {filteredCases.length} active incidents
          </span>
          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            {Array.from({ length: Math.max(1, Math.ceil(filteredCases.length / 10)) }).map((_, idx) => {
              const page = idx + 1;
              return page === currentPage ? (
                <b key={page} style={{
                  background: "#28118c", color: "#fff",
                  borderRadius: "5px", padding: "4px 10px",
                  fontSize: "14px"
                }}>{page}</b>
              ) : (
                <span
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  style={{
                    cursor: "pointer", borderRadius: "5px",
                    padding: "4px 10px", fontSize: "14px",
                    border: "1px solid #e5e7eb", color: "#374151"
                  }}
                >
                  {page}
                </span>
              );
            })}
          </div>
        </div>
      </div>
      <section className="sos-layout">
        <Card>
          <div className="sos-card-head">
            <div>
              <h3>Live Incident Mapping</h3>
              <p>Global hotspots and response density</p>
            </div>
            <Button ghost onClick={() => nav(ROUTES.sosTracking)}>
              Expand Full Map
            </Button>
          </div>
          <MapPanel />
        </Card>
        <Card className="sos-dark">
          <h3>Response Efficiency</h3>
          <p>Avg. Dispatch Time</p>
          <strong>1m 14s</strong>
          <small>8% faster than last hour</small>
          <Button danger onClick={() => nav(ROUTES.sosEscalated)}>
            1 Critical Pending
          </Button>
          <Button
            onClick={() =>
              setModal({
                type: "optimization",
                title: "Response Optimization Report",
              })
            }
          >
            View Optimization Report
          </Button>
        </Card>
      </section>
    </>
  );
}

function Details({ setModal, setDrawer, nav }) {
  const { addToast } = useToast();
  const [tab, setTab] = useState("Overview");
  const tabs = [
    "Overview",
    "Location",
    "Response Team",
    "Incident Report",
    "Communications",
    "Timeline",
    "Audit Logs",
  ];
  const active = sosCases[0];
  return (
    <>
      <Card className="sos-summary">
        <span className="sos-logo">SOS</span>
        <div>
          <small>SOS ID: {active.id}</small>
          <h2>{active.user}</h2>
        </div>
        <div>
          <small>Emergency Type</small>
          <b>{active.type}</b>
        </div>
        <div>
          <small>Status</small>
          <b>{active.status}</b>
        </div>
        <div>
          <small>Location</small>
          <b>{active.location}</b>
        </div>
        <div>
          <small>Duration</small>
          <b>00:14:23</b>
        </div>
        <Button
          primary
          icon={Phone}
          onClick={() =>
            setDrawer({
              type: "communication",
              title: "Emergency Communication",
            })
          }
        >
          Establish Link
        </Button>
        <Button
          onClick={() => setModal({ type: "dispatch", title: "Deploy Backup" })}
        >
          Deploy Backup
        </Button>
      </Card>
      <div className="sos-tabs">
        {tabs.map((item) => (
          <button
            className={tab === item ? "active" : ""}
            key={item}
            onClick={() => setTab(item)}
          >
            {item}
          </button>
        ))}
      </div>
      {tab === "Overview" && (
        <section className="sos-three">
          <Card>
            <h3>Identity & Booking</h3>
            <CaseIdentity item={active} />
            <ul className="sos-list">
              <li>
                Active Booking <b>BK-8842-NY</b>
              </li>
              <li>
                Check-in <b>Oct 24, 14:00</b>
              </li>
              <li>
                Device Battery <b className="danger">14%</b>
              </li>
            </ul>
          </Card>
          <Card>
            <h3>Risk Assessment</h3>
            <div className="sos-alert-box">
              Threat Level: High <strong>8.4 / 10</strong>
            </div>
            <p>
              System detected sudden deceleration followed by rapid horizontal
              movement.
            </p>
          </Card>
          <Card className="sos-dark">
            <h3>Executive Summary</h3>
            <p>
              SOS triggered via rapid tap gesture. Dispatch 4 has arrived at
              scene. No verbal confirmation yet.
            </p>
            <Button
              primary
              icon={ShieldCheck}
              onClick={() =>
                setModal({ type: "resolution", title: "Resolve Incident" })
              }
            >
              Resolve Incident
            </Button>
            <Button
              icon={Download}
              onClick={() =>
                setModal({ type: "export", title: "Export Legal Package" })
              }
            >
              Export Legal Package
            </Button>
          </Card>
        </section>
      )}
      {tab === "Location" && (
        <section className="sos-layout">
          <Card>
            <MapPanel full />
          </Card>
          <Card>
            <h3>Live Coordinates</h3>
            <p>40.7580 N, 73.9855 W</p>
            <p>Times Square, Manhattan, NY</p>
            <p>Movement: Stationary since 14:18</p>
            <h3>Nearby Resources</h3>
            {responders.slice(0, 3).map((r) => (
              <ResourceRow key={r.name} item={r} setModal={setModal} />
            ))}
          </Card>
        </section>
      )}
      {tab === "Response Team" && (
        <Card>
          <h3>Assigned Team</h3>
          {responders.map((r) => (
            <ResourceRow key={r.name} item={r} setModal={setModal} />
          ))}
          <Timeline
            items={[
              "Assigned",
              "Departed",
              "On Site",
              "Safety Check",
              "Clearance",
            ]}
          />
        </Card>
      )}
      {tab === "Incident Report" && (
        <InvestigationWorkspace compact setModal={setModal} />
      )}
      {tab === "Communications" && (
        <CommunicationCenter setDrawer={setDrawer} />
      )}
      {tab === "Timeline" && (
        <Card>
          <Timeline />
        </Card>
      )}
      {tab === "Audit Logs" && <AuditCenter compact setModal={setModal} />}
      <section className="sos-layout">
        <Card>
          <h3>Live Comms Log</h3>
          {communications.slice(0, 3).map((c) => (
            <div className="sos-message" key={c.time}>
              <b>{c.recipient}</b>
              <p>{c.message}</p>
              <small>{c.time}</small>
            </div>
          ))}
          <div className="sos-input-row">
            <input placeholder="Type message to responders..." />
            <Button
              primary
              icon={Send}
              onClick={() => addToast("Message Sent", "success")}
            />
          </div>
        </Card>
        <Card>
          <h3>High-Res Location</h3>
          <MapPanel />
        </Card>
      </section>
    </>
  );
}

function DispatchCenter({ setModal }) {
  return (
    <section className="sos-dispatch-grid">
      <Card>
        <div className="sos-card-head">
          <h3>Available Responders</h3>
          <Badge>24 Active</Badge>
        </div>
        {responders.map((r) => (
          <ResourceRow key={r.name} item={r} setModal={setModal} />
        ))}
        <Button
          primary
          icon={Plus}
          onClick={() =>
            setModal({ type: "resource", title: "Add External Partner" })
          }
        >
          Add External Partner
        </Button>
      </Card>
      <Card>
        <div className="sos-map-hero">
          <Badge tone="Critical">Active Incident: Fire Sector B</Badge>
          <MapPanel full />
        </div>
      </Card>
      <Card>
        <h3>Fleet & Logistics</h3>
        {vehicles.map((v) => (
          <div className="sos-resource-line" key={v.name}>
            <b>{v.name}</b>
            <span>{v.status}</span>
            <small>
              {v.location} • {v.capacity}
            </small>
          </div>
        ))}
      </Card>
      <Card className="sos-dark wide">
        <h2>Emergency Assignment Panel</h2>
        <p>Pending request: Sector B - fire and medical assistance required.</p>
        <div className="sos-action-split">
          <Button
            danger
            icon={AlertTriangle}
            onClick={() =>
              setModal({ type: "escalation", title: "Escalate to Regional" })
            }
          >
            Escalate to Regional
          </Button>
          <Button
            primary
            icon={Send}
            onClick={() =>
              setModal({ type: "resource", title: "Assign All Ready Units" })
            }
          >
            Assign All Ready Units
          </Button>
        </div>
      </Card>
    </section>
  );
}

function LiveTracking({ setDrawer }) {
  return (
    <section className="sos-tracking-page">
      <MapPanel full />
      <Card className="sos-tracking-card">
        <h3>Tracking Drawer</h3>
        <CaseIdentity item={sosCases[0]} />
        <ul className="sos-list">
          <li>
            Responder <b>Unit 21-A</b>
          </li>
          <li>
            Status <b>En Route</b>
          </li>
          <li>
            ETA <b>04:12</b>
          </li>
          <li>
            Distance <b>1.8 km</b>
          </li>
          <li>
            Incident Type <b>Medical Emergency</b>
          </li>
        </ul>
        <Button
          primary
          onClick={() =>
            setDrawer({ type: "tracking", title: "Live Tracking Updates" })
          }
        >
          Open Tracking Drawer
        </Button>
      </Card>
    </section>
  );
}

function ResponseQueue({ setModal, nav }) {
  return (
    <>
      <section className="sos-kpi-grid four">
        <Kpi label="Pending Responses" value="18" icon={Clock} />
        <Kpi label="Active Responses" value="32" icon={Ambulance} />
        <Kpi label="Completed Responses" value="142" icon={CheckCircle2} />
        <Kpi
          label="Escalated Responses"
          value="05"
          icon={AlertTriangle}
          danger
        />
      </section>
      <Card>
        <Table
          columns={[
            { key: "id", label: "SOS ID" },
            { key: "responder", label: "Responder" },
            {
              key: "status",
              label: "Status",
              render: (r) => <Badge tone={r.status}>{r.status}</Badge>,
            },
            { key: "eta", label: "ETA" },
            {
              key: "priority",
              label: "Priority",
              render: (r) => <Badge tone={r.priority}>{r.priority}</Badge>,
            },
          ]}
          rows={sosCases}
          actions={() => (
            <>
              <button onClick={() => nav(ROUTES.sosDetails)}>View</button>
              <button onClick={() => nav(ROUTES.sosTracking)}>Track</button>
              <button
                onClick={() =>
                  setModal({ type: "dispatch", title: "Reassign Responder" })
                }
              >
                Reassign
              </button>
              <button
                onClick={() =>
                  setModal({ type: "escalation", title: "Escalate Response" })
                }
              >
                Escalate
              </button>
            </>
          )}
        />
      </Card>
    </>
  );
}

function CategoryManagement({ setModal }) {
  return (
    <>
      <div className="sos-page-toolbar">
        <div />
        <Button
          primary
          icon={Plus}
          onClick={() =>
            setModal({ type: "category", title: "Add Incident Category" })
          }
        >
          Add Category
        </Button>
      </div>
      <section className="sos-card-grid">
        {categories.map((item) => (
          <Card key={item.id}>
            <div className="sos-card-head">
              <h3>{item.name}</h3>
              <Badge tone={item.active ? "Active" : "Closed"}>
                {item.active ? "Active" : "Inactive"}
              </Badge>
            </div>
            <p>SLA target: {item.sla}</p>
            <p>{item.cases} cases this month</p>
            <div className="sos-row-actions">
              <button
                onClick={() =>
                  setModal({ type: "category", title: `Edit ${item.name}` })
                }
              >
                <Edit3 size={16} />
              </button>
              <button
                onClick={() =>
                  setModal({ type: "confirm", title: `Delete ${item.name}` })
                }
              >
                <Trash2 size={16} />
              </button>
            </div>
          </Card>
        ))}
      </section>
    </>
  );
}

function EscalationCenter({ setModal }) {
  return (
    <>
      <section className="sos-kpi-grid four">
        <Kpi label="Level 1" value="14 Cases" note="Active" />
        <Kpi label="Level 2" value="08 Cases" note="Triage" />
        <Kpi label="Level 3" value="03 Cases" note="High" danger />
        <Kpi label="Critical" value="01 Case" note="SLA overdue" danger />
      </section>
      <section className="sos-layout">
        <Card>
          <h3>Open Escalations</h3>
          {escalations.map((e) => (
            <div className="sos-escalation-card" key={e.id}>
              <Badge tone={e.level}>{e.level}</Badge>
              <h3>{e.title}</h3>
              <p>{e.note}</p>
              <small>
                Assigned: {e.owner} • {e.elapsed}
              </small>
              <button
                onClick={() => setModal({ type: "escalation", title: e.title })}
              >
                Details
              </button>
            </div>
          ))}
        </Card>
        <Card>
          <div className="sos-alert-header">
            <AlertTriangle />
            <div>
              <h2>CRITICAL: Site-42 Reactor</h2>
              <Badge tone="Critical">SLA Overdue</Badge>
            </div>
            <strong>01:42:15</strong>
          </div>
          <Timeline
            items={[
              "System Auto-Escalation",
              "Dispatcher Triage",
              "Critical Upgrade",
            ]}
          />
          <div className="sos-action-panel">
            <b>Manager Intervention Required</b>
            <Button
              onClick={() =>
                setModal({ type: "rejectPlan", title: "Reject Response Plan" })
              }
            >
              Reject Plan
            </Button>
            <Button
              danger
              icon={ShieldCheck}
              onClick={() =>
                setModal({
                  type: "authorizeProtocol",
                  title: "Authorize Safety Protocol",
                })
              }
            >
              Authorize Protocol
            </Button>
          </div>
        </Card>
      </section>
    </>
  );
}

function Contacts({ setModal }) {
  return (
    <>
      <div className="sos-page-toolbar">
        <div />
        <Button
          primary
          icon={Plus}
          onClick={() =>
            setModal({ type: "contact", title: "Add Emergency Contact" })
          }
        >
          Add Contact
        </Button>
      </div>
      <Card>
        <Table
          columns={[
            { key: "name", label: "Name" },
            {
              key: "type",
              label: "Type",
              render: (r) => <Badge>{r.type}</Badge>,
            },
            { key: "phone", label: "Phone" },
            { key: "relation", label: "Relation / Department" },
            {
              key: "status",
              label: "Verification",
              render: (r) => <Badge tone={r.status}>{r.status}</Badge>,
            },
          ]}
          rows={contacts.map((c, i) => ({ ...c, id: c.name + i }))}
          actions={(row) => (
            <>
              <button
                onClick={() =>
                  setModal({ type: "contact", title: `Edit ${row.name}` })
                }
              >
                Edit
              </button>
              <button
                onClick={() =>
                  setModal({ type: "confirm", title: `Verify ${row.name}` })
                }
              >
                Verify
              </button>
            </>
          )}
        />
      </Card>
    </>
  );
}

function CommunicationCenter({ setDrawer }) {
  const { addToast } = useToast();
  return (
    <section className="sos-layout">
      <Card>
        <h3>Channel Selection</h3>
        <div className="sos-card-grid compact">
          {["Phone Call", "SMS", "WhatsApp", "Push Notification", "Email"].map(
            (c) => (
              <button
                className="sos-channel"
                key={c}
                onClick={() => addToast(`${c} Channel Selected`, "info")}
              >
                <MessageSquare size={18} />
                {c}
              </button>
            ),
          )}
        </div>
        <label>
          Template
          <Select
            options={[{
              label: "SOS Triggered",
              value: "SOS Triggered"
            }, {
              label: "Responder Assigned",
              value: "Responder Assigned"
            }, {
              label: "Incident Resolved",
              value: "Incident Resolved"
            }]} />
        </label>
        <label>
          Recipient
          <Select
            options={[{
              label: "Responder HQ",
              value: "Responder HQ"
            }, {
              label: "Emergency Contact",
              value: "Emergency Contact"
            }, {
              label: "Public Broadcast",
              value: "Public Broadcast"
            }]} />
        </label>
        <textarea
          placeholder="Message preview..."
          defaultValue="CRITICAL: SOS signal detected at [Location]. Stay on the line."
        />
        <Button
          primary
          icon={Send}
          onClick={() =>
            setDrawer({ type: "communication", title: "Communication Drawer" })
          }
        >
          Send Message
        </Button>
      </Card>
      <Card>
        <h3>Communication History</h3>
        {communications.map((c) => (
          <div className="sos-message" key={c.time}>
            <b>
              {c.channel} • {c.recipient}
            </b>
            <p>{c.message}</p>
            <Badge tone={c.status}>{c.status}</Badge>
          </div>
        ))}
      </Card>
    </section>
  );
}

function ResourceManagement({ setModal }) {
  const { addToast } = useToast();
  const rows = [
    ...responders.map((r, i) => ({
      ...r,
      id: `R-${i}`,
      category: r.type,
      capacity: r.load,
      assignment: i === 1 ? "SOS-9819" : "None",
    })),
    ...vehicles.map((v, i) => ({
      ...v,
      id: `V-${i}`,
      category: "Vehicle",
      distance: v.location,
      eta: "-",
      load: v.capacity,
      contact: "Ops Net",
    })),
  ];
  return (
    <>
      <div className="sos-page-toolbar">
        <div />
        <Button
          primary
          icon={Plus}
          onClick={() => setModal({ type: "resource", title: "Add Resource" })}
        >
          Add Resource
        </Button>
      </div>
      <Card>
        <Table
          columns={[
            { key: "name", label: "Resource" },
            { key: "category", label: "Type" },
            {
              key: "status",
              label: "Availability",
              render: (r) => <Badge tone={r.status}>{r.status}</Badge>,
            },
            { key: "distance", label: "Location / Distance" },
            { key: "load", label: "Capacity" },
            { key: "contact", label: "Contact" },
            { key: "assignment", label: "Current Assignment" },
          ]}
          rows={rows}
          actions={() => (
            <>
              <button
                onClick={() =>
                  setModal({ type: "resource", title: "Edit Resource" })
                }
              >
                Edit
              </button>
              <button
                onClick={() =>
                  setModal({ type: "dispatch", title: "Assign Resource" })
                }
              >
                Assign
              </button>
              <button onClick={() => addToast("Resource Disabled", "success")}>
                Disable
              </button>
            </>
          )}
        />
      </Card>
    </>
  );
}

function InvestigationWorkspace({ setModal, compact }) {
  return (
    <section className={compact ? "sos-layout" : "sos-investigation-grid"}>
      <Card>
        <div className="sos-card-head">
          <h3>Evidence Review</h3>
          <span>
            <Badge>Photos (4)</Badge> <Badge>Videos (1)</Badge>{" "}
            <Badge>Logs (12)</Badge>
          </span>
        </div>
        <div className="sos-evidence">
          <div className="large">CAM-04 | 22:14:02</div>
          <div>Spark footage</div>
          <div>Room capture</div>
          <div>Audio Log: Responder B</div>
        </div>
      </Card>
      <Card>
        <h3>Timeline Reconstruction</h3>
        <Timeline
          items={["SOS Triggered", "Dispatch Acknowledged", "On-Site Arrival"]}
        />
      </Card>
      <Card>
        <h3>Root Cause Analysis</h3>
        <label>
          Primary Failure Point
          <Select
            options={[{
              label: "Unauthorized Physical Access",
              value: "Unauthorized Physical Access"
            }]} />
        </label>
        <textarea placeholder="Enter findings..." />
        <label>
          <input type="checkbox" /> Flag for Executive Safety Review
        </label>
        <Button
          primary
          icon={CheckCircle2}
          onClick={() =>
            setModal({ type: "success", title: "Investigation Completed" })
          }
        >
          Mark Completed
        </Button>
      </Card>
      <Card>
        <h3>Witness Information</h3>
        {["Officer John Doe", "Sarah Miller"].map((name) => (
          <div className="sos-identity" key={name}>
            <span>
              {name
                .split(" ")
                .map((p) => p[0])
                .join("")
                .slice(0, 2)}
            </span>
            <div>
              <b>{name}</b>
              <small>Statement attached</small>
            </div>
          </div>
        ))}
        <Button ghost icon={Plus}>
          Add Witness Statement
        </Button>
      </Card>
    </section>
  );
}

function Heatmap({ setModal }) {
  const { addToast } = useToast();
  return (
    <section className="sos-heatmap-page">
      <MapPanel full />
      <Card className="sos-floating-panel">
        <h3>Spatial Analytics</h3>
        <label>
          City
          <Select
            options={[{
              label: "Metropolitan Area",
              value: "Metropolitan Area"
            }]} />
        </label>
        <label>
          Date
          <Select
            options={[{
              label: "Last 24h",
              value: "Last 24h"
            }]} />
        </label>
        <label>
          Category
          <Select
            options={[{
              label: "All Categories",
              value: "All Categories"
            }]} />
        </label>
        <div className="sos-choice active">Accidents</div>
        <div className="sos-choice active">Security Threats</div>
        <h3>High-Risk Sectors</h3>
        <p className="sos-danger">Sector 7-G critical frequency +42%</p>
        <p className="sos-info">Harbor District rising anomalies</p>
      </Card>
      <Card className="sos-map-legend">
        <h3>Density Summary</h3>
        <p>2.4k monthly incidents</p>
        <p>Response time 4.2m</p>
        <p>Safety index 84/100</p>
        <Button
          icon={Download}
          onClick={() =>
            setModal({ type: "export", title: "Export Full Heatmap Report" })
          }
        >
          Export Full Report
        </Button>
      </Card>
    </section>
  );
}

function ReportsListing({ nav, setModal }) {
  return (
    <>
      <Filters
        onRefresh={() =>
          setModal({ type: "success", title: "Reports Refreshed" })
        }
        onApply={() => setModal({ type: "success", title: "Filters Applied" })}
      >
        <label>
          Status
          <Select
            options={[{
              label: "All Statuses",
              value: "All Statuses"
            }, {
              label: "Active",
              value: "Active"
            }, {
              label: "Resolved",
              value: "Resolved"
            }, {
              label: "Escalated",
              value: "Escalated"
            }]} />
        </label>
        <label>
          Category
          <Select
            options={[{
              label: "All Categories",
              value: "All Categories"
            }, {
              label: "Medical",
              value: "Medical"
            }, {
              label: "Security",
              value: "Security"
            }, {
              label: "Fire",
              value: "Fire"
            }]} />
        </label>
        <label>
          Date
          <Select
            options={[{
              label: "Last 30 Days",
              value: "Last 30 Days"
            }, {
              label: "Last 7 Days",
              value: "Last 7 Days"
            }, {
              label: "Today",
              value: "Today"
            }]} />
        </label>
      </Filters>
      <Card className="has-table">
        <div
          style={{
            overflowY: 'auto', maxHeight: '400px',
            width: "100%",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "thin",
            scrollbarColor: "#cbd0d9 #f4f5f7",
          }}
        >
          <Table
            columns={[
              { key: "id", label: "Incident ID" },
              { key: "sos", label: "SOS ID" },
              { key: "category", label: "Category" },
              {
                key: "status",
                label: "Status",
                render: (r) => <Badge tone={r.status}>{r.status}</Badge>,
              },
              { key: "date", label: "Created Date" },
            ]}
            rows={incidentReports}
            disableWrapper
            actions={() => (
              <>
                <button onClick={() => nav(ROUTES.sosIncidentReportDetails)}>
                  View
                </button>
                <button
                  onClick={() =>
                    setModal({ type: "export", title: "Export Incident Report" })
                  }
                >
                  Export
                </button>
              </>
            )}
          />
        </div>
      </Card>
    </>
  );
}

function ReportDetails({ setModal }) {
  const { addToast } = useToast();
  return (
    <section className="sos-layout">
      <div className="sos-stack">
        <Card>
          <h3>Incident Summary</h3>
          <p>
            SOS-9821 medical emergency confirmed with responder arrival inside
            SLA.
          </p>
          <Badge tone="Under Investigation">Under Investigation</Badge>
        </Card>
        <InvestigationWorkspace compact setModal={setModal} />
      </div>
      <Card>
        <h3>Resolution</h3>
        <p>Responder stabilized subject and notified emergency contact.</p>
        <h3>Corrective Actions</h3>
        <Timeline
          items={[
            "Review device battery warning",
            "Update responder route rule",
            "Attach evidence package",
          ]}
        />
        <h3>Attachments</h3>
        {["cam04_clip.mp4", "medical_notes.pdf", "audit_log.csv"].map(
          (file) => (
            <div
              className="sos-doc"
              key={file}
              onClick={() => addToast(`Downloaded ${file}`, "success")}
              style={{ cursor: "pointer" }}
            >
              {file}
              <Download size={16} />
            </div>
          ),
        )}
        <Button
          primary
          icon={Download}
          onClick={() =>
            setModal({ type: "export", title: "Download Full Report" })
          }
        >
          Download Report
        </Button>
      </Card>
    </section>
  );
}

function ResolutionCenter({ setModal }) {
  const { addToast } = useToast();
  return (
    <section className="sos-layout">
      <Card className="form">
        <h3>Resolution Notes</h3>
        <label>
          Resolution Type
          <Select
            options={[{
              label: "Resolved",
              value: "Resolved"
            }, {
              label: "False Alarm",
              value: "False Alarm"
            }, {
              label: "Escalated",
              value: "Escalated"
            }, {
              label: "Closed",
              value: "Closed"
            }]} />
        </label>
        <textarea placeholder="Closure notes..." />
        <textarea placeholder="Corrective action..." />
        <div className="sos-actions">
          <Button onClick={() => addToast("Resolution Notes Saved", "success")}>
            Save Resolution
          </Button>
          <Button
            primary
            icon={CheckCircle2}
            onClick={() => setModal({ type: "confirm", title: "Close SOS" })}
          >
            Close SOS
          </Button>
          <Button
            danger
            icon={AlertTriangle}
            onClick={() =>
              setModal({ type: "escalation", title: "Escalate SOS" })
            }
          >
            Escalate
          </Button>
        </div>
      </Card>
      <Card>
        <h3>Closure Report Preview</h3>
        <p>SOS-9821 • Medical Emergency • Resolved</p>
        <Timeline
          items={[
            "Closure notes captured",
            "Evidence verified",
            "Emergency contact notified",
            "Ready for close",
          ]}
        />
      </Card>
    </section>
  );
}

function PerformanceDashboard() {
  return (
    <>
      <section className="sos-kpi-grid four">
        <Kpi label="Average Response Time" value="1.4m" icon={Clock} />
        <Kpi label="Fastest Response" value="38s" icon={Gauge} />
        <Kpi
          label="Slowest Response"
          value="9.8m"
          icon={AlertTriangle}
          danger
        />
        <Kpi label="Team Performance" value="94%" icon={Users} />
      </section>
      <section className="sos-layout">
        <Card>
          <h3>Response Trends</h3>
          <LineChart />
        </Card>
        <Card>
          <h3>Team Efficiency</h3>
          <Donut value={82} label="On-time" />
        </Card>
      </section>
      <Card>
        <h3>Team Ranking</h3>
        <Table
          columns={[
            { key: "name", label: "Team" },
            {
              key: "status",
              label: "Status",
              render: (r) => <Badge tone={r.status}>{r.status}</Badge>,
            },
            { key: "eta", label: "Avg ETA" },
            { key: "load", label: "Load" },
          ]}
          rows={responders.map((r, i) => ({ ...r, id: r.name + i }))}
        />
      </Card>
    </>
  );
}

function Analytics() {
  return (
    <>
      <Filters>
        <label>
          Date
          <Select
            options={[{
              label: "Last 30 Days",
              value: "Last 30 Days"
            }, {
              label: "Last 7 Days",
              value: "Last 7 Days"
            }, {
              label: "Today",
              value: "Today"
            }]} />
        </label>
        <label>
          City
          <Select
            options={[{
              label: "Global",
              value: "Global"
            }, {
              label: "New York",
              value: "New York"
            }, {
              label: "Los Angeles",
              value: "Los Angeles"
            }]} />
        </label>
        <label>
          Category
          <Select
            options={[{
              label: "All",
              value: "All"
            }, {
              label: "Medical",
              value: "Medical"
            }, {
              label: "Security",
              value: "Security"
            }]} />
        </label>
        <label>
          Priority
          <Select
            options={[{
              label: "All",
              value: "All"
            }, {
              label: "Critical",
              value: "Critical"
            }, {
              label: "High",
              value: "High"
            }]} />
        </label>
      </Filters>
      <section className="sos-kpi-grid four">
        <Kpi label="Response Rates" value="96%" />
        <Kpi label="Resolution Rates" value="91%" />
        <Kpi label="Escalation Trends" value="-8%" />
        <Kpi label="Risk Analysis" value="Low" />
      </section>
      <section className="sos-layout">
        <Card>
          <h3>Emergency Categories</h3>
          <MiniBars />
        </Card>
        <Card>
          <h3>Risk Analysis</h3>
          <Donut value={74} label="Stable" />
        </Card>
      </section>
    </>
  );
}

function FraudDetection({ setModal, setDrawer }) {
  return (
    <>
      <section className="sos-kpi-grid four">
        <Kpi label="Repeated False Alarms" value="12" danger />
        <Kpi label="Abnormal Usage" value="08" />
        <Kpi label="Location Spoofing" value="03" danger />
        <Kpi label="Average Risk Score" value="42" />
      </section>
      <Card>
        <Table
          columns={[
            { key: "id", label: "Case ID" },
            { key: "user", label: "User" },
            { key: "indicator", label: "Indicator" },
            { key: "score", label: "Risk Score" },
            {
              key: "status",
              label: "Status",
              render: (r) => <Badge tone={r.status}>{r.status}</Badge>,
            },
          ]}
          rows={fraudAlerts}
          actions={(row) => (
            <>
              <button
                onClick={() =>
                  setDrawer({ type: "investigation", title: row.id })
                }
              >
                Investigate
              </button>
              <button
                onClick={() =>
                  setModal({ type: "fraud", title: `Blacklist ${row.user}` })
                }
              >
                Blacklist
              </button>
              <button
                onClick={() =>
                  setModal({ type: "confirm", title: `Mark ${row.user} Safe` })
                }
              >
                Mark Safe
              </button>
            </>
          )}
        />
      </Card>
    </>
  );
}

function SosInvestigation({ setModal }) {
  return (
    <section className="sos-layout">
      <div className="sos-stack">
        <Card>
          <h3>User History</h3>
          <CaseIdentity item={sosCases[2]} />
          <p>Member since Jan 2023 • 4 previous SOS records</p>
        </Card>
        <Card>
          <h3>Previous SOS Records</h3>
          <Table
            columns={[
              { key: "id", label: "SOS ID" },
              { key: "type", label: "Type" },
              {
                key: "status",
                label: "Status",
                render: (r) => <Badge tone={r.status}>{r.status}</Badge>,
              },
            ]}
            rows={sosCases}
          />
        </Card>
      </div>
      <Card>
        <h3>Location Verification</h3>
        <MapPanel />
        <p className="sos-success">
          GPS, IP region, and device telemetry aligned.
        </p>
        <h3>Evidence Analysis</h3>
        <p>No image tampering detected. Audio metadata valid.</p>
        <textarea placeholder="Investigation notes..." />
        <Button
          primary
          onClick={() =>
            setModal({ type: "confirm", title: "Approve SOS Investigation" })
          }
        >
          Approve
        </Button>
        <Button
          danger
          onClick={() => setModal({ type: "fraud", title: "Blacklist User" })}
        >
          Blacklist
        </Button>
      </Card>
    </section>
  );
}

function EmergencyReports({ setModal }) {
  const { addToast } = useToast();
  const reportTypes = [
    "SOS Report",
    "Incident Report",
    "Response Time Report",
    "Escalation Report",
    "Resource Utilization Report",
  ];
  return (
    <section className="sos-layout">
      <div className="sos-stack">
        <Card>
          <h3>Reports</h3>
          <div className="sos-card-grid compact">
            {reportTypes.map((r) => (
              <button
                className="sos-channel"
                key={r}
                onClick={() => addToast(`${r} Selected`, "info")}
              >
                <FileText size={18} />
                {r}
              </button>
            ))}
          </div>
        </Card>
        <Filters
          onRefresh={() =>
            setModal({
              type: "success",
              title: "Emergency Reports Data Refreshed",
            })
          }
          onApply={() =>
            setModal({ type: "success", title: "Filters Applied" })
          }
        >
          <label>
            Date
            <Select
              options={[{
                label: "Last 30 Days",
                value: "Last 30 Days"
              }, {
                label: "Last 7 Days",
                value: "Last 7 Days"
              }, {
                label: "Today",
                value: "Today"
              }]} />
          </label>
          <label>
            Incident Type
            <Select
              options={[{
                label: "All",
                value: "All"
              }, {
                label: "Medical",
                value: "Medical"
              }, {
                label: "Security",
                value: "Security"
              }]} />
          </label>
          <label>
            City
            <Select
              options={[{
                label: "All Cities",
                value: "All Cities"
              }, {
                label: "New York",
                value: "New York"
              }, {
                label: "Los Angeles",
                value: "Los Angeles"
              }]} />
          </label>
          <label>
            Status
            <Select
              options={[{
                label: "All",
                value: "All"
              }, {
                label: "Active",
                value: "Active"
              }, {
                label: "Resolved",
                value: "Resolved"
              }]} />
          </label>
        </Filters>
        <Card>
          <h3>Recent Exports</h3>
          <div style={{
            overflowY: 'auto', maxHeight: '400px',
            overflowY: "auto",
            margin: "12px -24px 0",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "thin",
          }}>
            <Table
              columns={[
                { key: "id", label: "Report ID" },
                { key: "sos", label: "SOS ID" },
                { key: "category", label: "Category" },
                { key: "date", label: "Date" },
                {
                  key: "status",
                  label: "Status",
                  render: (r) => <Badge tone={r.status}>{r.status}</Badge>,
                },
              ]}
              rows={incidentReports}
              disableWrapper
            />
          </div>
        </Card>
      </div>
      <Card>
        <h3>Generate Export</h3>
        <div className="sos-choice active">PDF</div>
        <div className="sos-choice">Excel</div>
        <div className="sos-choice">CSV</div>
        <Button
          primary
          icon={Download}
          onClick={() =>
            setModal({ type: "export", title: "Generate Emergency Report" })
          }
        >
          Export
        </Button>
      </Card>
    </section>
  );
}

function SettingsPage({ setModal }) {
  const { addToast } = useToast();
  return (
    <section className="sos-layout">
      <div className="sos-stack">
        <Card>
          <h3>SOS Timeout</h3>
          <label>
            Critical timeout
            <input defaultValue="5 minutes" />
          </label>
          <label>
            Auto close after
            <input defaultValue="24 hours" />
          </label>
        </Card>
        <Card>
          <h3>Escalation Rules</h3>
          <div className="sos-choice active">Level 1: Dispatch Lead</div>
          <div className="sos-choice">Level 2: Operations Manager</div>
          <div className="sos-choice">Critical: Executive Command</div>
        </Card>
        <Card>
          <h3>Dispatch & Priority Rules</h3>
          <label>
            <input type="checkbox" defaultChecked /> Auto-assign nearest ready
            unit
          </label>
          <label>
            <input type="checkbox" defaultChecked /> Critical alerts override
            queue order
          </label>
        </Card>
      </div>
      <Card>
        <h3>Communication Rules</h3>
        <label>
          <input type="checkbox" defaultChecked /> SMS fallback after voice
          failure
        </label>
        <label>
          <input type="checkbox" defaultChecked /> Notify emergency contact
          after 2 minutes
        </label>
        <label>
          <input type="checkbox" /> Require manager signoff for external
          authority contact
        </label>
        <div className="sos-actions">
          <Button onClick={() => addToast("Settings Reset", "info")}>
            Reset
          </Button>
          <Button
            primary
            onClick={() =>
              setModal({ type: "success", title: "Settings Saved" })
            }
          >
            Save Configuration
          </Button>
        </div>
      </Card>
    </section>
  );
}

function AuthorityIntegration({ setModal }) {
  const agencies = [
    "Police",
    "Ambulance",
    "Fire Department",
    "Security Agency",
  ];
  return (
    <>
      <section className="sos-card-grid">
        {agencies.map((a, i) => (
          <Card key={a}>
            <div className="sos-card-head">
              <h3>{a}</h3>
              <Badge tone={i === 3 ? "Pending" : "Verified"}>
                {i === 3 ? "Limited" : "Connected"}
              </Badge>
            </div>
            <p>API Status: {i === 3 ? "Manual fallback" : "Operational"}</p>
            <Button
              onClick={() =>
                setModal({ type: "confirm", title: `Test ${a} Connection` })
              }
            >
              Test Connection
            </Button>
            <Button
              ghost
              onClick={() =>
                setModal({ type: "contact", title: `Update ${a} Contact` })
              }
            >
              Update Contact
            </Button>
          </Card>
        ))}
      </section>
      <Card>
        <h3>Emergency Contacts</h3>
        <Table
          columns={[
            { key: "name", label: "Agency Contact" },
            { key: "type", label: "Type" },
            { key: "phone", label: "Number" },
            {
              key: "status",
              label: "Status",
              render: (r) => <Badge tone={r.status}>{r.status}</Badge>,
            },
          ]}
          rows={contacts.map((c, i) => ({ ...c, id: c.name + i }))}
          actions={(row) => (
            <button
              onClick={() =>
                setModal({ type: "contact", title: `Edit ${row.name}` })
              }
            >
              Edit
            </button>
          )}
        />
      </Card>
    </>
  );
}

function AuditCenter({ compact, setModal }) {
  return (
    <Card>
      <Filters
        onRefresh={
          setModal
            ? () => setModal({ type: "success", title: "Audit Logs Refreshed" })
            : undefined
        }
        onApply={
          setModal
            ? () => setModal({ type: "success", title: "Filters Applied" })
            : undefined
        }
      >
        <label>
          Action Type
          <Select
            options={[{
              label: "All Actions",
              value: "All Actions"
            }, {
              label: "Dispatch",
              value: "Dispatch"
            }, {
              label: "Escalation",
              value: "Escalation"
            }, {
              label: "Resolution",
              value: "Resolution"
            }]} />
        </label>
        <label>
          Admin
          <Select
            options={[{
              label: "All Admins",
              value: "All Admins"
            }, {
              label: "Alex Mercer",
              value: "Alex Mercer"
            }, {
              label: "Sarah Connor",
              value: "Sarah Connor"
            }]} />
        </label>
        <label>
          Date
          <Select
            options={[{
              label: "Today",
              value: "Today"
            }, {
              label: "Yesterday",
              value: "Yesterday"
            }, {
              label: "Last 7 Days",
              value: "Last 7 Days"
            }]} />
        </label>
        <label>
          SOS ID
          <input placeholder="SOS ID" />
        </label>
      </Filters>
      <Table
        columns={[
          { key: "id", label: "Log ID" },
          { key: "action", label: "Action" },
          { key: "admin", label: "Admin" },
          { key: "date", label: "Date" },
          { key: "sos", label: "SOS ID" },
          { key: "device", label: "IP / Device" },
        ]}
        rows={compact ? audits.slice(0, 2) : audits}
        actions={() => (
          <button
            onClick={() =>
              setModal({ type: "export", title: "Export Audit Log" })
            }
          >
            Export
          </button>
        )}
      />
    </Card>
  );
}

function CommandCenter({ nav, setModal }) {
  return (
    <section className="sos-command-grid">
      <Card className="sos-dark">
        <h3>Active SOS</h3>
        <strong>12</strong>
        <p>4 critical • 8 high</p>
      </Card>
      <Card className="map-widget">
        <h3>Live Map</h3>
        <MapPanel full />
      </Card>
      <Card>
        <h3>Emergency Queue</h3>
        {sosCases.slice(0, 3).map((c) => (
          <div className="sos-mini-case" key={c.id}>
            <Badge tone={c.priority}>{c.priority}</Badge>
            <b>{c.id}</b>
            <span>{c.type}</span>
          </div>
        ))}
      </Card>
      <Card>
        <h3>Dispatch Board</h3>
        {responders.slice(0, 3).map((r) => (
          <ResourceRow item={r} key={r.name} setModal={setModal} />
        ))}
      </Card>
      <Card>
        <h3>Escalation Board</h3>
        {escalations.map((e) => (
          <p key={e.id}>
            <b>{e.level}</b> {e.title}
          </p>
        ))}
      </Card>
      <Card>
        <h3>Response Analytics</h3>
        <Donut value={88} label="Velocity" />
      </Card>
      <Card>
        <h3>Incident Feed</h3>
        <Timeline
          items={[
            "SOS-9821 triggered",
            "Unit 21-A dispatched",
            "Critical case escalated",
          ]}
        />
      </Card>
      <Card className="sos-dark">
        <h3>Real-Time Alerts</h3>
        <p>Battery low on SOS-9821</p>
        <p>Escalation SLA risk detected</p>
        <div className="sos-actions">
          <Button
            primary
            icon={Plus}
            onClick={() => setModal({ type: "create", title: "Create SOS" })}
          >
            Create SOS
          </Button>
          <Button
            icon={Ambulance}
            onClick={() =>
              setModal({ type: "dispatch", title: "Dispatch Team" })
            }
          >
            Dispatch Team
          </Button>
          <Button
            danger
            icon={AlertTriangle}
            onClick={() => setModal({ type: "escalation", title: "Escalate" })}
          >
            Escalate
          </Button>
          <Button
            icon={MessageSquare}
            onClick={() => nav(ROUTES.sosCommunication)}
          >
            Send Communication
          </Button>
          <Button icon={FileText} onClick={() => nav(ROUTES.sosReports)}>
            Generate Report
          </Button>
        </div>
      </Card>
    </section>
  );
}

function ResourceRow({ item, setModal }) {
  return (
    <div className="sos-resource-row">
      <div>
        <b>{item.name}</b>
        <small>
          {item.type || item.location} • {item.distance || item.capacity}
        </small>
      </div>
      <Badge tone={item.status}>{item.status}</Badge>
      <Button
        ghost
        onClick={() =>
          setModal({ type: "resource", title: `Assign ${item.name}` })
        }
      >
        Assign
      </Button>
    </div>
  );
}

function GenericModal({ modal, close }) {
  const { addToast } = useToast();
  if (!modal) return null;
  const fields = {
    create: [
      "User",
      "Emergency Type",
      "Priority",
      "Location",
      "Assign Initial Team",
    ],
    dispatch: [
      "SOS ID",
      "Responder / Team",
      "Vehicle",
      "ETA",
      "Dispatch Notes",
    ],
    escalation: ["Escalation Level", "Reason", "Assign Team", "Notes"],
    contact: [
      "Name",
      "Contact Type",
      "Phone",
      "Relation / Department",
      "Verification Status",
    ],
    category: ["Category Name", "SLA Target", "Status", "Description"],
    resolution: [
      "Resolution Type",
      "Closure Notes",
      "Corrective Action",
      "Final Status",
    ],
    export: ["Report Type", "Date Range", "Format", "Recipients"],
    fraud: [
      "Risk Indicators",
      "False Alarm Count",
      "Location Spoofing Result",
      "Risk Score",
    ],
    resource: [
      "Available Responder",
      "Nearby Team",
      "Vehicle",
      "Assignment Notes",
    ],
    confirm: ["Audit Note"],
    archive: ["Archive Reason", "Confirm (Yes/No)"],
    optimization: ["Report ID", "Optimization Metrics", "Focus Areas", "Notes"],
    rejectPlan: ["Rejection Reason", "Alternative Proposal Notes"],
    authorizeProtocol: ["Security Authorization Key", "Action Notes"],
    success: [],
  }[modal.type] || ["Notes"];

  const handleSave = () => {
    addToast(`${modal.title} completed!`, "success");
    close();
  };

  return (
    <div className="sos-modal-backdrop">
      <div className="sos-modal">
        <button className="sos-close" onClick={close}>
          <X size={18} />
        </button>
        <h2>{modal.title}</h2>
        {fields.length === 0 ? (
          <p className="sos-success">Action completed successfully.</p>
        ) : (
          fields.map((field) =>
            field.includes("Notes") ||
            field.includes("Reason") ||
            field.includes("Description") ? (
              <label key={field}>
                {field}
                <textarea />
              </label>
            ) : (
              <label key={field}>
                {field}
                <input />
              </label>
            ),
          )
        )}
        <div className="sos-actions">
          <Button onClick={close}>Cancel</Button>
          <Button primary onClick={handleSave}>
            {modal.type === "confirm" ? "Confirm" : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}

function Drawer({ drawer, close }) {
  if (!drawer) return null;
  return (
    <div className="sos-drawer">
      <button className="sos-close" onClick={close}>
        <X size={18} />
      </button>
      <h2>{drawer.title}</h2>
      {drawer.type === "tracking" && (
        <>
          <MapPanel />
          <ul className="sos-list">
            <li>
              User Location <b>Times Square</b>
            </li>
            <li>
              Responder Location <b>7th Ave</b>
            </li>
            <li>
              ETA <b>04:12</b>
            </li>
            <li>
              Distance <b>1.8 km</b>
            </li>
          </ul>
        </>
      )}
      {drawer.type === "communication" && (
        <CommunicationCenter setDrawer={() => {}} />
      )}
      {drawer.type === "investigation" && (
        <>
          <h3>User History</h3>
          <p>3 false alarm flags, 1 verified incident, no active blacklist.</p>
          <Donut value={82} label="Risk" />
          <textarea placeholder="Action notes..." />
        </>
      )}
      <Button primary onClick={close}>
        Done
      </Button>
    </div>
  );
}

function renderScreen(screen, helpers) {
  const { nav, setModal, setDrawer } = helpers;
  switch (screen) {
    case "dashboard":
      return <Dashboard {...helpers} />;
    case "active":
      return <ActiveQueue {...helpers} />;
    case "details":
      return <Details {...helpers} />;
    case "dispatch":
      return <DispatchCenter {...helpers} />;
    case "tracking":
      return <LiveTracking {...helpers} />;
    case "responseQueue":
      return <ResponseQueue {...helpers} />;
    case "categories":
      return <CategoryManagement {...helpers} />;
    case "escalations":
      return <EscalationCenter {...helpers} />;
    case "contacts":
      return <Contacts {...helpers} />;
    case "communication":
      return <CommunicationCenter {...helpers} />;
    case "resources":
      return <ResourceManagement {...helpers} />;
    case "investigationCenter":
      return <InvestigationWorkspace {...helpers} />;
    case "heatmap":
      return <Heatmap {...helpers} />;
    case "reportsListing":
      return <ReportsListing {...helpers} />;
    case "reportDetails":
      return <ReportDetails {...helpers} />;
    case "resolution":
      return <ResolutionCenter {...helpers} />;
    case "performance":
      return <PerformanceDashboard {...helpers} />;
    case "analytics":
      return <Analytics {...helpers} />;
    case "fraud":
      return <FraudDetection {...helpers} />;
    case "investigation":
      return <SosInvestigation {...helpers} />;
    case "reports":
      return <EmergencyReports {...helpers} />;
    case "settings":
      return <SettingsPage {...helpers} />;
    case "authority":
      return <AuthorityIntegration {...helpers} />;
    case "audit":
      return <AuditCenter {...helpers} />;
    case "command":
      return <CommandCenter {...helpers} />;
    default:
      return <Dashboard nav={nav} setModal={setModal} setDrawer={setDrawer} />;
  }
}

export default function SOSManagement() {
  const { route, navigate } = useApp();
  const [modal, setModal] = useState(null);
  const [drawer, setDrawer] = useState(null);
  const [screen, title, subtitle] = useMemo(() => metaFor(route), [route]);

  return (
    <AdminShell
      activeTab="SOS Management"
      headerTitle="SOS COMMAND"
      searchPlaceholder="Search SOS ID, user, or location..."
      customProfileName="Alex Mercer"
      customProfileRole="Fleet Commander"
    >
      <section className="sos-page">
        <div className="sos-page-head">
          <div>
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>
          <div className="sos-head-actions">
            <Button
              danger
              icon={Siren}
              onClick={() =>
                setModal({ type: "create", title: "Emergency Alert" })
              }
            >
              Deploy Quick SOS
            </Button>
            <Button
              icon={Bell}
              ghost
              onClick={() =>
                setModal({ type: "archive", title: "Archive SOS Records" })
              }
            >
              Archive
            </Button>
          </div>
        </div>
        {renderScreen(screen, { nav: navigate, setModal, setDrawer })}
      </section>
      <GenericModal modal={modal} close={() => setModal(null)} />
      <Drawer drawer={drawer} close={() => setDrawer(null)} />
    </AdminShell>
  );
}
