import React from "react";
import AnimationContainer from "@/Components/AnimationContainer";
import aboutus from "../Assests/Aboutus.jpg";
import yasas from "../Assests/yasas.jpg";
import savindu from "../Assests/savindu.jpg";
import sanjula from "../Assests/sanjula.jpg";
import wohansa from "../Assests/wohansa.jpg";
import pahanmi from "../Assests/pahnmi.jpg";
import niketha from "../Assests/niketha.jpg";
import praveen from "../Assests/praveen.jpg";
import kassapa from "../Assests/kassapa.jpg";

export default function About() {
  const organizingTeam = [
    {
      name: "Yasas Hearath",
      role: "Vice President",
      description: "Leading the team to success with dedication and passion.",
      image: yasas,
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
      name: "Kassapa Malalasekara",
      role: "Safety & Security Coordinator",
      description: "Ensures a safe environment for all activities.",
      image: kassapa,
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
      name: "Champaka Rathnayaka",
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
      Established in 1978 as Maliyadeva Adarsha Prathamika Vidyalaya, the school
      has a rich history of fostering leadership, teamwork, and academic
      excellence. Through the years, it has grown to become a cornerstone of
      education and scouting in the region.
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

Our goal is to create an environment where students can develop essential life skills, build lasting friendships, and deepen their appreciation for the outdoors. With a focus on cooperation, resilience, and learning, the camp serves as a platform for students to discover their potential, all while having fun and creating unforgettable memories.
      </p>
      <div className="mt-10">
        <button className="px-8 py-3 text-lg font-semibold text-blue-600 transition duration-300 bg-white rounded-lg hover:bg-gray-100 hover:shadow-lg">
          Discover More
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
      In 2004, fellow MIT graduate students Brian Halligan and Dharmesh Shah
      noticed a shift in the way people shop and purchase products. Buyers didn't
      want to be interrupted by ads; they wanted helpful information. In 2006,
      they founded HubSpot to help companies use inbound marketing.
    </p>
    <div className="mt-10">
      <button className="px-8 py-3 text-lg font-semibold text-white transition duration-300 bg-purple-600 rounded-lg hover:bg-purple-700 hover:shadow-lg">
        Read More
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
      <AnimationContainer>
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
      </AnimationContainer>
    </div>
  );
}