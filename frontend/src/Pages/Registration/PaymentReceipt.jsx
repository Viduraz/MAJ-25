import React from 'react';

export default function PaymentReceipt({ onPrevious }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-5">Add Your Payment Receipt</h2>
      
      <div className="mb-5">
        <label htmlFor="amount" className="block text-lg font-medium text-gray-700">Amount</label>
        <input
          type="text"
          id="amount"
          placeholder="Enter Amount"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-5">
        <label htmlFor="paymentDate" className="block text-lg font-medium text-gray-700">Payment Date</label>
        <input
          type="date"
          id="paymentDate"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-5">
        <label htmlFor="receiptImage" className="block text-lg font-medium text-gray-700">Upload Receipt Photo</label>
        <input
          type="file"
          id="receiptImage"
          accept="image/*"
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
        <button className="mt-5 bg-blue-500 text-white px-4 py-2 rounded-md">
          Submit Payment Receipt
        </button>
      </div>
    </div>
  );
}
