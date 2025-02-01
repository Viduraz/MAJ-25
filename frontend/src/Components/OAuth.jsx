import React from 'react';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/User/userSlice';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { firebaseApp } from '../firebaseConfig'; // Ensure you have this file and it exports your initialized Firebase app

export default function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(firebaseApp);
            const result = await signInWithPopup(auth, provider);
            const res = await fetch('https://maj-25-backend.onrender.com/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: result.user.accessToken }),
            });
            const data = await res.json();
            dispatch(signInSuccess(data));
            navigate('/');
        } catch (error) {
            console.log('could not login with google', error);
        }
    };

    return (
        <button
            type='button'
            onClick={handleGoogleClick}
            className='bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95 flex items-center justify-center'>
            <FontAwesomeIcon icon={faGoogle} className="mr-2" />
            Continue with Google
        </button>
    );
}