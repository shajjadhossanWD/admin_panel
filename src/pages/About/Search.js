import React, { useState, useEffect } from "react";
import Preloader from "../../Components/Common/Preloader";
import SearchArea from "../../Components/About/SearchArea";
import PageTitle from "../../Components/Common/PageTitle";
import Partner from "../../Components/Common/Partner";

function Search() {
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
      <div className="search-wrapper">
        <PageTitle title="Search" />
        <SearchArea />
        <Partner paddingclassName=" ptb-50" />
      </div>
    </>
  );
}

export default Search;
