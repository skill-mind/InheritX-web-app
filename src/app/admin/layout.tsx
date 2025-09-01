import AdminHeader from "./components/header/Header";
import AdminSidebar from "./components/navbar/Navbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-[#161E22] text-white">
      <AdminHeader />

      <div className="flex flex-1 max-w-[110rem] mx-auto w-full">
        <AdminSidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
