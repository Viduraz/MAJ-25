import React, { useState, useEffect } from "react";
import v1 from "../Assests/v1.mp4";
import axios from "axios";

export default function Home() {
  // Scroll to section function
  const scrollToSection = () => {
    document.getElementById("organizing-committee").scrollIntoView({
      behavior: "smooth",
    });
  };

  // State for registered count
  const [count, setCount] = useState(0);

  // State for countdown
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  // State for modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Update count on component mount
  useEffect(() => {
    const fetchRegisteredCount = async () => {
      try {
        const response = await axios.get("http://localhost3000/api/registrations");
        setCount(response.data.count);
        localStorage.setItem("registeredCount", response.data.count);
      } catch (error) {
        console.error("Error fetching registered count:", error);
      }
    };

    fetchRegisteredCount();
  }, []);

  // Update countdown every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Function to calculate time left until 20th February 2026
  function calculateTimeLeft() {
    const difference = +new Date("2025-02-20") - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  // Function to format time left
  const formatTimeLeft = () => {
    return `${timeLeft.days || 0}d ${timeLeft.hours || 0}h ${timeLeft.minutes || 0}m ${timeLeft.seconds || 0}s`;
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="relative w-full h-screen overflow-hidden">
        <video
          autoPlay
          muted
          loop
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src={v1} type="video/mp4" />
        </video>

        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <p className="text-xl tracking-wide uppercase mb-4">
            Welcome To Unbelievable Camping Experience
          </p>
          <h1 className="text-6xl font-bold leading-tight mb-6">
            Maliyadeva <span className="text-gray-400">Adarsha</span> Jambareeta
          </h1>
          <button className="bg-white text-gray-900 px-6 py-3 font-semibold rounded-full hover:bg-gray-300 transition duration-300">
            LEARN MORE
          </button>
        </div>

        <div
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={scrollToSection}
        >
          <div className="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center">
            <div className="w-1 h-4 bg-white animate-bounce"></div>
          </div>
        </div>

        <div className="absolute top-4 right-4 p-4 bg-white bg-opacity-75 rounded-lg shadow-lg hover:bg-opacity-100 transition duration-300 ease-in-out cursor-pointer">
          <div className="text-sm text-gray-700">Number of Registered Scouts</div>
          <div className="text-4xl font-bold text-gray-900">{count}</div>
          <div className="hidden group-hover:block text-xs text-gray-500 mt-2">
            Hovered over the count!
          </div>
        </div>

        <div style={styles.countdown}>{formatTimeLeft()}</div>
      </div>

      {/* CampSite MAP Section */}
      <div className="bg-gray-100 py-16 px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">CampSite MAP</h2>
        <div className="flex justify-center">
          <img
            src="https://via.placeholder.com/400"
            alt="Campsite Map"
            className="cursor-pointer rounded-lg shadow-lg hover:opacity-90"
            onClick={() => setIsModalOpen(true)}
          />
        </div>
      </div>

      {/* Modal for larger image */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="relative">
            <img
              src="https://via.placeholder.com/800"
              alt="Campsite Map Enlarged"
              className="max-w-full max-h-screen rounded-lg"
            />
            <button
              className="absolute top-2 right-2 bg-white text-black px-3 py-1 rounded-full text-sm font-bold hover:bg-gray-300"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Organizing Committee Section */}
      <div
        id="organizing-committee"
        className="bg-gray-100 py-16 px-4 text-center"
      >
        <h2 className="text-4xl font-bold text-gray-800 mb-12">
          Our Organizing Committee
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
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
    </div>
  );
}

const styles = {
  countdown: {
    position: "absolute",
    top: "10px",
    left: "10px",
    padding: "10px",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    borderRadius: "5px",
    fontSize: "20px",
    fontWeight: "bold",
  },
};
