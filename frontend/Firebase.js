// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "maj-25.firebaseapp.com",
  projectId: "maj-25",
  storageBucket: "maj-25.firebasestorage.app",
  messagingSenderId: "892247876342",
  appId: "1:892247876342:web:dc601a8a5c1b43590782d7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);