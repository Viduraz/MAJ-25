import React from "react";

export default function About() {
  const organizingTeam = [
    {
      name: "Vidura Prabath",
      role: "Team Lead",
      description: "Leading the team to success with dedication and passion.",
      image: "https://via.placeholder.com/150", 
    },
    {
      name: "Jinadari Silva",
      role: "Coordinator",
      description: "Ensures smooth communication and planning within the team.",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Chamathka Fernando",
      role: "Logistics Manager",
      description: "Manages all event resources and logistics efficiently.",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Navodya Perera",
      role: "Treasurer",
      description: "Handles financial management and budget planning.",
      image: "https://via.placeholder.com/150",
    },
  ];

  const oldScoutAssociation = [
    {
      name: "Kasun Wijesinghe",
      role: "President",
      description:
        "Oversees the association with vision and leadership to maintain traditions.",
      image: "https://via.placeholder.com/150", 
    },
    {
      name: "Samantha Herath",
      role: "Assistant President",
      description: "Supports the president and helps manage activities smoothly.",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Thilini Jayasinghe",
      role: "Secretary",
      description: "Manages records, correspondence, and schedules effectively.",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Amal Silva",
      role: "Treasurer",
      description: "Handles all financial responsibilities and budgeting.",
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[400px]">
        <img
          src="https://via.placeholder.com/1920x1080" // Replace with actual background image
          alt="Scout Group"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl md:text-6xl text-white font-bold uppercase tracking-wider drop-shadow-lg">
            About Us
          </h1>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="container mx-auto px-6 py-12 text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Welcome to the Jamboreeta 
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          Our Camp fosters leadership, teamwork, and outdoor skills for
          students. With a proud history of creating future leaders, we focus on
          community engagement, personal development, and adventure. Join us to
          explore, learn, and grow as part of an enthusiastic and driven team.
        </p>
      </div>

      {/* Organizing Team */}
      <div className="bg-gray-100 py-12">
        <h2 className="text-4xl font-semibold text-gray-800 text-center mb-10">
          Our Organizing Team
        </h2>
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6">
          {organizingTeam.map((member, index) => (
            <div
              key={index}
              className="relative group transform transition hover:scale-105 duration-300"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-56 object-cover rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition duration-300 rounded-lg flex flex-col justify-center items-center text-white p-4">
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-sm">{member.role}</p>
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-xl font-medium text-gray-800">
                  {member.name}
                </h3>
                <p className="text-gray-600 text-sm">{member.role}</p>
                <p className="text-gray-500 mt-2 text-sm">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MASG Old Scout Association */}
      <div className="container mx-auto px-6 py-12 text-center">
        <h2 className="text-4xl font-semibold text-gray-800 mb-4">
          MASG Old Scout Association
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed mb-8">
          The MASG Old Scout Association brings together former scouts to
          preserve traditions, provide guidance, and contribute to the community
          with their experience and wisdom.
        </p>

        {/* Old Scout Team */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {oldScoutAssociation.map((member, index) => (
            <div
              key={index}
              className="relative group transform transition hover:scale-105 duration-300"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-56 object-cover rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition duration-300 rounded-lg flex flex-col justify-center items-center text-white p-4">
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-sm">{member.role}</p>
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-xl font-medium text-gray-800">
                  {member.name}
                </h3>
                <p className="text-gray-600 text-sm">{member.role}</p>
                <p className="text-gray-500 mt-2 text-sm">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
