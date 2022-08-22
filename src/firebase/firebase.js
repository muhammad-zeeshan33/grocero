// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {sendPasswordResetEmail} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7OGeB3UJunGWYFMM7GrxseZTyimpMgAI",
  authDomain: "playpik-test.firebaseapp.com",
  databaseURL: "https://playpik-test-default-rtdb.firebaseio.com",
  projectId: "playpik-test",
  storageBucket: "playpik-test.appspot.com",
  messagingSenderId: "1069747165362",
  appId: "1:1069747165362:web:39b8ae1dc4af766d42d1ab",
  measurementId: "G-54P9C0FX8Y"
};

// Initialize Firebase
export const passwordReset = email => {
  return sendPasswordResetEmail(email)
}

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);