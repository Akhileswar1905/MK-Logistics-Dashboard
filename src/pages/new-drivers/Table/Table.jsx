import React, { useContext, useState } from "react";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { BiFilterAlt } from "react-icons/bi";
import { UserContext } from "../../../context/UserContext";
import { NavLink, useNavigate } from "react-router-dom";
import { acceptDriver, rejectDriver } from "../../../lib/utils";

const Table = () => {
  const { user } = useContext(UserContext);
  const drivers = user?.requests || []; // Use drivers from the user context
  console.log(drivers);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isDateFilterOpen, setIsDateFilterOpen] = useState(false);
  const router = useNavigate();

  const rowsPerPage = 10;

  // Filter drivers based on search and date range
  const filteredData = drivers.filter((driver) => {
    const matchesName = driver.username
      ?.toLowerCase()
      .includes(filter.toLowerCase());
    const withinDateRange =
      (!startDate || driver.date >= startDate) &&
      (!endDate || driver.date <= endDate);

    return matchesName && withinDateRange;
  });

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRows = filteredData.slice(startIndex, startIndex + rowsPerPage);

  const changePage = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  const handleAccept = async (e, id) => {
    e.preventDefault();
    const res = await acceptDriver(id);
    if (res) {
      router("/drivers");
    }
  };

  const handleDecline = async (e, id) => {
    e.preventDefault();
    const res = await rejectDriver(id);
    if (res) {
      router("/drivers");
    }
  };
  return (
    <div className="border-2 px-8 py-6 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl text-[var(--grayish)]">Joining Requests</h2>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Filter by Driver Name..."
              className="border px-3 py-2 rounded-lg w-56"
            />
          </div>
          <button
            onClick={() => setIsDateFilterOpen(true)}
            className="text-[var(--grayish)] cursor-pointer flex items-center gap-1"
          >
            <BiFilterAlt size={25} />
            Filter by Date
          </button>
        </div>
      </div>

      {/* Date Range Filter Dialog */}
      {isDateFilterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-10 rounded-lg shadow-lg relative flex flex-col gap-5">
            <h3 className="text-xl font-semibold mb-4 text-[var(--grayish)] ">
              Filter by Date Range
            </h3>
            <div className="flex gap-4 flex-col">
              <div>
                <label className="block text-[var(--grayish)]">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="border px-3 py-2 rounded-lg w-full text-[var(--grayish)]"
                />
              </div>
              <div>
                <label className="block text-[var(--grayish)]">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="border px-3 py-2 rounded-lg w-full text-[var(--grayish)]"
                />
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setIsDateFilterOpen(false)}
                className="px-4 py-2 rounded-lg border-2"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsDateFilterOpen(false)}
                className="px-4 py-2 rounded-lg bg-[var(--primary-green)] text-white"
              >
                Apply Filter
              </button>
            </div>
          </div>
        </div>
      )}

      <table className="border-collapse w-full text-left my-5">
        <thead className="text-[var(--grayish)]">
          <tr className="font-light">
            <th className="py-3 font-normal ">Driver Name</th>
            <th className="py-3 font-normal">Vehicle Number</th>
            <th className="py-3 font-normal">Phone Number</th>
            <th className="py-3 font-normal">Date of Joining</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.length > 0 ? (
            currentRows.map((row, index) => (
              <tr key={index} className="cursor-pointer gap-1">
                <NavLink
                  to={`/new-driver/${row.phoneNumber}/bio-data`}
                  state={{ driver: row }}
                >
                  <td className="py-2">{row.username}</td>
                </NavLink>
                <td className="py-2">{row.vehicleNumber}</td>
                <td className="py-2">{row.phoneNumber}</td>
                <td className="py-2">{row.dateOfJoining}</td>
                <td className="py-2 flex gap-6">
                  <button
                    className="text-[var(--primary-green)] border-2 p-2 rounded-md"
                    onClick={(e) => handleAccept(e, row._id)}
                  >
                    Accept
                  </button>
                  <button
                    className="text-[red] border-2 p-2 rounded-md"
                    onClick={(e) => handleDecline(e, row._id)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4">
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {totalPages > 1 && (
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
      )}
    </div>
  );
};

export default Table;
