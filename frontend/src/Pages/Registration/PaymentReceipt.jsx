import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import firebaseApp from '../../../Firebase';
import * as XLSX from 'xlsx';

export default function PaymentReceipt({ school, leaders, scouts, amount, paymentDate, receiptImage, setAmount, setPaymentDate, setReceiptImage, onPrevious }) {

  const registrationURL = 'http://localhost:3000/api/registration';

  const [uploading, setUploading] = useState(false);

  // console.log("School: ",school);
  // console.log("Leaders: ",leaders);
  // console.log("Scouts: ",scouts);

  // HANDLE SENDING REQUEST TO SAVE REGISTRATIONS

  const sendRequest = async () => {
    // Validation: Check for empty fields
    if (!amount || !paymentDate || !receiptImage) {
      toast.error("Please fill in all required fields.");
      return; // Exit the function if validation fails
    }

    try {
      // save leaders one by one
      for(const leader of leaders) {
        await axios.post(registrationURL, {
          fullName: leader.fullName,
          gender: leader.gender,
          phoneNumber: leader.phoneNumber,
          email: leader.email,
          school: school,
          idNumber: leader.idNumber,
          paymentDate: paymentDate,
          amount: amount,
          receiptImage: receiptImage,
          type: 'Leader'
        });
      }

      // save scouts one by one
      for(const scout of scouts) {
        await axios.post(registrationURL, {
          fullName: scout.fullName,
          gender: scout.gender,
          phoneNumber: scout.phoneNumber,
          email: scout.email,
          school: school,
          idNumber: 0,
          paymentDate: paymentDate,
          amount: amount,
          receiptImage: receiptImage,
          type: 'Scout',
        });
      }

      toast.success("All registrations saved successfully!");
      generateExcel();

      // Navigate to home page after a short delay to allow the download to start
      setTimeout(() => {
        window.location.href = '/'; // Change this to your home page route
      }, 2000); // Adjust the delay as needed

    } catch (error) {
      console.error("Error saving registrations:", error);
      toast("An error occurred while saving the registrations.");
    }
  }

  // Function to generate Excel
  const generateExcel = () => {
    const data = [];

    // Add headers
    data.push(["School", "Amount", "Payment Date", "Leaders", "Leader Email", "Leader Phone Number", "Scouts", "Scout Email", "Scout Phone Number"]);

    // Loop through leaders and scouts to fill the data
    const maxRows = Math.max(leaders.length, scouts.length);
    for (let i = 0; i < maxRows; i++) {
      const leader = leaders[i] || {};
      const scout = scouts[i] || {};
      
      data.push([
        school,
        amount,
        paymentDate,
        leader.fullName || '',
        leader.email || '',
        leader.phoneNumber || '',
        scout.fullName || '',
        scout.email || '',
        scout.phoneNumber || ''
      ]);
    }

    // Create a new workbook and add the data
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Registration Details");

    // Save the Excel file
    XLSX.writeFile(wb, "registration_details.xlsx");
  }

  // HANDLE RECEIPT IMAGE UPLOAD

  const updloadReceipt = async (image) => {
    if(image) {
      try {
        setUploading(true);
        const storage = getStorage(firebaseApp);
        const storageRef = ref(storage, "images/" + image.name);
        await uploadBytes(storageRef, image);
        const downloadURL = await getDownloadURL(storageRef);
        setReceiptImage(downloadURL);
      } catch (error) {
        console.error("Error uploading recipt:", error);
        toast.error("An error occurred while uploading the recipt.");
      } finally {
        setUploading(false);
      }
    }
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-5">Add Your Payment Receipt</h2>
        
        <div className="mb-5">
          <label htmlFor="amount" className="block text-lg font-medium text-gray-700">Amount</label>
          <input
            type="text"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter Amount"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-5">
          <label htmlFor="paymentDate" className="block text-lg font-medium text-gray-700">Payment Date</label>
          <input
            type="date"
            id="paymentDate"
            value={paymentDate}
            onChange={(e) => setPaymentDate(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-5">
          <label htmlFor="receiptImage" className="block text-lg font-medium text-gray-700">Upload Receipt Photo</label>
          <input
            type="file"
            id="receiptImage"
            accept="image/*"
            onChange={(e) => updloadReceipt(e.target.files[0])}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex justify-between">
          <button
            onClick={onPrevious}
            className="mt-5 bg-gray-500 text-white px-4 py-2 rounded-md"
          >
            Previous
          </button>
          <button
            onClick={sendRequest}
            disabled={uploading}
            className="mt-5 bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            {uploading ? "Uploading" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}
