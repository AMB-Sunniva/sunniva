"use client";
import React, { useState } from "react";
import { auth } from "firebaseui";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import styles from "./page.module.css";
import InstallerSignUp from "@/components/Installer/InstallerSignUp";

export default function Admin() {
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (email, password) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (email, password) => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className={styles.title}>
        <hr style={{ width: "3%", borderColor: "#333", margin: "30px auto" }} />
        <h2>ADMIN SIGN IN</h2>
      </div>
      <div className={styles.installerSection}>
        <p>Placeholder</p>
      </div>

      <InstallerSignUp />
    </div>
  );
}
