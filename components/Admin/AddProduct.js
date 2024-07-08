"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { db, storage } from "@/firebase"; // Adjust the import according to your project structure
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoIosArrowRoundBack } from "react-icons/io";

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
      // Add the product without images first to get the document ID
      const productRef = await addDoc(collection(db, "products"), {
        productName,
        price,
        description,
        images: [],
      });

      const newImages = await Promise.all(
        selectedImages.map(async (image) => {
          const imageRef = ref(
            storage,
            `products/${productRef.id}/${image.name}`
          );
          await uploadBytes(imageRef, image);
          const downloadURL = await getDownloadURL(imageRef);
          return downloadURL;
        })
      );

      // Update the product document with the image URLs
      await updateDoc(doc(db, "products", productRef.id), {
        images: newImages,
      });

      toast.success("Product added successfully!");
      router.push("/admin/shop");
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product. Please try again.");
    }
  };

  const handleBackToProducts = () => {
    router.push("/admin/shop");
  };

  return (
    <div className="container mx-auto py-8 w-1/2">
      <ToastContainer />
      <button
        onClick={handleBackToProducts}
        className="text-custom-blue bg-white hover:underline flex items-center justify-center pb-3"
        >
          <IoIosArrowRoundBack size="1.5em" />
        Back to Products
      </button>
      <h1 className="text-3xl font-bold mb-4 text-custom-gray">Add Product</h1>
      <form onSubmit={handleAddProduct} className="space-y-4">
        <div>
          <label className="block text-medium text-custom-gray">
            Product Name
          </label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="mt-1 block w-1/2 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-1"
          />
        </div>
        <div>
          <label className="block text-medium text-custom-gray">
            Price
          </label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 block w-1/4 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-1"
          />
        </div>
        <div>
          <label className="block text-medium text-custom-gray">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-1"
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
          className="px-4 py-2 font-thin tracking-2px my-8 bg-custom-blue text-white hover:bg-white hover:text-custom-blue border border-custom-blue"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
