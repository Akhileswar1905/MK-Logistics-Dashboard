import React, { useContext, useState } from "react";
import { useLogin } from "../../../hooks/useLogin";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { UserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const login = useLogin();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  if (user && localStorage.getItem("userId") !== undefined) {
    navigate("/");
  }
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await login(form);

    if (res.status !== 200) {
      setError(res.data || "An error occurred");
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-[90%] md:w-[400px] p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6 text-[var(--grayish)]">
          Login
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
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
              onChange={handleInputChange}
              value={form.username}
            />
          </div>
          <div className="relative">
            <label className="block text-[var(--grayish)]" htmlFor="password">
              Password:
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              required
              className="w-full border px-4 py-2 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-[var(--grayish)]"
              onChange={handleInputChange}
              value={form.password}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-10 text-[var(--grayish)]"
            >
              {showPassword ? <IoMdEyeOff size={20} /> : <IoMdEye size={20} />}
            </button>
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <div>
            {loading ? (
              <Loading />
            ) : (
              <input
                type="submit"
                value="Submit"
                className="w-full py-2 mt-4 bg-[var(--primary-green)] text-white font-semibold rounded-lg cursor-pointer"
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

const Loading = () => {
  return (
    <div className="flex items-center justify-center">
      <div class="loader"></div>
    </div>
  );
};

export default Login;
