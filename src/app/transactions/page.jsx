"use client";

import { useEffect, useState } from "react";
import { fetchAdmin } from "../lib/utils";

const Transactions = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const getAdmin = async () => {
      const res = await fetchAdmin();
      setReports(res[0].payReps);
      console.log(res[0].payReps);
    };
    getAdmin();
  }, []);

  return (
    <div className="p-4 bg-[#182237] m-2 text-white rounded-lg w-full ">
      <table className="w-full">
        <thead>
          <tr>
            <td className=" items-center gap-3 p-2 ">Control Panel</td>
            <td className=" items-center gap-3 p-2 ">Status</td>
            <td className=" items-center gap-3 p-2 ">Date</td>
            <td className=" items-center gap-3 p-2 ">Amount</td>
          </tr>
        </thead>
        <tbody className="p-4 divide-gray-500">
          {reports.map((report) => (
            <tr key={report._id} className="p-3 m-10">
              <td className="flex items-center gap-3 p-2 ">{report.cpId}</td>
              <td>
                <span
                  className="p-1 rounded-lg"
                  style={{ backgroundColor: "#f7cb7375" }}
                >
                  {report.status}
                </span>
              </td>
              <td>{report.date}</td>
              <td>₹{report.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
