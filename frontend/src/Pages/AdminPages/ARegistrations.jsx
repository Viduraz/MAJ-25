import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminRegistrations() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/registration');
        setRegistrations(response.data || []);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

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
      acc[registration.school] = (acc[registration.school] || 0) + 1;
      return acc;
    }, {});
    const totalAmount = registrations.reduce((acc, registration) => acc + (registration.amount || 0), 0);
    const leaderCount = registrations.filter(registration => registration.type === 'leader').length;
    const scoutCount = registrations.filter(registration => registration.type === 'scout').length;

    return { totalRegistrations, genderDistribution, schoolDistribution, totalAmount, leaderCount, scoutCount };
  };

  const filteredRegistrations = registrations.filter(registration =>
    registration.school.toLowerCase().includes(searchQuery.toLowerCase()) ||
    registration._id.toLowerCase().includes(searchQuery.toLowerCase())||
    registration.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (id) => {
    // Implement edit functionality here
    console.log(`Edit registration with ID: ${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/registration/${id}`);
      setRegistrations(registrations.filter(registration => registration._id !== id));
    } catch (error) {
      console.error(`Error deleting registration with ID: ${id}`, error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const { totalRegistrations, genderDistribution, schoolDistribution, totalAmount, leaderCount, scoutCount } = calculateAnalytics();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-6">Admin Panel - Registrations</h1>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by school name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
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
          <h2 className="text-lg font-semibold">School Distribution</h2>
          <ul>
            {Object.entries(schoolDistribution).map(([school, count]) => (
              <li key={school} className="flex justify-between">
                <span>{school}</span>
                <span>{count}</span>
              </li>
            ))}
          </ul>
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
                    onClick={() => handleEdit(registration._id)}
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
    </div>
  );
}
