import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDSC4UULriXg_mZpPXrRq7xHT-kzZIp3VA",
  authDomain: "adeno-europe.firebaseapp.com",
  projectId: "adeno-europe",
  storageBucket: "adeno-europe.appspot.com",
  messagingSenderId: "904874489764",
  appId: "1:904874489764:web:06e066c3f4407fa0217331",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore(app);

export { auth, db };
