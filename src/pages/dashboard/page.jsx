import React, { useContext, useEffect, useState } from "react";
import Card from "./components/Card/Card";
import Table from "./components/Table/Table";
import ContractTable from "./components/Contracts Table/Contracts";
import { getAllDrivers } from "../../lib/utils";
import AdminReports from "./components/Table/AdminReports";
import { UserContext } from "../../context/UserContext";

const Dashboard = () => {
  const { user } = useContext(UserContext); // Get user context
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
  // Utility function to parse date
  const parseDate = (dateStr) => {
    if (typeof dateStr === "string") {
      const [day, month, year] = dateStr.split("-").map(Number);
      return new Date(year, month - 1, day);
    }
    return new Date(dateStr);
  };

  // Calculate metrics for non-admin users
  const calculateMetrics = () => {
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

    let tempContracts = 0;
    let tempTrips = 0;
    let tempDrivers = 0;
    let cons = 0;

    cons = user?.contracts;
    user?.contracts?.forEach((contract) => {
      const createAt = new Date(contract.createdAt);
      if (createAt >= thirtyDaysBack) {
        tempContracts++;
      }
    });

    user?.drivers?.forEach((driver) => {
      driver.tripDetails.forEach((trip) => {
        const tripDate = parseDate(trip.tripDate);
        if (tripDate >= yesterdayStart && tripDate <= today) {
          tempTrips++;
        }
      });

      const joinDate = new Date(driver.dateOfJoining);
      if (joinDate >= thirtyDaysBack) {
        tempDrivers++;
      }
    });

    const totalDriversTrips = user?.drivers?.reduce(
      (acc, driver) => acc + driver.tripDetails.length,
      0
    );
    const totalAmountTransferred = user?.reports?.reduce(
      (acc, report) => (report.status === "Done" ? acc + report.amount : acc),
      0
    );

    setDashboardMetrics((prev) => ({
      ...prev,
      totalAmount: totalAmountTransferred,
      totalTrips: totalDriversTrips,
      totalDrivers: tempDrivers,
      updateTotalTrips: tempTrips,
      updateContracts: tempContracts,
    }));
  };

  // Calculate metrics for admin users
  const calculateAdminMetrics = async () => {
    const today = new Date();
    const thirtyDaysBack = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 30
    );

    const drivers = await getAllDrivers().catch((err) => {
      console.error("Error fetching drivers:", err);
      return [];
    });

    let tempDrivers = 0;
    let tempControlPanels = 0;
    let tempContracts = 0;
    let cons = 0;

    drivers.forEach((driver) => {
      const joinDate = new Date(driver.dateOfJoining);
      if (joinDate >= thirtyDaysBack) {
        tempDrivers++;
      }
    });

    const userObj = Array.isArray(user) ? user : user;
    user?.controlPanels?.forEach((controlPanel) => {
      const createdAt = new Date(controlPanel.dateOfJoining);
      console.log(thirtyDaysBack.toISOString().slice(0, 10));
      if (createdAt >= thirtyDaysBack) {
        tempControlPanels++;
      }
    });

    cons = user?.contracts;
    user?.contracts?.forEach((contract) => {
      const createAt = new Date(contract.createdAt);
      if (createAt >= thirtyDaysBack) {
        tempContracts++;
      }
    });

    setDashboardMetrics((prev) => ({
      ...prev,
      totalDrivers: tempDrivers,
      updateContracts: tempContracts,
      updateControlPanels: tempControlPanels,
    }));
    setDrivers(drivers);
  };

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchMetrics = async () => {
      setIsAdmin(user.isAdmin);
      if (user.isAdmin) {
        await calculateAdminMetrics();
      } else {
        calculateMetrics();
      }
      setLoading(false);
    };

    fetchMetrics();
  }, [user]);

  return (
    <div className="flex flex-col gap-7 p-6">
      <div className="flex items-center justify-around">
        <Card
          title={"Total Drivers"}
          value={isAdmin ? drivers.length : user?.drivers?.length || 0}
          update={`+${dashboardMetrics.totalDrivers}`}
          width={"33%"}
        />
        {isAdmin ? (
          <Card
            title={"Total Control Panels"}
            value={user?.controlPanels?.length || 0}
            update={`+${dashboardMetrics.updateControlPanels}`}
            width={"33%"}
          />
        ) : (
          <Card
            title={"Total Trips"}
            value={dashboardMetrics.totalTrips}
            update={`+${dashboardMetrics.updateTotalTrips}`}
            width={"33%"}
            msg={`Trips today`}
          />
        )}
        <Card
          title={"Total Contracts"}
          value={user?.contracts.length || 0}
          update={`+${dashboardMetrics.updateContracts}`}
          width={"33%"}
        />
      </div>
      <div className="flex gap-2">
        {!isAdmin ? <Table /> : <AdminReports />}
        {user && (
          <div className="flex flex-col gap-2 w-[33%]">
            <ContractTable />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
