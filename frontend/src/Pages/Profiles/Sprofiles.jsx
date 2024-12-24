import React, { useEffect, useState } from 'react';

export default function Sprofiles() {
  const [registrationData, setRegistrationData] = useState(null);

  useEffect(() => {
    const savedRegistration = localStorage.getItem('registration');
    if (savedRegistration) {
      setRegistrationData(JSON.parse(savedRegistration));
    }
  }, []);

  console.log('Registration Data:', registrationData);

  return (
    <div className="flex flex-col items-center bg-gradient-to-r from-blue-200 to-blue-500 min-h-screen p-10">
      <h1 className="text-5xl font-extrabold text-center mb-8 text-white drop-shadow-lg">Sprofiles</h1>
      {registrationData ? (
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md transition-transform transform hover:scale-105">
          <h2 className="text-4xl font-semibold mb-6 text-blue-600">Registration Details</h2>
          <p className="text-lg mb-4"><strong className="text-blue-500">Email:</strong> <span className="text-gray-700">{registrationData.email}</span></p>
          <p className="text-lg mb-4"><strong className="text-blue-500">Phone Number:</strong> <span className="text-gray-700">{registrationData.phoneNumber}</span></p>
          {/* Add more fields as needed */}
        </div>
      ) : (
        <p className="text-lg text-gray-500">No registration data found.</p>
      )}
    </div>
  );
}