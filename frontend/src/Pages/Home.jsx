import React from "react";
import v1 from "../Assests/v1.mp4";

export default function Home() {
  // Scroll to section function
  const scrollToSection = () => {
    document.getElementById("organizing-committee").scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="relative w-full h-screen overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src={v1} type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <p className="text-xl tracking-wide uppercase mb-4">
            Welcome To Unbelievable Camping Experience
          </p>
          <h1 className="text-6xl font-bold leading-tight mb-6">
            Maliyadeva <span className="text-gray-400">Adarsha</span> Jumboreeta
          </h1>
          <button className="bg-white text-gray-900 px-6 py-3 font-semibold rounded-full hover:bg-gray-300 transition duration-300">
            LEARN MORE
          </button>
        </div>

        {/* Scroll Indicator */}
        <div
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={scrollToSection}
        >
          <div className="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center">
            <div className="w-1 h-4 bg-white animate-bounce"></div>
          </div>
        </div>
      </div>

      {/* Organizing Committee Section */}
      <div
        id="organizing-committee"
        className="bg-gray-100 py-16 px-4 text-center"
      >
        <h2 className="text-4xl font-bold text-gray-800 mb-12">
          Our Organizing Committee
        </h2>

        {/* Committee Members */}
        <div className="flex flex-wrap justify-center gap-8">
          {/* Member 1 */}
          <div className="flex flex-col items-center max-w-xs">
            <img
              src="https://via.placeholder.com/150"
              alt="Member 1"
              className="w-40 h-40 rounded-full object-cover border-4 border-gray-300 shadow-md"
            />
            <p className="text-xl font-semibold text-gray-700 mt-4">
              Member 1
            </p>
            <p className="text-sm text-gray-500 mb-2">Event Manager</p>
            <p className="text-sm text-gray-600">
              mama thama all event activities wadda .
            </p>
          </div>

          {/* Member 2 */}
          <div className="flex flex-col items-center max-w-xs">
            <img
              src="https://via.placeholder.com/150"
              alt="Member 2"
              className="w-40 h-40 rounded-full object-cover border-4 border-gray-300 shadow-md"
            />
            <p className="text-xl font-semibold text-gray-700 mt-4">
              member 2
            </p>
            <p className="text-sm text-gray-500 mb-2">Logistics Head</p>
            <p className="text-sm text-gray-600">
              mama thama logistics waddda.
            </p>
          </div>

          {/* Member 3 */}
          <div className="flex flex-col items-center max-w-xs">
            <img
              src="https://via.placeholder.com/150"
              alt="Member 3"
              className="w-40 h-40 rounded-full object-cover border-4 border-gray-300 shadow-md"
            />
            <p className="text-xl font-semibold text-gray-700 mt-4">
              member 3
            </p>
            <p className="text-sm text-gray-500 mb-2">Coordinator</p>
            <p className="text-sm text-gray-600">
              mama thama cordintor wadda
            </p>
          </div>

          {/* Member 4 */}
          <div className="flex flex-col items-center max-w-xs">
            <img
              src="https://via.placeholder.com/150"
              alt="Member 4"
              className="w-40 h-40 rounded-full object-cover border-4 border-gray-300 shadow-md"
            />
            <p className="text-xl font-semibold text-gray-700 mt-4">
              Member 4
            </p>
            <p className="text-sm text-gray-500 mb-2">Finance Lead</p>
            <p className="text-sm text-gray-600">
              mama thama budget wadda
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
