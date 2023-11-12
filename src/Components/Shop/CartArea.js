import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../contexts/cart-context";
import axios from "axios";
import { DSLCommerceContext } from "../../contexts/DSLCommerceContext";
import ItemDetails from "./ItemDetails";
import { useEffect } from "react";

function CartArea() {
  const { carts, setCarts, setCartRefetch, addTotalPrice } = useContext(CartContext);
  const { user } = useContext(DSLCommerceContext);
  const [coupon, setCoupon] = useState([])
  const [total, setTotal] = useState(0)
  const [subTotal, setSubTotal] = useState(0)
  const [shipping, setShipping] = useState(0)
  const [couponError, setCouponError] = useState('')
  console.log(carts);

  // Total Cart Calculation
  useEffect(() => {
    let getSubTotal = 0
    carts?.forEach((element) => {
      getSubTotal = (Number(getSubTotal + (element.price * element.count)))
      // console.log(getSubTotal);
      setShipping(parseFloat((getSubTotal * 2.5) / 100))
    });
    setSubTotal(getSubTotal)
    console.log(getSubTotal)
    setTotal(Number(getSubTotal + parseFloat((getSubTotal * 2.5) / 100)))
  }, [carts])

  // console.log("carts", carts)

  // Remove Item To Cart
  const removeCartItem = async (id) => {
    const data = { walletAddress: `${user?.walletAddress}` };

    await axios
      .delete(`https://backend.dslcommerce.com/api/cart/delete/${id}`, { data })
      .then((res) => {
        if (res.status === 200) {
          setCarts(carts.filter((product) => product._id !== id));
        }
      })
      .catch((error) => {
        alert("Something went wrong, Try Again .");
      });
  };

  // useEffect(() => {
  //   axios.get(`https://backend.dslcommerce.com/api/coupons/`)
  //     .then(res => {
  //       // console.log(res.data);
  //       setCoupon(res.data);
  //     })
  //     .catch(error => {
  //       console.log('object');
  //     });
  // }, [])
  const handleSubmit = (e) => {
    e.preventDefault()
    // const value = e.target.couponCode.value
    // // if(coupon.find(c) )
    // var result = coupon.find(item => item?.name === value);
    // if (result) {
    //   const couponC = result?.value
    //   const finalTotal = total - (total * couponC)
    //   setTotal(finalTotal)
    //   setCouponError(null)
    // }
    // else {
    //   setCouponError('Coupon Not Valid !')
    // }

  }

  return (
    <section className="cart-area ptb-50">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-12">
            <form onSubmit={handleSubmit}>
              <div className="cart-table table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Product</th>
                      <th scope="col">Name</th>
                      <th scope="col">Unit Price</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Total</th>
                    </tr>
                  </thead>

                  <tbody>
                    {carts.length > 0 &&
                      carts.map((cartItem, index) => (
                        <ItemDetails
                          key={index}
                          cartItem={cartItem}
                          removeCartItem={removeCartItem}
                          user={user}
                          setCartRefetch={setCartRefetch}
                          setCarts={setCarts}
                        />
                      ))}
                  </tbody>
                </table>
              </div>
              {!carts.length > 0 && (
                <div>
                  <h4 className="text-center my-5">Empty cart</h4>
                </div>
              )}


              {/* {carts.length > 0 ?
                <div className="cart-buttons">
                  <div className="row align-items-center">
                    <div className="col-lg-7 col-sm-7 col-md-7">
                      <p>Use our coupon "DSL10" for get discount</p>
                      <div className="shopping-coupon-code">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Coupon code"
                          name="couponCode"
                          id="couponCode"
                          required
                        />
                        <button type="submit" disabled={false}>
                          Apply Coupon
                        </button>
                      </div>
                      <p className="text-danger pt-1">{couponError}</p>
                    </div>
                  </div>
                </div>
                :
                <div className="cart-buttons">
                  <div className="row align-items-center">
                    <div className="col-lg-7 col-sm-7 col-md-7">
                      <div className="shopping-coupon-code-disable">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Coupon code"
                          name="coupon-code"
                          id="coupon-code"
                        />
                        <button type="submit" disabled={true}>
                          Apply Coupon
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              } */}


            </form>
          </div>

          <div className="col-lg-4 col-md-12">
            <div className="cart-totals">
              <h3>Cart Totals</h3>

              <ul>
                <li>
                  Subtotal <span>$ {subTotal.toFixed(3)}</span>
                </li>
                <li>
                  Shipping <span>${shipping.toFixed(3)}</span>
                </li>
                <li>
                  Total <span>$ {total.toFixed(3)}</span>
                </li>
                <li>
                  Payable Total <span>$ {total.toFixed(3)}</span>
                </li>
              </ul>

              <button className="proceed_button">
                {carts.length === 0 ? (
                  <Link
                    to=""
                    className="disable-btn"
                    onClick={(event) => event.preventDefault()}
                  >
                    Proceed to Checkout
                    <span></span>
                  </Link>
                ) : (
                  <Link to={`/checkout/${total.toFixed(3)}`}
                    className="default-btn"
                    onClick={() => {
                      addTotalPrice(total)
                      window.scrollTo(0, 0);
                    }}
                  >
                    Proceed to Checkout
                    <span></span>
                  </Link>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CartArea;
