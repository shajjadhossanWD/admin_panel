import { useState, useEffect } from "react";
import axios from "axios";
import PageTitle from "../../Components/Common/PageTitle";
import Partner from "../../Components/Common/Partner";
import Footer from "../../Components/Layout/Footer/Footer";
import ShopLeftSidebarArea from "../../Components/Shop/ShopLeftSidebarArea";
import QuickView from "../../Components/Products/QuickView";

function ShopLeftSidebar() {
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
    <div className="shop-left-sidebar-wrapper">
      <PageTitle title="Shop Left Sidebar" />
      <ShopLeftSidebarArea products={products} showQuickView={showQuickView} />
      <Partner paddingclassName=" pbt-50" />
      <QuickView isOpen={isOpen} closeModal={closeModal} product={product} />
    </div>
  );
}

export default ShopLeftSidebar;
