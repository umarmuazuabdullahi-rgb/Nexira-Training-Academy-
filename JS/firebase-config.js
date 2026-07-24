
/* =========================================================
   Firebase Configuration
   ========================================================= */

// TODO: Replace with your Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyDudpxTixo4F7NpyKnQEHifTIfdHXzXA8E",
  authDomain: "nexira-academy.firebaseapp.com",
  databaseURL: "https://nexira-academy-default-rtdb.firebaseio.com",
  projectId: "nexira-academy",
  storageBucket: "nexira-academy.firebasestorage.app",
  messagingSenderId: "1060754382165",
  appId: "1:1060754382165:web:c751e6c0d35c660b8ca3dc",
  measurementId: "G-N7ZZ274XRX"
};

// Initialize Firebase
if (typeof firebase !== 'undefined') {
  firebase.initializeApp(firebaseConfig);
  window.db = firebase.firestore();
  window.auth = firebase.auth();
  console.log('Firebase initialized');
} else {
  console.error('Firebase SDK not loaded. Please add Firebase scripts to HTML.');
}
