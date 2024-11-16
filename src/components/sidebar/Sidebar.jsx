import React from "react";
import { NavLink } from "react-router-dom";
import { links } from "./data/Links";

const Sidebar = () => {
  return (
    <div className="flex flex-[0.17] border-r-[0.5px]  flex-col gap-5 px-2 py-7   h-screen sticky top-0">
      <div className="flex items-center gap-3">
        <img src="/company/logo.webp" alt="Logo" width={50} height={50} />
        <h1 className="text-lg">M&K Logistics</h1>
      </div>
      <div>
        <ul className="flex flex-col gap-3 my-10">
          {links.map((links, index) => {
            const Icon = links.icon;
            return (
              <NavLink
                to={links.path}
                key={index}
                className={({ isActive }) =>
                  `rounded-md px-3 py-3 w-full text-[var(--grayish)] ${
                    isActive ? "bg-[var(--primary-green)] text-neutral-50" : ""
                  }`
                }
              >
                <div className="flex gap-3 items-center text-[1rem]">
                  <Icon size={20} />
                  {links.name}
                  {links.requests > 0 && (
                    <small className="bg-[var(--grayish)] text-neutral-50 w-5 h-5 flex items-center justify-center rounded-full text-sm">
                      {links.requests}
                    </small>
                  )}
                </div>
              </NavLink>
            );
          })}
        </ul>
      </div>
      <div className="absolute bottom-0 my-5 w-[95%] items-center ">
        <div className="bg-red-600 px-3 py-2 text-center cursor-pointer rounded-md text-white ">
          Logout
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
