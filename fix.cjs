const fs = require('fs');
const path = 'src/pages/Users/index.jsx';
let content = fs.readFileSync(path, 'utf8');

let lines = content.split(/\r?\n/);

const replacementLines = [
"                      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--materio-text-muted)' }}>",
"                        <span>{bk.date}</span>",
"                        <span>{bk.status}</span>",
"                      </div>",
"                    </div>",
"                  ))",
"                ) : (",
"                  <span style={{ color: 'var(--materio-text-muted)', fontSize: '13px' }}>No recent bookings</span>",
"                )}",
"              </div>",
"            </div>",
"          </div>",
"        )}",
"",
"        {drawerUser && (",
"          <div className=\"materio-drawer-footer\">",
"            <button className=\"btn-materio btn-materio-primary\" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setEditingUser(drawerUser)}>",
"              <Edit3 size={16} /> Edit Profile",
"            </button>",
"            {drawerUser.status !== 'Blocked' && (",
"              <button ",
"                className=\"btn-materio btn-materio-outline\" ",
"                style={{ flex: 1, justifyContent: 'center', borderColor: '#FF3E1D', color: '#FF3E1D' }}",
"                onClick={() => updateUserStatus(drawerUser, 'Blocked')}",
"              >",
"                <Ban size={16} /> Block",
"              </button>",
"            )}",
"            {drawerUser.status === 'Blocked' && (",
"              <button ",
"                className=\"btn-materio btn-materio-outline\" ",
"                style={{ flex: 1, justifyContent: 'center', borderColor: '#71DD37', color: '#71DD37' }}",
"                onClick={() => updateUserStatus(drawerUser, 'Active')}",
"              >",
"                <CheckCircle2 size={16} /> Activate",
"              </button>",
"            )}",
"          </div>",
"        )}",
"      </div>",
"",
"      <div style={{ padding: '16px 24px', borderTop: '1px solid var(--materio-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>"
];

// In the current array, line 446 (0-indexed 445) is:
// "                      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--materio-text-muted)' }}>"
// And line 450 (0-indexed 449) is:
// "          <div style={{ padding: '16px 24px', borderTop: '1px solid var(--materio-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>"

// We will splice out lines 445 through 449 and insert our replacementLines
lines.splice(445, 5, ...replacementLines);

fs.writeFileSync(path, lines.join('\n'));
console.log('Fixed Users/index.jsx using splice!');
