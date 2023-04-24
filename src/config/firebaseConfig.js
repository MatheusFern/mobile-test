import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyApvhPef-dejafX54l4Fy7FVD7A4WASqrU",
  authDomain: "api-test-3a450.firebaseapp.com",
  projectId: "api-test-3a450",
  storageBucket: "api-test-3a450.appspot.com",
  messagingSenderId: "585849656162",
  appId: "1:585849656162:web:c472e3c25edfd5b4fd123b",
  measurementId: "G-6RESTTNHDY",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export const auth = getAuth(app)
export default db
