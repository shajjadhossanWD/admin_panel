import { useState, useEffect } from "react";
import axios from "axios";
import PageTitle from "../../Components/Common/PageTitle";
import Partner from "../../Components/Common/Partner";
import Footer from "../../Components/Layout/Footer/Footer";
import ShopFullWidthArea from "../../Components/Shop/ShopFullWidthArea";
import QuickView from "../../Components/Products/QuickView";

function ShopFullWidth() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    axios
      .get("/products/")
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => console.log(err));
  }, []);

  const showQuickView = (product) => {
    setIsOpen(true);
    setProduct(product);
  };

  const closeModal = () => {
    setIsOpen(false);
    setProduct({});
  };

  return (
    <div className="shop-full-width-wrapper">
      <PageTitle title="Shop Full Width" />
      <ShopFullWidthArea products={products} showQuickView={showQuickView} />
      <Partner paddingclassName=" ptb-50" />
      <QuickView isOpen={isOpen} closeModal={closeModal} product={product} />
    </div>
  );
}

export default ShopFullWidth;
