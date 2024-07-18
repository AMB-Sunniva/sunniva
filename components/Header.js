import Link from "next/link";
import { CiShoppingCart } from "react-icons/ci";
import { useCart } from "@/app/context/CartContext";
import Image from "next/image";
import React, { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Header({}) {
  const { cart, openCart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const auth = useAuth();
  const router = useRouter();

  const totalItemsInCart = cart.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleImageClick = () => {
    router.push('/');
  };

  return (
    <header
      className={`bg-bg-gray text-white fixed w-full top-0 shadow-md z-30 text-sm whitespace-nowrap ${
        isMenuOpen ? "" : "backdrop-blur"
      }`}
    >
      <div className="mx-auto my-0 px-4 sm:px-6 lg:px-20 flex items-center justify-between">
        <div className="flex items-center cursor-pointer" onClick={handleImageClick}>
          <Image
            src="/images/whiteLogo.png"
            alt="Sunniva"
            width={150}
            height={100}
            priority
          />
        </div>
        {/* Hamburger button for mobile */}
        <div className="lg:hidden flex">
          <div className="relative mx-5 my-3">
            <button onClick={openCart}>
              <CiShoppingCart className="w-8 h-8" />
              {totalItemsInCart > 0 && (
                <span className="absolute top-0 -right-1 inline-flex items-center justify-center h-4 w-4 rounded-full bg-red-500 text-white text-xs">
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
              {isMenuOpen ? (
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
          {auth.user && (
            <Link className="hover:text-custom-tan" href="/admin/shop">
              ADMIN SHOP
            </Link>
          )}
          <Link className="hover:text-custom-tan" href="/contact-us">
            CONTACT US
          </Link>
          <div className="relative">
            <button onClick={openCart}>
              <CiShoppingCart className="w-6 h-6 xl:w-7 xl:h-7" />
              {totalItemsInCart > 0 && (
                <span className="absolute top-0 -right-1 inline-flex items-center justify-center h-4 w-4 rounded-full bg-red-500 text-white text-xs">
                  {totalItemsInCart}
                </span>
              )}
            </button>
          </div>
        </nav>
      </div>
      {/* Mobile menu */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } lg:hidden fixed inset-0 bg-custom-gray overflow-hidden transition-all duration-500 ease-in-out z-40`}
      >
        <div onClick={toggleMenu}>
          <div className="flex justify-end">
            <button
              onClick={toggleMenu}
              type="button"
              className="text-white hover:text-gray-400 focus:text-gray-400 focus:outline-none px-4 pt-6 md:pt-12 md:px-6"
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.364 5.636l-1.414-1.414L12 9.172l-4.95-4.95-1.414 1.414L10.828 12l-5.192 5.192 1.414 1.414L12 14.828l4.95 4.95 1.414-1.414L13.172 12l5.192-5.192z"
                />
              </svg>
            </button>
          </div>
          <div className="py-4 px-12 md:px-16 flex flex-col text-2xl gap-6">
            <Link href="/">HOME</Link>
            <Link href="/what-we-offer">WHAT WE OFFER</Link>
            <Link href="/why-sunniva">WHY SUNNIVA</Link>
            <Link href="/installer">INSTALLERS</Link>
            <Link href="/shop">SHOP</Link>
            {auth.user && (
              <Link className="hover:text-custom-tan" href="/admin/shop">
                ADMIN SHOP
              </Link>
            )}
            <Link href="/contact-us">CONTACT US</Link>
          </div>
        </div>
      </div>
    </header>
  );
}
