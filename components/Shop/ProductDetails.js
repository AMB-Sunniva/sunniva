"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useCart } from "@/app/context/CartContext";
import { useFirestore } from "@/app/context/FirestoreContext";
import Button from "@/components/Button";
import { findMatchingPriceField, formatCurrency } from "@/lib/utils";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import { IoIosArrowRoundBack } from "react-icons/io";
import ProductDescription from "./ProductDescription";

const endShapes = [
  { id: 1, src: "/images/EndShape1.jpg", alt: "End Shape 1" },
  { id: 2, src: "/images/EndShape2.jpg", alt: "End Shape 2" },
  { id: 3, src: "/images/EndShape3.jpg", alt: "End Shape 3" },
  { id: 4, src: "/images/EndShape4.jpg", alt: "End Shape 4" },
  { id: 5, src: "/images/EndShape5.jpg", alt: "End Shape 5" },
  { id: 6, src: "/images/EndShape6.jpg", alt: "End Shape 6" },
  { id: 7, src: "/images/EndShape7.jpg", alt: "End Shape 7" },
  { id: 8, src: "/images/EndShape8.jpg", alt: "End Shape 8" },
];

const CollapsibleSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      <button
        className="w-full text-left text-xl font-bold text-gray-700 mb-2 focus:outline-none hover:underline"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
      </button>
      {isOpen && (
        <div className="px-4 py-2 bg-gray-100 rounded-md">{children}</div>
      )}
    </div>
  );
};

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { prices } = useFirestore();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sizes, setSizes] = useState(null);
  const [formattedPrice, setFormattedPrice] = useState(null);
  const [priceFields, setPriceFields] = useState(null);
  const [dynamicPrice, setDynamicPrice] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  useEffect(() => {
    if (product) {
      setFormattedPrice(
        formatCurrency(dynamicPrice ? dynamicPrice : product.price)
      );
    }
  }, [product, dynamicPrice]);

  const lumber = watch("lumberSize");
  const attachedOrStandAlone = watch("attachedOrStandAlone");
  const panelSize = watch("selectedSize");

  useEffect(() => {
    if (product) {
      if (product.name === "Just Solar") {
        setPriceFields(findMatchingPriceField(prices, product.name));
      }
    }
  }, [prices, product]);

  useEffect(() => {
    if (prices && product && lumber && attachedOrStandAlone) {
      setPriceFields(
        findMatchingPriceField(
          prices,
          product.name,
          lumber,
          attachedOrStandAlone
        )
      );
    }
  }, [prices, product, lumber, attachedOrStandAlone]);

  useEffect(() => {
    if (priceFields && panelSize) {
      setDynamicPrice(priceFields[panelSize]);
    }
  }, [priceFields, panelSize]);

  useEffect(() => {
    if (product) {
      setSizes(product.sizes);
    }
  }, [product]);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const productRef = doc(db, "products", id);
          const productSnap = await getDoc(productRef);
          if (productSnap.exists()) {
            const productData = productSnap.data();
            setProduct({ id: productSnap.id, ...productData });
          } else {
            console.error("No such document!");
          }
        } catch (error) {
          console.error("Error fetching product:", error);
        } finally {
          const timer = setTimeout(() => {
            setLoading(false);
          }, 200);
          return () => clearTimeout(timer);
        }
      };

      fetchProduct();
    }
  }, [id]);

  if (loading)
    return (
      <div className="fixed w-full h-full flex items-center justify-center bg-white z-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-custom-blue"></div>
      </div>
    );

  if (!product) return <p className="text-center">No product found</p>;

  const onSubmit = (data) => {
    const productWithOptions = {
      id: product.id,
      name: product.name,
      price: dynamicPrice,
      images: product.images,
      selectedOptions: {
        selectedSize: data.selectedSize,
        attachedOrStandAlone: data.attachedOrStandAlone,
        endBoardDesign: data.endBoardDesign,
        lumberSize: data.lumberSize,
        stainColor: data.stainColor,
      },
    };

    addToCart(productWithOptions);
  };

  const handleBackToProducts = () => {
    router.push("/shop");
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <button
        onClick={handleBackToProducts}
        type="button"
        className="text-custom-blue bg-white hover:underline flex items-center justify-center pb-6"
      >
        <IoIosArrowRoundBack size="1.5em" />
        Back to Products
      </button>
      <div className="flex flex-col md:flex-row items-center md:items-start justify-center">
        <div className="flex flex-col items-center mb-6 pr-0 md:pr-12">
          {product.images.length > 0 && (
            <div className="relative group mb-4 w-[400px] h-[400px]">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {product.images.length > 1 && (
                <Image
                  src={product.images[1]}
                  alt={product.name}
                  fill
                  className="absolute top-0 left-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              )}
            </div>
          )}
          <ProductDescription product={product} />
          {/* <div className="text-gray-700 mb-4 max-w-[600px]">
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
          </div> */}
        </div>
        <div className="text-center md:text-left max-w-md">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

          <div className="mb-4">
            <h3 className="text-xl font-bold">Customize your kit:</h3>
            <p className="text-gray-700 mb-2">{`Starting at: ${formattedPrice}`}</p>
            <p className="text-red-400 mb-2">
              {
                "(Our Base Price reflects the lowest price for the style and size selected. Choose wood type, size, and other options to view your fully configured price. Contact us with any questions.)"
              }
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {product.name !== "Just Solar" && <hr className="my-4" />}
            {product.name !== "Just Solar" && (
              <div className="mb-4">
                <label
                  htmlFor="lumberSize"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Lumber Size:
                </label>

                <select
                  id="lumberSize"
                  {...register("lumberSize", {
                    required: "Please select a lumber size.",
                  })}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select lumber size</option>
                  {product.lumberSizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>

                {errors.lumberSize && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.lumberSize.message}
                  </p>
                )}
              </div>
            )}
            {product.name !== "Just Solar" && <hr className="my-4" />}
            {product.name !== "Just Solar" && (
              <div className="mb-4">
                <label
                  htmlFor="attachedOrStandAlone"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Attached or Stand Alone:
                </label>
                <select
                  id="attachedOrStandAlone"
                  {...register("attachedOrStandAlone", {
                    required: "Please select an option.",
                  })}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select option</option>
                  <option value="Attached">Attached</option>
                  <option value="Stand Alone">Stand Alone</option>
                </select>
                {errors.attachedOrStandAlone && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.attachedOrStandAlone.message}
                  </p>
                )}
              </div>
            )}
            {product.name !== "Just Solar" && <hr className="my-4" />}
            {product.name !== "Just Solar" && (
              <div className="mb-4">
                <label
                  htmlFor="endBoardDesign"
                  className="block text-gray-700 font-bold mb-2"
                >
                  End Board Design:
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    {endShapes.map((image, index) => (
                      <div key={image.id} className="relative w-20 h-20">
                        <span className="absolute top-4 left-2 text-white p-1 z-10">
                          {String.fromCharCode(65 + index)}
                        </span>
                        <Image
                          src={image.src}
                          alt={image.alt}
                          layout="fill"
                          objectFit="cover"
                          className="mb-4"
                        />
                      </div>
                    ))}
                  </div>
                </label>
                <select
                  id="endBoardDesign"
                  {...register("endBoardDesign", {
                    required: "Please select an end board design.",
                  })}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select design</option>
                  {product.endBoardDesigns.map((design) => (
                    <option key={design} value={design}>
                      {design}
                    </option>
                  ))}
                </select>
                {errors.endBoardDesign && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.endBoardDesign.message}
                  </p>
                )}
              </div>
            )}
            {product.name !== "Just Solar" && <hr className="my-4" />}

            <div className="mb-4">
              <label
                htmlFor="selectedSize"
                className="block text-gray-700 font-bold mb-2"
              >
                Select Size:
              </label>
              <select
                id="selectedSize"
                {...register("selectedSize", {
                  required: "Please select a size.",
                })}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select size</option>
                {product.sizes.map((size) =>
                  attachedOrStandAlone === "Attached" &&
                  product.name.includes("Just Shade") &&
                  size === "2 Post Hammock" ? null : (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  )
                )}
              </select>
              {errors.selectedSize && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.selectedSize.message}
                </p>
              )}
            </div>

            {product.name !== "Just Solar" && <hr className="my-4" />}
            {product.name !== "Just Solar" && (
              <div className="mb-4">
                <label
                  htmlFor="stainColor"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Stain Color:
                </label>
                <select
                  id="stainColor"
                  {...register("stainColor", {
                    required: "Please select a stain color.",
                  })}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select stain color</option>
                  {product.stainColors.map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
                {errors.stainColor && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.stainColor.message}
                  </p>
                )}
              </div>
            )}
            {product.name !== "Just Solar" && <hr className="my-4" />}

            <Button type="primary" submit>
              Add to Cart
            </Button>
          </form>

          <CollapsibleSection title="Product Info">
            <p>
              {`Tailored to your needs, our solar + shade systems are available in a range of sizes, ensuring a perfect fit for any outdoor space. 
              From cozy retreats to expansive landscapes, our systems provide varying energy generation capacities to match your unique requirements while keeping you shaded and energy-efficient.`}
            </p>
            <table className="table-auto w-full text-left mt-4">
              <thead>
                <tr>
                  <th className="px-4 py-2">System</th>
                  <th className="px-4 py-2">kW Size</th>
                  <th className="px-4 py-2">Physical Size</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">4 Panel</td>
                  <td className="border px-4 py-2">2.58</td>
                  <td className="border px-4 py-2">{`8' 11 1/2" x 15' 10 3/4"`}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">6 Panel Long</td>
                  <td className="border px-4 py-2">3.87</td>
                  <td className="border px-4 py-2">{`8' 11 1/2" x 23' 9 5/8"`}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">6 Panel Wide</td>
                  <td className="border px-4 py-2">3.87</td>
                  <td className="border px-4 py-2">{`13' 3 3/4" x 15' 10 3/4"`}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">8 Panel</td>
                  <td className="border px-4 py-2">5.16</td>
                  <td className="border px-4 py-2">{`17' 8" x 15' 10 3/4"`}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">9 Panel</td>
                  <td className="border px-4 py-2">5.81</td>
                  <td className="border px-4 py-2">{`13' 3 3/4" x 23' 9 5/8"`}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">10 Panel</td>
                  <td className="border px-4 py-2">6.45</td>
                  <td className="border px-4 py-2">{`22' 1/4" x 15' 10 3/4"`}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">12 Panel</td>
                  <td className="border px-4 py-2">7.74</td>
                  <td className="border px-4 py-2">{`17' 8" x 23' 9 5/8"`}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">14 Panel</td>
                  <td className="border px-4 py-2">9.03</td>
                  <td className="border px-4 py-2">{`30' 8 3/4" x 15' 10 3/4"`}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">15 Panel</td>
                  <td className="border px-4 py-2">9.68</td>
                  <td className="border px-4 py-2">{`22' 1/4" x 23' 9 5/8"`}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">16 Panel</td>
                  <td className="border px-4 py-2">10.32</td>
                  <td className="border px-4 py-2">{`17' 8" x 31' 8 1/2"`}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">18 Panel</td>
                  <td className="border px-4 py-2">11.61</td>
                  <td className="border px-4 py-2">{`26' 4 1/2" x 23' 9 5/8"`}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">20 Panel</td>
                  <td className="border px-4 py-2">12.90</td>
                  <td className="border px-4 py-2">{`22' 1/4" x 31' 8 1/2"`}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">21 Panel</td>
                  <td className="border px-4 py-2">13.55</td>
                  <td className="border px-4 py-2">{`30' 8 3/4" x 23' 9 5/8"`}</td>
                </tr>
              </tbody>
            </table>
            <p className="mt-4">{`Included with your purchase will be:`}</p>
            <ul className="list-disc list-inside">
              <li>{`Lumber (Rough Sawn Doug Fir cut to various sizes)`}</li>
              <li>{`Hardware (sleek black hardware to compliment the wood)`}</li>
              <li>{`Solar Panels (Canadian Solar panels)`}</li>
              <li>{`Microinverters and Gateway Monitoring device (NEP microinverters with NEP monitoring device)`}</li>
              <li>{`Custom S5 Racking system (S5 clamps with custom racking system)`}</li>
              <li>{`Other Electrical Hardware (AC tail cable, jumper cables)`}</li>
            </ul>
          </CollapsibleSection>

          <CollapsibleSection title="Return and Refund Policy">
            <p>
              <strong>Sunniva Solar LLC - Return Policy</strong>
            </p>
            <p>
              <em>Last updated: 8/30/2023</em>
            </p>
            <p>
              {`Thank you for choosing Sunniva Solar LLC ("Company," "we," "us," or "our") for your solar and shade solution needs. 
    We want you to be completely satisfied with your purchase, and we strive to provide a hassle-free return process. 
    This Return Policy outlines the guidelines for returning products purchased from us.`}
            </p>
            <ol className="list-decimal list-inside">
              <li>
                <strong>Eligibility for Returns</strong>
                <br />
                {`We accept returns for products purchased directly from Sunniva Solar LLC according to the following conditions:`}
                <ul className="list-disc list-inside ml-4">
                  <li>{`The return must be initiated within 14 days from the date of product arrival.`}</li>
                  <li>{`The product must be unused, undamaged, and in its original packaging.`}</li>
                  <li>{`Proof of purchase (order number, receipt, or invoice) is required.`}</li>
                </ul>
              </li>
              <li>
                <strong>Non-Returnable Items</strong>
                <br />
                {`The following items are not eligible for return:`}
                <ul className="list-disc list-inside ml-4">
                  <li>{`Products that have been used, damaged, or modified.`}</li>
                  <li>{`Products with missing parts, accessories, or packaging.`}</li>
                  <li>{`Custom-made or personalized products.`}</li>
                </ul>
              </li>
              <li>
                <strong>Return Process</strong>
                <br />
                {`To initiate a return, please follow these steps:`}
                <ul className="list-disc list-inside ml-4">
                  <li>{`Contact our customer support team at landensill@sunnivasol.com to request a Return Merchandise Authorization (RMA) number.`}</li>
                  <li>{`Pack the product securely in its original packaging, including all accessories and documentation.`}</li>
                  <li>{`Clearly mark the RMA number on the outside of the package.`}</li>
                  <li>{`Ship the package to the address provided by our customer support team.`}</li>
                </ul>
              </li>
              <li>
                <strong>Return Shipping</strong>
                <br />
                {`The cost of return shipping is the responsibility of the customer unless the return is due to a mistake on our part 
      (e.g., wrong item shipped or damaged product). We recommend using a trackable shipping method and purchasing insurance 
      for valuable items, as we cannot be held responsible for items lost or damaged during transit.`}
              </li>
              <li>
                <strong>Inspection and Refund</strong>
                <br />
                {`Once we receive the returned product, our team will inspect it to ensure that it meets the eligibility criteria outlined 
      in this policy. If the return is approved, we will process a refund to the original payment method within [number] business days. 
      Please note that it may take additional time for the refund to appear in your account, depending on your bank or credit card provider.`}
              </li>
              <li>
                <strong>Warranty Replacements</strong>
                <br />
                {`If your product is damaged or defective, please refer to our Warranty Policy for information on how to request a replacement or repair.`}
              </li>
              <li>
                <strong>Contact Us</strong>
                <br />
                {`If you have any questions or concerns regarding our Return Policy or need assistance with a return, please contact our customer support 
      team at landensill@sunnivasol.com.`}
              </li>
              <li>
                <strong>Changes to this Return Policy</strong>
                <br />
                {`We may update this Return Policy from time to time to reflect changes in our practices or legal requirements. The "Last updated" date 
      at the beginning of the policy indicates the latest revision. By making a purchase from Sunniva Solar LLC, you acknowledge that you have read, 
      understood, and agreed to this Return Policy.`}
              </li>
            </ol>
          </CollapsibleSection>

          <CollapsibleSection title="Shipping Info">
            <p>{`We offer shipping services exclusively to the continental United States, ensuring that our exceptional products reach your doorstep with care and efficiency.`}</p>
          </CollapsibleSection>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductDetails;
