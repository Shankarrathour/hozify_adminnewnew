const fs = require('fs');

const files = [
  'src/pages/Dashboard/BookingAnalytics.jsx',
  'src/pages/OrderManagement/OrderDashboard.jsx',
  'src/pages/QuotationManagement/QuotationDashboard.jsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Replace tr background
  content = content.replace(
    /style={{ background:'#1e1b4b', color:'#fff' }}/g,
    `style={{ borderBottom: '1px solid #e2e8f0' }}`
  );

  // Replace th padding and add color
  content = content.replace(
    /padding:'6px 8px', fontWeight:700/g,
    `padding:'8px 4px 8px 0', color:'#1e3a8a', fontWeight:700, fontSize:'11px'`
  );

  // Capitalize header text
  const uppercaseWords = {
    '>RANK<': '>Rank<',
    '>SERVICE NAME<': '>Service Name<',
    '>BOOKINGS<': '>Bookings<',
    '>PROFESSIONAL NAME<': '>Professional Name<',
    '>CUSTOMER NAME<': '>Customer Name<',
    '>VALUE<': '>Value<',
    '>USER NAME<': '>User Name<',
    '>USERS REFERRED<': '>Users Referred<',
    '>PARTNER NAME<': '>Partner Name<',
    '>PARTNERS REFERRED<': '>Partners Referred<',
    '>INFLUENCER NAME<': '>Influencer Name<',
    '>TOTAL REFERRED<': '>Total Referred<',
    '>QUOTATION ID<': '>Quotation ID<',
    '>DATE<': '>Date<',
    '>AMOUNT<': '>Amount<',
    '>STATUS<': '>Status<'
  };

  for (const [upper, cap] of Object.entries(uppercaseWords)) {
    content = content.replaceAll(upper, cap);
  }

  // Also replace table font size from 9.5 to 11 for consistency if they have it
  content = content.replace(
    /table style={{ width:'100%', fontSize:9.5, borderCollapse:'collapse' }}/g,
    `table style={{ width:'100%', fontSize:'11px', borderCollapse:'collapse' }}`
  );
  
  // And adjust td padding for a cleaner look
  content = content.replace(
    /td style={{ padding:'6px 8px'/g,
    `td style={{ padding:'8px 4px 8px 0', whiteSpace:'nowrap'`
  );
  
  // And td font weights
  content = content.replace(
    /fontWeight:600 }}/g,
    `fontWeight:600, color:'#0f172a' }}`
  );

  fs.writeFileSync(file, content);
  console.log('Updated', file);
});
