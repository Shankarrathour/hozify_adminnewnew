import React from 'react';

export default function StatusBadge({ status, className = '' }) {
  if (!status) return null;
  
  const s = String(status).toLowerCase();
  
  let colorClass = 'gray'; // default
  
  if (['active', 'paid', 'success', 'completed'].includes(s)) {
    colorClass = 'green';
  } else if (['pending', 'in progress'].includes(s)) {
    colorClass = 'orange';
  } else if (['approved', 'verified', 'resolved'].includes(s)) {
    colorClass = 'emerald';
  } else if (['processing', 'open'].includes(s)) {
    colorClass = 'blue';
  } else if (['failed', 'unpaid', 'rejected', 'error', 'locked'].includes(s)) {
    colorClass = 'red';
  } else if (['cancelled', 'inactive', 'suspended', 'closed'].includes(s)) {
    colorClass = 'gray';
  }
  
  return (
    <span className={`premium-status-badge badge-${colorClass} ${className}`}>
      {status}
    </span>
  );
}
