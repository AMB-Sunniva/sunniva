"use client";
import Button from "@/components/Button";
import { useCart } from "@/app/context/CartContext";


const ProductDetails = ({ product }) => {
  const {addToCart} = useCart()

  return (
    <div className="container mx-auto py-8">
    <div className="flex flex-col md:flex-row items-center justify-center">
      <img src={product.image} alt={product.name} className="w-64 md:w-96 h-auto object-cover mb-4 md:mb-0 md:mr-8" />
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
  )
}

export default ProductDetails;
