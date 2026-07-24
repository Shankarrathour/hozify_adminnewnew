// Initial Master Central Data Registry for User App and Partner App

export const INITIAL_CENTRAL_DATA = [
  // Banners & Offers
  {
    id: 'cd-101',
    key: 'banner.home.title',
    label: 'Home Banner Title',
    category: 'Banner Title',
    scope: 'User App',
    value: 'Cleaning Sale - 30% OFF',
    defaultValue: 'Cleaning Sale - 30% OFF',
    description: 'Main promotional headline displayed on home screen hero slider'
  },
  {
    id: 'cd-102',
    key: 'banner.home.subtitle',
    label: 'Home Banner Subtitle',
    category: 'Banner Subtitle',
    scope: 'User App',
    value: 'Use code CLEAN30 for premium home deep cleaning',
    defaultValue: 'Use code CLEAN30 for premium home deep cleaning',
    description: 'Supporting text line below home screen banner title'
  },
  {
    id: 'cd-103',
    key: 'offer.festive.name',
    label: 'Festive Offer Name',
    category: 'Offer Name',
    scope: 'User App',
    value: 'Monsoon Care Blitz',
    defaultValue: 'Monsoon Care Blitz',
    description: 'Promotional offer title shown across banners and promo section'
  },

  // Categories & Services
  {
    id: 'cd-104',
    key: 'category.cleaning.name',
    label: 'Cleaning Category Name',
    category: 'Category Name',
    scope: 'Shared',
    value: 'Cleaning',
    defaultValue: 'Cleaning',
    description: 'Primary category title for home cleaning services'
  },
  {
    id: 'cd-105',
    key: 'service.salon.name',
    label: 'Salon Service Name',
    category: 'Service Name',
    scope: 'User App',
    value: "Women's Salon",
    defaultValue: "Women's Salon",
    description: 'Service title for women salon care'
  },
  {
    id: 'cd-106',
    key: 'package.luxe.name',
    label: 'Luxe Salon Package Name',
    category: 'Package Name',
    scope: 'User App',
    value: 'Luxe Salon Package',
    defaultValue: 'Luxe Salon Package',
    description: 'Package package name shown in service selection cards'
  },

  // Financial & Pricing
  {
    id: 'cd-107',
    key: 'wallet.default.balance',
    label: 'User Wallet Starting Balance',
    category: 'Wallet Balance',
    scope: 'User App',
    value: '₹250',
    defaultValue: '₹250',
    description: 'Default promotional bonus credited to user wallet upon registration'
  },
  {
    id: 'cd-108',
    key: 'powerpass.monthly.price',
    label: 'PowerPass Price',
    category: 'PowerPass Price',
    scope: 'User App',
    value: '₹149/month',
    defaultValue: '₹149/month',
    description: 'Monthly VIP pass subscription cost'
  },
  {
    id: 'cd-109',
    key: 'membership.gold.price',
    label: 'Membership Price',
    category: 'Membership Price',
    scope: 'User App',
    value: '₹499/year',
    defaultValue: '₹499/year',
    description: 'Gold membership annual fee'
  },

  // Actions & Buttons
  {
    id: 'cd-110',
    key: 'button.checkout.proceed',
    label: 'Proceed to Checkout Button',
    category: 'Button Text',
    scope: 'Shared',
    value: 'Proceed to Checkout',
    defaultValue: 'Proceed to Checkout',
    description: 'Call to action button text on cart and summary views'
  },
  {
    id: 'cd-111',
    key: 'button.booking.confirm',
    label: 'Confirm Booking Button',
    category: 'Button Text',
    scope: 'Shared',
    value: 'Confirm & Pay Slot',
    defaultValue: 'Confirm & Pay Slot',
    description: 'Final submission button text on checkout screen'
  },

  // System Messages
  {
    id: 'cd-112',
    key: 'message.empty.cart',
    label: 'Empty Cart Message',
    category: 'Empty State Message',
    scope: 'User App',
    value: 'Your cart is looking empty! Explore our top-rated services.',
    defaultValue: 'Your cart is looking empty! Explore our top-rated services.',
    description: 'Display text when user cart has zero items'
  },
  {
    id: 'cd-113',
    key: 'message.success.booking',
    label: 'Booking Success Message',
    category: 'Success Message',
    scope: 'User App',
    value: 'Booking Confirmed! An expert technician has been assigned.',
    defaultValue: 'Booking Confirmed! An expert technician has been assigned.',
    description: 'Header text on order success confirmation screen'
  },
  {
    id: 'cd-114',
    key: 'message.cancellation.policy',
    label: 'Cancellation Notice',
    category: 'Cancellation Message',
    scope: 'Shared',
    value: 'Free cancellation up to 2 hours before scheduled slot time.',
    defaultValue: 'Free cancellation up to 2 hours before scheduled slot time.',
    description: 'Notice text displayed on booking cancellation request modal'
  },
  {
    id: 'cd-115',
    key: 'status.booking.assigned',
    label: 'Booking Status Assigned',
    category: 'Booking Status',
    scope: 'Shared',
    value: 'Technician Assigned',
    defaultValue: 'Technician Assigned',
    description: 'Status label displayed when partner accepts booking'
  },

  // Communications & Rewards
  {
    id: 'cd-116',
    key: 'notification.welcome.title',
    label: 'Welcome Notification Title',
    category: 'Notification Title',
    scope: 'Shared',
    value: 'Welcome to Hozify!',
    defaultValue: 'Welcome to Hozify!',
    description: 'In-app push notification heading for newly registered users'
  },
  {
    id: 'cd-117',
    key: 'notification.welcome.desc',
    label: 'Welcome Notification Body',
    category: 'Notification Description',
    scope: 'Shared',
    value: 'Enjoy 30% off your first home service booking today.',
    defaultValue: 'Enjoy 30% off your first home service booking today.',
    description: 'Notification body details'
  },
  {
    id: 'cd-118',
    key: 'referral.user.reward',
    label: 'User Referral Reward',
    category: 'Referral Reward',
    scope: 'User App',
    value: '₹100 Wallet Credit',
    defaultValue: '₹100 Wallet Credit',
    description: 'Reward granted to user for inviting friends'
  },

  // Support & Contact
  {
    id: 'cd-119',
    key: 'support.contact.phone',
    label: 'Support Phone Number',
    category: 'Support Number',
    scope: 'Shared',
    value: '+91 1800-419-8800',
    defaultValue: '+91 1800-419-8800',
    description: 'Toll-free customer care phone helpline'
  },
  {
    id: 'cd-120',
    key: 'support.contact.email',
    label: 'Support Email Address',
    category: 'Support Email',
    scope: 'Shared',
    value: 'support@hozify.com',
    defaultValue: 'support@hozify.com',
    description: 'Official customer support email inbox'
  },

  // Legal & Info
  {
    id: 'cd-121',
    key: 'info.faq.title',
    label: 'FAQ Heading',
    category: 'FAQ',
    scope: 'Shared',
    value: 'Frequently Asked Questions',
    defaultValue: 'Frequently Asked Questions',
    description: 'Title of help center FAQ section'
  },
  {
    id: 'cd-122',
    key: 'legal.terms.summary',
    label: 'Terms of Service Heading',
    category: 'Terms',
    scope: 'Shared',
    value: 'Hozify Platform Terms & Conditions',
    defaultValue: 'Hozify Platform Terms & Conditions',
    description: 'Document header for platform service agreement'
  },
  {
    id: 'cd-123',
    key: 'legal.privacy.summary',
    label: 'Privacy Statement',
    category: 'Privacy',
    scope: 'Shared',
    value: 'Your Data Protection & Privacy Rights',
    defaultValue: 'Your Data Protection & Privacy Rights',
    description: 'Header string for privacy policy screen'
  },
  {
    id: 'cd-124',
    key: 'info.about.tagline',
    label: 'About Us Tagline',
    category: 'About',
    scope: 'Shared',
    value: 'On-Demand Home Services Simplified',
    defaultValue: 'On-Demand Home Services Simplified',
    description: 'Main brand tagline on about company page'
  },

  // Labels
  {
    id: 'cd-125',
    key: 'profile.label.phone',
    label: 'Profile Phone Field Label',
    category: 'Profile Labels',
    scope: 'Shared',
    value: 'Mobile Phone Number',
    defaultValue: 'Mobile Phone Number',
    description: 'Form label for user phone input field'
  },
  {
    id: 'cd-126',
    key: 'address.label.primary',
    label: 'Primary Address Label',
    category: 'Address Labels',
    scope: 'Shared',
    value: 'Home (Default)',
    defaultValue: 'Home (Default)',
    description: 'Tagline for default saved location address'
  }
];

export const DATA_CATEGORIES = [
  'Banner Title',
  'Banner Subtitle',
  'Category Name',
  'Service Name',
  'Package Name',
  'Offer Name',
  'Wallet Balance',
  'PowerPass Price',
  'Membership Price',
  'Button Text',
  'Empty State Message',
  'Success Message',
  'Cancellation Message',
  'Booking Status',
  'Notification Title',
  'Notification Description',
  'Referral Reward',
  'Support Number',
  'Support Email',
  'FAQ',
  'Terms',
  'Privacy',
  'About',
  'Profile Labels',
  'Address Labels'
];

export const SCOPE_OPTIONS = ['Shared', 'User App', 'Partner App'];
