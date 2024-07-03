import ProductCard from "@/components/Shop/ProductCard";
import products from "../../data/products";
import ProtectedRoute from "../../../components/protectedRoutes";

export default function AdminShop() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto py-8">
        <div style={{ padding: "6rem 0rem 2rem", textAlign: "center" }}>
          <hr
            style={{ width: "3%", borderColor: "#333", margin: "30px auto" }}
          />
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: "lighter",
              color: "#474949",
              letterSpacing: "2px",
            }}
          >
            ALL PRODUCTS
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
