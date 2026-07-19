import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Loader } from '../ui/Loader';

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-navy-950">
        <Loader />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect unauthenticated clients to the Auth page
    return <Navigate to="/auth" replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
