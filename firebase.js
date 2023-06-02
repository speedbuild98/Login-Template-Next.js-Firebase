// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7BMPeOhM3WoV1ngO2lGac15BvnDVHURc",
  authDomain: "tasks-e3f1f.firebaseapp.com",
  projectId: "tasks-e3f1f",
  storageBucket: "tasks-e3f1f.appspot.com",
  messagingSenderId: "516343716922",
  appId: "1:516343716922:web:13fc4a61494bc6e4356903",
  measurementId: "G-XKNCCSKYYC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);