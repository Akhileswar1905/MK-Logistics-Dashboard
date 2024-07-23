"use client";

import Pagination from "@/components/Pagination/Pagination";
import Search from "@/components/Search/Search";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { fetchCP } from "../lib/utils";

const ContractsPage = ({ searchParams }) => {
  const q = searchParams?.q?.toLowerCase() || "";

  const [contracts, setContracts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getContracts = async () => {
      try {
        const id =
          typeof window !== "undefined" ? localStorage.getItem("id") : null;
        if (!id) {
          throw new Error("User ID not found in local storage.");
        }
        const res = await fetchCP(id);
        setContracts(res.contracts);
        setSearchResults(res.contracts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getContracts();
  }, []);

  useEffect(() => {
    const handleSearch = () => {
      const filteredRes = contracts.filter((contract) => {
        return contract?.companyName?.toLowerCase().startsWith(q);
      });
      setSearchResults(filteredRes);
    };
    handleSearch();
  }, [q, contracts]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="m-2 p-3 bg-[#182237] rounded-xl">
      <div className="flex items-center justify-between">
        <Search placeholder="Search Contracts..." />
        <Link href="/contracts/create-contract">
          <button className="bg-[#5d57c9] text-white px-2 py-1 rounded-lg flex items-center justify-center gap-2">
            <FaPlus />
            Add New
          </button>
        </Link>
      </div>
      <div className="mt-3">
        <table className="w-full">
          <thead>
            <tr>
              <td className="p-3">Company Name</td>
              <td className="p-3">Contract Id</td>
              <td className="p-3">Duration</td>
              <td className="p-3">Actions</td>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((contract) => (
              <tr key={contract.companyId}>
                <td className="flex items-center gap-2 p-3">
                  <Image
                    src="/images/noavatar.png"
                    alt="Company Logo"
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                  {contract.companyName}
                </td>
                <td className="p-3">{contract.companyId}</td>
                <td className="p-3">{contract.duration}</td>
                <td className="p-3">
                  <div className="flex items-center gap-4">
                    <button className="p-1 bg-[#f7373775] rounded-lg">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination />
      </div>
    </div>
  );
};

export default ContractsPage;
