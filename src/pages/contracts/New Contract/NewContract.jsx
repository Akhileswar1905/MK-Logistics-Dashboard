import React from "react";
import ContractForm from "../components/ContractForm";

const NewContract = () => {
  return (
    <div className="p-8 flex flex-col gap-4">
      <h1 className="text-[var(--grayish)] text-3xl">New Contract</h1>
      <div className="border-2 p-6 rounded-lg">
        <ContractForm />
      </div>
    </div>
  );
};

export default NewContract;
