import React, { useState } from 'react';
import { useApp } from '../../hooks/useApp';
import { ROUTES } from '../../config/routes';
import AdminShell from '../../components/layouts/AdminShell';
import BusinessHeaderTabs from './BusinessHeaderTabs';
import { useToast } from '../../components/common/ToastNotification';
import {
  Building2,
  Mail,
  Phone,
  Globe,
  MapPin,
  Clock,
  ExternalLink,
  Plus,
  Star,
  Users,
  Briefcase,
  CalendarCheck,
  DollarSign,
  TrendingUp,
  ShieldCheck,
  Edit2,
  Share2,
  ChevronRight,
  ShieldAlert,
  FileText,
  FileCheck,
  User,
  Activity,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';

export default function BusinessDetails() {
  const { navigate } = useApp();
  const { addToast } = useToast();
  const [activeSubTab, setActiveSubTab] = useState('Overview');

  const storedBusiness = JSON.parse(localStorage.getItem('selectedBusiness')) || {
    id: 'BIZ-8829',
    name: 'Global Logistics Ltd',
    category: 'Logistics',
    location: 'Rotterdam, NL',
    status: 'Active',
    owner: 'Marcus Thorne'
  };

  const businessId = storedBusiness.id;
  const businessName = storedBusiness.name;
  const businessCategory = storedBusiness.category;
  const businessLocation = storedBusiness.location;
  const businessStatus = storedBusiness.status;
  const businessOwner = storedBusiness.owner || 'Marcus Thorne';

  const subTabs = [
    'Overview',
    'Owner',
    'Documents',
    'Branches',
    'Services',
    'Employees',
    'Revenue',
    'Reviews',
    'Compliance',
    'Timeline',
    'Audit Logs'
  ];

  const handleSubTabClick = (tab) => {
    setActiveSubTab(tab);
  };

  // Sub-tab content renderers
  const renderOverview = () => (
    <div className="fraud-top-grid" style={{ display: 'flex', gap: '20px', alignItems: 'stretch', flexWrap: 'wrap' }}>
      {/* Left Column content */}
      <div style={{ flex: 1.8, display: 'flex', flexDirection: 'column', gap: '20px', minWidth: '320px' }}>
        
        {/* Business Summary panel */}
        <div className="panel" style={{ padding: '20px' }}>
          <h2 style={{ fontSize: '14px', fontWeight: '800', margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Business Summary</h2>
          <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: '1.6', margin: 0 }}>
            {businessName} is a premier provider of integrated solutions in the {businessCategory} sector. Specializing in high-density management, compliance monitoring, and real-time tracking transparency, the company serves a growing base of enterprise clients worldwide.
          </p>

          {/* Contacts and details */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px', borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}>
            <div>
              <h3 style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', margin: '0 0 12px' }}>Contact Information</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px', fontWeight: '700' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <Mail size={14} style={{ color: '#4f46e5' }} />
                  <a href="mailto:ops@globallogistics.com" style={{ color: '#0f172a', textDecoration: 'none' }}>ops@globallogistics.com</a>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <Phone size={14} style={{ color: '#4f46e5' }} />
                  <span style={{ color: '#0f172a' }}>+31 10 400 5000</span>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <Globe size={14} style={{ color: '#4f46e5' }} />
                  <a href="https://www.globallogistics.com" target="_blank" rel="noopener noreferrer" style={{ color: '#0f172a', textDecoration: 'none' }}>www.globallogistics.com</a>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <MapPin size={14} style={{ color: '#4f46e5', marginTop: '2px' }} />
                  <span style={{ color: '#0f172a', lineHeight: '1.4' }}>Wilhelminakade 1, 3072 AP<br />Rotterdam, Netherlands</span>
                </div>
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', margin: '0 0 12px' }}>Operational Hours</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', fontWeight: '700' }}>
                <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--muted)' }}>Mon - Fri</span>
                  <span style={{ color: 'var(--text)' }}>00:00 - 24:00 (24/7 Ops)</span>
                </div>
                <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--muted)' }}>Sat - Sun</span>
                  <span style={{ color: 'var(--text)' }}>00:00 - 24:00 (24/7 Ops)</span>
                </div>

                <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '6px', padding: '10px', display: 'flex', gap: '8px', marginTop: '8px' }}>
                  <Clock size={16} style={{ color: '#1d4ed8', flexShrink: 0 }} />
                  <div>
                    <strong style={{ display: 'block', fontSize: '11px', color: '#1e3a8a' }}>Logistics Command Center</strong>
                    <span style={{ display: 'block', fontSize: '10px', color: '#1e40af', fontWeight: '500', marginTop: '2px' }}>Global operations monitored 24/7/365</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Service Coverage Areas Panel */}
        <div className="panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h2 style={{ fontSize: '14px', fontWeight: '800', margin: '0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Service Coverage Areas</h2>
            <button onClick={() => addToast('Opening global network map...', 'info')} style={{ border: 'none', background: 'transparent', color: '#4f46e5', fontWeight: '800', fontSize: '11px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              View Full Network <ExternalLink size={12} />
            </button>
          </div>

          <div style={{ height: '280px', borderRadius: '6px', background: '#1e293b', overflow: 'hidden', position: 'relative' }}>
            <svg width="100%" height="100%" viewBox="0 0 600 280" style={{ display: 'block' }}>
              <pattern id="map-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="0.5" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#map-grid)" />
              <path d="M50,70 Q70,60 110,65 T140,80 T170,75 T210,120 T150,160 T130,220 T100,240 Z" fill="rgba(255, 255, 255, 0.06)" />
              <path d="M260,80 Q290,60 320,65 T350,85 T390,95 T430,90 T480,110 T460,160 T420,200 T380,250 Z" fill="rgba(255, 255, 255, 0.06)" />
              <path d="M490,50 Q520,40 560,55 T580,90 T540,140 Z" fill="rgba(255, 255, 255, 0.06)" />
              <path d="M 160 100 Q 250 50, 420 180" fill="none" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1.5" strokeDasharray="4,4" />
              <circle cx="160" cy="100" r="6" fill="#4f46e5" />
              <circle cx="160" cy="100" r="12" fill="none" stroke="#4f46e5" strokeWidth="1.5" opacity="0.6" />
              <circle cx="420" cy="180" r="5" fill="#10b981" />
              <circle cx="80" cy="120" r="5" fill="#10b981" />
            </svg>
          </div>
        </div>
      </div>

      {/* Right Column content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px', minWidth: '260px' }}>
        
        {/* Emergency Contacts Panel */}
        <div className="panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <h2 style={{ fontSize: '14px', fontWeight: '800', margin: '0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Emergency Contacts</h2>
          
          <div style={{ border: '1px solid #fee2e2', background: '#fff8f8', borderRadius: '6px', padding: '12px 14px' }}>
            <span style={{ display: 'block', fontSize: '8px', fontWeight: '900', color: '#ef4444', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Primary Representative</span>
            <strong style={{ display: 'block', fontSize: '14px', color: 'var(--text)', marginTop: '4px' }}>{businessOwner}</strong>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: '700', color: 'var(--muted)', marginTop: '6px' }}>
              <Phone size={12} />
              <span>+31 (0) 628-991-022</span>
            </div>
          </div>

          <div style={{ border: '1px solid #dbeafe', background: '#f8fafc', borderRadius: '6px', padding: '12px 14px' }}>
            <span style={{ display: 'block', fontSize: '8px', fontWeight: '900', color: '#1d4ed8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Incident Response</span>
            <strong style={{ display: 'block', fontSize: '14px', color: 'var(--text)', marginTop: '4px' }}>Rapid Task Force</strong>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: '700', color: 'var(--muted)', marginTop: '6px' }}>
              <Phone size={12} />
              <span>Ext. 9110</span>
            </div>
          </div>

          <button
            style={{ width: '100%', height: '36px', border: '1px dashed var(--line)', background: 'transparent', color: 'var(--muted)', fontSize: '11px', fontWeight: '800', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', cursor: 'pointer' }}
            onClick={() => addToast('Adding contact dialog opened.', 'info')}
            type="button"
          >
            <Plus size={12} /> Add Contact
          </button>
        </div>

        {/* Compliance Status Card */}
        <div className="panel" style={{ padding: '20px', background: '#0f172a', color: '#fff', border: 'none' }}>
          <h2 style={{ fontSize: '13px', fontWeight: '800', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 16px' }}>Compliance Status</h2>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{ position: 'relative', width: '64px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="64" height="64" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="16" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
                <circle cx="18" cy="18" r="16" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="98 100" strokeDashoffset="0" strokeLinecap="round" />
              </svg>
              <strong style={{ position: 'absolute', fontSize: '16px', fontWeight: '800' }}>98%</strong>
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '12px' }}>Regulatory Score</strong>
              <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                <ShieldCheck size={11} style={{ color: '#10b981' }} /> Document status cleared
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '11px', fontWeight: '700', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px' }}>
            <div>
              <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ color: 'rgba(255,255,255,0.6)' }}>EU Transport Safety</span>
                <span style={{ color: '#10b981' }}>Passed</span>
              </div>
              <div style={{ height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '100%', background: '#10b981' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ color: 'rgba(255,255,255,0.6)' }}>ISO 9001 Certification</span>
                <span style={{ color: '#10b981' }}>Active</span>
              </div>
              <div style={{ height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '100%', background: '#10b981' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOwner = () => (
    <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
          👤
        </div>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: '800', margin: 0 }}>{businessOwner}</h2>
          <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Ultimate Beneficial Owner (UBO)</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', borderTop: '1.5px solid #25108f', paddingTop: '20px' }}>
        <div>
          <span style={{ fontSize: '11px', color: 'var(--muted)', textTransform: 'uppercase', fontWeight: '800' }}>Email Address</span>
          <p style={{ margin: '4px 0 0', fontWeight: '700', fontSize: '14px' }}>{businessOwner.toLowerCase().replace(' ', '.')}@hozify-partner.com</p>
        </div>
        <div>
          <span style={{ fontSize: '11px', color: 'var(--muted)', textTransform: 'uppercase', fontWeight: '800' }}>Phone Number</span>
          <p style={{ margin: '4px 0 0', fontWeight: '700', fontSize: '14px' }}>+31 (0) 628-991-022</p>
        </div>
        <div>
          <span style={{ fontSize: '11px', color: 'var(--muted)', textTransform: 'uppercase', fontWeight: '800' }}>Voting Stakes</span>
          <p style={{ margin: '4px 0 0', fontWeight: '700', fontSize: '14px', color: '#4f46e5' }}>45% Primary Stakeholding</p>
        </div>
        <div>
          <span style={{ fontSize: '11px', color: 'var(--muted)', textTransform: 'uppercase', fontWeight: '800' }}>KYC Status</span>
          <p style={{ margin: '4px 0 0', fontWeight: '800', fontSize: '12px', color: '#16a34a' }}>✓ VERIFIED</p>
        </div>
      </div>
    </div>
  );

  const renderDocuments = () => (
    <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h2 style={{ fontSize: '16px', fontWeight: '800', margin: 0 }}>Compliance & Onboarding Documents</h2>
        <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>Review, edit, and audit essential legal documents submitted by this merchant.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* GST */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1.5px solid #25108f', padding: '16px', borderRadius: '8px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <FileText className="text-[#4f46e5]" size={24} />
            <div>
              <strong style={{ display: 'block', fontSize: '14px' }}>Form GST REG-06</strong>
              <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Tax Registration Certificate</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', color: '#16a34a', background: '#d1fae5', padding: '3px 8px', borderRadius: '4px' }}>OCR Match (98%)</span>
            <button onClick={() => navigate(ROUTES.businessGst)} style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>
              Audit GST
            </button>
          </div>
        </div>

        {/* PAN */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1.5px solid #25108f', padding: '16px', borderRadius: '8px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <FileText className="text-[#4f46e5]" size={24} />
            <div>
              <strong style={{ display: 'block', fontSize: '14px' }}>Permanent Account Number (PAN)</strong>
              <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Corporate PAN Card Copy</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', color: '#16a34a', background: '#d1fae5', padding: '3px 8px', borderRadius: '4px' }}>Approved</span>
            <button onClick={() => navigate(ROUTES.businessPan)} style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>
              Audit PAN
            </button>
          </div>
        </div>

        {/* Trade License */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1.5px solid #25108f', padding: '16px', borderRadius: '8px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <FileText className="text-[#eab308]" size={24} />
            <div>
              <strong style={{ display: 'block', fontSize: '14px' }}>Establishment Trade License</strong>
              <span style={{ fontSize: '12px', color: 'var(--muted)' }}>VLS Registration Sheet</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', color: '#b45309', background: '#fef3c7', padding: '3px 8px', borderRadius: '4px' }}>Action Required</span>
            <button onClick={() => navigate(ROUTES.businessRegVerification)} style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>
              Audit Trade License
            </button>
          </div>
        </div>

        {/* Ownership */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1.5px solid #25108f', padding: '16px', borderRadius: '8px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <FileText className="text-[#ef4444]" size={24} />
            <div>
              <strong style={{ display: 'block', fontSize: '14px' }}>UBO Shareholding Structures</strong>
              <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Beneficial Ownership Declarations</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', color: '#ef4444', background: '#fee2e2', padding: '3px 8px', borderRadius: '4px' }}>Attention Required</span>
            <button onClick={() => navigate(ROUTES.businessOwnership)} style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>
              Audit UBO Set
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBranches = () => (
    <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '16px', fontWeight: '800', margin: 0 }}>Registered Entity Branches</h2>
        <span style={{ background: '#1e1b4b', color: '#fff', fontSize: '11px', fontWeight: '800', padding: '3px 8px', borderRadius: '4px' }}>3 Active Branches</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ border: '1.5px solid #25108f', padding: '16px', borderRadius: '8px', display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <strong style={{ display: 'block', fontSize: '14px' }}>Downtown Flagship Hub</strong>
            <span style={{ display: 'block', fontSize: '11px', color: 'var(--muted)' }}>442 Broadway, New York, NY 10013</span>
          </div>
          <span style={{ fontSize: '10px', fontWeight: '800', color: '#16a34a', background: '#d1fae5', padding: '2px 8px', borderRadius: '4px' }}>ACTIVE</span>
        </div>

        <div style={{ border: '1.5px solid #25108f', padding: '16px', borderRadius: '8px', display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <strong style={{ display: 'block', fontSize: '14px' }}>East Bay Logistics Terminal</strong>
            <span style={{ display: 'block', fontSize: '11px', color: 'var(--muted)' }}>2100 Powell St, Emeryville, CA 94608</span>
          </div>
          <span style={{ fontSize: '10px', fontWeight: '800', color: '#b45309', background: '#fef3c7', padding: '2px 8px', borderRadius: '4px' }}>INACTIVE</span>
        </div>

        <div style={{ border: '1.5px solid #25108f', padding: '16px', borderRadius: '8px', display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <strong style={{ display: 'block', fontSize: '14px' }}>West Coast Distribution Center</strong>
            <span style={{ display: 'block', fontSize: '11px', color: 'var(--muted)' }}>1201 Third Ave, Seattle, WA 98101</span>
          </div>
          <span style={{ fontSize: '10px', fontWeight: '800', color: '#16a34a', background: '#d1fae5', padding: '2px 8px', borderRadius: '4px' }}>ACTIVE</span>
        </div>
      </div>
    </div>
  );

  const renderServices = () => (
    <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h2 style={{ fontSize: '16px', fontWeight: '800', margin: 0 }}>Registered Services</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ border: '1.5px solid #25108f', padding: '16px', borderRadius: '8px' }}>
          <strong style={{ display: 'block', fontSize: '14px', color: 'var(--text)' }}>Express Freight Delivery</strong>
          <span style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', marginTop: '2px' }}>Category: Freight Logistics • Status: Active</span>
        </div>
        <div style={{ border: '1.5px solid #25108f', padding: '16px', borderRadius: '8px' }}>
          <strong style={{ display: 'block', fontSize: '14px', color: 'var(--text)' }}>Climate-Controlled Warehousing</strong>
          <span style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', marginTop: '2px' }}>Category: Storage Solutions • Status: Active</span>
        </div>
        <div style={{ border: '1.5px solid #25108f', padding: '16px', borderRadius: '8px' }}>
          <strong style={{ display: 'block', fontSize: '14px', color: 'var(--text)' }}>Custom Clearance Brokerage</strong>
          <span style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', marginTop: '2px' }}>Category: Compliance • Status: Active</span>
        </div>
      </div>
    </div>
  );

  const renderEmployees = () => (
    <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h2 style={{ fontSize: '16px', fontWeight: '800', margin: 0 }}>Staff & Employees</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', border: '1.5px solid #25108f', padding: '16px', borderRadius: '8px' }}>
          <div>
            <strong style={{ display: 'block', fontSize: '14px' }}>Sarah Chen</strong>
            <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Senior Operations Manager (Logistics)</span>
          </div>
          <span style={{ fontSize: '10px', fontWeight: '800', background: '#d1fae5', color: '#065f46', padding: '2px 8px', borderRadius: '4px' }}>EXCEEDING</span>
        </div>

        <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', border: '1.5px solid #25108f', padding: '16px', borderRadius: '8px' }}>
          <div>
            <strong style={{ display: 'block', fontSize: '14px' }}>Marcus Holloway</strong>
            <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Product Lead (Growth)</span>
          </div>
          <span style={{ fontSize: '10px', fontWeight: '800', background: '#eff6ff', color: '#1e40af', padding: '2px 8px', borderRadius: '4px' }}>CONSISTENT</span>
        </div>

        <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', border: '1.5px solid #25108f', padding: '16px', borderRadius: '8px' }}>
          <div>
            <strong style={{ display: 'block', fontSize: '14px' }}>Elena Rodriguez</strong>
            <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Support Specialist (Relations)</span>
          </div>
          <span style={{ fontSize: '10px', fontWeight: '800', background: '#f3e8ff', color: '#6b21a8', padding: '2px 8px', borderRadius: '4px' }}>RISING STAR</span>
        </div>
      </div>
    </div>
  );

  const renderRevenue = () => (
    <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h2 style={{ fontSize: '16px', fontWeight: '800', margin: 0 }}>FY 2024 Revenue Audit</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
        <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1.5px solid #25108f' }}>
          <span style={{ fontSize: '10px', color: 'var(--muted)', fontWeight: '800' }}>GROSS REVENUE</span>
          <strong style={{ display: 'block', fontSize: '20px', marginTop: '4px' }}>$450,000</strong>
        </div>
        <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1.5px solid #25108f' }}>
          <span style={{ fontSize: '10px', color: 'var(--muted)', fontWeight: '800' }}>MONTHLY AVERAGE</span>
          <strong style={{ display: 'block', fontSize: '20px', marginTop: '4px' }}>$45,000</strong>
        </div>
        <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1.5px solid #25108f' }}>
          <span style={{ fontSize: '10px', color: 'var(--muted)', fontWeight: '800' }}>PENDING SETTLEMENTS</span>
          <strong style={{ display: 'block', fontSize: '20px', marginTop: '4px', color: '#b45309' }}>$12,500</strong>
        </div>
      </div>
    </div>
  );

  const renderReviews = () => (
    <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h2 style={{ fontSize: '16px', fontWeight: '800', margin: 0 }}>Customer Reviews & Ratings</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ borderBottom: '1.5px solid #25108f', paddingBottom: '16px' }}>
          <div style={{ display: 'flex', gap: '4px', color: '#f59e0b' }}>
            {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} fill="#f59e0b" />)}
          </div>
          <p style={{ margin: '8px 0 4px', fontSize: '13px', fontStyle: 'italic' }}>"{businessName} delivers on time, every time. Exceptional support!"</p>
          <span style={{ fontSize: '11px', color: 'var(--muted)' }}>— Robert D., Operations Director</span>
        </div>

        <div style={{ borderBottom: '1.5px solid #25108f', paddingBottom: '16px' }}>
          <div style={{ display: 'flex', gap: '4px', color: '#f59e0b' }}>
            {Array.from({ length: 4 }).map((_, i) => <Star key={i} size={14} fill="#f59e0b" />)}
            <Star size={14} />
          </div>
          <p style={{ margin: '8px 0 4px', fontSize: '13px', fontStyle: 'italic' }}>"Good communication and support. Highly professional Logistics company."</p>
          <span style={{ fontSize: '11px', color: 'var(--muted)' }}>— Clara M., Supply Coordinator</span>
        </div>
      </div>
    </div>
  );

  const renderCompliance = () => (
    <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: '800', margin: 0 }}>Compliance Auditing Center</h2>
          <p style={{ fontSize: '12px', color: 'var(--muted)' }}>Auditing tools for GST, PAN, UBO, and risk operations.</p>
        </div>
        <button 
          onClick={() => navigate(ROUTES.businessSuspension)}
          style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
        >
          Suspend Merchant
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderTop: '1.5px solid #25108f', paddingTop: '16px' }}>
        <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', fontSize: '13px' }}>
          <span>GSTIN Verification Status</span>
          <span style={{ color: '#16a34a', fontWeight: '800' }}>✓ VERIFIED</span>
        </div>
        <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', fontSize: '13px' }}>
          <span>PAN Verification Status</span>
          <span style={{ color: '#16a34a', fontWeight: '800' }}>✓ APPROVED</span>
        </div>
        <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', fontSize: '13px' }}>
          <span>Trade License Expiry Validity</span>
          <span style={{ color: '#b45309', fontWeight: '800' }}>⚠ ACTION REQUIRED</span>
        </div>
        <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', fontSize: '13px' }}>
          <span>Beneficial Owner Audit</span>
          <span style={{ color: '#ef4444', fontWeight: '800' }}>✗ ATTENTION REQUIRED</span>
        </div>
      </div>
    </div>
  );

  const renderTimeline = () => (
    <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h2 style={{ fontSize: '16px', fontWeight: '800', margin: 0 }}>Registration & Compliance Timeline</h2>
      <div style={{ relative: true }}>
        <div style={{ position: 'absolute', left: '11px', top: '10px', bottom: '10px', width: '2px', background: '#e2e8f0' }} />
        
        <div style={{ display: 'flex', gap: '16px', position: 'relative', marginBottom: '20px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4f46e5', marginTop: '6px', zIndex: 10, marginLeft: '8px' }} />
          <div>
            <strong style={{ display: 'block', fontSize: '13px' }}>Auditor Audit Initiated</strong>
            <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Today • 11:32 AM</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px', position: 'relative', marginBottom: '20px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#cbd5e1', marginTop: '6px', zIndex: 10, marginLeft: '8px' }} />
          <div>
            <strong style={{ display: 'block', fontSize: '13px' }}>NSDL Database Match Completed</strong>
            <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Oct 25, 2023 • 15:44 PM</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px', position: 'relative' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#cbd5e1', marginTop: '6px', zIndex: 10, marginLeft: '8px' }} />
          <div>
            <strong style={{ display: 'block', fontSize: '13px' }}>Initial Registration Request Submitted</strong>
            <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Oct 24, 2023 • 14:30 PM</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAuditLogs = () => {
    // Generate deterministic log entries based on business data
    const seed = businessId ? parseInt(businessId.replace(/\D/g, ''), 10) || 1000 : 1000;
    const logBase = seed % 9000 + 1000;

    const statusColor = businessStatus === 'Active' ? '#16a34a'
      : businessStatus === 'Suspended' ? '#ef4444'
      : businessStatus === 'Pending' ? '#b45309'
      : '#6366f1';

    const auditEntries = [
      {
        id: `LOG-${logBase}`,
        color: '#4f46e5',
        tag: 'ACCESS',
        tagBg: '#ede9fe',
        tagText: '#5b21b6',
        action: `Admin accessed ${businessName} profile for compliance review.`,
        actor: businessOwner,
        time: 'Today • 11:32 AM',
        status: 'SUCCESS',
        statusColor: '#16a34a',
      },
      {
        id: `LOG-${logBase - 11}`,
        color: '#0891b2',
        tag: 'DOCUMENT',
        tagBg: '#e0f2fe',
        tagText: '#0369a1',
        action: `PAN verification re-submitted for ${businessName} (${businessCategory} sector).`,
        actor: 'System',
        time: 'Today • 10:14 AM',
        status: 'SUCCESS',
        statusColor: '#16a34a',
      },
      {
        id: `LOG-${logBase - 22}`,
        color: '#dc2626',
        tag: 'SECURITY',
        tagBg: '#fee2e2',
        tagText: '#991b1b',
        action: `Unauthorized access attempt detected from unrecognized IP — ${businessLocation}.`,
        actor: 'Security Engine',
        time: 'Yesterday • 08:45 PM',
        status: 'BLOCKED',
        statusColor: '#ef4444',
      },
      {
        id: `LOG-${logBase - 33}`,
        color: '#d97706',
        tag: 'CONFIG',
        tagBg: '#fef3c7',
        tagText: '#92400e',
        action: `Commission rate updated for ${businessName} — ${businessCategory} tier configuration.`,
        actor: businessOwner,
        time: 'Yesterday • 03:22 PM',
        status: 'SUCCESS',
        statusColor: '#16a34a',
      },
      {
        id: `LOG-${logBase - 44}`,
        color: '#7c3aed',
        tag: 'STATUS',
        tagBg: '#ede9fe',
        tagText: '#5b21b6',
        action: `Business status changed to "${businessStatus}" — ${businessId} manually reviewed.`,
        actor: 'Super Admin',
        time: 'Oct 25, 2023 • 05:10 PM',
        status: businessStatus === 'Active' ? 'SUCCESS' : 'FLAGGED',
        statusColor: statusColor,
      },
      {
        id: `LOG-${logBase - 55}`,
        color: '#059669',
        tag: 'COMPLIANCE',
        tagBg: '#d1fae5',
        tagText: '#065f46',
        action: `OCR engine extracted trade registration parameters for ${businessName}.`,
        actor: 'OCR System',
        time: 'Oct 24, 2023 • 02:55 PM',
        status: 'SUCCESS',
        statusColor: '#16a34a',
      },
      {
        id: `LOG-${logBase - 66}`,
        color: '#6366f1',
        tag: 'KYC',
        tagBg: '#e0e7ff',
        tagText: '#3730a3',
        action: `Risk profiling alert auto-initialized for ${businessCategory} business — ${businessId}.`,
        actor: 'Risk Engine',
        time: 'Oct 24, 2023 • 11:00 AM',
        status: 'WARNING',
        statusColor: '#b45309',
      },
    ];

    return (
      <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: '800', margin: 0 }}>Audit Log — {businessName}</h2>
            <p style={{ fontSize: '12px', color: 'var(--muted)', margin: '4px 0 0' }}>
              Business ID: <strong style={{ color: '#4f46e5' }}>{businessId}</strong> &nbsp;·&nbsp; Owner: <strong>{businessOwner}</strong>
            </p>
          </div>
          <span style={{
            fontSize: '11px', fontWeight: '700', padding: '3px 10px',
            borderRadius: '999px', background: statusColor + '1a', color: statusColor,
            border: `1px solid ${statusColor}33`
          }}>
            {businessStatus}
          </span>
        </div>

        {/* Log Entries */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
          {auditEntries.map((entry, idx) => (
            <div
              key={entry.id}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: '12px',
                padding: '12px 0',
                borderBottom: idx < auditEntries.length - 1 ? '1.5px solid #25108f' : 'none',
              }}
            >
              {/* Left dot indicator */}
              <div style={{
                width: '8px', height: '8px', borderRadius: '50%',
                background: entry.color, marginTop: '5px', flexShrink: 0
              }} />

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '3px' }}>
                  <span style={{
                    fontFamily: "var(--materio-space)", fontWeight: '700', fontSize: '11px', color: entry.color
                  }}>{entry.id}</span>
                  <span style={{
                    fontSize: '10px', fontWeight: '700', padding: '1px 7px',
                    borderRadius: '4px', background: entry.tagBg, color: entry.tagText
                  }}>{entry.tag}</span>
                  <span style={{
                    fontSize: '10px', fontWeight: '700',
                    color: entry.statusColor,
                    display: 'flex', alignItems: 'center', gap: '4px'
                  }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: entry.statusColor, display: 'inline-block' }} />
                    {entry.status}
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: '12px', fontWeight: '600', color: 'var(--text)', lineHeight: '1.5' }}>
                  {entry.action}
                </p>
                <div style={{ display: 'flex', gap: '12px', marginTop: '4px', fontSize: '11px', color: 'var(--muted)' }}>
                  <span>🕐 {entry.time}</span>
                  <span>👤 {entry.actor}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer summary */}
        <div style={{
          borderTop: '1.5px solid #25108f', paddingTop: '14px',
          display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px',
          fontSize: '11px', color: 'var(--muted)'
        }}>
          <span>Showing <strong style={{ color: 'var(--text)' }}>{auditEntries.length} entries</strong> for {businessName}</span>
          <span style={{ color: '#4f46e5', fontWeight: '700', cursor: 'pointer' }} onClick={() => navigate(ROUTES.businessAuditLogs)}>View Full Audit History →</span>
        </div>
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeSubTab) {
      case 'Overview':
        return renderOverview();
      case 'Owner':
        return renderOwner();
      case 'Documents':
        return renderDocuments();
      case 'Branches':
        return renderBranches();
      case 'Services':
        return renderServices();
      case 'Employees':
        return renderEmployees();
      case 'Revenue':
        return renderRevenue();
      case 'Reviews':
        return renderReviews();
      case 'Compliance':
        return renderCompliance();
      case 'Timeline':
        return renderTimeline();
      case 'Audit Logs':
        return renderAuditLogs();
      default:
        return renderOverview();
    }
  };

  return (
    <AdminShell
      activeTab="Business"
      headerTitle="Business Registry"
      headerTabs={<BusinessHeaderTabs activeTab="Directory" />}
      searchPlaceholder="Search in businesses..."
    >
      <div className="business-details-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Breadcrumbs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '700', color: 'var(--muted)' }}>
          <span style={{ cursor: 'pointer' }} onClick={() => navigate(ROUTES.business)}>Directory</span>
          <ChevronRight size={14} />
          <span style={{ color: '#0f172a' }}>{businessName}</span>
        </div>

        {/* Business Hero Banner Card */}
        <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '10px', background: '#dbeafe', color: '#1e40af', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="3" width="15" height="13" />
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h1 style={{ fontSize: '20px', fontWeight: '800', margin: 0, color: 'var(--text)' }}>{businessName}</h1>
                <span style={{
                  fontSize: '10px',
                  fontWeight: '800',
                  color: businessStatus === 'Active' ? '#10b981' : businessStatus === 'Pending' ? '#b45309' : '#ef4444',
                  background: businessStatus === 'Active' ? '#ecfdf5' : businessStatus === 'Pending' ? '#fef3c7' : '#fee2e2',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <span style={{ height: '6px', width: '6px', borderRadius: '50%', background: businessStatus === 'Active' ? '#10b981' : businessStatus === 'Pending' ? '#b45309' : '#ef4444' }} />
                  {businessStatus || 'Active'}
                </span>
              </div>
              <div style={{ display: 'flex', gap: 'var(--spacing-section)', marginTop: '8px', fontSize: '11px', fontWeight: '700', color: 'var(--muted)', flexWrap: 'wrap' }}>
                <div>BUSINESS ID: <span style={{ color: 'var(--text)' }}>{businessId}</span></div>
                <div>CATEGORY: <span style={{ color: 'var(--text)' }}>{businessCategory}</span></div>
                <div>REGISTRATION DATE: <span style={{ color: 'var(--text)' }}>Oct 12, 2023</span></div>
                <div>LOCATION: <span style={{ color: 'var(--text)' }}>{businessLocation}</span></div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              style={{ display: 'flex', alignItems: 'center', gap: '6px', border: 'none', background: '#0f172a', color: '#fff', fontSize: '12px', fontWeight: '700', height: '36px', padding: '0 16px', borderRadius: '6px', cursor: 'pointer' }}
              onClick={() => addToast('Opening edit profile view...', 'info')}
              type="button"
            >
              <Edit2 size={13} /> Edit Profile
            </button>
            <button
              style={{ display: 'flex', alignItems: 'center', gap: '6px', border: '1.5px solid #25108f', background: '#fff', color: 'var(--text)', fontSize: '12px', fontWeight: '700', height: '36px', padding: '0 16px', borderRadius: '6px', cursor: 'pointer' }}
              onClick={() => addToast('Opening share access permissions...', 'info')}
              type="button"
            >
              <Share2 size={13} /> Share Access
            </button>
          </div>
        </div>

        {/* 6 KPI Cards Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px' }}>
          
          <div className="panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', justifySelf: 'stretch', justifyContent: 'space-between', minHeight: '94px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: '9px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Branches</span>
              <span style={{ fontSize: '9px', fontWeight: '800', color: '#10b981', background: '#ecfdf5', padding: '1px 5px', borderRadius: '3px' }}>+2</span>
            </div>
            <strong style={{ fontSize: '20px', color: 'var(--text)', marginTop: '4px', display: 'block' }}>12</strong>
          </div>

          <div className="panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', justifySelf: 'stretch', justifyContent: 'space-between', minHeight: '94px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: '9px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Employees</span>
              <span style={{ fontSize: '9px', fontWeight: '800', color: '#10b981', background: '#ecfdf5', padding: '1px 5px', borderRadius: '3px' }}>+12%</span>
            </div>
            <strong style={{ fontSize: '20px', color: 'var(--text)', marginTop: '4px', display: 'block' }}>150</strong>
          </div>

          <div className="panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', justifySelf: 'stretch', justifyContent: 'space-between', minHeight: '94px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: '9px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Services</span>
            </div>
            <strong style={{ fontSize: '20px', color: 'var(--text)', marginTop: '4px', display: 'block' }}>24</strong>
          </div>

          <div className="panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', justifySelf: 'stretch', justifyContent: 'space-between', minHeight: '94px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: '9px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Bookings</span>
              <span style={{ fontSize: '9px', fontWeight: '800', color: '#10b981', background: '#ecfdf5', padding: '1px 5px', borderRadius: '3px' }}>+8%</span>
            </div>
            <strong style={{ fontSize: '20px', color: 'var(--text)', marginTop: '4px', display: 'block' }}>1.2k</strong>
          </div>

          <div className="panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', justifySelf: 'stretch', justifyContent: 'space-between', minHeight: '94px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: '9px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Revenue</span>
              <span style={{ fontSize: '9px', fontWeight: '800', color: '#10b981', background: '#ecfdf5', padding: '1px 5px', borderRadius: '3px' }}>+15%</span>
            </div>
            <strong style={{ fontSize: '20px', color: 'var(--text)', marginTop: '4px', display: 'block' }}>$450k</strong>
          </div>

          <div className="panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', justifySelf: 'stretch', justifyContent: 'space-between', minHeight: '94px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: '9px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Rating</span>
              <span style={{ fontSize: '9px', color: '#f59e0b', display: 'flex', alignItems: 'center' }}><Star size={10} fill="#f59e0b" /> 4.8/5</span>
            </div>
            <strong style={{ fontSize: '20px', color: 'var(--text)', marginTop: '4px', display: 'block' }}>4.8</strong>
          </div>

        </div>

        {/* Tab Selection Row */}
        <div style={{ display: 'flex', borderBottom: '1.5px solid #25108f', gap: 'var(--spacing-section)', overflowY: 'auto', maxHeight: '400px', paddingBottom: '2px' }}>
          {subTabs.map((tab) => {
            const isActive = activeSubTab === tab;
            return (
              <button
                key={tab}
                onClick={() => handleSubTabClick(tab)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  borderBottom: isActive ? '2px solid #4f46e5' : '2px solid transparent',
                  padding: '8px 4px',
                  color: isActive ? '#4f46e5' : 'var(--muted)',
                  fontWeight: '700',
                  fontSize: '13px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  outline: 'none',
                  transition: 'all 0.15s ease'
                }}
                type="button"
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Dynamic sub tab layout overview */}
        {renderTabContent()}

      </div>
    </AdminShell>
  );
}


