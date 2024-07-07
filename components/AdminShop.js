"use client";
import React from "react";
import { useRouter } from "next/navigation";
import ProductCard from "@/components/Shop/ProductCard";
import { useFirestore } from "@/app/context/FirestoreContext";

export default function AdminShop() {
  const { products, loading } = useFirestore();
  const router = useRouter();

  if (loading) return <div>Loading...</div>;

  const handleAddProduct = () => {
    router.push("/admin/shop/add-product");
  };

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
          <ProductCard key={product.id} product={product} />
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
