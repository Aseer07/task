import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const DashboardLayout = () => {
  return (
    <div>
      <Navbar />
      <main style={{ padding: "1rem" }}>
        <Outlet /> {/* Renders the matched child route component */}
      </main>
    </div>
  );
};

export default DashboardLayout;
