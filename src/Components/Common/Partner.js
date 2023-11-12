import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
// import ReactOwlCarousel from "react-owl-carousel";
import partner1 from "../../assets/img/partner/partner-1.png";
import partner2 from "../../assets/img/partner/partner-2.png";
import partner3 from "../../assets/img/partner/partner-3.png";
import partner4 from "../../assets/img/partner/partner-4.png";
import partner5 from "../../assets/img/partner/partner-5.png";

function Partner({ paddingClass = "" }) {

  const options = {
    loop: true,
    margin: 0,
    nav: false,
    mouseDrag: false,

    items: 5,
    dots: false,
    autoplay: true,
    smartSpeed: 500,
    responsive: {
      0: {
        items: 2,
      },
      600: {
        items: 2,
      },

      1000: {
        items: 4
      }

    },
  };


  return (
    <div className={"partner-area" + paddingClass}>
      <div className="container">
        <OwlCarousel
          className="owl-theme"
          margin={20}
          {...options}

        >
          <div className="partner-item">
            <a href="#">
              <img src={partner1} alt="image" />
            </a>
          </div>

          <div className="partner-item">
            <a href="#">
              <img src={partner2} alt="image" />
            </a>
          </div>

          <div className="partner-item">
            <a href="#">
              <img src={partner3} alt="image" />
            </a>
          </div>

          <div className="partner-item">
            <a href="#">
              <img src={partner4} alt="image" />
            </a>
          </div>

          <div className="partner-item">
            <a href="#">
              <img src={partner5} alt="image" />
            </a>
          </div>
        </OwlCarousel>
      </div>
    </div>
  );
}

export default Partner;
