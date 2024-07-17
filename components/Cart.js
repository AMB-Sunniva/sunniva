import { useCart } from "@/app/context/CartContext";
import Image from "next/image";
import Button from "./Button";

const Cart = ({ isOpen, closeCart }) => {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    getTotalPrice,
  } = useCart();

  return (
    <div
      className={`fixed right-0 top-0 h-full w-full md:w-38rem bg-white shadow-lg z-50 transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-semibold">Your Cart</h2>
        <button
          onClick={closeCart}
          className="text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="p-4">
        {cart.length === 0 ? (
          <p className="text-gray-700">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-2"
              >
                <div className="flex items-center space-x-4">
                  <Image
                    src={item.images[0]}
                    alt={item.name}
                    width={300}
                    height={300}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <div className="flex items-center pt-1">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="text-gray-700"
                      >
                        -
                      </button>
                      <span className="mx-2 border border-gray-700 px-4">{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="text-gray-700"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end pl-4">
                  <p className="text-custom-gray font-semibold">${item.price}</p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-custom-blue hover:text-red-700 focus:outline-none pt-2 text-xs"
                  >
                    REMOVE
                  </button>
                </div>
              </div>
            ))}
            <div className="flex justify-end font-bold text-xl">
              Total: ${getTotalPrice().toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </div>
            <div className="flex justify-end">
              <Button onClick={closeCart}>Checkout</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
