// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJ5ZJ2eENhB8XaOk04egRghEng4qMXJqU",
  authDomain: "otpproject-a4762.firebaseapp.com",
  projectId: "otpproject-a4762",
  storageBucket: "otpproject-a4762.appspot.com",
  messagingSenderId: "66717802653",
  appId: "1:66717802653:web:0634d41cee8e2c43bd7474",
  measurementId: "G-VJC2WQNW0Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)