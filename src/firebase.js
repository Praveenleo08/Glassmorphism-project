// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDroEhPxbrrFUgaX2qdt8Ji25x-A4gxeok",
    authDomain: "glassmorphismauth.firebaseapp.com",
    projectId: "glassmorphismauth",
    storageBucket: "glassmorphismauth.firebasestorage.app",
    messagingSenderId: "750262592542",
    appId: "1:750262592542:web:ee862ac80658212b223a0f",
    measurementId: "G-QZ5Q7JWFXK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };        