import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { DSLCommerceContext } from "./DSLCommerceContext";

export const WishlistContext = createContext();

export default function WishlistProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [wishlistProducts, setWishlistProducts] = useState([])
  const [refetch, setRefetch] = useState(false);
  const { user } = useContext(DSLCommerceContext);

  //************************************** Add Product To Wishlist **************************************
  const addProductToWishlist = async (product) => {
    // console.log("wishlist", product);

    await axios
      .post(`https://backend.dslcommerce.com/api/wishlist/create`, {
        walletAddress: user.walletAddress,
        productId: product._id,
      })
      .then((res) => {
        if (res.status === 200) {
          swal({
            // title: "Success",
            text: "Successfully added to wishlist",
            icon: "success",
            button: "OK!",
            className: "modal_class_success",
          });
          setWishlistProducts([...wishlistProducts, product])
          setRefetch(true);
        }
      })
      .catch((err) => {
        swal({
          title: "Attention",
          // text: `${err.response.data.message}`,
          text: `Product already added to wishlist`,
          icon: "warning",
          button: "OK!",
          className: "modal_class_success",
        });
      });
  };


  //************************************** Get All Wishlist Product **************************************

  useEffect(() => {
    axios
      .get(`https://backend.dslcommerce.com/api/wishlist/${user?.walletAddress}`)
      .then((res) => {
        // console.log(res.data)
        fetch(`https://backend.dslcommerce.com/api/product/`)
          .then((res) => res.json())
          .then((result) => {
            setWishlistProducts(
              result.filter((e) => res.data?.data?.products.includes(e._id))
            );
          });
      })
      .catch((err) => {
        // console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
    setRefetch(false);
  }, [user?.walletAddress, refetch]);

  // console.log(wishlistProducts);

  return (
    <WishlistContext.Provider
      value={{
        addProductToWishlist,
        wishlistProducts,
        setWishlistProducts,
        refetch,
        setRefetch,
        loading,
        setLoading,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

