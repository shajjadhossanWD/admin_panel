import React, { useState, useEffect } from "react";
import Preloader from "../../Components/Common/Preloader";
import TrackingOrderArea from "../../Components/About/TrackingOrderArea";
import PageTitle from "../../Components/Common/PageTitle";
import Support from "../../Components/Common/Support";
import Footer from "../../Components/Layout/Footer/Footer";

function TrackingOrder() {
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
      <div className="tracking-order-wrapper">
        <PageTitle title="Tracking Order" />
        <TrackingOrderArea />
        <Support />
      </div>

    </>
  );
}

export default TrackingOrder;
