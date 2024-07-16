import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB8yDRBn-fbszBoqUYa9CIeTlfZ0qngQvU",
    authDomain: "ecommerce-c1958.firebaseapp.com",
    projectId: "ecommerce-c1958",
    storageBucket: "ecommerce-c1958.appspot.com",
    messagingSenderId: "366838402527",
    appId: "1:366838402527:web:95eec0c9cb9334da70886a",
    measurementId: "G-586TJSB506"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Obtener las instancias de Auth y Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };