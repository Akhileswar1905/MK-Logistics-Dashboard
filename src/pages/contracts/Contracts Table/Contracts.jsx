import React, { useState } from "react";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

const ContractTable = () => {
  const data = Array.from({ length: 100 }, (_, i) => ({
    companyName: `Company ${i + 1}`,
    phoneNumber: `${Math.floor(Math.random() * 10000000000)}`,
    date: new Date(Date.now() - i * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState(""); // New state for the filter

  const rowsPerPage = 10;

  // Filter data
  const filteredData = data.filter((row) =>
    row.companyName.toLowerCase().includes(filter.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRows = filteredData.slice(startIndex, startIndex + rowsPerPage);

  const changePage = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  return (
    <div className="w-full border-2 px-8 py-6 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl text-[var(--grayish)]">Contracts</h2>
        <div className="flex gap-4">
          {/* Filter Input */}
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter by Company Name"
            className="border px-3 py-2 rounded-lg "
          />
        </div>
      </div>
      <table className="border-collapse w-full text-left my-5">
        <thead className="text-[var(--grayish)]">
          <tr className="font-light">
            <th className="py-3 font-normal">Company Picture</th>
            <th className="py-3 font-normal">Company Name</th>
            <th className="py-3 font-normal">Contact Number</th>
            <th className="py-3 font-normal">Date of Contract</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row, index) => (
            <tr key={index} className="cursor-pointer ">
              <td className="py-4">
                <div className="w-[30px] h-[30px] rounded-full bg-[#ddd]"></div>
              </td>
              <td className="py-4">{row.companyName}</td>
              <td className="py-4">{row.phoneNumber}</td>
              <td className="py-4">{row.date}</td>
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
