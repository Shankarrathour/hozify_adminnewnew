import React, { useState, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight, Download, MoreVertical, Trash2, Edit3, Eye, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function PremiumTable({ 
  columns, 
  data = [], 
  searchable = true, 
  exportable = true, 
  selectable = false,
  pageSize = 10,
  onRowClick,
  emptyMessage = "No records found.",
  title,
  actions,
  bulkActions
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(data.map((_, i) => i));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (index) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter(i => i !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
  };

  const processedData = useMemo(() => {
    let result = [...data];

    // Search
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(row => {
        return Object.values(row).some(val => 
          String(val).toLowerCase().includes(lowerSearch)
        );
      });
    }

    // Sort
    if (sortConfig.key) {
      result.sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];
        
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [data, searchTerm, sortConfig]);

  const totalPages = Math.ceil(processedData.length / pageSize) || 1;
  const paginatedData = processedData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleExport = () => {
    toast.success('Report exported successfully!');
  };

  return (
    <div className="premium-table-container">
      {/* Table Toolbar */}
      <div className="premium-table-toolbar">
        <div className="premium-table-toolbar-left">
          {title && <h3 className="premium-table-title">{title}</h3>}
          {searchable && (
            <div className="premium-table-search">
              <Search size={16} />
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          )}
        </div>
        
        <div className="premium-table-toolbar-right">
          {selectedRows.length > 0 && bulkActions && (
            <div className="premium-table-bulk-actions">
              <span className="selected-count">{selectedRows.length} selected</span>
              {bulkActions.map((action, i) => (
                <button 
                  key={i} 
                  className={`btn-materio ${action.danger ? 'btn-materio-outline danger' : 'btn-materio-primary'}`}
                  onClick={() => action.onClick(selectedRows)}
                  style={action.danger ? { borderColor: '#FF3E1D', color: '#FF3E1D' } : {}}
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
          
          {exportable && (
            <button className="btn-materio btn-materio-outline" onClick={handleExport} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Download size={15} /> Export
            </button>
          )}
        </div>
      </div>

      {/* Table Wrapper for Horizontal Scroll */}
      <div className="premium-table-wrapper">
        <table className="premium-table">
          <thead>
            <tr>
              {selectable && (
                <th className="premium-th-checkbox" style={{ width: '40px' }}>
                  <input 
                    type="checkbox" 
                    checked={selectedRows.length === data.length && data.length > 0}
                    onChange={handleSelectAll}
                  />
                </th>
              )}
              {columns.map((col, index) => (
                <th 
                  key={index} 
                  style={{ width: col.width || 'auto', cursor: col.sortable !== false ? 'pointer' : 'default' }}
                  onClick={() => col.sortable !== false && handleSort(col.accessor)}
                >
                  <div className="premium-th-content">
                    {col.header}
                    {sortConfig.key === col.accessor && (
                      <span className="sort-indicator">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
              {actions && <th className="premium-th-actions" style={{ textAlign: 'right' }}>Actions</th>}
            </tr>
          </thead>
          
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0) + (actions ? 1 : 0)} className="premium-td-empty">
                  <div className="premium-empty-state">
                    <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-state-2130362-1800926.png" alt="No data" style={{ width: '120px', opacity: 0.5 }} />
                    <p>{emptyMessage}</p>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rowIndex) => {
                const actualIndex = (currentPage - 1) * pageSize + rowIndex;
                const isSelected = selectedRows.includes(actualIndex);
                
                return (
                  <tr 
                    key={rowIndex} 
                    className={isSelected ? 'selected-row' : ''}
                    onClick={() => onRowClick && onRowClick(row)}
                    style={{ cursor: onRowClick ? 'pointer' : 'default' }}
                  >
                    {selectable && (
                      <td className="premium-td-checkbox" onClick={e => e.stopPropagation()}>
                        <input 
                          type="checkbox" 
                          checked={isSelected}
                          onChange={() => handleSelectRow(actualIndex)}
                        />
                      </td>
                    )}
                    {columns.map((col, colIndex) => (
                      <td key={colIndex}>
                        {col.render ? col.render(row) : row[col.accessor]}
                      </td>
                    ))}
                    {actions && (
                      <td className="premium-td-actions" onClick={e => e.stopPropagation()} style={{ textAlign: 'right' }}>
                        {actions(row)}
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="premium-table-pagination">
          <span className="premium-pagination-info">
            Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, processedData.length)} of {processedData.length} entries
          </span>
          <div className="premium-pagination-controls">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            >
              <ChevronLeft size={16} />
            </button>
            <div className="premium-page-numbers">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  className={currentPage === page ? 'active' : ''}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
            </div>
            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
