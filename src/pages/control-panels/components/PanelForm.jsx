import React, { useState } from "react";
import Label from "./Label";
import { createPanel } from "../../../lib/utils";
import { useNavigate } from "react-router-dom";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
const PanelForm = () => {
  const [form, setForm] = useState({
    name: "",
    username: "",
    phoneNumber: "",
    password: "",
    createdAt: new Date().toISOString().slice(0, 10),
  });
  const [error, setError] = useState(null);
  const [msg, setMessage] = useState(null);

  const router = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    const res = await createPanel(form);
    if (res) {
      setMessage("Panel created successfully! ");
      router("/control-panels");
    } else {
      setError("Failed to create panel!");
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-grayish text-2xl">Panel Form</h1>
      <form
        className="p-5 flex flex-col gap-6 flex-wrap"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="flex flex-wrap gap-6">
          <Label
            title={"Control Panel Name"}
            placeholder={"User Name..."}
            type={"text"}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <Label
            title={"Actual Name"}
            placeholder={"Real Name..."}
            type={"text"}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Label
            title={"Phone Number"}
            placeholder={"Panel Phone Number..."}
            type={"text"}
            onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
          />
          <Label
            title={"Password"}
            placeholder={"Password..."}
            type={"text"}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <div>
          {msg ? (
            <div className="flex flex-col gap-4 w-[fit-content]">
              <p className="flex gap-3 items-center text-primary-green">
                {" "}
                <FaRegCheckCircle /> {msg}
              </p>
              <button
                className="border-2 px-4 py-2 rounded-lg text-primary-green flex gap-3 items-center justify-center"
                onClick={() => router("/control-panels")}
              >
                <IoMdArrowRoundBack />
                Click to go back...
              </button>
            </div>
          ) : (
            <button
              className="bg-primary-green text-white px-4 py-2 rounded-lg"
              type="submit"
            >
              Create Panel{" "}
            </button>
          )}
          {error && <div className="text-red-500 text-sm mt-4">{error}</div>}
        </div>
      </form>
    </div>
  );
};

export default PanelForm;
