// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3URP6Mi5Br16fg5FunVUrE81EYFiFCZ4",
  authDomain: "ecowas24.firebaseapp.com",
  projectId: "ecowas24",
  storageBucket: "ecowas24.appspot.com",
  messagingSenderId: "100864262076",
  appId: "1:100864262076:web:dac275a9594fbe3d7275b9",
  measurementId: "G-QK9995CHK8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
getAnalytics(app);
