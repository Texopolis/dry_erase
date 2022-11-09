import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDvVMvwbvOg-zT6rM2C47-TlGvJIoL1cHo",
  authDomain: "dry-erase.firebaseapp.com",
  projectId: "dry-erase",
  storageBucket: "dry-erase.appspot.com",
  messagingSenderId: "413617582079",
  appId: "1:413617582079:web:224b77e7c96da8ad1f81ca",
  measurementId: "G-7KXWD1RX5J",
  databaseURL: "https://dry-erase-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth();
export const database = getDatabase(app);
export const db = getFirestore(app)
