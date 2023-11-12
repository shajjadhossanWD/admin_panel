import { useState, useEffect } from "react";
import axios from "axios";
import PageTitle from "../../Components/Common/PageTitle";
import Partner from "../../Components/Common/Partner";
import Footer from "../../Components/Layout/Footer/Footer";
import ShopListViewArea from "../../Components/Shop/ShopListViewArea";
import QuickView from "../../Components/Products/QuickView";

function ShopListView() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const showQuickView = (product) => {
    setIsOpen(true);
    setProduct(product);
  };

  const closeModal = () => {
    setIsOpen(false);
    setProduct({});
  };

  useEffect(() => {
    axios
      .get("/products/")
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="shop-list-view-wrapper">
      <PageTitle title="Shop List View" />
      <ShopListViewArea products={products} showQuickView={showQuickView} />
      <Partner paddingclassName=" pbt-50" />
      <QuickView isOpen={isOpen} closeModal={closeModal} product={product} />
    </div>
  );
}

export default ShopListView;
