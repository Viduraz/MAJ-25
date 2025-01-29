import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedPage }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/admin" />;
  }

  const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode the token to get the payload
  const redirectPage = decodedToken.redirectPage;

  console.log('Decoded Token:', decodedToken); // Log the decoded token
  console.log('Allowed Page:', allowedPage); // Log the allowed page
  console.log('Redirect Page:', redirectPage); // Log the redirect page

  // Check if the user is allowed to access the requested page
  if (redirectPage !== `/${allowedPage}`) { // Add leading slash to allowedPage for comparison
    return <Navigate to="/unauthorized" />; // Redirect to an unauthorized page
  }

  return children; // Render the protected component
};

export default ProtectedRoute; 