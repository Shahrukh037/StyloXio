const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "styloxio.firebaseapp.com",
  projectId: "styloxio",
  storageBucket: "styloxio.appspot.com",
  messagingSenderId: "YOUR_ID",
  appId: "YOUR_APP_ID",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
