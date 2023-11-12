import React, { useState, useEffect } from "react";
import axios from "axios";
import parse from "html-react-parser";
import PageTitle from "../../Components/Common/PageTitle";
import Preloader from "../../Components/Common/Preloader";
import CertificatModal from "./CertificatModal";


function About() {
  const [data, setData] = useState("");
  const [isLoading, setisLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setisLoading(false);
    }, 1000);
    window.scrollTo(0, 0);
  }, []);


  useEffect(() => {
    const getData = async () => {
      await axios
        .get("https://backend.dsl.sg/api/v1/page/about")
        .then((res) => {
          //console.log(res.data);
          setData(res.data.page.content);
        });
    };
    window.scrollTo(0, 0);
    getData();
  }, []);


  const handelOnclik = () => {
    setOpen(true)
  }



  return (
    <div className="about-wrapper">
      <PageTitle title="About Us" />
      {isLoading === true ? (
        <Preloader />
      ) : (
        <div className="container">
          <p>{parse(data)}</p>
          <button onClick={handelOnclik}
            className="ColorBg border border-0 btn btn-primary "
            style={{ fontSize: '16px' }} id="CertificatModalButton" >  <span>FINTECH CERTIFICATE</span> </button>
        </div>
      )}
      <CertificatModal open={open} setOpen={setOpen} />
    </div>
  );
}

export default About;
