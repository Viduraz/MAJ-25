import React, { useState } from "react";
import axios from "axios";
import QRCode from "react-qr-code";
import { Toaster, toast } from "react-hot-toast";
import html2canvas from "html2canvas";
import ID from "../../Assests/ID.jpg"; // Ensure the path to ID.jpg is correct

function AprofileQr() {
  const [searchEmail, setSearchEmail] = useState("");
  const [userData, setUserData] = useState(null);
  const [toastDisplayed, setToastDisplayed] = useState(false);

  // Show toast notification
  const showToast = (message, type = "default") => {
    if (!toastDisplayed) {
      if (type === "success") {
        toast.success(message);
      } else {
        toast(message);
      }
      setToastDisplayed(true);
    }
  };

  // Handle user search
  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/registration/${searchEmail}` // Replace with the correct API endpoint
      );
      if (response.data) {
        setUserData(response.data);
        showToast("User Found", "success");
      } else {
        showToast("User Not Found");
        setUserData(null);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      showToast("User Not Found");
    }
  };

  // Handle badge download
  const handleDownload = async () => {
    const element = document.getElementById("badge");
    const canvas = await html2canvas(element);
    const dataURL = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "badge.jpg";
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex items-center justify-center p-10">
      <Toaster />
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl w-full">
        <h1 className="text-4xl font-extrabold text-blue-600 mb-6 text-center">
          Search User by Email
        </h1>
        <div className="flex flex-col items-center">
          {/* Input for searching user by email */}
          <input
            type="text"
            placeholder="Enter email"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            className="w-full md:w-2/3 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
          {/* Search button */}
          <button
            onClick={handleSearch}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-all"
          >
            Search
          </button>
        </div>

        {userData && (
          <div className="mt-10">
            {/* Badge section */}
            <div
              id="badge"
              className="relative w-[768px] h-[1082px] mx-auto"
              style={{
                backgroundImage: `url(${ID})`, // Dynamically set the imported background image
                backgroundSize: "cover", // Cover the badge area
                backgroundPosition: "center", // Center the image
              }}
            >
              {/* QR code */}
              <div className="absolute top-[43.3%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
                <QRCode
                  value={JSON.stringify(userData)}
                  size={303}
                  className="shadow-lg border rounded-md p-2 bg-white"
                />
              </div>
              {/* User details */}
              <div className="absolute left-8 bottom-40 text-white">
                <p>
                  <strong>Name:</strong> {userData.fullName}
                </p>
                <p>
                  <strong>Troop:</strong> {userData.school}
                </p>
                <p>
                  <strong>Email:</strong> {userData.email}
                </p>
                <p>
                  <strong>Gender:</strong> {userData.gender}
                </p>
                <p>
                  <strong>Registered As:</strong> {userData.type}
                </p>
              </div>
            </div>
            {/* Download button */}
            <button
              onClick={handleDownload}
              className="mt-6 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition-all"
            >
              Download Badge
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AprofileQr;
