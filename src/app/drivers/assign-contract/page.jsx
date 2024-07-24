"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { assignContract } from "@/app/lib/utils";

const AssignContract = () => {
  const [error, setError] = useState("");
  const [driver, setDriver] = useState("");
  const [form, setForm] = useState({
    companyName: "",
    companyId: "",
    duration: "",
    payPerRide: "",
    driverId: "",
  });

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedDriver = localStorage.getItem("driver");
      if (!storedDriver) {
        router.push("/login");
      } else {
        setDriver(storedDriver);
        setForm((prevForm) => ({ ...prevForm, driverId: storedDriver }));
      }
    }
  }, [router]);

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
      setError("Please fill out all fields.");
      return;
    }
    setError("");
    try {
      const res = await assignContract(form);
      if (res.error) {
        setError("Error assigning contract.");
        return;
      }
      setError("");
      setForm({
        companyName: "",
        companyId: "",
        duration: "",
        payPerRide: "",
        driverId: driver,
      });
      router.push("/drivers/");
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-full max-w-xs">
        <form
          className="bg-[#182237] shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="companyName"
            >
              Company Name
            </label>
            <input
              onChange={handleChange}
              value={form.companyName}
              className="bg-[#2e3748] shadow appearance-none rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              id="companyName"
              type="text"
              placeholder="Company Name"
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
              value={form.companyId}
              className="bg-[#2e3748] shadow appearance-none rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
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
              value={form.duration}
              className="bg-[#2e3748] shadow appearance-none rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              id="duration"
              type="text"
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
              value={form.payPerRide}
              className="bg-[#2e3748] shadow appearance-none rounded w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="payPerRide"
              type="number"
              placeholder="Amount"
            />
          </div>

          {error && <p className="text-red-500 text-xs italic">{error}</p>}

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
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
