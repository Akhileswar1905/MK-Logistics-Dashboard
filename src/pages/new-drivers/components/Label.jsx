import React from "react";

const Label = ({ label, value }) => {
  return (
    <div className="flex flex-col gap-2 my-3 w-[50%]">
      <label className="text-[var(--grayish)] text-sm">{label}</label>
      {value.startsWith("https:") ? (
        <a href={value} target="_blank" rel="noopener noreferrer">
          {label} Link
        </a>
      ) : (
        <span className="text-lg">{value}</span>
      )}
    </div>
  );
};

export default Label;
