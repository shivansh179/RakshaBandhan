import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4wdNLZKsUGMbQ_lrEPvkuwukWyZg2Xbs",
  authDomain: "rakshabandhan-2a474.firebaseapp.com",
  projectId: "rakshabandhan-2a474",
  storageBucket: "rakshabandhan-2a474.appspot.com",
  messagingSenderId: "802539804371",
  appId: "1:802539804371:web:becbae83c3fdcf8f8de626"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
const storage = getStorage(app);

export { app, storage };
