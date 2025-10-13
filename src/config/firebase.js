import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAsHJu6h_2otom3xbT9y-fPrErr048AoU4",
    authDomain: "todo-37da7.firebaseapp.com",
    projectId: "todo-37da7",
    storageBucket: "todo-37da7.firebasestorage.app",
    messagingSenderId: "952520049933",
    appId: "1:952520049933:web:87df947e0ca7c08252dc44"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);