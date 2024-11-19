import React from "react";
import TripsTable from "../components/Trips Table/Table";
import { useLocation } from "react-router-dom";

const Trips = () => {
  const location = useLocation();
  const { driver } = location.state;
  return (
    <div className="pt-3">
      <TripsTable driver={driver} />
    </div>
  );
};

export default Trips;
