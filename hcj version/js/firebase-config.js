// Import the functions you need from the SDKs (using CDN links in HTML, but this config is shared)
// In vanilla JS with module scripts, we can import from URLs

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

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

export { app, auth, db };
