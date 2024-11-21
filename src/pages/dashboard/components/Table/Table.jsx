import React, { useContext, useState } from "react";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { BiFilterAlt } from "react-icons/bi";
import { UserContext } from "../../../../context/UserContext";
import { NavLink } from "react-router-dom";

const Table = () => {
  const { user } = useContext(UserContext);
  const [drivers, setDrivers] = useState(user?.drivers || []);
  // Get the data for table rows using the driver's information
  const data = drivers.map((driver) => ({
    username: driver.username, // Assuming the driver has a `name` property
    vehicleNumber: driver.vehicleNumber, // Assuming the driver has a `vehicleNumber` property
    trips: driver.tripDetails.length, // Count the number of trips from the `tripDetails` array
    phoneNumber: driver.phoneNumber, // Assuming the driver has a `phoneNumber`
    email: driver.email, // Assuming the driver has a `email` property
    dob: driver.dob,
    tripDetails: driver.tripDetails,
    earnings: driver.earnings,
    photo: driver.photo,
    amountPaid: `₹${driver.earnings
      .reduce((total, trip) => total + parseFloat(trip.amount || 0), 0)
      .toFixed(2)}`,
    vehicleRC: driver.vehicleRC,
    DrivingLicense: driver.DrivingLicense,
    vehiclePhotos: driver.vehiclePhotos,
    vehicleVideo: driver.vehicleVideo,
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isDateFilterOpen, setIsDateFilterOpen] = useState(false);

  const rowsPerPage = 10;

  // Filter data
  const filteredData = data.filter((row) => {
    const matchesName = row.username
      .toLowerCase()
      .startsWith(filter.toLowerCase());
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

  return (
    <div className="w-[66%] border-2 px-8 py-6 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl text-[var(--grayish)]">Recent Transactions</h2>
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
          {/* <button
            onClick={() => setIsDateFilterOpen(true)}
            className="text-[var(--grayish)] cursor-pointer flex items-center gap-1"
          >
            <BiFilterAlt size={25} />
            Filter by Date
          </button> */}
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
            <th className="py-3 font-normal">Vehicle Number</th>
            <th className="py-3 font-normal">Number of Trips</th>
            <th className="py-3 font-normal">Amount Paid</th>
            <th className="py-3 font-normal">Date</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.length > 0 ? (
            currentRows.map((row, index) => (
              <tr key={index}>
                <NavLink
                  to={`/drivers/${row.phoneNumber}/bio-data`}
                  state={{ driver: row }}
                >
                  <td className="py-4 ">{row.username}</td>
                </NavLink>{" "}
                <td className="py-2">{row.vehicleNumber}</td>
                <td className="py-2">{row.trips}</td>
                <td className="py-2">{row.amountPaid}</td>
                {/* <td className="py-2">{row.date}</td> */}
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
      {totalPages > 0 && (
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
