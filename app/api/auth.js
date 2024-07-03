import React, { useState } from "react";
import { auth } from "firebaseui";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
