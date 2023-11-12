import axios from "axios";
import { useContext, useEffect, useState } from "react";
import NewArrivals from "../../Components/Common/NewArrivals";
import PageTitle from "../../Components/Common/PageTitle";
import Support from "../../Components/Common/Support";
import QuickView from "../../Components/Products/QuickView";
import ProductsDetailsArea from "../../Components/Shop/ProductsDetailsArea";
import { CartContext } from "../../contexts/cart-context";

function ProductsDetails() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  // const [isLoading, setisLoading] = useState(true);
  const context = useContext(CartContext);

  useEffect(() => {
    axios
      .get("https://backend.dslcommerce.com/api/product/")
      .then((res) => {
        setProducts(res.data);
        // console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  // console.log(products);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setisLoading(false);
  //   }, 1000);
  // }, []);

  const showQuickView = (product) => {
    setIsOpen(true);
    setProduct(product);
  };

  const closeModal = () => {
    setIsOpen(false);
    setProduct({});
  };

  const addToCart = (product) => {
    context.addItemToCart(product, quantity);
  };

  return (
    <>
      <div className="products-details-wrapper">
        <PageTitle title="Products Details" />
        <ProductsDetailsArea />
        <NewArrivals
          paddingclassName=" pt-50 pb-20"
          title="Related Products"
          addToCart={addToCart}
          showQuickView={showQuickView}
          products={products}
        />
        <Support />
        <QuickView isOpen={isOpen} closeModal={closeModal} product={product} />
      </div>
    </>
  );
}

export default ProductsDetails;
