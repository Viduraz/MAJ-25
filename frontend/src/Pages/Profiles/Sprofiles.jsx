import React, { useEffect, useState } from 'react';
import QRCode from 'react-qr-code'; // Import from react-qr-code
import { getStorage, ref, uploadString } from "firebase/storage"; // Import Firebase Storage functions

export default function Sprofiles() {
  const [registrationData, setRegistrationData] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    const savedRegistration = localStorage.getItem('registration');
    if (savedRegistration) {
      setRegistrationData(JSON.parse(savedRegistration));
    }
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result;
        setProfilePicture(imageData);
        uploadProfilePicture(imageData); // Call the upload function
      };
      reader.readAsDataURL(file);
    }
  };

  // New function to upload the profile picture to Firebase
  const uploadProfilePicture = async (imageData) => {
    const storage = getStorage(); // Initialize Firebase Storage
    const storageRef = ref(storage, 'profilePictures/userProfile.jpg'); // Create a reference to the location in storage

    try {
      await uploadString(storageRef, imageData, 'data_url'); // Upload the image data
      console.log('Profile picture uploaded successfully!');
    } catch (error) {
      console.error('Error uploading profile picture:', error);
    }
  };

  return (
    <div className="flex flex-col bg-gradient-to-br from-blue-100 via-white to-blue-300 min-h-screen p-10 relative">
      <header className="text-center mb-8">
        <h1 className="text-5xl font-extrabold text-gray-800">
          Welcome {registrationData ? registrationData.fullName : 'Guest'} !
        </h1>
      </header>

      {/* QR Code Section at Top Left */}
      <div className="absolute top-5 left-4"> {/* Positioning QR code */}
        <h3 className="text-xl font-semibold">Profile QR Code</h3>
        {registrationData && (
          <QRCode 
            value={JSON.stringify(registrationData)} // Generate QR code from registration data
            size={128} 
            className="mt-2" 
          />
        )}
      </div>

      {/* Profile Picture in Top Right Corner */}
      <div className="absolute top-4 right-4">
        <img
          src={profilePicture || 'default-profile.png'} // Replace with a default image path
          alt="Profile"
          className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
        />
        <input type="file" accept="image/*" onChange={handleImageChange} className="mt-2" />
      </div>

      {/* Profile Details Section */}
      <div className="flex flex-col items-center bg-white rounded-xl shadow-md p-6 transition-transform transform hover:scale-105 mt-20"> {/* Added margin-top */}
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
            <input type="text" value={registrationData ? registrationData.gender : ' Gender'} className="border rounded w-full p-2" readOnly />
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
            <input type="text" value={registrationData ? registrationData.paymentMethod : 'pm'} className="border rounded w-full p-2" readOnly />
          </div>
        </div>
      </div>

      {/* Activity List Section */}
      <div className="mt-10">
        <h2 className="text-3xl font-bold text-blue-600 mb-4">Activity List</h2>
        <ul className="list-disc pl-5">
          {Array.from({ length: 10 }, (_, index) => (
            <li key={index}>Activity {index + 1}</li>
          ))}
        </ul>
        {/* Check for Activity Award */}
        {registrationData && registrationData.completedActivities >= 8 && (
          <div className="mt-4 text-green-600 font-bold">
            Congratulations! You've earned the Activity Award!
          </div>
        )}
      </div>

      {/* Footer Section */}
      <footer className="mt-10 text-center text-gray-600">
        {/* Footer content can go here */}
      </footer>
    </div>
  );
}
