import React from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";


const PublicLayout = () => {
  return (
    <div className="app">
      <Toaster />
      <Outlet />
    </div>
  );
};

export default PublicLayout;
