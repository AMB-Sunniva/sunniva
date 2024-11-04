"use client";
import ProductCard from "@/components/Shop/ProductCard";
import { useFirestore } from "@/app/context/FirestoreContext";
import { useState } from "react";
import Button from "@/components/Button";

export default function Shop() {
  const { products, loading } = useFirestore();

  if (loading) return <div>Loading...</div>;

  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleCategory = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(product => product.type === selectedCategory);

  return (
    <div className="container mx-auto py-8">
      <div style={{ padding: "6rem 0rem 2rem", textAlign: "center" }}>
        <hr style={{ width: "3%", borderColor: "#333", margin: "30px auto" }} />
        <div class="flex space-x-4 justify-center">
          <Button type="secondary" onClick={() => handleCategory('Solar and Shade Kits')}>Solar And Shade</Button>
          <Button type="secondary" onClick={() => handleCategory('Just Shade Kits')}>Just Shade</Button>
          <Button type="secondary" onClick={() => handleCategory('Just Solar Kits')}>Just Solar</Button>
          <Button type="secondary" onClick={() => handleCategory('All')}>All Products</Button>
        </div>
        <div>
          <h1 style={{
              fontSize: "2.5rem",
              fontWeight: "lighter",
              color: "#474949",
              letterSpacing: "2px",
              textTransform: "uppercase",
              paddingBottom: "32px",
            }}> {selectedCategory === 'All' ? 'All Products' : selectedCategory}</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
