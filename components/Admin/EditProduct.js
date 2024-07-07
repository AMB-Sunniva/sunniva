"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { db, storage } from "@/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const EditProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImages, setSelectedImages] = useState([]);
  const [images, setImages] = useState([]);

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
  };

  const handleFieldUpdate = async () => {
    if (product) {
      try {
        await updateDoc(doc(db, "products", id), product);
        alert("Product updated successfully!");
      } catch (error) {
        console.error("Error updating product:", error);
        alert("Failed to update product. Please try again.");
      }
    }
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    try {
      const newImages = await Promise.all(
        selectedImages.map(async (image) => {
          const imageRef = ref(storage, `products/${id}/${image.name}`);
          await uploadBytes(imageRef, image);
          const downloadURL = await getDownloadURL(imageRef);
          return downloadURL;
        })
      );

      const updatedImages = [...images, ...newImages];
      setImages(updatedImages);
      await updateDoc(doc(db, "products", id), { images: updatedImages });
      setSelectedImages([]);
      alert("Images uploaded successfully!");
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Failed to upload images. Please try again.");
    }
  };

  const handleImageSelection = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(files);
  };

  if (loading) return <p>Loading...</p>;

  console.log(images);

  return (
    <div className="container mx-auto py-8">
      {product && (
        <div className="flex flex-col md:flex-row items-center justify-center">
          {images.length > 0 && (
            <div className="relative group">
              <Image
                src={images[0]}
                alt={product.productName}
                width={300}
                height={300}
                className="w-64 md:w-96 h-auto object-cover mb-4 md:mb-0 md:mr-8"
              />
              {images.length > 1 && (
                <Image
                  src={images[1]}
                  alt={product.productName}
                  width={300}
                  height={300}
                  className="absolute top-0 left-0 w-64 md:w-96 h-auto object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              )}
            </div>
          )}
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold mb-4">
              <input
                type="text"
                name="productName"
                value={product.productName}
                onChange={handleFieldChange}
                className="w-full text-3xl font-bold mb-4"
              />
            </h1>
            <p className="text-gray-700 mb-4">
              $
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleFieldChange}
                className="w-full text-gray-700 mb-4"
              />
            </p>
            <p className="text-gray-700">
              <textarea
                name="description"
                value={product.description}
                onChange={handleFieldChange}
                className="w-full text-gray-700"
              />
            </p>

            <button
              onClick={handleFieldUpdate}
              className="bg-blue-500 text-white py-2 px-4 mt-4 rounded"
            >
              Update Product
            </button>

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
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 mt-4 rounded"
              >
                Upload Images
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProduct;
