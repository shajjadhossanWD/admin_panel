import PageTitle from "../../Components/Common/PageTitle";
import Footer from "../../Components/Footer/Footer";
import CheckoutArea from "../../Components/Shop/CheckoutArea";

function Checkout() {
  return (
    <div className="checkout-wrapper">
      <PageTitle title="Checkout" />
      <CheckoutArea />
      <Footer />
    </div>
  );
}

export default Checkout;
