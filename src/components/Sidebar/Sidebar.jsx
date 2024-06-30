"use client";
import Image from "next/image";
import logo from "../../../public/images/logo.png";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { IoIosLogOut } from "react-icons/io";
import admin from "./admin";
import cp from "./cp";

const Sidebar = () => {
  const path = usePathname();
  const router = useRouter();
  const isAdmin = localStorage.getItem("isAdmin");

  const links = isAdmin === "true" ? admin : cp;

  return (
    <div className="sticky top-10">
      <div>
        <Image src={logo} alt="logo" width={430 * 0.6} />
      </div>
      <div className="justify-center">
        {links?.map((item) => (
          <div key={item.id} className="m-2 items-center justify-center">
            <Link
              href={item.path}
              className={`flex items-center justify-start gap-4 p-2 rounded-lg hover:bg-[#252b3a] ${
                path === item.path ? "bg-[#2e3748]" : ""
              }`}
            >
              {item.icon}
              <span className="text-white text-sm">{item.title}</span>
            </Link>
          </div>
        ))}
        <div className="m-2">
          <button
            className="w-full  flex items-center justify-start gap-4 p-2 rounded-lg text-white hover:bg-[#898c94]"
            onClick={() => {
              localStorage.clear();
              router.push("/login");
            }}
          >
            <IoIosLogOut color="white" size={18} />
            <p>Logout</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
