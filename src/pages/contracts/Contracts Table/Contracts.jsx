import React, { useContext, useEffect, useState } from "react";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { UserContext } from "../../../context/UserContext";
import { NavLink } from "react-router-dom";

const ContractTable = () => {
  const [companies, setCompanies] = useState([]); // Use user contracts
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState(""); // New state for the filter
  const rowsPerPage = 10;
  const { user } = useContext(UserContext);

  // Effect to load contracts based on user data
  useEffect(() => {
    setCompanies(user?.contracts || []); // For non-admin users
    setCurrentPage(1); // Reset the current page when the user changes
  }, [user, user?.contracts]);

  // Format date utility
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    if (!isNaN(date)) {
      return date.toLocaleDateString();
    }
    return "Invalid date";
  };

  // Filter the company data
  const filteredData =
    companies?.filter((row) =>
      row.companyName.toLowerCase().startsWith(filter.toLowerCase())
    ) || [];

  const totalPages = Math.ceil(filteredData?.length / rowsPerPage);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRows = filteredData.slice(startIndex, startIndex + rowsPerPage);

  const changePage = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  return (
    <div className="w-full border-2 px-8 py-6 rounded-lg">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl text-[var(--grayish)]">Contracts</h2>
        <div className="flex gap-4">
          {/* Filter Input */}
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter by Company Name"
            className="border px-3 py-2 rounded-lg"
          />

          {/* Add New Contract Button */}
          {user?.isAdmin && (
            <NavLink
              to={"new-contract"}
              className="bg-[var(--primary-green)] text-white px-4 py-2 rounded-lg"
            >
              Add New Contract
            </NavLink>
          )}
        </div>
      </div>

      {/* Contracts Table */}
      <table className="border-collapse w-full text-left my-5">
        <thead className="text-[var(--grayish)]">
          <tr className="font-light">
            <th className="py-3 font-normal">Company Name</th>
            <th className="py-3 font-normal">Contact Number</th>
            <th className="py-3 font-normal">Date of Contract</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.length > 0 ? (
            currentRows?.map((row, index) => (
              <tr key={index} className="cursor-pointer">
                <td className="py-4 flex items-center gap-3">
                  <NavLink
                    to={`/contracts/${row.contractId}`}
                    state={{ contract: row }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-[30px] h-[30px] rounded-full bg-[#ddd]"></div>
                    {row.companyName}
                  </NavLink>
                </td>
                <td className="py-4">{row.contactNumber}</td>
                <td className="py-4">{formatDate(row.createdAt)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="py-4 text-center">
                No contracts found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 items-center">
        <button
          onClick={() => changePage(currentPage - 1)}
          className={`text-[var(--grayish)] ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={currentPage === 1}
        >
          <GrFormPrevious />
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={`page-button-${i}`}
            onClick={() => changePage(i + 1)}
            className={`px-1 py-1 border rounded-lg  ${
              currentPage === i + 1
                ? "bg-[var(--grayish)] text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          ></button>
        ))}
        <button
          onClick={() => changePage(currentPage + 1)}
          className={`text-[var(--grayish)] ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={currentPage === totalPages}
        >
          <GrFormNext />
        </button>
      </div>
    </div>
  );
};

export default ContractTable;
