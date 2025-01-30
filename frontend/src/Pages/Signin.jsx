import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import { signInStart, signInSuccess, signInFailure } from '../redux/User/userSlice';
=======
import { signInStart, signInSuccess, signInFailure } from '../redux/User/userSlice'
>>>>>>> ca897cea8e8ce0edd0761379ecfad1f5c221189c
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../Components/OAuth';
import toast from 'react-hot-toast';
import Switch from 'react-switch';
import axios from 'axios';

export default function Signin() {
  const [formData, setFormData] = useState({});
<<<<<<< HEAD
  const { loading } = useSelector((state) => state.user);
  const [message, setMessage] = useState('');
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
  };

=======
  const { loading, error } = useSelector((state) => state.user);
  const [message, setMessage] = useState('');
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const handleToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
  }
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
>>>>>>> ca897cea8e8ce0edd0761379ecfad1f5c221189c
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

<<<<<<< HEAD
    if (isSwitchOn) {
=======
    if(isSwitchOn) {

      // scout user registration
>>>>>>> ca897cea8e8ce0edd0761379ecfad1f5c221189c
      const URL = 'http://localhost:3000/api/registration/single';

      try {
        dispatch(signInStart());
        const registration = await axios.post(URL, {
          email: formData.email,
          password: formData.password,
        });
        dispatch(signInSuccess(registration));
        localStorage.setItem('registration', JSON.stringify(registration.data));
<<<<<<< HEAD
        toast.success('Welcome back! You have successfully signed in.');
        navigate('/sprofiles');
      } catch (error) {
        dispatch(signInFailure({ message: error.message }));
        toast.error('Invalid credentials. Please try again.');
      }
    } else {
=======
        console.log('Registration:', registration.data);
        
        toast.success('Welcome back! You have successfully signed in.', setTimeout(2000));
        navigate('/sprofiles');
        
      } catch (error) {
        dispatch(signInFailure({ message: error.message }));
        toast.error('Invalid credentials. Please try again.');
        console.error('Error signing in:', error);
      }

    } else {

      // default user registration
>>>>>>> ca897cea8e8ce0edd0761379ecfad1f5c221189c
      try {
        dispatch(signInStart());
        const res = await fetch('/api/auth/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
<<<<<<< HEAD

        if (!data.success) {
=======
        
        if (data.success === false) {
>>>>>>> ca897cea8e8ce0edd0761379ecfad1f5c221189c
          dispatch(signInFailure(data));
          setMessage(data.message || 'Sign in failed.');
          toast.error(data.message || 'Invalid credentials. Please try again.');
          return;
        }
<<<<<<< HEAD

=======
>>>>>>> ca897cea8e8ce0edd0761379ecfad1f5c221189c
        dispatch(signInSuccess(data));
        setMessage('Sign in successful!');
        toast.success('Welcome back! You have successfully signed in.');
        navigate('/');
      } catch (error) {
        dispatch(signInFailure({ message: error.message }));
        setMessage('An error occurred. Please try again.');
        toast.error('An error occurred. Please try again.');
      }
    }
  };

  return (
<<<<<<< HEAD
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
=======
    <>
      <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          
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

          <div className="flex justify-end items-center mt-2">
            <label htmlFor="scoutRegister" className="mr-4 text-gray-200">
              Scout Register
            </label>
            <div className="relative">
              <Switch onChange={handleToggleSwitch} checked={isSwitchOn} />
            </div>
          </div>

          <button
            // disabled={loading}
            className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
          >
            {loading ? 'Loading...' : 'Sign In'}
          </button>

          <OAuth />
        </form>
        <div className='flex gap-2 mt-5'>
          <p>Dont Have an account?</p>
          <Link to='/signup'>
            <span className='text-blue-500'>Sign up</span>
          </Link>
        </div>
        <p className='text-red-700 mt-5'>{message}</p>
      </div>
    </>
>>>>>>> ca897cea8e8ce0edd0761379ecfad1f5c221189c
  );
}
