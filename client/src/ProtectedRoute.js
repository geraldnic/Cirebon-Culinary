import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({
  redirectPath = '/auth?mode=signin',
  children,
}) => {
  const isAuthenticated = localStorage.getItem('username') == "admin";
  return isAuthenticated ? children : <Navigate to={redirectPath} replace />;
};

export default ProtectedRoute;
