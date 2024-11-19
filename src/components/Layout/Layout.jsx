import React, { useContext, useEffect } from "react";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const { user, loading } = useContext(UserContext);
  const navigate = useNavigate();
  // Redirect to login if the user is not authenticated
  useEffect(() => {
    if (user === null && !localStorage.getItem("userId")) {
      navigate("/login", { replace: true });
    }

    if (loading) {
      // Show loading state here or handle it accordingly.
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>;

      return; // Return early to avoid unnecessary re-renders.
    }
  }, [user, navigate]);

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
