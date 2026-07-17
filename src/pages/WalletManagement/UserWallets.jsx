import React, { useState } from 'react';
import { Eye, User } from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import { useApp } from '../../hooks/useApp';
import { ROUTES } from '../../config/routes';
import { mockWallets } from './data/mockData';

// Global Unified Components
import PageHeader from '../../components/ui/PageHeader';
import StatCard from '../../components/ui/StatCard';
import FilterBar from '../../components/ui/FilterBar';
import DataTable from '../../components/ui/DataTable';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

export default function UserWallets() {
  const { navigate } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const userWallets = mockWallets.filter(w => w.type === 'User');

  const filteredWallets = userWallets.filter(w => {
    const matchesSearch = w.owner.toLowerCase().includes(searchTerm.toLowerCase()) || w.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || w.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const columns = [
    { header: 'Wallet ID', accessor: 'id', render: (w) => <strong style={{color: 'var(--text)'}}>#{w.id}</strong> },
    { 
      header: 'User Owner', 
      accessor: 'owner',
      render: (w) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src={w.avatar} alt={w.owner} style={{ height: '36px', width: '36px', borderRadius: '50%', objectFit: 'cover' }} />
          <div>
            <strong style={{ display: 'block', color: 'var(--text)' }}>{w.owner}</strong>
            <span style={{ fontSize: 'var(--text-small)', color: 'var(--muted)' }}>{w.email}</span>
          </div>
        </div>
      )
    },
    { 
      header: 'Available Balance', 
      accessor: 'available',
      render: (w) => <strong style={{color: 'var(--text)'}}>₹{w.available.toLocaleString('en-IN')}</strong> 
    },
    { 
      header: 'Frozen Balance', 
      accessor: 'frozen',
      render: (w) => (
        <span style={{ fontWeight: '700', color: w.frozen > 0 ? 'var(--red)' : 'var(--muted)' }}>
          ₹{w.frozen.toLocaleString('en-IN')}
        </span>
      )
    },
    { header: 'KYC Level', accessor: 'kyc' },
    { 
      header: 'Risk Score', 
      accessor: 'riskScore',
      render: (w) => (
        <span style={{ fontWeight: '700', color: w.riskScore > 50 ? 'var(--red)' : 'var(--green)' }}>
          {w.riskScore}%
        </span>
      )
    },
    { 
      header: 'Status', 
      accessor: 'status',
      render: (w) => (
        <Badge variant={w.status === 'Active' ? 'success' : 'danger'}>
          {w.status.toUpperCase()}
        </Badge>
      )
    }
  ];

  const actions = (w) => (
    <Button 
      variant="ghost" 
      icon={Eye} 
      onClick={(e) => { e.stopPropagation(); navigate(ROUTES.walletDetails.replace(':id', w.id)); }}
    >
      View Profile
    </Button>
  );

  return (
    <AdminShell
      activeTab="Wallet Management"
      brandText="HOZIFY Wallet"
      brandSubText="Global Ledger v1.2"
      searchPlaceholder="Search user wallets..."
    >
      <div style={{ padding: 'var(--spacing-page) 0', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
        
        <PageHeader 
          title="User Wallets Dashboard"
          subtitle="Index of customer/user digital wallets. Monitor available credits, promotional balances, and customer transaction limits."
        />

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--spacing-card)' }}>
          <StatCard 
            title="Total User Wallets" 
            value={`${userWallets.length} Accounts`} 
            icon={User} 
            color="var(--primary)" 
          />
          <StatCard 
            title="Aggregated User Balances" 
            value={`₹${userWallets.reduce((sum, w) => sum + w.available, 0).toLocaleString('en-IN')}`} 
          />
          <StatCard 
            title="Frozen User Funds" 
            value={`₹${userWallets.reduce((sum, w) => sum + w.frozen, 0).toLocaleString('en-IN')}`} 
            color="var(--red)" 
          />
        </div>

        {/* Filter bar */}
        <FilterBar 
          searchPlaceholder="Search by wallet ID or user owner name..."
          onSearch={setSearchTerm}
          onFilterChange={(key, val) => setStatusFilter(val)}
          filters={[
            {
              key: 'status',
              label: 'All Statuses',
              options: [
                { label: 'Active', value: 'Active' },
                { label: 'Frozen', value: 'Frozen' }
              ]
            }
          ]}
        />

        {/* Directory Table */}
        <DataTable 
          columns={columns} 
          data={filteredWallets} 
          actions={actions}
          onRowClick={(row) => navigate(ROUTES.walletDetails.replace(':id', row.id))}
          emptyState="No user wallets found matching your criteria."
        />
        
      </div>
    </AdminShell>
  );
}
