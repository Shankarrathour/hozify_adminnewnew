// Canonical Registries for User App and Partner App Modules

export const USER_APP_MODULES = [
  { id: 'home', name: 'Home', category: 'Main Navigation', defaultEnabled: true, description: 'Main home screen banner, quick actions and category grid' },
  { id: 'categories', name: 'Categories', category: 'Catalog', defaultEnabled: true, description: 'All service categories listing page' },
  { id: 'services', name: 'Services', category: 'Catalog', defaultEnabled: true, description: 'Detailed services list and sub-category views' },
  { id: 'packages', name: 'Packages', category: 'Catalog', defaultEnabled: true, description: 'Bundled service packages and pricing options' },
  { id: 'bookings', name: 'Bookings', category: 'Orders & Bookings', defaultEnabled: true, description: 'Active and upcoming customer booking management' },
  { id: 'payments', name: 'Payments', category: 'Financial', defaultEnabled: true, description: 'Payment gateway, saved cards, checkout payments' },
  { id: 'wallet', name: 'Wallet', category: 'Financial', defaultEnabled: true, description: 'Hozify cash wallet balance and top-up options' },
  { id: 'notifications', name: 'Notifications', category: 'Communication', defaultEnabled: true, description: 'In-app notification center and promotional alerts' },
  { id: 'profile', name: 'Profile', category: 'Account', defaultEnabled: true, description: 'User account details, avatar and personal preferences' },
  { id: 'addresses', name: 'Addresses', category: 'Account', defaultEnabled: true, description: 'Saved delivery and service address locations' },
  { id: 'reviews', name: 'Reviews', category: 'Engagement', defaultEnabled: true, description: 'Customer ratings and service feedback history' },
  { id: 'support', name: 'Support', category: 'Help & Support', defaultEnabled: true, description: '24/7 customer care desk and direct helpline' },
  { id: 'referral', name: 'Referral', category: 'Promotions', defaultEnabled: true, description: 'Invite friends and earn wallet credits program' },
  { id: 'powerpass', name: 'PowerPass', category: 'Subscriptions', defaultEnabled: true, description: 'VIP savings membership subscription plan' },
  { id: 'instahelp', name: 'InstaHelp', category: 'Help & Support', defaultEnabled: true, description: 'Instant emergency chat assistance and priority booking' },
  { id: 'offers', name: 'Offers', category: 'Promotions', defaultEnabled: true, description: 'Promotional coupons, promo codes and deals' },
  { id: 'membership', name: 'Membership', category: 'Subscriptions', defaultEnabled: true, description: 'Tiered loyalty status and member benefits' },
  { id: 'cart', name: 'Cart', category: 'Checkout Flow', defaultEnabled: true, description: 'Shopping cart item review and quantity selector' },
  { id: 'checkout', name: 'Checkout', category: 'Checkout Flow', defaultEnabled: true, description: 'Slot selection, summary review and checkout process' },
  { id: 'success_page', name: 'Success Page', category: 'Checkout Flow', defaultEnabled: true, description: 'Order confirmation and booking tracker page' },
  { id: 'order_history', name: 'Order History', category: 'Orders & Bookings', defaultEnabled: true, description: 'Past completed and cancelled booking records' },
  { id: 'emergency', name: 'Emergency', category: 'Safety', defaultEnabled: true, description: 'Direct SOS emergency authority button' },
  { id: 'settings', name: 'Settings', category: 'Account', defaultEnabled: true, description: 'App preferences, notifications toggle and language' }
];

export const PARTNER_APP_MODULES = [
  { id: 'dashboard', name: 'Dashboard', category: 'Overview', defaultEnabled: true, description: 'Partner performance metrics, daily earnings and job summary' },
  { id: 'orders', name: 'Orders', category: 'Job Management', defaultEnabled: true, description: 'Incoming job requests, active service jobs and work orders' },
  { id: 'calendar', name: 'Calendar', category: 'Scheduling', defaultEnabled: true, description: 'Job schedule calendar and appointment timeline' },
  { id: 'earnings', name: 'Earnings', category: 'Financial', defaultEnabled: true, description: 'Daily payout summaries, commissions and earnings breakdown' },
  { id: 'wallet', name: 'Wallet', category: 'Financial', defaultEnabled: true, description: 'Partner balance and bank payout requests' },
  { id: 'attendance', name: 'Attendance', category: 'Operations', defaultEnabled: true, description: 'Daily check-in / check-out time log' },
  { id: 'services', name: 'Services', category: 'Operations', defaultEnabled: true, description: 'Services assigned and skill set certifications' },
  { id: 'customers', name: 'Customers', category: 'Operations', defaultEnabled: true, description: 'Customer detail view and job site notes' },
  { id: 'reviews', name: 'Reviews', category: 'Performance', defaultEnabled: true, description: 'Ratings, customer comments and quality score' },
  { id: 'notifications', name: 'Notifications', category: 'Communication', defaultEnabled: true, description: 'Dispatch alerts, broadcasts and system notices' },
  { id: 'profile', name: 'Profile', category: 'Account', defaultEnabled: true, description: 'Technician profile details, badge and vehicle information' },
  { id: 'documents', name: 'Documents', category: 'Compliance', defaultEnabled: true, description: 'KYC documents, ID verification and license files' },
  { id: 'training', name: 'Training', category: 'Upskilling', defaultEnabled: true, description: 'Safety tutorials, skill certification courses' },
  { id: 'incentives', name: 'Incentives', category: 'Rewards', defaultEnabled: true, description: 'Weekly bonus targets, streak rewards and leaderboards' },
  { id: 'referral', name: 'Referral', category: 'Rewards', defaultEnabled: true, description: 'Refer technician friends for bonus cash' },
  { id: 'support', name: 'Support', category: 'Help & Support', defaultEnabled: true, description: 'Partner helpline desk and emergency assistance' },
  { id: 'availability', name: 'Availability', category: 'Scheduling', defaultEnabled: true, description: 'Working hours configuration and duty status switch' },
  { id: 'leaves', name: 'Leaves', category: 'Scheduling', defaultEnabled: true, description: 'Apply for time-off and view leave approvals' },
  { id: 'settings', name: 'Settings', category: 'Account', defaultEnabled: true, description: 'App preferences, sound alerts and device options' }
];
