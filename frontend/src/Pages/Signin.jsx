import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInStart, signInSuccess, signInFailure } from '../redux/User/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../Components/OAuth';
import toast from 'react-hot-toast';
import Switch from 'react-switch';
import axios from 'axios';

export default function Signin() {
  const [formData, setFormData] = useState({});
  const { loading } = useSelector((state) => state.user);
  const [message, setMessage] = useState('');
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSwitchOn) {
      const URL = 'http://35.232.49.147:3000/api/registration/single';

      try {
        dispatch(signInStart());
        const response = await axios.post(URL, {
          email: formData.email,
          password: formData.password,
        });

        if (response.data) {
          dispatch(signInSuccess(response.data));
          localStorage.setItem('registration', JSON.stringify(response.data));
          localStorage.setItem('token', response.data.token);
          toast.success('Welcome back! You have successfully signed in.');
          navigate('/sprofiles');
        } else {
          dispatch(signInFailure("Invalid credentials"));
          toast.error('Invalid credentials. Please try again.');
        }
      } catch (error) {
        dispatch(signInFailure(error.message));
        toast.error('Login failed. Please try again.');
      }
    } else {
      try {
        dispatch(signInStart());
        const response = await axios.post('http://35.232.49.147:3000/api/auth/signin', formData);

        if (response.data) {
          dispatch(signInSuccess(response.data));
          localStorage.setItem('token', response.data.token);
          toast.success('Welcome back! You have successfully signed in.');
          navigate('/');
        } else {
          dispatch(signInFailure("Invalid credentials"));
          toast.error('Invalid credentials. Please try again.');
        }
      } catch (error) {
        dispatch(signInFailure(error.message));
        toast.error('Login failed. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center">Welcome Back</h1>
        <p className="text-center text-gray-400">Sign in to access your account</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="scoutRegister" className="text-sm font-medium">Scout Register</label>
            <Switch onChange={handleToggleSwitch} checked={isSwitchOn} />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Sign In'}
          </button>
        </form>

        <OAuth />

        <div className="text-center text-sm">
          <p>Don't have an account? <Link to="/signup" className="text-blue-500">Sign Up</Link></p>
        </div>

        {message && <p className="text-red-500 text-center mt-4">{message}</p>}
      </div>
    </div>
  );
}
