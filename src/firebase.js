import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAkwx8w1Q9lCFzYdncs51OWV_w6OsaPxww",
    authDomain: "stylenciadotme.firebaseapp.com",
    projectId: "stylenciadotme",
    storageBucket: "stylenciadotme.firebasestorage.app",
    messagingSenderId: "129027062202",
    appId: "1:129027062202:web:6e850f2f1172df47ab4583",
    measurementId: "G-7TNMND17YF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
