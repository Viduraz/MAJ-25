import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ProtectedRoute from '../../Components/ProtectedRoute';
import jsPDF from 'jspdf';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

import Activity1 from '../../Assests/Activity-01.jpg'; // Adjust the path to your image
import Activity2 from '../../Assests/Activity-02.jpg';
import Activity3 from '../../Assests/Activity-03.jpg';
import Activity4 from '../../Assests/Activity-04.jpg';
import Activity5 from '../../Assests/Activity-05.jpg';
import Activity6 from '../../Assests/Activity-06.jpg';
import Activity7 from '../../Assests/Activity-07.jpg';
import Activity8 from '../../Assests/Activity-08.jpg';
import Activity9 from '../../Assests/Activity-09.jpg';
import Activity10 from '../../Assests/Activity-10.jpg';
import Activity11 from '../../Assests/Activity-11.jpg';
import Activity12 from '../../Assests/Activity-12.jpg';
import Activity13 from '../../Assests/Activity-13.jpg';
import Activity14 from '../../Assests/Activity-14.jpg';
import Activity15 from '../../Assests/Activity-15.jpg';
import Activity16 from '../../Assests/Activity-16.jpg';
import Activity17 from '../../Assests/Activity-17.jpg';
import Activity18 from '../../Assests/Activity-18.jpg';
import Activity19 from '../../Assests/Activity-19.jpg';
import Activity20 from '../../Assests/Activity-20.jpg';
import Activity21 from '../../Assests/Activity-21.jpg';
import Activity22 from '../../Assests/Activity-22.jpg';
import Activity23 from '../../Assests/Activity-23.jpg';
import Activity24 from '../../Assests/Activity-24.jpg';
import Activity25 from '../../Assests/Activity-25.jpg';
import Activity26 from '../../Assests/Activity-26.jpg';
import Activity27 from '../../Assests/Activity-27.jpg';
import Activity28 from '../../Assests/Activity-28.jpg';
import Activity29 from '../../Assests/Activity-29.jpg';
import Activity30 from '../../Assests/Activity-30.jpg';
import Activity31 from '../../Assests/Activity-31.jpg';
import Activity32 from '../../Assests/Activity-32.jpg';
import Activity33 from '../../Assests/Activity-33.jpg';
import Activity34 from '../../Assests/Activity-34.jpg';
import Activity35 from '../../Assests/Activity-35.jpg';
import Activity36 from '../../Assests/Activity-36.jpg';
import Activity37 from '../../Assests/Activity-37.jpg';
import Activity38 from '../../Assests/Activity-38.jpg';
import Activity39 from '../../Assests/Activity-39.jpg';
import Activity40 from '../../Assests/Activity-40.jpg';
import Activity41 from '../../Assests/Activity-41.jpg';

import Title1 from '../../Assests/title_1.jpg';
import Title2 from '../../Assests/title_2.jpg';
import Title3 from '../../Assests/title_3.jpg';
import Title4 from '../../Assests/title_4.jpg';
import Title5 from '../../Assests/title_5.jpg';
import Title6 from '../../Assests/title_6.jpg';
import Title7 from '../../Assests/title_7.jpg';

