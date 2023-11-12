import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const ItemDetails = ({ cartItem, removeCartItem, user, setCartRefetch }) => {
  const { count } = cartItem;
  console.log(cartItem, "Each item");
  const [quantity, setQuantity] = useState(count);

  // const discount = (cartItem?.price * cartItem?.offeringProduct) / 100;
  //
  // console.log(discount, cartItem?.offeringProduct, "Discount amount");

  const decreaseItem = async (id) => {
    if (quantity > 1) {
      const body = { count: quantity - 1, id: id };
      // console.log(body);

      await axios
        .put(
          `https://backend.dslcommerce.com/api/cart/${user?.walletAddress}`,
          body
        )
        .then((res) => {
          console.log("count", res.data);
          if (res.status === 200) {
            setQuantity(res.data?.result?.count);
            setCartRefetch(true);
          }
        })
        .catch((error) => {
          swal({
            text: "Something went wrong, Try Again.",
            icon: "warning",
            button: "OK!",
            className: "modal_class_success",
          });
        });
    } else {
      setQuantity(quantity);
    }
  };
  // console.log('cartdsdsdsdsd' , cartItem)

  const increaseItem = async (id) => {
    if (quantity < parseInt(cartItem.availableProduct)) {
      const body = { count: quantity + 1, id: id };
      await axios
        .put(
          `https://backend.dslcommerce.com/api/cart/${user?.walletAddress}`,
          body
        )
        .then((res) => {
          if (res.status === 200) {
            setQuantity(res.data?.result?.count);
            setCartRefetch(true);
          }
        })
        .catch((error) => {
          // alert("Something went wrong, Try Again .");

          swal({
            text: "Something went wrong, Try Again.",
            icon: "warning",
            button: "OK!",
            className: "modal_class_success",
          });
        });
    } else {
      setQuantity(parseInt(cartItem.availableProduct));
    }
  };

  return (
    <tr className="top-className" key={cartItem._id}>
      <td className="product-thumbnail">
        <span
          onClick={() => removeCartItem(cartItem._id)}
          className="remove"
          style={{ cursor: "pointer" }}
        >
          <i className="bx bx-x"></i>
        </span>
        <Link to={`/shop/products-details/${cartItem?.product}`}>
          <img src={cartItem?.images[0]} alt="" style={{ width: "80px" }} />
        </Link>
      </td>

      <td className="product-name">
        <Link to={`/shop/products-details/${cartItem?.product}`}>
          {cartItem?.productName}
        </Link>
      </td>

      <td className="product-price">
        <span className="unit-amount">${cartItem?.price}</span>
      </td>

      <td className="product-quantity">
        <div className="input-counter">
          <span
            className="minus-btn"
            onClick={() => decreaseItem(cartItem?._id)}
          >
            <i className="bx bx-minus"></i>
          </span>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            readOnly
            min="1"
            max={cartItem.availableProduct}
          />
          <span
            className="plus-btn"
            onClick={() => increaseItem(cartItem?._id)}
          >
            <i className="bx bx-plus"></i>
          </span>
        </div>
      </td>

      <td className="product-subtotal">
        <span className="subtotal-amount">
          ${(cartItem?.price * quantity).toFixed(2)}
        </span>
      </td>
    </tr>
  );
};

export default ItemDetails;
