import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { DSLCommerceContext } from "../../contexts/DSLCommerceContext";
import { WishlistContext } from "../../contexts/wishlist-context";
import axios from "axios";
import { CartContext } from "../../contexts/cart-context";
import Pagination from "../Pagination/Pagination";

function WishListArea() {

  const { user, openWalletModal } = useContext(DSLCommerceContext);
  const { addItemToCart } = useContext(CartContext);
  const { wishlistProducts, setWishlistProducts, setWishlistRefetch } =
    useContext(WishlistContext);


  const { productPerPagee } = useParams();
  // console.log(productPerPagee, 'product per page')
  const [getPage, setPage] = useState(1);
  const [show, setShow] = useState(10);
  const [lastPage, setLastPage] = useState(0);
  const [sliceProduct, setSliceProduct] = useState([]);
  const navigate = useNavigate();



  useEffect(() => {
    const lastPage = Math.ceil(wishlistProducts?.length / show);
    setLastPage(lastPage);
  }, [wishlistProducts, show]);

  useEffect(() => {
    if (productPerPagee) {
      const page = parseInt(productPerPagee);
      const getSlicingCategory = wishlistProducts.slice(
        (page - 1) * show,
        page * show
      );
      setSliceProduct([...getSlicingCategory]);
      setPage(parseInt(page));
    } else {
      const getSlicingProduct = wishlistProducts.slice(0, show);
      setSliceProduct([...getSlicingProduct]);
    }
  }, [wishlistProducts, show, productPerPagee]);

  const pageHandle = (jump) => {
    console.log(jump);
    navigate(`/wishlist/${jump}`);
    setPage(parseInt(jump));
  };



  //********************** Delete wishlist **************************************
  const handleDelete = async (id) => {
    // console.log("handleDelete", id);

    const body = { productId: id };

    await axios
      .put(
        `https://backend.dslcommerce.com/api/wishlist/delete/${user?.walletAddress}`,
        body
      )
      .then((res) => {
        if (res.status === 200) {
          setWishlistProducts(
            wishlistProducts.filter((product) => product._id !== id)
          );
        }
        setWishlistRefetch(true);
      })
      .catch((error) => {
        // console.log('error', error)
      });
  };

  //************************************** Add To Cart From Wishlist *******************
  const addToCart = (product) => {
    addItemToCart(product, 1);
  };

  return (
    <section className="wishlist-area ptb-50">
      <div className="container">
        <div className="wishlist-table table-responsive">
          <div className="wishlist-title">
            <h2>My Wishlist</h2>
          </div>

          <table className="table table-bordered">
            <tbody>
              {sliceProduct &&
                sliceProduct.map((wishlist) => (
                  <tr>
                    <td className="product-remove">
                      <span
                        className="remove"
                        role={"button"}
                        onClick={() => {
                          handleDelete(wishlist?._id);
                        }}
                      >
                        <i className="bx bx-x "></i>
                      </span>
                    </td>

                    <td className="product-thumbnail">
                      <Link to={`/shop/products-details/${wishlist?._id}`}>
                        <img src={wishlist?.images[0]} alt="item" />
                      </Link>
                    </td>

                    <td className="product-name">
                      <Link to={`/shop/products-details/${wishlist?._id}`}>
                        <span>{wishlist?.productName.slice(0, 20)}</span>
                      </Link>
                    </td>

                    <td className="product-price">
                      <span>$ {wishlist?.price}</span>
                    </td>

                    <td className="product-btn">
                      {user?.walletAddress ? (
                        <button
                          className="default-btn"
                          onClick={() => addToCart(wishlist)}
                        >
                          <i className="flaticon-shopping-cart"></i>
                          Add to Cart
                        </button>
                      ) : (
                        <button
                          className="default-btn"
                          onClick={() => openWalletModal()}
                        >
                          <i className="flaticon-shopping-cart"></i>
                          Add to Cart
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="my-3 d-flex flex-column flex-row  align-items-center">
            {sliceProduct?.length ? (
              <Pagination
                lastPage={lastPage}
                page={getPage}
                pageHandle={pageHandle}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default WishListArea;
