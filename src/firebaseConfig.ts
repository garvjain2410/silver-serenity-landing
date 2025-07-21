// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Debugging log
console.log("Firebase API Key:", import.meta.env.VITE_FIREBASE_API_KEY);

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "fallback-api-key", // Add fallback
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "fallback-auth-domain",
  projectId: "blog-8ddd7",
  storageBucket: "blog-8ddd7.firebasestorage.app",
  messagingSenderId: "753090311814",
  appId: "1:753090311814:web:7d2cec9d189bece83c8307",
  measurementId: "G-X2S2P2VH6X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);