"use client"
import "./globals.css";
import React, {useState} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { CartProvider } from "./context/CartContext";
import Cart from "@/components/Cart";

export default function Layout({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <title>Sunniva</title>
      </head>
      <body>
        <CartProvider>
          <Header openCart={openCart} />
          <main>{children}</main>
          <Cart isOpen={isCartOpen} closeCart={closeCart} />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
