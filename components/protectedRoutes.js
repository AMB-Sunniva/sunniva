"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../app/context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/admin"); // Redirect to sign-in page if not authenticated
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading message while checking auth status
  }

  return children;
}
