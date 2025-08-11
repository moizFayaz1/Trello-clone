import { ROUTES } from '@/utils/util.constant';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated}) => {
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return  <Outlet />;
};

export default ProtectedRoute;