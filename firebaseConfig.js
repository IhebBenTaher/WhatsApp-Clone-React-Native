// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlytHc06_sEE4VtBS0g2PhDdwk_r4-9rM",
  authDomain: "whatsapp-486ec.firebaseapp.com",
  databaseURL: "https://whatsapp-486ec-default-rtdb.firebaseio.com",
  projectId: "whatsapp-486ec",
  storageBucket: "whatsapp-486ec.firebasestorage.app",
  messagingSenderId: "1047129964181",
  appId: "1:1047129964181:web:fd2e012c0f1cc6985e259c",
  measurementId: "G-EF5PWMGVE3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };
