"use client"; // Ensure this file is treated as a client-side component
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation
import Card from "@/components/Card/Card";
import Transactions from "@/components/Transactions/Transactions";
import { CgProfile } from "react-icons/cg";
import { FaCar, FaFileContract } from "react-icons/fa";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function Home() {
  const [loading, setLoading] = useState(true); // State to track loading
  const router = useRouter(); // Use useRouter hook from next/navigation

  useEffect(() => {
    const checkLocalStorage = () => {
      const id = localStorage.getItem("id");

      if (!id) {
        // If no id in localStorage, show a loading spinner and redirect
        setTimeout(() => {
          setLoading(false); // Hide the loading spinner after the timeout
          router.push("/login"); // Redirect to login page
        }, 1000); // Simulate a 1-second delay for user experience
      } else {
        setLoading(false); // If id is found, stop the loading spinner
      }
    };

    checkLocalStorage(); // Run the localStorage check on component mount
  }, [router]); // Ensure the router is available before using it

  // Show loading spinner while checking localStorage
  if (loading) {
    return (
      <div className="loading-spinner">
        <p>Loading...</p> {/* Replace with your custom spinner if desired */}
      </div>
    );
  }

  return (
    <div>
      {/* Conditionally render the Navbar and Sidebar based on loading state */}
      {!loading && <Navbar />} {/* Only render Navbar when not loading */}
      {!loading && <Sidebar />} {/* Only render Sidebar when not loading */}
      <div className="m-3 gap-4">
        <div className="flex gap-5 justify-around">
          <Card
            icon={<FaCar size={20} />}
            title={"No. of Drivers"}
            number={100}
          />
          <Card
            icon={<CgProfile size={20} />}
            number={20}
            title={"No. of Control Panels"}
          />
          <Card
            icon={<FaFileContract size={20} />}
            number={10}
            title={"No. of Contracts"}
          />
        </div>
        <div>
          <Transactions />
        </div>
      </div>
    </div>
  );
}
