import React from "react";
import { useLocation } from "react-router-dom";
import Label from "../components/Label";

const BioData = () => {
  const location = useLocation();
  const { driver } = location.state;

  return (
    <div className="p-6 flex flex-col gap-3">
      {/* Profile */}
      <div className="flex items-center gap-12 py-4">
        <div>
          {driver.photo ? (
            <img
              src={driver.photo}
              alt="Driver's Photo"
              className="w-[200px] h-[200px] rounded-full"
            />
          ) : (
            <div className="w-[200px] h-[200px] rounded-full bg-[#ddd]"></div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-4xl ">{driver.username}</h2>
          <p className="text-base text-[var(--grayish)]">
            {driver.phoneNumber}
          </p>
        </div>
      </div>
      {/* Personal Details */}
      <div>
        <h1 className="text-[var(--grayish)] text-2xl">Personal Details</h1>
        <div className="my-2 flex flex-wrap ">
          <Label label={"Name"} value={driver.username} />
          <Label label={"Phone Number"} value={driver.phoneNumber} />
          <Label label={"Email"} value={driver.email} />
          <Label label={"Date of Birth"} value={driver.dob} />
        </div>
      </div>
      {/* Driving Details */}
      <div>
        <h1 className="text-[var(--grayish)] text-2xl">Driving Details</h1>
        <div className="my-2 flex flex-wrap ">
          <Label label={"Driver License"} value={"Driving License Link"} />
          <Label label={"Vehicle RC"} value={"Vehicle RC Link"} />
          <Label label={"Vehicle Number"} value={driver.vehicleNumber} />
          <Label label={"Vehicle Photo"} value={"Vehicle Photo Link"} />
          <Label label={"Vehicle Video"} value={"Vehicle Video Link"} />
        </div>
      </div>
    </div>
  );
};

export default BioData;
