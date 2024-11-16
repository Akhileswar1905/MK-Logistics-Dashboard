import { MdDashboard, MdDirectionsCarFilled } from "react-icons/md";
import { FaFileContract, FaMoneyBillAlt } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { HiPencilAlt } from "react-icons/hi";

import Dashboard from "../../../pages/dashboard/page";
import Contracts from "../../../pages/contracts/page";
import Drivers from "../../../pages/drivers/page";
import NewDrivers from "../../../pages/new-drivers/page";
import Reports from "../../../pages/reports/page";
import UpdateRequests from "../../../pages/update-requests/page";
export const links = [
  {
    name: "Dashboard",
    path: "/",
    icon: MdDashboard,
    requests: 0,
    component: Dashboard,
  },
  {
    name: "Drivers",
    path: "/drivers",
    icon: MdDirectionsCarFilled,
    requests: 0,
    component: Drivers,
    detailsPath: "/drivers/:id",
  },
  {
    name: "Contracts",
    path: "/contracts",
    icon: FaFileContract,
    requests: 0,
    component: Contracts,
    detailsPath: "/contracts/:id",
  },
  {
    name: "New Drivers Requests",
    path: "/new-driver",
    icon: IoIosNotifications,
    requests: 0,
    component: NewDrivers,
    detailsPath: "/new-driver/:id",
  },
  {
    name: "Trip Update Requests",
    path: "/trip-update",
    icon: HiPencilAlt,
    requests: 0,
    component: UpdateRequests,
    detailsPath: "/trip-update/:id",
  },
  {
    name: "Transaction Reports",
    path: "/transaction-reports",
    icon: FaMoneyBillAlt,
    requests: 0,
    component: Reports,
    detailsPath: "/transaction-reports/:id",
  },
];
