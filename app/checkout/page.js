"use client";

import React from "react";
import CheckoutForm from "@/components/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { convertToSubcurrency } from "@/lib/utils";

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  throw new Error("Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY");
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const Checkout = () => {
  const amount = 11.99;

  return (
    <div className="container mx-auto py-8">
      <div className="text-center py-16">
        <hr className="w-1/12 border-gray-300 mx-auto my-8" />
        <h1 className="text-4xl font-light text-gray-700 tracking-wider">
          {`Dillon has requested $${amount} for the following items:`}
        </h1>
        <h1 className="text-4xl font-light text-gray-700 tracking-wider">
          CHECKOUT
        </h1>
      </div>
      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubcurrency(amount),
          currency: "usd",
        }}
      >
        <CheckoutForm amount={amount} />
      </Elements>
    </div>
  );
};

export default Checkout;
