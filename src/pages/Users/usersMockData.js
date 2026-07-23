const baseUsers = [
  {
    id: 'USR-1001',
    name: 'Ishaan Mehta',
    mobile: '+91 98765 43210',
    email: 'ishaan.mehta@example.com',
    status: 'Active',
    gender: 'Male',
    dateOfBirth: '1994-03-15',
    whatsappStatus: 'Active',
    accountStatus: 'Active',
    loginStatus: 'Online',
    memberSince: '2024-10-12',
    favoriteAddressCount: 3,
    emergencyContactsCount: 2,
    preferredLanguage: 'English',
    notificationLanguage: 'English',
    isInfluencer: true,
    locationType: 'Urban',
    city: 'Mumbai',
    district: 'Andheri',
    state: 'Maharashtra',
    registrationDate: '2024-10-12',
    addresses: [
      'A-1204, Skyview Heights, Andheri West, Mumbai',
      '14 Palm Avenue, Koramangala, Bengaluru'
    ],
    wallet: {
      balance: 1840,
      totalCredits: 7650,
      totalDebits: 5810
    },
    referrals: {
      referralCode: 'ISH941',
      totalReferrals: 9,
      earnedAmount: 1350
    },
    bookingHistory: [
      { id: 'BK-90210', serviceName: 'Deep Home Cleaning', date: '2026-05-21', amount: 2499, status: 'Completed' },
      { id: 'BK-90144', serviceName: 'AC Service', date: '2026-04-18', amount: 899, status: 'Completed' }
    ],
    documents: [
      { name: 'Aadhaar Card', type: 'Identity', verificationStatus: 'Verified' },
      { name: 'Address Proof', type: 'Residence', verificationStatus: 'Verified' }
    ]
  },
  {
    id: 'USR-1002',
    name: 'Ananya Rao',
    mobile: '+91 99887 76655',
    email: 'ananya.rao@example.com',
    status: 'Active',
    gender: 'Female',
    dateOfBirth: '1997-07-22',
    whatsappStatus: 'Active',
    accountStatus: 'Active',
    loginStatus: 'Offline',
    memberSince: '2025-01-08',
    favoriteAddressCount: 2,
    emergencyContactsCount: 1,
    preferredLanguage: 'Telugu',
    notificationLanguage: 'English',
    isInfluencer: false,
    locationType: 'Urban',
    city: 'Hyderabad',
    district: 'Jubilee Hills',
    state: 'Telangana',
    registrationDate: '2025-01-08',
    addresses: [
      'Flat 7B, Green Park Residency, Hyderabad',
      '22 Lake Road, Jubilee Hills, Hyderabad'
    ],
    wallet: {
      balance: 620,
      totalCredits: 4300,
      totalDebits: 3680
    },
    referrals: {
      referralCode: 'ANA214',
      totalReferrals: 4,
      earnedAmount: 600
    },
    bookingHistory: [
      { id: 'BK-88452', serviceName: 'Sofa Cleaning', date: '2026-05-09', amount: 1299, status: 'Completed' },
      { id: 'BK-87619', serviceName: 'Bathroom Cleaning', date: '2026-03-29', amount: 699, status: 'Completed' }
    ],
    documents: [
      { name: 'PAN Card', type: 'Identity', verificationStatus: 'Verified' },
      { name: 'Utility Bill', type: 'Residence', verificationStatus: 'Pending' }
    ]
  },
  {
    id: 'USR-1003',
    name: 'Rohan Kapoor',
    mobile: '+91 91234 56780',
    email: 'rohan.kapoor@example.com',
    status: 'Suspended',
    gender: 'Male',
    dateOfBirth: '1990-11-08',
    whatsappStatus: 'Inactive',
    accountStatus: 'Suspended',
    loginStatus: 'Offline',
    memberSince: '2023-11-25',
    favoriteAddressCount: 1,
    emergencyContactsCount: 1,
    preferredLanguage: 'Hindi',
    notificationLanguage: 'Hindi',
    isInfluencer: false,
    locationType: 'Semi-Urban',
    city: 'Gurugram',
    district: 'Sector 57',
    state: 'Haryana',
    registrationDate: '2023-11-25',
    addresses: [
      'House 42, Sector 57, Gurugram',
      'Tower C, Golf Course Road, Gurugram'
    ],
    wallet: {
      balance: 0,
      totalCredits: 2100,
      totalDebits: 2100
    },
    referrals: {
      referralCode: 'ROH557',
      totalReferrals: 1,
      earnedAmount: 150
    },
    bookingHistory: [
      { id: 'BK-87113', serviceName: 'Plumbing Repair', date: '2026-02-14', amount: 549, status: 'Refunded' },
      { id: 'BK-86001', serviceName: 'Kitchen Cleaning', date: '2026-01-22', amount: 999, status: 'Completed' }
    ],
    documents: [
      { name: 'Aadhaar Card', type: 'Identity', verificationStatus: 'Verified' },
      { name: 'Rental Agreement', type: 'Residence', verificationStatus: 'Rejected' }
    ]
  },
  {
    id: 'USR-1004',
    name: 'Priya Nair',
    mobile: '+91 90123 45678',
    email: 'priya.nair@example.com',
    status: 'Blocked',
    gender: 'Female',
    dateOfBirth: '1993-05-19',
    whatsappStatus: 'Blocked',
    accountStatus: 'Blocked',
    loginStatus: 'Blocked',
    memberSince: '2024-07-19',
    favoriteAddressCount: 0,
    emergencyContactsCount: 0,
    preferredLanguage: 'Tamil',
    notificationLanguage: 'Tamil',
    isInfluencer: false,
    locationType: 'Urban',
    city: 'Chennai',
    district: 'Besant Nagar',
    state: 'Tamil Nadu',
    registrationDate: '2024-07-19',
    addresses: [
      'Villa 18, ECR Road, Chennai',
      '10 Bay View Apartments, Besant Nagar, Chennai'
    ],
    wallet: {
      balance: 310,
      totalCredits: 1900,
      totalDebits: 1590
    },
    referrals: {
      referralCode: 'PRI828',
      totalReferrals: 2,
      earnedAmount: 300
    },
    bookingHistory: [
      { id: 'BK-85247', serviceName: 'Pest Control', date: '2025-12-12', amount: 1499, status: 'Cancelled' },
      { id: 'BK-84710', serviceName: 'Laundry Pickup', date: '2025-11-05', amount: 399, status: 'Completed' }
    ],
    documents: [
      { name: 'PAN Card', type: 'Identity', verificationStatus: 'Pending' },
      { name: 'Electricity Bill', type: 'Residence', verificationStatus: 'Pending' }
    ]
  },
  {
    id: 'USR-1005',
    name: 'Kabir Singh',
    mobile: '+91 98989 12345',
    email: 'kabir.singh@example.com',
    status: 'Active',
    gender: 'Male',
    dateOfBirth: '1988-09-30',
    whatsappStatus: 'Active',
    accountStatus: 'Active',
    loginStatus: 'Online',
    memberSince: '2025-04-03',
    favoriteAddressCount: 5,
    emergencyContactsCount: 3,
    preferredLanguage: 'Hindi',
    notificationLanguage: 'English',
    isInfluencer: true,
    locationType: 'Urban',
    city: 'Pune',
    district: 'Baner',
    state: 'Maharashtra',
    registrationDate: '2025-04-03',
    addresses: [
      'B-504, Rivera Towers, Pune',
      'Office 302, Baner High Street, Pune'
    ],
    wallet: {
      balance: 2575,
      totalCredits: 9800,
      totalDebits: 7225
    },
    referrals: {
      referralCode: 'KAB310',
      totalReferrals: 12,
      earnedAmount: 1800
    },
    bookingHistory: [
      { id: 'BK-83902', serviceName: 'Car Wash', date: '2026-06-02', amount: 499, status: 'Completed' },
      { id: 'BK-83218', serviceName: 'Home Sanitization', date: '2026-04-30', amount: 1699, status: 'Completed' }
    ],
    documents: [
      { name: 'Aadhaar Card', type: 'Identity', verificationStatus: 'Verified' },
      { name: 'Passport', type: 'Identity', verificationStatus: 'Verified' }
    ]
  },
  {
    id: 'USR-1006',
    name: 'Meera Iyer',
    mobile: '+91 97654 32109',
    email: 'meera.iyer@example.com',
    status: 'Suspended',
    gender: 'Female',
    dateOfBirth: '1995-02-14',
    whatsappStatus: 'Inactive',
    accountStatus: 'Suspended',
    loginStatus: 'Offline',
    memberSince: '2024-02-28',
    favoriteAddressCount: 1,
    emergencyContactsCount: 1,
    preferredLanguage: 'Malayalam',
    notificationLanguage: 'English',
    isInfluencer: false,
    locationType: 'Urban',
    city: 'Kochi',
    district: 'Ernakulam',
    state: 'Kerala',
    registrationDate: '2024-02-28',
    addresses: [
      '908 Lotus Enclave, Kochi',
      '16 Marine Drive, Ernakulam'
    ],
    wallet: {
      balance: 95,
      totalCredits: 1250,
      totalDebits: 1155
    },
    referrals: {
      referralCode: 'MEE502',
      totalReferrals: 0,
      earnedAmount: 0
    },
    bookingHistory: [
      { id: 'BK-82004', serviceName: 'Electrician Visit', date: '2026-01-11', amount: 449, status: 'Completed' },
      { id: 'BK-81772', serviceName: 'Appliance Repair', date: '2025-12-20', amount: 799, status: 'Disputed' }
    ],
    documents: [
      { name: 'Voter ID', type: 'Identity', verificationStatus: 'Verified' },
      { name: 'Address Proof', type: 'Residence', verificationStatus: 'Verified' }
    ]
  },
  {
    id: 'USR-1007',
    name: 'Arjun Desai',
    mobile: '+91 95555 44433',
    email: 'arjun.desai@example.com',
    status: 'Active',
    gender: 'Male',
    dateOfBirth: '1992-06-25',
    whatsappStatus: 'Active',
    accountStatus: 'Active',
    loginStatus: 'Online',
    memberSince: '2025-08-16',
    favoriteAddressCount: 4,
    emergencyContactsCount: 2,
    preferredLanguage: 'Gujarati',
    notificationLanguage: 'English',
    isInfluencer: true,
    locationType: 'Urban',
    city: 'Ahmedabad',
    district: 'Prahlad Nagar',
    state: 'Gujarat',
    registrationDate: '2025-08-16',
    addresses: [
      '302 Sapphire Square, Ahmedabad',
      'Plot 11, Prahlad Nagar, Ahmedabad'
    ],
    wallet: {
      balance: 740,
      totalCredits: 3600,
      totalDebits: 2860
    },
    referrals: {
      referralCode: 'ARJ771',
      totalReferrals: 5,
      earnedAmount: 750
    },
    bookingHistory: [
      { id: 'BK-80561', serviceName: 'Gardening Service', date: '2026-05-27', amount: 1199, status: 'Completed' },
      { id: 'BK-80195', serviceName: 'Furniture Assembly', date: '2026-04-07', amount: 699, status: 'Completed' }
    ],
    documents: [
      { name: 'Driving License', type: 'Identity', verificationStatus: 'Verified' },
      { name: 'Gas Bill', type: 'Residence', verificationStatus: 'Verified' }
    ]
  },
  {
    id: 'USR-1008',
    name: 'Sara Thomas',
    mobile: '+91 94444 22110',
    email: 'sara.thomas@example.com',
    status: 'Blocked',
    gender: 'Female',
    dateOfBirth: '1991-12-04',
    whatsappStatus: 'Blocked',
    accountStatus: 'Blocked',
    loginStatus: 'Blocked',
    memberSince: '2023-09-04',
    favoriteAddressCount: 0,
    emergencyContactsCount: 1,
    preferredLanguage: 'English',
    notificationLanguage: 'English',
    isInfluencer: false,
    locationType: 'Urban',
    city: 'Bengaluru',
    district: 'Indiranagar',
    state: 'Karnataka',
    registrationDate: '2023-09-04',
    addresses: [
      '11 Heritage Homes, Indiranagar, Bengaluru',
      'C-19, Brigade Road, Bengaluru'
    ],
    wallet: {
      balance: 0,
      totalCredits: 2750,
      totalDebits: 2750
    },
    referrals: {
      referralCode: 'SAR609',
      totalReferrals: 3,
      earnedAmount: 450
    },
    bookingHistory: [
      { id: 'BK-79081', serviceName: 'Packers Support', date: '2025-10-15', amount: 2199, status: 'Cancelled' },
      { id: 'BK-78430', serviceName: 'Window Cleaning', date: '2025-09-01', amount: 599, status: 'Completed' }
    ],
    documents: [
      { name: 'PAN Card', type: 'Identity', verificationStatus: 'Rejected' },
      { name: 'Bank Statement', type: 'Residence', verificationStatus: 'Pending' }
    ]
  },
  {
    id: 'USR-1009',
    name: 'Vikram Sharma',
    mobile: '+91 93333 11220',
    email: 'vikram.sharma@example.com',
    status: 'Active',
    gender: 'Male',
    dateOfBirth: '1986-04-12',
    whatsappStatus: 'Active',
    accountStatus: 'Active',
    loginStatus: 'Online',
    memberSince: '2023-06-10',
    favoriteAddressCount: 6,
    emergencyContactsCount: 3,
    preferredLanguage: 'Hindi',
    notificationLanguage: 'Hindi',
    isInfluencer: true,
    locationType: 'Urban',
    city: 'Delhi',
    district: 'South Delhi',
    state: 'Delhi',
    registrationDate: '2023-06-10',
    addresses: ['A-45, Defence Colony, New Delhi'],
    wallet: { balance: 3200, totalCredits: 12000, totalDebits: 8800 },
    referrals: { referralCode: 'VIK886', totalReferrals: 18, earnedAmount: 2700 },
    bookingHistory: [
      { id: 'BK-77010', serviceName: 'Full Home Cleaning', date: '2026-06-10', amount: 3499, status: 'Completed' }
    ],
    documents: [
      { name: 'Aadhaar Card', type: 'Identity', verificationStatus: 'Verified' }
    ]
  },
  {
    id: 'USR-1010',
    name: 'Pooja Bhatia',
    mobile: '+91 92222 88770',
    email: 'pooja.bhatia@example.com',
    status: 'Active',
    gender: 'Female',
    dateOfBirth: '1999-01-28',
    whatsappStatus: 'Active',
    accountStatus: 'Active',
    loginStatus: 'Offline',
    memberSince: '2025-09-20',
    favoriteAddressCount: 2,
    emergencyContactsCount: 1,
    preferredLanguage: 'Hindi',
    notificationLanguage: 'English',
    isInfluencer: false,
    locationType: 'Urban',
    city: 'Jaipur',
    district: 'Malviya Nagar',
    state: 'Rajasthan',
    registrationDate: '2025-09-20',
    addresses: ['23, Pink City Residency, Jaipur'],
    wallet: { balance: 480, totalCredits: 2100, totalDebits: 1620 },
    referrals: { referralCode: 'POO445', totalReferrals: 3, earnedAmount: 450 },
    bookingHistory: [
      { id: 'BK-76220', serviceName: 'Bathroom Deep Clean', date: '2026-05-30', amount: 799, status: 'Completed' }
    ],
    documents: [
      { name: 'PAN Card', type: 'Identity', verificationStatus: 'Verified' }
    ]
  }
];

