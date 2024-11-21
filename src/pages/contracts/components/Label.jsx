import React from "react";

const Label = ({ title, placeholder, type, onChange }) => {
  return (
    <div className="flex flex-col gap-2 w-[45%]">
      <label className="text-lg">{title}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="border-2 outline-none p-2 rounded-lg "
        onChange={onChange}
        required={title !== "Contract Start Date"}
      />
    </div>
  );
};

export default Label;
