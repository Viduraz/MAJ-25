import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import firebaseApp from "../../../Firebase";
import * as XLSX from "xlsx";
import { Input } from "@/Components/ui/input";
import { ScoutDatePicker } from "./Components/ScoutDatePicker";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";

export default function PaymentReceipt({
  school,
  leaders,
  scouts,
  amount,
  paymentDate,
  receiptImage,
  setAmount,
  setPaymentDate,
  setReceiptImage,
  onPrevious,
}) {
  const registrationURL = "https://maj-25-backend.onrender.com/api/registration";

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
      // Fetch existing registrations
      const existingRegistrations = await axios.get(registrationURL);
      const existingEmails = existingRegistrations.data.map(reg => reg.email);

      // Save leaders one by one
      for (const leader of leaders) {
        if (!existingEmails.includes(leader.email)) {
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
            type: "Leader",
          });
        } else {
          toast.error(`Leader with email ${leader.email} already exists.`);
        }
      }

      // Save scouts one by one
      for (const scout of scouts) {
        if (!existingEmails.includes(scout.email)) {
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
            type: "Scout",
          });
        } else {
          toast.error(`Scout with email ${scout.email} already exists.`);
        }
      }

      toast.success("All registrations saved successfully!");
      generateExcel();

      // Navigate to home page after a short delay to allow the download to start
      setTimeout(() => {
        window.location.href = "/"; // Change this to your home page route
      }, 2000); // Adjust the delay as needed
    } catch (error) {
      console.error("Error saving registrations:", error);
      toast("An error occurred while saving the registrations.");
    }
  };

  // Function to generate Excel
  const generateExcel = () => {
    const data = [];

    // Add headers
    data.push([
      "School",
      "Amount",
      "Payment Date",
      "Leaders",
      "Leader Email",
      "Leader Phone Number",
      "Scouts",
      "Scout Email",
      "Scout Phone Number",
    ]);

    // Loop through leaders and scouts to fill the data
    const maxRows = Math.max(leaders.length, scouts.length);
    for (let i = 0; i < maxRows; i++) {
      const leader = leaders[i] || {};
      const scout = scouts[i] || {};

      data.push([
        school,
        amount,
        paymentDate,
        leader.fullName || "",
        leader.email || "",
        leader.phoneNumber || "",
        scout.fullName || "",
        scout.email || "",
        scout.phoneNumber || "",
      ]);
    }

    // Create a new workbook and add the data
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Registration Details");

    // Save the Excel file
    XLSX.writeFile(wb, "registration_details.xlsx");
  };

  // HANDLE RECEIPT IMAGE UPLOAD

  const updloadReceipt = async (image) => {
    if (image) {
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
  };
  // Function to validate amount
  const validateAmount = (amount) => {
    const amountPattern = /^\d+(\.\d{1,2})?$/; // Regex to match a valid amount (e.g., 100, 100.00, 100.5)
    return amountPattern.test(amount);
  };

  return (
    <div className="max-w-2xl p-8 mx-auto bg-white rounded-lg shadow-lg">
      <div className="flex flex-col max-w-2xl gap-3 p-8 mx-auto bg-white rounded-lg shadow-lg">
        <h2 className="mb-5 text-2xl font-bold text-center">
          Add Your Payment Receipt
        </h2>
        <div className="flex justify-between ga-2">
          <div className=" flex flex-col gap-2.5">
            <Label>Amount</Label>
            <Input
              type="text"
              id="amount"
              value={amount}
              onChange={(e) => {
                validateAmount(e.target.value)
                  ? setAmount(e.target.value)
                  : null;
              }}
              placeholder="Enter Amount"
              className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className=" flex flex-col gap-2.5">
            <Label>Amount</Label>
            {/*  <input
            type="date"
            id="paymentDate"
            value={paymentDate}
            onChange={(e) => setPaymentDate(e.target.value)}
            className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          /> */}
            <ScoutDatePicker
              date={paymentDate}
              handleDateChange={(date) => setPaymentDate(date)}
            />
          </div>
        </div>
        <div className="flex items-center ">
          {/* <div className="mb-5">
            <Label>Upload Receipt</Label>
            <input
              type="file"
              id="receiptImage"
              accept="image/*"
              onChange={(e) => updloadReceipt(e.target.files[0])}
              className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div> */}
          <div className="flex items-center justify-between w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-start w-1/2 h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 "
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span>
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                accept="image/*"
                onChange={(e) => updloadReceipt(e.target.files[0])}
                className="hidden"
              />
            </label>

            {receiptImage && (
              <img
                src={receiptImage}
                alt="Receipt"
                className="object-cover w-32 h-32 rounded-lg"
              />
            )}
          </div>
        </div>
        <div className="flex justify-between">
          <Button onClick={onPrevious} className="">
            Previous
          </Button>
          <Button
            onClick={sendRequest}
            disabled={uploading}
            className="bg-blue-500 hover:bg-blue-700"
          >
            {uploading ? "Uploading" : "Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
}
