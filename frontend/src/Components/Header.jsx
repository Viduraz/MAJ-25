import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import campbadge from '../Assests/campbadge.png';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  
  const [bgColor, setBgColor] = useState('bg-teal-700');

  useEffect(() => {
    const changeColor = () => {
      setBgColor('bg-black');
    };

    changeColor();

    return () => {
      setBgColor('bg-teal-700');
    };
  }, []);

  return (
    <header className={`header ${bgColor} text-white`}>
      <div className="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto px-6 py-4 transition-all duration-300 ease-in-out">
        {/* Logo */}
        <Link to="/" className="flex items-center mb-4 md:mb-0">
          <img src={campbadge} alt="Logo" className="logo" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
          <h1 className="font-bold text-lg tracking-wide">MAJ'25</h1>
        </Link>

        {/* Navigation Links */}
        <ul className="flex flex-col md:flex-row gap-4 md:gap-8 text-base font-medium">
          <Link to="/">
            <li
              className={`relative group transition-all duration-300 ease-in-out ${
                location.pathname === '/' ? 'border-b-4 border-yellow-500 scale-110 font-bold' : ''
              }`}
            >
              <span className="block px-2 py-1 hover:bg-gray-600 rounded transition-colors duration-300 ease-in-out">
                Home
              </span>
            </li>
          </Link>
          <Link to="/gallery">
            <li
              className={`relative group transition-all duration-300 ease-in-out ${
                location.pathname === '/gallery' ? 'border-b-4 border-yellow-500 scale-110 font-bold' : ''
              }`}
            >
              <span className="block px-2 py-1 hover:bg-gray-600 rounded transition-colors duration-300 ease-in-out">
                Gallery
              </span>
            </li>
          </Link>
          <Link to="/about">
            <li
              className={`relative group transition-all duration-300 ease-in-out ${
                location.pathname === '/about' ? 'border-b-4 border-yellow-500 scale-110 font-bold' : ''
              }`}
            >
              <span className="block px-2 py-1 hover:bg-gray-600 rounded transition-colors duration-300 ease-in-out">
                About
              </span>
            </li>
          </Link>
          <Link to="/registration">
            {currentUser ? (
              <li
                className={`relative group transition-all duration-300 ease-in-out ${
                  location.pathname === '/registration' ? 'border-b-4 border-yellow-500 scale-110 font-bold' : ''
                }`}
              >
                <span className="block px-2 py-1 hover:bg-gray-600 rounded transition-colors duration-300 ease-in-out">
                  Registration
                </span>
              </li>
            ) : null}
          </Link>
        </ul>

        {/* User Profile / Sign In */}
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          {currentUser ? (
            <>
              <img
                src={currentUser.profilePicture}
                alt="profile"
                className="h-8 w-8 rounded-full object-cover border-2 border-white"
              />
              <Link to="/profile">
                <span className="hover:text-gray-300">Profile</span>
              </Link>
            </>
          ) : (
            <Link to="/signin">
              <button className="bg-white text-teal-700 px-4 py-1 rounded-md hover:bg-gray-100">
                Sign In
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}