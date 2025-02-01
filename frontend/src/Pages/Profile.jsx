import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { signOut } from '../redux/User/userSlice';
import toast from 'react-hot-toast';

export default function Profile() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [loadingPicture, setLoadingPicture] = useState(true);
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    const loadProfilePicture = async () => {
      const picture = currentUser.profilePicture;
      if (picture) {
        setProfilePicture(picture);
      }
      setLoadingPicture(false);
    };

    loadProfilePicture();
  }, [currentUser]);

  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/signout');
      dispatch(signOut());
      toast.success('Successfully logged out');
    } catch (error) {
      console.log(error);
      toast.error('An error occurred while signing out.');
    }
  };

  if (loadingPicture) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg">
            <h1 className='text-4xl font-bold bg-center'>PROFILE PAGE</h1>
          <div className="w-full">
            <label htmlFor="username" className="block text-sm font-medium text-gray-100">
              Username
            </label>
            <input
              value={currentUser.username}
              type="text"
              id="username"
              className="mt-1 block w-full px-4 py-2 bg-gray-100 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              readOnly
            />
          </div>
          <div className="w-full">
            <label htmlFor="email" className="block text-sm font-medium text-gray-100">
              Email
            </label>
            <input
              value={currentUser.email}
              type="email"
              id="email"
              className="mt-1 block w-full px-4 py-2 bg-gray-100 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              readOnly
            />
          </div>
          <button
            onClick={handleSignOut}
            className="w-full py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
}