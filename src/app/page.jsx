"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/Card/Card";
import Transactions from "@/components/Transactions/Transactions";
import { CgProfile } from "react-icons/cg";
import { FaCar, FaFileContract } from "react-icons/fa";

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    const id = localStorage.getItem("id");
    if (!id) {
      router.push("/login");
    }
  }, [router]);

  if (!isClient) {
    return null; // Render nothing until the client-side check is done
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
