"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";

const PaymentSuccess = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const amount = searchParams.get("amount");

  if (!amount) {
    return (
      <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500 mt-20 pt-20">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold mb-2">Oops!</h1>
          <h2 className="text-2xl">Something went wrong</h2>
          <p className="mt-5">The amount parameter is missing or invalid.</p>
          <button
            onClick={() => router.push("/")}
            className="mt-5 px-4 py-2 bg-white text-purple-500 rounded-md font-bold"
          >
            Return to Home
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500 mt-20 pt-20">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">Thank you!</h1>
        <h2 className="text-2xl">You successfully sent</h2>
        <div className="bg-white p-2 rounded-md text-purple-500 mt-5 text-4xl font-bold">
          ${amount}
        </div>
        <button
          onClick={() => router.push("/")}
          className="mt-5 px-4 py-2 bg-white text-purple-500 rounded-md font-bold"
        >
          Return to Home
        </button>
      </div>
    </main>
  );
};

const PaymentSuccessPage = () => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <PaymentSuccess />
    </React.Suspense>
  );
};

export default PaymentSuccessPage;
