"use client";
import "./globals.css";
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AuthProvider } from "./context/AuthContext";
import { FirestoreProvider } from "./context/FirestoreContext";
import { CartProvider, useCart } from "./context/CartContext";
import Cart from "@/components/Cart";

const InnerLayout = ({ children }) => {
  const { isCartOpen, closeCart } = useCart();
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <Cart isCartOpen={isCartOpen} closeCart={closeCart} />
    </>
  );
};
const Layout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta
          name="description"
          content="Sunniva provides cutting-edge solar solutions for carports and gazebos to help you harness the power of the sun."
        />
        <meta
          name="keywords"
          content="solar solutions, carports, gazebos, renewable energy"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <title>Sunniva</title>
        {/* Structured data (JSON-LD) for SEO */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Sunniva",
              "url": "https://yoursunnivawebsite.com",
              "logo": "https://yoursunnivawebsite.com/logo.png",
              "description": "Sunniva offers solar solutions for carports and gazebos."
            }
          `}
        </script>
      </head>
      <body>
        <AuthProvider>
          <FirestoreProvider>
            <CartProvider>
              <InnerLayout>{children}</InnerLayout>
            </CartProvider>
          </FirestoreProvider>
        </AuthProvider>
      </body>
    </html>
  );
};

export default Layout;
