import {
  Activity,
  Banknote,
  BarChart3,
  CalendarCheck,
  ClipboardList,
  Contact,
  FileText,
  HelpCircle,
  Inbox,
  Landmark,
  LayoutGrid,
  MousePointerClick,
  Network,
  Settings,
  Shapes,
  ShieldAlert,
  ShieldCheck,
  Star,
  UserCheck,
  Users,
  Wallet,
  Compass,
  Handshake,
  Briefcase,
  MessageSquare,
  Layers,
  Tag,
  Trophy,
  MapPin,
  CreditCard,
  Map,
  CheckCircle2,
  FolderOpen,
  UserCog
} from 'lucide-react';
import { ROUTES } from './routes';

export const sidebarNavigation = [
  {
    label: 'Dashboard',
    icon: LayoutGrid,
    children: [
      { label: 'Overview Dashboard', route: ROUTES.dashboard },
      { label: 'Admin Dashboard', route: ROUTES.adminDashboard },
      { label: 'KYC Dashboard', route: ROUTES.kycDashboard },
      { label: 'Revenue Dashboard', route: ROUTES.revenueDashboard },
      { label: 'Bookings Dashboard', route: ROUTES.dashboardBookings },
      { label: 'User Dashboard', route: ROUTES.dashboardUsers },
      { label: 'Partner Dashboard', route: ROUTES.dashboardPartners },
      { label: 'Payment Dashboard', route: ROUTES.dashboardPayment },
      { label: 'Services Dashboard', route: ROUTES.dashboardServices },
      { label: 'GST Dashboard', route: ROUTES.dashboardGST },
      { label: 'Approval Dashboard', route: ROUTES.dashboardApprovals },
      { label: 'Performance Dashboard', route: ROUTES.performance },
      { label: 'Live Dashboard', route: ROUTES.liveDashboard },
      { label: 'Inventory Dashboard', route: ROUTES.materialInventory },
      { label: 'Quotation Dashboard', route: ROUTES.quotationDashboard },
      { label: 'Earnings Dashboard', route: ROUTES.walletEarnings },
      { label: 'Referral Dashboard', route: ROUTES.referralDashboard },
      { label: 'Campaign Dashboard', route: ROUTES.referralCampaignDashboard },
      { label: 'Fraud Dashboard', route: ROUTES.fraudDashboard },
      { label: 'Order Dashboard', route: ROUTES.orderDashboard },
      { label: 'Activity Center', route: ROUTES.dashboardActivity },
      { label: 'System Health', route: ROUTES.dashboardSystemHealth },
      { label: 'Channel Performance & ROI', route: ROUTES.dashboardChannelPerformance },
      { label: 'Conversion Analytics', route: ROUTES.dashboardConversionAnalytics }
    ]
  },
  {
    label: 'Admin Management',
    icon: UserCog,
    children: [
      { label: 'All Admins', route: ROUTES.adminDashboard },
      { label: 'Team Management', route: ROUTES.adminDashboard },
      { label: 'Role & Permission', route: ROUTES.rolePermissions },
      { label: 'Module Access', route: ROUTES.moduleAccess },
      { label: 'Activity Monitoring', route: ROUTES.userAccessLogs },
      { label: 'Login Monitoring', route: ROUTES.roleAuditLogs },
      { label: 'System Logs', route: ROUTES.settingsSystemLogs },
      { label: 'Security Center', route: ROUTES.settingsSecurityGeneral },
      { label: 'Audit Trail', route: ROUTES.settingsSecurityAudit }
    ]
  },
  {
    label: 'User Management',
    icon: Users,
    children: [
      {
        label: 'Users',
        children: [
          { label: 'All Users', route: ROUTES.users },
          { label: 'Customer Directory', route: ROUTES.customerDirectory },
          // { label: 'Add User', route: ROUTES.addUser },
          { label: 'User Approvals', route: ROUTES.userApprovals }
        ]
      },
      {
        label: 'Operations',
        children: [
          { label: 'User Referrals', route: ROUTES.userReferrals },
          { label: 'User Documents', route: ROUTES.userDocuments },
          { label: 'User Complaints', route: ROUTES.userComplaints },
          { label: 'User Reviews', route: ROUTES.userReviews }
        ]
      },
      {
        label: 'Monitoring',
        children: [
          { label: 'User Timeline', route: ROUTES.userTimeline },
          { label: 'User Activity Logs', route: ROUTES.userActivityLogs },
          { label: 'User Fraud Monitoring', route: ROUTES.userFraudMonitoring },
          { label: 'User Audit Logs', route: ROUTES.userAuditLogs }
        ]
      }
    ]
  },
  {
    label: 'Partner Management',
    icon: Handshake,
    children: [
      {
        label: 'Partners',
        children: [
          { label: 'All Partners', route: ROUTES.partners },
          // { label: 'Add Partner', route: ROUTES.addPartner },
          { label: 'ISP Partners', route: ROUTES.ispPartners },
          { label: 'BSP Partners', route: ROUTES.bspPartners },
          { label: 'Business Sellers', route: ROUTES.businessSellers }
        ]
      },
      {
        label: 'Approvals',
        children: [
          { label: 'Partner Approvals', route: ROUTES.partnerApprovals },
          { label: 'KYC Approvals', route: ROUTES.kycApprovals },
          { label: 'Service Approvals', route: ROUTES.partnerServiceApprovals },
          { label: 'Branch Approvals', route: ROUTES.branchApprovals }
        ]
      },
      {
        label: 'Operations',
        children: [
          { label: 'Partner Wallets', route: ROUTES.partnerWallets },
          { label: 'Partner Banking', route: ROUTES.partnerBanking },
          { label: 'Partner Employees', route: ROUTES.partnerEmployees },
          { label: 'Partner Branches', route: ROUTES.partnerBranches },
          { label: 'Partner Services', route: ROUTES.partnerServices }
        ]
      },
      {
        label: 'Monitoring',
        children: [
          { label: 'Partner Reviews', route: ROUTES.partnerReviews },
          { label: 'Partner Revenue', route: ROUTES.partnerRevenue },
          { label: 'Partner Fraud Monitoring', route: ROUTES.partnerFraud },
          { label: 'Partner Audit Logs', route: ROUTES.partnerAuditLogs }
        ]
      }
    ]
  },
  {
    label: 'KYC Management',
    icon: ShieldCheck,
    route: ROUTES.kyc,
    children: [
      { label: 'Pending KYC', route: ROUTES.kycPending },
      { label: 'Approved KYC', route: ROUTES.kycApproved },
      { label: 'Rejected KYC', route: ROUTES.kycRejected },
      { label: 'Reupload Requests', route: ROUTES.kycReupload },
      { label: 'Aadhaar Verification', route: ROUTES.kycAadhaar },
      { label: 'PAN Verification', route: ROUTES.kycPan },
      { label: 'GST Verification', route: ROUTES.kycGst },
      { label: 'Driving License Verification', route: ROUTES.kycDriving },
      { label: 'Voter ID Verification', route: ROUTES.kycVoter },
      { label: 'Selfie Verification', route: ROUTES.kycSelfie },
      { label: 'Face Match Verification', route: ROUTES.kycFaceMatch },
      { label: 'Video KYC Verification', route: ROUTES.kycVideo },
      { label: 'Risk Assessment', route: ROUTES.kycRisk },
      { label: 'Manual Investigation', route: ROUTES.kycManual },
      { label: 'Reviewer Management', route: ROUTES.kycReviewers },
      { label: 'KYC Analytics', route: ROUTES.kycAnalytics },
      { label: 'Audit Logs', route: ROUTES.kycAuditLogs }
    ]
  },
  {
    label: 'Business Management',
    icon: Briefcase,
    children: [
      { label: 'All Businesses', route: ROUTES.business },
      { label: 'Add Business', route: ROUTES.addBusiness },
      { label: 'Business Approvals', route: ROUTES.businessApproval },
      { label: 'GST Verification', route: ROUTES.businessGst },
      { label: 'PAN Verification', route: ROUTES.businessPan },
      { label: 'Registration Verification', route: ROUTES.businessRegVerification },
      { label: 'Ownership Verification', route: ROUTES.businessOwnership },
      { label: 'Business Branches', route: ROUTES.businessBranches },
      { label: 'Business Services', route: ROUTES.businessServices },
      { label: 'Business Employees', route: ROUTES.businessEmployees },
      { label: 'Business Revenue', route: ROUTES.businessRevenue },
      { label: 'Business Reviews', route: ROUTES.businessReviews },
      { label: 'Compliance Center', route: ROUTES.businessCompliance },
      { label: 'Fraud Investigation', route: ROUTES.businessFraud },
      { label: 'Audit Logs', route: ROUTES.businessAuditLogs }
    ]
  },
  {
    label: 'Branch Management',
    icon: Network,
    children: [
      { label: 'All Branches', route: ROUTES.branches },
      { label: 'Branch Approvals', route: ROUTES.branchApproval },
      { label: 'Branch Services', route: ROUTES.branchServices },
      { label: 'Branch Employees', route: ROUTES.branchEmployees },
      { label: 'Branch Bookings', route: ROUTES.branchBookings },
      { label: 'Branch Revenue', route: ROUTES.branchAnalytics },
      { label: 'Service Areas', route: ROUTES.branchServiceAreas },
      { label: 'Coverage Mapping', route: ROUTES.branchCoverage },
      { label: 'Availability Calendar', route: ROUTES.branchSchedule },
      { label: 'Branch Reviews', route: ROUTES.branchReviews },
      { label: 'Branch Performance', route: ROUTES.branchPerformance },
      { label: 'Compliance Center', route: ROUTES.branchCompliance },
      { label: 'Audit Logs', route: ROUTES.branchAuditLogs }
    ]
  },
  {
    label: 'Location Management',
    icon: Map,
    route: ROUTES.locationManagement
  },
  {
    label: 'Service Management',
    icon: Shapes,
    children: [
      { label: 'Categories', route: ROUTES.serviceCategories },
      { label: 'Sub Categories', route: ROUTES.serviceSubCategories },
      { label: 'All Services', route: ROUTES.services },
      { label: 'Service Creation', route: ROUTES.serviceCreation },
      { label: 'Service Activation', route: ROUTES.serviceActivation },
      { label: 'Service Approvals', route: ROUTES.serviceApprovals },
      { label: 'Pricing Management', route: ROUTES.servicePricing },
      { label: 'Commission Management', route: ROUTES.serviceCommission },
      { label: 'Service Areas', route: ROUTES.serviceAreasList },
      { label: 'Coverage Mapping', route: ROUTES.serviceAreaCoverage },
      { label: 'Service Performance', route: ROUTES.servicePerformance },
      { label: 'Service Analytics', route: ROUTES.serviceAnalytics },
      { label: 'Featured Services', route: ROUTES.serviceFeatured },
      { label: 'Media Library', route: ROUTES.serviceMedia },
      { label: 'Audit Logs', route: ROUTES.serviceAuditLogs }
    ]
  },
  {
    label: 'Employee Management',
    icon: Contact,
    children: [
      { label: 'All Employees', route: ROUTES.employeeAll },
      { label: 'Branch Managers', route: ROUTES.branchManagers },
      { label: 'Assignments', route: ROUTES.employeeAssignments },
      { label: 'Availability Board', route: ROUTES.employeeAvailability },
      { label: 'Attendance', route: ROUTES.attendance },
      { label: 'Leave Management', route: ROUTES.leaveManagement },
      { label: 'Employee Documents', route: ROUTES.employeeDocuments },
      { label: 'Employee KYC', route: ROUTES.employeeKyc },
      { label: 'Ratings & Reviews', route: ROUTES.employeeRatings },
      { label: 'Earnings', route: ROUTES.employeeEarnings },
      { label: 'Employee Analytics', route: ROUTES.employeeAnalytics },
      { label: 'Audit Logs', route: ROUTES.employeeAuditLogs }
    ]
  },
  {
    label: 'Booking Management',
    icon: CalendarCheck,
    route: ROUTES.bookings,
    children: [
      {
        label: 'Bookings',
        children: [
          { label: 'All Bookings', route: ROUTES.bookingAll }
        ]
      },
      {
        label: 'Status Based',
        children: [
          { label: 'Pending', route: ROUTES.bookingPending },
          { label: 'Assigned', route: ROUTES.bookingAssigned },
          { label: 'Accepted', route: ROUTES.bookingAccepted },
          { label: 'In Progress', route: ROUTES.bookingInProgress },
          { label: 'Material Pending', route: ROUTES.bookingMaterialPending },
          { label: 'Quotation Pending', route: ROUTES.bookingQuotationPending },
          { label: 'OTP Pending', route: ROUTES.bookingOtpPending },
          { label: 'Completed', route: ROUTES.bookingCompleted },
          { label: 'Cancelled', route: ROUTES.bookingCancelled },
          { label: 'Refunded', route: ROUTES.bookingRefunded },
          { label: 'Escalated', route: ROUTES.bookingEscalated },
          { label: 'Disputed', route: ROUTES.bookingDisputed }
        ]
      },
      {
        label: 'Operations',
        children: [
          { label: 'Assignment Center', route: ROUTES.bookingAssignmentCenter },
          { label: 'OTP Verification', route: ROUTES.bookingOtpVerification },
          { label: 'Booking Calendar', route: ROUTES.bookingCalendar },
          { label: 'Booking Map View', route: ROUTES.bookingMap }
        ]
      },
      {
        label: 'Finance',
        children: [
          { label: 'Payments', route: ROUTES.bookingPayments },
          { label: 'Invoices', route: ROUTES.bookingInvoices },
          { label: 'Refunds', route: ROUTES.bookingRefunds }
        ]
      },
      {
        label: 'Monitoring',
        children: [
          { label: 'SLA Monitoring', route: ROUTES.bookingSla },
          { label: 'Booking Analytics', route: ROUTES.bookingAnalytics },
          { label: 'Fraud Detection', route: ROUTES.bookingFraud }
        ]
      },
      { label: 'Archive', route: ROUTES.bookingArchive }
    ]
  },
  {
    label: 'Live Tracking',
    icon: Compass,
    children: [
      { label: 'Operations Map', route: ROUTES.liveOpsMap },
      { label: 'Active Jobs', route: ROUTES.liveActiveJobs },
      { label: 'Employee Tracking', route: ROUTES.liveEmployeeTracking },
      { label: 'Route Tracking', route: ROUTES.liveRouteTracking },
      { label: 'ETA Monitoring', route: ROUTES.liveEta },
      { label: 'Delay Monitoring', route: ROUTES.liveDelay },
      { label: 'Geofence Management', route: ROUTES.liveGeofence },
      { label: 'Geofence Logs', route: ROUTES.liveGeofenceLogs },
      { label: 'Movement History', route: ROUTES.liveHistory },
      { label: 'Heatmaps', route: ROUTES.liveHeatmaps },
      { label: 'SOS Tracking', route: ROUTES.liveSos },
      { label: 'Tracking Analytics', route: ROUTES.liveAnalytics }
    ]
  },
  {
    label: 'Material Management',
    icon: Inbox,
    children: [
      { label: 'Material Requests', route: ROUTES.materialRequests },
      { label: 'Create Request', route: ROUTES.materialCreate },
      { label: 'Approval Queue', route: ROUTES.materialApprovals },
      { label: 'Inventory Listing', route: ROUTES.materialListing },
      { label: 'Material Categories', route: ROUTES.materialCategories },
      { label: 'Restocking', route: ROUTES.materialRestocking },
      { label: 'Vendor Recommendations', route: ROUTES.materialVendors },
      { label: 'Supplier Comparison', route: ROUTES.materialSupplierComparison },
      { label: 'Purchase Orders', route: ROUTES.materialPurchaseOrders },
      { label: 'Delivery Tracking', route: ROUTES.materialDelivery },
      { label: 'Material Consumption', route: ROUTES.materialConsumption },
      { label: 'Material Returns', route: ROUTES.materialReturns },
      { label: 'Supplier Performance', route: ROUTES.materialSupplierPerformance },
      { label: 'Material Analytics', route: ROUTES.materialAnalytics }
    ]
  },
  {
    label: 'Quotation Management',
    icon: FileText,
    children: [
      { label: 'Seller Quotations', route: ROUTES.quotationSeller },
      { label: 'Customer Quotations', route: ROUTES.quotationCustomer },
      { label: 'RFQ Listing', route: ROUTES.quotationRfq },
      { label: 'Create RFQ', route: ROUTES.quotationCreateRfq },
      { label: 'Approval Queue', route: ROUTES.quotationApprovals },
      { label: 'Winner Selection', route: ROUTES.quotationWinner },
      { label: 'Negotiation Center', route: ROUTES.quotationNegotiation },
      { label: 'Purchase Orders', route: ROUTES.quotationOrders },
      { label: 'Cost Optimization', route: ROUTES.quotationCostOptimization },
      { label: 'Seller Performance', route: ROUTES.quotationSellerPerformance },
      { label: 'Pricing Analytics', route: ROUTES.quotationAnalytics },
      { label: 'Disputes', route: ROUTES.quotationDisputes },
      { label: 'Reports', route: ROUTES.quotationReports }
    ]
  },
  {
    label: 'Wallet Management',
    icon: Wallet,
    children: [
      { label: 'All Wallets', route: ROUTES.walletAll },
      { label: 'User Wallets', route: ROUTES.walletUser },
      { label: 'Partner Wallets', route: ROUTES.walletPartner },
      { label: 'Seller Wallets', route: ROUTES.walletSeller },
      { label: 'Employee Wallets', route: ROUTES.walletEmployee },
      { label: 'Transactions', route: ROUTES.walletTransactions },
      { label: 'Refunds', route: ROUTES.walletRefunds },
      { label: 'Penalties', route: ROUTES.walletPenalties },
      { label: 'Settlements', route: ROUTES.settlements },
      { label: 'Freeze Wallets', route: ROUTES.walletFreeze },
      { label: 'Fraud Monitoring', route: ROUTES.walletFraud },
      { label: 'Chargebacks', route: ROUTES.chargebackManagement },
      { label: 'Wallet Analytics', route: ROUTES.walletAnalytics },
      { label: 'Reconciliation', route: ROUTES.walletReconciliation }
    ]
  },
  {
    label: 'Banking & Settlements',
    icon: Landmark,
    children: [
      { label: 'Bank Accounts', route: ROUTES.bankAccounts },
      { label: 'Beneficiaries', route: ROUTES.bankBeneficiaries },
      { label: 'UPI Verification', route: ROUTES.bankUpi },
      { label: 'Withdrawal Requests', route: ROUTES.withdrawalRequests },
      { label: 'Withdrawal Approvals', route: ROUTES.withdrawalApprovals },
      { label: 'Settlement Queue', route: ROUTES.settlementQueue },
      { label: 'Bulk Settlements', route: ROUTES.bulkSettlements },
      { label: 'Failed Settlements', route: ROUTES.failedSettlements },
      { label: 'Reconciliation', route: ROUTES.bankingReconciliation },
      { label: 'Payout Processing', route: ROUTES.payoutProcessing },
      { label: 'Finance Approvals', route: ROUTES.financeApprovals },
      { label: 'Banking Analytics', route: ROUTES.bankingAnalytics },
      { label: 'Bank Performance', route: ROUTES.bankPerformance }
    ]
  },
  {
    label: 'Payment Management',
    icon: CreditCard,
    route: ROUTES.paymentManagement
  },
  {
    label: 'Revenue Management',
    icon: Banknote,
    children: [
      { label: 'Revenue Overview', route: ROUTES.revenueOverview },
      { label: 'Daily Revenue', route: ROUTES.revenueDaily },
      { label: 'Weekly Revenue', route: ROUTES.revenueWeekly },
      { label: 'Monthly Revenue', route: ROUTES.revenueMonthly },
      { label: 'Yearly Revenue', route: ROUTES.revenueYearly },
      { label: 'Partner Revenue', route: ROUTES.revenuePartner },
      { label: 'Seller Revenue', route: ROUTES.revenueSeller },
      { label: 'Branch Revenue', route: ROUTES.revenueBranch },
      { label: 'Employee Revenue', route: ROUTES.revenueEmployee },
      { label: 'Service Revenue', route: ROUTES.revenueService },
      { label: 'Profit & Loss', route: ROUTES.revenueProfitLoss },
      { label: 'Expenses', route: ROUTES.revenueExpenses },
      { label: 'Revenue Forecasting', route: ROUTES.revenueForecasting },
      { label: 'Targets', route: ROUTES.revenueTargets },
      { label: 'Executive Dashboard', route: ROUTES.revenueExecutive },
      { label: 'Business Intelligence Center', route: ROUTES.revenueBI },
      { label: 'Financial Health', route: ROUTES.revenueHealth }
    ]
  },
  {
    label: 'Referral Management',
    icon: Network,
    children: [
      { label: 'Referral Listing', route: ROUTES.referralListing },
      { label: 'Campaign Listing', route: ROUTES.referralCampaignListing },
      { label: 'Create Campaign', route: ROUTES.referralCreateCampaign },
      { label: 'Reward Approval Queue', route: ROUTES.referralRewardApprovals },
      { label: 'Reward Settlements', route: ROUTES.referralRewardSettlements },
      { label: 'Conversion Analytics', route: ROUTES.referralConversionAnalytics },
      { label: 'Referral Sources', route: ROUTES.referralSources },
      { label: 'Leaderboard', route: ROUTES.referralLeaderboard },
      { label: 'Referral Fraud Detection', route: ROUTES.referralFraud },
      { label: 'Investigations', route: ROUTES.referralInvestigations },
      { label: 'Coupon Management', route: ROUTES.referralCoupons },
      { label: 'QR Management', route: ROUTES.referralQr }
    ]
  },
  {
    label: 'Notification Center',
    icon: MessageSquare,
    children: [
      { label: 'Push Notifications', route: ROUTES.notificationsPush },
      { label: 'SMS Campaigns', route: ROUTES.notificationsSms },
      { label: 'WhatsApp Campaigns', route: ROUTES.notificationsWhatsapp },
      { label: 'Email Campaigns', route: ROUTES.notificationsEmail },
      { label: 'Notification Templates', route: ROUTES.notificationsTemplates },
      { label: 'Audience Segments', route: ROUTES.notificationsAudience },
      { label: 'Scheduled Campaigns', route: ROUTES.notificationsScheduled },
      { label: 'Automation Rules', route: ROUTES.notificationsAutomation },
      { label: 'Delivery Reports', route: ROUTES.notificationsDelivery }
    ]
  },
  {
    label: 'CMS',
    icon: ClipboardList,
    children: [
      { label: 'Privacy Policy', route: ROUTES.cmsPrivacy },
      { label: 'Refund Policy', route: ROUTES.cmsRefund },
      { label: 'Cancellation Policy', route: ROUTES.cmsCancellation },
      { label: 'Terms & Conditions', route: ROUTES.cmsTerms },
      { label: 'FAQ', route: ROUTES.cmsFaqs },
      { label: 'Help Center', route: ROUTES.cmsHelpCenter },
      { label: 'Documentation Center', route: ROUTES.cmsDocumentationCenter },
      {
        label: 'Banner Management',
        children: [
          { label: 'Home Banner', route: ROUTES.bannersHome },
          { label: 'Offer Banner', route: ROUTES.bannersOffer },
          { label: 'Promotional Banner', route: ROUTES.bannersPromotional },
          { label: 'Marketing Banner', route: ROUTES.bannersMarketing },
          { label: 'Upload Banner', route: ROUTES.bannersUpload },
          { label: 'Banner Preview', route: ROUTES.bannersPreview },
          { label: 'Banner Scheduling', route: ROUTES.bannersScheduling },
          { label: 'Banner Status', route: ROUTES.bannersStatus }
        ]
      },
      {
        label: 'App Management',
        children: [
          { label: 'App Access Management', route: ROUTES.appAccessManagement },
          { label: 'App Data Management', route: ROUTES.appDataManagement },
          {
            label: 'User App Management',
            children: [
              { label: 'Home Screen Builder', route: ROUTES.userAppHomeBuilder },
              { label: 'Service Categories', route: ROUTES.userAppServiceCategories },
              { label: 'App Flow & Catalog', route: ROUTES.userAppFlowServices },
              { label: 'Bookings Ledger', route: ROUTES.userAppAdminBookings },
              { label: 'Payments Ledger', route: ROUTES.userAppAdminPayments },
              { label: 'Powerpass Subscriptions', route: ROUTES.userAppPowerpass },
              { label: 'Onboarding Screens', route: ROUTES.userAppOnboarding },
              { label: 'Instahelp Support', route: ROUTES.userAppInstahelp },
              { label: 'User Features', route: ROUTES.userAppFeatures },
              { label: 'User Menus', route: ROUTES.userAppMenus },
              { label: 'User Configuration', route: ROUTES.userAppConfig },
              { label: 'App Version', route: ROUTES.userAppVersion }
            ]
          },
          {
            label: 'Partner App Management',
            children: [
              { label: 'Partner Features', route: ROUTES.partnerAppFeatures },
              { label: 'Partner Roles', route: ROUTES.partnerAppRoles },
              { label: 'Partner Menus', route: ROUTES.partnerAppMenus },
              { label: 'Partner Configuration', route: ROUTES.partnerAppConfig }
            ]
          },
          {
            label: 'User Menu Management',
            children: [
              { label: 'User Menu', route: ROUTES.menuUser },
              { label: 'Menu Ordering', route: ROUTES.menuOrdering },
              { label: 'Menu Visibility', route: ROUTES.menuVisibility },
              { label: 'Menu Permission', route: ROUTES.menuPermission }
            ]
          },
          {
            label: 'Partner Menu Management',
            children: [
              { label: 'Partner Menu', route: ROUTES.menuPartner }
            ]
          },
          { label: 'Feature Toggle', route: ROUTES.featureToggle },
          { label: 'App Configuration', route: ROUTES.appManagementConfig },
          { label: 'Remote Configuration', route: ROUTES.appManagementRemoteConfig },
          { label: 'Maintenance Mode', route: ROUTES.appManagementMaintenance }
        ]
      }
    ]
  },
  {
    label: 'Reviews & Ratings',
    icon: Star,
    children: [
      { label: 'User Reviews', route: ROUTES.reviewsUser },
      { label: 'Partner Reviews', route: ROUTES.reviewsPartner },
      { label: 'Employee Reviews', route: ROUTES.reviewsEmployee },
      { label: 'Review Moderation', route: ROUTES.reviewsModeration },
      { label: 'Rating Analytics', route: ROUTES.reviewsAnalytics }
    ]
  },
  {
    label: 'SOS Management',
    icon: Activity,
    children: [
      { label: 'Active SOS', route: ROUTES.sosActive },
      { label: 'Resolved SOS', route: ROUTES.sosResolved },
      { label: 'Escalated SOS', route: ROUTES.sosEscalated },
      { label: 'Emergency Tracking', route: ROUTES.sosTracking },
      { label: 'Incident Reports', route: ROUTES.sosIncidentReports }
    ]
  },
  {
    label: 'Support Center',
    icon: HelpCircle,
    children: [
      { label: 'All Tickets', route: ROUTES.supportAll },
      { label: 'Open Tickets', route: ROUTES.supportOpen },
      { label: 'In Progress Tickets', route: ROUTES.supportInProgress },
      { label: 'Escalated Tickets', route: ROUTES.supportEscalated },
      { label: 'Closed Tickets', route: ROUTES.supportClosed },
      { label: 'Booking Issues', route: ROUTES.supportBookingIssues },
      { label: 'Payment Issues', route: ROUTES.supportPaymentIssues },
      { label: 'Wallet Issues', route: ROUTES.supportWalletIssues },
      { label: 'Technical Issues', route: ROUTES.supportTechnicalIssues },
      { label: 'KYC Issues', route: ROUTES.supportKycIssues },
      { label: 'SLA Monitoring', route: ROUTES.supportSla },
      { label: 'Support Analytics', route: ROUTES.supportAnalytics }
    ]
  },
  {
    label: 'Fraud Management',
    icon: ShieldAlert,
    children: [
      { label: 'User Fraud', route: ROUTES.fraudUser },
      { label: 'Partner Fraud', route: ROUTES.fraudPartner },
      { label: 'Wallet Fraud', route: ROUTES.fraudWallet },
      { label: 'Booking Fraud', route: ROUTES.fraudBooking },
      { label: 'Investigations', route: ROUTES.fraudInvestigations },
      { label: 'Risk Scoring', route: ROUTES.fraudRisk },
      { label: 'Blacklist Management', route: ROUTES.blacklistManagement }
    ]
  },
  {
    label: 'Reports & Analytics',
    icon: BarChart3,
    children: 
    
    [
      { label: 'Operational Reports', route: ROUTES.reportsOperational },
      { label: 'Booking Reports', route: ROUTES.reportsBooking },
      { label: 'User Reports', route: ROUTES.reportsUser },
      { label: 'Partner Reports', route: ROUTES.reportsPartner },
      { label: 'Employee Reports', route: ROUTES.reportsEmployee },
      { label: 'Financial Reports', route: ROUTES.reportsFinancial },
      { label: 'Revenue Reports', route: ROUTES.reportsRevenue },
      { label: 'Wallet Reports', route: ROUTES.reportsWallet },
      { label: 'Settlement Reports', route: ROUTES.reportsSettlement },
      { label: 'Marketing Reports', route: ROUTES.reportsMarketing },
      { label: 'Referral Reports', route: ROUTES.reportsReferral },
      { label: 'Campaign Reports', route: ROUTES.reportsCampaign },
      { label: 'Export Center', route: ROUTES.exportCenter },
      { label: 'PDF Exports', route: ROUTES.pdfExports },
      { label: 'Excel Exports', route: ROUTES.excelExports },
      { label: 'CSV Exports', route: ROUTES.csvExports }
    ]
  },
  {
    label: 'Approval Management',
    icon: CheckCircle2,
    route: ROUTES.approvalQueue
  },
  {
    label: 'Role & Permission',
    icon: UserCheck,
    children: [
      { label: 'All Roles', route: ROUTES.rolePermissions },
      { label: 'Create Role', route: ROUTES.createRole },
      { label: 'Permission Matrix', route: ROUTES.permissionMatrix },
      { label: 'Module Access', route: ROUTES.moduleAccess },
      { label: 'Action Permissions', route: ROUTES.actionPermissions },
      { label: 'User Access Logs', route: ROUTES.userAccessLogs },
      { label: 'Role Audit Logs', route: ROUTES.roleAuditLogs }
    ]
  },
  {
    label: 'Order Management',
    icon: Layers,
    children: [
      { label: 'All Orders', route: ROUTES.orderManagement }
    ]
  },
  {
    label: 'Price Management',
    icon: Banknote,
    route: ROUTES.priceManagement
  },
  {
    label: 'Offer Management',
    icon: Tag,
    route: ROUTES.offerManagement
  },
  {
    label: 'Reward Management',
    icon: Trophy,
    route: ROUTES.rewardManagement
  },
  {
    label: 'GST Management',
    icon: FileText,
    route: ROUTES.gstManagement
  },
  {
    label: 'Platform Fee Management',
    icon: Landmark,
    route: ROUTES.platformFeeManagement
  },
  {
    label: 'Performance Management',
    icon: Activity,
    route: ROUTES.performanceManagement
  },
  {
    label: 'Favorite Address Management',
    icon: MapPin,
    route: ROUTES.favoriteAddressManagement
  },
  {
    label: 'Material Price Management',
    icon: Wallet,
    route: ROUTES.materialPriceManagement
  },
  {
    label: 'Document Management',
    icon: FolderOpen,
    children: [
      { label: 'Contracts', route: ROUTES.docContracts },
      { label: 'Agreements', route: ROUTES.docAgreements },
      { label: 'KYC Documents', route: ROUTES.docKyc },
      { label: 'Verification Records', route: ROUTES.docVerification }
    ]
  },
  {
    label: 'Settings',
    icon: Settings,
    children: [
      {
        label: 'Platform',
        children: [
          { label: 'General Settings', route: ROUTES.settingsPlatformGeneral },
          { label: 'Platform Configuration', route: ROUTES.settingsPlatformConfig }
        ]
      },
      {
        label: 'Financial',
        children: [
          { label: 'Commission Settings', route: ROUTES.settingsFinancialCommission },
          { label: 'Tax Settings', route: ROUTES.settingsFinancialTax },
          { label: 'Wallet Settings', route: ROUTES.settingsFinancialWallet },
          { label: 'Settlement Settings', route: ROUTES.settingsFinancialSettlement }
        ]
      },
      {
        label: 'Security',
        children: [
          { label: 'Security Settings', route: ROUTES.settingsSecurityGeneral },
          { label: 'Password Policies', route: ROUTES.settingsSecurityPassword },
          { label: 'Session Management', route: ROUTES.settingsSecuritySession },
          { label: 'Audit Logs', route: ROUTES.settingsSecurityAudit }
        ]
      },
      {
        label: 'System',
        children: [
          { label: 'Backup Management', route: ROUTES.settingsSystemBackup },
          { label: 'Maintenance Mode', route: ROUTES.settingsSystemMaintenance },
          { label: 'System Logs', route: ROUTES.settingsSystemLogs }
        ]
      }
    ]
  }
];
