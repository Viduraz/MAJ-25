// import { initializeApp } from "firebase/app";

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: "maj-25.firebaseapp.com",
//   projectId: "maj-25",
//   storageBucket: "maj-25.firebasestorage.app",
//   messagingSenderId: "892247876342",
//   appId: "1:892247876342:web:dc601a8a5c1b43590782d7"
// };

// export const app = initializeApp(firebaseConfig);











import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDSJg31T2MIgITQjQxOoNlgGrlPdg7mgJg",
  authDomain: "wizweb-dcb5b.firebaseapp.com",
  databaseURL: "https://wizweb-dcb5b-default-rtdb.firebaseio.com",
  projectId: "wizweb-dcb5b",
  storageBucket: "wizweb-dcb5b.firebasestorage.app",
  messagingSenderId: "338968899666",
  appId: "1:338968899666:web:6e48ad75243fab9a242f8b"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;