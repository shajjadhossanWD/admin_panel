import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { DSLCommerceContext } from "../../contexts/DSLCommerceContext";
import { FaUser } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import companyLogo from "../../assets/img/logoDSL.jpeg";
import companyLogo from "../../assets/img/logoDSL.jpeg";

// import AuthContext from "../../contexts/auth-context";

const homeRoutes = ["/", "/home-two", "/home-three", "/home-four"];
const pagesRoutes = [
  "/about",
  "/our-team",
  "/pricing-plans",
  "/search",
  "/contact",
  "/faqs",
  "/login",
  "/register",
  "/my-account",
  "/error-404",
  "/tracking-order",
  "/compare",
  "/terms-of-service",
  "/privacy-policy",
];
const shopRoutes = [
  "/shop",
  "/shop-list-view",
  "/shop-left-sidebar",
  "/shop-right-sidebar",
  "/shop-full-width",
  "/cart",
  "/wishlist",
  "/checkout",
  "/products-details",
  "/products-details-sidebar",
];
const blogRoutes = [
  "/blog",
  "/blog-list-view",
  "/blog-left-sidebar",
  "/blog-right-sidebar",
  "/blog-full-width",
  "/blog-details",
];

const productsRoutes = ["/products", "/add-product"];

function Navbar() {
  const [visible, setVisible] = useState(false);
  const { pathname } = useLocation();
  // const context = useContext(AuthContext);
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { user, openWalletModal, logOut } = useContext(DSLCommerceContext);
  const [show, setShow] = useState(true);
  const [getCategory, setGetCategory] = useState([]);
  // console.log(allProduct)

  useEffect(() => {
    fetch("https://backend.dslcommerce.com/api/category/")
      .then((res) => res.json())
      .then((data) => setGetCategory(data));
  }, []);

  // console.log("getCategory", getCategory, getCategory.sort())

  const toggleHotline = () => {
    setActive(!active);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;

    if (currentScrollPos > 90) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [visible, handleScroll]);

  const handleLogout = () => {
    // context.logout();
    navigate("/login");
  };

  return (
    <div className={`navbar-area ${visible ? "is-sticky sticky-active" : ""}`}>
      <div className={showMenu ? "main-navbar show" : "main-navbar"}>
        <div className="container">
          <nav className="navbar navbar-expand-md navbar-light">
            <div className={"navbar-category"}>
              <div className="collapse navbar-collapse">
                <ul className="navbar-nav">
                  <li className="nav-item respo-nav">
                    {/* <a href="#" className="nav-link">
                      <i className="bx bx-menu"></i>
                      All Categories
                    </a> */}
                    <div className="">
                      <select
                        className="py-3 px-5 text-white "
                        style={{
                          cursor: "pointer",
                          background: "#15407F",
                          width: "286px",
                        }}
                        name="category"
                        required
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
                  </li>
                </ul>
              </div>
            </div>

            <div className="collapse navbar-collapse mean-menu navmenuitem">
              <ul className="navbar-nav responsive-menu">
                <li className="nav-item px-1">
                  <NavLink
                    to={"/"}
                    // isActive={() => homeRoutes.includes(pathname)}
                    className="nav-link"
                    onClick={() => {
                      window.scrollTo(0, 0);
                      toggleMenu();
                    }}
                    end
                  >
                    {" "}
                    HOME{" "}
                  </NavLink>
                </li>
                <li className="nav-item px-1">
                  <NavLink
                    to={"/shop"}
                    // isActive={() => homeRoutes.includes(pathname)}
                    className="nav-link"
                    onClick={() => {
                      window.scrollTo(0, 0);
                      toggleMenu();
                    }}
                    end
                  >
                    {" "}
                    SHOP{" "}
                  </NavLink>
                </li>
                <li className="nav-item px-1">
                  <NavLink
                    to={"/aboutus"}
                    onClick={() => {
                      window.scrollTo(0, 0);
                      toggleMenu();
                    }}
                    // isActive={() => homeRoutes.includes(pathname)}
                    className="nav-link"
                    end
                  >
                    {" "}
                    ABOUT US{" "}
                  </NavLink>
                </li>
                <li className="nav-item px-1">
                  <NavLink
                    to={"/news"}
                    // isActive={() => homeRoutes.includes(pathname)}
                    className="nav-link"
                    onClick={() => {
                      window.scrollTo(0, 0);
                      toggleMenu();
                    }}
                    end
                  >
                    {" "}
                    NEWS{" "}
                  </NavLink>
                </li>

                {/* <li className="nav-item px-1"> */}
                {/* <NavLink
                    to={"/contact"}
                    isActive={() => homeRoutes.includes(pathname)}
                    className="nav-link"
                  >
                    {" "}
                    CONTACT{" "}
                  </NavLink> */}
                {/* </li> */}

                {/* <li className="nav-item megamenu">
                  <NavLink
                    to="/about"
                    isActive={() => pagesRoutes.includes(pathname)}
                    className="nav-link"
                  >
                    Pages <i className="bx bx-chevron-down chevron-display"></i>
                    <span className="plus_icon">+</span>
                  </NavLink>
                  <ul className="dropdown-menu">
                    <li className="nav-item">
                      <div className="container">
                        <div className="row">
                          <div className="col">
                            <ul className="megamenu-submenu">
                              <li>
                                <NavLink to={"/about"} className="nav-link">
                                  About Us
                                </NavLink>
                              </li>
                              <li>
                                <NavLink to={"/our-team"} className="nav-link">
                                  Our Team
                                </NavLink>
                              </li>
                              <li>
                                <NavLink
                                  to={"/pricing-plans"}
                                  className="nav-link"
                                >
                                  Pricing Plans
                                </NavLink>
                              </li>
                              <li>
                                <NavLink to={"/search"} className="nav-link">
                                  Search
                                </NavLink>
                              </li>
                              <li>
                                <NavLink to={"/contact"} className="nav-link">
                                  Contact Us
                                </NavLink>
                              </li>
                            </ul>
                          </div>
                          <div className="col">
                            <ul className="megamenu-submenu">
                              <li>
                                <NavLink to={"/faqs"} className="nav-link">
                                  FAQ's
                                </NavLink>
                              </li>
                               {!context.token && (
                                <div>
                                  <li>
                                    <NavLink to="/login" className="nav-link">
                                      Login
                                    </NavLink>
                                  </li>
                                  <li>
                                    <NavLink
                                      to="/register"
                                      className="nav-link"
                                    >
                                      Register
                                    </NavLink>
                                  </li>
                                </div>
                              )} 
                              <li>
                                <NavLink to="/my-account" className="nav-link">
                                  My Account
                                </NavLink>
                              </li>
                              <li>
                                <NavLink to="/error-404" className="nav-link">
                                  404 Error
                                </NavLink>
                              </li>
                            </ul>
                          </div>
                          <div className="col">
                            <ul className="megamenu-submenu">
                              <li>
                                <NavLink
                                  to="/tracking-order"
                                  className="nav-link"
                                >
                                  Tracking Order
                                </NavLink>
                              </li>
                              <li>
                                <NavLink to="/compare" className="nav-link">
                                  Compare
                                </NavLink>
                              </li>
                              <li>
                                <NavLink
                                  to="/terms-of-service"
                                  className="nav-link"
                                >
                                  Terms Of Service
                                </NavLink>
                              </li>
                              <li>
                                <NavLink
                                  to="/privacy-policy"
                                  className="nav-link"
                                >
                                  Privacy Policy
                                </NavLink>
                              </li>
                              <li>
                                <NavLink to="/coming-soon" className="nav-link">
                                  Coming Soon
                                </NavLink>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </li> */}

                {/* <li className="nav-item">
                  <NavLink
                    to="/shop"
                    isActive={() => shopRoutes.includes(pathname)}
                    className="nav-link"
                  >
                    Shop 
                  </NavLink>
                  {/* <ul className="dropdown-menu">
                  <ul className="dropdown-menu">
                    <li className="nav-item">
                      <NavLink to="/cart" className="nav-link">
                        Cart
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/wishlist" className="nav-link">
                        Wishlist
                      </NavLink>
                    </li>
                    
                    <li className="nav-item">
                      <NavLink to="/checkout" className="nav-link">
                        Checkout
                      </NavLink>
                    </li>
                  </ul> 
                </li>
                  </ul>
                </li> 
               */}
                {/* <li className="nav-item">
                  <NavLink
                    to="/blog"
                    isActive={() => blogRoutes.includes(pathname)}
                    className="nav-link"
                  >
                    Blog 
                  </NavLink>
                </li> */}
                {/* 
                <li className="nav-item">
                  <NavLink to="/contact" className="nav-link">
                    Contact
                  </NavLink>
                </li> */}

                <>
                  {/* <li className="nav-item">
                      <NavLink
                        to="/products"
                        isActive={() => productsRoutes.includes(pathname)}
                        className="nav-link"
                      >
                        Products <i className="bx bx-chevron-down chevron-display"></i>
                        <span className="plus_icon">+</span>
                      </NavLink>
                      <ul className="dropdown-menu">
                        <li className="nav-item">
                          <NavLink to="/products" className="nav-link">
                            Products
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink to="/add-product" className="nav-link">
                            Add Product
                          </NavLink>
                        </li>
                      </ul>
                    </li>  */}
                  {user.walletAddress && (
                    <li className="nav-item">
                      <NavLink
                        style={{ paddingLeft: "25px" }}
                        to="/profile"
                        // isActive={() => shopRoutes.includes(pathname)}
                        className="nav-link"
                        onClick={() => {
                          window.scrollTo(0, 0);
                          toggleMenu();
                        }}
                        end
                      >
                        {user && <i className="bx bxs-user"></i>}{" "}
                        <i className="bx bx-chevron-down chevron-display"></i>
                        <span className="plus_icon">+</span>
                      </NavLink>
                      <ul className="dropdown-menu">
                        <li className="nav-item">
                          <NavLink
                            onClick={() => {
                              window.scrollTo(0, 0);
                              toggleMenu();
                            }}
                            to="/profile" className="nav-link">
                            PROFILE
                          </NavLink>
                        </li>
                        {/* <li className="nav-item">
                          <NavLink to="/products" className="nav-link">
                            Products
                          </NavLink>
                        </li> */}
                        {/* <li className="nav-item">
                          <NavLink to="/add-product" className="nav-link">
                            Add Product
                          </NavLink>
                        </li> */}

                        <li className="nav-item">
                          <NavLink
                            to="/order"
                            className="nav-link"
                            onClick={() => {
                              window.scrollTo(0, 0);
                              toggleMenu();
                            }}
                          >
                            ORDERS
                          </NavLink>
                        </li>

                        <li className="nav-item">
                          <NavLink
                            to="/wishlist"
                            className="nav-link"
                            onClick={() => {
                              window.scrollTo(0, 0);
                              toggleMenu();
                            }}
                          >
                            WISHLIST
                          </NavLink>
                        </li>
                        {/* <hr />

                        <li className="nav-item">
                          <button
                            // onClick={handleLogout}
                            className="nav-logout-btn"
                          >
                            <Link to="/wishlist">
                              <i className="flaticon-heart"></i>
                            </Link>
                          </button>
                        </li> */}
                      </ul>
                    </li>
                  )}
                </>
              </ul>

              <div className="others-option d-flex align-items-center">
                <div className="option-item  respo-nav">
                  <span>
                    <a
                      className="text-danger fw-bold"
                      href="mailto:support@dslcommerce.com"
                    >
                      support@dslcommerce.com
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>

      <div className="others-option-for-responsive">
        <div className="container">
          <div className="responsive-logo">
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate("/");
              }}
            >
              {" "}
              <span className="pr-2">
                {/* <img src={companyLogo} alt="dsl logo" style={{ width: '7%' }} /> */}
              </span>
              DSLCOMMERCE.COM
            </span>
          </div>
          <div className="dot-menu" onClick={() => toggleHotline()}>
            <div className="inner">
              <div className="circle circle-one"></div>
              <div className="circle circle-two"></div>
              <div className="circle circle-three"></div>
            </div>
          </div>

          <div className="hamburger-menu" onClick={() => toggleMenu()}>
            {showMenu ? (
              <span className="x-icon">x</span>
            ) : (
              <i className="bx bx-menu"></i>
            )}
          </div>

          <div className={active ? "active container" : "container"}>
            <div className="option-inner">
              <div className="others-option d-flex align-items-center">
                <div className="option-item">
                  <span>
                    <a
                      className="text-danger fw-bold"
                      href="mailto:support@dslcommerce.com"
                    >
                      support@dslcommerce.com
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
