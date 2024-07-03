"use client";
import React, { useEffect, useState } from "react";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Admin() {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const SignIn = async (email, password) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin/shop");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const SignOut = async () => {
    setLoading(true);
    try {
      await auth.signOut();
      router.push("/admin"); // Navigate to home after successful sign-out
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentUser) {
      await SignOut();
    } else {
      await SignIn(email, password);
    }
  };

  if (loading)
    return (
      <div className="pt-48 pb-8 text-center">
        <div className="flex justify-center w-screen h-screen text-center">
          Loading...
        </div>
      </div>
    );

  return (
    <div>
      <div className="pt-28 pb-8 text-center">
        <hr style={{ width: "3%", borderColor: "#333", margin: "30px auto" }} />
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "lighter",
            color: "#474949",
            letterSpacing: "2px",
          }}
        >
          {currentUser ? "ADMIN DASHBOARD" : "ADMIN SIGN IN"}
        </h1>
      </div>
      <div className="flex justify-center w-screen h-screen text-center">
        <form className="w-full flex justify-center " onSubmit={handleSubmit}>
          {currentUser ? (
            <div className="pt-28 pb-8 text-center">
              <input
                className="bg-[#253760] text-white border border-[#253760] px-4 py-2 cursor-pointer transition-colors duration-300 font-light tracking-wider w-[150px] hover:bg-[#1e2e4d]"
                type="submit"
                value="Logout"
              />
            </div>
          ) : (
            <div className="w-6/12">
              <div className="w-full p-2 border border-gray-200 bg-gray-200 placeholder-black placeholder-opacity-50 placeholder-font-light m-4">
                <label htmlFor="email"></label>
                <input
                  className="w-full p-2 border border-gray-200 bg-gray-200 box-border placeholder-black placeholder-opacity-50 placeholder-font-light"
                  type="email"
                  name="email"
                  placeholder="EMAIL"
                  autoComplete="on"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="w-full p-2 border border-gray-200 bg-gray-200 placeholder-black placeholder-opacity-50 placeholder-font-light m-4">
                <label htmlFor="password"></label>
                <input
                  className="w-full p-2 border border-gray-200 bg-gray-200 box-border placeholder-black placeholder-opacity-50 placeholder-font-light"
                  type="password"
                  name="password"
                  placeholder="PASSWORD"
                  autoComplete="on"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="">
                <input
                  className="bg-[#253760] text-white border border-[#253760] px-4 py-2 cursor-pointer transition-colors duration-300 font-light tracking-wider w-[150px] hover:bg-[#1e2e4d]"
                  type="submit"
                  value="Login"
                />
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
