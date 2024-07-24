"use client";

import { fetchCP, sendReq } from "@/app/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ReportPage = () => {
  const pathName = usePathname();
  const reportId = pathName.split("/").pop();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const getReport = async () => {
      try {
        const id = localStorage.getItem("id");
        const res = await fetchCP(id);
        const foundReport = res.reports.find(
          (report) => report.reportId === reportId
        );
        if (foundReport) {
          setReport(foundReport);
        } else {
          setError("Report not found.");
        }
      } catch (err) {
        setError("Failed to fetch report.");
      } finally {
        setLoading(false);
      }
    };
    getReport();
  }, [reportId, router]);

  const handleRequest = async () => {
    try {
      const details = {
        cpId: localStorage.getItem("id"),
        reportId: report.reportId,
        amount: report.amount,
        data: report.data,
        reportDate: report.reportDate,
        status: "pending",
      };
      const res = await sendReq(details);
      console.log(res);
      if (res) {
        router.back();
      } else {
        setError("Failed to send payment request.");
      }
    } catch (err) {
      setError("Request failed.");
    }
  };

  if (loading) {
    return <p className="text-white">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!report) {
    return <p className="text-red-500">No report available.</p>;
  }

  return (
    <div className="m-2 p-3 bg-[#182237] rounded-xl">
      <p className="text-base text-[#d3d3d3] mt-4 mb-4">
        Report Id: {report.reportId}
      </p>
      <p className="text-base text-[#d3d3d3] mt-4 mb-4">
        Report Date: {report.reportDate}
      </p>
      <p className="text-base text-[#d3d3d3] mt-4 mb-4">
        Amount: {report.amount}
      </p>

      {/* Table to represent the data in the report */}
      <table className="w-full">
        <thead>
          <tr>
            <th className="p-3 font-bold text-lg">Driver Name</th>
            <th className="p-3 font-bold text-lg">Trips Pending</th>
            <th className="p-3 font-bold text-lg">Amount To Be Paid</th>
          </tr>
        </thead>
        <tbody>
          {report.data.map((driver) => (
            <tr key={driver.phoneNumber}>
              <td className="p-3">{driver.driverName}</td>
              <td className="p-3">{driver.pendingTrips?.length || 0}</td>
              <td className="p-3">{driver.totalAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {report && (
        <button
          className="p-2 bg-[#f7dc6975] rounded-lg mt-4"
          onClick={handleRequest}
        >
          Send Payment Request
        </button>
      )}
    </div>
  );
};

export default ReportPage;
