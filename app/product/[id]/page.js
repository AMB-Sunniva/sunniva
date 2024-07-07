import { db } from "@/firebase"; // Adjust the import according to your project structure
import { collection, getDocs } from "firebase/firestore";
import dynamic from "next/dynamic";

const ProductDetails = dynamic(() => import("@/components/EditProduct"), {
  ssr: false,
});

export default function Page() {
  return (
    <div style={{ padding: "6rem 0rem 2rem" }}>
      <ProductDetails />
    </div>
  );
}

export async function generateStaticParams() {
  const productsCollection = collection(db, "products");
  const productSnapshot = await getDocs(productsCollection);
  const paths = productSnapshot.docs.map((doc) => ({
    id: doc.id,
  }));

  return paths;
}
