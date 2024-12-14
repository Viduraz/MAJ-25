import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInStart, signInSuccess, signInFailure } from '../redux/User/userSlice'
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../Components/OAuth';
import toast from 'react-hot-toast';
import Switch from 'react-switch';
import axios from 'axios';

export default function Signin() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const [message, setMessage] = useState('');
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const handleToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
  }
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(isSwitchOn) {

      // scout user registration
      const URL = 'http://localhost:3000/api/registration/single';

      try {
        dispatch(signInStart());
        const registration = await axios.post(URL, {
          email: formData.email,
          password: formData.password,
        });
        dispatch(signInSuccess(registration));
        localStorage.setItem('registration', JSON.stringify(registration.data));
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
        
        if (data.success === false) {
          dispatch(signInFailure(data));
          setMessage(data.message || 'Sign in failed.');
          toast.error(data.message || 'Invalid credentials. Please try again.');
          return;
        }
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
  );
}
