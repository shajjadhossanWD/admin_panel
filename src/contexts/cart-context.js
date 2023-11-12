import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { DSLCommerceContext } from "./DSLCommerceContext";
import { Navigate, useNavigate } from "react-router-dom";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [carts, setCarts] = useState([]);
  const [cartRefetch, setCartRefetch] = useState(false);
  const { user } = useContext(DSLCommerceContext);
  const [payablePrice, setPayablePrice] = useState(null);
  const navigate = useNavigate();

  const addTotalPrice = (total) => {
    // console.log(total);
    setPayablePrice(total);
  };

  //************************************** Add Item To Cart **************************************
  const addItemToCart = async (product, quantity, toNavigate) => {
    console.log(product, "Product to add to cart");
    console.log(product?.availableProduct, "Available quantity");
    if (!product.availableProduct > 0) {
      swal({
        text: `This product is not available for now.`,
        icon: "warning",
        button: "OK!",
        className: "modal_class_success",
      });
      return;
    }

    const price =
      product?.price - (product?.price * product?.offeringProduct) / 100;

    let item = {
      walletAddress: user?.walletAddress,
      productId: product?._id,
      price,
      images: product?.images,
      productName: product?.productName,
      count: quantity,
    };

    await axios
      .post(`https://backend.dslcommerce.com/api/cart/`, item)
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          swal({
            text: `Successfully added to cart! `,
            icon: "success",
            button: "OK!",
            className: "modal_class_success",
          });
          setCartRefetch(true);
          // If it requires to navigate
          if (toNavigate) {
            navigate(toNavigate);
            window.scrollTo(0, 0);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        swal({
          text: `Product already added to cart`,
          icon: "warning",
          button: "OK!",
          className: "modal_class_success",
        });
      });
  };

  //************************************** Get All Cart Item **************************************
  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://backend.dslcommerce.com/api/cart/${user?.walletAddress}`)
      .then((res) => {
        // console.log("res.data");
        // console.log(res.data);
        setCarts(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
    setCartRefetch(false);
  }, [cartRefetch, user?.walletAddress]);

  // console.log(carts)

  return (
    <CartContext.Provider
      value={{
        addItemToCart,
        carts,
        setCarts,
        cartRefetch,
        setCartRefetch,
        loading,
        setLoading,
        addTotalPrice,
        payablePrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
