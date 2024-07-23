"use client";
import Pagination from "@/components/Pagination/Pagination";
import Search from "@/components/Search/Search";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { deleteCp, fetchAdmin } from "../lib/utils";
const ControlPanels = ({ searchParams }) => {
  const q = searchParams?.q?.toLowerCase() || "";

  const [users, setUsers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const getusers = async () => {
      const res = await fetchAdmin();
      setUsers(res[0].controlPanels);
      setSearchResults(res[0].controlPanels);
    };
    getusers();
  }, []);

  useEffect(() => {
    const handleSearch = () => {
      const filteredRes = users?.filter((user) => {
        return user.username.toLowerCase().startsWith(q);
      });
      setSearchResults(filteredRes);
    };
    handleSearch();
  }, [q, users]);

  const handleDelete = async (id) => {
    console.log(id);
    const res = await deleteCp(id);
    console.log(res);
    setSearchResults(res);
    setUsers(res);
  };

  return (
    <div className="m-2 p-3 bg-[#182237] rounded-xl">
      <div className="flex items-center justify-between">
        <Search placeholder="Search Control Panels..." />
        <Link href={"/controlpanels/create-cps"}>
          <button className="bg-[#5d57c9] text-white px-2 py-1 rounded-lg  flex items-center justify-center gap-2">
            <FaPlus />
            Add New
          </button>
        </Link>
      </div>
      <div className="mt-3">
        <table className="w-full">
          <thead>
            <tr>
              <td className="p-3">Name</td>
              <td className="p-3">Id</td>
              <td className="p-3">Phone Number</td>
            </tr>
          </thead>
          <tbody>
            {searchResults?.map((cp) => (
              <tr key={cp?._id}>
                <td className="flex items-center gap-2 p-3">
                  <Image
                    src={"/images/noavatar.png"}
                    alt=""
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                  {cp?.username}
                </td>
                <td className="p-3">{cp?._id}</td>
                <td className="p-3">{cp?.phoneNumber}</td>
                <td>
                  <div className="flex items-center gap-4">
                    <Link href={`/controlpanels/${cp?._id}`}>
                      <button className="p-1 rounded-lg bg-[#f7dc6975]">
                        View
                      </button>
                    </Link>
                    <button
                      className="p-1 bg-[#f7373775] rounded-lg "
                      onClick={() => handleDelete(cp?._id)}
                    >
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

export default ControlPanels;
