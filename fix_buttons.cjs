const fs = require('fs');
let content = fs.readFileSync('src/pages/Services/ServicesOverviewDashboard.jsx', 'utf8');

const sections = [
  { title: 'Most Booking Services', id: 'topServices' },
  { title: 'Trending Services', id: 'trending' },
  { title: 'User Ratings', id: 'ratings' },
  { title: 'Services by Category', id: 'category' },
  { title: 'Services by Status', id: 'status' },
  { title: 'Services by Payment Type', id: 'payment' },
  { title: 'Top Service Level Performance', id: 'topLevel' },
  { title: 'Service Provider Available Services', id: 'spServices' },
  { title: 'Seller Available Services', id: 'sellerServices' }
];

sections.forEach(sec => {
  const search1 = `<h2 className="sd-card-title">${sec.title}</h2>\n              <button className="sd-view-all">View All <ChevronRight size={13} /></button>`;
  const replace = `<h2 className="sd-card-title">${sec.title}</h2>\n              <button className="sd-view-all" onClick={() => setViewAllModal('${sec.id}')}>View All <ChevronRight size={13} /></button>`;
  content = content.replace(search1, replace);
});

content = content.replace(/useState\(false\)/, 'useState(null)');
content = content.replace(`onClick={() => setViewAllModal(true)}`, `onClick={() => setViewAllModal('recentServices')}`);

const oldModalStr = `{viewAllModal && (
          <div className="sd-modal-overlay" onClick={() => setViewAllModal(false)}>
            <div className="sd-modal-content" onClick={e => e.stopPropagation()}>
              <div className="sd-modal-header">
                <h3 className="sd-modal-title">All Recent Services</h3>
                <button className="sd-modal-close" onClick={() => setViewAllModal(false)}><X size={18} /></button>
              </div>`;

const newModalStr = `{viewAllModal && (
          <div className="sd-modal-overlay" onClick={() => setViewAllModal(null)}>
            <div className="sd-modal-content" onClick={e => e.stopPropagation()}>
              <div className="sd-modal-header">
                <h3 className="sd-modal-title">
                  {viewAllModal === 'topServices' ? 'Most Booking Services' :
                   viewAllModal === 'trending' ? 'Trending Services' :
                   viewAllModal === 'ratings' ? 'User Ratings' :
                   viewAllModal === 'category' ? 'Services by Category' :
                   viewAllModal === 'status' ? 'Services by Status' :
                   viewAllModal === 'payment' ? 'Services by Payment Type' :
                   viewAllModal === 'topLevel' ? 'Top Service Level Performance' :
                   viewAllModal === 'spServices' ? 'Service Provider Available Services' :
                   viewAllModal === 'sellerServices' ? 'Seller Available Services' :
                   'All Recent Services'}
                </h3>
                <button className="sd-modal-close" onClick={() => setViewAllModal(null)}><X size={18} /></button>
              </div>`;

content = content.replace(oldModalStr, newModalStr);

fs.writeFileSync('src/pages/Services/ServicesOverviewDashboard.jsx', content);
console.log('done!');
