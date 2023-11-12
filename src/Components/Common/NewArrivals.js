import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DSLCommerceContext } from "../../contexts/DSLCommerceContext";
import { WishlistContext } from "../../contexts/wishlist-context";
import "./NewArrivals.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import EachProductCardInNewArrivals from "../Common/EachProductInNewArrivals/EachProductInNewArrivals";

function NewArrivals({
  paddingClass = "",
  title = "New Arrivals",
  products,
  showQuickView,
  addToCart,
}) {
  const { user, openWalletModal } = useContext(DSLCommerceContext);
  const { addProductToWishlist } = useContext(WishlistContext);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 778,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className={"arrivals-products-area " + paddingClass}>
      <div className="container">
        <div className="section-title pt-3 pt-lg-5">
          <h2>{title}</h2>
        </div>

        <div className="mx-auto pb-5">
          <Slider className="overflow-hidden" {...settings}>
            {products &&
              products
                .slice(0, 4)
                .reverse()
                .map((eachProduct) => {
                  return (
                    <EachProductCardInNewArrivals
                      eachProduct={eachProduct}
                      addToCart={addToCart}
                      addProductToWishlist={addProductToWishlist}
                      showQuickView={showQuickView}
                    />
                  );
                })}
          </Slider>
        </div>
      </div>
    </section>
  );
}

export default NewArrivals;
