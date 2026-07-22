const fs = require('fs');
let content = fs.readFileSync('src/pages/OrderManagement/OrderDashboard.jsx', 'utf8');

// replace true/false with strings for modal state
content = content.replace(/useState\(false\)/, 'useState(null)');
content = content.replace(`onClick={() => setViewAllModal(true)}`, `onClick={() => setViewAllModal('orders')}`);

const searchAttn = `<h2 className="od-card-title">Attention Required</h2>\n              <button className="od-view-all">View All <ChevronRight size={14} /></button>`;
const replaceAttn = `<h2 className="od-card-title">Attention Required</h2>\n              <button className="od-view-all" onClick={() => setViewAllModal('attention')}>View All <ChevronRight size={14} /></button>`;
content = content.replace(searchAttn, replaceAttn);

const oldModalStart = `{viewAllModal && (
          <div className="od-modal-overlay" onClick={() => setViewAllModal(false)}>
            <div className="od-modal-content" onClick={e => e.stopPropagation()}>
              <div className="od-modal-header">
                <h3 className="od-modal-title">All Recent Orders</h3>
                <button className="od-modal-close" onClick={() => setViewAllModal(false)}><X size={18} /></button>
              </div>
              <div className="od-modal-body">
                <div style={{ overflowX: 'auto' }}>
                  <table className="od-table">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Booking ID</th>
                        <th>Customer</th>
                        <th>Seller</th>
                        <th>Service Provider</th>
                        <th style={{ textAlign: 'center' }}>Materials</th>
                        <th>Total Amount</th>
                        <th>Payment Status</th>
                        <th>Order Status</th>
                        <th>Delivery Status</th>
                        <th>Order Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {RECENT_ORDERS.map((r, i) => (
                        <tr key={i}>
                          <td style={{ fontWeight: 700, color: '#2563eb' }}>{r.oid}</td>
                          <td style={{ fontWeight: 600, color: '#64748b' }}>{r.bid}</td>
                          <td style={{ fontWeight: 700, color: '#0f172a' }}>{r.cust}</td>
                          <td style={{ fontWeight: 600, color: '#475569' }}>{r.seller}</td>
                          <td style={{ fontWeight: 600, color: '#475569' }}>{r.sp}</td>
                          <td style={{ textAlign: 'center', fontWeight: 800 }}>{r.mat}</td>
                          <td style={{ fontWeight: 800, color: '#0f172a' }}>&#8377;{r.amt.toLocaleString('en-IN')}</td>
                          <td>{getStatusBadge(r.pay)}</td>
                          <td>{getStatusBadge(r.status)}</td>
                          <td>{getStatusBadge(r.del)}</td>
                          <td>
                            <div style={{ fontWeight: 600, color: '#0f172a' }}>{r.date}</div>
                            <div style={{ fontSize: 10, color: '#94a3b8' }}>{r.time}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>`;

const newModalStart = `{viewAllModal && (
          <div className="od-modal-overlay" onClick={() => setViewAllModal(null)}>
            <div className="od-modal-content" onClick={e => e.stopPropagation()}>
              <div className="od-modal-header">
                <h3 className="od-modal-title">{viewAllModal === 'attention' ? 'Attention Required' : 'All Recent Orders'}</h3>
                <button className="od-modal-close" onClick={() => setViewAllModal(null)}><X size={18} /></button>
              </div>
              <div className="od-modal-body">
                <div style={{ overflowX: 'auto' }}>
                  {viewAllModal === 'attention' ? (
                    <table className="od-table">
                      <thead><tr><th>Label</th><th>Count</th></tr></thead>
                      <tbody>
                        {ATTENTION_REQUIRED.map((r, i) => (
                          <tr key={i}>
                            <td style={{ fontWeight: 700, color: '#0f172a' }}><AlertCircle size={14} style={{ marginRight: 6, verticalAlign: 'middle', color: '#ef4444' }}/> {r.label}</td>
                            <td style={{ fontWeight: 800, color: '#ef4444' }}>{r.count}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <table className="od-table">
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Booking ID</th>
                          <th>Customer</th>
                          <th>Seller</th>
                          <th>Service Provider</th>
                          <th style={{ textAlign: 'center' }}>Materials</th>
                          <th>Total Amount</th>
                          <th>Payment Status</th>
                          <th>Order Status</th>
                          <th>Delivery Status</th>
                          <th>Order Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {RECENT_ORDERS.map((r, i) => (
                          <tr key={i}>
                            <td style={{ fontWeight: 700, color: '#2563eb' }}>{r.oid}</td>
                            <td style={{ fontWeight: 600, color: '#64748b' }}>{r.bid}</td>
                            <td style={{ fontWeight: 700, color: '#0f172a' }}>{r.cust}</td>
                            <td style={{ fontWeight: 600, color: '#475569' }}>{r.seller}</td>
                            <td style={{ fontWeight: 600, color: '#475569' }}>{r.sp}</td>
                            <td style={{ textAlign: 'center', fontWeight: 800 }}>{r.mat}</td>
                            <td style={{ fontWeight: 800, color: '#0f172a' }}>&#8377;{r.amt.toLocaleString('en-IN')}</td>
                            <td>{getStatusBadge(r.pay)}</td>
                            <td>{getStatusBadge(r.status)}</td>
                            <td>{getStatusBadge(r.del)}</td>
                            <td>
                              <div style={{ fontWeight: 600, color: '#0f172a' }}>{r.date}</div>
                              <div style={{ fontSize: 10, color: '#94a3b8' }}>{r.time}</div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}`;

content = content.replace(oldModalStr, newModalStart); // Oops, oldModalStr is not defined, wait.
// Let's fix this in the code block.
