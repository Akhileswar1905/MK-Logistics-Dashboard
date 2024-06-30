import React from "react";

const Card = ({ icon, title, number }) => {
  return (
    <div className="bg-[#182237] w-[33%] m-2 p-3 rounded-xl cursor-pointer flex  gap-5 hover:bg-[#2e3748] items-center">
      <div className="w-12 h-12 flex items-center justify-center">{icon}</div>
      <div className="text-2xl flex flex-col gap-3">
        <span className="font-semibold text-lg">{title}</span>
        <span>{number}</span>
      </div>
    </div>
  );
};

export default Card;
