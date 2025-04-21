import React, { useState, useEffect } from "react";
import axios from "axios";
import QRCode from "react-qr-code";
import { Toaster, toast } from "react-hot-toast";
import html2canvas from "html2canvas";
import ID from "../../Assests/TAG.jpg";
import { useNavigate } from "react-router-dom";
import ProtectedRoute from "../../Components/ProtectedRoute";
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { renderToString } from 'react-dom/server';
import jsPDF from 'jspdf';

function AprofileQr() {
  const [searchEmail, setSearchEmail] = useState("");
  const [userData, setUserData] = useState(null);
  const [toastDisplayed, setToastDisplayed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin");
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
        `35.232.49.147/api/registration/${searchEmail}`
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

  const handleAllSearch = async () => {
    try {
      const response = await axios.get(
        `35.232.49.147/api/registration/sameschool/all/${searchEmail}`
      );
      if (response.data) {
        showToast("Users Found", "success");
        return response.data;
      } else {
        showToast("Users Not Found");
        return [];
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      showToast("Users Not Found");
      return [];
    }
  };

  const createBadgeElement = (user) => {
    const badgeDiv = document.createElement('div');
    badgeDiv.style.position = 'relative';
    badgeDiv.style.width = '900px';
    badgeDiv.style.height = '1110px';
    badgeDiv.style.backgroundImage = `url(${ID})`;
    badgeDiv.style.backgroundSize = 'cover';
    badgeDiv.style.backgroundPosition = 'center';
    badgeDiv.style.backgroundColor = 'white';

    // Create QR code container
    const qrContainer = document.createElement('div');
    qrContainer.style.position = 'absolute';
    qrContainer.style.top = '50%';
    qrContainer.style.left = '50%';
    qrContainer.style.transform = 'translate(-50%, -50%)';
    qrContainer.style.backgroundColor = 'white';
    qrContainer.style.padding = '1rem';
    qrContainer.style.borderRadius = '0.5rem';

    // Create QR code using the React component
    const qrCodeString = renderToString(
        <QRCode
            value={JSON.stringify({ ID: user.id, email: user.email })}
            size={460}
            className="bg-white p-2"
        />
    );
    qrContainer.innerHTML = qrCodeString;
    badgeDiv.appendChild(qrContainer);

    // Create text container
    const textContainer = document.createElement('div');
    textContainer.style.position = 'absolute';
    textContainer.style.top = '75%';
    textContainer.style.left = '50%';
    textContainer.style.transform = 'translateX(-50%)';
    textContainer.style.width = '80%';
    textContainer.style.textAlign = 'center';
    textContainer.style.color = 'white';
    textContainer.style.fontFamily = "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";

    // Add user details
    textContainer.innerHTML = `
      <p style="font-size: 30px; font-weight: 600; margin: 5px 0;"><strong>${user.fullName}</strong></p>
      <p style="font-size: 20px; font-weight: 600; margin: 5px 0;"><strong>${user.school}</strong></p>
    `;
    badgeDiv.appendChild(textContainer);

    return badgeDiv;
  };

  const handleDownload = async () => {
    const element = document.getElementById("badge");
    const canvas = await html2canvas(element, {
      scale: 1,
      width: 900,
      height: 1110,
      useCORS: true,
      allowTaint: true,
    });
    
    const dataURL = canvas.toDataURL("image/jpeg", 1.0);
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "badge.jpg";
    link.click();
  };

  const handleAllDownload = async () => {
    const users = await handleAllSearch();
    if (!users.length) return;

    const zip = new JSZip();
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.top = '0';
    document.body.appendChild(container);

    try {
      toast.loading('Generating badges...', { duration: 5000 });
      
      for (const user of users) {
        const badgeElement = createBadgeElement(user);
        container.innerHTML = '';
        container.appendChild(badgeElement);
        
        await new Promise(resolve => setTimeout(resolve, 100)); // Give time for elements to render

        const canvas = await html2canvas(badgeElement, {
          scale: 1,
          width: 900,
          height: 1110,
          useCORS: true,
          allowTaint: true,
          logging: false,
        });

        const dataURL = canvas.toDataURL('image/jpeg', 1.0);
        zip.file(`${user.email}.jpg`, dataURL.split(',')[1], { base64: true });
      }

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      saveAs(zipBlob, 'badges.zip');
      toast.success('Badges downloaded successfully!');
    } catch (error) {
      console.error('Error generating badges:', error);
      toast.error('Error generating badges');
    } finally {
      document.body.removeChild(container);
    }
  };

  const handleA3Download = async () => {
    const users = await handleAllSearch();
    if (!users.length) return;

    try {
      toast.loading('Generating A3 pages...', { duration: 5000 });
      
      // Create PDF with A3 size (297mm x 420mm)
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a3'
      });

      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.top = '0';
      document.body.appendChild(container);

      // Calculate tags per page and total pages
      const tagsPerPage = 9;
      const totalPages = Math.ceil(users.length / tagsPerPage);

      // Tag dimensions (in mm)
      const tagWidth = 85; // ~1018px
      const tagHeight = 105; // ~1256px
      const margin = 10;
      const startX = 16;
      const startY = 15;

      for (let page = 0; page < totalPages; page++) {
        if (page > 0) {
          pdf.addPage();
        }

        // Process 9 tags per page
        for (let i = 0; i < tagsPerPage; i++) {
          const userIndex = page * tagsPerPage + i;
          if (userIndex >= users.length) break;

          const user = users[userIndex];
          const badgeElement = createBadgeElement(user);
          container.innerHTML = '';
          container.appendChild(badgeElement);

          await new Promise(resolve => setTimeout(resolve, 100));

          const canvas = await html2canvas(badgeElement, {
            scale: 1,
            width: 1018,
            height: 1256,
            useCORS: true,
            allowTaint: true,
            logging: false,
          });

          // Calculate position for current tag
          const row = Math.floor(i / 3);
          const col = i % 3;
          const x = startX + col * (tagWidth + margin);
          const y = startY + row * (tagHeight + margin);

          // Add tag to PDF
          const imgData = canvas.toDataURL('image/jpeg', 1.0);
          pdf.addImage(imgData, 'JPEG', x, y, tagWidth, tagHeight);
        }
      }

      // Save PDF
      pdf.save('tags_a3.pdf');
      toast.success('A3 pages generated successfully!');

    } catch (error) {
      console.error('Error generating A3 pages:', error);
      toast.error('Error generating A3 pages');
    } finally {
      document.body.removeChild(container);
    }
  };

  return (
    <ProtectedRoute allowedPage="AprofileQr">
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex items-center justify-center p-10">
        <Toaster/>
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl w-full">
          <h1 className="text-4xl font-extrabold text-blue-600 mb-6 text-center p-6">
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
                className="relative mx-auto bg-white shadow-lg rounded-lg"
                style={{
                  backgroundImage: `url(${ID})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "900px",
                  height: "1110px",
                }}
              >
                <div
                  className="absolute"
                  style={{
                    top: "50%",
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
                  <QRCode
                    id="qr-code"
                    value={JSON.stringify({
                      ID: userData.id,
                      email: userData.email
                    })}
                    size={460}
                    className="bg-white p-2"
                  />
                </div>

                <div
                  className="absolute text-balance text-white"
                  style={{
                    top: "75%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "80%",
                  }}
                >
                  <p className="text-3xl font-semibold text-center">
                    <strong>{userData.fullName}</strong>
                  </p>
                  <p className="text-l font-semibold text-center">
                    <strong>{userData.school}</strong>
                  </p>
                </div>
              </div>

              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={handleDownload}
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition-all"
                >
                  Download Tag
                </button>

                <button
                  onClick={handleAllDownload}
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition-all"
                >
                  Download All Tags
                </button>
                <button
                  onClick={handleA3Download}
                 className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition-all"
                 >
                  Download A3
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default AprofileQr;