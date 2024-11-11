"use client";
import { assignContract, createcp } from "@/app/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AssignContract = () => {
  const [error, setError] = useState(false);
  const [driver, setDriver] = useState("");
  const [id, setId] = useState("");

  const [form, setForm] = useState({
    companyName: "",
    companyId: "",
    duration: "",
    payPerRide: "",
    driverId: "",
  });
  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      let x = localStorage.getItem("driver");
      setId(x);
      setForm((prevForm) => ({
        ...prevForm,
        driverId: x,
      }));
    }
  }, []);

  const router = useRouter();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    if (
      form.companyName === "" ||
      form.companyId === "" ||
      form.duration === "" ||
      form.payPerRide === ""
    ) {
      setError(true);
      return;
    }
    setError(false);
    const res = await assignContract(form);
    if (res.error) {
      setError(true);
      return;
    }
    setError(false);
    setForm({ companyName: "", companyId: "", duration: "", payPerRide: "" });
    router.push("/drivers/");
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-full max-w-xs">
        <form className="bg-[#182237] shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="companyName"
            >
              Company Name
            </label>
            <input
              onChange={handleChange}
              className="bg-[#2e3748] shadow appearance-none  rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline "
              id="companyName"
              type="text"
              placeholder="companyName"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="companyId"
            >
              Company Id
            </label>
            <input
              onChange={handleChange}
              className="bg-[#2e3748] shadow appearance-none  rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline "
              id="companyId"
              type="text"
              placeholder="Company Id"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="duration"
            >
              Duration
            </label>
            <input
              onChange={handleChange}
              className="bg-[#2e3748] shadow appearance-none  rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              id="duration"
              type="duration"
              placeholder="Duration"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="payPerRide"
            >
              Amount
            </label>
            <input
              onChange={handleChange}
              className="bg-[#2e3748] shadow appearance-none  rounded w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="payPerRide"
              type="number"
              placeholder="Amount"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleSubmit}
            >
              Assign
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignContract;
