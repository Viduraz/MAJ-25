import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function AActivityPasser() {
  const [email, setEmail] = useState('');
  const [userActivities, setUserActivities] = useState([]);

  const fetchUserActivities = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/activity`);
      setUserActivities(response.data);
      toast.success('User activities loaded successfully!');
    } catch (error) {
      toast.error('Error fetching user activities');
      console.error(error);
    }
  };

  const handleMarkAsDone = async (activityId, activityName) => {
    try {
      await axios.post('http://localhost:3000/api/activity/pass', {
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
      await axios.post('http://localhost:3000/api/activity/markAsNotDone', {
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
              <FetchCompletionTime email={email} activityId={activity.id} />
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
  );
}

function FetchCompletionTime({ email, activityId }) {
  const [completionTime, setCompletionTime] = useState(null);

  useEffect(() => {
    if (email) {
      axios.get(`http://localhost:3000/api/registration/${email}`)
        .then(response => {
          const registration = response.data;
          const activity = registration?.activities?.find(a => a.id === activityId);
          if (activity) {
            setCompletionTime(new Date(registration.updatedAt).toLocaleString());
          }
        })
        .catch(error => console.error('Error fetching completion time:', error));
    }
  }, [email, activityId]);

  return (
    <span className="text-gray-500">
      {completionTime || 'Not completed'}
    </span>
  );
}

export default AActivityPasser;
