import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      {/* Footer Content */}
      <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Logo and About */}
        <div className="flex flex-col items-center md:items-start">
          <img
            src="https://via.placeholder.com/100" // Replace with actual logo
            alt="Logo"
            className="w-24 h-24 mb-4"
          />
          <p className="text-sm text-gray-400 text-center md:text-left">
            Maliyadeva Adarsha Jambareeta <br /> Bringing an unbelievable camping experience for everyone.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-start">
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="#" className="hover:text-white transition">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Events
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact & Social Links */}
        <div className="flex flex-col items-center md:items-start">
          <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
          <p className="text-gray-400 text-sm">
            Email: <a href="mailto:info@example.com" className="hover:text-white">info@example.com</a>
          </p>
          <p className="text-gray-400 text-sm">
            Phone: <a href="tel:+1234567890" className="hover:text-white">+1 (234) 567-890</a>
          </p>

          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-4">
            {/* Facebook */}
            <a href="#" className="hover:scale-110 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-gray-400 hover:text-white transition"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22 12a10 10 0 10-11.6 9.9v-7h-3v-3h3V9.8c0-3 1.8-4.7 4.5-4.7 1.3 0 2.6.2 2.6.2v3h-1.5c-1.5 0-2 .9-2 1.8v2.2h3.3l-.5 3h-2.8v7A10 10 0 0022 12z" />
              </svg>
            </a>
            {/* Twitter */}
            <a href="#" className="hover:scale-110 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-gray-400 hover:text-white transition"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 7.5v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
              </svg>
            </a>
            {/* Instagram */}
            <a href="#" className="hover:scale-110 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-gray-400 hover:text-white transition"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm8 3a2 2 0 110 4 2 2 0 010-4zm-4 3a5 5 0 11-5 5 5 5 0 015-5zM4 7c0-1.7 1.3-3 3-3h10c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7z" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a href="#" className="hover:scale-110 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-gray-400 hover:text-white transition"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.5 3h-17A2.5 2.5 0 001 5.5v13A2.5 2.5 0 003.5 21h17a2.5 2.5 0 002.5-2.5v-13A2.5 2.5 0 0020.5 3zM8 18H5V9h3v9zm-1.5-10.5A1.5 1.5 0 118 6a1.5 1.5 0 01-1.5 1.5zM19 18h-3v-4.5c0-1.1-.9-2-2-2s-2 .9-2 2V18h-3V9h3v1.2a3.5 3.5 0 016.5 2.3V18z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Maliyadeva Adarsha Jumboreeta. All Rights Reserved.
      </div>
    </footer>
  );
}
