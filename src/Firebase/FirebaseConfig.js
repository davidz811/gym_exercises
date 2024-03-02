import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDY60dS6C9FnXaKVQ9osvAaZIbMsCEZ4l0",
  authDomain: "loginproject-66e0c.firebaseapp.com",
  projectId: "loginproject-66e0c",
  storageBucket: "loginproject-66e0c.appspot.com",
  messagingSenderId: "94929292610",
  appId: "1:94929292610:web:80f2aafababe02dd20ccdb"
};


const app = initializeApp(firebaseConfig);
export const database = getAuth(app);