"use client";
import Pagination from "@/components/Pagination/Pagination";
import Search from "@/components/Search/Search";
import React, { useEffect, useState } from "react";
import { acceptReq, fetchAdmin, rejectReq } from "../lib/utils";

const PayReqPage = () => {
  const [requests, setRequests] = useState(null);
  const [msg, setMsg] = useState(false);
  const [response, setResponse] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      const admin = await fetchAdmin();
      setRequests(admin[0].payReqs);
      console.log(admin[0].payReqs);
    };
    getUser();
  }, []);

  const handleApprove = async (id) => {
    const res = await acceptReq(id);
    setMsg(true);
    setResponse("Approved");
    if (res.status === 200) {
      const newReqs = requests.filter((req) => req.reportId !== id);
      setRequests(newReqs);
    }
  };
  const handleReject = async (id) => {
    const res = await rejectReq(id);
    setMsg(true);
    setResponse("Rejected");
    if (res.status === 200) {
      const newReqs = requests.filter((req) => req.reportId !== id);
      setRequests(newReqs);
    }
  };

  return (
    <div className="m-2 p-3 bg-[#182237] rounded-xl">
      <div className="flex items-center justify-between">
        <Search placeholder="Search Contracts..." />
      </div>
      <div className="mt-3">
        <table className="w-full">
          <thead>
            <tr>
              <td className="p-3">Request Id</td>
              <td className="p-3">Date</td>
              <td className="p-3">Amount</td>
            </tr>
          </thead>
          <tbody>
            {requests?.map((req) => (
              <tr key={req.reportId}>
                <td className="flex items-center gap-2 p-3">{req.reportId}</td>
                <td className="p-3">{req.reportDate}</td>
                <td className="p-3">{req.amount}</td>
                <td>
                  {!msg ? (
                    <div className="flex items-center gap-4">
                      <button
                        className="p-1 bg-[#f7dc6975] rounded-lg"
                        onClick={() => handleApprove(req.reportId)}
                      >
                        Approve
                      </button>
                      <button
                        className="p-1 bg-[#f7373775] rounded-lg "
                        onClick={() => handleReject(req.reportId)}
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <p className="text-base  text-[#d3d3d3] mt-4 mb-4">
                      {response} Successfully!
                    </p>
                  )}
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

export default PayReqPage;
