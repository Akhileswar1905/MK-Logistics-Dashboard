"use client";
import { fetchAdmin, fetchCP } from "@/app/lib/utils";
import React, { useEffect, useState } from "react";

const Transactions = () => {
  const isAdmin = localStorage.getItem("isAdmin");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const getTransactions = async () => {
      if (isAdmin === "true") {
        const res = await fetchAdmin();
        setTransactions(res[0].payReps);
        console.log(res[0].payReps);
      } else {
        const id = localStorage.getItem("id");
        const res = await fetchCP(id);
        setTransactions(res.reports);
        console.log(res.reports);
      }
    };
    getTransactions();
  }, [isAdmin]);

  return (
    <div className="p-4 bg-[#182237] m-2 text-white rounded-lg w-full h-full ">
      <h2 className="text-2xl font-semibold rounded-lg w-full">
        Latest Transactions
      </h2>
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
          {transactions.map((transaction) => (
            <tr key={transaction._id} className="p-3 m-10">
              <td className="flex items-center gap-3 p-2 ">
                {transaction.cpId}
              </td>
              <td>
                <span
                  className="p-1 rounded-lg"
                  style={{ backgroundColor: "#f7cb7375" }}
                >
                  {transaction.status}
                </span>
              </td>
              <td>{transaction.date}</td>
              <td>₹{transaction.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
