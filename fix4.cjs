const fs = require('fs');
const path = 'src/pages/Users/index.jsx';

// 1. Restore HEAD version
let content = fs.readFileSync('Users_HEAD.jsx', 'utf8');

// 2. Add Imports
const importsTarget = `import GlobalDashboardFilters from '../../components/common/GlobalDashboardFilters';`;
const importsReplacement = `import GlobalDashboardFilters from '../../components/common/GlobalDashboardFilters';
import ExportReportModal from '../../components/common/ExportReportModal';
import { useDashboardFilters } from '../../contexts/DashboardFilterContext';
import { applyFilterToNumber } from '../../utils/filterEngine';
import { Download } from 'lucide-react';`;
content = content.replace(importsTarget, importsReplacement);

// 3. Add state and context
const stateTarget = `  const [drawerUser, setDrawerUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [feedback, setFeedback] = useState('');`;
const stateReplacement = `  const { filters: globalFilters } = useDashboardFilters();
  const [drawerUser, setDrawerUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);`;
content = content.replace(stateTarget, stateReplacement);

// 4. Update Summary
const summaryTarget = `  const summary = useMemo(() => ({
    total: users.length,
    active: users.filter((user) => user.status === 'Active').length,
    suspended: users.filter((user) => user.status === 'Suspended').length,
    blocked: users.filter((user) => user.status === 'Blocked').length
  }), [users]);`;
const summaryReplacement = `  const summary = useMemo(() => ({
    total: applyFilterToNumber(users.length, globalFilters),
    active: applyFilterToNumber(users.filter((user) => user.status === 'Active').length, globalFilters),
    suspended: applyFilterToNumber(users.filter((user) => user.status === 'Suspended').length, globalFilters),
    blocked: applyFilterToNumber(users.filter((user) => user.status === 'Blocked').length, globalFilters)
  }), [users, globalFilters]);`;
content = content.replace(summaryTarget, summaryReplacement);

// 5. Update Filtering Logic
const filterTarget = `  const filteredUsers = useMemo(() => {
    const query = normalize(filters.search);

    return users.filter((user) => {
      const matchesSearch = !query || 
        normalize(user.name).includes(query) || 
        normalize(user.email).includes(query) || 
        normalize(user.mobile).includes(query);
      const matchesStatus = filters.status === 'All' || user.status === filters.status;

      return matchesSearch && matchesStatus;
    });
  }, [filters, users]);`;
const filterReplacement = `  const filteredUsers = useMemo(() => {
    const query = normalize(filters.search);
    const selectedCity = globalFilters.city !== 'All Cities' ? normalize(globalFilters.city) : '';

    return users.filter((user) => {
      const matchesSearch = !query || 
        normalize(user.name).includes(query) || 
        normalize(user.email).includes(query) || 
        normalize(user.mobile).includes(query);
      const matchesStatus = filters.status === 'All' || user.status === filters.status;
      
      const matchesCity = !selectedCity || user.addresses?.some(addr => normalize(addr).includes(selectedCity));

      return matchesSearch && matchesStatus && matchesCity;
    });
  }, [filters, users, globalFilters.city]);`;
content = content.replace(filterTarget, filterReplacement);

// 6. Update Export Button
const exportTarget = `                  background: 'var(--materio-surface)'
                }}
              />
            </div>
          </div>`;
const exportReplacement = `                  background: 'var(--materio-surface)'
                }}
              />
              <button 
                onClick={() => setIsExportModalOpen(true)}
                className="btn-materio btn-materio-primary"
                style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <Download size={16} /> Export
              </button>
            </div>
          </div>`;
content = content.replace(exportTarget, exportReplacement);

// 7. Update bottom (modal and drawer)
// Looking at the original file (pre-drawer), wait: in HEAD the drawer was already there!
// The diff shows that I added `<ExportReportModal>` before `</AdminShell>`.
// So we just replace `</AdminShell>` with the modal and `</AdminShell>`.

const bottomTarget = `      <UserEditModal user={editingUser} onClose={() => setEditingUser(null)} onSave={saveEditedUser} />
    </AdminShell>`;
const bottomReplacement = `      <UserEditModal 
        user={editingUser} 
        onClose={() => setEditingUser(null)} 
        onSave={saveEditedUser} 
      />

      <ExportReportModal 
        isOpen={isExportModalOpen} 
        onClose={() => setIsExportModalOpen(false)} 
        entityName="Customers" 
        data={filteredUsers} 
      />
    </AdminShell>`;
content = content.replace(bottomTarget, bottomReplacement);

fs.writeFileSync(path, content);
console.log('Successfully reconstructed Users/index.jsx from HEAD!');
