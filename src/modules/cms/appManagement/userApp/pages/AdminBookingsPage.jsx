import React, { useState } from 'react';
import AdminShell from '../../../../../components/layouts/AdminShell';
import { mockOrders } from '../data/mockData';
import { Eye, Edit, Trash2, X } from 'lucide-react';
import { useToast } from '../../../../../components/common/ToastNotification';

export default function AdminBookingsPage() {
  const { addToast } = useToast();
  const [orders, setOrders] = useState(mockOrders);
  const [viewOrder, setViewOrder] = useState(null);
  const [editOrder, setEditOrder] = useState(null);
  const [editForm, setEditForm] = useState({ status: '', date: '', timeSlot: '' });

  const handleOpenEdit = (order) => {
    setEditForm({ status: order.status, date: order.date, timeSlot: order.timeSlot });
    setEditOrder(order);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setOrders(orders.map(o => o.id === editOrder.id ? { ...o, ...editForm } : o));
    setEditOrder(null);
    addToast('Order updated successfully', 'success');
  };

  return (
    <AdminShell headerTitle="Bookings Ledger" activeTab="Bookings Ledger">
      <div style={{ padding: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>Bookings Ledger</h1>
        
        <div style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
          <div className="table-responsive-wrapper">
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                  <th style={{ padding: '16px', fontWeight: 'bold', color: '#475569' }}>ORDER ID</th>
                  <th style={{ padding: '16px', fontWeight: 'bold', color: '#475569' }}>CUSTOMER</th>
                  <th style={{ padding: '16px', fontWeight: 'bold', color: '#475569' }}>SERVICE</th>
                  <th style={{ padding: '16px', fontWeight: 'bold', color: '#475569' }}>DATE & TIME</th>
                  <th style={{ padding: '16px', fontWeight: 'bold', color: '#475569' }}>STATUS</th>
                  <th style={{ padding: '16px', fontWeight: 'bold', color: '#475569', textAlign: 'right' }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '16px', fontWeight: 'bold', color: '#4f46e5' }}>{order.id}</td>
                    <td style={{ padding: '16px', fontWeight: 'bold' }}>{order.customerName}</td>
                    <td style={{ padding: '16px' }}>{order.serviceName}<br/><span style={{ fontSize: '12px', color: '#64748b' }}>{order.packageName}</span></td>
                    <td style={{ padding: '16px' }}>{order.date}, {order.timeSlot}</td>
                    <td style={{ padding: '16px' }}>
                      <span style={{ 
                        padding: '4px 8px', 
                        background: order.status === 'Completed' ? '#d1fae5' : order.status === 'Cancelled' ? '#fee2e2' : '#fef3c7', 
                        color: order.status === 'Completed' ? '#065f46' : order.status === 'Cancelled' ? '#991b1b' : '#92400e', 
                        borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' 
                      }}>
                        {order.status}
                      </span>
                    </td>
                    <td style={{ padding: '16px', textAlign: 'right' }}>
                      <button onClick={() => setViewOrder(order)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px' }} title="View Details"><Eye size={18} /></button>
                      <button onClick={() => handleOpenEdit(order)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px' }} title="Edit Order"><Edit size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* View Modal */}
        {viewOrder && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
            <div style={{ background: '#fff', borderRadius: '12px', width: '90%', maxWidth: '500px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
              <div style={{ padding: '20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '700', margin: 0, color: '#0f172a' }}>Order Details - {viewOrder.id}</h2>
                <button onClick={() => setViewOrder(null)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#64748b' }}>
                  <X size={20} />
                </button>
              </div>
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div><strong>Customer:</strong> {viewOrder.customerName}</div>
                <div><strong>Service:</strong> {viewOrder.serviceName}</div>
                <div><strong>Package:</strong> {viewOrder.packageName}</div>
                <div><strong>Date & Time:</strong> {viewOrder.date} at {viewOrder.timeSlot}</div>
                <div><strong>Status:</strong> {viewOrder.status}</div>
                <div><strong>Amount:</strong> ₹{viewOrder.amount}</div>
              </div>
              <div style={{ padding: '16px 20px', background: '#f8fafc', borderTop: '1px solid #e2e8f0', borderRadius: '0 0 12px 12px', display: 'flex', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setViewOrder(null)} style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', fontSize: '14px', fontWeight: '600', color: '#475569', cursor: 'pointer' }}>Close</button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {editOrder && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
            <div style={{ background: '#fff', borderRadius: '12px', width: '90%', maxWidth: '400px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
              <div style={{ padding: '20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '700', margin: 0, color: '#0f172a' }}>Edit Order - {editOrder.id}</h2>
                <button onClick={() => setEditOrder(null)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#64748b' }}>
                  <X size={20} />
                </button>
              </div>
              
              <form onSubmit={handleSaveEdit} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Status</label>
                  <select 
                    value={editForm.status}
                    onChange={(e) => setEditForm({...editForm, status: e.target.value})}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', background: '#fff' }}
                  >
                    <option value="Confirmed">Confirmed</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
                
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Date</label>
                  <input 
                    type="text" 
                    value={editForm.date}
                    onChange={(e) => setEditForm({...editForm, date: e.target.value})}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Time Slot</label>
                  <input 
                    type="text" 
                    value={editForm.timeSlot}
                    onChange={(e) => setEditForm({...editForm, timeSlot: e.target.value})}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                  />
                </div>

                <div style={{ padding: '16px 20px', background: '#f8fafc', borderTop: '1px solid #e2e8f0', marginTop: '8px', borderRadius: '0 0 12px 12px', margin: '0 -20px -20px -20px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                  <button type="button" onClick={() => setEditOrder(null)} style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', fontSize: '14px', fontWeight: '600', color: '#475569', cursor: 'pointer' }}>Cancel</button>
                  <button type="submit" style={{ padding: '10px 16px', borderRadius: '8px', border: 'none', background: '#2563eb', color: '#fff', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>Save Changes</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}