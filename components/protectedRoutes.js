"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext"; // Adjust the import according to your project structure

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login"); // Redirect to login page if not authenticated
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <div>Loading...</div>; // Show loading indicator while checking auth status
  }

  return children;
};

export default ProtectedRoute;
