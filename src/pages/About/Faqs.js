import React, { useState, useEffect } from "react";
import Preloader from "../../Components/Common/Preloader";
import FaqsArea from "../../Components/About/FaqsArea";
import PageTitle from "../../Components/Common/PageTitle";
import Support from "../../Components/Common/Support";

function Faqs() {
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
      <div className="faqs-wrapper">
        <PageTitle title="FAQ's" />
        <FaqsArea />
        <Support />
      </div>

    </>
  );
}

export default Faqs;
