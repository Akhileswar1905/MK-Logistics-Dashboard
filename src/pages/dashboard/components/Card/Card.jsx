import React from "react";

const Card = ({ title, value, update, width, msg }) => {
  return (
    <div className={`p-8 flex flex-col gap-4 rounded-xl border-2 w-[${width}]`}>
      <p className="text-[var(--grayish)] text-xl">{title}</p>
      <h3 className="text-5xl">{value}</h3>
      <small className="text-[var(--grayish)]">
        <span className="bg-[#d9d9d9] p-1 rounded-md text-black">{update}</span>{" "}
        {msg ? msg : "Compared to last 30 days"}
      </small>
    </div>
  );
};

export default Card;
