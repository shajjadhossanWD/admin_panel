import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./TopHeader.css";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { DSLCommerceContext } from "../../contexts/DSLCommerceContext";
import swal from "sweetalert";
import companyLogo from "../../assets/img/logoDSL.jpeg";
import WalletLogin from "../WalletButton/WalletLogin";

function TopHeader({ shippingMessage, history }) {
  const navigate = useNavigate();
  const {
    user,
    openWalletModal,
    logOut,
    closeWalletModal,
    closeCoinbaseModal,
  } = useContext(DSLCommerceContext);
  const Logout = () => {
    logOut();
    // setOpen(false);
    navigate("/");
    closeWalletModal();
    swal({
      // title: "S",
      text: "You have successfully logged out.",
      icon: "success",
      button: "OK!",
      className: "modal_class_success",
    });
  };
  return (
    <div className="top-header-area">
      <div className="container">
        <div className="row gy-4 ">
          <div className="col-md-4 pt-lg-0 float-start d-none d-md-block">
            <Link to="/">
              <img src={companyLogo} alt="dsl logo" style={{ width: "12%" }} />
            </Link>
          </div>
          <div className="col-md-4 text-center">
            <div className="top-header-content shippingMessage">
              {user?.walletAddress ? (
                <Link
                  to="/kyc/login"
                  className="text-white"
                  style={{ textDecoration: "underline" }}
                >
                  Become Our Merchant
                </Link>
              ) : (
                <span
                  onClick={() => openWalletModal()}
                  className="text-white"
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                >
                  Become Our Merchant
                </span>
              )}
            </div>
          </div>
          <div className="border-top border-secondary d-md-none"></div>

          <div className="col-md-4 pt-lg-0 ">
            {user.walletAddress ? (
              <div className="">
                <div className="float-start d-md-none">
                  <Link to="/">
                    <img src={companyLogo} alt="dsl logo" width={40} />
                  </Link>
                </div>
                <span className="float-end">
                  <button
                    onClick={Logout}
                    // className="btn btn-primary text-white px-4 py-2 "
                    className="ColorBg border border-0 btn btn-primary "
                    // style={{ border: 'none', borderRadius: '100px' }}
                    style={{ fontSize: "12px" }}
                  >
                    {/* <AccountBalanceWalletIcon className="walletIcon" /> */}
                    <img
                      src={companyLogo}
                      alt="dsl logo"
                      style={{ width: "25px", marginRight: "5px" }}
                    />
                    <span className="pl-1">Logout</span>
                  </button>
                </span>
              </div>
            ) : (
              <div className="text-center  float-md-end  mt-md-0">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="float-start d-md-none mt-1">
                    <Link to="/">
                      <img src={companyLogo} alt="dsl logo" width={40} />
                    </Link>
                  </div>
                  <div className="float-end">

                    {/* <button
                    // onClick={() => openWalletModal()}
                    // className="btn btn-primary text-white px-4 py-2 "
                    // className="ColorBg border border-0 btn btn-primary "
                    // style={{ border: 'none', borderRadius: '100px' }}
                    // style={{ fontSize: "12px" }}
                    > */}
                    {/* <AccountBalanceWalletIcon className="walletIcon" /> */}
                    {/* <img
                        src={companyLogo}
                        alt="dsl logo"
                        style={{ width: "25px", marginRight: "5px" }}
                      />
                      <span className="pl-1">Login With Wallet</span> */}
                    {/* </button> */}

                    <WalletLogin></WalletLogin>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopHeader;
