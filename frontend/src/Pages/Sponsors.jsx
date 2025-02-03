import React from 'react';
import oldscout from "../Assests/OldSCOUTS.png"

export default function Sponsors() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[250px] md:h-[300px] lg:h-[400px]">
        <img
          src="https://via.placeholder.com/1920x600" // Replace with actual image URL
          alt="Sponsors"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Enhanced Sponsors Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white uppercase text-center">
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent animate-gradient">
              Partners and Sponsors
            </span>
            <span className="block mt-2 text-lg md:text-xl lg:text-2xl font-medium text-gray-200">
              Together We Build the Future
            </span>
          </h1>
        </div>
      </div>

      {/* Sponsors Content */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Official Mentorship Partner Section */}
        <div className="bg-white p-8 rounded-3xl shadow-2xl transform transition-all hover:scale-105 hover:shadow-3xl mb-12">
          <h2 className="text-3xl font-bold text-purple-800 mb-6">Official Mentorship Partner</h2>
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
            <img
              src={oldscout}// Replace with actual image URL
              alt="Mallyadeva Adarsha Old Scout's Association"
              className="w-32 h-32 rounded-full border-4 border-purple-200"
            />
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-gray-800">Mallyadeva Adarsha Old Scout's Association</h3>
              <p className="mt-4 text-gray-600">
                The Mallyadeva Adarsha Old Scouts' Association is a community of over 50+ President's Scouts and Senior Scouts who continue to uphold the values of Scouting beyond their school years. This transition serves as a platform to encourage collaboration and contribute towards the community.
              </p>
            </div>
          </div>
        </div>

        {/* Strategic Partner Section */}
        <div className="bg-white p-8 rounded-3xl shadow-2xl transform transition-all hover:scale-105 hover:shadow-3xl mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Strategic Partner</h2>
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
            <img
              src="https://via.placeholder.com/150" // Replace with actual image URL
              alt="Strategic Partner"
              className="w-32 h-32 rounded-full border-4 border-blue-200"
            />
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-gray-800">Strategic Partner Name</h3>
              <p className="mt-4 text-gray-600">
                Information about the strategic partner.
              </p>
            </div>
          </div>
        </div>

        {/* Platinum Partner Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 rounded-3xl shadow-2xl transform transition-all hover:scale-105 hover:shadow-3xl mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 relative inline-block">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-200">
              Platinum Partner
            </span>
            <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400 transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></span>
          </h2>
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
            <img
              src="https://via.placeholder.com/150" // Replace with actual image URL
              alt="Platinum Partner"
              className="w-32 h-32 rounded-full border-4 border-yellow-200"
            />
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-white">Platinum Partner Name</h3>
              <p className="mt-4 text-gray-200">
                Information about the platinum partner.
              </p>
            </div>
          </div>
        </div>

        {/* Gold Sponsors Section */}
        <div className="bg-gradient-to-r from-yellow-600 to-yellow-400 p-8 rounded-3xl shadow-2xl transform transition-all hover:scale-105 hover:shadow-3xl mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 relative inline-block">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200">
              Gold Sponsors
            </span>
            <span className="absolute bottom-0 left-0 w-full h-1 bg-white transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Sponsor 1 */}
            <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center text-center">
              <img
                src="https://via.placeholder.com/100" // Replace with actual image URL
                alt="Gold Sponsor 1"
                className="w-24 h-24 rounded-full border-4 border-yellow-200"
              />
              <h3 className="text-xl font-bold text-gray-800 mt-4">Gold Sponsor 1</h3>
              <p className="mt-2 text-gray-600">Description about Gold Sponsor 1.</p>
            </div>
            {/* Sponsor 2 */}
            <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center text-center">
              <img
                src="https://via.placeholder.com/100" // Replace with actual image URL
                alt="Gold Sponsor 2"
                className="w-24 h-24 rounded-full border-4 border-yellow-200"
              />
              <h3 className="text-xl font-bold text-gray-800 mt-4">Gold Sponsor 2</h3>
              <p className="mt-2 text-gray-600">Description about Gold Sponsor 2.</p>
            </div>
            {/* Sponsor 3 */}
            <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center text-center">
              <img
                src="https://via.placeholder.com/100" // Replace with actual image URL
                alt="Gold Sponsor 3"
                className="w-24 h-24 rounded-full border-4 border-yellow-200"
              />
              <h3 className="text-xl font-bold text-gray-800 mt-4">Gold Sponsor 3</h3>
              <p className="mt-2 text-gray-600">Description about Gold Sponsor 3.</p>
            </div>
          </div>
        </div>

        {/* Silver Sponsors Section */}
        <div className="bg-gradient-to-r from-gray-400 to-gray-300 p-8 rounded-3xl shadow-2xl transform transition-all hover:scale-105 hover:shadow-3xl">
          <h2 className="text-3xl font-bold text-white mb-6 relative inline-block">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200">
              Silver Sponsors
            </span>
            <span className="absolute bottom-0 left-0 w-full h-1 bg-white transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Sponsor 1 */}
            <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center text-center">
              <img
                src="https://via.placeholder.com/100" // Replace with actual image URL
                alt="Silver Sponsor 1"
                className="w-24 h-24 rounded-full border-4 border-gray-200"
              />
              <h3 className="text-xl font-bold text-gray-800 mt-4">Silver Sponsor 1</h3>
              <p className="mt-2 text-gray-600">Description about Silver Sponsor 1.</p>
            </div>
            {/* Sponsor 2 */}
            <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center text-center">
              <img
                src="https://via.placeholder.com/100" // Replace with actual image URL
                alt="Silver Sponsor 2"
                className="w-24 h-24 rounded-full border-4 border-gray-200"
              />
              <h3 className="text-xl font-bold text-gray-800 mt-4">Silver Sponsor 2</h3>
              <p className="mt-2 text-gray-600">Description about Silver Sponsor 2.</p>
            </div>
            {/* Sponsor 3 */}
            <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center text-center">
              <img
                src="https://via.placeholder.com/100" // Replace with actual image URL
                alt="Silver Sponsor 3"
                className="w-24 h-24 rounded-full border-4 border-gray-200"
              />
              <h3 className="text-xl font-bold text-gray-800 mt-4">Silver Sponsor 3</h3>
              <p className="mt-2 text-gray-600">Description about Silver Sponsor 3.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}