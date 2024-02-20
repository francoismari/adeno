import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth/react-native";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyDSC4UULriXg_mZpPXrRq7xHT-kzZIp3VA",
  authDomain: "adeno-europe.firebaseapp.com",
  projectId: "adeno-europe",
  storageBucket: "adeno-europe.appspot.com",
  messagingSenderId: "904874489764",
  appId: "1:904874489764:web:06e066c3f4407fa0217331",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const functions = getFunctions(app);
const db = getFirestore(app);

export { auth, functions, db };
