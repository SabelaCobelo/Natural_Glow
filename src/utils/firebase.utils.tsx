// Importa las funciones necesarias desde los SDKs de Firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database"; // Importa getDatabase para Realtime Database

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBzSqP6L666C4qX1HVroU4L3NGms6Ae-vY",
  authDomain: "naturalglow-fd8a3.firebaseapp.com",
  databaseURL: "https://naturalglow-fd8a3-default-rtdb.europe-west1.firebasedatabase.app", // URL de Realtime Database
  projectId: "naturalglow-fd8a3",
  storageBucket: "naturalglow-fd8a3.firebasestorage.app",
  messagingSenderId: "478721386913",
  appId: "1:478721386913:web:4413962571c5801ba543e0",
  measurementId: "G-SVLY283S9Z"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app); // Inicializa Realtime Database

// Exporta las instancias de Firebase para usarlas en otros archivos
export { app, analytics, database };