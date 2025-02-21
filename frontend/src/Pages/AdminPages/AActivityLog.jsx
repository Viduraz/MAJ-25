import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ProtectedRoute from '../../Components/ProtectedRoute';
import jsPDF from 'jspdf';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import activity from '../../Assests/activity.png'; // Adjust the path to your image

function AActivityLog(){
  const [searchEmail, setSearchEmail] = useState("");
  const [userData, setUserData] = useState([]);
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
        `https://maj-25-backend.onrender.com/api/registration/sameschool/all/${searchEmail}`
      );
      //console.log(response.data);
      if (response.data) {
        setUserData(response.data);
        showToast("Users Found", "success");
      } else {
        showToast("Users Not Found");
        setUserData([]);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      showToast("Users Not Found");
    }
  };

  const categorize = (activities, allActivities) => {
    const categories = {};
    //console.log(allActivities);
    for (let i = 0; i < activities.length; i++) {
      for (let j = 0; j < allActivities.length; j++) {
        if (activities[i]['id'] === allActivities[j]['id']) {
          if (!categories[allActivities[j]['category']]) {
            categories[allActivities[j]['category']] = [];
          }
          categories[allActivities[j]['category']].push(activities[i]['id']);
        }
      }
    }
    return categories;
  };

  const createPDF = async (user, activities) => {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [2480, 3508]
    });

    const addHeader = () => {
      pdf.setFontSize(100);
      pdf.setTextColor("darkBlue");
      pdf.text("Activity Log", 1240, 70, { align: "center" });

      pdf.setFontSize(72);
      pdf.setTextColor("black");
      pdf.text(`${user.fullName}`, 50, 130);
      pdf.setFontSize(36);
      pdf.text(`${user.school}`, 50, 150);
    };

    pdf.setFont("helvetica", "bold");
    addHeader();

    // Add image to the PDF
    const Activity = activity;
    let rowNum = 0;
    const maxRowsPerPage = 12; // Adjust this value based on your layout

    //console.log("Activities List");
    //console.log(activities);
    //list of lists
    const categorizedActivities = categorize(user.activities, activities);
    //console.log(user['fullName']);
    //console.log(categorizedActivities);

    const categoryName = {'Adventure':'Adventure', 'Bussiness_&_Entrepreneurship':'Bussiness & Entrepreneurship', 'Health_And_Environment':'Health & Environment', 'Scout_Craft':'Scout Craft', 'Society_and_Culture':'Society & Culture', 'Technology':'Technology', 'Water_activities':'Water Activities'};

    const categories = Object.keys(categorizedActivities);
    
    for (let j = 0; j < categories.length; j++) {
      // Check if adding the category title would exceed the page limit
      if (rowNum >= maxRowsPerPage) {
        pdf.addPage();
        rowNum = 0;
        addHeader();
      }

      // Print category name
      pdf.setFontSize(72);
      pdf.setTextColor("black");
      
      pdf.text(`${categoryName[categories[j]]}`, 50, 250 + (rowNum * 220));

      for (let i = 0; i < categorizedActivities[categories[j]].length; i++) {
        if (rowNum >= maxRowsPerPage) {
          pdf.addPage();
          rowNum = 0;
          addHeader();
          // Print category name again on the new page
          pdf.setFontSize(72);
          pdf.setTextColor("black");
          pdf.text(`${categoryName[categories[j]]}`, 50, 250 + (rowNum * 220));
        }
        if (i % 2 === 0) {
          pdf.addImage(Activity, 'PNG', 50, 260 + (rowNum * 220), 1165, 200);
          if (i == categorizedActivities[categories[j]].length - 1)
            rowNum++;
        } else {
          pdf.addImage(Activity, 'PNG', 1265, 260 + (rowNum * 220), 1165, 200);
          rowNum++;
        }
      }

      rowNum++;
    }

    return pdf.output('blob');
  };

  const handleDownload = async () => {
    const zip = new JSZip();

    const activities = await axios.get('https://maj-25-backend.onrender.com/api/activity');

    userData.forEach((user, index) => {
      const pdfBlob = createPDF(user, activities.data);
      zip.file(`log_${user.email}.pdf`, pdfBlob);
    });

    const zipBlob = await zip.generateAsync({ type: "blob" });
    saveAs(zipBlob, "logs.zip");
  };

  return (
    <ProtectedRoute allowedPage="AprofileQr">
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex items-center justify-center p-10">
        <Toaster/>
        <div className="bg-white shadow-lg rounded-lg p-0 max-w-3xl w-full p-6">
          <h1 className="text-4xl font-extrabold text-blue-600 mb-6 text-center">
            Search by Email of Leader
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

          {userData.length > 0 && (
              <button
                onClick={handleDownload}
                className="mt-6 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition-all"
              >
                Download Log PDFs
              </button>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default AActivityLog;
