"use client";
import Card from "@/components/Card/Card";
import Chart from "@/components/Chart/Chart";
import Transactions from "@/components/Transactions/Transactions";
import { redirect } from "next/navigation";
import { CgProfile } from "react-icons/cg";
import { FaCar, FaFileContract } from "react-icons/fa";
import { IoMdContract } from "react-icons/io";

export default function Home() {
  const id = localStorage.getItem("id");
  if (!id) {
    redirect("/login");
  }

  return (
    <div className="m-3 gap-4">
      <div className="flex gap-5 justify-around">
        <Card
          icon={<FaCar size={20} />}
          title={"No. of Drivers"}
          number={100}
        />
        <Card
          icon={<CgProfile size={20} />}
          number={20}
          title={"No. of Control Panels"}
        />
        <Card
          icon={<FaFileContract size={20} />}
          number={10}
          title={"No. of Contracts"}
        />
      </div>
      <div>
        <Transactions />
      </div>
      {/* <div>
        <Chart />
      </div> */}
    </div>
  );
}
