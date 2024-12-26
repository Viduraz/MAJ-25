import React from 'react';

export default function Scouts({ scoutCount, scouts, handleScoutCountChange, handleScoutChange, onNext, onPrevious }) {
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

        {scouts.map((scout, index) => (
          <div key={index} className="mb-6 border p-5 rounded-lg bg-gray-50">
            <h2 className="text-xl font-semibold mb-3">Scout {index + 1}</h2>
            <input
              type="text"
              placeholder="Full Name"
              value={scout.fullName}
              onChange={(e) => handleScoutChange(index, 'fullName', e.target.value)}
              className="mt-2 block w-full border border-gray-400 rounded-lg shadow-md focus:ring-green-600 focus:border-green-600 text-center"
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
              onChange={(e) => handleScoutChange(index, 'phoneNumber', e.target.value)}
              className="mt-2 block w-full border border-gray-400 rounded-lg shadow-md focus:ring-green-600 focus:border-green-600 text-center"
            />
            <input
              type="email"
              placeholder="Email"
              value={scout.email}
              onChange={(e) => handleScoutChange(index, 'email', e.target.value)}
              className="mt-2 block w-full border border-gray-400 rounded-lg shadow-md focus:ring-green-600 focus:border-green-600 text-center"
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

        <div className="flex justify-between mt-6">
          <button
            onClick={onPrevious}
            className="bg-gray-500 text-white px-5 py-3 rounded-lg hover:bg-gray-600"
          >
            Previous
          </button>
          <button
            onClick={onNext}
            className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
