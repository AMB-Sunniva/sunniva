"use client";

import React, { useState, useEffect } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import Image from "next/image";
import convertToSubcurrency from "@/lib/utils";
import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";
import { db } from "@/firebase"; // Make sure to import your Firestore instance
import { collection, addDoc } from "firebase/firestore"; // Import necessary Firestore methods
import { useForm } from "react-hook-form"; // Import react-hook-form

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); // Initialize useForm
  const [errorMessage, setErrorMessage] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentSection, setCurrentSection] = useState("payment");

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
        .then((data) => setClientSecret(data.clientSecret))
        .catch((error) =>
          console.error("Error creating payment intent:", error)
        );
    } else {
      setClientSecret("");
    }
  }, [totalPrice, cart.length]);

  const onSubmit = async (data) => {
    setLoading(true);

    if (!stripe || !elements) {
      setErrorMessage("Stripe has not loaded properly.");
      setLoading(false);
      return;
    }

    const paymentElement = elements.getElement(PaymentElement);
    if (!paymentElement) {
      setErrorMessage("Payment Element is not loaded.");
      setLoading(false);
      return;
    }

    const orderData = {
      ...data,
      cart,
      totalPrice,
    };

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    // const { error } = await stripe.confirmPayment({
    //   elements,
    //   clientSecret,
    //   confirmParams: {
    //     return_url: `http://www.localhost:3000/payment-success?amount=${totalPrice}`,
    //   },
    // });

    // if (error) {
    //   setErrorMessage(error.message);
    // } else {
    setErrorMessage("");

    // Save order to Firestore
    try {
      // await addDoc(collection(db, "orders"), orderData);
      console.log("Order saved to Firestore:", orderData);
    } catch (error) {
      console.error("Error saving order to Firestore:", error);
    }

    // Redirect to success page
    router.push(`/payment-success?amount=${totalPrice}`);
    // }

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
                <Image
                  src={item.images[0]}
                  width={64}
                  height={64}
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

      <div className="accordion">
        <div
          className={`accordion-item ${
            currentSection === "payment" ? "open" : ""
          }`}
        >
          <div
            className="accordion-header cursor-pointer flex justify-between items-center"
            onClick={() => setCurrentSection("payment")}
          >
            <h3 className="text-2xl font-bold mb-4">Payment Method</h3>
            <span>{currentSection === "payment" ? "▲" : "▼"}</span>
          </div>
          <div className="accordion-body">
            {clientSecret && <PaymentElement />}
            {errorMessage && (
              <div className="text-red-500 mt-4">{errorMessage}</div>
            )}
          </div>
        </div>

        <div
          className={`accordion-item ${
            currentSection === "shipping" ? "open" : ""
          }`}
        >
          <div
            className="accordion-header cursor-pointer flex justify-between items-center"
            onClick={() => setCurrentSection("shipping")}
          >
            <h3 className="text-2xl font-bold mb-4">Shipping Info</h3>
            <span>{currentSection === "shipping" ? "▲" : "▼"}</span>
          </div>
          {currentSection === "shipping" && (
            <div className="accordion-body">
              <form
                onSubmit={handleSubmit(onSubmit)} // Use handleSubmit from react-hook-form
                className="bg-white p-6 rounded-md shadow-md max-w-lg mx-auto"
              >
                {/* Shipping info fields */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    {...register("fullName", {
                      required: "Full Name is required",
                    })}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                  {errors.fullName && (
                    <p className="text-red-500">{errors.fullName.message}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    {...register("email", { required: "Email is required" })}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    {...register("phoneNumber", {
                      required: "Phone Number is required",
                    })}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500">{errors.phoneNumber.message}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    {...register("address", {
                      required: "Address is required",
                    })}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                  {errors.address && (
                    <p className="text-red-500">{errors.address.message}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    {...register("city", { required: "City is required" })}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                  {errors.city && (
                    <p className="text-red-500">{errors.city.message}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    {...register("state", { required: "State is required" })}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                  {errors.state && (
                    <p className="text-red-500">{errors.state.message}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    {...register("zipCode", {
                      required: "ZIP Code is required",
                    })}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                  {errors.zipCode && (
                    <p className="text-red-500">{errors.zipCode.message}</p>
                  )}
                </div>
                <button
                  type="submit"
                  className="text-white w-full py-3 mt-4 bg-blue-600 rounded-md font-bold disabled:opacity-50"
                >
                  Pay ${totalPrice}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
