import React from "react";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";

const Layout = ({ children }) => {
  return (
    <div className="flex relative">
      <Sidebar />
      <div className="flex-1">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default Layout;
