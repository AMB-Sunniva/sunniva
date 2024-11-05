"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { db, storage } from "@/firebase"; // Ensure the correct import path
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  getDoc,
} from "firebase/firestore";
import { ref, deleteObject, listAll } from "firebase/storage";
import ProductCard from "@/components/Shop/ProductCard";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Button from "../Button";
import { IoIosArrowRoundBack } from "react-icons/io";

export default function AdminShop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredProducts = selectedCategory
  ? products.filter(product => product.type === selectedCategory) 
  : [];

  const handleCategory = (category) => {
    setSelectedCategory(category);
  };

  const handleBackClick = () => {
    setSelectedCategory(null);
  };

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
      // Fetch the product document
      const productRef = doc(db, "products", id);
      const productSnap = await getDoc(productRef);
      if (productSnap.exists()) {
        const productData = productSnap.data();
        const images = productData.images || [];

        // List and delete all objects in the product's folder
        const folderRef = ref(storage, `products/${id}`);
        const { items } = await listAll(folderRef);

        const deletePromises = items.map((itemRef) => deleteObject(itemRef));
        await Promise.all(deletePromises);

        // Delete the product document
        await deleteDoc(productRef);
        toast.success("Product and associated images deleted successfully!");
      } else {
        toast.error("Product does not exist!");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product. Please try again.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto py-8">
      <ToastContainer />
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
              }}> {selectedCategory === 'All' ? 'All Products' : selectedCategory}</h1>
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
                <button className="text-custom-blue">Add Product</button>
              </div>
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
