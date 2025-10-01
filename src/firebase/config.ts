import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// Configuración de Firebase usando variables de entorno
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBu1f2akQ0vx79YFFTYePMlO6Vj07M2Y_Q",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "freshrichie-eed20.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "freshrichie-eed20",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "freshrichie-eed20.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "565939562411",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:565939562411:web:f14392e334f2bfc822d4ee"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Obtener referencia a Storage
export const storage = getStorage(app);

export default app;
