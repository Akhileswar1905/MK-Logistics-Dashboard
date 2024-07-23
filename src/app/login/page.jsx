"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { login } from "../lib/utils";

const LoginPage = () => {
  const id = typeof window !== "undefined" ? localStorage.getItem("id") : null;
  const router = useRouter();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(false);

  useEffect(() => {
    if (id) {
      router.replace("/");
    }
  }, [id, router]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    console.log(form);
    try {
      const user = await login(form);
      localStorage.setItem("isAdmin", user.isAdmin ? "true" : "false");
      localStorage.setItem("id", user._id);
      router.replace("/");
    } catch (error) {
      console.log(error.message);
      setError(true);
    }
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-full max-w-xs">
        <form
          className="bg-[#182237] shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSignIn}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="bg-transparent shadow appearance-none rounded w-full py-2 px-3 text-gray-200 border border-gray-600 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
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
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="bg-transparent shadow appearance-none rounded w-full py-2 px-3 text-gray-200 border border-gray-600 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
            />
          </div>
          {error && (
            <p className="text-red-500 text-xs italic mb-4">
              Please check your username and password.
            </p>
          )}
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
