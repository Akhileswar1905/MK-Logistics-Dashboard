import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/UserContext";
// import Card from "./components/Card/Card";
// import Table from "./components/Table/Table";
// import ContractTable from "./components/Contracts Table/Contracts";

const AdminDashboard = () => {
  const { user } = useContext(UserContext);
  console.log(user);

  return (
    <div className="flex flex-col gap-7 p-6">
      <div className="flex items-center justify-around">AdminDashboard</div>
    </div>
  );
  //   const [totalAmount, setTotalAmount] = useState(0);
  //   const [totalTrips, setTotaltrips] = useState(0);
  //   const [updateTotalTrips, setUpdateTotaltrips] = useState(0);
  //   const [updateContracts, setUpdateContracts] = useState(0);

  //   useEffect(() => {
  //     if (!user) return; // If no user, just return or handle loading state
  //     setUpdateTotaltrips(0);
  //     setUpdateContracts(0);
  //     const today = new Date();

  //     const yesterdayStart = new Date(
  //       today.getFullYear(),
  //       today.getMonth(),
  //       today.getDate(),
  //       0,
  //       0,
  //       0
  //     );
  //     const thirtyDaysBack = new Date(
  //       today.getFullYear(),
  //       today.getMonth(),
  //       today.getDate() - 30,
  //       0,
  //       0,
  //       0
  //     );

  //     const yesterdayEnd = new Date(
  //       today.getFullYear(),
  //       today.getMonth(),
  //       today.getDate(),
  //       today.getHours(),
  //       today.getMinutes(),
  //       today.getSeconds()
  //     );

  //     user?.contracts.forEach((contract) => {
  //       if (contract.createAt) {
  //         const createAt = new Date(contract.createAt);
  //         if (thirtyDaysBack <= createAt && createAt >= yesterdayStart) {
  //           setUpdateContracts((prevTotal) => prevTotal + 1);
  //           console.log(contract.companyName);
  //         }
  //       }
  //     });

  //     user?.drivers.forEach((driver) => {
  //       driver?.tripDetails.forEach((trip) => {
  //         const lis = trip.tripDate.split("-");
  //         const tripDate = new Date(lis[2], parseInt(lis[1]) - 1, lis[0]);
  //         if (tripDate >= yesterdayStart && tripDate <= yesterdayEnd) {
  //           setUpdateTotaltrips((prevTotal) => prevTotal + 1);
  //         }
  //       });
  //     });
  //     console.log(user.contracts);
  //     let x = 0;
  //     user?.drivers.forEach((driver) => {
  //       x += driver.tripDetails.length;
  //     });
  //     setTotaltrips(x);

  //     let total = 0;
  //     user?.reports.map((report) => {
  //       if (report.status === "Done") total += report.amount;
  //     });
  //     setTotalAmount(total);
  //     console.log(user?.prevTrips);
  //     console.log("Total Trips: ", totalTrips);
  //   }, [user]); // Run when user state changes

  //   if (!user) {
  //     return <div>Loading...</div>; // Handle loading state
  //   }

  //   return (
  //     <div className="flex flex-col gap-7 p-6">
  //       <div className="flex items-center justify-around">
  //         <Card
  //           title={"Total Drivers"}
  //           value={user?.drivers.length}
  //           update={
  //             user?.drivers.length - user?.prevDrivers > 0
  //               ? `+${user?.drivers.length - user?.prevDrivers}`
  //               : `${user?.drivers.length - user?.prevDrivers}`
  //           }
  //           width={"33%"}
  //         />
  //         <Card
  //           title={"Total Trips"}
  //           value={totalTrips}
  //           update={`+${updateTotalTrips}`}
  //           width={"33%"}
  //           msg={`Trips today`}
  //         />
  //         <Card
  //           title={"Total Contracts"}
  //           value={user?.contracts.length}
  //           update={`+${updateContracts}`}
  //           width={"33%"}
  //         />
  //       </div>
  //       <div className="flex gap-2 ">
  //         <Table />
  //         <div className="flex flex-col gap-2 w-[33%]  ">
  //           <Card
  //             title={"Total Amount Transferred"}
  //             value={totalAmount}
  //             update={"0"}
  //             width={"100%"}
  //           />
  //           <ContractTable />
  //         </div>
  //       </div>
  //     </div>
  //   );
};

export default AdminDashboard;
