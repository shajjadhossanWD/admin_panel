import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./Footer.css";
import { DSLCommerceContext } from "../../../contexts/DSLCommerceContext";

function Footer() {
  const [link, setLink] = useState({});
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const date = new Date();
  const year = date.getFullYear();
  const {
    user,
    openWalletModal,
    logOut,
    closeWalletModal,
    closeCoinbaseModal,
  } = useContext(DSLCommerceContext);

  //********************************** Handle Email ****************************************
  // const handleEmail = event => {
  //   const emailValue = event.target.value
  //   if (/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-z]{2,7}$/.test(emailValue)) {
  //     setEmailError(null);
  //   } else {
  //     setEmailError("Please Provide a valid Email");
  //   }
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const email = e.target.email.value;
    // console.log(email)
    if (!email || email.length === 0) {
      swal({
        title: "Attention",
        text: "Please enter your email",
        icon: "warning",
        button: "OK!",
        className: "modal_class_success",
      });
    } else {
      await axios
        .post(`https://backend.dslcommerce.com/api/subscribe/`, {
          email: email,
        })
        .then((res) => {
          if (res.status === 200) {
            swal({
              text: res?.data?.message,
              icon: "success",
              button: "OK!",
              className: "modal_class_success",
            });
            e.target.reset();
          }
        })
        .catch((err) => {
          swal({
            title: "Attention",
            text: `Something went wrong`,
            icon: "warning",
            button: "OK!",
            className: "modal_class_success",
          });
        });
    }
  };

  useEffect(() => {
    fetch("https://dslegends.org/api/social-links.php")
      .then((res) => res.json())
      .then((data) => setLink(data));
  }, []);

  return (
    <>
      <section className="footer-area pt-100 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-sm-6">
              <div className="single-footer-widget">
                <h2>Get in Touch</h2>
                {/* <p><u>Contact us at +60149939183</u></p> */}

                <ul className="footer-contact-info">
                  <li>
                    <span>Address:</span>
                    <>22 Sin Ming Lane #06-76 Midview City Singapore 573969</>
                  </li>

                  <li>
                    <span>Email:</span>
                    <a href="mailto:hello@econix.com">
                      support@dslcommerce.com
                    </a>
                  </li>
                  <li>
                    <p className="contactUs">
                      <a href="tel:+60149939183">Contact us at: +60149939183</a>
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-sm-6">
              <div className="single-footer-widget">
                <h2>Policies</h2>

                <ul className="quick-links">
                  <li>
                    <Link
                      onClick={() => {
                        window.scrollTo(0, 0);
                      }}
                      to="/shop"
                    >
                      Shop
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => {
                        window.scrollTo(0, 0);
                      }}
                      to="/terms-of-use"
                    >
                      Terms Of Use
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => {
                        window.scrollTo(0, 0);
                      }}
                      to="/data-protection-notice"
                    >
                      Data Protection Notice
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => {
                        window.scrollTo(0, 0);
                      }}
                      to="/aboutus"
                    >
                      About Us
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-sm-6">
              <div className="single-footer-widget">
                <h2>Support</h2>

                <ul className="quick-links">
                  {/* <li>
                    <Link to="/my-account">
                      <a href="/#">My Account</a>
                    </Link>
                  </li> */}
                  <li>
                    {user?.walletAddress ? (
                      <Link
                        onClick={() => {
                          window.scrollTo(0, 0);
                        }}
                        to="/tracking-order"
                      >
                        Order Tracking
                      </Link>
                    ) : (
                      <Link onClick={() => openWalletModal()} to="/">
                        Order Tracking
                      </Link>
                    )}
                  </li>
                  <li>
                    <a
                      href="https://dsl.sg/contact"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <Link
                      onClick={() => {
                        window.scrollTo(0, 0);
                      }}
                      to="/news"
                    >
                      News
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-sm-6">
              <div className="single-footer-widget">
                <h2>Join Our Newsletter</h2>

                <div className="newsletter-item">
                  <div className="newsletter-content">
                    <p>
                      Subscribe to the newsletter for all the latest updates
                    </p>
                  </div>

                  <form
                    className="newsletter-form"
                    data-toggle="validator"
                    onSubmit={handleSubmit}
                  >
                    <input
                      type="email"
                      id="email"
                      className="input-newsletter border-dark rounded"
                      placeholder="Email address"
                      name="email"
                      value={email}
                      // onChange={handleEmail}
                      onChange={(e) =>
                        setEmail(e.target.value.toLocaleLowerCase())
                      }
                      // onBlur={handleEmail}
                      required
                      autoComplete="off"
                    />
                    {/* <p className=' text-danger pl-1 pt-2'> {emailError}</p> */}

                    <button type="submit" className=" text-uppercase btn-Sub">
                      Subscribe
                    </button>
                    <div
                      id="validator-newsletter"
                      className="form-result"
                    ></div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container">
        <p className="text-center">
          <strong>Contact Us</strong>
        </p>
        {/* <p className="text-center">Made by by <FavoriteIcon fontSize="small .MuiIcon-root"/> DS Legends Pte Ltd.</p> */}
        <p
          className="mb-4 made-love text-center"
          style={{ fontSize: "18px", color: "#DC3545" }}
        >
          Made with ❤ by{" "}
          <a
            href="https://dsl.sg/"
            className="text-danger text-decoration-none"
            target="_any"
          >
            DS Legends Pte Ltd.
          </a>
        </p>
      </div>

      <div className="copyright-area">
        <hr />
        <div className="container">
          <div className=" row">
            <div className="col-lg-6 col-sm-12">
              <div className="text-center">
                <p>Copyright @ {year} DSLCOMMERCE.COM </p>
              </div>
            </div>
            <div className="col-lg-6 col-sm-12">
              <div className="bg-light text-center">
                <div className="container p-1">
                  <section>
                    <a href={link.facebook} target="_any">
                      <i className="bx bxl-facebook rounded-circle btn-social-footer mx-1 p-1"></i>
                    </a>
                    <a href={link.instagram} target="_any">
                      <i className="bx bxl-instagram rounded-circle btn-social-footer mx-1 p-1"></i>
                    </a>
                    <a href={link.pinterest} target="_any">
                      <i className="bx bxl-pinterest-alt rounded-circle btn-social-footer mx-1 p-1"></i>
                    </a>
                    <a href={link.twitter} target="_any">
                      <i className="bx bxl-twitter rounded-circle btn-social-footer mx-1 p-1"></i>
                    </a>
                    <a href={link.linkedin} target="_any">
                      <i className="bx bxl-linkedin rounded-circle btn-social-footer mx-1 p-1"></i>
                    </a>
                    <a href={link.medium} target="_any">
                      <i className="bx bxl-medium rounded-circle btn-social-footer mx-1 p-1"></i>
                    </a>
                    <a href={link.telegram} target="_any">
                      <i className="bx bxl-telegram rounded-circle btn-social-footer mx-1 p-1"></i>
                    </a>
                    <a href={link.youtube} target="_any">
                      <i className="bx bxl-youtube rounded-circle btn-social-footer mx-1 p-1"></i>
                    </a>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
