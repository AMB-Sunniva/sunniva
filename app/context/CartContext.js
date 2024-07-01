"use client"
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart(prevCart => {
        const itemIndex = prevCart.findIndex(cartItem => cartItem.id === item.id);
        if (itemIndex > -1) {
          const newCart = prevCart.map(cartItem => {
            if (cartItem.id === item.id) {
              return { ...cartItem, quantity: cartItem.quantity + 1 };
            }
            return cartItem;
          });
          return newCart;
        } else {
          return [...prevCart, { ...item, quantity: 1 }];
        }
      });
  };

  const removeFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const increaseQuantity = (itemId) => {
    setCart(prevCart => {
        return prevCart.map(item => {
          if (item.id === itemId) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      });
  };

  const decreaseQuantity = (itemId) => {
    setCart(prevCart => {
        return prevCart.map(item => {
          if (item.id === itemId) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        }).filter(item => item.quantity > 0);
      });
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

// import React from "react"

// const CartContext = React.createContext({
//     items: [],
//     totalAmount: 0,
//     addItem: (item) => {},
//     removeItem: (id) => {},
//     clearCart: () => {}
// })

// export default CartContext
