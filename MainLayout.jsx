import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";

const MainLayout = () => {
  return (
    <>
      {/* Navbar only here */}
      <Nav />

      {/* Page Content */}
      <Outlet />
    </>
  );
};

export default MainLayout;