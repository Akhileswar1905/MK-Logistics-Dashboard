import React, { useContext, useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { useLocation } from "react-router-dom";
import {
  sendApprovalRequest,
  sendPayRequest,
  sendRejectionRequest,
} from "../../lib/utils";
import { UserContext } from "../../context/UserContext";

const TransactionReportDetailsPage = () => {
  const location = useLocation();
  const { report } = location.state;
  console.log(report);

  const { user } = useContext(UserContext);

  // Loading state
  const [loading, setLoading] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState(null);
  const tripsPerPage = 7; // Number of trips per page

  // Calculate indices for slicing
  const indexOfLastTrip = currentPage * tripsPerPage;
  const indexOfFirstTrip = indexOfLastTrip - tripsPerPage;
  const currentTrips = (report.allPendingTrips || []).slice(
    indexOfFirstTrip,
    indexOfLastTrip
  );

  // Calculate total pages
  const totalPages = Math.ceil(
    (report.allPendingTrips || []).length / tripsPerPage
  );

  // Handlers for pagination
  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSubmit = async () => {
    console.log("Request sent for report:", report.reportId);
    setLoading(true);
    const res = await sendPayRequest(report);
    if (res) {
      setStatus("Request Sent");
    } else {
      setStatus("Request Failed");
    }
    setLoading(false);
  };

  const handleApprove = async () => {
    console.log("Approving report:", report.reportId);
    setLoading(true);
    const res = await sendApprovalRequest(report.reportId);
    if (res) {
      setStatus("Approved");
    } else {
      setStatus("Approval Failed");
    }
    setLoading(false);
  };

  const handleReject = async () => {
    console.log("Rejecting report:", report.reportId);
    setLoading(true);
    const res = await sendRejectionRequest(report.reportId);
    if (res) {
      setStatus("Rejected");
    } else {
      setStatus("Rejection Failed");
    }
    setLoading(false);
  };

  return (
    <div className="p-8 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl text-grayish">Report Details</h1>

        {loading ? (
          <>Processing...</>
        ) : report.status === "Done" ? (
          <div className="flex items-center gap-2">
            <div className="w-[0.75rem] h-[0.75rem] bg-primary-green rounded-full"></div>
            <span>Done</span>
          </div>
        ) : !status ? (
          <div className="flex items-center gap-4">
            <div className="flex gap-2 items-center">
              <div className="w-[0.75rem] h-[0.75rem] bg-yellow-500 rounded-full"></div>
              <span>Pending</span>
            </div>
            {user?.isAdmin ? (
              <div className="flex gap-4">
                <button
                  className="bg-primary-green px-4 py-2 rounded-lg text-white"
                  onClick={handleApprove}
                >
                  Approve
                </button>
                <button
                  className="bg-red-500 px-4 py-2 rounded-lg text-white"
                  onClick={handleReject}
                >
                  Reject
                </button>
              </div>
            ) : (
              <button
                className="bg-primary-green px-4 py-2 rounded-lg text-white"
                onClick={handleSubmit}
              >
                Send Request
              </button>
            )}
          </div>
        ) : (
          <span>{status}</span>
        )}
      </div>
      <div className="border-2 p-6 rounded-lg flex flex-col gap-3">
        <h1 className="text-xl text-grayish">
          Report Id:{" "}
          <span className="text-black text-base">{report.reportId}</span>
        </h1>
        <h1 className="text-xl text-grayish">
          Date:{" "}
          <span className="text-black text-base">{report.reportDate}</span>
        </h1>
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl text-grayish">Trips</h1>
          <table className="border-collapse w-full text-left my-2 mx-3">
            <thead className="text-[var(--grayish)]">
              <tr className="font-light">
                <th className="py-3 font-normal">Driver</th>
                <th className="py-3 font-normal">Vehicle Number</th>
                <th className="py-3 font-normal">Phone Number</th>
                <th className="py-3 font-normal">Trip Id</th>
                <th className="py-3 font-normal">Trip Date & Time</th>
                <th className="py-3 font-normal">Payment Status</th>
              </tr>
            </thead>
            <tbody>
              {currentTrips.length > 0 ? (
                currentTrips.map((trip, index) => (
                  <tr key={index} className="cursor-pointer gap-1">
                    <td className="py-4">{trip.driverName}</td>
                    <td className="py-4">{trip.vehicleNumber}</td>
                    <td className="py-4">{trip.phoneNumber}</td>
                    <td className="py-4">{trip.tripID}</td>
                    <td className="py-4">{`${trip.tripDate}, ${trip.tripTime}`}</td>
                    <td className="py-4 capitalize">{trip.tripPayment}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No trips available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-3 mt-2">
            <button
              aria-label="Previous Page"
              className="px-4 py-2 rounded disabled:opacity-50"
              onClick={handlePrevious}
              disabled={currentPage === 1}
            >
              <GrFormPrevious />
            </button>
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={`p-1  rounded-full ${
                    currentPage === i + 1
                      ? "bg-grayish text-white"
                      : "bg-gray-300"
                  }`}
                  onClick={() => handlePageClick(i + 1)}
                ></button>
              ))}
            </div>
            <button
              aria-label="Next Page"
              className="px-4 py-2 rounded disabled:opacity-50"
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              <GrFormNext />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionReportDetailsPage;
