import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBgRG2_bXcBjKH9I5u1-SE0BEUTntnPC2Y",
  authDomain: "grocero-c6d7f.firebaseapp.com",
  projectId: "grocero-c6d7f",
  storageBucket: "grocero-c6d7f.appspot.com",
  messagingSenderId: "656914242084",
  appId: "1:656914242084:web:97629ba3fc007cf1a8d6b1",
  measurementId: "G-P4DY3896FW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
