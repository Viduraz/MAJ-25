import React, { useState } from 'react';
import AnimationContainer from "@/Components/AnimationContainer";
import aboutus from "../Assests/Aboutus.jpg";
import yasas from "../Assests/Yasas1.jpg";
import savindu from "../Assests/Savindu1.jpg";
import sanjula from "../Assests/Sanjula1.jpg";
import wohansa from "../Assests/Wohansa1.jpg";
import pahanmi from "../Assests/Pahanmi.jpg";
import niketha from "../Assests/Niketha1.jpg";
import praveen from "../Assests/Praveen.jpg";
import kassapa from "../Assests/Kassapa.jpg";
import dimuthu from "../Assests/Dimuthu.jpg";
import ashinsa from "../Assests/Ashinsa.jpg";
import henuka from "../Assests/Henuka.jpg";
import sachintha from "../Assests/Sachintha.jpg";
import sandeepa from "../Assests/Sandeepa.jpg";
import manodya from "../Assests/Manodya.jpg";
import ransa from "../Assests/Ransa.jpg";

export default function About() {
  const [showFullContent, setShowFullContent] = useState(false);
  const [showFullMission, setShowFullMission] = useState(false);

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  const toggleMissionContent = () => {
    setShowFullMission(!showFullMission);
  };

  const organizingTeam = [
    {
      name: "Sachintha Senadheera",
      role: "President",
      description: "Ensures a safe environment for all activities.",
      image: sachintha,
    }, 
    
    {
      name: "Yasas Hearath",
      role: "Vice President",
      description: "Leading the team to success with dedication and passion.",
      image: yasas,
    },
    {
      name: "Ransa Bandara",
      role: "Vice President",
      description: "Ensures a safe environment for all activities.",
      image: ransa,
    },
    {
      name: "Wohansa Karunarathne",
      role: "Secretary",
      description: "Ensures smooth communication and planning within the team.",
      image: wohansa,
    },
    {
      name: "Savindu Sathsara",
      role: "Junior Treasurer",
      description: "Manages financial resources with precision.",
      image: savindu,
    },
     
    {
      name: "Praveen Randima",
      role: "Quarter Master",
      description: "Oversees logistics and resource allocation.",
      image: praveen,
    },
    {
      name: "Sanjula Indheera",
      role: "IT Media & Marketing Coordinator",
      description: "Drives digital presence and outreach strategies.",
      image: sanjula,
    },
    {
      name: "Pahanmi Karunanayake",
      role: "Finance Coordinator",
      description: "Ensures financial stability and growth.",
      image: pahanmi,
    },
    {
      name: "Niketha Weerasinghe",
      role: "Admin Coordinator",
      description: "Manages all event resources and logistics efficiently.",
      image: niketha,
    },
    {
      name: "Manodya Nawarathne",
      role: "HR Coordinator",
      description: "Ensures a safe environment for all activities.",
      image: manodya,
    }, 
    {
      name: "Kassapa Malalasekara",
      role: "Safety & Security Coordinator",
      description: "Ensures a safe environment for all activities.",
      image: kassapa,
    }, 
    {
      name: "Dimuthu Dasun",
      role: "Programme Coordinator",
      description: "Ensures a safe environment for all activities.",
      image: dimuthu,
    }, 
    {
      name: "Henuka Wasala",
      role: "Activity Coordinator",
      description: "Ensures a safe environment for all activities.",
      image: henuka,
    }, 
    {
      name: "Ashinsa Thennakoon",
      role: "Jambaree Editor",
      description: "Ensures a safe environment for all activities.",
      image: ashinsa,
    }, 
    {
      name: "Sandeepa Edirisinghe",
      role: "Jambaree Editor",
      description: "Ensures a safe environment for all activities.",
      image: sandeepa,
    }, 

  ];

  const oldScoutAssociation = [
    {
      name: "Hasitha Senadheera",
      role: "Former Scout Leader",
      description: "Led the scout team with exemplary leadership.",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Champika Rathnayaka",
      role: "Former Scout Leader",
      description: "Contributed significantly to the scout activities",
      image: "https://via.placeholder.com/150",
    },
    // Add more members as needed
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[400px] lg:h-[600px]">
        <img
          src={aboutus}
          alt="Scout Group"
          className="object-cover w-full h-full rounded-lg shadow-lg"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-6xl font-extrabold tracking-wider text-white uppercase md:text-8xl drop-shadow-lg">
            About Us
          </h1>
        </div>
      </div>

     {/* Introduction Section */}
<AnimationContainer>
  <div className="container px-6 py-20 mx-auto text-center">
    <h1 className="mb-8 text-5xl font-bold text-blue-800 md:text-6xl">
      A Legacy of Excellence
    </h1>
    <p className="max-w-3xl mx-auto text-xl leading-relaxed text-gray-700">
    Our dedication to developing well-rounded individuals found expression in 1985 with the establishment of our first Cub Scout Troop. This initiative blossomed into a comprehensive scouting program encompassing Boy Scouts, Girl Scouts, and Cub Scouts. Our scouts have not only excelled in national and international arenas but have gone on to assume leadership roles across various sectors of society.

    </p>
    <div className="mt-10">
      <button className="px-8 py-3 text-lg font-semibold text-white transition duration-300 bg-blue-600 rounded-lg hover:bg-blue-700 hover:shadow-lg">
        Learn More
      </button>
    </div>
  </div>
</AnimationContainer>

{/* Mission Section */}
<AnimationContainer>
  <div className="relative py-20 overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700">
    <div className="absolute inset-0 bg-opacity-25 bg-pattern"></div>
    <div className="container relative px-6 mx-auto text-center">
      <h1 className="mb-8 text-4xl font-bold text-white md:text-5xl">
        Our Mission
      </h1>
      <p className="max-w-3xl mx-auto text-xl leading-relaxed text-blue-100">
      Our mission is to provide a unique outdoor experience that fosters personal growth, leadership, and teamwork among students. Through engaging activities and challenges, we aim to instill important values such as responsibility, respect for nature, and the spirit of adventure.
      {showFullMission && (
        <>
          <br />
          Our goal is to create an environment where students can develop essential life skills, build lasting friendships, and deepen their appreciation for the outdoors. With a focus on cooperation, resilience, and learning, the camp serves as a platform for students to discover their potential, all while having fun and creating unforgettable memories.
        </>
      )}
      </p>
      <div className="mt-10">
        <button
          className="px-8 py-3 text-lg font-semibold text-blue-600 transition duration-300 bg-white rounded-lg hover:bg-gray-100 hover:shadow-lg"
          onClick={toggleMissionContent}
        >
          {showFullMission ? 'Show Less' : 'Discover More'}
        </button>
      </div>
    </div>
  </div>
</AnimationContainer>

{/* Story Section */}
<AnimationContainer>
  <div className="container px-6 py-20 mx-auto text-center">
    <h1 className="mb-8 text-4xl font-bold text-purple-800 md:text-5xl">
      Our Story
    </h1>
    <p className="max-w-3xl mx-auto text-xl leading-relaxed text-gray-700">
      Maliyadeva Adarsha Jambareeta (MAJ)
      Since its inception in 2015, the Maliyadeva Adarsha Jambareeta has evolved into a cornerstone event in our school's calendar. This triennial gathering brings together Scouts, Scout Leaders, Cub Scouts, Girl Guides, and parents in a celebration of learning and growth.
      {showFullContent && (
        <>
          <br />
          <strong>The Journey So Far</strong>
          <br />
          2015: The inaugural event set new standards for youth development programs
          <br />
          2020: Expanded horizons with innovative workshops and leadership initiatives
          <br />
          2025: The upcoming third edition promises to be our most ambitious yet
          <br />
          <strong>MAJ 2025: Shaping Tomorrow's Leaders</strong>
          <br />
          The upcoming Maliyadeva Adarsha Jambareeta 2025 (MAJ 2025) represents the culmination of our commitment to youth development. This five-day extravaganza will welcome over 2,500 participants.
          As we continue our journey of excellence, Maliyadeva Adarsha Maha Vidyalaya remains committed to nurturing future generations of leaders. Through our comprehensive educational programs and signature events like MAJ 2025, we continue to shape young minds and inspire them to become responsible global citizens.
        </>
      )}
    </p>
    <div className="mt-10">
      <button
        className="px-8 py-3 text-lg font-semibold text-white transition duration-300 bg-purple-600 rounded-lg hover:bg-purple-700 hover:shadow-lg"
        onClick={toggleContent}
      >
        {showFullContent ? 'Show Less' : 'Read More'}
      </button>
    </div>
  </div>
</AnimationContainer>

      {/* Organizing Team Section */}
      <AnimationContainer>
        <div className="py-16 bg-gray-100">
          <h2 className="mb-12 text-4xl font-semibold text-center text-gray-800">
            Meet Our Organizing Team
          </h2>
          <div className="container grid grid-cols-1 gap-8 px-6 mx-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {organizingTeam.map((member, index) => (
              <div
                key={index}
                className="relative overflow-hidden transition duration-300 transform bg-white rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-2"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="object-cover w-full h-64"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-600">{member.role}</p>
                  <p className="mt-2 text-sm text-gray-500">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimationContainer>

      {/* Old Scout Team Section */}
      {/* <AnimationContainer>
        <div className="py-16 bg-white">
          <h2 className="mb-12 text-4xl font-semibold text-center text-gray-800">
            Meet Our Old Scout Team
          </h2>
          <div className="container grid grid-cols-1 gap-8 px-6 mx-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {oldScoutAssociation.map((member, index) => (
              <div
                key={index}
                className="relative overflow-hidden transition duration-300 transform bg-white rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-2"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="object-cover w-full h-64"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-600">{member.role}</p>
                  <p className="mt-2 text-sm text-gray-500">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimationContainer> */}
    </div>
  );
}