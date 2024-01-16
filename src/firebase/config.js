import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyBohuXS1xSZM-D46BmUbgSOT4c9kReQFmY",
  authDomain: "thsept--ecommerce.firebaseapp.com",
  projectId: "thsept--ecommerce",
  storageBucket: "thsept--ecommerce.appspot.com",
  messagingSenderId: "14456139712",
  appId: "1:14456139712:web:dd88eb0651875b53eba225"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const db=getFirestore(app)
export const storage=getStorage(app)
export default app