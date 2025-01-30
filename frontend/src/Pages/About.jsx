import React from "react";
<<<<<<< HEAD
import AnimationContainer from "@/Components/AnimationContainer";
import aboutus from "../Assests/Aboutus.jpg";
=======
>>>>>>> ca897cea8e8ce0edd0761379ecfad1f5c221189c

export default function About() {
  const organizingTeam = [
    {
      name: "Vidura Prabath",
      role: "Team Lead",
      description: "Leading the team to success with dedication and passion.",
<<<<<<< HEAD
      image: "https://via.placeholder.com/150",
=======
      image: "https://via.placeholder.com/150", 
>>>>>>> ca897cea8e8ce0edd0761379ecfad1f5c221189c
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
<<<<<<< HEAD
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
=======
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
>>>>>>> ca897cea8e8ce0edd0761379ecfad1f5c221189c
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
<<<<<<< HEAD
      <div className="relative h-[250px] md:h-[300px] lg:h-[600px]">
        <img
          src={aboutus}
          alt="Scout Group"
          className="object-cover w-full h-full rounded-lg shadow-lg"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-6xl font-extrabold tracking-wider text-white uppercase md:text-7xl drop-shadow-lg">
=======
      <div className="relative h-[400px]">
        <img
          src="https://via.placeholder.com/1920x1080" // Replace with actual background image
          alt="Scout Group"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl md:text-6xl text-white font-bold uppercase tracking-wider drop-shadow-lg">
>>>>>>> ca897cea8e8ce0edd0761379ecfad1f5c221189c
            About Us
          </h1>
        </div>
      </div>

      {/* Introduction Section */}
<<<<<<< HEAD
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
=======
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
>>>>>>> ca897cea8e8ce0edd0761379ecfad1f5c221189c
    </div>
  );
}
