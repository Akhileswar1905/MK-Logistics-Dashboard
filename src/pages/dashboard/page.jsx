import React, { useContext, useEffect, useState } from "react";
import Card from "./components/Card/Card";
import Table from "./components/Table/Table";
import ContractTable from "./components/Contracts Table/Contracts";
import { UserContext } from "../../context/UserContext";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalTrips, setTotaltrips] = useState(0);

  useEffect(() => {
    if (!user) return; // If no user, just return or handle loading state

    console.log(user.contracts);
    let x = 0;
    user?.drivers.forEach((driver) => {
      x += driver.tripDetails.length;
    });
    setTotaltrips(x);

    let total = 0;
    user?.reports.map((report) => {
      if (report.status === "Done") total += report.amount;
    });
    setTotalAmount(total);
    console.log(user?.prevTrips);
    console.log("Total Trips: ", totalTrips);
  }, [user]); // Run when user state changes

  if (!user) {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <div className="flex flex-col gap-7 p-6">
      <div className="flex items-center justify-around">
        <Card
          title={"Total Drivers"}
          value={user?.drivers.length}
          update={
            user?.drivers.length - user?.prevDrivers > 0
              ? `+${user?.drivers.length - user?.prevDrivers}`
              : `${user?.drivers.length - user?.prevDrivers}`
          }
          width={"33%"}
        />
        <Card
          title={"Total Trips"}
          value={totalTrips}
          update={
            totalTrips - user?.prevTrips > 0
              ? `+${totalTrips - user?.prevTrips}`
              : totalTrips - user?.prevTrips
          }
          width={"33%"}
          msg={` Compared to yesterday`}
        />
        <Card
          title={"Total Contracts"}
          value={user?.contracts.length}
          update={user?.prevContracts}
          width={"33%"}
        />
      </div>
      <div className="flex gap-2 ">
        <Table />
        <div className="flex flex-col gap-2 w-[33%]  ">
          <Card
            title={"Total Amount Transferred"}
            value={totalAmount}
            update={"0"}
            width={"100%"}
          />
          <ContractTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
