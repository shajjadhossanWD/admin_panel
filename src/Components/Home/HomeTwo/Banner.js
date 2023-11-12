import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import axios from "axios";
import Loader from "../../Shared/Loader";

function Banner() {
  const [allBanners, setAllBanners] = useState([]);

  const fetchAllBanners = async () => {
    await axios
      .get("https://backend.dslcommerce.com/api/banner")
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          console.log(res);
          setAllBanners(res.data.result);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchAllBanners();
  }, []);

  return (
    <>

      <OwlCarousel
        className="home-slides-two owl-theme"
        items={1}
        loop
        autoplay={true}
      >
        {allBanners.length === 0 ? <Loader /> : allBanners?.map((eachBanner) => (
          <div
            style={{ backgroundImage: `url(${eachBanner?.img})` }}
            className="main-slider-item-box"
          ></div>
        ))}

        {/* <div className="main-slider-item-box item-two"></div>

      <div className="main-slider-item-box item-three"></div> */}
      </OwlCarousel>
    </>
  );
}

export default Banner;
