"use client";

import Pagination from "@/components/Pagination/Pagination";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchCP } from "../lib/utils";

const RequestsPage = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    let id = localStorage.getItem("id");
    const getCP = async () => {
      const res = await fetchCP(id);
      setRequests(res.requests);
    };
    getCP();
  }, []);

  console.log(requests[0]);

  return (
    <div className="m-2 p-3 bg-[#182237] rounded-xl">
      <div className="mt-3">
        <table className="w-full">
          <thead>
            <tr>
              <td className="p-3">Driver</td>
              <td className="p-3">Phone Number</td>
              <td className="p-3">Vehicle Number</td>
            </tr>
          </thead>
          <tbody>
            {requests?.map((request) => (
              <tr key={request._id}>
                <td className="flex items-center gap-2">
                  <Image
                    src={request?.photo || "/images/noavatar.png"}
                    alt=""
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                  {request.username}
                </td>
                <td className="p-3">{request.phoneNumber}</td>
                <td className="p-3">{request.vehicleNumber}</td>
                <td>
                  <div className="flex items-center gap-4">
                    <Link href={`/requests/${request.phoneNumber}`}>
                      <button className="p-1 rounded-lg bg-[#f7dc6975]">
                        View
                      </button>
                    </Link>
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

export default RequestsPage;
