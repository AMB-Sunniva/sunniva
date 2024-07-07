import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import dynamic from "next/dynamic";

const EditProduct = dynamic(() => import("@/components/Admin/EditProduct"), {
  ssr: false,
});

export default function Page() {
  return (
    <div style={{ padding: "6rem 0rem 2rem" }}>
      <EditProduct />;
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
