// Firebase v8 compatible config
var firebaseConfig = {
  apiKey: "AIzaSyCXCKn5zDjbwDHwdEROGrKGPxpok7Yndlw",
  authDomain: "styloxio.firebaseapp.com",
  projectId: "styloxio",
  storageBucket: "styloxio.appspot.com", 
  messagingSenderId: "1006696685386",
  appId: "1:1006696685386:web:a1b5423a59c97b3972abb3",
};

// Initialize Firebase (v8 syntax)
firebase.initializeApp(firebaseConfig);

// Make global handles
const auth = firebase.auth();
const db = firebase.firestore();
