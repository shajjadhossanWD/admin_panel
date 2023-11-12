import { useState, useContext } from "react";
import { useSelector } from "react-redux";
import PageTitle from "../../Components/Common/PageTitle";
import Partner from "../../Components/Common/Partner";
import ShopArea from "../../Components/Shop/ShopArea";
import QuickView from "../../Components/Products/QuickView";
import { CartContext } from "../../contexts/cart-context";
import { DSLCommerceContext } from "../../contexts/DSLCommerceContext";

function Shop({ page = 1, query = undefined, keyword = undefined }) {
  const [product, setProduct] = useState({});

  const { products } = useSelector((state) => state.productReducer);
  const [isOpen, setIsOpen] = useState(false);
  const { addItemToCart } = useContext(CartContext);
  const { user } = useContext(DSLCommerceContext);
  const [averageRatings, setAverageRatings] = useState(0);

  const showQuickView = (product, averageRatings) => {
    console.log(averageRatings, "AverageRatings In function", product);
    setIsOpen(true);
    setProduct(product);
    setAverageRatings(averageRatings);
  };

  const closeModal = () => {
    setIsOpen(false);
    setProduct({});
  };

  const addToCart = (product) => {
    addItemToCart(product, 1);
  };

  return (
    <div className="shop-wrapper">
      <PageTitle title="Shop" />
      <ShopArea
        products={products}
        addToCart={addToCart}
        keyword={keyword ? keyword : ""}
        showQuickView={showQuickView}
        page={page}
        query={query}
      />
      {/* <Partner paddingclassName="ptb-50" /> */}
      {isOpen && (
        <QuickView
          isOpen={isOpen}
          closeModal={closeModal}
          averageRatings={averageRatings}
          product={product}
        />
      )}
    </div>
  );
}

export default Shop;
