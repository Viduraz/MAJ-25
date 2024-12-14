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
    <div>
      <h1 className="text-3xl font-bold text-center mb-5">Sprofiles</h1>
      {registrationData ? (
        <div>
          <h2 className="text-2xl font-semibold">Registration Details</h2>
          <p><strong>Email:</strong> {registrationData.email}</p>
          <p><strong>Phone Number:</strong> {registrationData.phoneNumber}</p>
          {/* Add more fields as needed */}
        </div>
      ) : (
        <p>No registration data found.</p>
      )}
    </div>
  );
}