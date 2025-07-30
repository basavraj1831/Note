import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { initializeApp } from "firebase/app";

const VITE_FIREBASE_API = import.meta.env.VITE_FIREBASE_API;

const firebaseConfig = {
  apiKey: VITE_FIREBASE_API,
  authDomain: "hd-31-d9ba5.firebaseapp.com",
  projectId: "hd-31-d9ba5",
  storageBucket: "hd-31-d9ba5.firebasestorage.app",
  messagingSenderId: "565045938413",
  appId: "1:565045938413:web:5302dfadb6f48e86ab24e4",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };