import React, { useState, useEffect } from "react";
import Preloader from "../../Components/Common/Preloader";
import ErrorArea from "../../Components/About/ErrorArea";
import PageTitle from "../../Components/Common/PageTitle";
import Footer from "../../Components/Layout/Footer/Footer";
import { Toaster } from "react-hot-toast";
import TopHeader from "../../Components/Layout/TopHeader";
import MiddleHeader from "../../Components/Layout/MiddleHeader";
import Navbar from "../../Components/Layout/Navbar";

function Error404() {
  // const [isLoading, setisLoading] = useState(true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setisLoading(false);
  //   }, 1000);
  // }, []);

  return (
    <>
      {/* {isLoading === true ? (
        <Preloader />
      ) : ( */}
      <div className="app">
        <Toaster />
        <TopHeader shippingMessage="Free shipping on all orders over USD 50" />
        <MiddleHeader />
        <Navbar />
        <div className="error-404-wrapper">
          <PageTitle title="404 Error" />
          <ErrorArea />
        </div>
        <Footer />
      </div>
      {/* )} */}
    </>
  );
}

export default Error404;
