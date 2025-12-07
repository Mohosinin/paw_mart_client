import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId
};





if (!firebaseConfig.apiKey || firebaseConfig.apiKey === 'your_api_key') {
  console.error("Firebase Configuration Error: Environment variables are not loaded.", firebaseConfig);
  throw new Error("Firebase Configuration Error: Please check your .env file and RESTART your development server (npm run dev).");
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
