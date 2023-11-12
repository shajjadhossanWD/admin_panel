import { useState, useEffect } from "react";
import { Image } from "cloudinary-react";
import { Link } from "react-router-dom";
import offerProducts7 from "../../assets/img/offer-products/offer-products-5.png";
import imgbig from "./productimg/large-offerimg.png";

function SpecialOffer({ paddingClass = "", products = [], addToCart, showQuickView }) {
  const [days, setDays] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [newProduct, setNewProduct] = useState([]);

  useEffect(()=>{
    fetch("./products.json")
    .then(res => res.json())
    .then(result => {
      setNewProduct(result);
      console.log(result)
    })
  },[])
  const comingSoonTime = () => {
    let endTime = new Date("January 1, 2023 23:59:59 PDT");
    let endTimeParse = Date.parse(endTime) / 1000;
    let now = new Date();
    let nowParse = Date.parse(now) / 1000;
    let timeLeft = endTimeParse - nowParse;
    let countdays = Math.floor(timeLeft / 86400);
    let counthours = Math.floor((timeLeft - countdays * 86400) / 3600);
    let countminutes = Math.floor(
      (timeLeft - countdays * 86400 - counthours * 3600) / 60
    );
    let countseconds = Math.floor(
      timeLeft - countdays * 86400 - counthours * 3600 - countminutes * 60
    );
    if (counthours < "10") {
      counthours = "0" + counthours;
    }
    if (countminutes < "10") {
      countminutes = "0" + countminutes;
    }
    if (countseconds < "10") {
      countseconds = "0" + countseconds;
    }

    setDays(countdays);
    setHours(counthours);
    setMinutes(countminutes);
    setSeconds(countseconds);
  };

  useEffect(() => {
    setInterval(() => {
      comingSoonTime();
    }, 1000);
  }, []);

  return (
    <section className={"offer-products-area" + paddingClass}>
      <div className="container">
        <div className="section-title">
          <h2>Specials Offer</h2>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-12">
            {/* {products && products.length > 0 && ( */}
              <div className="single-offer-products">
                <div className="offer-products-image">
                <a>
                  <img src={imgbig} alt="image" />
                </a>
                  <div className="tag">-50%</div>
                </div>

                <div className="offer-products-content">
                  <span>Gadget</span>
                  <h3>
                    <Link to="/">
                    Action Camera
                    </Link>
                  </h3>
                  <div className="price">
                    <span className="new-price">$25</span>
                    <span className="old-price">$75.00</span>
                  </div>
                  <ul className="rating">
                    <li>
                      <i className="bx bxs-star"></i>
                      <i className="bx bxs-star"></i>
                      <i className="bx bxs-star"></i>
                      <i className="bx bxs-star"></i>
                      <i className="bx bxs-star"></i>
                    </li>
                  </ul>

                  
                </div>

                <div className="offer-soon-content">
                  <div
                    id="timer"
                    className="flex-wrap d-flex justify-content-center"
                  >
                    <div
                      id="days"
                      className="align-items-center flex-column d-flex justify-content-center"
                    >
                      {days}
                      <span>Days</span>
                    </div>
                    <div
                      id="hours"
                      className="align-items-center flex-column d-flex justify-content-center"
                    >
                      {hours}
                      <span>Hours</span>
                    </div>
                    <div
                      id="minutes"
                      className="align-items-center flex-column d-flex justify-content-center"
                    >
                      {minutes}
                      <span>Minutes</span>
                    </div>
                    <div
                      id="seconds"
                      className="align-items-center flex-column d-flex justify-content-center"
                    >
                      {seconds}
                      <span>Seconds</span>
                    </div>
                  </div>
                </div>
              </div>
            {/* ----//)}----//--*/}
          </div>

          <div className="col-lg-8 col-md-12">
            <div className="row">
              {
                newProduct.slice(0, 3).map((product) => {
                  return (
                    <div className="col-lg-4 col-sm-6" key={product.id}>
                      <div className="single-offer-products-box">
                        <div className="offer-products-image">
                          <Link to={`/products-details/${product.id}`}>
                            {/* <Image
                              key={product._id}
                              cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
                              publicId={product.image_public_id}
                              width="300"
                              crop="scale"
                            /> */}
                            <img src={product.image} style={{width:"300px"}} alt="" />
                          </Link>
                          <div className="tag">-50%</div>

                          <ul className="offer-action">
                            <li>
                              <span className="addtocart-icon-wrap"> 
                              {/* onClick={() => addToCart(product)} */}
                                <i className="flaticon-shopping-cart"></i>
                              </span>
                            </li>
                            <li>
                              <a href="#">
                                <i className="flaticon-heart"></i>
                              </a>
                            </li>
                            <li>
                              <span className="quickview-icon-wrap quick-icon" >
                              {/* onClick={() => showQuickView(product)} */}
                                <i className="flaticon-view"></i>
                              </span>
                            </li>
                          </ul>
                        </div>

                        <div className="offer-products-content">
                          <span>Gadget</span>
                          <h3>
                            <Link to={`/products-details/${product.id}`}>
                              {product.name}
                            </Link>
                          </h3>
                          <div className="price">
                            <span className="new-price">${product?.price}</span>
                            <span className="old-price">$300.00</span>
                          </div>
                          <ul className="rating">
                            <li>
                              <i className="bx bxs-star"></i>
                              <i className="bx bxs-star"></i>
                              <i className="bx bxs-star"></i>
                              <i className="bx bxs-star"></i>
                              <i className="bx bxs-star"></i>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                })}

              <div className="col-lg-12 col-md-12">
                <div className="offer-overview">
                  <div className="row align-items-center">
                    <div className="col-lg-6">
                      <div className="offer-image">
                        <img src={offerProducts7} alt="image" />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="offer-content">
                        <h3>Special Discount Offer</h3>
                        <span>$499.00</span>

                        <div className="offer-btn">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SpecialOffer;
