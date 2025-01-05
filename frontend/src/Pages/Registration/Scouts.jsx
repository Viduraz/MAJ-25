import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function Scouts({ scoutCount, scouts, handleScoutCountChange, handleScoutChange, onNext, onPrevious }) {
  const validatePhoneNumber = (number) => {
    const regex = /^[0-9]{10}$/; // Adjust regex as needed for your phone number format
    return regex.test(number);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex
    return regex.test(email);
  };

  const validateFullName = (name) => {
    return name.trim() !== ''; // Ensure full name is not empty
  };

  const handleNext = () => {
    for (let index = 0; index < scoutCount; index++) {
      const scout = scouts[index];
      if (!validateFullName(scout.fullName)) {
        toast.error(`Scout ${index + 1}: Full name cannot be empty.`);
        return; // Prevent going to the next page
      }
      if (!validateEmail(scout.email)) {
        toast.error(`Scout ${index + 1}: Invalid email address.`);
        return; // Prevent going to the next page
      }
      if (!validatePhoneNumber(scout.phoneNumber)) {
        toast.error(`Scout ${index + 1}: Invalid phone number. Please enter a 10-digit number.`);
        return; // Prevent going to the next page
      }
    }
    onNext(); // Proceed to the next page if all validations pass
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 overflow-y-auto">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg my-8">
        <h2 className="text-3xl font-extrabold text-center mb-6">Register Your Scouts</h2>

        <div className="mb-6">
          <label htmlFor="scoutCount" className="block text-xl font-semibold text-gray-800">How many Scouts participated?</label>
          <input
            type="number"
            id="scoutCount"
            value={scoutCount}
            onChange={handleScoutCountChange}
            className="mt-2 block w-full border border-gray-400 rounded-lg shadow-md focus:ring-green-600 focus:border-green-600"
          />
        </div>

        <div className="mb-6 overflow-y-auto max-h-96">
          {scouts.map((scout, index) => (
            <div key={index} className="mb-6 border p-5 rounded-lg bg-gray-50">
              <h2 className="text-xl font-semibold mb-3">Scout {index + 1}</h2>
              <input
                type="text"
                placeholder="Full Name"
                value={scout.fullName}
                onChange={(e) => {
                  const value = e.target.value;
                  handleScoutChange(index, 'fullName', value);
                }}
                onBlur={() => {
                  if (!validateFullName(scout.fullName)) {
                    toast.error('Full name cannot be empty.'); // Use toast for error message
                  }
                }}
                className={`mt-2 block w-full border ${validateFullName(scout.fullName) ? 'border-gray-400' : 'border-red-500'} rounded-lg shadow-md focus:ring-green-600 focus:border-green-600 text-center`}
              />
              <label htmlFor={`gender-scout-${index}`} className="block text-xl font-semibold text-gray-800 mt-3">Gender</label>
              <select
                id={`gender-scout-${index}`}
                value={scout.gender}
                onChange={(e) => handleScoutChange(index, 'gender', e.target.value)}
                className="mt-2 block w-full border border-gray-400 rounded-lg shadow-md focus:ring-green-600 focus:border-green-600 text-center"
              >
                <option value="">-- Select Gender --</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <input
                type="text"
                placeholder="Phone Number"
                value={scout.phoneNumber}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d{0,10}$/.test(value)) {
                    handleScoutChange(index, 'phoneNumber', value);
                  }
                }}
                onBlur={() => {
                  if (!validatePhoneNumber(scout.phoneNumber)) {
                    toast.error('Invalid phone number. Please enter a 10-digit number.');
                  }
                }}
                maxLength={10}
                className={`mt-2 block w-full border ${validatePhoneNumber(scout.phoneNumber) || scout.phoneNumber === '' ? 'border-gray-400' : 'border-red-500'} rounded-lg shadow-md focus:ring-green-600 focus:border-green-600 text-center`}
              />
              <input
                type="email"
                placeholder="Email"
                value={scout.email}
                onChange={(e) => {
                  const value = e.target.value;
                  handleScoutChange(index, 'email', value);
                }}
                onBlur={() => {
                  if (!validateEmail(scout.email)) {
                    toast.error('Invalid email address. Please enter a valid email.'); // Use toast for error message
                  }
                }}
                className={`mt-2 block w-full border ${validateEmail(scout.email) || scout.email === '' ? 'border-gray-400' : 'border-red-500'} rounded-lg shadow-md focus:ring-green-600 focus:border-green-600 text-center`}
              />
              {/* <input
                type="date"
                placeholder="Date of Birth"
                value={scout.dateOfBirth}
                onChange={(e) => handleScoutChange(index, 'dateOfBirth', e.target.value)}
                className="mt-2 block w-full border border-gray-400 rounded-lg shadow-md focus:ring-green-600 focus:border-green-600 text-center"
              /> */}
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={onPrevious}
            className="bg-gray-500 text-white px-5 py-3 rounded-lg hover:bg-gray-600"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
