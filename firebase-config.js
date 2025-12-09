// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);
