import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDirD2b0PCcOAyrklRwCndgn7ZyFIOg4TE",
  authDomain: "sunniva-ee7a7.firebaseapp.com",
  projectId: "sunniva-ee7a7",
  storageBucket: "sunniva-ee7a7.appspot.com",
  messagingSenderId: "408147864765",
  appId: "1:408147864765:web:cbee1f7ffd4f2070f95bd4",
  measurementId: "G-K8S72KV0Z0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
