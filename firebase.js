import { initializeApp } from "firebase/app";
import { getAuth, EmailAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDirD2b0PCcOAyrklRwCndgn7ZyFIOg4TE",
  authDomain: "sunniva-ee7a7.firebaseapp.com",
  projectId: "sunniva-ee7a7",
  storageBucket: "sunniva-ee7a7.appspot.com",
  messagingSenderId: "408147864765",
  appId: "1:408147864765:web:cbee1f7ffd4f2070f95bd4",
  measurementId: "G-K8S72KV0Z0",
};

// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
//   measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
// };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
