"use client";
import Button from "../Button";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/app/context/CartContext";
import { getAuth } from "firebase/auth";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const auth = getAuth();
  console.log(product);

  return (
    <div className="border shadow-md p-4 text-center">
      <Link href={`/product/${product.id}`}>
        {product.images.length > 0 && (
          <div className="relative group">
            <Image
              src={product.images[0]}
              alt={product.productName}
              width={300}
              height={300}
              className="w-64 md:w-96 h-auto object-cover mb-4 md:mb-0 md:mr-8"
            />
            {product.images.length > 1 && (
              <Image
                src={product.images[1]}
                alt={product.productName}
                width={300}
                height={300}
                className="absolute top-0 left-0 w-64 md:w-96 h-auto object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            )}
          </div>
        )}
        <h3 className="text-lg font-semibold mb-2 text-custom-gray">
          {product.name}
        </h3>
        <p className="text-gray-700 mb-2">${product.price}</p>
      </Link>
      {auth.currentUser ? (
        <Link href={`/admin/shop/${product.id}`}>
          <Button>Edit Product</Button>
        </Link>
      ) : (
        <Button type="primary" onClick={() => addToCart(product)}>
          Add to Cart
        </Button>
      )}
    </div>
  );
};

export default ProductCard;
