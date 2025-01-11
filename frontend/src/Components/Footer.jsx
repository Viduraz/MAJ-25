import React from "react";
import campbadge from "../Assests/campbadge.png";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      {/* Footer Content */}
      <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Logo and About */}
        <div className="flex flex-col items-center md:items-start">
          <img
            src={campbadge} // Replace with actual logo
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
            Email: <a href="mailto:ofcl.maliyadeva.asg@gmail.com" className="hover:text-white">ofcl.maliyadeva.asg@gmail.com</a>
          </p>
          <p className="text-gray-400 text-sm">
            Phone: <a href="tel:+1234567890" className="hover:text-white">+1 (234) 567-890</a>
          </p>

          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-4">
            {/* Facebook */}
            <a href="https://www.facebook.com/profile.php?id=61571350812703" className="hover:scale-110 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-gray-400 hover:text-white transition"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22 12a10 10 0 10-11.6 9.9v-7h-3v-3h3V9.8c0-3 1.8-4.7 4.5-4.7 1.3 0 2.6.2 2.6.2v3h-1.5c-1.5 0-2 .9-2 1.8v2.2h3.3l-.5 3h-2.8v7A10 10 0 0022 12z" />
              </svg>
            </a>
            
            {/* Instagram */}
            <a href="https://www.instagram.com/official.maj25/" className="hover:scale-110 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-gray-400 hover:text-white transition"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm8 3a2 2 0 110 4 2 2 0 010-4zm-4 3a5 5 0 11-5 5 5 5 0 015-5zM4 7c0-1.7 1.3-3 3-3h10c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7z" />
              </svg>
            </a>
            
            {/* YouTube */}
            <a href="https://youtube.com/@maliyadevaadarshascoutgrou9664?si=XopbtrUuoVHveEe2" className="hover:scale-110 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-gray-400 hover:text-white transition"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19.615 3.184c-1.2-.8-4.2-1.2-7.615-1.2s-6.415.4-7.615 1.2c-1.2.8-2.2 2.4-2.2 4.8v4.8c0 2.4 1 4 2.2 4.8 1.2.8 4.2 1.2 7.615 1.2s6.415-.4 7.615-1.2c1.2-.8 2.2-2.4 2.2-4.8v-4.8c0-2.4-1-4-2.2-4.8zm-9.615 10.8v-6l5.2 3-5.2 3z" />
              </svg>
            </a>
            {/* Website */}
            <a href="#" className="hover:scale-110 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-gray-400 hover:text-white transition"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.6 0-12 5.4-12 12s5.4 12 12 12 12-5.4 12-12-5.4-12-12-12zm0 22c-5.5 0-10-4.5-10-10s4.5-10 10-10 10 4.5 10 10-4.5 10-10 10zm-1-17h2v8h-2v-8zm0 10h2v2h-2v-2z" />
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
