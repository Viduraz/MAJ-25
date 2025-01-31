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
      role: "secretary",
      description: "Ensures smooth communication and planning within the team.",
      image: wohansa,
    },
    {
      name: "savindu Sathsara",
      role: "Junior Tresurer",
      description: "Ensures smooth communication and planning within the team.",
      image: savindu,
    },
    {
      name: "Praveen Randima",
      role: "Quarter Master",
      description: "Ensures smooth communication and planning within the team.",
      image: praveen,
    },
    {
      name: "sanjula indheera",
      role: "IT Media & Marketing Coordinator",
      description: "Ensures smooth communication and planning within the team.",
      image: sanjula,
    },
    {
      name: "Pahanmi Karunanayake",
      role: "Finance Coordinator",
      description: "Ensures smooth communication and planning within the team.",
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
      role: "Safety &Security Coordinator",
      description: "Handles financial management and budget planning.",
      image: kassapa,
    },
  ];

  const oldScoutAssociation = [
    {
      name: "John Doe",
      role: "Former Scout Leader",
      description: "Led the scout team with exemplary leadership.",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Jane Smith",
      role: "Former Scout Member",
      description: "Contributed significantly to the scout activities.",
      image: "https://via.placeholder.com/150",
    },
    // Add more members as needed
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[250px] md:h-[300px] lg:h-[600px]">
        <img
          src={aboutus}
          alt="Scout Group"
          className="object-cover w-full h-full rounded-lg shadow-lg"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-6xl font-extrabold tracking-wider text-white uppercase md:text-7xl drop-shadow-lg">
            About Us
          </h1>
        </div>
      </div>

      {/* Introduction Section */}
      <AnimationContainer>
        <div className="container px-6 py-12 mx-auto text-center">
          <h1 className="mb-6 text-5xl font-extrabold text-blue-600">
            A Legacy of Excellence Maliyadeva Adarsha Maha Vidyalaya
          </h1>
          <p className="text-lg leading-relaxed text-gray-800">
            Established in 1978 as Maliyadeva Adarsha Prathamika Vidyalaya, the
            school has a rich history of fostering leadership, teamwork, and
            academic excellence. Through the years, it has grown to become a
            cornerstone of education and scouting in the region.
          </p>
        </div>
      </AnimationContainer>

      {/* Mission Section */}
      <AnimationContainer>
        <div className="container px-6 py-12 mx-auto text-center bg-white shadow-lg rounded-lg">
          <h1 className="mb-6 text-4xl font-extrabold text-green-600">
            Our Mission
             Helping Millions of Organizations Grow Better
          </h1>
          <p className="text-lg leading-relaxed text-gray-700">
            We believe not just in growing bigger, but in growing better. And
            growing better means aligning the success of your own business with
            the success of your customers. Win-win!
          </p>
        </div>
      </AnimationContainer>

      {/* Story Section */}
      <AnimationContainer>
        <div className="container px-6 py-12 mx-auto text-center bg-gray-200 shadow-lg rounded-lg">
          <h1 className="mb-6 text-4xl font-extrabold text-purple-600">
            Our Story
          </h1>
          <p className="text-lg leading-relaxed text-gray-800">
            In 2004, fellow MIT graduate students Brian Halligan and Dharmesh
            Shah noticed a shift in the way people shop and purchase products.
            Buyers didn't want to be interrupted by ads; they wanted helpful
            information. In 2006, they founded HubSpot to help companies use
            inbound marketing.
          </p>
        </div>
      </AnimationContainer>

      {/* HubSpot By The Numbers Section */}
      <AnimationContainer>
        <div className="container px-6 py-12 mx-auto text-center bg-white shadow-lg rounded-lg">
          <h2 className="mb-6 text-3xl font-semibold text-gray-800">
            HubSpot By The Numbers
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="p-6 bg-blue-100 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-blue-600">12</h3>
              <p className="text-gray-600">Global Offices</p>
            </div>
            <div className="p-6 bg-green-100 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-green-600">7,600+</h3>
              <p className="text-gray-600">Employees</p>
            </div>
            <div className="p-6 bg-yellow-100 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-yellow-600">205,000+</h3>
              <p className="text-gray-600">Customers</p>
            </div>
          </div>
          <p className="mt-4 text-gray-500">Voted #1 in 318 categories</p>
        </div>
      </AnimationContainer>

      {/* Organizing Team Section */}
      <AnimationContainer>
        <div className="py-12 bg-gray-200 rounded-lg shadow-lg">
          <h2 className="mb-10 text-4xl font-semibold text-center text-gray-800">
            Meet Our Organizing Team
          </h2>
          <div className="container grid grid-cols-1 gap-8 px-6 mx-auto sm:grid-cols-2 md:grid-cols-4">
            {organizingTeam.map((member, index) => (
              <div
                key={index}
                className="relative transition duration-300 transform group hover:scale-105"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="object-cover w-full h-56 rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-white transition duration-300 bg-black rounded-lg opacity-0 bg-opacity-70 group-hover:opacity-100">
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-sm">{member.role}</p>
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-xl font-medium text-gray-800">
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
        <div className="py-12 bg-white rounded-lg shadow-lg">
          <h2 className="mb-10 text-4xl font-semibold text-center text-gray-800">
            Meet Our Old Scout Team
          </h2>
          <div className="container grid grid-cols-1 gap-8 px-6 mx-auto sm:grid-cols-2 md:grid-cols-4">
            {oldScoutAssociation.map((member, index) => (
              <div
                key={index}
                className="relative transition duration-300 transform group hover:scale-105"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="object-cover w-full h-56 rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-white transition duration-300 bg-black rounded-lg opacity-0 bg-opacity-70 group-hover:opacity-100">
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-sm">{member.role}</p>
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-xl font-medium text-gray-800">
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