const avatars = {
  'USR-1001': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=220&h=220&q=80',
  'USR-1002': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=220&h=220&q=80',
  'USR-1003': 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=220&h=220&q=80',
  'USR-1004': 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=220&h=220&q=80',
  'USR-1005': 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=220&h=220&q=80',
  'USR-1006': 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=220&h=220&q=80',
  'USR-1007': 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&w=220&h=220&q=80',
  'USR-1008': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=220&h=220&q=80',
  'USR-1009': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=220&h=220&q=80',
  'USR-1010': 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=220&h=220&q=80'
};

const memberships = {
  'USR-1001': 'Premium User',
  'USR-1002': 'Verified User',
  'USR-1003': 'Standard User',
  'USR-1004': 'Standard User',
  'USR-1005': 'Premium User',
  'USR-1006': 'Verified User',
  'USR-1007': 'Premium User',
  'USR-1008': 'Standard User',
  'USR-1009': 'Premium User',
  'USR-1010': 'Verified User'
};

const referredUsers = {
  'USR-1001': ['Aarav Shah', 'Neha Batra', 'Vivek Nair'],
  'USR-1002': ['Tanvi Menon', 'Ritika Jain'],
  'USR-1003': ['Manav Sethi'],
  'USR-1004': ['Gauri Nair', 'Dev Patel'],
  'USR-1005': ['Sana Ali', 'Omkar Rao', 'Rhea Sen'],
  'USR-1006': [],
  'USR-1007': ['Nikhil Joshi', 'Pooja Shah'],
  'USR-1008': ['Aisha Khan'],
  'USR-1009': ['Aditya Kumar', 'Sneha Rao', 'Raj Patel'],
  'USR-1010': ['Amit Shah', 'Priti Gupta', 'Suresh Yadav']
};

