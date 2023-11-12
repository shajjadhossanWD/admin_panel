import { Link} from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { DSLCommerceContext } from "../../contexts/DSLCommerceContext";
import { WishlistContext } from "../../contexts/wishlist-context";

function SpecialProducts({
  paddingClass = "",
  products = [],
  addToCart,
  showQuickView,
}) {
  const [newProduct, setNewProduct] = useState([]);
  const { user, openWalletModal } = useContext(DSLCommerceContext);
  const { addProductToWishlist } = useContext(WishlistContext);


  useEffect(() => {
    fetch("https://backend.dslcommerce.com/api/product/")
      .then((res) => res.json())
      .then((result) => {
        setNewProduct(result);
        // console.log(result)
      });
  }, []);

  

  return (
    <section className={"special-products-area " + paddingClass}>
      <div className="container">
        <div className="row">
          <div className="col-lg-9 col-md-12">
            <div className="section-title container">
              <h2>Special Products</h2>
            </div>

            <div className="row justify-content-center">
              {newProduct &&
                newProduct.slice(0, 3).map((product) => {
                  return (
                    <div className="col-lg-4 col-sm-6" key={product?._id}>
                      <div className="single-special-products">
                        <div className="special-products-image d-flex flex-column align-items-center">
                          <Link
                            to={`/shop/products-details/${product?._id}`}
                            onClick={() => {
                              window.scrollTo(0, 0);
                            }}
                          >
                            <img
                              src={product?.product_images}
                              style={{ width: "300px", height: "250px" }}
                              alt=""
                            />
                          </Link>
                          <div className="tag">New</div>
                          <ul className="special-action">

                            {/*********************** Add To Cart *************************** */}
                            <li>
                              {user?.walletAddress ? (
                                <span
                                  onClick={() => addToCart(product)}
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
                              
                            {/*********************** WishList *************************** */}
                            <li>
                              {user?.walletAddress ? (
                                <span
                                  className="addtocart-icon-wrap"
                                  onClick={() => addProductToWishlist(product)}
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
                                className="quick-icon"
                                onClick={() => showQuickView(product)}
                              >
                                <i className="flaticon-view quick-icon"></i>
                              </span>
                            </li>
                          </ul>
                        </div>

                        <div className="special-products-content">
                          <h3>
                            <Link
                              to={`/shop/products-details/${product?._id}`}
                              onClick={() => {
                                window.scrollTo(0, 0);
                              }}
                            >
                              {product.productName}
                            </Link>
                          </h3>
                          <ul className="rating">
                            <li>
                              <i className="bx bxs-star"></i>
                            </li>
                            <li>
                              <i className="bx bxs-star"></i>
                            </li>
                            <li>
                              <i className="bx bxs-star"></i>
                            </li>
                            <li>
                              <i className="bx bxs-star"></i>
                            </li>
                            <li>
                              <i className="bx bxs-star"></i>
                            </li>
                          </ul>
                          <div className="price">
                            <span className="new-price text-danger">
                              ${product?.price}
                            </span>
                            <span className="ml-2 old-price text-muted">
                              $300.00
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          <div className="col-lg-3 col-md-12">
            <div className="special-products-inner">
              <div className="inner-content">
                <span>New Arrival</span>
                <h3>Special Laptop</h3>
                <p>Stock is Limited</p>

                <div className="inner-btn">
                  <Link to="/shop" className="default-btn">
                    <i className="flaticon-shopping-cart"></i>
                    Shop Now
                    <span></span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SpecialProducts;
