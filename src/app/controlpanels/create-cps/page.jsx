"use client";
import { createcp } from "@/app/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CPPage = () => {
  const [error, setError] = useState(false);
  const [form, setForm] = useState({
    username: "",
    phoneNumber: "",
    password: "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    if (
      form.username === "" ||
      form.phoneNumber === "" ||
      form.password === ""
    ) {
      setError(true);
      return;
    }
    setError(false);
    const res = await createcp(form);
    if (res.error) {
      setError(true);
      return;
    }
    setError(false);
    setForm({ username: "", phoneNumber: "", password: "" });
    router.push("/controlpanels");
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-full max-w-xs">
        <form className="bg-[#182237] shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              onChange={handleChange}
              className="bg-[#2e3748] shadow appearance-none  rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline "
              id="username"
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phoneNumber"
            >
              Phone Number
            </label>
            <input
              onChange={handleChange}
              className="bg-[#2e3748] shadow appearance-none  rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline "
              id="phoneNumber"
              type="text"
              placeholder="Phone Number"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              onChange={handleChange}
              className="bg-[#2e3748] shadow appearance-none  rounded w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleSubmit}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CPPage;
