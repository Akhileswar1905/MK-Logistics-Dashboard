import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const Header = () => {
  const { user } = useContext(UserContext);
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
  return (
    <div className="border-b-[0.5px] py-5 px-4 flex  items-center justify-between">
      <h1 className="text-2xl font-bold">
        Hello,{" "}
        <span className="font-normal">{isAdmin ? "Admin" : user.name}</span>
      </h1>
      <div className="w-[45px] h-[45px] rounded-full bg-[#ddd]"></div>
    </div>
  );
};

export default Header;
