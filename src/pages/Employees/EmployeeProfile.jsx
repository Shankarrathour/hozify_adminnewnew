import toast from 'react-hot-toast';
import React, { useState } from 'react';
import {
  Star,
  MapPin,
  CheckCircle,
  AlertTriangle,
  Mail,
  Phone,
  Calendar,
  ShieldAlert,
  User,
  Edit,
  Download,
  MoreHorizontal,
  ChevronRight,
  MoreVertical
} from 'lucide-react';

const skills = [
  'HVAC Specialist',
  'Project Management',
  'Smart Home Integrator',
  'Safety Certified',
  'Electrical Systems'
];

const mockBookings = [
  { service: 'HVAC Installation', date: '2024-05-15', customer: 'Global Tech HQ', status: 'COMPLETED' },
  { service: 'Maintenance Check', date: '2024-05-14', customer: 'Private Residence', status: 'COMPLETED' },
  { service: 'System Calibration', date: '2024-05-18', customer: 'Hotel Metropole', status: 'UPCOMING' }
];

export default function EmployeeProfile({ employee, onBack }) {
  const [profileTab, setProfileTab] = useState('Overview');

  // Fallback profile if none passed
  const emp = employee || {
    id: 'HZ - 2024-0892',
    name: 'Julian Casablancas',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80',
    role: 'Senior Field Technician'
  };

  const tabs = [
    'Overview',
    'Availability',
    'Attendance',
    'Bookings',
    'Performance',
    'Reviews',
    'Documents',
    'KYC',
    'Earnings'
  ];

  return (
    <div className="employee-profile-flow">
      {/* Back button and profile header info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
        <button
          onClick={onBack}
          style={{ border: 'none', background: 'transparent', color: '#4f46e5', fontWeight: '700', fontSize: '13px', cursor: 'pointer', padding: 0 }}
        >
          &larr; Back to Employees
        </button>
      </div>

      {/* Main Profile Summary Banner */}
      <div className="panel" style={{ padding: 'var(--spacing-section)', background: '#fff', borderRadius: '8px', border: '1.5px solid #25108f', marginBottom: '24px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-section)', alignItems: 'center', justifyContent: 'space-between' }}>
          
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <img
                src={emp.avatar}
                alt={emp.name}
                style={{ width: '80px', height: '80px', borderRadius: '8px', objectFit: 'cover' }}
              />
              <span
                style={{
                  position: 'absolute',
                  bottom: '-4px',
                  right: '-4px',
                  width: '16px',
                  height: '16px',
                  background: '#10b981',
                  border: '3px solid #fff',
                  borderRadius: '50%'
                }}
              />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h1 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text)', margin: '0' }}>{emp.name}</h1>
                <span style={{ fontSize: '9px', fontWeight: '800', background: '#e0e7ff', color: '#4f46e5', padding: '3px 8px', borderRadius: '99px' }}>
                  VERIFIED
                </span>
              </div>
              <p style={{ color: 'var(--muted)', fontSize: '13px', margin: '4px 0 12px' }}>
                Employee ID: {emp.id} • {emp.role || 'Senior Field Technician'}
              </p>
              
              <div style={{ display: 'flex', gap: '10px' }}>
                <button className="primary-action-btn font-bold" style={{ height: '32px', padding: '0 14px', fontSize: '12px' }} onClick={(e) => { e.preventDefault(); e.stopPropagation(); toast.success("Action performed successfully!"); }}>
                  <Edit size={12} style={{ marginRight: '4px' }} />
                  Edit Profile
                </button>
                <button className="secondary-action-btn font-bold" style={{ height: '32px', padding: '0 14px', fontSize: '12px' }} onClick={(e) => { e.preventDefault(); e.stopPropagation(); toast.success("Action performed successfully!"); }}>
                  <Download size={12} style={{ marginRight: '4px' }} />
                  Download CV
                </button>
                <button className="secondary-action-btn" style={{ height: '32px', width: '32px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={(e) => { e.preventDefault(); e.stopPropagation(); toast.success("Action performed successfully!"); }}>
                  <MoreHorizontal size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Banner KPIs block */}
          <div style={{ display: 'flex', gap: '12px' }}>
            {/* Bookings */}
            <div style={{ borderRadius: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: '120px', minHeight: '80px', padding: '12px 16px', backgroundColor: '#4f46e5', color: '#fff', border: 'none' }}>
              <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)', fontWeight: '800' }}>BOOKINGS</span>
              <strong style={{ display: 'block', fontSize: '20px', margin: '4px 0 2px' }}>142</strong>
              <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.9)' }}>+12% MoM</span>
            </div>

            {/* Revenue */}
            <div style={{ borderRadius: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: '120px', minHeight: '80px', padding: '12px 16px', backgroundColor: '#0f172a', color: '#fff', border: 'none' }}>
              <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)', fontWeight: '800' }}>REVENUE</span>
              <strong style={{ display: 'block', fontSize: '20px', margin: '4px 0 2px' }}>$12.4k</strong>
              <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.9)' }}>Active Target</span>
            </div>

            {/* Rating */}
            <div style={{ borderRadius: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: '120px', minHeight: '80px', padding: '12px 16px', backgroundColor: '#f8fafc', border: '1.5px solid #25108f' }}>
              <span style={{ fontSize: '10px', color: 'var(--muted)', fontWeight: '800' }}>RATING</span>
              <strong style={{ display: 'block', fontSize: '20px', margin: '4px 0 2px', color: 'var(--text)' }}>4.9</strong>
              <div style={{ display: 'flex', gap: '2px' }}>
                {[1, 2, 3, 4, 5].map(star => <Star key={star} size={9} fill="#eab308" color="#eab308" />)}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Profile Navigation sub-tabs */}
      <div style={{ borderBottom: '1.5px solid #25108f', marginBottom: '24px', display: 'flex', gap: 'var(--spacing-section)', overflowX: 'auto' }}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setProfileTab(tab)}
            style={{
              background: 'transparent',
              border: 'none',
              borderBottom: profileTab === tab ? '2px solid #4f46e5' : '2px solid transparent',
              color: profileTab === tab ? '#4f46e5' : 'var(--muted)',
              fontWeight: '700',
              fontSize: '13px',
              padding: '10px 4px',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      {profileTab === 'Overview' ? (
        <div className="fraud-top-grid" style={{ gap: '20px', alignItems: 'flex-start' }}>
          
          {/* Left Block: Personal Information & Recent Bookings */}
          <div style={{ flex: 1.6, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
            
            {/* Personal Information */}
            <div className="panel" style={{ padding: 'var(--spacing-section)' }}>
              <h2 style={{ fontSize: '15px', fontWeight: '700', margin: '0 0 16px' }}>Personal Information</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                <div>
                  <span style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Email Address</span>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text)' }}>julian.cas@hozify.com</span>
                </div>

                <div>
                  <span style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Phone Number</span>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text)' }}>+1 (555) 092-4421</span>
                </div>

                <div>
                  <span style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Emergency Contact</span>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text)' }}>Fabrizio Moretti (+1 555-092-4400)</span>
                </div>

                <div>
                  <span style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Join Date</span>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text)' }}>March 12, 2023 (1y 2m)</span>
                </div>
              </div>
            </div>

            {/* Recent Bookings */}
            <div className="panel" style={{ padding: 'var(--spacing-section)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h2 style={{ fontSize: '15px', fontWeight: '700', margin: '0' }}>Recent Bookings</h2>
                <button style={{ border: 'none', background: 'transparent', color: '#4f46e5', fontWeight: '700', fontSize: '12px', cursor: 'pointer', padding: 0 }} onClick={(e) => { e.preventDefault(); e.stopPropagation(); toast.success("Action performed successfully!"); }}>
                  View All
                </button>
              </div>

              <div className="table-wrap" style={{ border: '1px solid #e1dce8', borderRadius: '8px', overflow: 'hidden' }}>
                <div className="table-responsive-wrapper">
<table className="approval-queue-table" style={{ width: '100%', minWidth: 'auto' }}>
                  <thead>
                    <tr>
                      <th style={{ padding: '10px 14px', fontSize: '10px' }}>SERVICE</th>
                      <th style={{ padding: '10px 14px', fontSize: '10px' }}>DATE</th>
                      <th style={{ padding: '10px 14px', fontSize: '10px' }}>CUSTOMER</th>
                      <th style={{ padding: '10px 14px', fontSize: '10px' }}>STATUS</th>
                      <th style={{ padding: '10px 14px', fontSize: '10px', textAlign: 'right' }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockBookings.map((b, idx) => (
                      <tr key={idx}>
                        <td style={{ padding: '12px 14px', fontWeight: '700', fontSize: '13px' }}>{b.service}</td>
                        <td style={{ padding: '12px 14px', color: 'var(--muted)', fontSize: '12px' }}>{b.date}</td>
                        <td style={{ padding: '12px 14px', color: 'var(--text)', fontSize: '13px' }}>{b.customer}</td>
                        <td style={{ padding: '12px 14px' }}>
                          <span
                            style={{
                              fontSize: '9px',
                              fontWeight: '800',
                              padding: '3px 6px',
                              borderRadius: '3px',
                              color: b.status === 'COMPLETED' ? '#059669' : '#d97706',
                              background: b.status === 'COMPLETED' ? '#ecfdf5' : '#fef3c7'
                            }}
                          >
                            {b.status}
                          </span>
                        </td>
                        <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                          <button style={{ border: 'none', background: 'transparent', color: 'var(--muted)', cursor: 'pointer', padding: 0 }} onClick={(e) => { e.preventDefault(); e.stopPropagation(); toast.success("Action performed successfully!"); }}>
                            <MoreVertical size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
</div>
              </div>
            </div>

          </div>

          {/* Right Block: Compliance, Skills & Territory */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
            
            {/* Compliance Status */}
            <div className="panel" style={{ padding: 'var(--spacing-section)' }}>
              <h2 style={{ fontSize: '15px', fontWeight: '700', margin: '0 0 16px' }}>Compliance Status</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', backgroundColor: '#f0fdf4', borderRadius: '6px', fontSize: '13px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#15803d', fontWeight: '700' }}>
                    <CheckCircle size={16} />
                    Identity Verified
                  </span>
                  <span style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%' }} />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', backgroundColor: '#f0fdf4', borderRadius: '6px', fontSize: '13px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#15803d', fontWeight: '700' }}>
                    <CheckCircle size={16} />
                    Background Check
                  </span>
                  <span style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%' }} />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', backgroundColor: '#fffbeb', borderRadius: '6px', fontSize: '13px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#b45309', fontWeight: '700' }}>
                    <AlertTriangle size={16} />
                    Insurance Expiring
                  </span>
                  <span style={{ width: '8px', height: '8px', background: '#f59e0b', borderRadius: '50%' }} />
                </div>
              </div>

              <button className="secondary-action-btn font-bold" style={{ width: '100%', height: '38px', justifyContent: 'center' }} onClick={(e) => { e.preventDefault(); e.stopPropagation(); toast.success("Action performed successfully!"); }}>
                Review Documents
              </button>
            </div>

            {/* Primary Skills */}
            <div className="panel" style={{ padding: 'var(--spacing-section)' }}>
              <h2 style={{ fontSize: '15px', fontWeight: '700', margin: '0 0 12px' }}>Primary Skills</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    style={{
                      fontSize: '11px',
                      fontWeight: '700',
                      background: '#f1ebf8',
                      color: 'var(--primary-3)',
                      padding: '4px 10px',
                      borderRadius: '4px'
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Assigned Territory */}
            <div className="panel" style={{ padding: 'var(--spacing-section)' }}>
              <h2 style={{ fontSize: '15px', fontWeight: '700', margin: '0 0 12px' }}>Assigned Territory</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '700', color: 'var(--text)' }}>
                <MapPin size={16} color="#4f46e5" />
                <span>Manhattan South & Brooklyn Heights</span>
              </div>
            </div>

          </div>

        </div>
      ) : (
        <div className="panel" style={{ padding: '48px', textAlign: 'center', color: 'var(--muted)' }}>
          {profileTab} panel controls are currently locked for editing.
        </div>
      )}
    </div>
  );
}


