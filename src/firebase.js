import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAi9OTqNDUIf3qW2RPxkX5sp-g88Dp3tRg",
  authDomain: "home-scope-9e283.firebaseapp.com",
  projectId: "home-scope-9e283",
  storageBucket: "home-scope-9e283.appspot.com",
  messagingSenderId: "267182827852",
  appId: "1:267182827852:web:80cade39e1724f66c107e9",
  measurementId: "G-7F8CGDPX2Z"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const auth=firebase.auth();
const provider =new firebase.auth.GoogleAuthProvider();
const db=app.firestore();
const storage=firebase.storage();
export {auth,provider,storage};
export default db;