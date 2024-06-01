// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClzrAZEl5FiZxEuYwziEoU3eIE2Yh2MmM",
  authDomain: "blog-application-new.firebaseapp.com",
  projectId: "blog-application-new",
  storageBucket: "blog-application-new.appspot.com",
  messagingSenderId: "460566984684",
  appId: "1:460566984684:web:d52ca85213c7eb5d54f2c9",
  measurementId: "G-QTV7GS8XW8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
