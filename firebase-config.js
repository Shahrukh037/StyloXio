// ---------- Firebase Initialization ----------
// Go to Firebase console → Project Settings → Your Apps → Web App
// Copy your original keys and replace the placeholders below

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// ---------- Initialize Firebase ----------
firebase.initializeApp(firebaseConfig);

// ---------- Initialize Firestore ----------
const db = firebase.firestore();
