import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import firebaseApp from '../../Firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/User/userSlice';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
=======
>>>>>>> ca897cea8e8ce0edd0761379ecfad1f5c221189c

export default function OAuth () {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick = async () => { 
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(firebaseApp);
            const result = await signInWithPopup(auth, provider);
<<<<<<< HEAD
            const res = await fetch('http://localhost:3000/api/auth/google', {
=======
            const res = await fetch('/api/auth/google', {
>>>>>>> ca897cea8e8ce0edd0761379ecfad1f5c221189c
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
<<<<<<< HEAD

            if (!res.ok) {
                throw new Error('Network response was not ok');
            }

=======
>>>>>>> ca897cea8e8ce0edd0761379ecfad1f5c221189c
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
<<<<<<< HEAD
    className='bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95 flex items-center justify-center'>
    <FontAwesomeIcon icon={faGoogle} className="mr-2" />
    Continue with Google
  </button>
  )
}
=======
    className='bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95'>
    Continue with google
  </button>
  )
}
>>>>>>> ca897cea8e8ce0edd0761379ecfad1f5c221189c
