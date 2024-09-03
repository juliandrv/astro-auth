// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAF8Kt88tL8dD5THYEoG5ytmTvlSp2q6RY',
  authDomain: 'astro-autenticacion.firebaseapp.com',
  projectId: 'astro-autenticacion',
  storageBucket: 'astro-autenticacion.appspot.com',
  messagingSenderId: '122757343432',
  appId: '1:122757343432:web:6890c74ff7b64556e0ddfd',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
auth.languageCode = 'es';

export const firebase = {
  app,
  auth,
};
