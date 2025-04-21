import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ProtectedRoute from '../../Components/ProtectedRoute';

const AdminManagement = () => {
  const [search, setSearch] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    redirectPage: ''
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [adminToUpdate, setAdminToUpdate] = useState(null);
  const [admins, setAdmins] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin'); // Redirect to login if no token
    }
  }, [navigate]);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/admin');
        setAdmins(response.data);
      } catch (error) {
        console.error('Error fetching admins:', error);
      }
    };

    fetchAdmins();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/admin/delete/${id}`);
      setAdmins(admins.filter((admin) => admin._id !== id));
      toast.success('Admin deleted successfully');
    } catch (error) {
      toast.error('Failed to delete admin');
    }
  };

  const handleUpdate = async (formData) => {
    // Check if adminToUpdate and its _id exist
    if (!adminToUpdate || !adminToUpdate._id) {
      toast.error('Invalid administrator selected for update');
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/api/admin/update/${adminToUpdate._id}`,
        formData
      );
      
      setAdmins(admins.map(admin => 
        admin._id === adminToUpdate._id ? response.data : admin
      ));
      
      setFormData({ username: '', email: '', password: '', redirectPage: '' });
      setIsUpdating(false);
      setAdminToUpdate(null);
      toast.success('Administrator updated successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error updating administrator');
    }
  };

  // Update the handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isUpdating) {
      await handleUpdate(formData);
    } else {
      try {
        const response = await axios.post('http://localhost:3000/api/admin/add', formData);
        setAdmins([...admins, response.data]);
        setFormData({ username: '', email: '', password: '', redirectPage: '' });
        toast.success('Administrator added successfully');
        // Refresh the page after successful addition
        window.location.reload();
      } catch (error) {
        toast.error(error.response?.data?.message || 'Error adding administrator');
      }
    }
  };

  const setAdminForUpdate = (admin) => {
    setAdminToUpdate(admin);
    setFormData({ username: admin.username, email: admin.email, password: '', redirectPage: admin.redirectPage });
    setIsUpdating(true);
  };

  return (
    <ProtectedRoute allowedPage="AdminManagement">
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
         {/* Header Section */}
         <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 leading-tight">Manage Administrators</h2>
          <p className="mt-2 text-gray-600">Add, update or remove system administrators</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search administrators..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className="absolute right-3 top-3 text-gray-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
          </div>
        </div>
        
        {/* Add/Edit Form */}
        <div className="mt-8 bg-white rounded-xl shadow-2xl p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">{isUpdating ? 'Update Administrator' : 'Add New Administrator'}</h3>
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Redirect Page</label>
              <select
                name="redirectPage"
                value={formData.redirectPage}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 p-2"
              >
                <option value="">Select a page</option>
                <option value="/AActivity">AActivity</option>
                <option value="/AActivityPasser">AActivityPasser</option>
                <option value="/AdminManagement">Add Admin</option>
                <option value="/AGallery">AGallery</option>
                <option value="/AprofileQR">AprofileQR</option>
                <option value="/ARegistrations">ARegistrations</option>
                <option value="/pass-activity">PassActivity</option>
                <option value="/allpages">Main Admin</option>
              </select>
            </div>
            <div className="flex justify-end space-x-3">
              {isUpdating && (
                <button
                  type="button"
                  onClick={() => {
                    setIsUpdating(false);
                    setFormData({ username: '', email: '', password: '', redirectPage: '' });
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
              >
                {isUpdating ? 'Update' : 'Add'} Administrator
              </button>
            </div>
          </form>
        </div>
        

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden mt-8">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Username</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Access Page</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {admins.map((admin) => (
                <tr key={admin._id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{admin.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{admin.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{admin.redirectPage}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => setAdminForUpdate(admin)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(admin._id)}
                      className="text-red-600 hover:text-red-900 transition-colors"
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
      <div>
        <Toaster position="top-right" />
      </div>
    </div>
    </ProtectedRoute>
  );
};

export default AdminManagement;
