// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyAB3WZS_5M5vHhN52ZCQRWsVT8MUs1WHMY',
	authDomain: 'lifo-95316.firebaseapp.com',
	projectId: 'lifo-95316',
	storageBucket: 'lifo-95316.appspot.com',
	messagingSenderId: '732294534920',
	appId: '1:732294534920:web:94543a524dae9c40fd3ebd',
	measurementId: 'G-P73FG37HYV',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

// Emulator
connectAuthEmulator(auth, 'http://localhost:9099');
connectFirestoreEmulator(db, 'localhost', 8080);

export { auth, db };
export default app;
