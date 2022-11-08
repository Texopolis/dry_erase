import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyDvVMvwbvOg-zT6rM2C47-TlGvJIoL1cHo",
  authDomain: "dry-erase.firebaseapp.com",
  projectId: "dry-erase",
  storageBucket: "dry-erase.appspot.com",
  messagingSenderId: "413617582079",
  appId: "1:413617582079:web:224b77e7c96da8ad1f81ca",
  measurementId: "G-7KXWD1RX5J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth();

