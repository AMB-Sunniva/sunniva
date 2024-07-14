"use client";
import Button from "../Button";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/app/context/CartContext";
import { getAuth } from "firebase/auth";
import { FiTrash2 } from "react-icons/fi";

const ProductCard = ({ product, onDelete }) => {
  const { addToCart } = useCart();
  const auth = getAuth();

  return (
    <div className="border shadow-md p-4 text-center relative">
      <Link href={`/product/${product.id}`}>
        {product.images.length > 0 && (
          <div className="relative group">
            <Image
              src={product.images[0]}
              alt={product.name}
              width={300}
              height={300}
              className="w-96 h-96 object-cover mb-4 md:mb-0 md:mr-8"
            />
            {product.images.length > 1 && (
              <Image
                src={product.images[1]}
                alt={product.name}
                width={300}
                height={300}
                className="absolute top-0 left-0 w-96 h-96 object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            )}
          </div>
        )}
        <h3 className="text-lg font-semibold mb-2 mt-4 text-custom-gray">
          {product.name}
        </h3>
        <p className="text-gray-700">${product.price}</p>
      </Link>
      {auth.currentUser ? (
        <>
          <Link href={`/admin/shop/${product.id}`}>
            <Button>Edit Product</Button>
          </Link>
          <button
            className="absolute bottom-2 right-2 bg-blue-500 text-white p-1 rounded-full hover:bg-blue-700"
            onClick={() => onDelete(product.id)}
          >
            <FiTrash2 size={16} />
          </button>
        </>
      ) : (
        <Button type="primary" onClick={() => addToCart(product)}>
          Add to Cart
        </Button>
      )}
      <p className="text-gray-400 mb-2">
        {"Excluding Sales Tax | Shipping Information"}
      </p>
    </div>
  );
};

export default ProductCard;
