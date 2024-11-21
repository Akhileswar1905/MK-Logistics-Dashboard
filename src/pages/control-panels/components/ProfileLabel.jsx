import React from "react";

const ProfileLabel = ({ label, value }) => {
  return (
    <div className="flex flex-col gap-2 my-3 w-[50%]">
      <label className="text-[var(--grayish)] text-sm">{label}</label>
      <span className="text-lg">{value}</span>
    </div>
  );
};

export default ProfileLabel;
