import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import ClientLayout from "./ClientLayout";

export const metadata = {
  title: "Dashboard",
  description: "Dashboard for Admin and Control Panel",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#151c2c] text-gray-300">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
