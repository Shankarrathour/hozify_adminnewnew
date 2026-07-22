const fs = require('fs');
let content = fs.readFileSync('src/pages/Dashboard/AdminDashboard.jsx', 'utf8');

// Add viewAllModal state
content = content.replace("const [isExportModalOpen, setIsExportModalOpen] = useState(false);", "const [isExportModalOpen, setIsExportModalOpen] = useState(false);\n  const [viewAllModal, setViewAllModal] = useState(null);");

// Replace View All buttons
content = content.replace(
  `<button onClick={() => toast.success('Navigating to All Teams')}>View All Teams <ChevronRight size={14} /></button>`,
  `<button onClick={() => setViewAllModal('teams')}>View All Teams <ChevronRight size={14} /></button>`
);
content = content.replace(
  `<button onClick={() => toast.success('Navigating to All Activity')}>View All Activity <ChevronRight size={14} /></button>`,
  `<button onClick={() => setViewAllModal('activity')}>View All Activity <ChevronRight size={14} /></button>`
);
content = content.replace(
  `<button onClick={() => toast.success('Navigating to All Modules')}>View All Modules <ChevronRight size={14} /></button>`,
  `<button onClick={() => setViewAllModal('modules')}>View All Modules <ChevronRight size={14} /></button>`
);
content = content.replace(
  `<button onClick={() => toast.success('Navigating to All Alerts')}>View All Alerts <ChevronRight size={14} /></button>`,
  `<button onClick={() => setViewAllModal('alerts')}>View All Alerts <ChevronRight size={14} /></button>`
);

// Append Modal
const modalCode = `
      {/* ════════════════════ MODAL ════════════════════ */}
      {viewAllModal && (
        <div className="sd-modal-overlay" onClick={() => setViewAllModal(null)} style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(15,23,42,0.6)',backdropFilter:'blur(4px)',zIndex:9999,display:'flex',alignItems:'center',justifyContent:'center',padding:20}}>
          <div className="sd-modal-content" onClick={e => e.stopPropagation()} style={{background:'#fff',borderRadius:16,width:'100%',maxWidth:900,maxHeight:'90vh',display:'flex',flexDirection:'column',boxShadow:'0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)'}}>
            <div className="sd-modal-header" style={{padding:'20px 24px',borderBottom:'1px solid #e2e8f0',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <h3 className="sd-modal-title" style={{margin:0,fontSize:18,fontWeight:700,color:'#0f172a'}}>
                {viewAllModal === 'teams' ? 'All Teams' :
                 viewAllModal === 'activity' ? 'All Recent Admin Activity' :
                 viewAllModal === 'modules' ? 'All System Modules' :
                 viewAllModal === 'alerts' ? 'All Security Alerts' : 'Details'}
              </h3>
              <button className="sd-modal-close" onClick={() => setViewAllModal(null)} style={{background:'transparent',border:'none',color:'#64748b',cursor:'pointer'}}><X size={18} /></button>
            </div>
            <div className="sd-modal-body" style={{padding:24,overflowY:'auto',flex:1}}>
              <div style={{ overflowX: 'auto' }}>
                <table className="sd-rtable" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  {(() => {
                    let data = [];
                    if (viewAllModal === 'teams') data = teamsOverview;
                    else if (viewAllModal === 'activity') data = recentActivity;
                    else if (viewAllModal === 'modules') data = moduleAccess;
                    else if (viewAllModal === 'alerts') data = securityAlerts;

                    if (!data.length) return <tbody><tr><td style={{padding: 20, textAlign: 'center'}}>No data available</td></tr></tbody>;

                    const keys = Object.keys(data[0]);
                    return (
                      <>
                        <thead>
                          <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                            {keys.map(k => <th key={k} style={{ textTransform: 'capitalize', padding: '12px 16px', color: '#475569', fontSize: 13, fontWeight: 600 }}>{k}</th>)}
                          </tr>
                        </thead>
                        <tbody>
                          {data.map((r, i) => (
                            <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                              {keys.map(k => (
                                <td key={k} style={{ padding: '12px 16px', fontSize: 13, color: '#1e293b', fontWeight: typeof r[k] === 'number' ? 700 : 500 }}>
                                  {typeof r[k] === 'boolean' ? (r[k] ? 'Yes' : 'No') : r[k]}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </>
                    );
                  })()}
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
`;

content = content.replace("</AdminShell>", modalCode + "\n    </AdminShell>");

// Add X icon to lucide-react imports if it's missing and needed
if (!content.includes("X,")) {
  content = content.replace("import { ", "import { X, ");
}

fs.writeFileSync('src/pages/Dashboard/AdminDashboard.jsx', content);
console.log('done!');
