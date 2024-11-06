"use client";

import Link from "next/link";
import React from "react";

const ProductSideBar = ({ products }) => {
  const sortedProducts = products.sort((a, b) => {
    const order = {
      "Solar and Shade": 1,
      "Just Solar Kits": 2,
      "Just Shade Kits": 3,
    };
    return order[a.type] - order[b.type];
  });

  return (
    <div className="w-64 p-4 bg-gray-100 border-r border-gray-300">
      <h2 className="text-xl font-semibold mb-4">Products</h2>
      {["Solar and Shade", "Just Solar Kits", "Just Shade Kits"].map((type) => (
        <div key={type} className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-2">{type}</h3>
          <ul className="space-y-2">
            {sortedProducts
              .filter((product) => product.type === type)
              .map((product) => (
                <li
                  key={product.id}
                  className="flex justify-between items-center"
                >
                  <Link
                    href={`/product/${product.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {product.name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ProductSideBar;
