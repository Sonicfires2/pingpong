// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "your_API_key",
  authDomain: "yor_auth_Domain",
  projectId: "your_firebase_project_id",
  storageBucket: "your_fire_base_storage_id",
  messagingSenderId: "your_message_sender_id",
  appId: "your_app_id",
  measurementId: "your_measurementId"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app)
