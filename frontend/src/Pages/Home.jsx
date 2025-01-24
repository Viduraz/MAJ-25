import React, { useState, useEffect } from "react";
import v1 from "../Assests/v1.mp4";
import axios from "axios";
import { motion } from "framer-motion";
import AnimationContainer from "@/Components/AnimationContainer";

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
        const response = await axios.get(
          "http://localhost:3000/api/registration"
        );
        console.log("err", response);
        setCount(response.data.length);
        localStorage.setItem("registeredCount", response.data.length);
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
    return `${timeLeft.days || 0}d ${timeLeft.hours || 0}h ${
      timeLeft.minutes || 0
    }m ${timeLeft.seconds || 0}s`;
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="relative w-full h-screen overflow-hidden">
        <video
          autoPlay
          muted
          loop
          className="absolute top-0 left-0 object-cover w-full h-full"
        >
          <source src={v1} type="video/mp4" />
        </video>

        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center text-white">
          <p className="mb-4 text-xl tracking-wide uppercase">
            Welcome To Unbelievable Camping Experience
          </p>
          <h1 className="mb-6 text-6xl font-bold leading-tight">
            Maliyadeva <span className="text-gray-400">Adarsha</span> Jambareeta
          </h1>
          <button className="px-6 py-3 font-semibold text-gray-900 transition duration-300 bg-white rounded-full hover:bg-gray-300">
            LEARN MORE
          </button>
        </div>

        <div
          className="absolute transform -translate-x-1/2 cursor-pointer bottom-4 left-1/2"
          onClick={scrollToSection}
        >
          <div className="flex items-center justify-center w-8 h-8 border-2 border-white rounded-full">
            <div className="w-1 h-4 bg-white animate-bounce"></div>
          </div>
        </div>

        <AnimatedCounter targetCount={count} />

        <div className="absolute top-4 left-4">
          <div className="flex items-center gap-6">
            {["Days", "Hours", "Minutes", "Seconds"].map((label, index) => {
              const value =
                label === "Days"
                  ? timeLeft.days || 0
                  : label === "Hours"
                  ? timeLeft.hours || 0
                  : label === "Minutes"
                  ? timeLeft.minutes || 0
                  : timeLeft.seconds || 0;

              return (
                <div key={index} className="flex flex-col items-center gap-2">
                  <span className="flex items-center justify-center w-16 h-16 text-3xl font-bold bg-white rounded-lg shadow-md text-primary">
                    {value}
                  </span>
                  <span className="text-sm font-medium text-white">
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CampSite MAP Section */}
      <AnimationContainer>
        <div className="px-4 py-16 text-center bg-gray-100">
          <h2 className="mb-8 text-4xl font-bold text-gray-800">
            CampSite MAP
          </h2>
          <div className="flex justify-center">
            <img
              src="https://via.placeholder.com/400"
              alt="Campsite Map"
              className="rounded-lg shadow-lg cursor-pointer hover:opacity-90"
              onClick={() => setIsModalOpen(true)}
            />
          </div>
        </div>
      </AnimationContainer>

      {/* Modal for larger image */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="relative">
            <img
              src="https://via.placeholder.com/800"
              alt="Campsite Map Enlarged"
              className="max-w-full max-h-screen rounded-lg"
            />
            <button
              className="absolute px-3 py-1 text-sm font-bold text-black bg-white rounded-full top-2 right-2 hover:bg-gray-300"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Organizing Committee Section */}
      <AnimationContainer>
        <div
          id="organizing-committee"
          className="px-4 py-16 text-center bg-gray-100 "
        >
          <h2 className="mb-12 text-4xl font-bold text-gray-800">
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
                  className="object-cover w-40 h-40 border-4 border-gray-300 rounded-full shadow-md"
                />
                <p className="mt-4 text-xl font-semibold text-gray-700">
                  Member 1
                </p>
                <p className="mb-2 text-sm text-gray-500">Event Manager</p>
                <p className="text-sm text-gray-600">
                  mama thama all event activities wadda .
                </p>
              </div>

              {/* Member 2 */}
              <div className="flex flex-col items-center max-w-xs">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Member 2"
                  className="object-cover w-40 h-40 border-4 border-gray-300 rounded-full shadow-md"
                />
                <p className="mt-4 text-xl font-semibold text-gray-700">
                  member 2
                </p>
                <p className="mb-2 text-sm text-gray-500">Logistics Head</p>
                <p className="text-sm text-gray-600">
                  mama thama logistics waddda.
                </p>
              </div>

              {/* Member 3 */}
              <div className="flex flex-col items-center max-w-xs">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Member 3"
                  className="object-cover w-40 h-40 border-4 border-gray-300 rounded-full shadow-md"
                />
                <p className="mt-4 text-xl font-semibold text-gray-700">
                  member 3
                </p>
                <p className="mb-2 text-sm text-gray-500">Coordinator</p>
                <p className="text-sm text-gray-600">
                  mama thama cordintor wadda
                </p>
              </div>

              {/* Member 4 */}
              <div className="flex flex-col items-center max-w-xs">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Member 4"
                  className="object-cover w-40 h-40 border-4 border-gray-300 rounded-full shadow-md"
                />
                <p className="mt-4 text-xl font-semibold text-gray-700">
                  Member 4
                </p>
                <p className="mb-2 text-sm text-gray-500">Finance Lead</p>
                <p className="text-sm text-gray-600">mama thama budget wadda</p>
              </div>
            </div>
          </div>
        </div>
      </AnimationContainer>

      {/* Logo Marquee */}
      <AnimationContainer>
        <section className="py-16 mb-5 overflow-hidden bg-gray-50">
          <div className="flex space-x-12 animate-marquee">
            {logos.concat(logos).map((logo, index) => (
              <img
                key={index}
                src={logo}
                alt="Partner logo"
                width={120}
                height={40}
                className="h-[clamp(30px,4vw,50px)] w-auto object-contain"
              />
            ))}
          </div>
        </section>
      </AnimationContainer>

      {/* Countdown Section */}
      <AnimationContainer>
        <div className="py-12 mx-4 text-center rounded-lg shadow-lg bg-gradient-to-r from-purple-500 to-blue-500">
          <h2 className="mb-4 text-4xl font-bold text-white">
            Countdown to Event
          </h2>
          <div className="text-6xl font-extrabold text-white">
            {formatTimeLeft()}
          </div>
          <p className="mt-2 text-lg text-white">
            Days : Hours : Minutes : Seconds
          </p>
        </div>
      </AnimationContainer>
    </div>
  );
}

const logos = [
  "https://upload.wikimedia.org/wikipedia/commons/a/ab/Meta-Logo.png",
  "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/e/e3/Microsoft_Azure_Logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/9/96/Slack_Icon.png",
  "https://upload.wikimedia.org/wikipedia/commons/b/b9/Slack_Technologies_Logo.svg",
];

const AnimatedCounter = ({ targetCount }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Animate the counter from 0 to targetCount
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev < targetCount) {
          return prev + 1; // Increment counter
        }
        clearInterval(interval); // Stop the interval when targetCount is reached
        return prev;
      });
    }, 30); // Adjust speed as needed (30ms for a smooth experience)

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [targetCount]);

  return (
    <div className="absolute p-4 transition duration-300 ease-in-out bg-white bg-opacity-75 rounded-lg shadow-lg cursor-pointer top-4 right-4 hover:bg-opacity-100">
      <div className="text-sm text-gray-700">Number of Registered Scouts</div>
      <motion.div
        className="text-4xl font-bold text-center text-gray-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {count}
      </motion.div>
    </div>
  );
};
