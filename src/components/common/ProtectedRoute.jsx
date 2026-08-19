import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../features/auth/contexts/AuthContext';
import { PageLoader } from '../ui/PageLoader';

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, isManager } = useAuth();

  if (loading) {
    return <PageLoader fullScreen={true} message="Verifying session..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isManager) {
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
