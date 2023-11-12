import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { DSLCommerceContext } from "../../../contexts/DSLCommerceContext";
import Rating from "@mui/material/Rating";
import { WishlistContext } from "../../../contexts/wishlist-context";
import { CartContext } from "../../../contexts/cart-context";

const EachProductCard = ({
  eachProduct,
  addToCart,
  addProductToWishlist,
  showQuickView,
}) => {
  console.log(eachProduct)
  const { user, openWalletModal } = useContext(DSLCommerceContext);
  const { wishlistProducts } = useContext(WishlistContext);
  const { carts } = useContext(CartContext);

  const [averageRatings, setAverageRatings] = useState(0);
  console.log(averageRatings, eachProduct.name, "average ratings");

  // If this product is in wish list
  const inWishList = wishlistProducts.find(
    (eachProductInWishList) => eachProductInWishList._id === eachProduct._id
  );

  // If this product is in cart
  const inCart = carts.find(
    (eachProductInCart) => eachProductInCart.product === eachProduct._id
  );

  console.log(inCart, eachProduct, carts, "If in cart");

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
    <div className={`${eachProduct.status === false ? 'd-none' : 'col-lg-3 col-sm-6 text-center'}`}>
      <div
        className="single-bestsellers-products at-time"
        style={{ background: "#d1d1d1", borderRadius: "5px" }}
      >
        <div className="bestsellers-products-image  d-flex flex-column align-items-center">
          <Link
            to={`/shop/products-details/${eachProduct._id}`}
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            <img
              src={eachProduct.images[0]}
              style={{ width: "300px", height: "250px" }}
              alt=""
            />
            {/* <img
              src={
                products.filter((product) => product.category === catId)[0]?.product_images
              }
              style={{ width: "300px", height: "250px" }}
              alt=""
            /> */}
          </Link>
          <div className="tag">New</div>
          <ul className="bestsellers-action">
            {/*********************** Add To Cart *************************** */}
            <li>
              {user?.walletAddress ? (
                <span
                  className={`addtocart-icon-wrap ${inCart ? "background_hash136" : ""
                    }`}
                  // onClick={() => addToCart()}
                  onClick={() => addToCart(eachProduct)}
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
                  className={`addtocart-icon-wrap ${inWishList ? "background_hash136" : ""
                    }`}
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
                onClick={() => showQuickView(eachProduct, averageRatings)}
              >
                <i className="flaticon-view quick-icon"></i>
              </span>
            </li>
          </ul>
        </div>

        <div className="bestsellers-products-content pb-2">
          <h3>
            <Link
              to={`/shop/products-details/${eachProduct._id}`}
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              {eachProduct.productName}
            </Link>
          </h3>
          <div>
            <Rating
              name="read-only"
              value={!eachProduct?.reviews?.length ? 5 : averageRatings}
              readOnly
            />
          </div>
          {/* <span>${eachProduct.price}</span> */}

          <div className="price">
            <span
              className={`${eachProduct?.offeringProduct > 0 ? "old-price" : ""
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

export default EachProductCard;
