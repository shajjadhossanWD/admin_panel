import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import trackOrder from "../../assets/img/logoDSL.jpeg";
import { DSLCommerceContext } from "../../contexts/DSLCommerceContext";
import { useTimer } from "react-timer-hook";
import swal from "sweetalert";
import TrackingMailVerify from "./TrackingMailVerify";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const TrackingOrderArea = ({ expiryTimestamp }) => {
  const {
    user,
    logOut,
    metamaskBalance,
    metamaskBalanceLoading,
    userRefetch,
    setUserRefetch,
    getBalanceTestnet,
    mint,
  } = useContext(DSLCommerceContext);

  const [email1, setEmail] = useState("");
  const [emailVerify, setEmailVerify] = useState(false);
  const [disableAfterActivation, setDisableAfterActivation] = useState(false);
  const [otpVerify, setOtpVerify] = useState();
  const [openEmail, setOpenEmail] = useState(false);
  const [isError, setError] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [tracking, setTracking] = useState([]);

  // Re-send OTP functionality
  const { seconds, minutes, resume, restart } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });

  const restarting = (sec) => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + sec);
    restart(time);
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (id) => {
    // console.log(id)
    axios
      .get(
        // `https://backend.dslcommerce.com/api/order/data/${user?.walletAddress}`
        `https://backend.dslcommerce.com/api/order/data/get/${id}`
      )
      .then((res) => setTracking(res.data))
      .catch((err) => {
        console.log(err);
      });

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // console.log(tracking)

  const handleVerifyEmail = async (e) => {
    // check if email is valid
    setDisableAfterActivation(true);
    if (email1.length > 0 && email1.includes("@" && ".")) {
      // setLoading(true);
      setEmailVerify(true);
      await axios
        .post("https://backend.dslcommerce.com/api/users/email", {
          email: email1,
        })
        .then((res) => {
          if (res.status === 200) {
            // alert(res.data.message);
            // setSendMail(res.data.email)
            restarting(180);
            swal({
              text: res.data.message,
              icon: "success",
              button: "OK!",
              className: "modal_class_success",
            });
            // console.log('emtiaz', res.data);
            setOtpVerify(res.data.otp);

            setTimeout(() => {
              setDisableAfterActivation(false);
            }, 120000);
          }
          setOpenEmail(true);
        })
        .catch((err) => {
          // alert(err.response.data.message);
          setEmailVerify(false);
          swal({
            title: "Attention",
            text: err.response.data.message,
            icon: "warning",
            button: "OK!",
            className: "modal_class_success",
          });
        })
        .finally(() => {
          // setLoading(false);
        });
    } else {
      swal({
        title: "Attention",
        text: "Please enter a valid email address",
        icon: "warning",
        button: "OK!",
        className: "modal_class_success",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user.email) {
      swal({
        title: "Attention",
        text: "Please verify your email ",
        icon: "warning",
        button: "OK",
        dangerMode: true,
        className: "modal_class_success",
      });
    } else {
      const data = {
        orderId: orderId,
        email: email1,
        walletAddress: user?.walletAddress,
      };

      handleClickOpen(orderId);
    }
  };

  console.log(tracking);

  return (
    <section className="track-order-area ptb-50">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="track-order-image">
              <img src={trackOrder} alt="image" />
            </div>
          </div>

          <div className="col-lg-6">
            <div className="track-order-content">
              <h2>Order Tracking</h2>
              <p>Will be updated soon!</p>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="float-start">Order ID</label>
                  <input
                    type="text"
                    name="orderId"
                    onChange={(e) => setOrderId(e.target.value)}
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="text-start">Billing Email</label>
                  {/* <input type="email" className="form-control text-lowercase" /> */}
                  <div className="d-flex">
                    <input
                      style={
                        user?.email
                          ? { textTransform: "unset" }
                          : {
                              textTransform: "unset",
                              borderTopRightRadius: "inherit",
                              borderBottomRightRadius: "inherit",
                            }
                      }
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Email Address"
                      onChange={(e) => {
                        setEmail(e.target.value.toLocaleLowerCase());
                        setEmailVerify(false);
                      }}
                      value={user?.email ? user?.email : email1}
                      disabled={user?.email ? true : false}
                      required
                    />
                    {!user?.email && (
                      <button
                        type="button"
                        onClick={handleVerifyEmail}
                        disabled={
                          email1.length === 0 || disableAfterActivation
                            ? true
                            : false
                        }
                        className={
                          email1.length === 0 || disableAfterActivation
                            ? "border bg-secondary  rounded-0 text-white rounded-end"
                            : "border bg-success text-white rounded-0 rounded-end"
                        }
                      >
                        Verify
                      </button>
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <label className="float-start">Wallet Address</label>
                  <input
                    type="text"
                    value={user?.walletAddress}
                    disabled
                    className="form-control"
                  />
                </div>

                <button type="submit" className="default-btn">
                  Track Order
                  <span></span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Your Order"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {tracking.length === 0 ? (
                <>
                  <p>
                    No Order Found . Please check your email for order details .
                  </p>
                </>
              ) : (
                <>
                  {tracking.map((data) => {
                    console.log(data, "order data ");
                    return (
                      <>
                        <div className="row w-100">
                          <div className="col-12 col-lg-6">
                            {/* {console.log(data)} */}
                            {data.orderItems[0]?.images
                              ?.slice(0, 1)
                              ?.map((img) => (
                                <img src={img} alt="img" />
                              ))}
                          </div>
                          <div className="col-12 col-lg-6">
                            <p>Name: {data?.name}</p>
                            <p>
                              Product name: {data?.orderItems[0].productName}
                            </p>
                            <p>
                              Status:{" "}
                              {data?.pendingStatus === true && <>Pending</>}
                              {data?.processingStatus === true && (
                                <>Processing</>
                              )}
                              {data?.deliveredStatus === true && <>Delivered</>}
                            </p>
                            <p>Order Date: {data?.date.slice(0, 10)}</p>
                            <p> Order Id: {data.orderId}</p>
                            <p>Email: {data.email} </p>
                            <p>Country: {data.country} </p>
                            <p>Town: {data.town} </p>
                            <p>Address: {data.address} </p>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </>
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
            {/* <Button onClick={handleClose} autoFocus>
                            Ok
                        </Button> */}
          </DialogActions>
        </Dialog>
      </div>

      <TrackingMailVerify
        userRefetch={userRefetch}
        handleVerifyEmail={handleVerifyEmail}
        minutes={minutes}
        seconds={seconds}
        open={openEmail}
        setOpenEmail={setOpenEmail}
        otpVerify={otpVerify}
        setError={setError}
        setEmailVerify={setEmailVerify}
      />
    </section>
  );
};

export default TrackingOrderArea;
