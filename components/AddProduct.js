"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { db, storage } from "@/firebase"; // Adjust the import according to your project structure
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Image from "next/image";

export default function AddProduct() {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const router = useRouter();

  const handleImageSelection = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const newImages = await Promise.all(
        selectedImages.map(async (image) => {
          const imageRef = ref(storage, `products/${image.name}`);
          await uploadBytes(imageRef, image);
          const downloadURL = await getDownloadURL(imageRef);
          return downloadURL;
        })
      );

      await addDoc(collection(db, "products"), {
        productName,
        price,
        description,
        images: newImages,
      });
      alert("Product added successfully!");
      router.push("/admin/shop");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Add Product</h1>
      <form onSubmit={handleAddProduct} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Images
          </label>
          <input type="file" multiple onChange={handleImageSelection} />
          <div className="flex mt-2">
            {imagePreviews.map((src, index) => (
              <Image
                key={index}
                src={src}
                alt={`Selected Preview ${index}`}
                width={100}
                height={100}
                className="w-32 h-32 object-cover mr-2"
              />
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
