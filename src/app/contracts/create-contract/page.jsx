"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { v4 } from "uuid";
import { createcontract } from "@/app/lib/utils";

const CreateContract = () => {
  const [form, setForm] = useState({
    companyName: "",
    duration: "",
    companyId: v4(),
    id: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("id");
      if (!id) {
        router.push("/login");
      } else {
        setForm((prevForm) => ({ ...prevForm, id }));
      }
    }
  }, [router]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleClick = async () => {
    if (form.companyName === "" || form.duration === "") {
      setError("Please fill out all fields.");
      return;
    }

    setError("");
    try {
      const res = await createcontract(form);
      if (res.error) {
        setError("Error creating contract.");
        return;
      }
      router.push("/contracts");
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-full max-w-xs">
        <form className="bg-[#182237] shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-100 text-sm font-bold mb-2"
              htmlFor="companyName"
            >
              Company Name
            </label>
            <input
              onChange={handleChange}
              value={form.companyName}
              className="bg-[#2e3748] shadow appearance-none  rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
              id="companyName"
              type="text"
              placeholder="Company Name"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-100 text-sm font-bold mb-2"
              htmlFor="duration"
            >
              Duration
            </label>
            <input
              onChange={handleChange}
              value={form.duration}
              className="bg-[#2e3748] shadow appearance-none  rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
              id="duration"
              type="text"
              placeholder="Duration"
            />
          </div>

          {error && <p className="text-red-500 text-xs italic">{error}</p>}

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleClick}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateContract;
