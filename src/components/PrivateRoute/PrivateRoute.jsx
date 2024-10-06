//import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token'); // Check if token is present
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
