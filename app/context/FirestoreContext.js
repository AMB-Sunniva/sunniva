import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";

const FirestoreContext = createContext();

export const FirestoreProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProducts = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsList);
    } catch (error) {
      console.error("Error fetching products: ", error);
    } finally {
      setLoading(false);
    }
  };

  const getPrices = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "prices"));
      const pricesList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPrices(pricesList);
    } catch (error) {
      console.error("Error fetching prices: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
    getPrices();
  }, []);

  return (
    <FirestoreContext.Provider value={{ products, prices, loading }}>
      {children}
    </FirestoreContext.Provider>
  );
};

export const useFirestore = () => useContext(FirestoreContext);
