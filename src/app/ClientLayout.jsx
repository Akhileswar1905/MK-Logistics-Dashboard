"use client";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }) {
  const path = usePathname();
  const showSidebarAndNavbar = path !== "/login";

  return (
    <div className="flex flex-row h-[100vh] relative">
      {showSidebarAndNavbar && (
        <div className="flex bg-[#182237] sticky top-3">
          <Sidebar />
        </div>
      )}
      <div className="flex-1 bg-[#151c2c]">
        {showSidebarAndNavbar && <Navbar />}
        {children}
      </div>
    </div>
  );
}
