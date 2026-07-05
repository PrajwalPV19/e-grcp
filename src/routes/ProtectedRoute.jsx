import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { rolePermissions } from '../utils/appConfig';

export default function ProtectedRoute({ requiredRoles }) {
  const location = useLocation();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!user?.role) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  const allowedRoles = requiredRoles ?? rolePermissions.all;

  if (!allowedRoles.includes(user?.role)) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
