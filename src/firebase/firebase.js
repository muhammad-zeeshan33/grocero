// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHFxB1lu0npq9fe7SqQeYl8NhKdeIZvCo",
  authDomain: "playpik-720b5.firebaseapp.com",
  projectId: "playpik-720b5",
  storageBucket: "playpik-720b5.appspot.com",
  messagingSenderId: "892743821535",
  appId: "1:892743821535:web:359098a8f3534067c1a16a",
  measurementId: "G-X4LQW64KTN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);