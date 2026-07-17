import React, { useState } from 'react';
import { Eye, Users } from 'lucide-react';
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

export default function EmployeeWallets() {
  const { navigate } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const employeeWallets = mockWallets.filter(w => w.type === 'Employee');

  const filteredWallets = employeeWallets.filter(w => {
    const matchesSearch = w.owner.toLowerCase().includes(searchTerm.toLowerCase()) || w.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || w.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const columns = [
    { header: 'Wallet ID', accessor: 'id', render: (w) => <strong style={{color: 'var(--text)'}}>#{w.id}</strong> },
    { 
      header: 'Employee', 
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
      header: 'Incentive Balance', 
      accessor: 'available',
      render: (w) => <strong style={{color: 'var(--text)'}}>₹{w.available.toLocaleString('en-IN')}</strong> 
    },
    { 
      header: 'Lifetime Incentives', 
      accessor: 'lifetimeEarnings',
      render: (w) => (
        <span style={{ fontWeight: '700', color: 'var(--green)' }}>
          ₹{w.lifetimeEarnings.toLocaleString('en-IN')}
        </span>
      )
    },
    { 
      header: 'Withdrawn Incentives', 
      accessor: 'lifetimeWithdrawals',
      render: (w) => (
        <span style={{ fontWeight: '700', color: 'var(--muted)' }}>
          ₹{w.lifetimeWithdrawals.toLocaleString('en-IN')}
        </span>
      )
    },
    { header: 'KYC Level', accessor: 'kyc' },
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
      Inspect Employee
    </Button>
  );

  return (
    <AdminShell
      activeTab="Wallet Management"
      brandText="HOZIFY Wallet"
      brandSubText="Global Ledger v1.2"
      searchPlaceholder="Search employee wallets..."
    >
      <div style={{ padding: 'var(--spacing-page) 0', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
        
        <PageHeader 
          title="Employee Wallets Dashboard"
          subtitle="Index of internal/contractual employee digital wallets. Disburse monthly salaries, process incentives, or review compliance profiles."
        />

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--spacing-card)' }}>
          <StatCard 
            title="Active Employee Wallets" 
            value={`${employeeWallets.length} Accounts`} 
            icon={Users} 
            color="#1e40af"
            style={{ '--primary': '#1e40af', '--primary-light': '#eff6ff' }}
          />
          <StatCard 
            title="Total Incentives Disbursed" 
            value={`₹${employeeWallets.reduce((sum, w) => sum + w.lifetimeEarnings, 0).toLocaleString('en-IN')}`} 
          />
          <StatCard 
            title="Incentive Withdrawals" 
            value={`₹${employeeWallets.reduce((sum, w) => sum + w.lifetimeWithdrawals, 0).toLocaleString('en-IN')}`} 
            color="var(--green)" 
          />
        </div>

        {/* Filter bar */}
        <FilterBar 
          searchPlaceholder="Search employee name or ID..."
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
          emptyState="No employee wallets found matching your criteria."
        />
        
      </div>
    </AdminShell>
  );
}
