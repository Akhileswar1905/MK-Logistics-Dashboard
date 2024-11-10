"use client";
import Pagination from "@/components/Pagination/Pagination";
import Search from "@/components/Search/Search";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { fetchCP } from "../lib/utils";

const DriversPage = ({ searchParams }) => {
  const q = searchParams?.q?.toLowerCase() || "";
  const [searchResults, setSearchResults] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      const id = localStorage.getItem("id");
      const res = await fetchCP(id);
      setUsers(res.drivers);
      setSearchResults(res.drivers);
    };
    getUsers();
  }, []);

  useEffect(() => {
    const handleSearch = () => {
      const filteredRes = users.filter((user) => {
        return user?.username?.toLowerCase().startsWith(q);
      });
      setSearchResults(filteredRes);
    };
    handleSearch();
  }, [q, users]);

  return (
    <div className="m-2 p-3 bg-[#182237] rounded-xl">
      <div className="flex items-center justify-between">
        <Search placeholder="Search Drivers..." />
      </div>
      <div className="mt-3">
        <table className="w-full">
          <thead>
            <tr>
              <td className="p-3ha">Driver</td>
              <td className="p-3">Driver Id</td>
              <td className="p-3">Phone Number</td>
            </tr>
          </thead>
          <tbody>
            {searchResults?.map((user) => (
              <tr key={user?._id}>
                <td className="flex items-center gap-2 p-3">
                  <Image
                    src={user?.photo || "/images/noavatar.png"}
                    alt=""
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                  {user?.username}
                </td>
                <td className="p-3">{user?._id}</td>
                <td className="p-3">{user?.phoneNumber}</td>
                <td className="p-3">{user?.vehicleNumber}</td>
                <td>
                  <div className="flex items-center gap-4">
                    <Link href={`/drivers/${user?.phoneNumber}`}>
                      <button className="p-1 rounded-lg bg-[#f7dc6975]">
                        View
                      </button>
                    </Link>
                    <button className="p-1 bg-[#f7373775] rounded-lg ">
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

export default DriversPage;
