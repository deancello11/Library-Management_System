import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDA9F6OgK_VnVjT4Kyv9iDH8Gbo-YLMO3A",
  authDomain: "library-managment-3ab67.firebaseapp.com",
  projectId: "library-managment-3ab67",
  storageBucket: "library-managment-3ab67.firebasestorage.app",
  messagingSenderId: "1050814286048",
  appId: "1:1050814286048:web:66f8e202f3a28ea58ee885",
  measurementId: "G-M05FMVLX1W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);

export default app;
