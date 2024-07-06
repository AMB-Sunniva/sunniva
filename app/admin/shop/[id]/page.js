import { db } from "@/firebase"; // Adjust the import according to your project structure
import { collection, getDocs } from "firebase/firestore";
import dynamic from "next/dynamic";

const EditProduct = dynamic(() => import("@/components/EditProduct"), {
  ssr: false,
});

export default function Page() {
  return <EditProduct />;
}

export async function generateStaticParams() {
  const productsCollection = collection(db, "products");
  const productSnapshot = await getDocs(productsCollection);
  const paths = productSnapshot.docs.map((doc) => ({
    id: doc.id,
  }));

  return paths;
}
