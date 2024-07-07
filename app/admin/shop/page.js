import AdminShop from "@/components/Admin/AdminShop"; // Ensure this path is correct
import ProtectedRoute from "@/components/protectedRoutes";

export default function AdminShopPage() {
  return (
    <ProtectedRoute>
      <AdminShop />
    </ProtectedRoute>
  );
}
