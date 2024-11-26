import React, { useState } from "react";
import Label from "./Label";
import { createContract } from "../../../lib/utils";
import { useNavigate } from "react-router-dom";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
const ContractForm = () => {
  const [form, setForm] = useState({
    companyName: "",
    contactNumber: "",
    email: "",
    amount: "",
    startDate: "",
    endDate: "",
    createdAt: new Date().toISOString().slice(0, 10),
  });
  const [error, setError] = useState(null);
  const [msg, setMessage] = useState(null);

  const router = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createContract(form);
    if (res) {
      setMessage("Contract created successfully! ");
      // router("/contracts");
    } else {
      setError("Failed to create contract!");
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-grayish text-2xl">Contract Form</h1>
      <form
        className="p-5 flex flex-col gap-6 flex-wrap"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="flex flex-wrap gap-6">
          <Label
            title={"Company Name"}
            placeholder={"Company Name..."}
            type={"text"}
            onChange={(e) => setForm({ ...form, companyName: e.target.value })}
          />
          <Label
            title={"Company Contact Number"}
            placeholder={"Contact Number..."}
            type={"text"}
            onChange={(e) =>
              setForm({ ...form, contactNumber: e.target.value })
            }
          />
          <Label
            title={"Company Email"}
            placeholder={"Company Email..."}
            type={"email"}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Label
            title={"Contract Price"}
            placeholder={"Price..."}
            type={"number"}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />
          <Label
            title={"Contract Start Date"}
            type={"date"}
            onChange={(e) => setForm({ ...form, startDate: e.target.value })}
          />
          <Label
            title={"Contract End Date"}
            type={"date"}
            onChange={(e) => setForm({ ...form, endDate: e.target.value })}
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
                onClick={() => router("/contracts")}
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
              Create Contract{" "}
            </button>
          )}
          {error && <div className="text-red-500 text-sm mt-4">{error}</div>}
        </div>
      </form>
    </div>
  );
};

export default ContractForm;
