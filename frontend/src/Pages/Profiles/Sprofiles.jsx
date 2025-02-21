import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import firebaseApp from '../../../Firebase';
import axios from 'axios';
import defaultAvatar from '../../Assests/default-avatar.png';
import { toast, Toaster } from 'react-hot-toast';

export default function Sprofiles() {
  const [registrationData, setRegistrationData] = useState(null);
  const [profileUrl, setProfileUrl] = useState(defaultAvatar); // Initialize with default avatar
  const [uploading, setUploading] = useState(false);
  const [activities, setActivities] = useState([]);

  // Load registration data and profile photo on component mount
  useEffect(() => {
    const loadProfile = async () => {
      const savedRegistration = localStorage.getItem('registration');
      if (savedRegistration) {
        const data = JSON.parse(savedRegistration);
        setRegistrationData(data);
        
        if (data.email) {
          try {
            const storage = getStorage(firebaseApp);
            const photoRef = ref(storage, `profilePhotos/${data.email}`);
            const url = await getDownloadURL(photoRef);
            setProfileUrl(url);
          } catch (error) {
            // Keep using default avatar if no profile photo exists
            console.log('Using default profile photo');
          }
        }
      }
    };

    loadProfile();
  }, []);

  useEffect(() => {
    if (registrationData?.email) {
      fetchUserActivities(registrationData.email);
    }
  }, [registrationData]);

  const fetchUserActivities = async (email) => {
    try {
      const response = await axios.get(`https://maj-25-backend.onrender.com/api/activity/user/${email}`);
      setActivities(response.data);
    } catch (error) {
      console.error('Error fetching user activities:', error);
      toast.error('Failed to fetch activities');
    }
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!registrationData?.email) {
      toast.error('Please login first');
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image size should be less than 2MB');
      return;
    }

    try {
      setUploading(true);
      const storage = getStorage(firebaseApp);
      const photoRef = ref(storage, `profilePhotos/${registrationData.email}`);

      await uploadBytes(photoRef, file);
      const url = await getDownloadURL(photoRef);
      setProfileUrl(url);

      toast.success('Profile photo updated successfully!');
    } catch (error) {
      console.error('Error uploading photo:', error);
      toast.error('Failed to upload photo');
    } finally {
      setUploading(false);
    }
  };

  // Create minimal QR code data
  const getQRCodeData = () => {
    if (!registrationData) return '';
    
    return JSON.stringify({
      id: registrationData._id,
      email: registrationData.email,
      name: registrationData.fullName,
      type: registrationData.type
    });
  };

  return (
    <div className="flex flex-col bg-gradient-to-br from-blue-100 via-white to-blue-300 min-h-screen p-10 relative">
      <Toaster position="top-center" reverseOrder={false} />
      
      <header className="text-center mb-8">
        <h1 className="text-5xl font-extrabold text-gray-800">
          Welcome {registrationData ? registrationData.fullName : 'Guest'}!
        </h1>
      </header>

      {/* Profile Photo Section */}
      <div className="absolute top-5 right-4 text-center">
        <div className="relative group">
          <img
            src={profileUrl}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg group-hover:opacity-80 transition-opacity"
            onError={(e) => {
              e.target.src = defaultAvatar;
              setProfileUrl(defaultAvatar);
            }}
          />
          <label className="absolute inset-0 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100">
            <input
              type="file"
              accept="image/jpeg, image/png, image/gif"
              onChange={handlePhotoUpload}
              className="hidden"
              disabled={uploading}
            />
            <span className="bg-black bg-opacity-50 text-white text-sm py-1 px-2 rounded">
              {uploading ? 'Uploading...' : 'Change Photo'}
            </span>
          </label>
        </div>
      </div>

      {/* QR Code Section */}
      <div className="absolute top-5 left-4">
        <h3 className="text-xl font-semibold">Profile QR Code</h3>
        {registrationData && (
          <div className="bg-white p-2 rounded-lg shadow-md">
            <QRCode 
              value={getQRCodeData()}
              size={128}
              level="M"
            />
          </div>
        )}
      </div>

       {/* Profile Details Section */}
       <div className="flex flex-col items-center bg-white rounded-xl shadow-md p-6 transition-transform transform hover:scale-105 mt-20">
        <h2 className="text-3xl font-bold text-blue-600 mb-4">{registrationData ? registrationData.fullName : 'Guest'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-4">
          <div>
            <label className="block text-gray-700">Full Name</label>
            <input type="text" value={registrationData ? registrationData.fullName : ''} className="border rounded w-full p-2" readOnly />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input type="text" value={registrationData ? registrationData.email : 'Email'} className="border rounded w-full p-2" readOnly />
          </div>
          <div>
            <label className="block text-gray-700">Id number</label>
            <input type="text" value={registrationData ? registrationData.idNumber : 'DOB'} className="border rounded w-full p-2" readOnly />
          </div>
          <div>
            <label className="block text-gray-700">Gender</label>
            <input type="text" value={registrationData ? registrationData.gender : 'Gender'} className="border rounded w-full p-2" readOnly />
          </div>
          <div>
            <label className="block text-gray-700">Phone Number</label>
            <input type="text" value={registrationData ? registrationData.phoneNumber : 'Phone no'} className="border rounded w-full p-2" readOnly />
          </div>
          <div>
            <label className="block text-gray-700">School</label>
            <input type="text" value={registrationData ? registrationData.school : 'school'} className="border rounded w-full p-2" readOnly />
          </div>
          <div>
            <label className="block text-gray-700">Registered As A</label>
            <input type="text" value={registrationData ? registrationData.type : 'type'} className="border rounded w-full p-2" readOnly />
          </div>
          <div>
            <label className="block text-gray-700">Payment Date</label>
            <input type="text" value={registrationData ? registrationData.paymentDate : 'pdate'} className="border rounded w-full p-2" readOnly />
          </div>
          <div>
            <label className="block text-gray-700">Date Of Birth</label>
            <input type="text" value={registrationData ? registrationData.dateOfBirth : 'DOB'} className="border rounded w-full p-2" readOnly />
          </div>
          <div>
            <label className="block text-gray-700">Payment Method</label>
            <input type="text" value={registrationData ? registrationData.paymentMethod : 'pm'} className="border rounded w-full p-2" readOnly />
          </div>
        </div>
      </div>
      {/* Activities Section */}
      <div className="mt-10 bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Activities</h2>
        {activities.length > 0 ? (
          <ul className="list-disc list-inside">
            {activities.map((activity, index) => (
              <li key={index} className="text-gray-700">
                {activity.name} - passed on {new Date(activity.updatedAt).toLocaleString()}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-700">No activities completed yet.</p>
        )}
        {activities.length >= 20 ? (
          <p className="text-green-600 mt-4">You're available for an activity badge!</p>
        ) : (
          <p className="text-red-600 mt-4">You're not available for an activity badge yet.</p>
        )}
      </div>
    </div>
  );
}
