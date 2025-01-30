import React from 'react';
import { Link } from 'react-router-dom';
import ProtectedRoute from '../../Components/ProtectedRoute';

const AllPages = () => {
  const navLinks = [
    { title: 'Activities', path: '/AActivity' },
    { title: 'Activity Passer', path: '/AActivityPasser' },
    { title: 'Add Admin', path: '/AddAdmin' },
    { title: 'Gallery', path: '/AGallery' },
    { title: 'Profile QR', path: '/AProfileQR' },
    { title: 'Registrations', path: '/ARegistrations' },
    { title: 'Pass Activity', path: '/pass-activity' },
  ];

  return (
    <ProtectedRoute allowedPage="allpages">
      <div className="min-h-screen bg-gray-100">
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <h2 className="text-xl font-semibold text-gray-800">{link.title}</h2>
                <p className="mt-2 text-gray-600">Access {link.title.toLowerCase()} management</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AllPages;
