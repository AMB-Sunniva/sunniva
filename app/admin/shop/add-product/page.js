import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import AddProduct from "@/components/AddProduct";

export default function Page() {
  return (
    <div style={{ padding: "6rem 0rem 2rem" }}>
      <AddProduct />;
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
