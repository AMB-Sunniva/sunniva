"use client";
import "./globals.css";
import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CustomToastContainer from "../components/Toast/CustomToastContainer";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { AuthProvider } from "./context/AuthContext";
import { FirestoreProvider } from "./context/FirestoreContext";
import { CartProvider } from "./context/CartContext";
import Cart from "@/components/Cart";

export default function Layout({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <title>Sunniva</title>
      </head>
      <body>
        <AuthProvider>
          <FirestoreProvider>
            <CartProvider>
              <Elements
                stripe={loadStripe(
                  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
                )}
              >
                <Header openCart={openCart} />
                <CustomToastContainer />
                <main>{children}</main>
                <Cart isOpen={isCartOpen} closeCart={closeCart} />
                <Footer />
              </Elements>
            </CartProvider>
          </FirestoreProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
