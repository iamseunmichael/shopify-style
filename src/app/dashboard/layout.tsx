import Sidebar from "@/components/ui/Sidebar"
import Navbar from "@/components/ui/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-100 ">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Navbar />

        <main className="p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}