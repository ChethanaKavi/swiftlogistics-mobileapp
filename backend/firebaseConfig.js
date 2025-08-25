// src/firebaseConfig.js
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAbblA_9kmaX4-TFMG4KOwrt4NP2kiL_4I",
  authDomain: "swiftlogistics-52aef.firebaseapp.com",
  projectId: "swiftlogistics-52aef",
  storageBucket: "swiftlogistics-52aef.appspot.com",
  messagingSenderId: "269777507759",
  appId: "1:269777507759:web:c725a82c9fea51bef8cb5a",
  measurementId: "G-DXMGK4SBRY"
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);