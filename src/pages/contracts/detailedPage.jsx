import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const ContractDetailsPage = () => {
  const location = useLocation();
  const { contract } = location.state;
  const [drivers, setDrivers] = useState([]);
  const { user } = useContext(UserContext);
  useEffect(() => {
    if (user) {
      const matchingDrivers = []; // Temporary array
      user.drivers.forEach((driver) => {
        driver.contractDetails.forEach((con) => {
          if (con.companyId === contract.companyId) {
            matchingDrivers.push(driver); // Collect matching drivers
          }
        });
      });
      setDrivers(matchingDrivers); // Update state once
    }
  }, [user, contract.companyId]); // Added contract._id as dependency

  return (
    <div className="p-8 flex flex-col gap-4">
      <h1 className="text-4xl text-[var(--grayish)]">Contract Details</h1>
      <div className="border-2 rounded-lg p-6 flex flex-col gap-5">
        <div className="flex items-center gap-12">
          <div className="w-[200px] h-[200px] rounded-full bg-[#ddd]"></div>
          <div className="flex flex-col gap-2">
            <p className="mt-4 text-base text-[var(--grayish)]">
              {contract.companyId}
            </p>
            <p className="text-3xl">{contract.companyName}</p>
            <p className="mt-4 text-base text-[var(--grayish)]">
              {contract.phoneNumber}
            </p>
          </div>
        </div>
        <div>
          <h2 className="text-3xl text-[var(--grayish)]">
            Drivers Assigned to
          </h2>
          <table className="border-collapse w-full text-left my-5 ">
            <thead className=" text-[var(--grayish)]">
              <th className="font-normal">Driver Name</th>
              <th className="font-normal">Phone Number</th>
              <th className="font-normal">Vehicle Number</th>
            </thead>
            {drivers.length > 0 ? (
              <tbody>
                {drivers.map((driver) => (
                  <tr key={driver._id}>
                    <td className="py-2">{driver.username}</td>
                    <td className="py-2">{driver.phoneNumber}</td>
                    <td className="py-2">{driver.vehicleNumber}</td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No records found
                </td>
              </tr>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContractDetailsPage;
