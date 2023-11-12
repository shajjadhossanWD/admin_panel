import React, { useState, useEffect } from "react";
import TeamMembers from "../../Components/About/TeamMembers";
import PageTitle from "../../Components/Common/PageTitle";
import Partner from "../../Components/Common/Partner";
import Preloader from "../../Components/Common/Preloader";

function OurTeam() {
  // const [isLoading, setisLoading] = useState(true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setisLoading(false);
  //   }, 1000);
  // }, []);
  return (
    <div className="our-team-wrapper">
      {/* {isLoading === true ? (
        <Preloader />
      ) : ( */}
      <>
        <PageTitle title="Our Team" />
        <TeamMembers paddingclassName=" pt-50 pb-20" />
        <Partner paddingclassName=" ptb-50" />
      </>

    </div>
  );
}

export default OurTeam;
