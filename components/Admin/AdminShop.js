"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/firebase"; // Ensure the correct import path
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
} from "firebase/firestore";
import ProductCard from "@/components/Shop/ProductCard";
import { toast } from "react-toastify";

export default function AdminShop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const q = query(collection(db, "products"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const productsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAddProduct = () => {
    router.push("/admin/shop/add-product");
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteDoc(doc(db, "products", id));
      toast.success("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product. Please try again.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto py-8">
      <div style={{ padding: "6rem 0rem 2rem", textAlign: "center" }}>
        <hr style={{ width: "3%", borderColor: "#333", margin: "30px auto" }} />
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "lighter",
            color: "#474949",
            letterSpacing: "2px",
          }}
        >
          ALL PRODUCTS
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onDelete={handleDeleteProduct}
          />
        ))}
        <div
          className="flex justify-center items-center border-2 border-dashed border-gray-400 p-4 cursor-pointer"
          onClick={handleAddProduct}
        >
          <button className="text-blue-500">Add Product</button>
        </div>
      </div>
    </div>
  );
}
