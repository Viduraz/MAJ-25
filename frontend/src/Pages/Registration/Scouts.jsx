import React from 'react';

export default function Scouts({ scoutCount, scouts, handleScoutCountChange, handleScoutChange, onNext, onPrevious }) {
  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-5">Register Your Scouts</h2>

      <div className="mb-5">
        <label htmlFor="scoutCount" className="block text-lg font-medium text-gray-700">How many Scouts participated?</label>
        <input
          type="number"
          id="scoutCount"
          value={scoutCount}
          onChange={handleScoutCountChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {scouts.map((scout, index) => (
        <div key={index} className="mb-5 border p-4 rounded-md">
          <h2 className="text-lg font-medium">Scout {index + 1}</h2>
          <input
            type="text"
            placeholder="Full Name"
            value={scout.fullName}
            onChange={(e) => handleScoutChange(index, 'fullName', e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md"
          />
          <label htmlFor={`gender-scout-${index}`} className="block text-lg font-medium text-gray-700 mt-2">Gender</label>
          <select
            id={`gender-scout-${index}`}
            value={scout.gender}
            onChange={(e) => handleScoutChange(index, 'gender', e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md"
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
            className="mt-1 block w-full border border-gray-300 rounded-md"
          />
          <input
            type="email"
            placeholder="Email"
            value={scout.email}
            onChange={(e) => handleScoutChange(index, 'email', e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md"
          />
        </div>
      ))}

      <div className="flex justify-between">
        <button
          onClick={onPrevious}
          className="mt-5 bg-gray-500 text-white px-4 py-2 rounded-md"
        >
          Previous
        </button>
        <button
          onClick={onNext}
          className="mt-5 bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Next
        </button>
      </div>
    </>
  );
}
