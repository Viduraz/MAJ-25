import React, { useState } from 'react';
import axios from 'axios';
import QRCode from 'react-qr-code';
import { Toaster, toast } from 'react-hot-toast';

function AprofileQr() {
  const [searchEmail, setSearchEmail] = useState('');
  const [userData, setUserData] = useState(null);
  const [toastDisplayed, setToastDisplayed] = useState(false);

  const showToast = (message, type = 'default') => {
    if (!toastDisplayed) {
      if (type === 'success') {
        toast.success(message);
      } else {
        toast(message);
      }
      setToastDisplayed(true);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/registration/${searchEmail}`);
      if (response.data) {
        setUserData(response.data);
        showToast('User Found', 'success');
      } else {
        showToast('User Not Found');
        setUserData(null);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      showToast('User Not Found');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex items-center justify-center p-10">
      <Toaster />
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl w-full">
        <h1 className="text-4xl font-extrabold text-blue-600 mb-6 text-center">Search User by Email</h1>
        <div className="flex flex-col items-center">
          <input
            type="text"
            placeholder="Enter email"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            className="w-full md:w-2/3 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-all"
          >
            Search
          </button>
        </div>

        {userData && (
          <div className="mt-10 bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-700 mb-4 bg-center">Name Tag</h2>
            <div className="flex flex-col items-center">
              <QRCode
                value={JSON.stringify(userData)}
                size={256}
                className="shadow-lg border rounded-md p-2 bg-white mb-6"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <p className="text-gray-600">
                <strong className="text-gray-800">Full Name:</strong> {userData.fullName}
              </p>
              <p className="text-gray-600">
                <strong className="text-gray-800">Sub Camp:</strong> {userData.school}
              </p>
              <p className="text-gray-600">
                <strong className="text-gray-800">Email:</strong> {userData.email}
              </p>
              <p className="text-gray-600">
                <strong className="text-gray-800">Gender:</strong> {userData.gender}
              </p>
              <p className="text-gray-600">
                <strong className="text-gray-800">Registered As:</strong> {userData.type}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AprofileQr;
