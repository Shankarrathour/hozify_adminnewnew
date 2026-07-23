import React, { useEffect } from 'react';
import { useApp } from '../../hooks/useApp';
import { ShellProvider } from '../../components/layouts/ShellContext';
import GlobalAdminShell from '../../components/layouts/GlobalAdminShell';
import { ROUTES } from '../../config/routes';
import RoleSelection from '../../pages/RoleSelection';
import Login from '../../pages/Login';
import ForgotPassword from '../../pages/ForgotPassword';
import OtpVerification from '../../pages/OtpVerification';
import ResetPassword from '../../pages/ResetPassword';
import PasswordResetSuccess from '../../pages/PasswordResetSuccess';
import Dashboard from '../../pages/Dashboard';
import MyProfile from '../../pages/MyProfile';
import AccountSettings from '../../pages/Settings/AccountSettings';
import ChangePasswordPage from '../../pages/Settings/ChangePasswordPage';
import ActivityLogPage from '../../pages/MyProfile/ActivityLogPage';
import HelpSupportPage from '../../pages/MyProfile/HelpSupportPage';
import RevenueDashboard from '../../pages/Dashboard/RevenueDashboard';
import BookingAnalytics from '../../pages/Dashboard/BookingAnalytics';
import BookingsDashboard from '../../pages/BookingManagement/BookingsDashboard';
import UserAnalytics from '../../pages/Dashboard/UserAnalytics';
import PartnerAnalytics from '../../pages/Dashboard/PartnerAnalytics';
import ApprovalsDashboard from '../../pages/Dashboard/ApprovalsDashboard';
import SystemHealth from '../../pages/Dashboard/SystemHealth';
import ActivityCenter from '../../pages/Dashboard/ActivityCenter';
import MaterialRequests from '../../pages/MaterialRequests';
import NewMaterialRequest from '../../pages/MaterialRequests/NewRequest';
import MaterialRequestDetails from '../../pages/MaterialRequests/Details';
import ApprovalPipeline from '../../pages/MaterialRequests/Approvals';
import InventoryDashboard from '../../pages/MaterialRequests/InventoryDashboard';
import InventoryListing from '../../pages/MaterialRequests/InventoryListing';
import MaterialCategories from '../../pages/MaterialRequests/Categories';
import Restocking from '../../pages/MaterialRequests/Restocking';
import VendorRecommendation from '../../pages/MaterialRequests/VendorRecommendation';
import ConsumptionTracking from '../../pages/MaterialRequests/ConsumptionTracking';
import DeliveryTracking from '../../pages/MaterialRequests/DeliveryTracking';
import PurchaseOrders from '../../pages/MaterialRequests/PurchaseOrders';
import CostOptimization from '../../pages/MaterialRequests/CostOptimization';
import SupplierComparison from '../../pages/MaterialRequests/SupplierComparison';
import MaterialReports from '../../pages/MaterialRequests/MaterialReports';
import DisputeCenter from '../../pages/MaterialRequests/DisputeCenter';
import MaterialReturns from '../../pages/MaterialRequests/MaterialReturns';
import MaterialAnalytics from '../../pages/MaterialRequests/MaterialAnalytics';
import Partners from '../../pages/Partners';
import ISPPartners from '../../pages/Partners/ISPPartners';
import PartnerDetails from '../../pages/PartnerDetails';

import ApprovalQueue from '../../pages/ApprovalQueue';
import FraudCenter from '../../pages/FraudCenter';
import CommunicationsCenter from '../../pages/CommunicationsCenter';
import Settlements from '../../pages/Settlements';
import WalletDashboard from '../../pages/WalletManagement/WalletDashboard';
import WalletAnalytics from '../../pages/WalletManagement/WalletAnalytics';
import TransactionLedger from '../../pages/WalletManagement/TransactionLedger';
import FraudMonitoringCenter from '../../pages/WalletManagement/FraudMonitoringCenter';
import SettlementRequestQueue from '../../pages/WalletManagement/SettlementRequestQueue';
import ChargebackManagement from '../../pages/WalletManagement/ChargebackManagement';
import FinancialReconciliation from '../../pages/WalletManagement/FinancialReconciliation';
import RefundApprovalQueue from '../../pages/WalletManagement/RefundApprovalQueue';
import TransactionDetail from '../../pages/WalletManagement/TransactionDetail';
import WalletAdjustmentCenter from '../../pages/WalletManagement/WalletAdjustmentCenter';
import PenaltyManagement from '../../pages/WalletManagement/PenaltyManagement';
import FrozenWalletListing from '../../pages/WalletManagement/FrozenWalletListing';
import WalletListing from '../../pages/WalletManagement/WalletListing';
import WalletDetails from '../../pages/WalletManagement/WalletDetails';
import WalletFreezeCenter from '../../pages/WalletManagement/WalletFreezeCenter';
import EarningsDashboard from '../../pages/WalletManagement/EarningsDashboard';
import UserWallets from '../../pages/WalletManagement/UserWallets';
import PartnerWallets from '../../pages/WalletManagement/PartnerWallets';
import SellerWallets from '../../pages/WalletManagement/SellerWallets';
import EmployeeWallets from '../../pages/WalletManagement/EmployeeWallets';
import SupplierPerformance from '../../pages/MaterialRequests/SupplierPerformance';
import ServiceCancellation from '../../pages/Bookings/ServiceCancellation';
import SlaCompliance from '../../pages/Bookings/SlaCompliance';
import OperationalReports from '../../pages/Analytics/OperationalReports';
import Analytics from '../../pages/Analytics';
import Users from '../../pages/Users';
import BlockedUsersPage from '../../pages/Users/BlockedUsersPage';
import BookingManagement from '../../pages/BookingManagement';
import CreateBooking from '../../pages/BookingManagement/CreateBooking';
import Placeholder from '../../pages/Placeholder';
import AboutUs from '../../pages/CMSManagement/AboutUs';
import RefundPolicy from '../../pages/CMSManagement/RefundPolicy';
import ContactUs from '../../pages/CMSManagement/ContactUs';
import TermsAndConditions from '../../pages/CMSManagement/TermsAndConditions';
import Faqs from '../../pages/CMSManagement/Faqs';
import PrivacyPolicy from '../../pages/CMSManagement/PrivacyPolicy';
import Blogs from '../../pages/CMSManagement/Blogs';
import SeoSettings from '../../pages/CMSManagement/SeoSettings';
import Employees from '../../pages/Employees';
import KYCModule from '../../pages/KYC';
import KYCDashboard from '../../pages/KYC/KYCDashboard';
import Branches from '../../pages/Branches';
import BranchSchedule from '../../pages/Branches/BranchSchedule';
import BranchSuspend from '../../pages/Branches/BranchSuspend';

import BranchProfile from '../../pages/Branches/BranchProfile';
import ManagerAssignment from '../../pages/Branches/ManagerAssignment';
import CoverageMapping from '../../pages/Branches/CoverageMapping';
import BranchServices from '../../pages/Branches/BranchServices';
import BranchEmployees from '../../pages/Branches/BranchEmployees';
import BranchBookings from '../../pages/Branches/BranchBookings';
import BranchReviews from '../../pages/Branches/BranchReviews';
import BranchAuditLogs from '../../pages/Branches/BranchAuditLogs';
import ServiceAreas from '../../pages/ServiceAreas';
import ServiceAreaCoverage from '../../pages/Services/ServiceAreaCoverage';
import Services from '../../pages/Services';
import BusinessRegistry from '../../pages/Business';
import BusinessDetails from '../../pages/Business/BusinessDetails';
import BusinessRevenue from '../../pages/Business/BusinessRevenue';
import BusinessEmployees from '../../pages/Business/BusinessEmployees';
import ComplianceCenter from '../../pages/Business/ComplianceCenter';
// import FraudInvestigation from '../../pages/Business/FraudInvestigation';
import BusinessVerify from '../../pages/Business/BusinessVerify';
import BusinessSuspension from '../../pages/Business/BusinessSuspension';
import BusinessRisk from '../../pages/Business/BusinessRisk';
import AddBusiness from '../../pages/Business/AddBusiness';
import BusinessDocReview from '../../pages/Business/BusinessDocReview';
import BusinessTaxonomy from '../../pages/Business/BusinessTaxonomy';
import QuotationManagement from '../../pages/QuotationManagement';
import QuotationDashboard from '../../pages/QuotationManagement/QuotationDashboard';
import OrderDashboard from '../../pages/OrderManagement/OrderDashboard';
import BankingSettlementManagement from '../../pages/BankingSettlementManagement';
import SOSManagement from '../../pages/SOSManagement';

// Dashboard sub-routes
import ChannelPerformance from '../../pages/Dashboard/ChannelPerformance';
import ConversionAnalytics from '../../pages/Dashboard/ConversionAnalytics';
import AdminDashboard from '../../pages/Dashboard/AdminDashboard';
import PaymentDashboard from '../../pages/PaymentManagement/PaymentDashboard';
import ServicesOverviewDashboard from '../../pages/Services/ServicesOverviewDashboard';
import GSTDashboard from '../../pages/GSTManagement/GSTDashboard';

