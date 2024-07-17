"use client";
import "./globals.css";
import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
// import CustomToastContainer from "../components/Toast/CustomToastContainer";
import { AuthProvider } from "./context/AuthContext";
import { FirestoreProvider } from "./context/FirestoreContext";
import { CartProvider, useCart } from "./context/CartContext";
import Cart from "@/components/Cart";


const InnerLayout = ({ children }) => {
  const { isCartOpen, closeCart } = useCart();
  return (
    <>
      <Header />
      {/* <CustomToastContainer /> */}
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
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <title>Sunniva</title>
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
}

export default Layout;