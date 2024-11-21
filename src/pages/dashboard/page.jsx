import React, { useContext, useEffect, useState } from "react";
import Card from "./components/Card/Card";
import Table from "./components/Table/Table";
import ContractTable from "./components/Contracts Table/Contracts";
import { UserContext } from "../../context/UserContext";
import { getAllDrivers } from "../../lib/utils";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [dashboardMetrics, setDashboardMetrics] = useState({
    totalAmount: 0,
    totalTrips: 0,
    totalDrivers: 0,
    totalControlPanels: 0,
    updateTotalTrips: 0,
    updateContracts: 0,
    updateControlPanels: 0,
  });
  const [drivers, setDrivers] = useState([]);

  // Utility function to parse date in DD-MM-YYYY format
  const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  useEffect(() => {
    if (!user) {
      console.warn("User data not available");
      return;
    }
    const today = new Date();
    const thirtyDaysBack = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 30
    );
    const yesterdayStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      0,
      0,
      0
    );
    const calculateMetrics = () => {
      let tempContracts = 0;
      let tempTrips = 0;
      let tempDrivers = 0;

      // Count contracts created within the last 30 days
      user?.contracts.forEach((contract) => {
        const createAt = new Date(contract.createdAt);
        if (createAt >= thirtyDaysBack) {
          tempContracts++;
        }
      });

      // Count trips within the last day
      user.drivers.forEach((driver) => {
        driver.tripDetails.forEach((trip) => {
          const tripDate = parseDate(trip.tripDate);
          if (tripDate >= yesterdayStart && tripDate <= today) {
            tempTrips++;
          }
        });

        // Count drivers who joined within the last 30 days
        const joinDate = new Date(driver.dateOfJoining);
        if (joinDate >= thirtyDaysBack) {
          tempDrivers++;
        }
      });

      // Calculate total trips and total amount transferred
      const totalDriversTrips = user.drivers.reduce(
        (acc, driver) => acc + driver.tripDetails.length,
        0
      );
      const totalAmountTransferred = user.reports.reduce(
        (acc, report) => (report.status === "Done" ? acc + report.amount : acc),
        0
      );

      setDashboardMetrics({
        totalAmount: totalAmountTransferred,
        totalTrips: totalDriversTrips,
        totalDrivers: tempDrivers,
        updateTotalTrips: tempTrips,
        updateContracts: tempContracts,
      });
    };

    const calculateAdminMetrics = async () => {
      let tempDrivers = 0;
      let tempControlPanels = 0;
      let tempContracts = 0;

      // Count drivers who joined within the last 30 days
      const drivers = await getAllDrivers();

      drivers.forEach((driver) => {
        const joinDate = new Date(driver.dateOfJoining);
        if (joinDate >= thirtyDaysBack) {
          tempDrivers++;
        }
      });

      // Count control panels created within the last 30 days
      user[0]?.controlPanels.forEach((controlPanel) => {
        const createdAt = new Date(controlPanel.dateOfJoining);
        console.log(createdAt);
        if (createdAt >= thirtyDaysBack) {
          tempControlPanels++;
        }
      });

      // Count contracts created within the last 30 days
      user[0]?.contracts.forEach((contract) => {
        const createAt = new Date(contract.createdAt);
        if (createAt >= thirtyDaysBack) {
          tempContracts++;
        }
      });

      setDashboardMetrics({
        totalDrivers: tempDrivers,
        updateContracts: tempContracts,
        updateControlPanels: tempControlPanels,
      });
      setDrivers(drivers);
    };

    setIsAdmin(user?.isAdmin);
    if (!user?.isAdmin) {
      calculateMetrics();
    } else {
      calculateAdminMetrics();
    }
    setLoading(false);
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-7 p-6">
      <div className="flex items-center justify-around">
        {!isAdmin ? (
          <Card
            title={"Total Drivers"}
            value={user?.drivers.length}
            update={`+${dashboardMetrics.totalDrivers}`}
            width={"33%"}
          />
        ) : (
          <Card
            title={"Total Drivers"}
            value={drivers.length}
            update={`+${dashboardMetrics.totalDrivers}`}
            width={"33%"}
          />
        )}
        {!isAdmin ? (
          <Card
            title={"Total Trips"}
            value={dashboardMetrics.totalTrips}
            update={`+${dashboardMetrics.updateTotalTrips}`}
            width={"33%"}
            msg={`Trips today`}
          />
        ) : (
          <Card
            title={"Total Control Panels"}
            value={user[0]?.controlPanels.length}
            update={`+${dashboardMetrics.updateControlPanels}`}
            width={"33%"}
          />
        )}
        {isAdmin ? (
          <Card
            title={"Total Contracts"}
            value={user[0]?.contracts.length}
            update={`+${dashboardMetrics.updateContracts}`}
            width={"33%"}
          />
        ) : (
          <Card
            title={"Total Contracts"}
            value={user?.contracts.length}
            update={`+${dashboardMetrics.updateContracts}`}
            width={"33%"}
          />
        )}
      </div>
      <div className="flex gap-2">
        {!isAdmin && <Table />}
        <div className="flex flex-col gap-2 w-[33%]">
          {/* {!isAdmin && (
            <Card
              title={"Total Amount Transferred"}
              value={dashboardMetrics.totalAmount}
              update={"0"}
              width={"100%"}
            />
          )} */}
          <ContractTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
