"use client";

import React from "react";
import CheckoutForm from "@/components/CheckoutForm";
import { useRouter } from "next/navigation";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { convertToSubcurrency } from "@/lib/utils";
import { useCart } from "../context/CartContext";

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  throw new Error("Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY");
} else {
  console.log("Stripe Key: ", process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const Checkout = () => {
  const { getTotalPrice, cart } = useCart();
  const totalPrice = getTotalPrice();
  const router = useRouter();

  const stripeOptions = {
    mode: "payment",
    currency: "usd",
  };

  if (totalPrice > 0) {
    stripeOptions.amount = convertToSubcurrency(totalPrice);
  }

  return (
    <div className="container mx-auto py-8">
      <div className="text-center py-16">
        <hr className="w-1/12 border-gray-300 mx-auto my-8" />
        <h1 className="text-4xl font-light text-gray-700 tracking-wider">
          CHECKOUT
        </h1>
      </div>
      {cart.length > 0 ? (
        <Elements stripe={stripePromise} options={stripeOptions}>
          <CheckoutForm />
        </Elements>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-4xl font-bold">
            {`Oops! There's nothing in your cart.`}
          </h1>
          <button
            onClick={() => router.push("/shop")}
            className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-md font-bold"
          >
            Go to Shop
          </button>
        </div>
      )}
    </div>
  );
};

export default Checkout;
