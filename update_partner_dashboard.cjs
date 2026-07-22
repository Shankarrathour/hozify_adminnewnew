const fs = require('fs');

let content = fs.readFileSync('src/pages/Dashboard/PartnerAnalytics.jsx', 'utf8');

// 1. Add states
if (!content.includes('const [viewAllModal, setViewAllModal] = useState(null);')) {
  content = content.replace(
    "const { addToast } = useToast();",
    "const { addToast } = useToast();\n  const [viewAllModal, setViewAllModal] = useState(null);\n  const [selectedRow, setSelectedRow] = useState(null);"
  );
}

// 2. Update button onClick
content = content.replace(
  /<button onClick=\{\(\) => addToast\('Navigating to all partners\.\.\.',\s*'info'\)\} style=\{\{ background:'none', border:'none', color:'#2563eb', fontSize:11, fontWeight:600, cursor:'pointer', display:'flex', alignItems:'center', gap:4 \}\}>\s*View All Partners →\s*<\/button>/g,
  `<button onClick={() => { setViewAllModal('partners'); setSelectedRow(null); }} style={{ background:'none', border:'none', color:'#2563eb', fontSize:11, fontWeight:600, cursor:'pointer', display:'flex', alignItems:'center', gap:4 }}>View All Partners →</button>`
);

// 3. Add Eye, X imports
if (!content.includes('Eye,')) {
  content = content.replace("TrendingUp,", "TrendingUp, Eye, X,");
} else if (!content.includes('X,') && !content.includes(' X ')) {
  content = content.replace("Eye,", "Eye, X,");
}

// 4. Inject Modal Code
const modalCode = `
      {/* ════════════════════ MODAL ════════════════════ */}
      {viewAllModal && (
        <div className="sd-modal-overlay" onClick={() => { setViewAllModal(null); setSelectedRow(null); }} style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(15,23,42,0.6)',backdropFilter:'blur(4px)',zIndex:99999,display:'flex',alignItems:'center',justifyContent:'center',padding:20,animation:'fadeIn 0.2s ease-out'}}>
          <div className="sd-modal-content" onClick={e => e.stopPropagation()} style={{background:'#fff',borderRadius:16,width:'100%',maxWidth: selectedRow ? 600 : 900,maxHeight:'90vh',display:'flex',flexDirection:'column',boxShadow:'0 25px 50px -12px rgba(0,0,0,0.25)',animation:'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'}}>
            
            <div className="sd-modal-header" style={{padding:'20px 24px',borderBottom:'1px solid #e2e8f0',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div style={{display:'flex',alignItems:'center',gap:12}}>
                {selectedRow && (
                  <button onClick={() => setSelectedRow(null)} style={{background:'#f1f5f9',color:'#475569',border:'none',borderRadius:8,padding:'6px 12px',fontSize:13,fontWeight:600,cursor:'pointer',display:'flex',alignItems:'center',gap:4}}>
                    ← Back
                  </button>
                )}
                <h3 className="sd-modal-title" style={{margin:0,fontSize:18,fontWeight:700,color:'#0f172a'}}>
                  {selectedRow ? 'Record Details' : 'All Recent Partners'}
                </h3>
              </div>
              <button className="sd-modal-close" onClick={() => { setViewAllModal(null); setSelectedRow(null); }} style={{background:'transparent',border:'none',color:'#64748b',cursor:'pointer'}}><X size={18} /></button>
            </div>
            
            <div className="sd-modal-body" style={{padding:24,overflowY:'auto',flex:1}}>
              {selectedRow ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {Object.keys(selectedRow).map(k => {
                    if (k === 'icon') return null; // Skip rendering icon component
                    return (
                      <div key={k} style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingBottom: 16, borderBottom: '1px dashed #e2e8f0' }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          {k.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span style={{ fontSize: 15, fontWeight: 500, color: '#1e293b' }}>
                          {typeof selectedRow[k] === 'boolean' ? (selectedRow[k] ? 'Yes' : 'No') : selectedRow[k]}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table className="sd-rtable" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    {(() => {
                      let data = recentRegistrations;
                      if (!data.length) return <tbody><tr><td style={{padding: 20, textAlign: 'center'}}>No data available</td></tr></tbody>;
                      const keys = Object.keys(data[0]);
                      return (
                        <>
                          <thead>
                            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                              {keys.map(k => <th key={k} style={{ textTransform: 'capitalize', padding: '12px 16px', color: '#475569', fontSize: 13, fontWeight: 600 }}>{k.replace(/([A-Z])/g, ' $1').trim()}</th>)}
                              <th style={{ padding: '12px 16px', color: '#475569', fontSize: 13, fontWeight: 600, textAlign: 'right' }}>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.map((r, i) => (
                              <tr key={i} style={{ borderBottom: '1px solid #f1f5f9', cursor: 'pointer', transition: 'background 0.2s' }}
                                  onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                  onClick={() => setSelectedRow(r)}>
                                {keys.map(k => (
                                  <td key={k} style={{ padding: '12px 16px', fontSize: 13, color: '#1e293b', fontWeight: typeof r[k] === 'number' ? 700 : 500 }}>
                                    {typeof r[k] === 'boolean' ? (r[k] ? 'Yes' : 'No') : r[k]}
                                  </td>
                                ))}
                                <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                                  <button 
                                    onClick={(e) => { e.stopPropagation(); setSelectedRow(r); }}
                                    style={{
                                      background: '#e0e7ff', color: '#4f46e5', border: 'none', borderRadius: 6,
                                      padding: '6px 12px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                                      display: 'inline-flex', alignItems: 'center', gap: 4, transition: 'all 0.2s'
                                    }}
                                  >
                                    <Eye size={14} /> View
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </>
                      );
                    })()}
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <style>{\`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
      \`}</style>
`;

if (!content.includes('className="sd-modal-overlay"')) {
  content = content.replace("</AdminShell>", modalCode + "\n    </AdminShell>");
}

fs.writeFileSync('src/pages/Dashboard/PartnerAnalytics.jsx', content);
console.log('Updated PartnerAnalytics.jsx');
