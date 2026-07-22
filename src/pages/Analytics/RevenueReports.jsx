import React, { useState } from 'react';
import AdminShell from '../../components/layouts/AdminShell';
import { downloadDummyPDF } from '../../utils/downloadHelper';
import {
  Calendar,
  TrendingUp,
  Download,
  FileText,
  DollarSign,
  ChevronRight,
  BarChart2,
  PieChart,
  ArrowRight
} from 'lucide-react';

/* ─────────────── STATIC DATA ─────────────── */
const KPI_CARDS = [
  { id: 'gross', label: 'GROSS REVENUE', value: '$1,248,500.00', growth: '+12.4%', isPositive: true, sub: 'vs. previous period', icon: TrendingUp },
  { id: 'net', label: 'NET REVENUE', value: '$982,340.00', growth: '+8.1%', isPositive: true, sub: 'vs. previous period', icon: DollarSign },
  { id: 'tax', label: 'TAX PROVISION', value: '$266,160.00', sub: 'Total Tax Liability (21.3%)', icon: FileText }
];

const SERVICE_CATEGORIES = [
  { name: 'Enterprise Software', val: '$542,000', pct: 42 },
  { name: 'Consulting Services', val: '$325,000', pct: 26 },
  { name: 'Hardware & Support', val: '$210,000', pct: 17 },
  { name: 'Maintenance Fees', val: '$171,500', pct: 14 }
];

const REVENUE_TREND_DATA = [
  { month: 'Jan', gross: 60, net: 45 },
  { month: 'Feb', gross: 80, net: 65 },
  { month: 'Mar', gross: 75, net: 60 },
  { month: 'Apr', gross: 95, net: 75 },
  { month: 'May', gross: 110, net: 85 },
  { month: 'Jun', gross: 130, net: 100 }
];

const TRANSACTIONS = [
  { entity: 'Nexus Corp', service: 'SaaS Enterprise License', date: 'Oct 12, 2023', amount: '$42,500.00', status: 'SETTLED', statusColor: '#10b981', statusBg: '#ecfdf5' },
  { entity: 'Vantage Global', service: 'Strategy Consulting', date: 'Oct 10, 2023', amount: '$18,200.00', status: 'SETTLED', statusColor: '#10b981', statusBg: '#ecfdf5' },
  { entity: 'Solstice Systems', service: 'Infrastructure Setup', date: 'Oct 08, 2023', amount: '$75,000.00', status: 'PENDING', statusColor: '#f59e0b', statusBg: '#fffbeb' }
];

