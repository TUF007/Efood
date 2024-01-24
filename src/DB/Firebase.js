import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import{getStorage} from 'firebase/storage'
import { getAuth } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyCRnbBOajL8zZbM97FwkXAgA1iU5dQRAeE",
  authDomain: "testing-ac8a5.firebaseapp.com",
  projectId: "testing-ac8a5",
  storageBucket: "testing-ac8a5.appspot.com",
  messagingSenderId: "975431993515",
  appId: "1:975431993515:web:d9d3ba8eb8147c3a3ccfee",
  measurementId: "G-W6WH4STJTD"
};

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const storage = getStorage(app);
export const auth = getAuth(app);


 