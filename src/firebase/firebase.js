import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCdIyQ_cKB8epfUnAQ3d9Bl64gxrdLv70Q",
  authDomain: "grocero-app-f5d39.firebaseapp.com",
  projectId: "grocero-app-f5d39",
  storageBucket: "grocero-app-f5d39.appspot.com",
  messagingSenderId: "507475328831",
  appId: "1:507475328831:web:9ce50aa4870d84563a5d8a",
  measurementId: "G-CSRFFR47V1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
