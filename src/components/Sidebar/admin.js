const { CgProfile } = require("react-icons/cg");
const { FaRegMoneyBillAlt } = require("react-icons/fa");
const { IoIosNotifications } = require("react-icons/io");
const { MdDashboard } = require("react-icons/md");

const admin = [
  {
    id: 1,
    title: "Dashboard",
    icon: <MdDashboard color="white" size={20} />,
    path: "/",
  },
  {
    id: 3,
    title: "Control Panels",
    icon: <CgProfile color="white" size={20} />,
    path: "/controlpanels",
  },
  {
    id: 4,
    title: "Payment Requests",
    icon: <IoIosNotifications color="white" size={20} />,
    path: "/payreq",
  },
  {
    id: 5,
    title: "Transactions",
    icon: <FaRegMoneyBillAlt color="white" size={20} />,
    path: "/transactions",
  },
];

export default admin;
