import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Loader from '../components/Loader';
import AppLayout from '../layouts/AppLayout';
import ProtectedRoute from './ProtectedRoute';

const LoginPage = lazy(() => import('../pages/LoginPage'));
const ForgotPasswordPage = lazy(() => import('../pages/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('../pages/ResetPasswordPage'));
const DashboardPage = lazy(() => import('../pages/DashboardPage'));
const ProcurementListPage = lazy(() => import('../pages/ProcurementListPage'));
const ProcurementDetailPage = lazy(() => import('../pages/ProcurementDetailPage'));
const VendorsPage = lazy(() => import('../pages/VendorsPage'));
const VendorDetailPage = lazy(() => import('../pages/VendorDetailPage'));
const RiskCenterPage = lazy(() => import('../pages/RiskCenterPage'));
const ComplianceCenterPage = lazy(() => import('../pages/ComplianceCenterPage'));
const AuditCenterPage = lazy(() => import('../pages/AuditCenterPage'));
const ApprovalWorkbenchPage = lazy(() => import('../pages/ApprovalWorkbenchPage'));
const ReportingCenterPage = lazy(() => import('../pages/ReportingCenterPage'));
const NotificationCenterPage = lazy(() => import('../pages/NotificationCenterPage'));
const SettingsPage = lazy(() => import('../pages/SettingsPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

export default function AppRouter() {
  return (
    <Suspense fallback={<Loader label="Loading workspace..." />}>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/procurement" element={<ProcurementListPage />} />
            <Route path="/procurement/:id" element={<ProcurementDetailPage />} />
            <Route path="/vendors" element={<VendorsPage />} />
            <Route path="/vendors/:id" element={<VendorDetailPage />} />
            <Route path="/risk" element={<RiskCenterPage />} />
            <Route path="/compliance" element={<ComplianceCenterPage />} />
            <Route path="/audit" element={<AuditCenterPage />} />
            <Route path="/approvals" element={<ApprovalWorkbenchPage />} />
            <Route path="/reports" element={<ReportingCenterPage />} />
            <Route path="/notifications" element={<NotificationCenterPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
