// ---------- Firebase Initialization ----------
const firebaseConfig = {
  apiKey: "AIzaSyCXCKn5zDjbwDHwdEROGrKGPxpok7Yndlw",
  authDomain: "styloxio.firebaseapp.com",
  projectId: "styloxio",
  storageBucket: "styloxio.appspot.com",
  messagingSenderId: "1006696685386",
  appId: "1:1006696685386:web:b1d2653cbd8677f472abb3",
  measurementId: "G-WHX3GQHH88"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

// Initialize Auth (Admin Panel Login)
const auth = firebase.auth();
