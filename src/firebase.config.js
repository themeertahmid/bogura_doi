import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC94KAOZ_eWrA13ceIcDurlHwCtyAZoYeY",
  authDomain: "multibazar-1809b.firebaseapp.com",
  projectId: "multibazar-1809b",
  storageBucket: "multibazar-1809b.appspot.com",
  messagingSenderId: "499965045379",
  appId: "1:499965045379:web:8b8bab6cc30d07c3e649b6"
};

const app = initializeApp(firebaseConfig);


export const  auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app;
