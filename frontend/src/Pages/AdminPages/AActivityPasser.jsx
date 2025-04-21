import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ProtectedRoute from '../../Components/ProtectedRoute';

function AActivityPasser() {
  const [email, setEmail] = useState('');
  const [userActivities, setUserActivities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin'); // Redirect to login if no token
    }
  }, [navigate]);

  const fetchUserActivities = async () => {
    try {
      const response = await axios.get(`http://35.232.49.147:3000/api/activity`);
      setUserActivities(response.data);
      toast.success('User activities loaded successfully!');
    } catch (error) {
      toast.error('Error fetching user activities');
      console.error(error);
    }
  };

  const handleMarkAsDone = async (activityId, activityName) => {
    try {
      await axios.post('http://35.232.49.147:3000/api/activity/pass', {
        email,
        activityId,
        activityName,
      });
      toast.success('Activity marked as done!');
      fetchUserActivities();
    } catch (error) {
      toast.error('Error marking activity as done');
      console.error(error);
    }
  };

  const handleMarkAsNotDone = async (activityId, activityName) => {
    try {
      await axios.post('http://35.232.49.147:3000/api/activity/markAsNotDone', {
        email,
        activityId,
        activityName,
      });
      toast.success('Activity marked as not done!');
      fetchUserActivities();
    } catch (error) {
      toast.error('Error marking activity as not done');
      console.error(error);
    }
  };

  return (
    <ProtectedRoute allowedPage="aactivitypasser"> 
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <Toaster />

      <h1 className="text-3xl font-bold text-blue-600 mb-6">Activity Passer</h1>

      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <input
          type="email"
          placeholder="Enter user email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 p-3 w-full rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={fetchUserActivities}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition"
        >
          Fetch User Activities
        </button>
      </div>

      <ul className="bg-white p-6 rounded shadow-md w-full max-w-md mt-6">
        {userActivities.length > 0 ? (
          userActivities.map((activity) => (
            <li
              key={activity.id}
              className="flex justify-between items-center border-b border-gray-200 py-3"
            >
              <span className="text-gray-700 font-medium">{activity.name}</span>
              <span className="text-gray-500">{new Date(activity.updatedAt).toLocaleString()}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleMarkAsDone(activity.id, activity.name)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                >
                  Done
                </button>
                <button
                  onClick={() => handleMarkAsNotDone(activity.id, activity.name)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Not Done
                </button>
              </div>
            </li>
          ))
        ) : (
          <li className="text-center text-gray-500">No activities available.</li>
        )}
      </ul>
    </div>
    </ProtectedRoute>
  );
}

export default AActivityPasser;
