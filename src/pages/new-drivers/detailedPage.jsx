import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const NewDriverDetailsPage = () => {
  const location = useLocation();
  const { driver } = location.state;
  return (
    <div className="flex flex-col p-8 gap-3">
      <h1 className="text-3xl text-[var(--grayish)]">New Driver Details</h1>
      <div className="border-2 rounded-lg p-5">
        <div className="flex gap-5">
          <NavLink
            to={"bio-data"}
            className={({ isActive }) =>
              `
              py-2 px-3 rounded-md ${
                isActive
                  ? "bg-[var(--primary-green)] text-white"
                  : "border-2 text-black"
              }
            `
            }
            state={{
              driver: driver,
            }}
          >
            Bio data
          </NavLink>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default NewDriverDetailsPage;
