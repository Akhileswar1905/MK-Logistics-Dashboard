import React, { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev); // Toggle between true and false
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-[90%] md:w-[400px] p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6 text-[var(--grayish)]">
          Login
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-[var(--grayish)]" htmlFor="username">
              Username:
            </label>
            <input
              type="text"
              name="username"
              id="username"
              required
              className="w-full border px-4 py-2 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-[var(--grayish)]"
            />
          </div>
          <div className="relative">
            <label className="block text-[var(--grayish)]" htmlFor="password">
              Password:
            </label>
            <input
              type={showPassword ? "text" : "password"} // Conditionally render input type
              name="password"
              id="password"
              required
              className="w-full border px-4 py-2 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-[var(--grayish)]"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-4 bottom-3 text-[var(--grayish)]"
            >
              {showPassword ? (
                <IoMdEyeOff size={20} /> // Eye icon to hide password
              ) : (
                <IoMdEye size={20} /> // Eye icon to show password
              )}
            </button>
          </div>
          <div>
            <input
              type="submit"
              value="Submit"
              className="w-full py-2 mt-4 bg-[var(--primary-green)] text-white font-semibold rounded-lg cursor-pointer"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
