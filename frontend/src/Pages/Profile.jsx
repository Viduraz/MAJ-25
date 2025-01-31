import { useSelector, useDispatch } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOut,
} from '../redux/User/userSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Profile() {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [loadingPicture, setLoadingPicture] = useState(true);
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePictureLoaded, setProfilePictureLoaded] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);

  const { currentUser, loading: userLoading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  useEffect(() => {
    const loadProfilePicture = async () => {
      const picture = currentUser.profilePicture;
      if (picture) {
        setProfilePicture(picture);
        setProfilePictureLoaded(true);
      } else {
        setProfilePictureLoaded(false);
      }
      setLoadingPicture(false);
    };

    loadProfilePicture();
  }, [currentUser]);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const formData = new FormData();
    formData.append('file', image);

    try {
      console.log('Uploading file...');
      const res = await fetch('/api/user/uploadProfilePicture', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      console.log('Response:', data);
      if (data.success) {
        setFormData({ ...formData, profilePicture: data.url });
      } else {
        setImageError(true);
      }
    } catch (error) {
      console.error('Upload error:', error);
      setImageError(true);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const formDataObj = new FormData();
      
      // Append text fields
      Object.keys(formData).forEach(key => {
        formDataObj.append(key, formData[key]);
      });

      // Append image if exists
      if (image) {
        formDataObj.append('profilePicture', image);
      }

      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        body: formDataObj, // Send as FormData instead of JSON
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        toast.error(data.message || 'Update failed');
        return;
      }

      // Update profile picture URL immediately
      if (data.profilePicture) {
        setProfilePicture(data.profilePicture);
        dispatch(updateUserSuccess({
          ...currentUser,
          profilePicture: data.profilePicture
        }));
      }

      toast.success('Profile updated successfully!');
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
      toast.error('An error occurred while updating');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        toast.error(data.message || 'Failed to delete account.');
        return;
      }
      dispatch(deleteUserSuccess(data));
      toast.success('Account deleted successfully!');
    } catch (error) {
      dispatch(deleteUserFailure(error));
      toast.error('An error occurred while deleting the account.');
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/signout');
      dispatch(signOut());
      toast.success('Signed out successfully!');
    } catch (error) {
      console.log(error);
      toast.error('An error occurred while signing out.');
    }
  };

  if (loadingPicture) {
    return <div>Loading profile picture...</div>;
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input
            type='file'
            ref={fileRef}
            hidden
            accept='image/*'
            onChange={handleImageChange}
          />
          <div className="flex flex-col gap-4">
            <input
              type="file"
              ref={fileRef}
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
            {loading ? (
              <div className="h-24 w-24 rounded-full bg-slate-200 animate-pulse self-center" />
            ) : (
              <img
                src={imagePreview || currentUser.profilePicture || "https://via.placeholder.com/150"}
                alt="profile"
                className="h-24 w-24 rounded-full object-cover cursor-pointer self-center"
                onClick={() => fileRef.current.click()}
              />
            )}
            {imagePercent > 0 && imagePercent < 100 && (
              <div className="text-sm text-center">
                Uploading: {imagePercent}%
              </div>
            )}
          </div>
          <p className='text-sm self-center'>
            {imageError ? (
              <span className='text-red-700'>
                Error uploading image (file size must be less than 2 MB)
              </span>
            ) : imagePercent > 0 && imagePercent < 100 ? (
              <span className='text-slate-700'>{`Uploading: ${imagePercent} %`}</span>
            ) : imagePercent === 100 ? (
              <span className='text-green-700'>Image uploaded successfully</span>
            ) : (
              ''
            )}
          </p>
          <input
            defaultValue={currentUser.username}
            type='text'
            id='username'
            placeholder='Username'
            className='bg-slate-100 rounded-lg p-3'
            onChange={handleChange}
          />
          <input
            defaultValue={currentUser.email}
            type='email'
            id='email'
            placeholder='Email'
            className='bg-slate-100 rounded-lg p-3'
            onChange={handleChange}
          />
          <input
            type='password'
            id='password'
            placeholder='Password'
            className='bg-slate-100 rounded-lg p-3'
            onChange={handleChange}
          />
          <button 
            disabled={loading} 
            className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
          >
            {loading ? 'Loading...' : 'Update'}
          </button>
        </form>
        <div className='flex justify-between mt-5'>
          <span
            onClick={handleDeleteAccount}
            className='text-red-700 cursor-pointer'
          >
            Delete Account
          </span>
          <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>
            Sign out
          </span>
        </div>
        <p className='text-red-700 mt-5'>{error && 'Something went wrong!'}</p>
        <p className='text-green-700 mt-5'>
          {updateSuccess && 'User is updated successfully!'}
        </p>
      </div>
    </>
  );
}
