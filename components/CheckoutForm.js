"use client";

import React, { useState, useEffect } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { db } from "@/firebase";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { useCart } from "@/app/context/CartContext";
import convertToSubcurrency from "@/lib/utils";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentSection, setCurrentSection] = useState("payment");

  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    getTotalPrice,
  } = useCart();
  const totalPrice = getTotalPrice().toFixed(2);

  useEffect(() => {
    if (cart.length > 0 && totalPrice > 0) {
      const createPaymentIntent = async () => {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL;
          const endpoint =
            apiUrl === "http://localhost:3000"
              ? "/api/create-payment-intent/"
              : "https://us-central1-sunniva-ee7a7.cloudfunctions.net/createPaymentIntent";

          const response = await fetch(endpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ amount: convertToSubcurrency(totalPrice) }),
          });

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();

          if (data.error) {
            throw new Error(data.error);
          }

          return data.clientSecret;
        } catch (error) {
          console.error("Error creating payment intent checkout form:", error);
          setErrorMessage(error.message);
        }
      };

      createPaymentIntent().then((clientSecret) => {
        setClientSecret(clientSecret);
      });
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
      cart: cart.map(({ images, ...rest }) => rest),
      totalPrice: parseFloat(totalPrice),
      paymentStatus: "pending",
      createdAt: new Date(),
    };

    let orderDocRef;

    try {
      // Add order data to Firestore
      orderDocRef = await addDoc(collection(db, "orders"), orderData);

      // Submit the payment
      const { error: submitError } = await elements.submit();
      if (submitError) {
        throw new Error(submitError.message);
      }

      // Confirm the payment with Stripe
      const { error: stripeError, paymentIntent } = await stripe.confirmPayment(
        {
          elements,
          clientSecret,
          handleActions: false,
          confirmParams: {
            return_url: `${window.location.origin}/payment-success?amount=${totalPrice}`,
          },
        }
      );

      if (stripeError) {
        throw new Error(stripeError.message);
      }

      // Update Firestore order status
      await updateDoc(doc(db, "orders", orderDocRef.id), {
        paymentStatus: "paid",
        stripeId: paymentIntent.id,
      });

      // Confirm the order and send confirmation email
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const confirmEndpoint =
        apiUrl === "http://localhost:3000"
          ? "/api/order-confirmation"
          : "https://us-central1-sunniva-ee7a7.cloudfunctions.net/sendOrderConfirmation";

      const sendConfirmationEmails = await fetch(confirmEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: orderDocRef.id,
          address: data.address,
          city: data.city,
          state: data.state,
          zipCode: data.zipCode,
          fullName: data.fullName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          cart: orderData.cart,
          totalPrice: orderData.totalPrice,
          paymentStatus: "paid",
        }),
      });

      if (!sendConfirmationEmails.ok) {
        throw new Error("Failed to confirm order");
      }

      clearCart();

      router.push(`/payment-success?amount=${totalPrice}`);
    } catch (error) {
      console.error("Error during checkout process:", error);
      setErrorMessage(error.message);

      if (orderDocRef) {
        await updateDoc(doc(db, "orders", orderDocRef.id), {
          paymentStatus: "failed",
        });
      }
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
