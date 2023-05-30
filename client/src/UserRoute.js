import React from 'react';
import { Navigate } from 'react-router-dom';

const UserRoute = ({
  redirectPath = '/admin',
  children,
}) => {
  const isAuthenticated = localStorage.getItem('username') == "admin";
  return !isAuthenticated ? children : <Navigate to={redirectPath} replace />;
};

export default UserRoute;
