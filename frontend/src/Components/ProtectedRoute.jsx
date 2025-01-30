import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedPage }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    console.log('No token found, redirecting to /admin');
    return <Navigate to="/admin" />;
  }

  const decodedToken = JSON.parse(atob(token.split('.')[1]));
  console.log('Decoded Token:', decodedToken);
  const redirectPage = decodedToken.redirectPage;

  // If user has allpages access, allow access to all admin pages
  if (redirectPage === '/allpages') {
    return children;
  }

  // Allow access to the specific allowed page
  if (redirectPage === `/${allowedPage}`) {
    return children;
  }

  // Define allowed pages
  const allowedPages = [
    '/AActivity',
    '/AActivityPasser', 
    '/AddAdmin',
    '/AGallery',
    '/AProfileQR',
    '/ARegistrations',
    '/pass-activity'
  ];

  // Check if the current page is allowed for the user's redirect page
  if (allowedPages.includes(redirectPage)) {
    return children;
  }

  console.log('Redirecting to unauthorized page');
  return <Navigate to="/unauthorized" />;
};

export default ProtectedRoute;