import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import parse from "html-react-parser";
import WriteReview from "./WriteReview";
import { DSLCommerceContext } from "../../contexts/DSLCommerceContext";
import { CartContext } from "../../contexts/cart-context";
import Ratings from "../Common/Ratings";
import Rating from "@mui/material/Rating";

import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  PinterestShareButton,
  PinterestIcon,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

function ProductsDetailsArea() {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const { productId } = useParams();
  const { addItemToCart, carts } = useContext(CartContext);
  const [descriptionData, setDescriptionData] = useState("");
  const [available, setAvailable] = useState("");
  const [refetch, setRefetch] = useState(false);
  // const [price,setPrice] = useState()
  const { user, openWalletModal } = useContext(DSLCommerceContext);
  const [userReviews, setUserReviews] = useState([]);

  const [averageRatings, setAverageRatings] = useState(0);
  console.log(averageRatings, "average rating");

  useEffect(() => {
    if (userReviews.length > 0) {
      let totalRatings = 0;
      userReviews.forEach((eachReview) => {
        console.log(eachReview, "each review");
        totalRatings = totalRatings + Number(eachReview.rating);
      });
      const average = Math.ceil(totalRatings / userReviews.length);
      setAverageRatings(average);
    }
  }, [userReviews, productId]);

  const navigate = useNavigate();
  // console.log(userReviews);

  const writeReview = (product) => {
    setIsOpen(true);
    setProduct(product);
  };

  const closeModal = () => {
    setIsOpen(false);
    setProduct({});
  };

  const fetchProductDetails = () => {
    axios
      .get(`https://backend.dslcommerce.com/api/product/${productId}`)
      .then((res) => {
        // console.log('eeeeeeeeeeefd', res.data.newData);
        setProduct(res.data.newData);
        setUserReviews(res.data.newData.reviews.reverse());
        setDescriptionData(res.data.newData.description);
        setAvailable(parseInt(res.data.newData.availableProduct));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  // console.log('single product', product)

  const addToCart = (product) => {
    addItemToCart(product, quantity);
  };

  return (
    <section className="products-details-area ptb-50">
      <div className="container">
        <div className="products-details-desc">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6">
              <div className="main-products-image">
                <Carousel>
                  {product?.images?.slice(0, 4)?.map((img) => (
                    <div>
                      <img src={img} alt={product.productName} />
                    </div>
                  ))}
                </Carousel>
              </div>
            </div>

            <div className="col-lg-6 col-md-6 text-center">
              <div className="product-content content-two">
                <h3>{product.productName}</h3>

                <div className="product-review">
                  <Rating
                    name="read-only"
                    value={!product?.reviews?.length ? 5 : averageRatings}
                    readOnly
                  />
                </div>

                {product?.offeringProduct > 0 && (
                  <div>
                    <p className="mb-1">
                      Enjoy {product?.offeringProduct}% discount
                    </p>
                  </div>
                )}

                <div className="price">
                  <span
                    className={`${
                      product?.offeringProduct > 0 ? "old-price" : ""
                    }`}
                  >
                    ${product?.price}
                  </span>
                  {product?.offeringProduct > 0 && (
                    <span className="new-price">
                      $
                      {product?.price -
                        (product?.price * product?.offeringProduct) / 100}
                    </span>
                  )}
                </div>

                <ul className="products-info">
                  <li>
                    <span>Availability Now:</span>{" "}
                    {product.availableProduct > 0
                      ? `${product.availableProduct}`
                      : "Stock out"}
                  </li>
                </ul>

                <div className="products-color-switch">
                  <p className="available-color">
                    {/* <span>Color</span> : */}
                  </p>
                </div>

                <div className="product-quantities text-center">
                  <span>Select how many you want:</span>

                  <div className="input-counter">
                    <span
                      className="minus-btn"
                      // onClick={() =>

                      //   quantity >= 1
                      //     ? setQuantity(quantity - 1)
                      //     : setQuantity(1)
                      // }

                      onClick={() =>
                        available !== 0 &&
                        quantity > 1 &&
                        setQuantity(quantity - 1)
                      }
                    >
                      <i className="bx bx-minus"></i>
                    </span>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      min="1"
                      max={product.availableProduct}
                    />
                    <span
                      className="plus-btn"
                      onClick={() =>
                        available !== 0 &&
                        available > quantity &&
                        setQuantity(quantity + 1)
                      }
                      // onClick={() =>
                      //   quantity >= available
                      //     ? setQuantity(available)
                      //     : setQuantity(quantity + 1)
                      // }
                    >
                      <i className="bx bx-plus"></i>
                    </span>
                  </div>
                </div>

                {/* <div className="product-add-to-cart">
                  <button
                    type="submit"
                    className="default-btn"
                    onClick={() => addToCart(product)}
                  >
                    <a className="flaticon-shopping-cart text-light">
                      Add to cart
                    </a>
                  </button>
                </div> */}
                <div className="product-add-to-cart">
                  {user?.walletAddress ? (
                    <button
                      type="submit"
                      className="default-btn"
                      onClick={() => {
                        addToCart(product);
                      }}
                    >
                      <i className="flaticon-shopping-cart"></i>
                      Add to cart
                      <span></span>
                    </button>
                  ) : (
                    <button
                      onClick={() => openWalletModal()}
                      className="default-btn"
                    >
                      <i className="flaticon-shopping-cart"></i> Add to cart
                      <span></span>
                    </button>
                  )}
                </div>

                <div className="products-share">
                  {/* <ul className="social">
                    <li>
                      <span>Share:</span>
                    </li>
                    <li>
                      <a href="#" target="_blank" className="m-1">
                        <i className="bx bxl-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank" className="m-1">
                        <i className="bx bxl-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank" className="m-1">
                        <i className="bx bxl-linkedin"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank" className="m-1">
                        <i className="bx bxl-instagram"></i>
                      </a>
                    </li>
                  </ul> */}
                  <div className="d-flex justify-content-center gap-2 mb-3">
                    <FacebookShareButton
                      url={
                        window.location.origin +
                        `/shop/products-details/${productId}`
                      }
                      title={`${product.productName}`}
                    >
                      <FacebookIcon size={40} round={true} />
                    </FacebookShareButton>

                    <TwitterShareButton
                      url={
                        window.location.origin +
                        `/shop/products-details/${productId}`
                      }
                      title={`${product.productName}`}
                    >
                      <TwitterIcon size={40} round={true} />
                    </TwitterShareButton>

                    {/* <LinkedinShareButton url={window.location.origin + `/shop/products-details/${productId}`} title={`${product.productName}`}>
                      <LinkedinIcon size={40} round={true} />
                    </LinkedinShareButton> */}

                    <WhatsappShareButton
                      url={
                        window.location.origin +
                        `/shop/products-details/${productId}`
                      }
                      title={`${product.productName}`}
                    >
                      <WhatsappIcon size={40} round={true} />
                    </WhatsappShareButton>

                    <PinterestShareButton
                      url={
                        window.location.origin +
                        `/shop/products-details/${productId}`
                      }
                      title={`${product.productName}`}
                    >
                      <PinterestIcon size={40} round={true} />
                    </PinterestShareButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="products-details-tabs">
          <ul
            className="nav nav-tabs d-flex justify-content-between justify-content-md-start"
            id="myTab"
            role="tablist"
          >
            <li className="nav-item">
              <a
                className="nav-link active"
                id="description-tab"
                data-toggle="tab"
                href="#description"
                role="tab"
                aria-controls="description"
              >
                Description
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="reviews-tab"
                data-toggle="tab"
                href="#reviews"
                role="tab"
                aria-controls="reviews"
              >
                Reviews
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="information-tab"
                data-toggle="tab"
                href="#information"
                role="tab"
                aria-controls="information"
              >
                Shipping Information
              </a>
            </li>
          </ul>

          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="description"
              role="tabpanel"
            >
              <h2>Overview</h2>
              <p>{parse(descriptionData)}</p>
            </div>
            <div className="tab-pane fade" id="reviews" role="tabpanel">
              <div className="products-review-form">
                <div className="col-12 text-center d-block d-md-none">
                  <h3>Customer Review</h3>
                </div>
                <div className="col-12 text-center d-block d-md-none">
                  <div className="">
                    {user.walletAddress ? (
                      <button
                        className="default-btn"
                        onClick={() => writeReview(product)}
                      >
                        Write a Review
                      </button>
                    ) : (
                      <button
                        className="default-btn"
                        onClick={() => openWalletModal()}
                      >
                        Write a Review
                      </button>
                    )}
                  </div>
                </div>

                <h3 className="d-none d-md-block">Customer Review</h3>

                <div className="review-title d-none d-md-block">
                  {user.walletAddress ? (
                    <button
                      className="default-btn"
                      onClick={() => writeReview(product)}
                    >
                      Write a Review
                    </button>
                  ) : (
                    <button
                      className="default-btn"
                      onClick={() => openWalletModal()}
                    >
                      Write a Review
                    </button>
                  )}
                </div>

                <div className="review-comments">
                  {userReviews?.map((review, index) => {
                    return (
                      <div className="py-3" key={index}>
                        <div>
                          {review && (
                            <Rating
                              name="read-only"
                              value={review?.rating}
                              readOnly
                            />
                          )}
                        </div>
                        <span>
                          <strong>{review?.name}</strong> on{" "}
                          <strong>{review?.date}</strong>
                        </span>
                        <p className="pt-2">{review?.message}</p>
                        <hr />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div
              className="tab-pane fade show"
              id="information"
              role="tabpanel"
            >
              <ul className="information-list">
                <li>
                  Address:{" "}
                  <span>
                    22 Sin Ming Lane #06-76 Midview City Singapore 573969
                  </span>
                </li>
                <li>
                  Phone: <a href="tel:+6 0149939183">+6 0149939183</a>
                </li>
                <li>
                  Email:{" "}
                  <a href="mailto:support@dslcommerce.com">
                    support@dslcommerce.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <WriteReview
        fetchProductDetails={fetchProductDetails}
        isOpen={isOpen}
        closeModal={closeModal}
        product={product}
        productId={productId}
        refetch={refetch}
        setRefetch={setRefetch}
      />
    </section>
  );
}

export default ProductsDetailsArea;
