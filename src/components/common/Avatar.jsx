import React, { useMemo } from 'react';

const COLORS = [
  '#fecaca', '#fde68a', '#d9f99d', '#bbf7d0', 
  '#a7f3d0', '#99f6e4', '#a5f3fc', '#bae6fd', 
  '#c7d2fe', '#ddd6fe', '#fbcfe8', '#fecdd3'
];

const TEXT_COLORS = [
  '#991b1b', '#92400e', '#3f6212', '#166534', 
  '#065f46', '#0f766e', '#155e75', '#0369a1', 
  '#3730a3', '#5b21b6', '#86198f', '#9f1239'
];

export default function Avatar({ src, name, size = 40, className = '', onClick }) {
  const initials = useMemo(() => {
    if (!name) return '??';
    const parts = name.trim().split(' ').filter(Boolean);
    if (parts.length === 0) return '??';
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }, [name]);

  const colorIndex = useMemo(() => {
    if (!name) return 0;
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash) % COLORS.length;
  }, [name]);

  const style = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    fontSize: `${size * 0.4}px`,
    backgroundColor: src ? 'transparent' : COLORS[colorIndex],
    color: src ? 'inherit' : TEXT_COLORS[colorIndex],
    cursor: onClick ? 'pointer' : 'default',
    flexShrink: 0,
    border: src ? '1px solid var(--materio-border)' : 'none',
    overflow: 'hidden',
    userSelect: 'none'
  };

  return (
    <div 
      className={`premium-avatar ${className}`} 
      style={style} 
      onClick={onClick}
      title={name}
    >
      {src ? (
        <img src={src} alt={name || 'Avatar'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        initials
      )}
    </div>
  );
}
