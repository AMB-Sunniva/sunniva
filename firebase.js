import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDirD2b0PCcOAyrklRwCndgn7ZyFIOg4TE",
  authDomain: "sunniva-ee7a7.firebaseapp.com",
  projectId: "sunniva-ee7a7",
  storageBucket: "sunniva-ee7a7.appspot.com",
  messagingSenderId: "408147864765",
  appId: "1:408147864765:web:cbee1f7ffd4f2070f95bd4",
  measurementId: "G-K8S72KV0Z0",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