/* ─────────────── MAIN PAGE ─────────────── */
export default function RevenueReports() {
  const maxGross = 150; // Just for chart scaling

  return (
    <AdminShell activeTab="Reports & Analytics" searchPlaceholder="Search export..." headerTitle="Revenue Reports">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: "'Inter', sans-serif" }}>

        {/* ── BREADCRUMB & HEADER ── */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            <span>Financial</span> <ChevronRight size={12} /> <span style={{ color: '#0f172a' }}>Revenue Reports</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#0f172a', margin: 0, lineHeight: 1.2 }}>Revenue Analytics</h1>
            
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <button style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 16px', fontSize: '13px', fontWeight: '600', color: '#334155', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
                <Calendar size={16} color="#64748b" /> Last 30 Days
              </button>
              <button 
                onClick={() => downloadDummyPDF('Revenue Reports', 'Total Revenue: ₹14.2B\nPlatform Earnings: ₹1.4B\nSuccess rate: 99.8%')}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#1e1b4b', border: 'none', borderRadius: '8px', padding: '10px 16px', fontSize: '13px', fontWeight: '600', color: '#fff', cursor: 'pointer', boxShadow: '0 4px 10px rgba(30,27,75,0.2)' }}
              >
                <Download size={16} color="#fff" /> Generate Report
              </button>
            </div>
          </div>
        </div>

        {/* ── KPI CARDS ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {KPI_CARDS.map(card => {
            const Icon = card.icon;
            return (
              <div 
                key={card.id} 
                className="report-kpi-card"
                style={{ background: '#fff', borderRadius: '12px', padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative' }}
              >
                <div style={{ position: 'absolute', top: '24px', right: '24px', width: '32px', height: '32px', background: '#f8fafc', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569', border: '1px solid #e2e8f0' }}>
                  <Icon size={16} />
                </div>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{card.label}</span>
                <div style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a', lineHeight: 1, marginTop: '4px' }}>{card.value}</div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
                  {card.growth && (
                    <span style={{ fontSize: '12px', fontWeight: '700', color: card.isPositive ? '#10b981' : '#ef4444' }}>
                      {card.growth}
                    </span>
                  )}
                  <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>{card.sub}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── ROW 2: Charts & Categories ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '20px', alignItems: 'stretch' }}>
          
          {/* Revenue Trend Chart */}
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: 'var(--spacing-section)', boxShadow: '0 1px 3px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
              <h2 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>Revenue Trend</h2>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0f172a' }} />
                  <span style={{ fontSize: '12px', fontWeight: '600', color: '#475569' }}>Gross</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#94a3b8' }} />
                  <span style={{ fontSize: '12px', fontWeight: '600', color: '#475569' }}>Net</span>
                </div>
              </div>
            </div>
            
            {/* Simulated Line Chart Structure */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end', height: '220px', paddingBottom: '10px' }}>
              {REVENUE_TREND_DATA.map((d, i) => {
                const hGross = (d.gross / maxGross) * 100;
                const hNet = (d.net / maxGross) * 100;
                return (
                  <div key={d.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', position: 'relative' }}>
                    {/* Visualizing line chart nodes using positioning */}
                    <div style={{ position: 'absolute', bottom: `${hGross}%`, width: '10px', height: '10px', borderRadius: '50%', background: '#0f172a', border: '2px solid #fff', zIndex: 2 }} />
                    <div style={{ position: 'absolute', bottom: `${hNet}%`, width: '10px', height: '10px', borderRadius: '50%', background: '#94a3b8', border: '2px solid #fff', zIndex: 1 }} />
                    
                    {/* Fake connecting lines would go here via SVG ideally, omitting for raw HTML approximation */}
                    
                    <span style={{ position: 'absolute', bottom: '-20px', fontSize: '11px', fontWeight: '600', color: '#64748b' }}>{d.month}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Service Categories */}
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: 'var(--spacing-section)', boxShadow: '0 1px 3px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ margin: '0 0 24px', fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>Service Categories</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 1 }}>
              {SERVICE_CATEGORIES.map(cat => (
                <div key={cat.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>{cat.name}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>{cat.val}</span>
                      <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '600' }}>({cat.pct}%)</span>
                    </div>
                  </div>
                  <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '3px' }}>
                    <div style={{ width: `${cat.pct}%`, height: '100%', background: '#0f172a', borderRadius: '3px' }} />
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 'auto', paddingTop: '20px', textAlign: 'center' }}>
              <button style={{ background: 'transparent', border: 'none', color: '#0f172a', fontSize: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center', width: '100%' }}>
                View Full Breakdown <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* ── ROW 3: Tax & Projection ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '45% 1fr', gap: '20px', alignItems: 'stretch' }}>
          
          {/* Tax Distribution */}
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: 'var(--spacing-section)', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <h2 style={{ margin: '0 0 24px', fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>Tax Distribution</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0f172a' }} />
                  <span style={{ fontSize: '13px', fontWeight: '500', color: '#475569' }}>Federal Tax</span>
                </div>
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>$185,200.00</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#64748b' }} />
                  <span style={{ fontSize: '13px', fontWeight: '500', color: '#475569' }}>State/Regional</span>
                </div>
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>$48,560.00</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#94a3b8' }} />
                  <span style={{ fontSize: '13px', fontWeight: '500', color: '#475569' }}>VAT/Sales Tax</span>
                </div>
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>$32,400.00</span>
              </div>
            </div>

            <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px dashed #cbd5e1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: '600', color: '#64748b' }}>Effective Tax Rate</span>
              <span style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a' }}>21.32%</span>
            </div>
          </div>

          {/* Quarterly Projection */}
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: 'var(--spacing-section)', boxShadow: '0 1px 3px rgba(0,0,0,0.02)', position: 'relative', overflow: 'hidden' }}>
            {/* Abstract Background M/Chart shape */}
            <div style={{ position: 'absolute', bottom: '-40px', right: '-20px', opacity: 0.05, fontSize: '200px', fontWeight: '900', color: '#0f172a', lineHeight: 1, pointerEvents: 'none' }}>
              M
            </div>
            
            <h2 style={{ margin: '0 0 8px', fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>Quarterly Projection</h2>
            <p style={{ margin: '0 0 32px', fontSize: '13px', color: '#64748b', lineHeight: 1.5, maxWidth: '80%' }}>
              Estimated revenue growth based on current velocity and seasonal adjustments.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
              {/* TARGET Q3 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>TARGET Q3</span>
                <span style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a', lineHeight: 1 }}>$1.5M</span>
                <div style={{ height: '4px', background: '#f1f5f9', borderRadius: '2px', marginTop: '8px' }}>
                  <div style={{ width: '82%', height: '100%', background: '#10b981', borderRadius: '2px' }} />
                </div>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#10b981' }}>82% of target achieved</span>
              </div>

              {/* PROJECTED ANNUAL */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>PROJECTED ANNUAL</span>
                <span style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a', lineHeight: 1 }}>$5.8M</span>
                <div style={{ height: '4px', background: '#f1f5f9', borderRadius: '2px', marginTop: '8px' }}>
                  <div style={{ width: '100%', height: '100%', background: '#0f172a', borderRadius: '2px' }} />
                </div>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#0f172a' }}>On track for 2024</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── ROW 4: Table ── */}
        <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <div style={{ padding: 'var(--spacing-section)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9' }}>
            <h2 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>High-Value Transactions</h2>
            <button style={{ background: 'transparent', border: 'none', fontSize: '12px', fontWeight: '700', color: '#0f172a', cursor: 'pointer' }}>
              View Ledger
            </button>
          </div>
          
          <div style={{ overflowY: 'auto', maxHeight: '400px', padding: '0 8px 8px' }}>
            <div className="table-responsive-wrapper">
<table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr>
                  {['Entity', 'Service', 'Date', 'Amount', 'Status'].map(col => (
                    <th key={col} style={{ padding: '16px', fontSize: '10px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TRANSACTIONS.map((row, i) => (
                  <tr key={i} style={{ borderBottom: i < TRANSACTIONS.length - 1 ? '1px solid #f8fafc' : 'none' }}>
                    <td style={{ padding: '16px', fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>{row.entity}</td>
                    <td style={{ padding: '16px', fontSize: '13px', color: '#475569', fontWeight: '500' }}>{row.service}</td>
                    <td style={{ padding: '16px', fontSize: '13px', color: '#475569', fontWeight: '500' }}>{row.date}</td>
                    <td style={{ padding: '16px', fontSize: '13px', fontWeight: '800', color: '#0f172a' }}>{row.amount}</td>
                    <td style={{ padding: '16px' }}>
                      <span style={{ background: row.statusBg, color: row.statusColor, fontSize: '9px', fontWeight: '800', padding: '4px 10px', borderRadius: '12px', letterSpacing: '0.5px' }}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
</div>
          </div>
        </div>

      </div>
    </AdminShell>
  );
}
