import React from "react";
import Card from "./components/Card/Card";
import Table from "./components/Table/Table";
import ContractTable from "./components/Contracts Table/Contracts";

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-7 p-6">
      <div className="flex items-center justify-around">
        <Card
          title={"Total Drivers"}
          value={"2706"}
          update={"+19"}
          width={"33%"}
        />
        <Card
          title={"Total Trips"}
          value={"19,050"}
          update={"+1200"}
          width={"33%"}
        />
        <Card
          title={"Total Contracts"}
          value={"130"}
          update={"+15"}
          width={"33%"}
        />
      </div>
      <div className="flex gap-2 ">
        <Table />
        <div className="flex flex-col gap-2 w-[33%]  ">
          <Card
            title={"Amount Transferred This Month"}
            value={"55,00,000"}
            update={"+15%"}
            width={"100%"}
          />
          <ContractTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
