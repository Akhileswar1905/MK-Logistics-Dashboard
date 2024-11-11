"use client";
import { createcontract } from "@/app/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
const CreateContract = () => {
  const [error, setError] = useState(false);
  const [id, setId] = useState("");
  const [form, setForm] = useState({
    companyName: "",
    duration: "",
    companyId: v4(),
    id: "",
  });

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const storedId = localStorage.getItem("id") || "";
      setId(storedId);
      setForm((prevForm) => ({
        ...prevForm,
        id: storedId,
      }));
    }
  }, []);
  const router = useRouter();

  const handleClick = async () => {
    const res = await createcontract(form);
    router.push("/contracts");
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
              onChange={(e) =>
                setForm({ ...form, companyName: e.target.value })
              }
              className="bg-[#2e3748] shadow appearance-none  rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline "
              id="companyName"
              type="text"
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
              onChange={(e) => setForm({ ...form, duration: e.target.value })}
              className="bg-[#2e3748] shadow appearance-none  rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline "
              id="duration"
              type="text"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => handleClick()}
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
