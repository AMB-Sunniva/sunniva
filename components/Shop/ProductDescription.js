"use client";

import React from "react";

function ProductDescription({ product }) {
  return (
    <div className="text-gray-700 mb-4 max-w-[600px]">
      <p className="mb-2">{product.description.infoFront}&nbsp; </p>
      &nbsp;
      <div>
        <strong>Features and Benefits</strong>&nbsp;
        <ul className="list-disc list-inside ml-6">
          {" "}
          {Object.entries(product.description.featuresAndBenefits).map(
            ([featureKey, featureValue], index) => (
              <li key={index} className="mb-1">
                <strong>{`${featureKey}: `}</strong>
                {featureValue}&nbsp;
              </li>
            )
          )}
        </ul>
      </div>
      &nbsp;
      <div>
        <strong>Technical Details</strong>
        &nbsp;
        <ul className="list-disc list-inside ml-6">
          {" "}
          {Object.entries(product.description.technicalDetails).map(
            ([featureKey, featureValue], index) => (
              <li key={index} className="mb-1">
                <strong>{`${featureKey}: `}</strong>
                {featureValue}&nbsp;
              </li>
            )
          )}
        </ul>
      </div>
      &nbsp;
      <p className="mb-2">{product.description.infoEnd}&nbsp; </p>
    </div>
  );
}

export default ProductDescription;
