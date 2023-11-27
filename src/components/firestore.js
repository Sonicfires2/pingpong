// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCa1a6_ZK4CEjcZZxs4-KEMJgPRNyWkbj4",
  authDomain: "pingpong-9f367.firebaseapp.com",
  projectId: "pingpong-9f367",
  storageBucket: "pingpong-9f367.appspot.com",
  messagingSenderId: "383976865114",
  appId: "1:383976865114:web:e05a6bc5ed8385607ac763",
  measurementId: "G-7EB80KHJ8E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app)
