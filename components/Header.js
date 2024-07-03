import Link from "next/link";
import { CiShoppingCart } from "react-icons/ci";
import { useCart } from "@/app/context/CartContext";
import Image from "next/image";
import React, { useState } from "react";

export default function Header({ openCart }) {
  const { cart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const totalItemsInCart = cart.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-bg-gray text-white fixed w-full top-0 z-40">
      <div className="mx-auto my-0 px-4 sm:px-6 lg:px-20 flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src="/images/whiteLogo.png"
            alt="Sunniva"
            width={200}
            height={100}
          />
        </div>
        {/* Hamburger button for mobile */}
        <div className="lg:hidden flex">
          <div className="relative m-6">
            <button onClick={openCart}>
              <CiShoppingCart size="2.5em" />
              {totalItemsInCart > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1 absolute -top-1 -right-1 transform translate-x-1/4 -translate-y-1/8">
                  {totalItemsInCart}
                </span>
              )}
            </button>
          </div>
          <button
            onClick={toggleMenu}
            type="button"
            className="text-white hover:text-gray-400 focus:text-gray-400 focus:outline-none"
          >
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              {isOpen ? (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm16 4H4v2h16v-2z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"
                />
              )}
            </svg>
          </button>
        </div>
        {/* Desktop menu */}
        <nav className="hidden lg:flex space-x-6 items-center">
          <Link className="hover:text-custom-tan" href="/">
            HOME
          </Link>
          <Link className="hover:text-custom-tan" href="/what-we-offer">
            WHAT WE OFFER
          </Link>
          <Link className="hover:text-custom-tan" href="/why-sunniva">
            WHY SUNNIVA
          </Link>
          <Link className="hover:text-custom-tan" href="/installer">
            INSTALLERS
          </Link>
          <Link className="hover:text-custom-tan" href="/shop">
            SHOP
          </Link>
          <Link className="hover:text-custom-tan" href="/contact-us">
            CONTACT US
          </Link>
          <div className="relative">
            <button onClick={openCart}>
              <CiShoppingCart size="2.5em" />
              {totalItemsInCart > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1 absolute -top-1 -right-1 transform translate-x-1/4 -translate-y-1/8">
                  {totalItemsInCart}
                </span>
              )}
            </button>
          </div>
        </nav>
      </div>
      {/* Mobile menu */}
      <div className={`${isOpen ? "block" : "hidden"} lg:hidden`}>
        <div className="p-6 flex flex-col items-end" onClick={toggleMenu}>
          <Link href="/">HOME</Link>
          <Link href="/what-we-offer">WHAT WE OFFER</Link>
          <Link href="/why-sunniva">WHY SUNNIVA</Link>
          <Link href="/installer">INSTALLERS</Link>
          <Link href="/shop">SHOP</Link>
          <Link href="/contact-us">CONTACT US</Link>
        </div>
      </div>
    </header>
  );
}
