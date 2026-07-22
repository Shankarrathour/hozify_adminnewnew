import { 
  Users, UserCheck, FileBarChart2, Database, BarChart2, Settings2,
  Lock, AlertTriangle, Shield, Download, UserX 
} from 'lucide-react';

export const teamsOverview = [
  { name: 'Operations Team', lead: 'Priya Sharma', members: 48, active: 42, status: 'Active' },
  { name: 'Support Team', lead: 'Ramesh Kumar', members: 32, active: 28, status: 'Active' },
  { name: 'Finance Team', lead: 'Anil Verma', members: 24, active: 20, status: 'Active' },
  { name: 'Analytics Team', lead: 'Neha Singh', members: 20, active: 17, status: 'Active' },
  { name: 'IT Team', lead: 'Vikram Patel', members: 18, active: 15, status: 'Active' },
  { name: 'Compliance Team', lead: 'Sanjay Reddy', members: 14, active: 9, status: 'Inactive' },
];

export const recentActivity = [
  { name: 'Ramesh Kumar', team: 'Support Team', action: 'Viewed', module: 'User Management', ip: '192.168.1.45', time: '31 May 2026 10:24 AM', actionType: 'view' },
  { name: 'Priya Sharma', team: 'Operations Team', action: 'Updated', module: 'Partner Dashboard', ip: '192.168.1.12', time: '31 May 2026 10:05 AM', actionType: 'update' },
  { name: 'Anil Verma', team: 'Finance Team', action: 'Deleted', module: 'Transaction Logs', ip: '192.168.1.33', time: '31 May 2026 09:30 AM', actionType: 'delete' },
  { name: 'Neha Singh', team: 'Analytics Team', action: 'Exported', module: 'Reports & Analytics', ip: '192.168.1.67', time: '31 May 2026 08:55 AM', actionType: 'export' },
  { name: 'Vikram Patel', team: 'IT Team', action: 'Created', module: 'System Settings', ip: '192.168.1.21', time: '31 May 2026 08:30 AM', actionType: 'create' },
];

export const moduleAccess = [
  { name: 'User Management', icon: Users, totalRoles: 15, totalAdmins: 98, active: 90, inactive: 8 },
  { name: 'Partner Management', icon: UserCheck, totalRoles: 14, totalAdmins: 87, active: 78, inactive: 9 },
  { name: 'Bookings Management', icon: FileBarChart2, totalRoles: 12, totalAdmins: 74, active: 66, inactive: 8 },
  { name: 'Finance & Wallet', icon: Database, totalRoles: 10, totalAdmins: 62, active: 56, inactive: 6 },
  { name: 'Reports & Analytics', icon: BarChart2, totalRoles: 12, totalAdmins: 71, active: 64, inactive: 7 },
  { name: 'System Settings', icon: Settings2, totalRoles: 8, totalAdmins: 45, active: 38, inactive: 7 },
];

export const securityAlerts = [
  { type: 'Failed Login Attempts', icon: Lock, desc: 'Multiple failed login attempts', count: 12, status: 'High', time: '31 May 2026 10:18 AM' },
  { type: 'Unusual Login Location', icon: AlertTriangle, desc: 'Login from unrecognized location', count: 5, status: 'Medium', time: '31 May 2026 09:32 AM' },
  { type: 'Permission Changes', icon: Shield, desc: 'Critical permission changes', count: 3, status: 'Medium', time: '31 May 2026 08:41 AM' },
  { type: 'Data Export', icon: Download, desc: 'Bulk data export activity', count: 2, status: 'Low', time: '31 May 2026 07:55 AM' },
  { type: 'Account Locked', icon: UserX, desc: 'Admin account locked', count: 1, status: 'High', time: '31 May 2026 07:20 AM' },
];
