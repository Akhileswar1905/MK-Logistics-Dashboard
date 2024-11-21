import React, { useState } from "react";
import Label from "./Label";
import { createContract } from "../../../lib/utils";
import { useNavigate } from "react-router-dom";

const ContractForm = () => {
  const [form, setForm] = useState({
    companyName: "",
    contactNumber: "",
    email: "",
    amount: "",
    startDate: "",
    endDate: "",
  });

  const router = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    const res = await createContract(form);
    if (res) {
      router("/contracts");
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-grayish text-2xl">Contract Form</h1>
      <form
        className="p-5 flex gap-6 flex-wrap"
        onSubmit={(e) => handleSubmit(e)}
      >
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
          onChange={(e) => setForm({ ...form, contactNumber: e.target.value })}
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

        <button
          className="bg-primary-green text-white px-4 py-2 rounded-lg"
          type="submit"
        >
          Create Contract{" "}
        </button>
      </form>
    </div>
  );
};

export default ContractForm;
