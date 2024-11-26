import React, { useContext } from "react";
import Table from "./Table/Table";
import AdminReports from "./Table/AdminReports";
import { UserContext } from "../../context/UserContext";

const Reports = () => {
  const { user } = useContext(UserContext);
  return (
    <div className="p-8">{user.isAdmin ? <AdminReports /> : <Table />}</div>
  );
};

export default Reports;
