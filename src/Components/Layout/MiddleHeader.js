import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DSLCommerceContext } from "../../contexts/DSLCommerceContext";
import { CartContext } from "../../contexts/cart-context";
import { WishlistContext } from "../../contexts/wishlist-context";
import "./MiddleHeader.css";

function MiddleHeader() {
  const [getCategory, setGetCategory] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(DSLCommerceContext);
  const walletAddress = user.walletAddress;

  const { carts } = useContext(CartContext);
  const { wishlistProducts } = useContext(WishlistContext);
  // console.log(wishlistProducts);

  useEffect(() => {
    fetch("https://backend.dslcommerce.com/api/category/")
      .then((res) => res.json())
      .then((data) => setGetCategory(data));
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    const cat = e.target.category.value;
    const q = e.target.q.value;
    navigate(`/shop/cat/${cat ? cat : "all"}/search/${q}/1`);
    e.target.reset();
  };

  return (
    <div className="middle-header-area">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-3">
            <div className="middle-header-logo">
              <Link to="/">
                <h2 className="text-white text-uppercase">dslcommerce</h2>
              </Link>
            </div>
          </div>

          <div className="col-xl-6">
            <div className="middle-header-search">
              <form onSubmit={submitHandler}>
                <div className="row align-items-center">
                  <div className="col-4 select-column">
                    <div className="form-group ">
                      <select
                        className="customCat text-white"
                        style={{ cursor: "pointer", background: "#15407F" }}
                        name="category"
                        onChange={(e) => {
                          const cat = e.target.value;
                          if (cat === "") {
                            navigate(`/shop/cat/all/page/1`);
                          } else {
                            navigate(`/shop/cat/${cat}/page/1`);
                          }
                        }}
                      >
                        <option value="">All Catagory</option>
                        {getCategory.map((category, index) => (
                          <option
                            key={index}
                            style={{ padding: "5px" }}
                            value={category?._id}
                          >
                            {category?.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-8">
                    <div className="search-box">
                      <input
                      required
                        type="text"
                        className="form-control"
                        placeholder="Search product..."
                        name="q"
                      />
                      <button type="submit" className="">
                        <i className="bx bx-search"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="col-xl-3">
            <ul className="middle-header-optional">
              <li className="">
                <Link to="/wishlist">
                  <i className="flaticon-heart"></i>
                  {wishlistProducts?.length >= 1 && (
                    <span className="cart_counter">
                      {wishlistProducts?.length}
                    </span>
                  )}
                </Link>
              </li>
              <li className="">
                <Link to="/cart">
                  <i className="flaticon-shopping-cart"></i>
                  {carts?.length >= 1 && (
                    <span className="cart_counter">{carts?.length}</span>
                  )}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MiddleHeader;