import MainTitle from '../../Assests/activityLogTitle.png';

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
        `http://35.232.49.147:3000/api/registration/sameschool/all/${searchEmail}`
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
    // Remove duplicate activities based on id
    const uniqueActivities = user.activities.filter((activity, index, self) =>
      index === self.findIndex((a) => a.id === activity.id)
    );
    
    // Use the deduplicated activities list
    console.log(user.fullName);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [2480, 3508]
    });

    const addHeader = () => {
      pdf.setFontSize(100);
      pdf.setTextColor("darkBlue");
      //pdf.text("Activity Log", 1240, 70, { align: "center" });MainTitle
      pdf.addImage(MainTitle, 'PNG', 50, 10, 2380, 150);

      pdf.setFontSize(72);
      pdf.setTextColor("black");
      pdf.text(`${user.fullName}`, 50, 220);
      pdf.setFontSize(36);
      pdf.text(`${user.school}`, 50, 250);
    };

    pdf.setFont("helvetica", "bold");
    addHeader();

    // Add image to the PDF
    let rowNum = 0;
    const maxRowsPerPage = 12; // Adjust this value based on your layout

    //console.log("Activities List");
    //console.log(activities);
    //list of lists
    const categorizedActivities = categorize(uniqueActivities, activities);
    //console.log(user['fullName']);
    //console.log(categorizedActivities);

    //const categoryName = {'Adventure':'Adventure', 'Bussiness_&_Entrepreneurship':'Bussiness & Entrepreneurship', 'Health_And_Environment':'Health & Environment', 'Scout_Craft':'Scout Craft', 'Society_and_Culture':'Society & Culture', 'Technology':'Technology', 'Water_activities':'Water Activities'};
    const categoryNameImage = {'Adventure':Title5, 'Bussiness_&_Entrepreneurship':Title6, 'Health_And_Environment':Title4, 'Scout_Craft':Title3, 'Society_and_Culture':Title1, 'Technology':Title2, 'Water_activities':Title7};

    const imageName = {
      'Activity-01': Activity1,
      'Activity-02': Activity2,
      'Activity-03': Activity3,
      'Activity-04': Activity4,
      'Activity-05': Activity5,
      'Activity-06': Activity6,
      'Activity-07': Activity7,
      'Activity-08': Activity8,
      'Activity-09': Activity9,
      'Activity-10': Activity10,
      'Activity-11': Activity11,
      'Activity-12': Activity12,
      'Activity-13': Activity13,
      'Activity-14': Activity14,
      'Activity-15': Activity15,
      'Activity-16': Activity16,
      'Activity-17': Activity17,
      'Activity-18': Activity18,
      'Activity-19': Activity19,
      'Activity-20': Activity20,
      'Activity-21': Activity21,
      'Activity-22': Activity22,
      'Activity-23': Activity23,
      'Activity-24': Activity24,
      'Activity-25': Activity25,
      'Activity-26': Activity26,
      'Activity-27': Activity27,
      'Activity-28': Activity28,
      'Activity-29': Activity29,
      'Activity-30': Activity30,
      'Activity-31': Activity31,
      'Activity-32': Activity32,
      'Activity-33': Activity33,
      'Activity-34': Activity34,
      'Activity-35': Activity35,
      'Activity-36': Activity36,
      'Activity-37': Activity37,
      'Activity-38': Activity38,
      'Activity-39': Activity39,
      'Activity-40': Activity40,
      'Activity-41': Activity41,
    };
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
      
      //pdf.text(`${categoryName[categories[j]]}`, 50, 250 + (rowNum * 270));
      
      try {
        pdf.addImage(categoryNameImage[categories[j]], 'PNG', 50, 270 + (rowNum * 270), 2380, 150);
        rowNum++;
      } catch (error) {
        console.error("Error adding category image:", error);
      }
      

      for (let i = 0; i < categorizedActivities[categories[j]].length; i++) {
        if (rowNum >= maxRowsPerPage) {
          pdf.addPage();
          rowNum = 0;
          addHeader();
          // Print category name again on the new page
          pdf.setFontSize(72);
          pdf.setTextColor("black");
          //pdf.text(`${categoryName[categories[j]]}`, 50, 250 + (rowNum * 270));
          try {
            pdf.addImage(categoryNameImage[categories[j]], 'PNG', 50, 270 + (rowNum * 270), 2380, 150);
            rowNum++;
          } catch (error) {
            console.error("Error adding category image:", error);
          }
        }
        if (i % 2 === 0) {
          pdf.addImage(imageName[categorizedActivities[categories[j]][i]], 'PNG', 50, 270 + (rowNum * 270), 1165, 250);
          if (i == categorizedActivities[categories[j]].length - 1)
            rowNum++;
        } else {
          pdf.addImage(imageName[categorizedActivities[categories[j]][i]], 'PNG', 1265, 270 + (rowNum * 270), 1165, 250);
          rowNum++;
        }
        //console.log(categorizedActivities[categories[j]][i]);
      }

      rowNum++;
    }

    return pdf.output('blob');
  };

  const handleDownload = async () => {
    const zip = new JSZip();

    const activities = await axios.get('http://35.232.49.147:3000/api/activity');

    userData.forEach((user, index) => {
      if(user.type == "Scout"){
        const pdfBlob = createPDF(user, activities.data);
        zip.file(`log_${user.email}.pdf`, pdfBlob);
      }
    });

    const zipBlob = await zip.generateAsync({ type: "blob" });
    saveAs(zipBlob, "logs.zip");
  };

  return (
    <ProtectedRoute allowedPage="AprofileQr">
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex items-center justify-center p-10">
        <Toaster/>
        <div className="bg-white shadow-lg rounded-lg max-w-3xl w-full p-6">
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
