import React from "react";
import { useLocation } from "react-router-dom";
import ProfileLabel from "../components/ProfileLabel";

const BioData = () => {
  const location = useLocation();
  const { cp } = location.state;
  console.log(cp);
  return (
    <div className="p-8 flex flex-col gap-4">
      <h1 className="text-3xl text-grayish">Control Panel</h1>
      <div className="p-6 flex flex-col gap-3 border-2 rounded-lg">
        {/* Profile */}
        <div className="flex items-center gap-12 py-4">
          <div>
            {<div className="w-[200px] h-[200px] rounded-full bg-[#ddd]"></div>}
          </div>
          <div className="flex flex-col gap-2">
            <p className="mt-4 text-sm text-[var(--grayish)]">{cp._id}</p>
            <h2 className="text-4xl ">{cp.name}</h2>
            <p className="text-base text-[var(--grayish)]">{cp.phoneNumber}</p>
          </div>
        </div>
        {/* Personal Details */}
        <div>
          <h1 className="text-[var(--grayish)] text-2xl">Personal Details</h1>
          <div className="my-2 flex flex-wrap ">
            <ProfileLabel label={"Name"} value={cp.name} />
            <ProfileLabel label={"Phone Number"} value={cp.phoneNumber} />
            <ProfileLabel label={"Date of Joining"} value={cp.dateOfJoining} />
            <ProfileLabel label={"Drivers"} value={cp.drivers.length} />
          </div>
          <div className="border-2"></div>

          <h1 className="text-[var(--grayish)] text-2xl mt-5">Drivers</h1>
          <table className="border-collapse w-full text-left my-5 ">
            <thead className="text-[var(--grayish)]">
              <tr className="font-light">
                <th className="py-3 font-normal">Driver Name</th>
                <th className="py-3 font-normal">Vehicle Number</th>
                <th className="py-3 font-normal">Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {cp.drivers.length > 0 ? (
                cp.drivers.map((driver) => (
                  <tr key={driver.id}>
                    <td>{driver.username}</td>
                    <td>{driver.vehicleNumber}</td>
                    <td>{driver.phoneNumber}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="py-3 text-center">
                    No drivers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="border-2"></div>
          <h1 className="text-[var(--grayish)] text-2xl mt-6">Contracts</h1>
          <table className="border-collapse w-full text-left my-5 ">
            <thead className="text-[var(--grayish)]">
              <tr className="font-light">
                <th className="py-3 font-normal">Company Name</th>
                <th className="py-3 font-normal">Company Contact</th>
                <th className="py-3 font-normal">Date of Contract</th>
              </tr>
            </thead>
            <tbody>
              {cp.contracts.length > 0 ? (
                cp.contracts.map((contract) => (
                  <tr key={contract.contractId}>
                    <td>{contract.companyName}</td>
                    <td>{contract.contactNumber}</td>
                    <td>{contract.createdAt}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="py-3 text-center">
                    No drivers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BioData;
