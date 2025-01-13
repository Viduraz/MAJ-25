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
          A Legacy of Excellence: Maliyadeva Adarsha Maha Vidyalaya
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          Established in 1978 as Maliyadeva Adarsha Prathamika Vidyalaya, the school has a rich history of fostering leadership, teamwork, and academic excellence. 
          Through the years, it has grown to become a cornerstone of education and scouting in the region.
        </p>
      </div>

      {/* History Section */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-semibold text-gray-800 mb-6 text-center">
            Our Journey
          </h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            From its modest beginnings with 123 students, under the leadership of Mr. T.B. Siriwardhana and the support of key figures like MP Piyadasa Wijesinghe, the school rapidly grew into an institution of academic and extracurricular excellence. By 1988, it had evolved into Maliyadeva Adarsha Maha Vidyalaya, offering A/L classes across various streams.
          </p>
          <p className="text-gray-600 leading-relaxed mb-8">
            Scouting has been a vibrant part of the school since 1985, with Cub Scouts, Boy Scouts, Girl Scouts, and more divisions achieving excellence nationally and internationally. The school takes pride in its tradition of creating leaders who excel in various fields.
          </p>
        </div>
      </div>

      {/* jambareeta Section */}
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-4xl font-semibold text-gray-800 mb-6 text-center">
          Maliyadeva Adarsha jambareeta
        </h2>
        <p className="text-gray-600 leading-relaxed mb-8">
          The Maliyadeva Adarsha jambareeta, first held in 2015, is a biennial gathering that fosters community, innovation, and lifelong learning. This event has grown significantly over the years, with successful editions in 2015, 2020, and now, in 2025.
        </p>
        <p className="text-gray-600 leading-relaxed mb-8">
          MAJ 2025 promises to be the most impactful yet, with over 2,500 participants expected to join this 5-day event. With a focus on leadership, service, and global citizenship, MAJ 2025 aims to inspire future generations to reach their fullest potential.
        </p>
      </div>

      {/* Organizing Team Section */}
      <div className="bg-gray-200 py-12">
        <h2 className="text-4xl font-semibold text-gray-800 text-center mb-10">
          Meet Our Organizing Team
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

      {/* Old Scout Team */}
      <div className="bg-gray-200 py-12">
        <h2 className="text-4xl font-semibold text-gray-800 text-center mb-10">
          Meet Our Old Scout Team
        </h2>
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6">
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
