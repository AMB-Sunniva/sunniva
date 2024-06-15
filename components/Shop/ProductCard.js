import Button from "../Button";
import Link from "next/link";

const ProductCard = ({ product }) => {
  return (
    <div className="border shadow-md p-4 text-center">
      <Link href={`/product/${product.id}`}>
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" />
        <h3 className="text-lg font-semibold mb-2 text-custom-gray">{product.name}</h3>
        <p className="text-gray-700 mb-2">${product.price}</p>
      </Link>
      <Button type="primary">
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductCard;
