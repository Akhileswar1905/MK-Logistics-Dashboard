"use client";

import Pagination from "@/components/Pagination/Pagination";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { acceptUpdateReq, fetchCP } from "../lib/utils";

const UpdatesPage = () => {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    let id = localStorage.getItem("id");
    const getCP = async () => {
      const res = await fetchCP(id);
      console.log(res);
      setUpdates(res.updates);
    };
    getCP();
  }, []);
  console.log(updates);

  const acceptUpdate = async (body) => {
    console.log("Clicked");
    const res = await acceptUpdateReq(body);
    setUpdates(res);
    console.log(res);
  };

  return (
    <div className="m-2 p-3 bg-[#182237] rounded-xl">
      <div className="mt-3">
        <table className="w-full">
          <thead>
            <tr>
              <td className="p-3">Phone Number</td>
              <td className="p-3">Trip Id</td>
            </tr>
          </thead>
          <tbody>
            {updates?.map((request) => (
              <tr key={request._id}>
                <td className="p-3">{request.phoneNumber}</td>
                <td className="p-3">{request.trip.tripID}</td>
                <td>
                  <div className="flex items-center gap-4">
                    <button
                      className="p-1 rounded-lg bg-[#f7dc6975]"
                      disabled={request.trip.status === "allowed"}
                      onClick={() => acceptUpdate(request)}
                    >
                      {request.trip.status === "allowed" ? "Allowed" : "Allow"}
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

export default UpdatesPage;
