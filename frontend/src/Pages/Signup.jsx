import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import { toast } from 'react-hot-toast';
import axios from 'axios';
import OAuth from '../Components/OAuth';
=======
import OAuth from '../Components/OAuth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
>>>>>>> ca897cea8e8ce0edd0761379ecfad1f5c221189c

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
<<<<<<< HEAD

=======
>>>>>>> ca897cea8e8ce0edd0761379ecfad1f5c221189c
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
<<<<<<< HEAD
      const res = await axios.post('http://localhost:3000/api/auth/signup', formData);
      const data = res.data;
=======
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
>>>>>>> ca897cea8e8ce0edd0761379ecfad1f5c221189c
      setLoading(false);
      if (data.success === false) {
        setError(true);
        toast.error(data.message || 'Registration failed. Please check your details.');
        return;
      }
      setMessage('Sign up successful!');
      toast.success('Your account has been created successfully!');
      navigate('/signin');
    } catch (error) {
      setLoading(false);
      setError(true);
      toast.error('An error occurred. Please try again.');
    }
  };
<<<<<<< HEAD

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center">Create Account</h1>
        <p className="text-center text-gray-400">Sign up to get started</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block mb-2 text-sm font-medium">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
            />
          </div>

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

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Sign Up'}
          </button>
        </form>

        <OAuth />

        <div className="text-center text-sm">
          <p>Have an account? <Link to="/signin" className="text-blue-500">Sign In</Link></p>
        </div>

        {message && <p className="text-red-500 text-center mt-4">{message}</p>}
      </div>
    </div>
=======
  return (
    <>
      <ToastContainer />
      <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input
            type='text'
            placeholder='Username'
            id='username'
            className='bg-slate-100 p-3 rounded-lg'
            onChange={handleChange}
          />
          <input
            type='email'
            placeholder='Email'
            id='email'
            className='bg-slate-100 p-3 rounded-lg'
            onChange={handleChange}
          />
          <input
            type='password'
            placeholder='Password'
            id='password'
            className='bg-slate-100 p-3 rounded-lg'
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
          >
            {loading ? 'Loading...' : 'Sign Up'}
          </button>
          <OAuth />
        </form>
        <div className='flex gap-2 mt-5'>
          <p>Have an account?</p>
          <Link to='/signin'>
            <span className='text-blue-500'>Sign in</span>
          </Link>
        </div>
        <p className='text-red-700 mt-5'>{message}</p>
      </div>
    </>
>>>>>>> ca897cea8e8ce0edd0761379ecfad1f5c221189c
  );
}
