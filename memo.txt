// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD184lWTgmtdFBEV_E14Zf53iFwQo0Ss8o',
  authDomain: 'fir-test-5f5b4.firebaseapp.com',
  projectId: 'fir-test-5f5b4',
  storageBucket: 'fir-test-5f5b4.appspot.com',
  messagingSenderId: '183128370960',
  appId: '1:183128370960:web:bd8708e34edcf3613abf95'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
