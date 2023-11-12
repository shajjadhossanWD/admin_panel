import PageTitle from "../../Components/Common/PageTitle";
import CartArea from "../../Components/Shop/CartArea";

function Cart() {
  return (
    <div className="cart-wrapper">
      <PageTitle title="Cart" />
      <CartArea />
    </div>
  );
}

export default Cart;
