// -------- Firebase Initialization --------
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
import { getAuth } from "firebase/auth";

// Your Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCXCKn5zDjbwDHwdEROGrKGPxpok7Yndlw",
  authDomain: "styloxio.firebaseapp.com",
  projectId: "styloxio",
  storageBucket: "styloxio.firebasestorage.app",
  messagingSenderId: "1006696685386",
  appId: "1:1006696685386:web:b1d2653cbd8677f472abb3",
  measurementId: "G-WHX3GQHH88"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// -------- Initialize Firestore --------
export const db = getFirestore(app);

// -------- Initialize Auth (for admin login) --------
export const auth = getAuth(app);