// Notification Center sub-routes
import PushNotifications from '../../pages/NotificationCenter/PushNotifications';
import SmsCampaigns from '../../pages/NotificationCenter/SmsCampaigns';
import WhatsAppCampaigns from '../../pages/NotificationCenter/WhatsAppCampaigns';
import AutomationDashboard from '../../pages/NotificationCenter/AutomationDashboard';
import DeliveryReports from '../../pages/NotificationCenter/DeliveryReports';
import InAppNotifications from '../../pages/NotificationCenter/InAppNotifications';
import NotificationApprovalQueue from '../../pages/NotificationCenter/NotificationApprovalQueue';
import NotificationReports from '../../pages/NotificationCenter/NotificationReports';
import NotificationCostCenter from '../../pages/NotificationCenter/NotificationCostCenter';
import GlobalNotificationSettings from '../../pages/NotificationCenter/GlobalNotificationSettings';
import NotificationPreferenceManagement from '../../pages/NotificationCenter/NotificationPreferenceManagement';
import CommunicationLogs from '../../pages/NotificationCenter/CommunicationLogs';

// Support Center sub-routes
import SupportDashboard from '../../pages/SupportCenter/SupportDashboard';
import SupportOperationsList from '../../pages/SupportCenter/SupportOperationsList';
import EscalationCommandCenter from '../../pages/SupportCenter/EscalationCommandCenter';
import SlaMonitoring from '../../pages/SupportCenter/SlaMonitoring';
import CustomerSatisfaction from '../../pages/SupportCenter/CustomerSatisfaction';
import SupportTicketDetails from '../../pages/SupportCenter/SupportTicketDetails';
import SupportTicketCreate from '../../pages/SupportCenter/SupportTicketCreate';
import SupportKnowledgeBaseList from '../../pages/SupportCenter/SupportKnowledgeBaseList';
import SupportKbArticle from '../../pages/SupportCenter/SupportKbArticle';
import SupportFinancialResolutions from '../../pages/SupportCenter/SupportFinancialResolutions';
import SupportOperationsCenter from '../../pages/SupportCenter/SupportOperationsCenter';
import SupportOperationsOverview from '../../pages/SupportCenter/SupportOperationsOverview';
import SupportAgentWorkspace from '../../pages/SupportCenter/SupportAgentWorkspace';
import SupportAutomationRules from '../../pages/SupportCenter/SupportAutomationRules';
import SupportCommunicationsDashboard from '../../pages/SupportCenter/SupportCommunicationsDashboard';
import RevenueOverview from '../../pages/RevenueManagement/RevenueOverview';
import DailyRevenue from '../../pages/RevenueManagement/DailyRevenue';
import WeeklyRevenue from '../../pages/RevenueManagement/WeeklyRevenue';
import MonthlyRevenue from '../../pages/RevenueManagement/MonthyRevenue';
import YearlyRevenue from '../../pages/RevenueManagement/YearlyRevenue';
import RevenuePartnerRevenue from '../../pages/RevenueManagement/PartnerRevenue';
import SellerRevenue from '../../pages/RevenueManagement/SellerRevenue';
import BranchRevenue from '../../pages/RevenueManagement/BranchRevenue';
import EmployeeRevenue from '../../pages/RevenueManagement/EmployeeRevenue';
import ServiceRevenue from '../../pages/RevenueManagement/ServiceRevenue';
import ProfitAndLossRevenue from '../../pages/RevenueManagement/Profit&LossRevenue';
import Expenses from '../../pages/RevenueManagement/Expenses';
import RevenueForecasting from '../../pages/RevenueManagement/RevenueForecasting';
import Targets from '../../pages/RevenueManagement/Targets';
import ExecutiveDashboard from '../../pages/RevenueManagement/ExecutiveDashboard';
import BusinessIntelligence from '../../pages/RevenueManagement/BusinessIntelligence';
import FinancialHealth from '../../pages/RevenueManagement/FinancialHealth';
import LiveDashboard from '../../pages/LiveTracking/LiveDashboard';
import OperationalMap from '../../pages/LiveTracking/OperationalMap';
import ActiveJobs from '../../pages/LiveTracking/ActiveJobs';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import EmployeeTracking from '../../pages/LiveTracking/EmployeeTracking';
import RouteTracking from '../../pages/LiveTracking/RouteTracking';
import ETAMonitoring from '../../pages/LiveTracking/ETAmonitoring';
import DelayMonitoring from '../../pages/LiveTracking/DelayMonitoring';
import GeofenceManagement from '../../pages/LiveTracking/GeofenceManagement';
import GeofenceLogs from '../../pages/LiveTracking/GeofenceLogs';
import MovementHistory from '../../pages/LiveTracking/MovementHistory';
import Heatmaps from '../../pages/LiveTracking/Heatmaps';
import TrackingAnalytics from '../../pages/LiveTracking/TrackingAnalytics';
import SOStracking from '../../pages/LiveTracking/SOStracking';
import AllRoles from '../../pages/RoleSelection/AllRoles';
import CreateRole from '../../pages/RoleSelection/CreateRole';
import PermissionMatrix from '../../pages/RoleSelection/PermissionMatrix';
import ModuleAccess from '../../pages/RoleSelection/ModuleAccess';
import ActionPermissions from '../../pages/RoleSelection/ActionPermission';
import UserAccessLogs from '../../pages/RoleSelection/UserAccessLogs';
import RoleAuditLogs from '../../pages/RoleSelection/RoleAuditLogs';
import UserReviews from '../../pages/ReviewsandRatings/UserReviews';
import PartnerReviews from '../../pages/ReviewsandRatings/PartnerReviews';
import EmployeeReviews from '../../pages/ReviewsandRatings/EmployeeReviews';
import ReviewModeration from '../../pages/ReviewsandRatings/ReviewModeration';
import RatingAnalytics from '../../pages/ReviewsandRatings/RatingAnalytics';
import BusinessHeaderTabs from '../../pages/Business/BusinessHeaderTabs';
import BusinessReviews from '../../pages/Business/BusinessReviews';
import BusinessServices from '../../pages/Business/BusinessServices';
import FraudInvestigation from '../../pages/Business/FraudInvestigation';
import UserReviewsPage from '../../pages/Users/UserReviewsPage';
import UserComplaintpage from '../../pages/Users/UserComplaintPage';
import UserReferralsPage from '../../pages/Users/UserReferralsPage';
import UserTimelineTab from '../../pages/Users/UserTimelineTab';
import UserAuditLog from '../../pages/Users/UserAuditLog';
import UserWalletsPage from '../../pages/Users/UserWalletsPage';
import UserDocumentsPage from '../../pages/Users/UserDocumentsPage';
import UserApprovalPage from '../../pages/Users/UserApprovalPage';
import CustomerDirectory from '../../pages/Users/CustomerDirectory';
import UserActivityLogs from '../../pages/Users/UserActivityLogs';
import UserFraudMonitoringPage from '../../pages/Users/UserFraudMonitoring';
import UserFraudMonitoring from '../../pages/Users/UserFraudMonitoring';
import HomePageBanner from '../../pages/BannerManagement/HomePageBanner';
import OfferBannersPage from '../../pages/BannerManagement/OfferBannersPage';
import CategoryBannersPage from '../../pages/BannerManagement/CategoryBannerPage';
import PopupBannersPage from '../../pages/BannerManagement/PopupBannerPage';
import BannerSchedulingPage from '../../pages/BannerManagement/BannerSchedulingPage';
import BannerAnalyticsPage from '../../pages/BannerManagement/BannerAnalysticsPage';
import ReferralDashboard from '../../pages/ReferralManagement/ReferralDashboard';
import ReferralListingPage from '../../pages/ReferralManagement/ReferralListingPage';
import CampaignDashboard from '../../pages/ReferralManagement/CampaignDashboard';
import CampaignListingPage from '../../pages/ReferralManagement/CampaignListingPage';
import CreateCampaignPage from '../../pages/ReferralManagement/CreateCampaignPage';
import RewardApprovalQueuePage from '../../pages/ReferralManagement/RewardApprovalQueuePage';
import RewardSettlementsPage from '../../pages/ReferralManagement/RewardSettlementPage';
import ConversionAnalyticsPage from '../../pages/ReferralManagement/ConversionAnalyticsPage';
import ReferralSourcesPage from '../../pages/ReferralManagement/ReferralSourcesPage';
import ReferrelLeaderboardPage from '../../pages/ReferralManagement/ReferralLeaderboardPage';
import FraudDetectionPage from '../../pages/ReferralManagement/FraudDetectionPage';
import InvestigationPage from '../../pages/ReferralManagement/InvestigationPage';
import CouponManagement from '../../pages/ReferralManagement/CouponManagementPage';
import CouponManagementPage from '../../pages/ReferralManagement/CouponManagementPage';
import QRManagementPage from '../../pages/ReferralManagement/QRManagementPage';
import SettlementReport from '../../pages/Report&Analytics/SettlementReportPage';
import ReferralReport from '../../pages/Report&Analytics/ReferralReport';
import CampaignReportPage from '../../pages/Report&Analytics/CampaignReportPage';
import ExportCenterPage from '../../pages/Report&Analytics/ExportCenterPage';
import PDFExportPage from '../../pages/Report&Analytics/PDFExportPage';
import ExcelExportPage from '../../pages/Report&Analytics/ExcelExportPage';
import CSVExportPage from '../../pages/Report&Analytics/CSVExportpage';
import BookingReportPage from '../../pages/Report&Analytics/BookingReportPage';
import UserReportPage from '../../pages/Report&Analytics/UserReportPage';
import PartnerReportPage from '../../pages/Report&Analytics/PartnerReportPage';
import EmployeeReportPage from '../../pages/Report&Analytics/EmployeeReportPage';
import RevenueReportspage from '../../pages/Report&Analytics/RevenueReportPage';
import WalletReportPage from '../../pages/Report&Analytics/WalletReportPage';
import GeneralSettings from '../../pages/Settings/GeneralSettings';
import PlatformConfiguration from '../../pages/Settings/PlatformConfiguration';
import CommissionSettings from '../../pages/Settings/CommissionSettings';
import TaxSettings from '../../pages/Settings/TaxSettings';
import SettlementSettings from '../../pages/Settings/SettlementSettings';
import WalletSettings from '../../pages/Settings/WalletSettings';
import PaymentGatewaySettings from '../../pages/Settings/PaymentGatewaySettings';
import SmsGatewayManagement from '../../pages/Settings/SmsGatewayManagement';
import WhatsAppApiIntegration from '../../pages/Settings/WhatsAppApiIntegration';
import EmailSmtpIntegration from '../../pages/Settings/EmailSmtpIntegration';
import GoogleMapsApiIntegration from '../../pages/Settings/GoogleMapsApiIntegration';
import BackupManagement from '../../pages/Settings/BackupManagement';
import MaintenanceMode from '../../pages/Settings/MaintenanceMode';
import SystemLogs from '../../pages/Settings/SystemLogs';
import SecuritySettings from '../../pages/Settings/SecuritySettings';
import PasswordPolicies from '../../pages/Settings/PasswordPolicies';
import SessionManagement from '../../pages/Settings/SessionManagement';
import SystemAuditLogs from '../../pages/Settings/SystemAuditLogs';
import BookingReports from '../../pages/Analytics/BookingReports';
import MarketingReports from '../../pages/Analytics/MarketingReports';
import PartnerReports from '../../pages/Analytics/PartnerReports';
import EmployeeReports from '../../pages/Analytics/EmployeeReports';
import RevenueReports from '../../pages/Analytics/RevenueReports';
import PartnersReviews from '../../pages/Partners/PartnersReviews';
import PartnerApprovals from '../../pages/Partners/PartnerApprovals';
import BusinessSellers from '../../pages/Partners/BusinessSellers';
import KYCApprovals from '../../pages/Partners/KYCApprovals';
import ServiceApprovals from '../../pages/Partners/ServiceApprovals';
import BranchApprovals from '../../pages/Partners/BranchApprovals';
import PartnerBanking from '../../pages/Partners/PartnerBanking';
import PartnerEmployees from '../../pages/Partners/PartnerEmployees';
import PartnerBranches from '../../pages/Partners/PartnerBranches';
import PartnerServices from '../../pages/Partners/PartnerServices';
import PartnersPartnerRevenue from '../../pages/Partners/PartnerRevenue';
import PartnerFraudMonitoring from '../../pages/Partners/PartnerFraudMonitoring';
import PartnerAuditLogs from '../../pages/Partners/PartnerAuditLogs';
import EmailCampaign from '../../pages/NotificationCenter/EmailCampaign';
import NotificationTemplates from '../../pages/NotificationCenter/NotificationTemplates';
import AudienceSegments from '../../pages/NotificationCenter/AudienceSegments';
import ScheduledCampaigns from '../../pages/NotificationCenter/ScheduledCampaigns';
import GSTVerification from '../../pages/Business/GSTVerification';
import PANVerification from '../../pages/Business/PANVerification';
import RegistrationVerification from '../../pages/Business/RegistrationVerification';
import OwnershipVerification from '../../pages/Business/OwnerShipVerification';
import BusinessBranches from '../../pages/Business/BusinessBranches';
import AuditLogs from '../../pages/Business/AuditLogs';

