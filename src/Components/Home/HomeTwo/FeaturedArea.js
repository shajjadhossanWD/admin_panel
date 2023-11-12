import { Link } from "react-router-dom";
// import featured1 from "../../../assets/img/featured/featured-1.jpg";
// import featured2 from "../../../assets/img/featured/featured-2.jpg";
// import featured3 from "../../../assets/img/featured/featured-3.jpg";
import featured1 from "../../../assets/img/featured/1.jpeg";
import featured2 from "../../../assets/img/featured/2.jpeg";
import featured3 from "../../../assets/img/featured/3.jpeg";
import { Carousel } from "react-responsive-carousel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../Shared/Loader";

function FeaturedArea() {
  const [allFeatured, setAllFeatured] = useState();

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    // nextArrow: {color:"#000"}
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 777,
        settings: {
          slidesToShow: 1,
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



  const fetchAllProduct = async () => {
    await axios
      .get("https://backend.dslcommerce.com/api/feature-product")
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          console.log(res);
          setAllFeatured(res.data.result);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);


  return (
    <section className="featured-area">
      <div className="container">
        <div className="section-title pt-0 pt-lg-5">
          <h2>Featured Products</h2>
        </div>
        <div>
          {!allFeatured ? <Loader /> : <Slider className="overflow-hidden" {...settings}>
            {allFeatured?.map(image => {
              return <div className="p-3">
                <div className="single-featured">
                  <img className="mx-auto" src={image.img} alt="featured_img" />
                </div>
              </div>
            })}

            {/* <div className="p-3">
              <div className="single-featured">
                <img className="mx-auto" src={featured1} alt="featured_img" />

                 <div className="featured-content">
                  <span>Featured</span>
                  <h3>Best Deal on the Camera Collection</h3>
                  <div className="tag">30% Off</div>

                  <div className="mb-2 mb-sm-0">
                    <div className="featured-btn ">
                      <Link
                        to="/shop"
                        className="featured-btn-one"
                        onClick={() => {
                          window.scrollTo(0, 0);
                        }}
                      >
                        View product
                      </Link>
                    </div>
                  </div>
                </div> 
              </div>
            </div>*/}

            {/*  <div className="p-3">
              <div className="single-featured">
                <img className="mx-auto" src={featured2} alt="featured_img" />

                <div className="featured-content">
                  <span>Featured</span>
                  <h3>Best Deal on the Camera Collection</h3>
                  <div className="tag">30% Off</div>

                  <div className="featured-btn">
                    <Link
                      to="/shop"
                      className="featured-btn-one"
                      onClick={() => {
                        window.scrollTo(0, 0);
                      }}
                    >
                      View product
                    </Link>
                  </div>
                </div> 
              </div>
            </div>*/}
            {/*  <div className="p-3">
              <div className="single-featured">
                <img className="mx-auto" src={featured3} alt="featured_img" />

                <div className="featured-content">
                  <span>Featured</span>
                  <h3>Best Deal on the Camera Collection</h3>
                  <div className="tag">30% Off</div>

                  <div className="featured-btn">
                    <Link
                      to="/shop"
                      className="featured-btn-one"
                      onClick={() => {
                        window.scrollTo(0, 0);
                      }}
                    >
                      View product
                    </Link>
                  </div>
                </div> 
              </div>
            </div>*/}
            {/*  <div className="p-3">
              <div className="single-featured">
                <img className="mx-auto" src={featured1} alt="featured_img" />

               <div className="featured-content">
                  <span>Featured</span>
                  <h3>Best Deal on the Camera Collection</h3>
                  <div className="tag">30% Off</div>

                  <div className="featured-btn">
                    <Link
                      to="/shop"
                      className="featured-btn-one"
                      onClick={() => {
                        window.scrollTo(0, 0);
                      }}
                    >
                      View product
                    </Link>
                  </div>
                </div>
              </div>
            </div> */}
            {/* <div className="p-3">
              <div className="single-featured">
                <img className="mx-auto" src={featured2} alt="featured_img" />

                <div className="featured-content">
                  <span>Featured</span>
                  <h3>Best Deal on the Camera Collection</h3>
                  <div className="tag">30% Off</div>

                  <div className="featured-btn">
                    <Link to="/shop" className="featured-btn-one">
                      View product
                    </Link>
                  </div>
                </div> 
              </div>
            </div>*/}
          </Slider>}
        </div>
        <div className="collection-btn text-center mt-5">
          <Link to="/shop" className="default-btn">
            {/* <i className="flaticon-shopping-cart"></i> */}
            See All Products
            <span></span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedArea;
