"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "@/firebase"; // Adjust the import according to your project structure
import { doc, getDoc } from "firebase/firestore";

const EditProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const productRef = doc(db, "products", id);
          const productSnap = await getDoc(productRef);
          if (productSnap.exists()) {
            setProduct({ id: productSnap.id, ...productSnap.data() });
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching product:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className={""}>
      {product && (
        <div>
          <h1>{product.name}</h1>
          <p>Price: {product.price}</p>
          {/* Add more fields as necessary */}
        </div>
      )}
    </div>
  );
};

export default EditProduct;