// New consolidated CMS & App Management modules imports
import PoliciesPage from '../../modules/cms/policies/pages/PoliciesPage';
import TermsPage from '../../modules/cms/termsConditions/pages/TermsPage';
import FaqPage from '../../modules/cms/faq/pages/FaqPage';
import HelpCenterPage from '../../modules/cms/helpCenter/pages/HelpCenterPage';
import DocCenterPage from '../../modules/cms/documentationCenter/pages/DocCenterPage';
import AppDashboardPage from '../../modules/cms/appManagement/dashboard/pages/AppDashboardPage';
import BannerMgmtPage from '../../modules/cms/appManagement/bannerManagement/pages/BannerMgmtPage';
import UserAppPage from '../../modules/cms/appManagement/userApp/pages/UserAppPage';
import PartnerAppPage from '../../modules/cms/appManagement/partnerApp/pages/PartnerAppPage';
import FeatureMgmtPage from '../../modules/cms/appManagement/featureManagement/pages/FeatureMgmtPage';
import MenuMgmtPage from '../../modules/cms/appManagement/menuManagement/pages/MenuMgmtPage';

import CancellationPolicy from '../../pages/CMSManagement/CancellationPolicy';
import RemoteConfigPage from '../../modules/cms/appManagement/remoteConfig/pages/RemoteConfigPage';
import AppConfigPage from '../../modules/cms/appManagement/appConfig/pages/AppConfigPage';
import MaintenanceModePage from '../../modules/cms/appManagement/maintenance/pages/MaintenanceModePage';

// New User App Visual Builders
import HomeBuilderPage from '../../modules/cms/appManagement/userApp/pages/HomeBuilderPage';
import ServiceCategoriesUI from '../../modules/cms/appManagement/userApp/pages/ServiceCategoriesUI';
import PowerpassManagerPage from '../../modules/cms/appManagement/userApp/pages/PowerpassManagerPage';
import InstahelpConfigPage from '../../modules/cms/appManagement/userApp/pages/InstahelpConfigPage';
import OnboardingManagerPage from '../../modules/cms/appManagement/userApp/pages/OnboardingManagerPage';

// User App Flow Components
import FlowServicesPage from '../../modules/cms/appManagement/userApp/pages/FlowServicesPage';
import FlowPackagesPage from '../../modules/cms/appManagement/userApp/pages/FlowPackagesPage';
import FlowPackageDetailsPage from '../../modules/cms/appManagement/userApp/pages/FlowPackageDetailsPage';
import FlowSuccessPage from '../../modules/cms/appManagement/userApp/pages/FlowSuccessPage';
import FlowCartPage from '../../modules/cms/appManagement/userApp/pages/FlowCartPage';
import FlowAddressPage from '../../modules/cms/appManagement/userApp/pages/FlowAddressPage';
import FlowAddAddressPage from '../../modules/cms/appManagement/userApp/pages/FlowAddAddressPage';
import FlowSlotPage from '../../modules/cms/appManagement/userApp/pages/FlowSlotPage';
import FlowCheckoutPage from '../../modules/cms/appManagement/userApp/pages/FlowCheckoutPage';
import FlowPaymentPage from '../../modules/cms/appManagement/userApp/pages/FlowPaymentPage';
import FlowConfirmationPage from '../../modules/cms/appManagement/userApp/pages/FlowConfirmationPage';
import AdminBookingsPage from '../../modules/cms/appManagement/userApp/pages/AdminBookingsPage';
import AdminPaymentsPage from '../../modules/cms/appManagement/userApp/pages/AdminPaymentsPage';

import OrderMgmtPage from '../../pages/OrderManagement/OrderMgmtPage';
import PriceMgmtPage from '../../pages/PriceManagement/PriceMgmtPage';
import OfferMgmtPage from '../../pages/OfferManagement/OfferMgmtPage';
import RewardMgmtPage from '../../pages/RewardManagement/RewardMgmtPage';
import GstMgmtPage from '../../pages/GSTManagement/GstMgmtPage';
import PlatformFeeMgmtPage from '../../pages/PlatformFeeManagement/PlatformFeeMgmtPage';
import PerformanceMgmtPage from '../../pages/PerformanceManagement/PerformanceMgmtPage';
import FavoriteAddressMgmtPage from '../../pages/FavoriteAddressManagement/FavoriteAddressMgmtPage';
import MaterialPriceMgmtPage from '../../pages/MaterialPriceManagement/MaterialPriceMgmtPage';
import PaymentMgmtPage from '../../pages/PaymentManagement/PaymentMgmtPage';
import LocationMgmtPage from '../../pages/LocationManagement/LocationMgmtPage';
import { ToastProvider } from '../../components/common/ToastNotification';
import ContractsPage from '../../pages/DocumentManagement/ContractsPage';
import AgreementsPage from '../../pages/DocumentManagement/AgreementsPage';
import KYCDocumentsPage from '../../pages/DocumentManagement/KYCDocumentsPage';
import VerificationRecordsPage from '../../pages/DocumentManagement/VerificationRecordsPage';
import BSPPartners from '../../pages/Partners/BSPPartners';



