import React, { useState, useEffect } from "react";
import axios from "axios";
import QRCode from "react-qr-code";
import { Toaster, toast } from "react-hot-toast";
import html2canvas from "html2canvas";
import ID from "../../Assests/name_tag.jpg";
import { useNavigate } from "react-router-dom";
import ProtectedRoute from "../../Components/ProtectedRoute";

function AprofileQr() {
  const [searchEmail, setSearchEmail] = useState("");
  const [userData, setUserData] = useState(null);
  const [toastDisplayed, setToastDisplayed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin"); // Redirect to login if no token
    }
  }, [navigate]);

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

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://maj-25-backend.onrender.com/api/registration/${searchEmail}`
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

  const handleDownload = async () => {
    const element = document.getElementById("badge");

    // Convert QR code (SVG) to Canvas
    const qrElement = document.getElementById("qr-code");
    if (qrElement) {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      // Adjust size based on QRCode size
      const size = 280;
      canvas.width = size;
      canvas.height = size;

      const img = new Image();
      img.src = `data:image/svg+xml;base64,${btoa(
        new XMLSerializer().serializeToString(qrElement)
      )}`;
      await new Promise((resolve) => (img.onload = resolve));

      // Draw QR code onto the new canvas
      context.drawImage(img, 0, 0, size, size);

      // Replace the SVG QR code with the canvas temporarily
      qrElement.replaceWith(canvas);
      canvas.id = "qr-code";
    }

    // Capture the badge with the new QR code
    const finalCanvas = await html2canvas(element, { scale: 2 });
    const dataURL = finalCanvas.toDataURL("image/jpeg");

    // Revert QR code back to SVG after capture
    if (qrElement) {
      document.getElementById("qr-code").replaceWith(qrElement);
    }

    // Trigger download
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "badge.jpg";
    link.click();
  };

  return (
    <ProtectedRoute allowedPage="AprofileQr">
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex items-center justify-center p-10">
        <Toaster />
        <div className="bg-white shadow-lg rounded-lg p-0 max-w-3xl w-full">
          <h1 className="text-4xl font-extrabold text-blue-600 mb-6 text-center">
            Search User by Email
          </h1>
          <div className="flex flex-col items-center">
            <input
              type="text"
              placeholder="Enter email"
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
              className="w-full md:w-2/3 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-all"
            >
              Search
            </button>
          </div>

          {userData && (
            <div className="mt-10">
              <div
                id="badge"
                className="relative w-[768px] h-[1082px] mx-auto bg-white shadow-lg rounded-lg"
                style={{
                  backgroundImage: `url(${ID})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* QR Code */}
                <div
                  className="absolute"
                  style={{
                    top: "45%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "1rem",
                    backgroundColor: "white",
                    padding: "1rem",
                    borderRadius: "0.5rem",
                  }}
                >
                  <h3 className="text-xl font-semibold text-gray-800">
                    MY QR Code
                  </h3>
                  {userData && (
                    <QRCode
                      id="qr-code" // Unique ID for processing
                      value={JSON.stringify(userData)}
                      size={280}
                      className="bg-white p-2"
                    />
                  )}
                </div>

                {/* User details */}
                <div
                  className="absolute text-balance text-white"
                  style={{
                    bottom: "25%",
                    left: "60%",
                    transform: "translateX(-50%)",
                    width: "80%",
                  }}
                >
                  <p className="text-xl font-semibold">
                    <strong>Name:</strong> {userData.fullName}
                  </p>
                  <p className="text-xl font-semibold">
                    <strong>Sub Camp:</strong> {userData.school}
                  </p>
                  <p className="text-xl font-semibold">
                    <strong>Email:</strong> {userData.email}
                  </p>
                  <p className="text-xl font-semibold">
                    <strong>Gender:</strong> {userData.gender}
                  </p>
                  <p className="text-xl font-semibold">
                    <strong>Registered As:</strong> {userData.type}
                  </p>
                </div>
              </div>

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
    </ProtectedRoute>
  );
}

export default AprofileQr;
