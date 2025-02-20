import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ProtectedRoute from '../../Components/ProtectedRoute';
import * as XLSX from 'xlsx';

export default function AdminRegistrations() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [editData, setEditData] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin'); // Redirect to login if no token
    }

    const fetchRegistrations = async () => {
      try {
        const response = await axios.get('https://maj-25-backend.onrender.com/api/registration');
        const registrations = response.data || [];
        setRegistrations(registrations);
        setLoading(false);

        // Calculate total amount
        const schoolSet = new Set();
        let amount = 0;
        registrations.forEach(registration => {
          if (!schoolSet.has(registration.school)) {
            schoolSet.add(registration.school);
            amount += registration.amount;
          }
        });
        setTotalAmount(amount);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, [navigate]);

  const calculateAnalytics = () => {
    const totalRegistrations = registrations.length;
    const genderDistribution = registrations.reduce(
      (acc, registration) => {
        acc[registration.gender] = (acc[registration.gender] || 0) + 1;
        return acc;
      },
      { Male: 0, Female: 0 }
    );
    const schoolDistribution = registrations.reduce((acc, registration) => {
      const school = registration.school;
      if (!acc[school]) {
        acc[school] = { total: 0, scouts: 0, leaders: 0 };
      }
      acc[school].total += 1;
      if (registration.type.toLowerCase() === 'scout') {
        acc[school].scouts += 1;
      } else if (registration.type.toLowerCase() === 'leader') {
        acc[school].leaders += 1;
      }
      return acc;
    }, {});
    const leaderCount = registrations.filter(registration => registration.type.toLowerCase() === 'leader').length;
    const scoutCount = registrations.filter(registration => registration.type.toLowerCase() === 'scout').length;

    return { totalRegistrations, genderDistribution, schoolDistribution, totalAmount, leaderCount, scoutCount };
  };

  const filteredRegistrations = registrations.filter(registration =>
    registration.school.toLowerCase().includes(searchQuery.toLowerCase()) ||
    registration._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    registration.fullName.toLowerCase().includes(searchQuery.toLowerCase())||
    registration.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (registration) => {
    setEditData(registration);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://maj-25-backend.onrender.com/api/registration/${id}`);
      setRegistrations(registrations.filter(registration => registration._id !== id));
      toast.success('Registration deleted successfully');
    } catch (error) {
      toast.error(`Error deleting registration: ${error.message}`);
    }
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`https://maj-25-backend.onrender.com/api/registration/${editData._id}`, {
        fullName: editData.fullName,
        gender: editData.gender,
        phoneNumber: editData.phoneNumber,
        email: editData.email,
        school: editData.school,
        idNumber: editData.idNumber,
        paymentDate: editData.paymentDate,
        amount: editData.amount,
        type: editData.type
      });
  
      // Update the local state with edited data
      setRegistrations(registrations.map(registration => 
        registration._id === editData._id ? editData : registration
      ));
  
      // Clear edit mode and show success message
      setEditData(null);
      toast.success('Registration updated successfully');
    } catch (error) {
      toast.error('Error updating registration: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleDownloadExcel = () => {
    const filteredData = filteredRegistrations.map(({ fullName, gender, email, phoneNumber, school, type, idNumber }) => ({
      fullName,
      gender,
      email,
      phoneNumber,
      school,
      type,
      idNumber
    }));
  
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Registrations');
    XLSX.writeFile(workbook, 'registrations.xlsx');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const { totalRegistrations, genderDistribution, schoolDistribution, leaderCount, scoutCount } = calculateAnalytics();

  return (
    <ProtectedRoute allowedPage="ARegistrations">
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-6">Admin Panel - Registrations</h1>
      <div className="mb-6 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by school name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
        <button
          onClick={handleDownloadExcel}
          className="bg-green-600 text-white px-4 py-2 rounded ml-4"
        >
          Download Excel Sheet
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold">Total Registrations</h2>
          <p className="text-2xl font-bold text-purple-600">{totalRegistrations}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold">Gender Distribution</h2>
          <p>Male: {genderDistribution.Male}</p>
          <p>Female: {genderDistribution.Female}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold">Total Payment</h2>
          <p className="text-2xl font-bold text-green-600">Rs.{totalAmount}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">School Distribution</h2>
          <div className="max-h-[300px] overflow-y-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-2">School</th>
                  <th className="text-right py-2">Scouts</th>
                  <th className="text-right py-2">Leaders</th>
                  <th className="text-right py-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(schoolDistribution).map(([school, counts]) => (
                  <tr key={school} className="border-b">
                    <td className="py-2">{school}</td>
                    <td className="text-right py-2">{counts.scouts}</td>
                    <td className="text-right py-2">{counts.leaders}</td>
                    <td className="text-right py-2 font-semibold">{counts.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold">Roles</h2>
          <p>Leaders: {leaderCount}</p>
          <p>Scouts: {scoutCount}</p>
        </div>
      </div>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 text-left">ID</th>
              <th className="py-2 px-4 text-left">Full Name</th>
              <th className="py-2 px-4 text-left">Gender</th>
              <th className="py-2 px-4 text-left">Phone Number</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">School</th>
              <th className="py-2 px-4 text-left">ID Number</th>
              <th className="py-2 px-4 text-left">Payment Date</th>
              <th className="py-2 px-4 text-left">Amount</th>
              <th className="py-2 px-4 text-left">Type</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRegistrations.map((registration) => (
              <tr key={registration._id} className="border-t">
                <td className="py-2 px-4">{registration._id}</td>
                <td className="py-2 px-4">{registration.fullName}</td>
                <td className="py-2 px-4">{registration.gender}</td>
                <td className="py-2 px-4">{registration.phoneNumber}</td>
                <td className="py-2 px-4">{registration.email}</td>
                <td className="py-2 px-4">{registration.school}</td>
                <td className="py-2 px-4">{registration.idNumber}</td>
                <td className="py-2 px-4">{new Date(registration.paymentDate).toLocaleDateString()}</td>
                <td className="py-2 px-4">{registration.amount}</td>
                <td className="py-2 px-4">{registration.type}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleEdit(registration)}
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(registration._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editData && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Edit Registration</h2>
            <input
              type="text"
              placeholder="Full Name"
              value={editData.fullName}
              onChange={(e) => setEditData({ ...editData, fullName: e.target.value })}
              className="mt-2 block w-full border border-gray-400 rounded-lg shadow-md focus:ring-green-600 focus:border-green-600"
            />
            <input
              type="text"
              placeholder="Gender"
              value={editData.gender}
              onChange={(e) => setEditData({ ...editData, gender: e.target.value })}
              className="mt-2 block w-full border border-gray-400 rounded-lg shadow-md focus:ring-green-600 focus:border-green-600"
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={editData.phoneNumber}
              onChange={(e) => setEditData({ ...editData, phoneNumber: e.target.value })}
              className="mt-2 block w-full border border-gray-400 rounded-lg shadow-md focus:ring-green-600 focus:border-green-600"
            />
            <input
              type="email"
              placeholder="Email"
              value={editData.email}
              onChange={(e) => setEditData({ ...editData, email: e.target.value })}
              className="mt-2 block w-full border border-gray-400 rounded-lg shadow-md focus:ring-green-600 focus:border-green-600"
            />
            <input
              type="text"
              placeholder="School"
              value={editData.school}
              onChange={(e) => setEditData({ ...editData, school: e.target.value })}
              className="mt-2 block w-full border border-gray-400 rounded-lg shadow-md focus:ring-green-600 focus:border-green-600"
            />
            <input
              type="text"
              placeholder="ID Number"
              value={editData.idNumber}
              onChange={(e) => setEditData({ ...editData, idNumber: e.target.value })}
              className="mt-2 block w-full border border-gray-400 rounded-lg shadow-md focus:ring-green-600 focus:border-green-600"
            />
            <input
              type="date"
              placeholder="Payment Date"
              value={new Date(editData.paymentDate).toISOString().split('T')[0]}
              onChange={(e) => setEditData({ ...editData, paymentDate: e.target.value })}
              className="mt-2 block w-full border border-gray-400 rounded-lg shadow-md focus:ring-green-600 focus:border-green-600"
              readOnly
            />
            <input
              type="text"
              placeholder="Amount"
              value={editData.amount}
              onChange={(e) => setEditData({ ...editData, amount: e.target.value })}
              className="mt-2 block w-full border border-gray-400 rounded-lg shadow-md focus:ring-green-600 focus:border-green-600"
              
            />
            <input
              type="text"
              placeholder="Type"
              value={editData.type}
              onChange={(e) => setEditData({ ...editData, type: e.target.value })}
              className="mt-2 block w-full border border-gray-400 rounded-lg shadow-md focus:ring-green-600 focus:border-green-600"
              readOnly
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setEditData(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </ProtectedRoute>
  );
}
