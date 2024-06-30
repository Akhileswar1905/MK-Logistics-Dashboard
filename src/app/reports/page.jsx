"use client";
import Pagination from "@/components/Pagination/Pagination";
import Search from "@/components/Search/Search";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { deleteReport, fetchCP, generateReport } from "../lib/utils";

const Reports = () => {
  const [user, setUser] = useState([]);
  const [reports, setReports] = useState(null);
  const [currentReports, setCurrentReports] = useState(null);
  const [report, setReport] = useState(null);
  useEffect(() => {
    const getUsers = async () => {
      const id = localStorage.getItem("id");
      const res = await fetchCP(id);
      setUser(res);
      setCurrentReports(res?.reports);
      setReports(res?.reports);
    };
    getUsers();
  }, []);

  const generateRep = async () => {
    const id = localStorage.getItem("id");
    const res = await generateReport(id);
    console.log(res);
    setReport(res);
    currentReports.push(res);
  };

  const handleDelete = async (reportId) => {
    const id = localStorage.getItem("id");
    const res = await deleteReport(id, reportId);
    console.log(res.reports);
    setReport(res.reports ? res.reports : []);
    setCurrentReports(res.reports ? res.reports : []);
  };

  return (
    <div className="m-2 p-3 bg-[#182237] rounded-xl">
      <div className="flex items-center justify-between">
        <Search placeholder="Search Contracts..." />
        <button
          className="bg-[#5d57c9] text-white px-2 py-1 rounded-lg  flex items-center justify-center gap-2"
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
            {currentReports?.map((report) => (
              <tr key={report.reportId}>
                <td className="p-3">{report.reportId}</td>
                <td className="p-3">{report.reportDate}</td>
                <td className="p-3">{report.amount}</td>
                {/* Delete and View Btns */}
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

export default Reports;
