import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { DSLCommerceContext } from "../../../contexts/DSLCommerceContext";
import Rating from "@mui/material/Rating";
import { CartContext } from "../../../contexts/cart-context";

const EachProductInNewArrivals = ({
  eachProduct,
  addToCart,
  addProductToWishlist,
  showQuickView,
}) => {
  const { user, openWalletModal } = useContext(DSLCommerceContext);
  const { addItemToCart } = useContext(CartContext);

  const [averageRatings, setAverageRatings] = useState(0);
  console.log(averageRatings, "average ratings");

  useEffect(() => {
    if (eachProduct?.reviews?.length > 0) {
      let totalRatings = 0;
      eachProduct.reviews.forEach((eachReview) => {
        console.log(eachReview, "each review");
        totalRatings = totalRatings + Number(eachReview.rating);
      });
      const average = Math.ceil(totalRatings / eachProduct.reviews.length);
      setAverageRatings(average);
    }
  }, [eachProduct]);

  return (
    <div className="mx-auto" key={eachProduct?._id}>
      <div
        className="single-arrivals-products text-center"
        style={{
          width: "300px",
          background: "#d1d1d1",
          borderRadius: "5px",
        }}
      >
        <div className="arrivals-products-image d-flex flex-column align-items-center">
          <Link
            onClick={() => {
              window.scrollTo(0, 0);
            }}
            to={`/shop/products-details/${eachProduct?._id}`}
          >
            <img
              src={eachProduct?.images[0]}
              style={{ width: "300px", height: "250px" }}
              alt="new product"
            />
          </Link>
          <div className="tag">New</div>
          <ul className="arrivals-action">
            {/*********************** Add To Cart *************************** */}
            <li>
              {user?.walletAddress ? (
                <span
                  onClick={() => addItemToCart(eachProduct, 1)}
                  className="addtocart-icon-wrap"
                >
                  <i className="flaticon-shopping-cart"></i>
                </span>
              ) : (
                <span
                  onClick={() => openWalletModal()}
                  className="addtocart-icon-wrap"
                >
                  <i className="flaticon-shopping-cart"></i>
                </span>
              )}
            </li>

            {/***********************WishList *************************** */}
            <li>
              {user?.walletAddress ? (
                <span
                  className="addtocart-icon-wrap"
                  onClick={() => addProductToWishlist(eachProduct)}
                >
                  <i className="flaticon-heart"></i>
                </span>
              ) : (
                <span
                  onClick={() => openWalletModal()}
                  className="addtocart-icon-wrap"
                >
                  <i className="flaticon-heart"></i>
                </span>
              )}
            </li>

            {/*********************** Quick View *************************** */}
            <li>
              <span
                className="quickview-icon-wrap"
                onClick={() => showQuickView(eachProduct)}
              >
                <i className="flaticon-view quick-icon"></i>
              </span>
            </li>
          </ul>
        </div>

        <div className="arrivals-products-content">
          <h3>
            <Link
              to={`/shop/products-details/${eachProduct?._id}`}
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              {eachProduct?.productName}
            </Link>
          </h3>

          <div>
            <Rating name="read-only" value={averageRatings} readOnly />
          </div>

          <div className="price">
            <span
              className={`${
                eachProduct?.offeringProduct > 0 ? "old-price" : ""
              }`}
            >
              ${eachProduct?.price}
            </span>
            {eachProduct?.offeringProduct > 0 && (
              <span className="new-price">
                $
                {eachProduct?.price -
                  (eachProduct?.price * eachProduct?.offeringProduct) / 100}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EachProductInNewArrivals;
