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
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl font-bold tracking-wider text-white uppercase md:text-6xl drop-shadow-lg">
            About Us
          </h1>
        </div>
      </div>

      {/* Introduction Section */}
      <AnimationContainer>
        <div className="container px-6 py-12 mx-auto text-center">
          <h2 className="mb-4 text-3xl font-semibold text-gray-800">
            A Legacy of Excellence: Maliyadeva Adarsha Maha Vidyalaya
          </h2>
          <p className="text-lg leading-relaxed text-gray-600">
            Established in 1978 as Maliyadeva Adarsha Prathamika Vidyalaya, the
            school has a rich history of fostering leadership, teamwork, and
            academic excellence. Through the years, it has grown to become a
            cornerstone of education and scouting in the region.
          </p>
        </div>
      </AnimationContainer>

      {/* History Section */}
      <AnimationContainer>
        <div className="py-12 bg-gray-100">
          <div className="container px-6 mx-auto">
            <h2 className="mb-6 text-4xl font-semibold text-center text-gray-800">
              Our Journey
            </h2>
            <p className="mb-8 leading-relaxed text-gray-600">
              From its modest beginnings with 123 students, under the leadership
              of Mr. T.B. Siriwardhana and the support of key figures like MP
              Piyadasa Wijesinghe, the school rapidly grew into an institution
              of academic and extracurricular excellence. By 1988, it had
              evolved into Maliyadeva Adarsha Maha Vidyalaya, offering A/L
              classes across various streams.
            </p>
            <p className="mb-8 leading-relaxed text-gray-600">
              Scouting has been a vibrant part of the school since 1985, with
              Cub Scouts, Boy Scouts, Girl Scouts, and more divisions achieving
              excellence nationally and internationally. The school takes pride
              in its tradition of creating leaders who excel in various fields.
            </p>
          </div>
        </div>
      </AnimationContainer>

      {/* jambareeta Section */}
      <AnimationContainer>
        <div className="container px-6 py-12 mx-auto">
          <h2 className="mb-6 text-4xl font-semibold text-center text-gray-800">
            Maliyadeva Adarsha jambareeta
          </h2>
          <p className="mb-8 leading-relaxed text-gray-600">
            The Maliyadeva Adarsha jambareeta, first held in 2015, is a biennial
            gathering that fosters community, innovation, and lifelong learning.
            This event has grown significantly over the years, with successful
            editions in 2015, 2020, and now, in 2025.
          </p>
          <p className="mb-8 leading-relaxed text-gray-600">
            MAJ 2025 promises to be the most impactful yet, with over 2,500
            participants expected to join this 5-day event. With a focus on
            leadership, service, and global citizenship, MAJ 2025 aims to
            inspire future generations to reach their fullest potential.
          </p>
        </div>
      </AnimationContainer>

      {/* Organizing Team Section */}
      <AnimationContainer>
        <div className="py-12 bg-gray-200">
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

      {/* Old Scout Team */}
      <AnimationContainer>
        <div className="py-12 bg-white">
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
