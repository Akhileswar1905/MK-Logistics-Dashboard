import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { links } from "./data/Links";
import { UserContext } from "../../context/UserContext";

const Sidebar = () => {
  const { setUser } = useContext(UserContext);
  const router = useNavigate();
  // Retrieve isAdmin from localStorage
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));

  // Filter links based on isAdmin
  const filteredLinks = links.filter((link) => {
    if (isAdmin) {
      if (link.onlyAdmin) {
        return link.onlyAdmin === true;
      }
      return link.showForAdmin === true;
    }

    return link.name !== "Control Panels";
  });

  return (
    <div className="flex flex-[0.17] border-r-[0.5px] flex-col gap-5 px-2 py-7 h-screen sticky top-0">
      {/* Logo */}
      <div className="flex items-center gap-5">
        <img src="/company/logo.webp" alt="Logo" width={50} height={50} />
        <h1 className="text-2xl">M&K Logistics</h1>
      </div>

      {/* Navigation Links */}
      <div>
        <ul className="flex flex-col gap-3 my-10">
          {filteredLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <NavLink
                to={link.path}
                key={index}
                className={({ isActive }) =>
                  `rounded-md px-3 py-3 w-full text-[var(--grayish)] ${
                    isActive ? "bg-[var(--primary-green)] text-neutral-50" : ""
                  }`
                }
              >
                <div className="flex gap-3 items-center text-[1rem]">
                  <Icon size={20} />
                  {link.name}
                  {link.requests > 0 && (
                    <small className="bg-[var(--grayish)] text-neutral-50 w-5 h-5 flex items-center justify-center rounded-full text-sm">
                      {link.requests}
                    </small>
                  )}
                </div>
              </NavLink>
            );
          })}
        </ul>
      </div>

      {/* Logout Button */}
      <div className="absolute bottom-0 my-5 w-[95%] items-center">
        <div
          className="bg-red-600 px-3 py-2 text-center cursor-pointer rounded-md text-white"
          onClick={() => {
            router("/login");
            localStorage.removeItem("userId");
            localStorage.removeItem("isAdmin");
            setUser(null);
          }}
        >
          Logout
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
