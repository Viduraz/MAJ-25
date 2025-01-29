import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ProtectedRoute from '../../Components/ProtectedRoute';


const AActivity = () => {
  const [activities, setActivities] = useState([]);
  const [newActivity, setNewActivity] = useState({ id: '', name: '', category: '' });
  const [editActivity, setEditActivity] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin');
    }
    fetchActivities();
  }, [navigate]);

  const fetchActivities = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/activity');
      setActivities(response.data);
      toast.success('Activities loaded successfully!');
    } catch (error) {
      toast.error('Error fetching activities');
      console.error(error);
    }
  };

  const generateNextActivityId = () => {
    const activityCount = activities.length;
    const nextId = activityCount + 1;
    return `Activity-${nextId.toString().padStart(2, '0')}`;
  };

  const handleAddActivity = async () => {
    try {
      const activityId = generateNextActivityId();
      const activityToAdd = { ...newActivity, id: activityId };
      const response = await axios.post('http://localhost:3000/api/activity', activityToAdd);
      setActivities([...activities, response.data]);
      setNewActivity({ id: '', name: '', category: '' });
      toast.success('Activity added successfully!');
    } catch (error) {
      toast.error('Error adding activity');
      console.error(error);
    }
  };

  const handleEditActivity = async (activity) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/activity/${activity.id}`, activity);
      setActivities(activities.map((act) => (act.id === activity.id ? response.data : act)));
      setEditActivity(null);
      toast.success('Activity edited successfully!');
    } catch (error) {
      toast.error('Error editing activity');
      console.error(error);
    }
  };

  const handleDeleteActivity = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/activity/${id}`);
      setActivities(activities.filter((activity) => activity.id !== id));
      toast.success('Activity deleted successfully!');
    } catch (error) {
      toast.error('Error deleting activity');
      console.error(error);
    }
  };

  return (
    <ProtectedRoute allowedPage="AActivity">
      <div className="p-6 bg-gray-100 min-h-screen">
        <Toaster />
        <h1 className="text-2xl font-bold mb-4">Manage Activities</h1>

        <div className="bg-white p-4 rounded shadow mb-6">
          <h2 className="text-lg font-semibold mb-2">Add New Activity</h2>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="ID"
              value={newActivity.id}
              onChange={(e) => setNewActivity({ ...newActivity, id: e.target.value })}
              className="border p-2 rounded w-1/4"
              readOnly
            />
            <input
              type="text"
              placeholder="Name"
              value={newActivity.name}
              onChange={(e) => setNewActivity({ ...newActivity, name: e.target.value })}
              className="border p-2 rounded w-1/4"
            />
            <select
              value={newActivity.category}
              onChange={(e) => setNewActivity({ ...newActivity, category: e.target.value })}
              className="border p-2 rounded w-1/4"
            >
              <option value="">Select Category</option>
              <option value="Scout_Craft">Scout_Craft</option>
              <option value="Health_And_Environment">Health and Environment</option>
              <option value="Society_and_Culture">Society and Culture</option>
              <option value="Adventure">Adventure</option>
              <option value="Technology">Technology</option>
              <option value="Bussiness_&_Entrepreneurship">Bussiness & Entrepreneurship</option>
              <option value="Water_activities">Water activities</option>
            </select>
            <button
              onClick={handleAddActivity}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Activity
            </button>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Existing Activities</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="border border-gray-300 p-2">ID</th>
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Category</th>
                <th className="border border-gray-300 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {activities.length > 0 ? (
                activities.map((activity) => (
                  <tr key={activity.id} className="hover:bg-gray-100">
                    <td className="border border-gray-300 p-2">{activity.id}</td>
                    <td className="border border-gray-300 p-2">
                      {editActivity && editActivity.id === activity.id ? (
                        <input
                          type="text"
                          value={editActivity.name}
                          onChange={(e) => setEditActivity({ ...editActivity, name: e.target.value })}
                          className="border p-2 rounded"
                        />
                      ) : (
                        activity.name
                      )}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {editActivity && editActivity.id === activity.id ? (
                        <input
                          type="text"
                          value={editActivity.category}
                          onChange={(e) => setEditActivity({ ...editActivity, category: e.target.value })}
                          className="border p-2 rounded"
                        />
                      ) : (
                        activity.category
                      )}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {editActivity && editActivity.id === activity.id ? (
                        <>
                          <button
                            onClick={() => handleEditActivity(editActivity)}
                            className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mr-2"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditActivity(null)}
                            className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => setEditActivity(activity)}
                            className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 mr-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteActivity(activity.id)}
                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-4">No activities available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AActivity;
