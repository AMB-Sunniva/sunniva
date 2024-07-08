"use client";
import Button from "@/components/Button";
import Image from "next/image";
import { useCart } from "@/app/context/CartContext";

const ProductDetails = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row items-center justify-center">
        <Image
          src={product.images[0]}
          alt={product.productName}
          width={300}
          height={300}
          className="w-96 h-96 object-cover mb-4 md:mb-0 md:mr-8"
        />
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
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
