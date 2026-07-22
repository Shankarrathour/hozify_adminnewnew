const fs = require('fs');
let content = fs.readFileSync('src/pages/Services/ServicesOverviewDashboard.jsx', 'utf8');

const tableSearch = `                    <thead>
                      <tr>
                        <th>Service ID</th>
                        <th>Service Name</th>
                        <th>Category</th>
                        <th>Sub Category</th>
                        <th>Created On</th>
                        <th>Status</th>
                        <th style={{ textAlign:'center' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {RECENT_SERVICES.map((r, i) => (
                        <tr key={i}>
                          <td style={{ color:'#2563eb', fontWeight:700 }}>{r.id}</td>
                          <td style={{ fontWeight:700, color:'#0f172a' }}>{r.name}</td>
                          <td style={{ color:'#475569' }}>{r.cat}</td>
                          <td style={{ color:'#64748b' }}>{r.subcat}</td>
                          <td style={{ color:'#64748b' }}>{r.created}</td>
                          <td>
                            <span className={\`sd-badge \${r.status === 'Active' ? 'sd-b-green' : r.status === 'Inactive' ? 'sd-b-yellow' : 'sd-b-red'}\`}>
                              {r.status}
                            </span>
                          </td>
                          <td style={{ textAlign:'center' }}>
                            <div style={{ display:'flex', gap:5, justifyContent:'center' }}>
                              <button style={{ border:'none', background:'#eff6ff', color:'#2563eb', width:26, height:26, borderRadius:6, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}><Eye size={12} /></button>
                              <button style={{ border:'none', background:'#f8fafc', color:'#64748b', width:26, height:26, borderRadius:6, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}><Settings size={12} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>`;

const tableReplace = `                    {(() => {
                      let data = [];
                      if (viewAllModal === 'topServices') data = TOP_SERVICES;
                      else if (viewAllModal === 'trending') data = TRENDING_DATA;
                      else if (viewAllModal === 'ratings') data = USER_RATINGS;
                      else if (viewAllModal === 'category') data = CATEGORY_DATA;
                      else if (viewAllModal === 'status') data = STATUS_DATA;
                      else if (viewAllModal === 'payment') data = PAYMENT_DATA;
                      else if (viewAllModal === 'topLevel') data = TOP_LEVEL;
                      else if (viewAllModal === 'spServices') data = SP_SERVICES;
                      else if (viewAllModal === 'sellerServices') data = SELLER_SERVICES;
                      else if (viewAllModal === 'recentServices') data = RECENT_SERVICES;

                      if (!data.length) return <tbody><tr><td style={{padding: 20, textAlign: 'center'}}>No data available</td></tr></tbody>;

                      if (viewAllModal === 'recentServices') {
                        return (
                          <>
                            <thead>
                              <tr>
                                <th>Service ID</th>
                                <th>Service Name</th>
                                <th>Category</th>
                                <th>Sub Category</th>
                                <th>Created On</th>
                                <th>Status</th>
                                <th style={{ textAlign:'center' }}>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data.map((r, i) => (
                                <tr key={i}>
                                  <td style={{ color:'#2563eb', fontWeight:700 }}>{r.id}</td>
                                  <td style={{ fontWeight:700, color:'#0f172a' }}>{r.name}</td>
                                  <td style={{ color:'#475569' }}>{r.cat}</td>
                                  <td style={{ color:'#64748b' }}>{r.subcat}</td>
                                  <td style={{ color:'#64748b' }}>{r.created}</td>
                                  <td>
                                    <span className={\`sd-badge \${r.status === 'Active' ? 'sd-b-green' : r.status === 'Inactive' ? 'sd-b-yellow' : 'sd-b-red'}\`}>
                                      {r.status}
                                    </span>
                                  </td>
                                  <td style={{ textAlign:'center' }}>
                                    <div style={{ display:'flex', gap:5, justifyContent:'center' }}>
                                      <button style={{ border:'none', background:'#eff6ff', color:'#2563eb', width:26, height:26, borderRadius:6, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}><Eye size={12} /></button>
                                      <button style={{ border:'none', background:'#f8fafc', color:'#64748b', width:26, height:26, borderRadius:6, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}><Settings size={12} /></button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </>
                        );
                      }

                      const keys = Object.keys(data[0]);
                      return (
                        <>
                          <thead>
                            <tr>
                              {keys.map(k => <th key={k} style={{ textTransform: 'capitalize' }}>{k}</th>)}
                            </tr>
                          </thead>
                          <tbody>
                            {data.map((r, i) => (
                              <tr key={i}>
                                {keys.map(k => (
                                  <td key={k} style={{ fontWeight: typeof r[k] === 'number' ? 700 : 500 }}>
                                    {r[k]}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </>
                      );
                    })()}`;

content = content.replace(tableSearch, tableReplace);

fs.writeFileSync('src/pages/Services/ServicesOverviewDashboard.jsx', content);
console.log('done!');
