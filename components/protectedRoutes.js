"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/"); // Redirect to sign-in page if not authenticated
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <div>Loading...</div>; // Show a loading message while checking auth status
  }

  return children;
}
