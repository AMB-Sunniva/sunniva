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
import Button from '../Button'
import { IoIosArrowRoundBack } from "react-icons/io";

const EditProduct = () => {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImages, setSelectedImages] = useState([]);
  const [images, setImages] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(true)

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
            console.log("No such document!");
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
    setButtonDisabled(false)
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
        <div className="flex flex-col md:flex-row items-center justify-center">
          {images.length > 0 && (
            <div className="relative group">
              <Image
                src={images[0]}
                alt={product.productName}
                width={300}
                height={300}
                className="w-96 h-96 object-cover mb-4 md:mb-0 md:mr-8"
              />
              {images.length > 1 && (
                <Image
                  src={images[1]}
                  alt={product.productName}
                  width={300}
                  height={300}
                  className="absolute top-0 left-0 w-96 h-96 object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              )}
            </div>
          )}
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold mb-4 text-custom-gray">
              <input
                type="text"
                name="productName"
                value={product.productName}
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
            <p className="text-gray-700">
              <textarea
                name="description"
                value={product.description}
                onChange={handleFieldChange}
                className="w-full text-gray-700 border border-gray-300 px-1"
              />
            </p>

            <Button
              onClick={handleFieldUpdate}
              disabled={buttonDisabled}
            >
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
             {selectedImages.length > 0 && <button
                type="submit"
                className="px-4 py-2 font-thin tracking-2px my-8 border border-custom-blue text-custom-blue bg-white hover:bg-custom-blue hover:text-white"
              >
                Upload Images
              </button>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProduct;
