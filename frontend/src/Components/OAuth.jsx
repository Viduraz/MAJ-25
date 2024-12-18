import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import firebaseApp from '../../Firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/User/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth () {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick = async () => { 
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(firebaseApp);
            const result = await signInWithPopup(auth, provider);
            const res = await fetch('http://localhost:3000/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                }),
            });

            if (!res.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await res.json();
            dispatch(signInSuccess(data));
            navigate('/');
        }  
        catch (error) {
            console.log('could not login with google', error)
        }
    }
  return (
    <button
    type='button'
    onClick={handleGoogleClick}
    className='bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95'>
    Continue with google
  </button>
  )
}