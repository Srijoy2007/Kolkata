// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnhNJCKSR83sooZZaLcbR6fysJj5osZlM",
  authDomain: "kolkatafm-e084f.firebaseapp.com",
  projectId: "kolkatafm-e084f",
  storageBucket: "kolkatafm-e084f.appspot.com",
  messagingSenderId: "291644698473",
  appId: "1:291644698473:web:7e5bd6e34962df21c617f8",
  measurementId: "G-SVM7FPBRTJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);