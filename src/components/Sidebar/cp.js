const { FaCar, FaRegMoneyBillAlt } = require("react-icons/fa");
const { IoIosNotifications } = require("react-icons/io");
const { LiaFileContractSolid } = require("react-icons/lia");
const { MdDashboard } = require("react-icons/md");
const { CiEdit } = require("react-icons/ci");

const cp = [
  {
    id: 1,
    title: "Dashboard",
    icon: <MdDashboard color="white" size={20} />,
    path: "/",
  },

  {
    id: 3,
    title: "Drivers",
    icon: <FaCar color="white" size={20} />,
    path: "/drivers",
  },

  {
    id: 4,
    title: "Contracts",
    icon: <LiaFileContractSolid color="white" size={20} />,
    path: "/contracts",
  },

  {
    id: 5,
    title: "Reports",
    icon: <FaRegMoneyBillAlt color="white" size={20} />,
    path: "/reports",
  },

  {
    id: 2,
    title: "Requests",
    icon: <IoIosNotifications color="white" size={20} />,
    path: "/requests",
  },
  {
    id: 6,
    title: "Update Requests",
    icon: <CiEdit color="white" size={20} />,
    path: "/updates",
  },
];

export default cp;
