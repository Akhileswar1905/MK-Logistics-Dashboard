"use client";

import { usePathname, useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";

const Navbar = () => {
  const path = usePathname();
  const router = useRouter();
  return (
    <div className="flex justify-between items-center p-3 m-2 rounded-md bg-[#182237]">
      <div className="font-bold capitalize text-white">
        {/* Arrow symbol */}
        {path.split("/").pop() && (
          <button
            className="text-2xl items-center justify-center cursor-pointer font-bold p-3"
            onClick={() => router.back()}
          >
            &larr;
          </button>
        )}
        {path.split("/").pop() ? path.split("/").pop() : "Dashboard"}
      </div>
      <div className="flex items-center gap-2 p-2 rounded-lg bg-[#2e3748]">
        <FaSearch />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent border-none focus:border-none outline-none text-white"
        />
      </div>
    </div>
  );
};

export default Navbar;
