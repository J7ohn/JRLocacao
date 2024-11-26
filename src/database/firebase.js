import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Importação do autenticador

const firebaseConfig = {
  apiKey: "AIzaSyAIkXX2Vb0Bb-mg2JxEcJqbGdFdMpVMAhY",
  authDomain: "jr-locacao.firebaseapp.com",
  projectId: "jr-locacao",
  storageBucket: "jr-locacao.firebasestorage.app",
  messagingSenderId: "309804698636",
  appId: "1:309804698636:web:ededfcb762c6864a61f229",
  measurementId: "G-ESZ1D0ET1K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app); // Inicializa e exporta o autenticador do Firebase

export { db, app, auth }; // Exporta o autenticador