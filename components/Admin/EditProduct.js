"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { db, storage } from "@/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../Button";
import { IoIosArrowRoundBack } from "react-icons/io";

const CollapsibleSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      <button
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

const EditProduct = () => {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImages, setSelectedImages] = useState([]);
  const [images, setImages] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [newSize, setNewSize] = useState("");
  const [newEndBoardDesign, setNewEndBoardDesign] = useState("");
  const [newLumberSize, setNewLumberSize] = useState("");
  const [newStainColor, setNewStainColor] = useState("");
  const [newRackingClamp, setNewRackingClamp] = useState("");

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const productRef = doc(db, "products", id);
          const productSnap = await getDoc(productRef);
          if (productSnap.exists()) {
            const productData = productSnap.data();
            setProduct({ id: productSnap.id, ...productData });
            setImages(productData.images || []);
          } else {
            console.error("No such document!");
          }
        } catch (error) {
          console.error("Error fetching product:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [id]);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
    setButtonDisabled(false);
  };

  const handleAddItem = (field, newItem, setNewItem) => {
    if (newItem.trim() !== "") {
      setProduct((prevProduct) => ({
        ...prevProduct,
        [field]: [...prevProduct[field], newItem.trim()],
      }));
      setNewItem("");
      setButtonDisabled(false);
    }
  };

  const handleRemoveItem = (field, item) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      [field]: prevProduct[field].filter((i) => i !== item),
    }));
    setButtonDisabled(false);
  };

  const handleFieldUpdate = async () => {
    if (product) {
      try {
        await updateDoc(doc(db, "products", id), product);
        toast.success("Product updated successfully!");
      } catch (error) {
        console.error("Error updating product:", error);
        toast.error("Failed to update product. Please try again.");
      }
    }
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    try {
      // Delete old images
      const deleteOldImages = images.map((url) => {
        const imageRef = ref(storage, url);
        return deleteObject(imageRef);
      });
      await Promise.all(deleteOldImages);

      // Upload new images
      const newImages = await Promise.all(
        selectedImages.map(async (image) => {
          const imageRef = ref(storage, `products/${id}/${image.name}`);
          await uploadBytes(imageRef, image);
          const downloadURL = await getDownloadURL(imageRef);
          return downloadURL;
        })
      );

      // Update Firestore document with new images
      setImages(newImages);
      await updateDoc(doc(db, "products", id), { images: newImages });
      setSelectedImages([]);
      toast.success("Images uploaded successfully!");
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("Failed to upload images. Please try again.");
    }
  };

  const handleImageSelection = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(files);
  };

  const handleBackToProducts = () => {
    router.push("/admin/shop");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto py-8">
      <ToastContainer />
      <button
        onClick={handleBackToProducts}
        className="text-custom-blue bg-white hover:underline flex items-center justify-center"
      >
        <IoIosArrowRoundBack size="1.5em" />
        Back to Products
      </button>
      {product && (
        <div className="flex flex-col md:flex-row items-start justify-center">
          <div className="relative group mb-4 md:mb-0 md:mr-8 w-96 h-96">
            {images.length > 0 && (
              <div className="relative w-full h-full">
                <Image
                  src={images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                {images.length > 1 && (
                  <Image
                    src={images[1]}
                    alt={product.name}
                    fill
                    className="absolute top-0 left-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                )}
              </div>
            )}
            <p className="text-gray-700 mb-4 max-w-[400px]">
              <textarea
                name="description"
                value={product.description}
                onChange={handleFieldChange}
                className="w-full text-gray-700 border border-gray-300 px-1"
              />
            </p>
          </div>
          <div className="text-center md:text-left max-w-md">
            <h1 className="text-3xl font-bold mb-4 text-custom-gray">
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleFieldChange}
                className="w-full text-3xl font-bold mb-4"
              />
            </h1>
            <p className="text-gray-700 mb-4 flex">
              <span className="pr-1">$</span>
              <input
                type="number"
                step="0.01"
                name="price"
                value={product.price}
                onChange={handleFieldChange}
                className="w-1/4 text-gray-700 mb-4 border border-gray-300 px-1"
              />
            </p>
            <p className="text-gray-700 mb-4 flex">
              <select
                name="type"
                value={product.type}
                onChange={handleFieldChange}
                className="text-gray-700 mb-4 border border-gray-300 px-1"
              >
                <option value="" disabled selected>Product Type</option>
                <option value="Solar and Shade Kits">Solar and Shade Kits</option>
                <option value="Just Shade Kits">Just Shade Kits</option>
                <option value="Just Solar Kits">Just Solar Kits</option>
              </select>
            </p>

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
                  onClick={() => handleAddItem("sizes", newSize, setNewSize)}
                  className="ml-2 px-2 py-2 bg-blue-500 text-white rounded-md"
                >
                  Add
                </button>
              </div>
              <ul>
                {product.sizes.map((size) => (
                  <li
                    key={size}
                    className="flex justify-between items-center mb-2"
                  >
                    {size}
                    <button
                      type="button"
                      onClick={() => handleRemoveItem("sizes", size)}
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
                      "endBoardDesigns",
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
                {product.endBoardDesigns.map((design) => (
                  <li
                    key={design}
                    className="flex justify-between items-center mb-2"
                  >
                    {design}
                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveItem("endBoardDesigns", design)
                      }
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
                    handleAddItem(
                      "lumberSizes",
                      newLumberSize,
                      setNewLumberSize
                    )
                  }
                  className="ml-2 px-2 py-2 bg-blue-500 text-white rounded-md"
                >
                  Add
                </button>
              </div>
              <ul>
                {product.lumberSizes.map((size) => (
                  <li
                    key={size}
                    className="flex justify-between items-center mb-2"
                  >
                    {size}
                    <button
                      type="button"
                      onClick={() => handleRemoveItem("lumberSizes", size)}
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
                    handleAddItem(
                      "stainColors",
                      newStainColor,
                      setNewStainColor
                    )
                  }
                  className="ml-2 px-2 py-2 bg-blue-500 text-white rounded-md"
                >
                  Add
                </button>
              </div>
              <ul>
                {product.stainColors.map((color) => (
                  <li
                    key={color}
                    className="flex justify-between items-center mb-2"
                  >
                    {color}
                    <button
                      type="button"
                      onClick={() => handleRemoveItem("stainColors", color)}
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
                      "rackingClamps",
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
                {product.rackingClamps.map((clamp) => (
                  <li
                    key={clamp}
                    className="flex justify-between items-center mb-2"
                  >
                    {clamp}
                    <button
                      type="button"
                      onClick={() => handleRemoveItem("rackingClamps", clamp)}
                      className="ml-2 px-2 py-1 bg-red-500 text-white rounded-md"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </CollapsibleSection>

            <Button onClick={handleFieldUpdate} disabled={buttonDisabled}>
              Update Product
            </Button>

            <form onSubmit={handleImageUpload} className="mt-4">
              <input type="file" multiple onChange={handleImageSelection} />
              <div className="flex mt-2">
                {selectedImages.map((image, index) => (
                  <Image
                    key={index}
                    src={URL.createObjectURL(image)}
                    alt={`Selected Preview ${index}`}
                    width={100}
                    height={100}
                    className="w-32 h-32 object-cover mr-2"
                  />
                ))}
              </div>
              {selectedImages.length > 0 && (
                <button
                  type="submit"
                  className="px-4 py-2 font-thin tracking-2px my-8 border border-custom-blue text-custom-blue bg-white hover:bg-custom-blue hover:text-white"
                >
                  Upload Images
                </button>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProduct;
