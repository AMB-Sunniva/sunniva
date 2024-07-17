"use client";

import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/lib/utils";
import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    getTotalPrice,
  } = useCart();
  const totalPrice = getTotalPrice().toFixed(2);

  useEffect(() => {
    if (cart.length > 0 && totalPrice > 0) {
      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: convertToSubcurrency(totalPrice) }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    } else {
      setClientSecret("");
    }
  }, [totalPrice, cart.length]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements || cart.length === 0 || totalPrice <= 0) {
      setLoading(false);
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://www.localhost:3000/payment-success?amount=${totalPrice}`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
    }

    setLoading(false);
  };

  if (cart.length === 0) {
    return (
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
    );
  }

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold">Checkout</h1>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Cart Summary</h2>
        <div className="bg-white p-4 rounded-md shadow-md">
          {cart.map((item, index) => (
            <div key={index} className="mb-4">
              <div className="flex items-center">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md mr-4"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-bold">{item.name}</h3>
                  <p className="text-gray-600">
                    {item.selectedOptions.selectedSize},{" "}
                    {item.selectedOptions.attachedOrStandAlone},{" "}
                    {item.selectedOptions.endBoardDesign},{" "}
                    {item.selectedOptions.lumberSize},{" "}
                    {item.selectedOptions.stainColor}
                  </p>
                  <p className="text-gray-800">
                    ${item.price} x{" "}
                    <button
                      className="text-blue-500 font-bold mx-2"
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      -
                    </button>{" "}
                    {item.quantity}{" "}
                    <button
                      className="text-blue-500 font-bold mx-2"
                      onClick={() => increaseQuantity(item.id)}
                    >
                      +
                    </button>
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 font-bold ml-4"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="text-right">
            <p className="text-xl font-bold">Total: ${totalPrice}</p>
          </div>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-md shadow-md max-w-lg mx-auto"
      >
        {clientSecret && <PaymentElement />}
        {errorMessage && (
          <div className="text-red-500 mt-4">{errorMessage}</div>
        )}
        <button
          disabled={!stripe || loading || cart.length === 0 || totalPrice <= 0}
          className="text-white w-full py-3 mt-4 bg-blue-600 rounded-md font-bold disabled:opacity-50"
        >
          {!loading ? `Pay $${totalPrice}` : "Processing..."}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
