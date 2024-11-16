import React, { useState } from "react";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

const ContractTable = () => {
  const data = Array.from({ length: 20 }, (_, i) => ({
    companyName: `Company ${i + 1}`,
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRows = data.slice(startIndex, startIndex + rowsPerPage);

  const changePage = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  return (
    <div className="w-full border-2 px-8 py-6 rounded-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl text-[var(--grayish)]">New Contracts</h2>
      </div>
      <table className="border-collapse w-full text-left my-5">
        <thead className="text-[var(--grayish)]">
          <tr className="font-light">
            <th className="py-3 font-normal">Company Picture</th>
            <th className="py-3 font-normal">Company Name</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row, index) => (
            <tr key={index}>
              <td className="py-2 items-center">
                <div className="w-[25px] h-[25px] rounded-full bg-[#ddd]"></div>
              </td>
              <td className="py-2">{row.companyName}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 items-center">
        <button
          onClick={() => changePage(currentPage - 1)}
          className="text-[var(--grayish)]"
          disabled={currentPage === 1}
        >
          <GrFormPrevious />
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => changePage(i + 1)}
            className={`px-1 py-1 w-1 h-1 border rounded-lg mx-1 ${
              currentPage === i + 1
                ? "bg-[var(--grayish)] text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          ></button>
        ))}
        <button
          className="text-[var(--grayish)]"
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <GrFormNext />
        </button>
      </div>
    </div>
  );
};

export default ContractTable;