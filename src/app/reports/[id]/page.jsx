"use client";
import { fetchCP, sendReq } from "@/app/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ReportPage = () => {
  const pathName = usePathname();
  const reportId = pathName.split("/").pop();
  const [report, setReport] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const getReport = async () => {
      const id = localStorage.getItem("id");
      const res = await fetchCP(id);
      const rep = res.reports.filter((report) => report.reportId === reportId);
      setReport(rep[0]);
    };
    getReport();
  }, [reportId]);

  const handleRequest = async () => {
    const details = {
      cpId: localStorage.getItem("id"),
      reportId: report.reportId,
      amount: report.amount,
      data: report.data,
      reportDate: report.reportDate,
      status: "pending",
    };
    const res = await sendReq(details);
    if (res.status === 200) router.back();
  };

  return (
    <div className="m-2 p-3 bg-[#182237] rounded-xl">
      <p className="text-base  text-[#d3d3d3] mt-4 mb-4">
        Report Id: {report?.reportId}
      </p>

      <p className="text-base  text-[#d3d3d3] mt-4 mb-4">
        Report Date: {report?.reportDate}
      </p>

      <p className="text-base  text-[#d3d3d3] mt-4 mb-4">
        Amount: {report?.amount}
      </p>

      {/* Table To Represent the data in report */}
      <table className="w-full">
        <thead>
          <tr>
            <td className="p-3 font-bold text-lg">Driver Name</td>
            <td className="p-3 font-bold text-lg">Trips Pending</td>
            <td className="p-3 font-bold text-lg">Amount To Be Paid</td>
          </tr>
        </thead>
        <tbody>
          {report?.data.map((driver) => (
            <tr key={driver?.phoneNumber}>
              <td className="p-3">{driver?.driverName}</td>
              <td className="p-3">{driver?.pendingTrips.length || 0}</td>
              <td className="p-3">{driver?.totalAmount}</td>
            </tr>
          ))}
        </tbody>
        <button
          className="p-2 bg-[#f7dc6975] rounded-lg mt-4"
          onClick={handleRequest}
        >
          Send Payment Request
        </button>
      </table>
    </div>
  );
};

export default ReportPage;
