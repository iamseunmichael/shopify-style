import ProductForm from "@/components/ProductForm";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function ProductPage() {
    return (
        <ProtectedRoute>
            <div className="space-y-8">
                <h1 className="text-2xl font-bold text-black">Product Management</h1>

                <ProductForm />
            </div>
        </ProtectedRoute>
        
    )
}