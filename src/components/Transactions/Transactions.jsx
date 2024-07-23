"use client";
import { fetchAdmin, fetchCP } from "@/app/lib/utils";
import React, { useEffect, useState } from "react";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isAdminValue = window.localStorage.getItem("isAdmin");
      setIsAdmin(isAdminValue);
    }
  }, []);

  useEffect(() => {
    const getTransactions = async () => {
      if (isAdmin === "true") {
        const res = await fetchAdmin();
        setTransactions(res[0].payReps);
        console.log(res[0].payReps);
      } else {
        const id = window.localStorage.getItem("id");
        const res = await fetchCP(id);
        setTransactions(res.reports);
        console.log(res.reports);
      }
    };
    if (isAdmin !== null) {
      getTransactions();
    }
  }, [isAdmin]);

  return (
    <div className="p-4 bg-[#182237] m-2 text-white rounded-lg w-full h-full">
      <h2 className="text-2xl font-semibold rounded-lg w-full">
        Latest Transactions
      </h2>
      <table className="w-full">
        <thead>
          <tr>
            <td className="items-center gap-3 p-2">Control Panel</td>
            <td className="items-center gap-3 p-2">Date</td>
            <td className="items-center gap-3 p-2">Amount</td>
          </tr>
        </thead>
        <tbody className="p-4 divide-gray-500">
          {transactions.map((transaction) => (
            <tr key={transaction.reportId} className="p-3 m-10">
              <td className="flex items-center gap-3 p-2">
                {transaction.cpId}
              </td>
              <td>{transaction.reportDate}</td>
              <td>₹{transaction.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
