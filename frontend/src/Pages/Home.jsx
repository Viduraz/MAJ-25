import React, { useState, useEffect } from "react";
import v1 from "../Assests/v1.mp4";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import AnimationContainer from "@/Components/AnimationContainer";
import map from "../Assests/MAP.png";
import gamagesir from "../Assests/gamagesir.png";
import sahan from "../Assests/sahan.png";
import inokamis from "../Assests/inokamis.png";
import manorimis from "../Assests/manorimis.png";
import googlec from "../Assests/googlec.png";
// import google from "../Assests/google.png";
// import meta from "../Assests/meta.png";
import mobitel from "../Assests/mobitel.jpeg";
import ethink from "../Assests/ethink.png";
import nestle from "../Assests/nestle.jpg";
import ddji1 from "../Assests/ddji1.jpg";
import ajithsir from "../Assests/AjithSIR.png";
import reGiOpen from "../Assests/Registration_Open.jpg"
import ictfrombs from "../Assests/ictfromabc_logo.png";
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/registration');
  };

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

  // Add state for registered users
  const [registeredUsers, setRegisteredUsers] = useState([]);

  // State for news feed
  const [news, setNews] = useState([
    {
      title: "MAJ 2025 Registration Now Open",
      description: "Join us for the biggest scouting event of the year! Early bird registration is now available for Your Troop registrations.",
      image: reGiOpen
    },
    {
      title: "New Activities Announced",
      description: "Exciting new activities including rope courses, wilderness survival workshops, and environmental conservation projects have been added to the event schedule.",
      image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Volunteer Opportunities",
      description: "We're looking for experienced scouts and Rovers to volunteer as activity coordinators and team leaders during the jamboree.",
      image: "https://images.unsplash.com/photo-1526976668912-1a811878dd37?q=80&w=1000&auto=format&fit=crop"
    }
  ]);

  // Add this state near your other state declarations
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  // Update count on component mount
  useEffect(() => {
    const fetchRegisteredCount = async () => {
      try {
        const response = await axios.get(
          "https://maj-25-backend.onrender.com/api/registration"
        );
        console.log("Registered Count Response:", {
          data: response.data,
          status: response.status,
          statusText: response.statusText,
        });
        setCount(response.data.length);
        localStorage.setItem("registeredCount", response.data.length);
        // Set the registered users data to state
        setRegisteredUsers(response.data);
      } catch (error) {
        console.error("Error fetching registered count:", error);
      }
    };

    fetchRegisteredCount();
  }, []);

  // Fetch news feed on component mount
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          "https://maj-25-backend.onrender.com/api/news"
        );
        setNews(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  // Add this effect after your other useEffect hooks
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % news.length);
    }, 10000); // 30 seconds

    return () => clearInterval(timer);
  }, [news.length]);

  // Update countdown every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Function to calculate time left until 20th February 2026
  function calculateTimeLeft() {
    const difference = +new Date("2025-02-26") - +new Date();
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
    <div className="w-full min-h-screen"> {/* Changed from container mx-auto */}
      {/* Hero Section */}
      <div className="relative w-full h-[100vh] max-h-screen"> {/* Updated height handling */}
        <video
          autoPlay
          muted
          loop
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src={v1} type="video/mp4" />
        </video>

        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center text-white">
          <p className="mb-4 text-2xl tracking-wide uppercase">
            Plants Seeds Of Change Today
          </p>
          <h1 className="mb-6 text-6xl font-bold leading-tight">
            Maliyadeva <span className="text-gray-400">Adarsha</span> Jambareeta
          </h1>
          <button
            className="px-6 py-3 font-semibold text-gray-900 transition duration-300 bg-white rounded-full hover:bg-gray-300"
            onClick={handleRegisterClick}
          >
            REGISTER NOW
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

      {/* News Feed Section */}
      <AnimationContainer>
        <div className="px-4 py-16 bg-gray-200"> {/* Changed background color to ash */}
          <h2 className="mb-8 text-4xl font-bold text-center text-gray-800">
            Our Latest News
          </h2>
          <div className="relative h-96 overflow-hidden flex justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentNewsIndex}
                className="absolute w-full sm:w-3/4 md:w-1/2 lg:w-1/3 p-6 bg-white rounded-lg shadow-lg"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <div className="flex flex-col items-center">
                  <img
                    src={news[currentNewsIndex]?.image}
                    alt={news[currentNewsIndex]?.title}
                    className="w-full h-56 object-cover rounded-lg mb-4"
                  />
                  <h3 className="mb-2 text-2xl font-semibold text-gray-800">
                    {news[currentNewsIndex]?.title}
                  </h3>
                  <p className="text-gray-600 text-center">
                    {news[currentNewsIndex]?.description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          {/* Add navigation dots */}
          <div className="flex justify-center gap-2 mt-4">
            {news.map((_, index) => (
              <button
                key={index}
                className={`w-4 h-4 rounded-full transition-colors duration-300 ${
                  index === currentNewsIndex ? 'bg-blue-500' : 'bg-gray-300'
                }`}
                onClick={() => setCurrentNewsIndex(index)}
              />
            ))}
          </div>
        </div>
      </AnimationContainer>

      {/* CampSite MAP Section */}
      <AnimationContainer>
        <div className="px-0 py-16 text-center bg-gray-100">
          <h2 className="mb-8 text-4xl font-bold text-gray-800">
            CampSite MAP
          </h2>
          <div className="flex justify-center">
            <img
              src={map}
              alt="Campsite Map"
              className="w-full max-w-3xl rounded-lg shadow-lg cursor-pointer transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
              onClick={() => setIsModalOpen(true)}
            />
          </div>
        </div>
      </AnimationContainer>

      {/* Modal for larger image */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="relative max-w-7xl mx-auto" onClick={e => e.stopPropagation()}>
            <img
              src={map}
              alt="Campsite Map Enlarged"
              className="w-full h-auto max-h-[90vh] rounded-lg shadow-2xl"
            />
            <button
              className="absolute top-4 right-4 px-4 py-2 text-sm font-bold text-black transition-colors bg-white rounded-full hover:bg-gray-200"
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
          FRONTIER GUIDES - MAJ 2025
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            {/* Committee Members */}
            <div className="flex flex-wrap justify-center gap-8">
              {/* Member 1 */}
              <div className="flex flex-col items-center max-w-xs">
                <img
                  src={gamagesir}
                  alt="Member 1"
                  className="object-cover w-40 h-40 border-4 border-gray-300 rounded-full shadow-md"
                />
                <p className="mt-4 text-xl font-semibold text-gray-700">
                  AMILA GAMAGE
                </p>
                <p className="mb-2 text-sm text-gray-500">GROUP SCOUT MASTER</p>
               
              </div>

              {/* Member 2 */}
              <div className="flex flex-col items-center max-w-xs">
                <img
                  src={inokamis}
                  alt="Member 2"
                  className="object-cover w-40 h-40 border-4 border-gray-300 rounded-full shadow-md"
                />
                <p className="mt-4 text-xl font-semibold text-gray-700">
                  INOKA RATHNASIRI
                </p>
                <p className="mb-2 text-sm text-gray-500">SCOUT MASTER</p>
                
              </div>

              {/* Member 3 */}
              <div className="flex flex-col items-center max-w-xs">
                <img
                  src={manorimis}
                  alt="Member 3"
                  className="object-cover w-40 h-40 border-4 border-gray-300 rounded-full shadow-md"
                />
                <p className="mt-4 text-xl font-semibold text-gray-700">
                  MANORI GUNATHILAKE
                </p>
                <p className="mb-2 text-sm text-gray-500">SCOUT MASTER</p>
                
              </div>
             

              {/* Member 4 */}
              <div className="flex flex-col items-center max-w-xs">
                <img
                  src={sahan}
                  alt="Member 4"
                  className="object-cover w-40 h-40 border-4 border-gray-300 rounded-full shadow-md"
                />
                <p className="mt-4 text-xl font-semibold text-gray-700">
                  SAHAN SERASINGHE
                </p>
                <p className="mb-2 text-sm text-gray-500">SCOUT MASTER</p>
              </div>

              <div className="flex flex-col items-center max-w-xs">
                <img
                  src={ajithsir}
                  alt="Member 3"
                  className="object-cover w-40 h-40 border-4 border-gray-300 rounded-full shadow-md"
                />
                <p className="mt-4 text-xl font-semibold text-gray-700">
                  AJITH KUMARA
                </p>
                <p className="mb-2 text-sm text-gray-500">JAMBAREE COORDINATOR</p>
              </div>

              
            </div>
          </div>
        </div>
      </AnimationContainer>

      {/* Our Sponsors Section */}
      <AnimationContainer>
        <div className="py-16 bg-white">
          <div className="container px-4 mx-auto">
            <h2 className="mb-12 text-4xl font-bold text-center text-gray-800">
              Our Sponsors
            </h2>
            
            {/* Logo Marquee */}
            <div className="relative overflow-hidden">
              <div className="flex space-x-16 animate-marquee">
                <img
                  src={googlec}
                  alt="Sponsor 1"
                  className="h-20 w-auto"
                />
                {/* <img
                  src={google}
                  alt="Sponsor 2"
                  className="h-20 w-auto"
                /> */}
                {/* <img
                  src={meta}
                  alt="Sponsor 3"
                  className="h-20 w-auto"
                /> */}
                <img
                  src={mobitel}
                  alt="Sponsor 4"
                  className="h-20 w-auto"
                />
                 <img
                  src={ethink}
                  alt="Sponsor 4"
                  className="h-20 w-auto"
                />
                 <img
                  src={nestle}
                  alt="Sponsor 4"
                  className="h-20 w-auto"
                />
                <img
                  src={ddji1}
                  alt="Sponsor 4"
                  className="h-20 w-auto"
                />
                <img
                  src={ictfrombs}
                  alt="Sponsor 4"
                  className="h-20 w-auto"
                />
              </div>
            </div>
          </div>
        </div>
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
