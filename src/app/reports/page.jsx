"use client";
import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import Pagination from "@/components/Pagination/Pagination";
import Search from "@/components/Search/Search";
import { deleteReport, fetchCP, generateReport } from "../lib/utils";

const Reports = () => {
  const [user, setUser] = useState([]);
  const [reports, setReports] = useState([]);
  const [currentReports, setCurrentReports] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const id = localStorage.getItem("id");
      if (id) {
        try {
          const res = await fetchCP(id);
          setUser(res);
          setReports(res?.reports || []);
          setCurrentReports(res?.reports || []);
        } catch (error) {
          console.error("Error fetching user data:", error);
          // Handle the error appropriately (e.g., show a message to the user)
        }
      } else {
        // Handle the case where id is not found in localStorage
        // For example, redirect to login
        // router.push("/login");
      }
    };
    getUsers();
  }, []);

  const generateRep = async () => {
    const id = localStorage.getItem("id");
    if (id) {
      try {
        const res = await generateReport(id);
        console.log(res);
        setReports([...reports, res]);
        setCurrentReports([...currentReports, res]);
      } catch (error) {
        console.error("Error generating report:", error);
        // Handle the error appropriately
      }
    }
  };

  const handleDelete = async (reportId) => {
    const id = localStorage.getItem("id");
    if (id) {
      try {
        const res = await deleteReport(id, reportId);
        console.log(res.reports);
        setReports(res.reports ? res.reports : []);
        setCurrentReports(res.reports ? res.reports : []);
      } catch (error) {
        console.error("Error deleting report:", error);
        // Handle the error appropriately
      }
    }
  };

  return (
    <div className="m-2 p-3 bg-[#182237] rounded-xl">
      <div className="flex items-center justify-between">
        <Search placeholder="Search Contracts..." />
        <button
          className="bg-[#5d57c9] text-white px-2 py-1 rounded-lg flex items-center justify-center gap-2"
          onClick={generateRep}
        >
          <FaPlus />
          Generate Report
        </button>
      </div>
      <div className="mt-3">
        <table className="w-full">
          <thead>
            <tr>
              <td className="p-3">Report Id</td>
              <td className="p-3">Report Date</td>
              <td className="p-3">Amount</td>
            </tr>
          </thead>
          <tbody>
            {currentReports.map((report) => (
              <tr key={report.reportId}>
                <td className="p-3">{report.reportId}</td>
                <td className="p-3">{report.reportDate}</td>
                <td className="p-3">{report.amount}</td>
                <td className="p-3">
                  <Link href={`/reports/${report.reportId}`}>
                    <button className="p-1 rounded-lg bg-[#f7dc6975] mx-2">
                      View
                    </button>
                  </Link>
                  <button
                    className="p-1 rounded-lg bg-[#f7373775]"
                    onClick={() => handleDelete(report.reportId)}
                  >
                    Delete
                  </button>
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

const ReportsWithSuspense = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Reports />
  </Suspense>
);

export default ReportsWithSuspense;
