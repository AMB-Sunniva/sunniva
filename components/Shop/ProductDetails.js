"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useCart } from "@/app/context/CartContext";
import Button from "@/components/Button";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const productRef = doc(db, "products", id);
          const productSnap = await getDoc(productRef);
          if (productSnap.exists()) {
            const productData = productSnap.data();
            setProduct({ id: productSnap.id, ...productData });
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

  if (loading) return <p>Loading...</p>;

  if (!product) return <p>No product found</p>;

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row items-center justify-center">
        {product.images.length > 0 && (
          <div className="relative group">
            <Image
              src={product.images[0]}
              alt={product.productName}
              width={300}
              height={300}
              className="w-96 h-96 object-cover mb-4 md:mb-0 md:mr-8"
            />
            {product.images.length > 1 && (
              <Image
                src={product.images[1]}
                alt={product.productName}
                width={300}
                height={300}
                className="absolute top-0 left-0 w-96 h-96 object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            )}
          </div>
        )}
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold mb-4">{product.productName}</h1>
          <p className="text-gray-700 mb-4">${product.price}</p>
          <p className="text-gray-700">{product.description}</p>
          <Button type="primary" onClick={() => addToCart(product)}>
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
