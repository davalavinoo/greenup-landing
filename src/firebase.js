import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

  apiKey: "AIzaSyDFDEU-Yi5rCSPn2K_83xC98kTM0swWotw",

  authDomain: "greenup-plantcare.firebaseapp.com",

  projectId: "greenup-plantcare",

  storageBucket: "greenup-plantcare.firebasestorage.app",

  messagingSenderId: "527036515844",

  appId: "1:527036515844:web:8321ebfd5dd1c8d8c19751"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);