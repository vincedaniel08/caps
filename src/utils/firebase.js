import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "@firebase/storage";
//import { getStorage } from "firebase/storage";
import "firebase/compat/auth";
import "firebase/compat/firestore";
//import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyASKvWryQX50g9Tf6VS9ZWCnbqVcLqS7rA",
  authDomain: "capstone-ecommerce-f050a.firebaseapp.com",
  databaseURL:"https://capstone-ecommerce-f050a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "capstone-ecommerce-f050a",
  storageBucket: "capstone-ecommerce-f050a.appspot.com",
  messagingSenderId: "403165035859",
  appId: "1:403165035859:web:ac0f338f6a388576b4f5a6",
  
  // apiKey: process.env.REACT_APP_API_KEY,
  // authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  // databaseURL: process.env.REACT_APP_DATABASE_URL,
  // projectId: process.env.REACT_APP_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_APP_ID,
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
