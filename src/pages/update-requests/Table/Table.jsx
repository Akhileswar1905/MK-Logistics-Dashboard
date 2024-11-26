import React, { useContext, useEffect, useState } from "react";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { BiFilterAlt } from "react-icons/bi";
import { UserContext } from "../../../context/UserContext";
import { NavLink } from "react-router-dom";
import { sendApprovalResponse } from "../../../lib/utils";
import { FaRegCheckCircle } from "react-icons/fa";

const Table = () => {
  const { user } = useContext(UserContext);
  const [requests, setRequests] = useState([]);
  const [drivers, setDrivers] = useState([]);
  useEffect(() => {
    setRequests(user.updates || []); // Ensure `user.updates` is defined
    setDrivers(user.drivers || []); // Ensure `user.drivers
  }, [user]);

  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isDateFilterOpen, setIsDateFilterOpen] = useState(false);

  const getDriver = (phoneNumber) => {
    const driver = drivers.find((driver) => driver.phoneNumber === phoneNumber);
    return driver ? driver : "Unknown Driver";
  };
  const rowsPerPage = 10;

  // Filter data
  const filteredData = requests.filter((row) => {
    const matchesName = getDriver(row.phoneNumber)
      .username?.toLowerCase()
      .includes(filter.toLowerCase());
    const withinDateRange =
      (!startDate || row.date >= startDate) &&
      (!endDate || row.date <= endDate);

    return matchesName && withinDateRange;
  });

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRows = filteredData.slice(startIndex, startIndex + rowsPerPage);

  const changePage = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  const handleAccept = async (e, data) => {
    const res = await sendApprovalResponse(data);
    if (res) {
      setRequests(res);
    }
  };

  return (
    <div className=" border-2 px-8 py-6 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl text-[var(--grayish)]">Update Requests</h2>
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
            <th className="py-3 font-normal">Driver Name</th>
            <th className="py-3 font-normal">Phone Number</th>
            <th className="py-3 font-normal">Status</th>
            <th className="py-3 font-normal">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.length > 0 ? (
            currentRows.map((row, index) => (
              <tr key={index} className="cursor-pointer  gap-1">
                <td className="py-2">{getDriver(row.phoneNumber).username}</td>
                <td className="py-2">{row.phoneNumber}</td>
                <td className="py-2  capitalize">{row.trip.status}</td>
                <td className="py-2 flex gap-6">
                  {row.trip.status === "not-allowed" ? (
                    <button
                      className="text-[green] border-2 p-2 rounded-md"
                      onClick={(e) => handleAccept(e, row)}
                    >
                      Accept
                    </button>
                  ) : (
                    <p>
                      <span className="text-primary-green capitalize flex items-center gap-2">
                        <FaRegCheckCircle />
                        Allowed
                      </span>
                    </p>
                  )}
                  {/* <button
                    className="text-[red] border-2 p-2 rounded-md"
                    // onClick = {() => handleDecline(e, row._id)}
                  >
                    Decline
                  </button> */}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4">
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
