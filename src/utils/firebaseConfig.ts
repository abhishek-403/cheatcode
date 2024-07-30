import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBMeRFdkeoo4y-cIrUf5yf49jbKzXHtCc0",
  authDomain: "cheatcode-e75c7.firebaseapp.com",
  projectId: "cheatcode-e75c7",
  storageBucket: "cheatcode-e75c7.appspot.com",
  messagingSenderId: "325134334048",
  appId: "1:325134334048:web:6e413dff4d6d6ce35beb05",
  measurementId: "G-RQCJSPJZ1M",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
