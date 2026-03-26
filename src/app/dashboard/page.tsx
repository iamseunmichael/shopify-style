import ProtectedRoute from "@/components/auth/ProtectedRoute";
import DashboardMetrics from "@/components/ui/DashboardMetrics";

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <div>
        <h1 className="text-black">Dashboard</h1>
        <DashboardMetrics />
      </div>
    </ProtectedRoute>
  );
}