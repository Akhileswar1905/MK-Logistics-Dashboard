"use client";
import { useState, useEffect } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";

const Search = ({ placeholder }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const path = usePathname();

  const handleSearch = (e) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams);
    if (!value) params.delete("q");
    else {
      params.set("q", value);
    }
    router.replace(`${path}?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2 p-2 rounded-lg bg-[#2e3748]">
      <FaSearch />
      <input
        type="text"
        placeholder={placeholder}
        className="bg-transparent border-none focus:border-none outline-none text-white"
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;
