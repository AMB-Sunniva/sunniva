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

const CollapsibleSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      <button
        type="button"
        className="w-full text-left text-xl font-bold text-gray-700 mb-2 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
      </button>
      {isOpen && (
        <div className="px-4 py-2 bg-gray-100 rounded-md">{children}</div>
      )}
    </div>
  );
};

export default function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [endBoardDesigns, setEndBoardDesigns] = useState([]);
  const [lumberSizes, setLumberSizes] = useState([]);
  const [stainColors, setStainColors] = useState([]);
  const [rackingClamps, setRackingClamps] = useState([]);
  const [newSize, setNewSize] = useState("");
  const [newEndBoardDesign, setNewEndBoardDesign] = useState("");
  const [newLumberSize, setNewLumberSize] = useState("");
  const [newStainColor, setNewStainColor] = useState("");
  const [newRackingClamp, setNewRackingClamp] = useState("");
  const router = useRouter();

  const handleImageSelection = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleAddItem = (setFunction, newItem, setNewItem) => {
    if (newItem.trim() !== "") {
      setFunction((prev) => [...prev, newItem.trim()]);
      setNewItem("");
    }
  };

  const handleRemoveItem = (setFunction, item) => {
    setFunction((prev) => prev.filter((i) => i !== item));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      // Add the product without images first to get the document ID
      const productRef = await addDoc(collection(db, "products"), {
        name,
        price,
        description,
        images: [],
        sizes,
        endBoardDesigns,
        lumberSizes,
        stainColors,
        rackingClamps,
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
        type="button"
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full md:w-1/2 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-1"
          />
        </div>
        <div>
          <label className="block text-medium text-custom-gray">Price</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 block w-full md:w-1/4 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-1"
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

        <CollapsibleSection title="Sizes">
          <div className="flex items-center mb-2">
            <input
              type="text"
              id="newSize"
              value={newSize}
              onChange={(e) => setNewSize(e.target.value)}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button
              type="button"
              onClick={() => handleAddItem(setSizes, newSize, setNewSize)}
              className="ml-2 px-2 py-2 bg-blue-500 text-white rounded-md"
            >
              Add
            </button>
          </div>
          <ul>
            {sizes.map((size) => (
              <li key={size} className="flex justify-between items-center mb-2">
                {size}
                <button
                  type="button"
                  onClick={() => handleRemoveItem(setSizes, size)}
                  className="ml-2 px-2 py-1 bg-red-500 text-white rounded-md"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </CollapsibleSection>

        <CollapsibleSection title="End Board Designs">
          <div className="flex items-center mb-2">
            <input
              type="text"
              id="newEndBoardDesign"
              value={newEndBoardDesign}
              onChange={(e) => setNewEndBoardDesign(e.target.value)}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button
              type="button"
              onClick={() =>
                handleAddItem(
                  setEndBoardDesigns,
                  newEndBoardDesign,
                  setNewEndBoardDesign
                )
              }
              className="ml-2 px-2 py-2 bg-blue-500 text-white rounded-md"
            >
              Add
            </button>
          </div>
          <ul>
            {endBoardDesigns.map((design) => (
              <li
                key={design}
                className="flex justify-between items-center mb-2"
              >
                {design}
                <button
                  type="button"
                  onClick={() => handleRemoveItem(setEndBoardDesigns, design)}
                  className="ml-2 px-2 py-1 bg-red-500 text-white rounded-md"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </CollapsibleSection>

        <CollapsibleSection title="Lumber Sizes">
          <div className="flex items-center mb-2">
            <input
              type="text"
              id="newLumberSize"
              value={newLumberSize}
              onChange={(e) => setNewLumberSize(e.target.value)}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button
              type="button"
              onClick={() =>
                handleAddItem(setLumberSizes, newLumberSize, setNewLumberSize)
              }
              className="ml-2 px-2 py-2 bg-blue-500 text-white rounded-md"
            >
              Add
            </button>
          </div>
          <ul>
            {lumberSizes.map((size) => (
              <li key={size} className="flex justify-between items-center mb-2">
                {size}
                <button
                  type="button"
                  onClick={() => handleRemoveItem(setLumberSizes, size)}
                  className="ml-2 px-2 py-1 bg-red-500 text-white rounded-md"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </CollapsibleSection>

        <CollapsibleSection title="Stain Colors">
          <div className="flex items-center mb-2">
            <input
              type="text"
              id="newStainColor"
              value={newStainColor}
              onChange={(e) => setNewStainColor(e.target.value)}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button
              type="button"
              onClick={() =>
                handleAddItem(setStainColors, newStainColor, setNewStainColor)
              }
              className="ml-2 px-2 py-2 bg-blue-500 text-white rounded-md"
            >
              Add
            </button>
          </div>
          <ul>
            {stainColors.map((color) => (
              <li
                key={color}
                className="flex justify-between items-center mb-2"
              >
                {color}
                <button
                  type="button"
                  onClick={() => handleRemoveItem(setStainColors, color)}
                  className="ml-2 px-2 py-1 bg-red-500 text-white rounded-md"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </CollapsibleSection>

        <CollapsibleSection title="Racking Clamps">
          <div className="flex items-center mb-2">
            <input
              type="text"
              id="newRackingClamp"
              value={newRackingClamp}
              onChange={(e) => setNewRackingClamp(e.target.value)}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button
              type="button"
              onClick={() =>
                handleAddItem(
                  setRackingClamps,
                  newRackingClamp,
                  setNewRackingClamp
                )
              }
              className="ml-2 px-2 py-2 bg-blue-500 text-white rounded-md"
            >
              Add
            </button>
          </div>
          <ul>
            {rackingClamps.map((clamp) => (
              <li
                key={clamp}
                className="flex justify-between items-center mb-2"
              >
                {clamp}
                <button
                  type="button"
                  onClick={() => handleRemoveItem(setRackingClamps, clamp)}
                  className="ml-2 px-2 py-1 bg-red-500 text-white rounded-md"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </CollapsibleSection>

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
