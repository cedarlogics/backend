import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBfl03fIDkIlH3NLmZaGMMguJnFzZ_dqKM",
  authDomain: "cedarlogics.firebaseapp.com",
  projectId: "cedarlogics",
  storageBucket: "cedarlogics.firebasestorage.app",
  messagingSenderId: "140644517722",
  appId: "1:140644517722:web:5fc34106abc63db692d563",
  measurementId: "G-HX7C5QG8C8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