const avgRatings = {
  'USR-1001': 4.8, 'USR-1002': 4.5, 'USR-1003': 3.2, 'USR-1004': 2.8,
  'USR-1005': 4.9, 'USR-1006': 3.7, 'USR-1007': 4.6, 'USR-1008': 2.5,
  'USR-1009': 4.9, 'USR-1010': 4.3
};

function buildTransactions(user) {
  return [
    {
      id: `${user.id}-TXN-1`,
      date: user.bookingHistory[0]?.date || user.registrationDate,
      type: 'Debit',
      amount: user.bookingHistory[0]?.amount || 0,
      remarks: user.bookingHistory[0] ? `${user.bookingHistory[0].serviceName} booking payment` : 'Service payment'
    },
    {
      id: `${user.id}-TXN-2`,
      date: user.registrationDate,
      type: 'Credit',
      amount: user.referrals.earnedAmount,
      remarks: 'Referral rewards credited'
    }
  ];
}

function buildLogs(user) {
  return [
    {
      date: '2026-06-12',
      action: 'Profile reviewed',
      performedBy: 'Admin User',
      remarks: `${user.name} profile opened from User Management.`
    },
    {
      date: user.registrationDate,
      action: 'Account registered',
      performedBy: 'System',
      remarks: 'Customer account created successfully.'
    },
    {
      date: user.bookingHistory[0]?.date || user.registrationDate,
      action: 'Booking activity',
      performedBy: 'System',
      remarks: user.bookingHistory[0] ? `${user.bookingHistory[0].id} marked ${user.bookingHistory[0].status}.` : 'No recent booking activity.'
    }
  ];
}

export const usersMockData = baseUsers.map((user) => {
  const transactions = buildTransactions(user);
  return {
    ...user,
    avatar: avatars[user.id],
    averageRating: avgRatings[user.id] || 4.0,
    membershipType: memberships[user.id],
    wallet: {
      ...user.wallet,
      lastTransaction: transactions[0],
      transactions
    },
    referrals: {
      ...user.referrals,
      referredUsers: referredUsers[user.id]
    },
    documents: user.documents.map((document, index) => ({
      ...document,
      uploadedDate: index === 0 ? user.registrationDate : user.bookingHistory[0]?.date || user.registrationDate
    })),
    logs: buildLogs(user)
  };
});

// ─── LOGIN ATTEMPTS MOCK DATA ────────────────────────────────────────────────

export const loginAttemptsMockData = [
  {
    id: 'LA-0001',
    mobileNumber: '+91 98765 43210',
    ipAddress: '103.21.58.142',
    deviceType: 'Android',
    deviceLocation: 'Mumbai, Maharashtra',
    attemptStatus: 'Success',
    attemptDateTime: '2026-07-22 09:14:32',
    activeDevice: true,
    otpAttemptCount: 1,
    userName: 'Ishaan Mehta',
    browser: 'Chrome Mobile',
    os: 'Android 13',
    deviceId: 'DEV-AND-7821',
    networkType: '4G'
  },
  {
    id: 'LA-0002',
    mobileNumber: '+91 90123 45678',
    ipAddress: '182.74.22.18',
    deviceType: 'iOS',
    deviceLocation: 'Chennai, Tamil Nadu',
    attemptStatus: 'Failed',
    attemptDateTime: '2026-07-22 11:42:05',
    activeDevice: false,
    otpAttemptCount: 3,
    userName: 'Priya Nair',
    browser: 'Safari Mobile',
    os: 'iOS 17.4',
    deviceId: 'DEV-IOS-3312',
    networkType: 'WiFi'
  },
  {
    id: 'LA-0003',
    mobileNumber: '+91 91234 56780',
    ipAddress: '45.113.192.74',
    deviceType: 'Web',
    deviceLocation: 'Gurugram, Haryana',
    attemptStatus: 'Blocked',
    attemptDateTime: '2026-07-21 18:05:50',
    activeDevice: false,
    otpAttemptCount: 5,
    userName: 'Rohan Kapoor',
    browser: 'Chrome 125',
    os: 'Windows 11',
    deviceId: 'DEV-WEB-5509',
    networkType: 'Broadband'
  },
  {
    id: 'LA-0004',
    mobileNumber: '+91 99887 76655',
    ipAddress: '49.37.204.211',
    deviceType: 'Android',
    deviceLocation: 'Hyderabad, Telangana',
    attemptStatus: 'Success',
    attemptDateTime: '2026-07-22 08:30:11',
    activeDevice: true,
    otpAttemptCount: 1,
    userName: 'Ananya Rao',
    browser: 'Chrome Mobile',
    os: 'Android 14',
    deviceId: 'DEV-AND-9904',
    networkType: '5G'
  },
  {
    id: 'LA-0005',
    mobileNumber: '+91 98989 12345',
    ipAddress: '106.51.8.77',
    deviceType: 'iOS',
    deviceLocation: 'Pune, Maharashtra',
    attemptStatus: 'OTP Expired',
    attemptDateTime: '2026-07-22 14:20:45',
    activeDevice: false,
    otpAttemptCount: 2,
    userName: 'Kabir Singh',
    browser: 'Safari Mobile',
    os: 'iOS 16.7',
    deviceId: 'DEV-IOS-6671',
    networkType: '4G'
  },
  {
    id: 'LA-0006',
    mobileNumber: '+91 97654 32109',
    ipAddress: '59.93.21.45',
    deviceType: 'Web',
    deviceLocation: 'Kochi, Kerala',
    attemptStatus: 'Failed',
    attemptDateTime: '2026-07-21 22:55:18',
    activeDevice: false,
    otpAttemptCount: 4,
    userName: 'Meera Iyer',
    browser: 'Firefox 126',
    os: 'macOS Sonoma',
    deviceId: 'DEV-WEB-1128',
    networkType: 'WiFi'
  },
  {
    id: 'LA-0007',
    mobileNumber: '+91 95555 44433',
    ipAddress: '117.200.11.82',
    deviceType: 'Android',
    deviceLocation: 'Ahmedabad, Gujarat',
    attemptStatus: 'Success',
    attemptDateTime: '2026-07-23 07:02:33',
    activeDevice: true,
    otpAttemptCount: 1,
    userName: 'Arjun Desai',
    browser: 'Chrome Mobile',
    os: 'Android 13',
    deviceId: 'DEV-AND-2244',
    networkType: '4G'
  },
  {
    id: 'LA-0008',
    mobileNumber: '+91 94444 22110',
    ipAddress: '122.177.30.199',
    deviceType: 'Web',
    deviceLocation: 'Bengaluru, Karnataka',
    attemptStatus: 'Blocked',
    attemptDateTime: '2026-07-20 16:44:09',
    activeDevice: false,
    otpAttemptCount: 5,
    userName: 'Sara Thomas',
    browser: 'Edge 125',
    os: 'Windows 10',
    deviceId: 'DEV-WEB-8833',
    networkType: 'Broadband'
  }
];

// ─── ACTIVITY LOGS MOCK DATA ─────────────────────────────────────────────────

export const activityLogsMockData = [
  {
    id: 'ACT-1001',
    userName: 'Ishaan Mehta',
    mobileNumber: '+91 98765 43210',
    emailId: 'ishaan.mehta@example.com',
    activityType: 'Profile Update',
    moduleName: 'User Management',
    actionPerformed: 'Updated phone number',
    oldValue: '+91 98765 00000',
    newValue: '+91 98765 43210',
    ipAddress: '103.21.58.142',
    deviceType: 'Android',
    deviceLocation: 'Mumbai, Maharashtra',
    browser: 'Chrome Mobile',
    operatingSystem: 'Android 13',
    status: 'Success',
    createdBy: 'Ishaan Mehta',
    activityDateTime: '2026-07-22 10:30:00'
  },
  {
    id: 'ACT-1002',
    userName: 'Ananya Rao',
    mobileNumber: '+91 99887 76655',
    emailId: 'ananya.rao@example.com',
    activityType: 'Login',
    moduleName: 'Authentication',
    actionPerformed: 'User logged in successfully',
    oldValue: 'Logged Out',
    newValue: 'Logged In',
    ipAddress: '49.37.204.211',
    deviceType: 'Android',
    deviceLocation: 'Hyderabad, Telangana',
    browser: 'Chrome Mobile',
    operatingSystem: 'Android 14',
    status: 'Success',
    createdBy: 'System',
    activityDateTime: '2026-07-22 08:30:11'
  },
  {
    id: 'ACT-1003',
    userName: 'Rohan Kapoor',
    mobileNumber: '+91 91234 56780',
    emailId: 'rohan.kapoor@example.com',
    activityType: 'Account Suspension',
    moduleName: 'User Management',
    actionPerformed: 'Account suspended by admin',
    oldValue: 'Active',
    newValue: 'Suspended',
    ipAddress: '10.0.0.1',
    deviceType: 'Web',
    deviceLocation: 'Admin Panel',
    browser: 'Chrome 125',
    operatingSystem: 'Windows 11',
    status: 'Success',
    createdBy: 'Admin – Rajiv Kumar',
    activityDateTime: '2026-07-21 15:00:00'
  },
  {
    id: 'ACT-1004',
    userName: 'Priya Nair',
    mobileNumber: '+91 90123 45678',
    emailId: 'priya.nair@example.com',
    activityType: 'Failed Login',
    moduleName: 'Authentication',
    actionPerformed: 'OTP entered incorrectly 3 times',
    oldValue: 'Online',
    newValue: 'Login Blocked',
    ipAddress: '182.74.22.18',
    deviceType: 'iOS',
    deviceLocation: 'Chennai, Tamil Nadu',
    browser: 'Safari Mobile',
    operatingSystem: 'iOS 17.4',
    status: 'Failed',
    createdBy: 'System',
    activityDateTime: '2026-07-22 11:42:05'
  },
  {
    id: 'ACT-1005',
    userName: 'Kabir Singh',
    mobileNumber: '+91 98989 12345',
    emailId: 'kabir.singh@example.com',
    activityType: 'Address Added',
    moduleName: 'Address Management',
    actionPerformed: 'Added new favorite address',
    oldValue: '4 saved addresses',
    newValue: '5 saved addresses',
    ipAddress: '106.51.8.77',
    deviceType: 'iOS',
    deviceLocation: 'Pune, Maharashtra',
    browser: 'Safari Mobile',
    operatingSystem: 'iOS 16.7',
    status: 'Success',
    createdBy: 'Kabir Singh',
    activityDateTime: '2026-07-22 13:15:22'
  },
  {
    id: 'ACT-1006',
    userName: 'Meera Iyer',
    mobileNumber: '+91 97654 32109',
    emailId: 'meera.iyer@example.com',
    activityType: 'Password Change',
    moduleName: 'Security',
    actionPerformed: 'User changed login PIN',
    oldValue: '****',
    newValue: '****',
    ipAddress: '59.93.21.45',
    deviceType: 'Web',
    deviceLocation: 'Kochi, Kerala',
    browser: 'Firefox 126',
    operatingSystem: 'macOS Sonoma',
    status: 'Success',
    createdBy: 'Meera Iyer',
    activityDateTime: '2026-07-21 20:05:18'
  },
  {
    id: 'ACT-1007',
    userName: 'Arjun Desai',
    mobileNumber: '+91 95555 44433',
    emailId: 'arjun.desai@example.com',
    activityType: 'Booking',
    moduleName: 'Booking Management',
    actionPerformed: 'New booking placed',
    oldValue: '3 bookings',
    newValue: '4 bookings',
    ipAddress: '117.200.11.82',
    deviceType: 'Android',
    deviceLocation: 'Ahmedabad, Gujarat',
    browser: 'Chrome Mobile',
    operatingSystem: 'Android 13',
    status: 'Success',
    createdBy: 'Arjun Desai',
    activityDateTime: '2026-07-23 07:45:00'
  },
  {
    id: 'ACT-1008',
    userName: 'Sara Thomas',
    mobileNumber: '+91 94444 22110',
    emailId: 'sara.thomas@example.com',
    activityType: 'Account Blocked',
    moduleName: 'User Management',
    actionPerformed: 'Account blocked due to policy violation',
    oldValue: 'Active',
    newValue: 'Blocked',
    ipAddress: '10.0.0.1',
    deviceType: 'Web',
    deviceLocation: 'Admin Panel',
    browser: 'Edge 125',
    operatingSystem: 'Windows 10',
    status: 'Success',
    createdBy: 'Admin – Priya Sharma',
    activityDateTime: '2026-07-20 16:00:00'
  },
  {
    id: 'ACT-1009',
    userName: 'Vikram Sharma',
    mobileNumber: '+91 93333 11220',
    emailId: 'vikram.sharma@example.com',
    activityType: 'Wallet Recharge',
    moduleName: 'Wallet Management',
    actionPerformed: 'Wallet topped up via UPI',
    oldValue: '₹2,200',
    newValue: '₹3,200',
    ipAddress: '14.195.208.44',
    deviceType: 'Android',
    deviceLocation: 'New Delhi',
    browser: 'Chrome Mobile',
    operatingSystem: 'Android 14',
    status: 'Success',
    createdBy: 'Vikram Sharma',
    activityDateTime: '2026-07-22 17:55:30'
  },
  {
    id: 'ACT-1010',
    userName: 'Pooja Bhatia',
    mobileNumber: '+91 92222 88770',
    emailId: 'pooja.bhatia@example.com',
    activityType: 'Profile Update',
    moduleName: 'User Management',
    actionPerformed: 'Updated preferred language',
    oldValue: 'Hindi',
    newValue: 'English',
    ipAddress: '27.97.33.155',
    deviceType: 'iOS',
    deviceLocation: 'Jaipur, Rajasthan',
    browser: 'Safari Mobile',
    operatingSystem: 'iOS 17.2',
    status: 'Success',
    createdBy: 'Pooja Bhatia',
    activityDateTime: '2026-07-23 09:20:00'
  }
];
