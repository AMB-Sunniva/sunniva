"use client";
import ProductCard from "@/components/Shop/ProductCard";
import { useFirestore } from "@/app/context/FirestoreContext";
import { useState } from "react";
import Button from "@/components/Button";
import { IoIosArrowRoundBack } from "react-icons/io";

export default function Shop() {
  const { products, loading } = useFirestore();
  const [selectedCategory, setSelectedCategory] = useState(null);

  if (loading) return <div>Loading...</div>;

  const filteredProducts = selectedCategory
    ? products.filter(product => product.type === selectedCategory) 
    : [];

  const handleCategory = (category) => {
    setSelectedCategory(category);
  };

  const handleBackClick = () => {
    setSelectedCategory(null);
  };

  return (
    <div className="container mx-auto py-8">
      <div style={{ padding: "6rem 0rem 2rem", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <hr style={{ width: "3%", borderColor: "#333", margin: "30px auto" }} />
       {selectedCategory ? (
        <div>
          <h1 style={{
            fontSize: "2.5rem",
            fontWeight: "lighter",
            color: "#474949",
            letterSpacing: "2px",
            textTransform: "uppercase",
            paddingBottom: "32px",
          }}>{selectedCategory}</h1>
          <button
            onClick={handleBackClick}
            type="button"
            className="text-custom-blue bg-white hover:underline flex items-center justify-center pb-3"
          >
            <IoIosArrowRoundBack size="1.5em" />
            Back to Products
          </button>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
       ) : (
       <div className="flex flex-col md:flex-row md:gap-x-4 w-5/6 md:w-3/4 p-2 h-[50vh]">
          <Button type="kitButton" onClick={() => handleCategory('Solar and Shade Kits')}>Solar And Shade</Button>
          <Button type="kitButton" onClick={() => handleCategory('Just Shade Kits')}>Just Shade</Button>
          <Button type="kitButton" onClick={() => handleCategory('Just Solar Kits')}>Just Solar</Button>
        </div>
        )}
      </div>
    </div>
  );
}
