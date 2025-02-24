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

        {/* Strategic Partner Section
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
        </div> */}

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
              <h3 className="text-2xl font-bold text-white">ICT From ABC</h3>
              <p className="mt-4 text-gray-200">
                Information about the platinum partner.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}