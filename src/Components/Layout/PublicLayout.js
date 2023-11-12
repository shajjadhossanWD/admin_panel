import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

import TopHeader from "./TopHeader";
import MiddleHeader from "./MiddleHeader";
import Navbar from "./Navbar";
import Footer from "./Footer/Footer";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const PublicLayout = () => {
  return (
    <div className="app">
      <Toaster />
      <TopHeader shippingMessage="Free worldwide shipping on all orders over USD 50" />
      <MiddleHeader />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default PublicLayout;