const dynamicRoutePatterns = Object.values(ROUTES)
  .filter((route) => typeof route === 'string' && route.includes(':'))
  .map((route) => ({
    route,
    regex: new RegExp(`^${route.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/:id/g, '[^/]+')}$`)
  }));

function resolveCurrentRoute(route) {
  return dynamicRoutePatterns.find((item) => item.regex.test(route))?.route || route;
}

export function Router() {
  const { route } = useApp();
  const currentRoute = resolveCurrentRoute(route);

  useEffect(() => {
    // Scroll window
    window.scrollTo(0, 0);
    
    // Also scroll common scroll containers since layout might use overflow: auto
    setTimeout(() => {
      const scrollContainers = document.querySelectorAll('.dashboard-main, .dash-content, .global-dashboard, #root, body, html, .banking-shell, .banking-side');
      scrollContainers.forEach(container => {
        if (container) {
          container.scrollTop = 0;
        }
      });
    }, 10);
  }, [currentRoute]);

  const renderPage = () => {
    switch (currentRoute) {
    case ROUTES.root:
    case ROUTES.roles:
      return <RoleSelection />;
    case ROUTES.login:
      return <Login />;
    case ROUTES.forgotPassword:
      return <ForgotPassword />;
    case ROUTES.otpVerification:
      return <OtpVerification />;
    case ROUTES.resetPassword:
      return <ResetPassword />;
    case ROUTES.passwordResetSuccess:
      return <PasswordResetSuccess />;
    case ROUTES.dashboard:
      return <Dashboard />;
    case ROUTES.partners:
      return <Partners />;
    case ROUTES.partnerDetails:
      return <PartnerDetails />;
    

      
    case ROUTES.approvalQueue:
      return <ApprovalQueue />;
    case ROUTES.communications:
      return <CommunicationsCenter />;
    case ROUTES.settlements:
      return <SettlementRequestQueue />;
    case ROUTES.users:
      return <Users />;
      
    // KYC Management routing
    case ROUTES.kycDashboard:
      return <KYCDashboard />;
      
    case ROUTES.kyc:
    case ROUTES.kycPending:
    case ROUTES.kycApproved:
    case ROUTES.kycRejected:
    case ROUTES.kycReupload:
    case ROUTES.kycAadhaar:
    case ROUTES.kycPan:
    case ROUTES.kycGst:
    case ROUTES.kycDriving:
    case ROUTES.kycVoter:
    case ROUTES.kycSelfie:
    case ROUTES.kycFaceMatch:
    case ROUTES.kycVideo:
    case ROUTES.kycRisk:
    case ROUTES.kycManual:
    case ROUTES.kycAnalytics:
    case ROUTES.kycAuditLogs:
    case ROUTES.kycReviewers:
      return <KYCModule />;
      
    case ROUTES.business:
    case ROUTES.businessApproval:
      return <BusinessRegistry />;
    case ROUTES.businessDetails:
      return <BusinessDetails />;
    case ROUTES.businessReview:
      return <BusinessReview />;
    case ROUTES.businessVerify:
      return <BusinessVerify />;
    case ROUTES.businessSuspension:
      return <BusinessSuspension />;
    case ROUTES.businessRisk:
      return <BusinessRisk />;
    case ROUTES.addBusiness:
      return <AddBusiness />;
    case ROUTES.businessDocReview:
      return <BusinessDocReview />;
    case ROUTES.businessTaxonomy:
      return <BusinessTaxonomy />;
    case ROUTES.branches:
      return <Branches />;
    case ROUTES.branchPerformance:
      return <Branches defaultTab="Performance" />;
    case ROUTES.branchApproval:
      return <Branches defaultTab="ApprovalQueue" />;
    case ROUTES.branchAnalytics:
      return <Branches defaultTab="Analytics" />;
    case ROUTES.branchSchedule:
      return <BranchSchedule />;
    case ROUTES.branchSuspend:
      return <BranchSuspend />;
    case ROUTES.branchCompliance:
      return <Branches defaultTab="Compliance" />;

    case ROUTES.branchProfile:
      return <BranchProfile />;
    case ROUTES.branchManagerAssignment:
      return <ManagerAssignment />;
    case ROUTES.serviceAreas:
    case ROUTES.branchServiceAreas:
      return <ServiceAreas />;
    case ROUTES.branchCoverage:
      return <CoverageMapping />;
      
    // Services module & service areas mapping
    case ROUTES.serviceAreaCoverage:
      return <ServiceAreaCoverage />;
    case ROUTES.serviceAreasList:
      return <Services defaultTab="zones" />;
    case ROUTES.services:
      return <Services />;
      
    case ROUTES.employees:
      return <Employees />;
    case ROUTES.bookings:
      return <BookingManagement />;
    case ROUTES.bookingCreate:
      return <CreateBooking />;
    case ROUTES.liveTracking:
      return <LiveDashboard />;
    case ROUTES.materials:
      return <InventoryDashboard />;
    case ROUTES.quotationDashboard:
      return <QuotationDashboard />;
    case ROUTES.quotations:
      return <QuotationManagement />;
    case ROUTES.wallet:
      return <EarningsDashboard />;
    case ROUTES.banking:
      return <BankingSettlementManagement />;
    case ROUTES.revenue:
      return <RevenueDashboard />;

    case ROUTES.referrals:
      return <ReferralDashboard />;
    case ROUTES.notifications:
      return <PushNotifications activeTab="Notification Center" />;
    case ROUTES.banners:
      return <BannerMgmtPage defaultTab="home" />;
    case ROUTES.cms:
      return <PoliciesPage />;
    case ROUTES.reviews:
      return <UserReviews />;
    case ROUTES.sos:
      return <SOSManagement />;
    case ROUTES.support:
      return <SupportDashboard activeTab="Support Center" />;
    case ROUTES.settings:
      return <SecuritySettings />;
    case ROUTES.performance:
      return <Employees />;
    case ROUTES.reports:
      return <Employees />;
    case ROUTES.attendance:
      return <Employees />;
    case ROUTES.leaveManagement:
      return <Employees />;

    // --- NEW MODULE SUB-ROUTES ---

    // Dashboard sub-routes
    case ROUTES.adminDashboard:
      return <AdminDashboard />;
    case ROUTES.dashboardRevenue:
      return <RevenueDashboard activeTab="Dashboard" />;
    case ROUTES.dashboardBookings:
      return <BookingsDashboard />;
    case ROUTES.dashboardUsers:
      return <UserAnalytics activeTab="Dashboard" />;
    case ROUTES.dashboardPartners:
      return <PartnerAnalytics activeTab="Dashboard" />;
    case ROUTES.dashboardApprovals:
      return <ApprovalsDashboard activeTab="Dashboard" />;
    case ROUTES.dashboardActivity:
      return <ActivityCenter activeTab="Dashboard" />;
    case ROUTES.dashboardSystemHealth:
      return <SystemHealth activeTab="Dashboard" />;
    case ROUTES.dashboardChannelPerformance:
      return <ChannelPerformance activeTab="Dashboard" />;
    case ROUTES.dashboardConversionAnalytics:
      return <ConversionAnalytics activeTab="Dashboard" />;
    case ROUTES.dashboardPayment:
      return <PaymentDashboard />;
    case ROUTES.dashboardServices:
      return <ServicesOverviewDashboard />;
    case ROUTES.dashboardGST:
      return <GSTDashboard />;

    // User Management sub-routes
    case ROUTES.userApprovals:
      return <UserApprovalPage/>;

    case ROUTES.blockedUsers:
      return <BlockedUsersPage />;
    case ROUTES.userWallets:
      // return <Placeholder title="User Wallets" activeTab="User Management" />;
      return <UserWalletsPage/>
    case ROUTES.userReferrals:
      // return <Placeholder title="User Referrals" activeTab="User Management" />;
      return <UserReferralsPage/>
    case ROUTES.userDocuments:
      // return <Placeholder title="User Documents" activeTab="User Management" />;
      return <UserDocumentsPage/>
    case ROUTES.userComplaints:
      // return <Placeholder title="User Complaints" activeTab="User Management" />;
      return <UserComplaintpage/>
    case ROUTES.userReviews:
      // return <Placeholder title="User Reviews" activeTab="User Management" />;
      return<UserReviewsPage/>
    case ROUTES.userTimeline:
      // return <Placeholder title="User Timeline" activeTab="User Management" />;
      return <UserTimelineTab/>
    case ROUTES.customerDirectory:
      return <CustomerDirectory />;
    case ROUTES.userActivityLogs:
     return <UserActivityLogs/>
    case ROUTES.userFraudMonitoring:
    return <UserFraudMonitoring/>
    case ROUTES.userAuditLogs:
      // return <Placeholder title="User Audit Logs" activeTab="User Management" />;
      return <UserAuditLog/>

    // Partner Management sub-routes
    case ROUTES.ispPartners:
      return <ISPPartners />;
    case ROUTES.bspPartners:
        return <BSPPartners/>
    case ROUTES.businessSellers:
      return <BusinessSellers/>
    case ROUTES.partnerApprovals:
      return <PartnerApprovals/>
    case ROUTES.kycApprovals:
      return <KYCApprovals/>
    case ROUTES.partnerServiceApprovals:
      return <ServiceApprovals/>
    case ROUTES.branchApprovals:
      return <BranchApprovals/>
    case ROUTES.partnerWallets:
        return <PartnerWallets/>
    case ROUTES.partnerBanking:
      return <PartnerBanking/>
    case ROUTES.partnerEmployees:
      return <PartnerEmployees/>
    case ROUTES.partnerBranches:
      return <PartnerBranches/>
    case ROUTES.partnerServices:
      return <PartnerServices/>
    case ROUTES.partnerReviews:
      return<PartnersReviews/>

      // return <Placeholder title="Partner Reviews" activeTab="Partner Management" />;
    case ROUTES.partnerRevenue:
      return <PartnersPartnerRevenue />;
    case ROUTES.partnerFraud:
      return <PartnerFraudMonitoring/>
    case ROUTES.partnerAuditLogs:
      return <PartnerAuditLogs/>
    // Business Management sub-routes
    case ROUTES.businessAll:
      return <BusinessRegistry />;
    case ROUTES.businessGst:
      return <GSTVerification/>
    case ROUTES.businessPan:
      return <PANVerification/>
    case ROUTES.businessRegVerification:
      return <RegistrationVerification/>
    case ROUTES.businessOwnership:
      return <OwnershipVerification/>
    case ROUTES.businessBranches:
      return <BusinessBranches/>
    case ROUTES.businessServices:
      return <BusinessServices/>
    case ROUTES.businessEmployees:
      return <BusinessEmployees/>
    case ROUTES.businessRevenue:
      return <BusinessRevenue/>
   
    case ROUTES.businessReviews:
      return <BusinessReviews/>
    case ROUTES.businessCompliance:
      return <ComplianceCenter/>
    case ROUTES.businessFraud:
      return <FraudInvestigation/>
    case ROUTES.businessAuditLogs:
      return <AuditLogs/>
    // Branch Management sub-routes
    case ROUTES.branchAll:
      return <Branches />;
    case ROUTES.branchServices:
      return <BranchServices />;
    case ROUTES.branchEmployees:
      return <BranchEmployees />;
    case ROUTES.branchBookings:
      return <BranchBookings />;
    case ROUTES.branchReviews:
      return <BranchReviews />;
    case ROUTES.branchAuditLogs:
      return <BranchAuditLogs />;

    // Service Management sub-routes
    case ROUTES.serviceCreation:
      return <Services defaultTab="creation" />;
    case ROUTES.serviceActivation:
      return <Services defaultTab="activation" />;
    case ROUTES.serviceCategories:
      return <Services defaultTab="categories" />;
    case ROUTES.serviceSubCategories:
      return <Services defaultTab="subcategories" />;
    case ROUTES.serviceAll:
      return <Services defaultTab="services" />;
    case ROUTES.serviceAdd:
      return <Services defaultTab="wizard" />;
    case ROUTES.serviceApprovals:
      return <Services defaultTab="approvals" />;
    case ROUTES.servicePricing:
      return <Services defaultTab="pricing" />;
    case ROUTES.serviceCommission:
      return <Services defaultTab="commission" />;
    case ROUTES.servicePerformance:
      return <Services defaultTab="dashboard" />;
    case ROUTES.serviceAnalytics:
      return <Services defaultTab="comparison" />;
    case ROUTES.serviceFeatured:
      return <Services defaultTab="featured" />;
    case ROUTES.serviceMedia:
      return <Services defaultTab="media" />;
    case ROUTES.serviceAuditLogs:
      return <Services defaultTab="audit-logs" />;

    // Employee Management sub-routes
    case ROUTES.employeeAll:
      return <Employees defaultTab="Workforce" />;
    case ROUTES.employeeAvailability:
      return <Employees defaultTab="Availability" />;
    case ROUTES.branchManagers:
      return <Employees defaultTab="BranchManagers" />;
    case ROUTES.employeeAssignments:
      return <Employees defaultTab="EmployeeAssignments" />;
    case ROUTES.employeeDocuments:
      return <Employees defaultTab="EmployeeDocuments" />;
    case ROUTES.employeeEarnings:
      return <Employees defaultTab="EmployeeEarnings" />;
    case ROUTES.employeeRatings:
      return <Employees defaultTab="EmployeeRatings" />;
    case ROUTES.employeeKyc:
      return <Employees defaultTab="EmployeeKyc" />;
    case ROUTES.employeeAnalytics:
      return <Employees defaultTab="EmployeeAnalytics" />;
    case ROUTES.employeeAuditLogs:
      return <Employees defaultTab="EmployeeAuditLogs" />;

    // Booking Management sub-routes
    case ROUTES.bookingAll:
    case ROUTES.bookingPending:
    case ROUTES.bookingAssigned:
    case ROUTES.bookingAccepted:
    case ROUTES.bookingInProgress:
    case ROUTES.bookingMaterialPending:
    case ROUTES.bookingQuotationPending:
    case ROUTES.bookingOtpPending:
    case ROUTES.bookingCompleted:
    case ROUTES.bookingCancelled:
    case ROUTES.bookingCancellation:
    case ROUTES.bookingRefunded:
    case ROUTES.bookingEscalated:
    case ROUTES.bookingDisputed:
    case ROUTES.bookingAssignmentCenter:
    case ROUTES.bookingOtpVerification:
    case ROUTES.bookingCalendar:
    case ROUTES.bookingMap:
    case ROUTES.bookingPayments:
    case ROUTES.bookingInvoices:
    case ROUTES.bookingRefunds:
    case ROUTES.bookingSla:
    case ROUTES.bookingAnalytics:
    case ROUTES.bookingCommunications:
    case ROUTES.bookingReports:
    case ROUTES.bookingFraud:
    case ROUTES.bookingArchive:
      return <BookingManagement />;
   
    // Live Tracking sub-routes
    case ROUTES.liveDashboard:
      // return <Placeholder title="Live Dashboard" activeTab="Live Tracking" />;
      return <LiveDashboard/>
    case ROUTES.liveOpsMap:
     return <OperationalMap/>
    case ROUTES.liveActiveJobs:
    return <ErrorBoundary><ActiveJobs/></ErrorBoundary>
    case ROUTES.liveEmployeeTracking:
      return <EmployeeTracking/>
    case ROUTES.liveRouteTracking:
      return <RouteTracking/>
    case ROUTES.liveEta:
      return <ETAMonitoring />;
    case ROUTES.liveDelay:
      return <DelayMonitoring/>
    case ROUTES.liveGeofence:
      return <GeofenceManagement/>
    case ROUTES.liveGeofenceLogs:
      return <GeofenceLogs/>
    case ROUTES.liveHistory:
      return <MovementHistory/>
    case ROUTES.liveHeatmaps:
      return <Heatmaps/>;
    case ROUTES.liveSos:
      return <SOStracking/>
    case ROUTES.liveAnalytics:
      return <TrackingAnalytics/>

    // Material Management sub-routes
    case ROUTES.materialRequests:
      return <MaterialRequests />;
    case ROUTES.materialCreate:
      return <NewMaterialRequest />;
    case ROUTES.materialDetails:
      return <MaterialRequestDetails />;
    case ROUTES.materialApprovals:
      return <ApprovalPipeline />;
    case ROUTES.materialInventory:
      return <InventoryDashboard />;
    case ROUTES.materialListing:
      return <InventoryListing />;
    case ROUTES.materialCategories:
      return <MaterialCategories />;
    case ROUTES.materialRestocking:
      return <Restocking />;
    case ROUTES.materialVendors:
      return <VendorRecommendation />;
    case ROUTES.materialSupplierComparison:
      return <SupplierComparison />;
    case ROUTES.materialPurchaseOrders:
      return <PurchaseOrders />;
    case ROUTES.materialDelivery:
      return <DeliveryTracking />;
    case ROUTES.materialConsumption:
      return <ConsumptionTracking />;
    case ROUTES.materialReturns:
      return <MaterialReturns />;
    case ROUTES.materialSupplierPerformance:
      return <SupplierPerformance />;
    case ROUTES.materialAnalytics:
      return <MaterialAnalytics />;
    case ROUTES.materialReports:
      return <MaterialReports />;
    case ROUTES.materialDisputes:
      return <DisputeCenter />;
    case ROUTES.materialCostOptimization:
      return <CostOptimization />;

    // Quotation Management sub-routes
    case ROUTES.quotationSeller:
    case ROUTES.quotationCustomer:
    case ROUTES.quotationCustomerDetails:
    case ROUTES.quotationRfq:
    case ROUTES.quotationCreateRfq:
    case ROUTES.quotationDetails:
    case ROUTES.quotationApprovals:
    case ROUTES.quotationApprovalDetail:
    case ROUTES.quotationComparison:
    case ROUTES.quotationWinner:
    case ROUTES.quotationNegotiation:
    case ROUTES.quotationRevisions:
    case ROUTES.quotationExpired:
    case ROUTES.quotationRejected:
    case ROUTES.quotationGeneratePo:
    case ROUTES.quotationOrders:
    case ROUTES.quotationOrderDetails:
    case ROUTES.quotationCommunication:
    case ROUTES.quotationCostOptimization:
    case ROUTES.quotationSellerPerformance:
    case ROUTES.quotationAnalytics:
    case ROUTES.quotationPricingAnalytics:
    case ROUTES.quotationDisputes:
    case ROUTES.quotationHighValue:
    case ROUTES.quotationBulkApproval:
    case ROUTES.quotationReports:
      return <QuotationManagement />;

    // Wallet Management sub-routes
    case ROUTES.walletDashboard:
    case ROUTES.wallet:
      return <WalletDashboard />;
    case ROUTES.walletAll:
      return <WalletListing defaultType="All" />;
    case ROUTES.walletUser:
      return <UserWallets />;
    case ROUTES.walletPartner:
      return <PartnerWallets />;
    case ROUTES.walletSeller:
      return <SellerWallets />;
    case ROUTES.walletEmployee:
      return <EmployeeWallets />;
    case ROUTES.walletTransactions:
      return <TransactionLedger />;
    case ROUTES.walletRefunds:
      return <RefundApprovalQueue />;
    case ROUTES.walletPenalties:
      return <PenaltyManagement />;
    case ROUTES.walletFreeze:
      return <FrozenWalletListing />;
    case ROUTES.walletFraud:
      return <FraudMonitoringCenter />;
    case ROUTES.walletAnalytics:
      return <WalletAnalytics />;
    case ROUTES.walletReconciliation:
      return <FinancialReconciliation />;
    case ROUTES.walletEarnings:
      return <EarningsDashboard />;
    case ROUTES.walletDetails:
      return <WalletDetails />;
    case ROUTES.transactionDetail:
      return <TransactionDetail />;
    case ROUTES.walletAdjustment:
      return <WalletAdjustmentCenter />;
    case ROUTES.walletFreezeCenter:
      return <WalletFreezeCenter />;
    case ROUTES.walletUnfreezeApproval:
      return <WalletFreezeCenter />;
    case ROUTES.refundDashboard:
      return <RefundApprovalQueue />;
    case ROUTES.penaltyDetail:
      return <PenaltyManagement />;
    case ROUTES.walletSettlementDashboard:
    case ROUTES.walletSettlementDetail:
      return <SettlementRequestQueue />;
    case ROUTES.riskInvestigation:
      return <FraudMonitoringCenter />;
    case ROUTES.chargebackManagement:
      return <ChargebackManagement />;
    case ROUTES.walletReports:
      return <Placeholder title="Wallet Reports" activeTab="Wallet Management" />;
    case ROUTES.walletCommunication:
      return <Placeholder title="Wallet Communication Center" activeTab="Wallet Management" />;

    // Banking & Settlements sub-routes
    case ROUTES.bankingDashboard:
    case ROUTES.bankAccounts:
    case ROUTES.bankAccountDetails:
    case ROUTES.bankAccountAdd:
    case ROUTES.bankAccountEdit:
    case ROUTES.bankBeneficiaries:
    case ROUTES.bankUpi:
    case ROUTES.bankVerificationQueue:
    case ROUTES.bankVerificationDetail:
    case ROUTES.withdrawalDashboard:
    case ROUTES.withdrawalRequests:
    case ROUTES.withdrawalDetail:
    case ROUTES.withdrawalApprovals:
    case ROUTES.settlementDashboard:
    case ROUTES.settlementQueue:
    case ROUTES.settlementDetail:
    case ROUTES.bulkSettlements:
    case ROUTES.failedSettlements:
    case ROUTES.bankingReconciliation:
    case ROUTES.reconciliationDetails:
    case ROUTES.payoutProcessing:
    case ROUTES.financeApprovals:
    case ROUTES.bankingAnalytics:
    case ROUTES.bankPerformance:
    case ROUTES.bankingReports:
    case ROUTES.bankingSettings:
      return <BankingSettlementManagement />;

    // Revenue Management sub-routes
    case ROUTES.revenueDashboard:
      return <RevenueDashboard activeTab="Revenue Management" />;
    case ROUTES.revenueOverview:
      // return <Placeholder title="Revenue Overview" activeTab="Revenue Management" />;
      return <RevenueOverview/>
    case ROUTES.revenueDaily:
      // return <Placeholder title="Daily Revenue" activeTab="Revenue Management" />;
      return <DailyRevenue/>
    case ROUTES.revenueWeekly:
      // return <Placeholder title="Weekly Revenue" activeTab="Revenue Management" />;
      return <WeeklyRevenue/>
    case ROUTES.revenueMonthly:
      // return <Placeholder title="Monthly Revenue" activeTab="Revenue Management" />;
      return <MonthlyRevenue/>
    case ROUTES.revenueYearly:
      // return <Placeholder title="Yearly Revenue" activeTab="Revenue Management" />;
      return <YearlyRevenue/>
    case ROUTES.revenuePartner:
      // return <Placeholder title="Partner Revenue" activeTab="Revenue Management" />;
      return <RevenuePartnerRevenue />;
    case ROUTES.revenueSeller:
      // return <Placeholder title="Seller Revenue" activeTab="Revenue Management" />;
      return <SellerRevenue/>
    case ROUTES.revenueBranch:
      return <BranchRevenue/>
    case ROUTES.revenueEmployee:
      return <EmployeeRevenue/>
    case ROUTES.revenueService:
    return <ServiceRevenue/>
    case ROUTES.revenueProfitLoss:
      return <ProfitAndLossRevenue/>
    case ROUTES.revenueExpenses:
     return <Expenses/>
    case ROUTES.revenueForecasting:
     return <RevenueForecasting/>
    case ROUTES.revenueTargets:
    return <Targets/>
    case ROUTES.revenueExecutive:
     return <ExecutiveDashboard/>
    case ROUTES.revenueBI:
      return <BusinessIntelligence/>
    case ROUTES.revenueHealth:
     return <FinancialHealth/>

    // Referral Management sub-routes
    case ROUTES.referralDashboard:
      return <ReferralDashboard/>
    case ROUTES.referralListing:
      return <ReferralListingPage/>
    case ROUTES.referralCampaignDashboard:
      return <CampaignDashboard/>
    case ROUTES.referralCampaignListing:
      return <CampaignListingPage/>
    case ROUTES.referralCreateCampaign:
      return <CreateCampaignPage/>
    case ROUTES.referralRewardApprovals:
      return <RewardApprovalQueuePage/>
    case ROUTES.referralRewardSettlements:
      return <RewardSettlementsPage/>
    case ROUTES.referralConversionAnalytics:
      return <ConversionAnalyticsPage/>
    case ROUTES.referralSources:
      return <ReferralSourcesPage/>
    case ROUTES.referralLeaderboard:
      return <ReferrelLeaderboardPage/>
    case ROUTES.referralFraud:
      return <FraudDetectionPage/>
    case ROUTES.referralInvestigations:
      return <InvestigationPage/>
    case ROUTES.referralCoupons:
      return <CouponManagementPage/>
    case ROUTES.referralQr:
      return <QRManagementPage/>

    // Notification Center sub-routes
    case ROUTES.notificationsPush:
      return <PushNotifications activeTab="Notification Center" />;
    case ROUTES.notificationsSms:
      return <SmsCampaigns activeTab="Notification Center" />;
    case ROUTES.notificationsWhatsapp:
      return <WhatsAppCampaigns activeTab="Notification Center" />;
    case ROUTES.notificationsEmail:
      return <EmailCampaign/>
    case ROUTES.notificationsTemplates:
      return <NotificationTemplates/>
    case ROUTES.notificationsAudience:
      return <AudienceSegments/>
    case ROUTES.notificationsScheduled:
      return <ScheduledCampaigns/>
    case ROUTES.notificationsAutomation:
      return <AutomationDashboard activeTab="Notification Center" />;
    case ROUTES.notificationsDelivery:
      return <DeliveryReports activeTab="Notification Center" />;
    case ROUTES.notificationsInApp:
      return <InAppNotifications activeTab="Notification Center" />;
    case ROUTES.notificationsApprovalQueue:
      return <NotificationApprovalQueue activeTab="Notification Center" />;
    case ROUTES.notificationsReports:
      return <NotificationReports activeTab="Notification Center" />;
    case ROUTES.notificationsNotificationCostCenter:
      return <NotificationCostCenter activeTab="Notification Center" />;
    case ROUTES.notificationsGlobalNotifications:
      return <GlobalNotificationSettings activeTab="Notification Center" />;
    case ROUTES.notificationsNotificationPreferences:
      return <NotificationPreferenceManagement activeTab="Notification Center" />;
    case ROUTES.notificationsCommunicationLogs:
      return <CommunicationLogs activeTab="Notification Center" />;

    // Banner Management sub-routes
    case ROUTES.bannersHomepage:
      return <HomePageBanner/>
    case ROUTES.bannersOffer:
      return <OfferBannersPage/>
    case ROUTES.bannersCategory:
      return <CategoryBannersPage/>
    case ROUTES.bannersPopup:
      return <PopupBannersPage/>
    case ROUTES.bannersScheduling:
      return <BannerSchedulingPage/>
    case ROUTES.bannersAnalytics:
      return <BannerAnalyticsPage/>

    // CMS Management sub-routes
    case ROUTES.cmsAboutUs:
      return <AboutUs />;
    case ROUTES.cmsTerms:
      return <TermsPage />;
    case ROUTES.cmsPrivacy:
      return <PrivacyPolicy />;
    case ROUTES.cmsRefund:
      return <RefundPolicy />;
    case ROUTES.cmsContactUs:
      return <ContactUs />;
    case ROUTES.cmsFaqs:
      return <FaqPage />;
    case ROUTES.cmsBlogs:
      return <Blogs />;
    case ROUTES.cmsSeo:
      return <SeoSettings />;

    // Consolidated CMS Module Routes
    case ROUTES.cmsPolicies:
      return <PoliciesPage />;
    case ROUTES.cmsHelpCenter:
      return <HelpCenterPage />;
    case ROUTES.cmsDocumentationCenter:
      return <DocCenterPage />;

    // App Management Module Routes
    case ROUTES.appManagementDashboard:
      return <AppDashboardPage />;
    // Banner Management Consolidated
    case ROUTES.bannersHome:
      return <BannerMgmtPage defaultTab="home" />;
    case ROUTES.bannersOffer:
      return <BannerMgmtPage defaultTab="offer" />;
    case ROUTES.bannersPromotional:
      return <BannerMgmtPage defaultTab="promotional" />;
    case ROUTES.bannersMarketing:
      return <BannerMgmtPage defaultTab="marketing" />;
    case ROUTES.bannersUpload:
      return <BannerMgmtPage defaultTab="upload" />;
    case ROUTES.bannersPreview:
      return <BannerMgmtPage defaultTab="preview" />;
    case ROUTES.bannersScheduling:
      return <BannerMgmtPage defaultTab="scheduling" />;
    case ROUTES.bannersStatus:
      return <BannerMgmtPage defaultTab="status" />;

    // User App Consolidated
    case ROUTES.userAppFeatures:
      return <UserAppPage defaultTab="features" />;
    case ROUTES.userAppMenus:
      return <UserAppPage defaultTab="menus" />;
    case ROUTES.userAppConfig:
      return <UserAppPage defaultTab="config" />;
    case ROUTES.userAppVersion:
      return <UserAppPage defaultTab="version" />;
    case ROUTES.userAppHomeBuilder:
      return <HomeBuilderPage />;
    case ROUTES.userAppServiceCategories:
      return <ServiceCategoriesUI />;
    case ROUTES.userAppPowerpass:
      return <PowerpassManagerPage />;
    case ROUTES.userAppInstahelp:
      return <InstahelpConfigPage />;
    case ROUTES.userAppOnboarding:
      return <OnboardingManagerPage />;

    // User App Flow Routes
    case ROUTES.userAppFlowServices:
      return <FlowServicesPage />;
    case ROUTES.userAppFlowPackages:
      return <FlowPackagesPage />;
    case ROUTES.userAppFlowPackageDetails:
      return <FlowPackageDetailsPage />;
    case ROUTES.userAppFlowSuccess:
      return <FlowSuccessPage />;
    case ROUTES.userAppFlowCart:
      return <FlowCartPage />;
    case ROUTES.userAppFlowAddress:
      return <FlowAddressPage />;
    case ROUTES.userAppFlowAddAddress:
      return <FlowAddAddressPage />;
    case ROUTES.userAppFlowSlot:
      return <FlowSlotPage />;
    case ROUTES.userAppFlowCheckout:
      return <FlowCheckoutPage />;
    case ROUTES.userAppFlowPayment:
      return <FlowPaymentPage />;
    case ROUTES.userAppFlowConfirmation:
      return <FlowConfirmationPage />;
    case ROUTES.userAppAdminBookings:
      return <AdminBookingsPage />;
    case ROUTES.userAppAdminPayments:
      return <AdminPaymentsPage />;

    // Partner App Consolidated
    case ROUTES.partnerAppFeatures:
      return <PartnerAppPage defaultTab="features" />;
    case ROUTES.partnerAppRoles:
      return <PartnerAppPage defaultTab="roles" />;
    case ROUTES.partnerAppMenus:
      return <PartnerAppPage defaultTab="menus" />;
    case ROUTES.partnerAppConfig:
      return <PartnerAppPage defaultTab="config" />;

    // Feature Management Consolidated
    case ROUTES.featureToggle:
      return <FeatureMgmtPage defaultTab="toggle" />;
    case ROUTES.featureEnable:
      return <FeatureMgmtPage defaultTab="enable" />;
    case ROUTES.featureDisable:
      return <FeatureMgmtPage defaultTab="disable" />;
    case ROUTES.featureBeta:
      return <FeatureMgmtPage defaultTab="beta" />;
    case ROUTES.featureVersion:
      return <FeatureMgmtPage defaultTab="version" />;

    // Menu Management Consolidated
    case ROUTES.menuUser:
      return <MenuMgmtPage defaultTab="user" />;
    case ROUTES.menuPartner:
      return <MenuMgmtPage defaultTab="partner" />;
    case ROUTES.menuOrdering:
      return <MenuMgmtPage defaultTab="ordering" />;
    case ROUTES.menuVisibility:
      return <MenuMgmtPage defaultTab="visibility" />;
    case ROUTES.menuPermission:
      return <MenuMgmtPage defaultTab="permission" />;

    // Reviews & Ratings sub-routes
    case ROUTES.reviewsUser:
      return <UserReviews/>
    case ROUTES.reviewsPartner:
      return <PartnerReviews/>
    case ROUTES.reviewsEmployee:
      return <EmployeeReviews/>
    case ROUTES.reviewsModeration:
      return <ReviewModeration/>
    case ROUTES.reviewsAnalytics:
      return <RatingAnalytics/>

    // SOS Management sub-routes
    case ROUTES.sosDashboard:
    case ROUTES.sosActive:
    case ROUTES.sosDetails:
    case ROUTES.sosDispatch:
    case ROUTES.sosResolved:
    case ROUTES.sosEscalated:
    case ROUTES.sosTracking:
    case ROUTES.sosIncidentReports:
    case ROUTES.sosResponseQueue:
    case ROUTES.sosCategories:
    case ROUTES.sosContacts:
    case ROUTES.sosCommunication:
    case ROUTES.sosResources:
    case ROUTES.sosInvestigationCenter:
    case ROUTES.sosHeatmap:
    case ROUTES.sosIncidentReportDetails:
    case ROUTES.sosResolution:
    case ROUTES.sosPerformance:
    case ROUTES.sosAnalytics:
    case ROUTES.sosFraud:
    case ROUTES.sosInvestigation:
    case ROUTES.sosReports:
    case ROUTES.sosSettings:
    case ROUTES.sosAuthority:
    case ROUTES.sosAudit:
    case ROUTES.sosCommandCenter:
      return <SOSManagement />;

    // Support Center sub-routes
    case ROUTES.supportAll:
      return <SupportOperationsList activeTab="Support Center" />;
    case ROUTES.supportOpen:
      return <SupportOperationsList activeTab="Support Center" defaultFilter="open" />;
    case ROUTES.supportInProgress:
      return <SupportOperationsList activeTab="Support Center" defaultFilter="in-progress" />;
    case ROUTES.supportEscalated:
      return <EscalationCommandCenter activeTab="Support Center" />;
    case ROUTES.supportClosed:
      return <SupportOperationsList activeTab="Support Center" defaultFilter="closed" />;
    case ROUTES.supportBookingIssues:
      return <SupportOperationsList activeTab="Support Center" defaultFilter="bookings" />;
    case ROUTES.supportPaymentIssues:
      return <SupportOperationsList activeTab="Support Center" defaultFilter="payments" />;
    case ROUTES.supportWalletIssues:
      return <SupportOperationsList activeTab="Support Center" defaultFilter="wallet" />;
    case ROUTES.supportTechnicalIssues:
      return <SupportOperationsList activeTab="Support Center" defaultFilter="technical" />;
    case ROUTES.supportKycIssues:
      return <SupportOperationsList activeTab="Support Center" defaultFilter="kyc" />;
    case ROUTES.supportSla:
      return <SlaMonitoring activeTab="Support Center" />;
    case ROUTES.supportAnalytics:
      return <CustomerSatisfaction activeTab="Support Center" />;
    case ROUTES.supportDetails:
      return <SupportTicketDetails activeTab="Support Center" />;
    case ROUTES.supportCreate:
      return <SupportTicketCreate activeTab="Support Center" />;
    case ROUTES.supportKb:
      return <SupportKnowledgeBaseList activeTab="Support Center" />;
    case ROUTES.supportKbCreate:
      return <SupportKbArticle activeTab="Support Center" />;
    case ROUTES.supportFinancial:
      return <SupportFinancialResolutions activeTab="Support Center" />;
    case ROUTES.supportOpsDashboard:
      return <SupportOperationsCenter activeTab="Support Center" />;
    case ROUTES.supportOverview:
      return <SupportOperationsOverview activeTab="Support Center" />;
    case ROUTES.supportAgentWorkspace:
      return <SupportAgentWorkspace activeTab="Support Center" />;
    case ROUTES.supportAutomation:
      return <SupportAutomationRules activeTab="Support Center" />;
    case ROUTES.supportCommunications:
      return <SupportCommunicationsDashboard activeTab="Support Center" />;

    // Fraud Management routing cases
    case ROUTES.fraudCenter:
    case ROUTES.fraudDashboard:
    case ROUTES.fraudCases:
    case ROUTES.fraudCaseDetails:
    case ROUTES.fraudRiskMonitoring:
    case ROUTES.fraudUser:
    case ROUTES.fraudPartner:
    case ROUTES.fraudEmployee:
    case ROUTES.fraudWallet:
    case ROUTES.fraudPayment:
    case ROUTES.fraudReferral:
    case ROUTES.fraudKyc:
    case ROUTES.fraudDevice:
    case ROUTES.fraudIp:
    case ROUTES.fraudGeo:
    case ROUTES.fraudBooking:
    case ROUTES.fraudInvestigations:
    case ROUTES.fraudWorkspace:
    case ROUTES.fraudAlerts:
    case ROUTES.fraudRisk:
    case ROUTES.fraudCompliance:
    case ROUTES.fraudAml:
    case ROUTES.fraudAnalytics:
    case ROUTES.fraudHeatmap:
    case ROUTES.fraudReports:
    case ROUTES.fraudResolution:
    case ROUTES.blacklistManagement:
    case ROUTES.whitelistManagement:
    case ROUTES.fraudAutomation:
    case ROUTES.fraudCommunication:
    case ROUTES.fraudAudit:
    case ROUTES.fraudExecutive:
    case ROUTES.fraudAssignment:
    case ROUTES.fraudRecovery:
    case ROUTES.fraudIntegrations:
    case ROUTES.fraudSettings:
      return <FraudCenter />;

    // Reports & Analytics landing and sub-routes
    case ROUTES.reportsOperational:
      return <OperationalReports />;
    case ROUTES.analytics:
       // return <Analytics />;
    case ROUTES.reportsBooking:
      return <BookingReportPage/>
    case ROUTES.reportsUser:
      return <UserReportPage/>
    case ROUTES.reportsPartner:
      return <PartnerReportPage/>
    case ROUTES.reportsEmployee:
      return <EmployeeReportPage/>
    case ROUTES.reportsFinancial:
    case ROUTES.reportsRevenue:
      return <RevenueReportspage/>

    case ROUTES.reportsWallet:
      return <WalletReportPage/>
    case ROUTES.reportsSettlement:
      return <SettlementReport/>
      return <Analytics />;
    case ROUTES.reportsMarketing:
      return <MarketingReports />;
    case ROUTES.reportsReferral:
      return <ReferralReport/>
    case ROUTES.reportsCampaign:
      return <CampaignReportPage/>
    case ROUTES.exportCenter:
      return <ExportCenterPage/>
    case ROUTES.pdfExports:
      return <PDFExportPage/>
    case ROUTES.excelExports:
      return <ExcelExportPage/>
    case ROUTES.csvExports:
      return <CSVExportPage/>

    // Role & Permission admin sub-routes
    case ROUTES.rolePermissions:
      return <AllRoles/>;
    case ROUTES.createRole:
      return <CreateRole/>;
    case ROUTES.permissionMatrix:
      return <PermissionMatrix/>
    case ROUTES.moduleAccess:
      return <ModuleAccess/>
    case ROUTES.actionPermissions:
      return <ActionPermissions/>
    case ROUTES.userAccessLogs:
      return <UserAccessLogs/>
    case ROUTES.roleAuditLogs:
      return <RoleAuditLogs/>

    // Settings sub-routes
    case ROUTES.settingsPlatformGeneral:
      return <GeneralSettings />;
    case ROUTES.settingsPlatformConfig:
      return <PlatformConfiguration />;
    case ROUTES.settingsFinancialCommission:
      return <CommissionSettings />;
    case ROUTES.settingsFinancialTax:
      return <TaxSettings />;
    case ROUTES.settingsFinancialWallet:
      return <WalletSettings />;
    case ROUTES.settingsFinancialSettlement:
      return <SettlementSettings />;
    case ROUTES.settingsIntegrationPayment:
      return <PaymentGatewaySettings />;
    case ROUTES.settingsIntegrationSms:
      return <SmsGatewayManagement />;
    case ROUTES.settingsIntegrationWhatsapp:
      return <WhatsAppApiIntegration />;
    case ROUTES.settingsIntegrationEmail:
      return <EmailSmtpIntegration />;
    case ROUTES.settingsIntegrationGoogleMaps:
      return <GoogleMapsApiIntegration />;
    case ROUTES.settingsSecurityGeneral:
      return <SecuritySettings />;
    case ROUTES.settingsSecurityPassword:
      return <PasswordPolicies />;
    case ROUTES.settingsSecuritySession:
      return <SessionManagement />;
    case ROUTES.settingsSecurityAudit:
      return <SystemAuditLogs />;
    case ROUTES.settingsSystemBackup:
      return <BackupManagement />;
    case ROUTES.settingsSystemMaintenance:
      return <MaintenanceMode />;
    case ROUTES.settingsSystemLogs:
      return <SystemLogs />;

    // Live Tracking sub-routes
    case ROUTES.liveDashboard: return <LiveDashboard />;
    case ROUTES.liveOpsMap: return <OperationalMap />;
    case ROUTES.liveActiveJobs: return <ErrorBoundary><ActiveJobs /></ErrorBoundary>;
    case ROUTES.liveEmployeeTracking: return <EmployeeTracking />;
    case ROUTES.liveRouteTracking: return <RouteTracking />;
    case ROUTES.liveEta: return <ETAMonitoring />;
    case ROUTES.liveDelay: return <DelayMonitoring />;
    case ROUTES.liveGeofence: return <GeofenceManagement />;
    case ROUTES.liveGeofenceLogs: return <GeofenceLogs />;
    case ROUTES.liveHistory: return <MovementHistory />;
    case ROUTES.liveHeatmaps: return <Heatmaps />;
    case ROUTES.liveSos: return <SOStracking />;
    case ROUTES.liveAnalytics: return <TrackingAnalytics />;

    case ROUTES.notifications:
      return <InAppNotifications />;
      
    case ROUTES.support:
      return <SupportOperationsOverview />;

    case ROUTES.myProfile:
      return <MyProfile />;

    case ROUTES.cmsCancellation:
      return <CancellationPolicy />;
    case ROUTES.appManagementRemoteConfig:
      return <RemoteConfigPage />;
    case ROUTES.appManagementConfig:
      return <AppConfigPage />;
    case ROUTES.appManagementMaintenance:
      return <MaintenanceModePage />;
    case ROUTES.orderDashboard:
      return <OrderDashboard />;
    case ROUTES.orderManagement:
      return <OrderMgmtPage />;
    case ROUTES.priceManagement:
      return <PriceMgmtPage />;
    case ROUTES.offerManagement:
      return <OfferMgmtPage />;
    case ROUTES.rewardManagement:
      return <RewardMgmtPage />;
    case ROUTES.gstManagement:
      return <GstMgmtPage />;
    case ROUTES.platformFeeManagement:
      return <PlatformFeeMgmtPage />;
    case ROUTES.performanceManagement:
      return <PerformanceMgmtPage />;
    case ROUTES.favoriteAddressManagement:
      return <FavoriteAddressMgmtPage />;
    case ROUTES.materialPriceManagement:
      return <MaterialPriceMgmtPage />;
    case ROUTES.paymentManagement:
      return <PaymentMgmtPage />;
    case ROUTES.locationManagement:
      return <LocationMgmtPage />;
    case ROUTES.settingsAccount:
      return <AccountSettings />;
    case ROUTES.settingsChangePassword:
      return <ChangePasswordPage />;
    case ROUTES.profileActivityLog:
      return <ActivityLogPage />;
    case ROUTES.helpSupport:
      return <HelpSupportPage />;

    case ROUTES.docContracts:
      return <ContractsPage />;
    case ROUTES.docAgreements:
      return <AgreementsPage />;
    case ROUTES.docKyc:
      return <KYCDocumentsPage />;
    case ROUTES.docVerification:
      return <VerificationRecordsPage />;

    default:
      return <RoleSelection />;
    }
  };

  const page = renderPage();
  const isPublicRoute = [
    ROUTES.root,
    ROUTES.roles,
    ROUTES.login,
    ROUTES.forgotPassword,
    ROUTES.otpVerification,
    ROUTES.resetPassword,
    ROUTES.passwordResetSuccess
  ].includes(currentRoute) || currentRoute === undefined;

  return (
    <ToastProvider>
      {isPublicRoute ? (
        page
      ) : (
        <ShellProvider>
          <GlobalAdminShell>
            {page}
          </GlobalAdminShell>
        </ShellProvider>
      )}
    </ToastProvider>
  );
}
