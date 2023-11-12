import React, { useContext, useEffect, useState } from "react";
import "./Profile.css";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useTimer } from "react-timer-hook";
import { DSLCommerceContext } from "../../contexts/DSLCommerceContext";
import Preloader from "../../Components/Common/Preloader";
import EmailVerifyModal from "./EmailVerifyModal";
import ProfileEmailVerify from "./ProfileEmailVerify";
import { v4 as uuidv4 } from "uuid";
import { BigNumber, ethers } from "ethers";

const Profile = ({ expiryTimestamp }) => {
  const {
    user,
    signBuyFunction,
    mintAddressTestnet,
    MINTTestnetBNB,
    setRequestLoading,
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
  const [openQRModal, setOpenQRModal] = useState(false);
  const [qRFromDatabase, setQRFromDatabase] = useState("");
  const [qRFromDatabaseGet, setQRFromDatabaseGet] = useState("");
  const [isError, setError] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [otpCode, setOtpCode] = useState();
  const navigate = useNavigate();

  // let history = useHistory();
  const copyToClipboard = (text, textType) => {
    console.log(text, textType);
    navigator.clipboard.writeText(text);
    // alert("Copied!");
    swal({
      text: `${textType} Copied`,
      icon: "success",
      button: "OK!",
      className: "modal_class_success",
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getBalanceTestnet();
  }, []);

  useEffect(() => {
    if (metamaskBalanceLoading) {
      return <Preloader />;
    }
  }, []);

  useEffect(() => {
    if (user?.email) {
      setEmail(user.email);
      setEmailVerify(true);
    }
    if (!user.email || !user.email === "undefined") {
      swal({
        text: "Please update your profile.",
        icon: "warning",
        button: "OK",
        dangerMode: true,
        className: "modal_class_success",
      });
    }
  }, [user]);

  useEffect(() => {
    if (email1 !== user?.email) {
      setEmailVerify(false);
    } else {
      setEmailVerify(true);
    }
  }, [email1]);

  // console.log(metamaskBalance)
  // console.log(user?.email, '--user email');

  const LogOut = () => {
    logOut();
    navigate("/");
    swal({
      // title: "Success",
      text: "You have successfully logged out",
      icon: "success",
      button: "OK",
      className: "modal_class_success",
    });
  };

  const backNavigate = () => {
    navigate(-1);
  };

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
            // console.log("emtiaz", res.data);
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

  const updateProfile = async () => {
    const verifiedEmail = email1;
    // console.log(verifiedEmail);

    const otp = { otp: otpCode };
    // console.log(otp)

    await axios
      .post(
        `https://backend.dslcommerce.com/api/users/otp/${verifiedEmail}`,
        otp,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("tokendslcommerce")}`,
          },
        }
      )
      .then((res) => {
        // swal({
        //   title: "Success",
        //   text: "Successfully updated",
        //   icon: "success",
        //   button: "OK!",
        //   className: "modal_class_success",
        // });
        setUserRefetch(!userRefetch);
        // setUserRefetch(true);
      })
      .catch((err) => {
        swal({
          title: "Attention",
          text: `${err.response.data.message}`,
          icon: "warning",
          button: "OK!",
          className: "modal_class_success",
        });
      });
  };

  const updateUserProfile = () => {
    const verifiedEmail = email1;

    const userInfo = JSON.stringify({
      email: verifiedEmail,
    });

    if (!emailVerify) {
      return swal({
        title: "Warning",
        text: "Before updating please verify your email!",
        icon: "warning",
        button: "OK",
        dangerMode: true,
        className: "modal_class_success",
      });
    } else {
      axios
        .put(
          `https://backend.dslcommerce.com/api/users/update/${user?._id}`,
          userInfo,
          {
            headers: {
              "content-type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            swal({
              title: "Success",
              text: "Profile updated successfully",
              icon: "success",
              button: "OK!",
              className: "modal_class_success",
            });
            setUserRefetch(true);
          }
          setUserRefetch(true);
        })
        .catch((err) => {
          swal({
            title: "Attention",
            text: `${err.response.data.message}`,
            icon: "warning",
            button: "OK!",
            className: "modal_class_success",
          });
        });
    }
  };

  const paymentCrypto = async () => {
    console.log("clicked........");
    setRequestLoading(true);
    const generateId = Math.floor(Math.random() * 1000000000000);
    const data = new FormData();
    data.append("id", generateId.toString());
    data.append("price", "0");
    data.append("tokenAddress", "0x0000000000000000000000000000000000000000");
    data.append("nonce", uuidv4());
    data.append("refAddress", "0x0000000000000000000000000000000000000000");
    data.append("walletAddress", user?.walletAddress);
    data.append("image", "https://i.ibb.co/gV0CHbj/nftdemo.jpg");

    await axios
      .post("https://backend.dslcommerce.com/api/v1/mint/uri-json-nft", data, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("tokendslcommerce")}`,
        },
      })
      .then(async (res) => {
        let Obj = {};
        if (res.status === 200) {
          const data1 = await signBuyFunction(
            generateId.toString(),
            ethers.utils.parseEther("0"),
            "0x0000000000000000000000000000000000000000",
            "0x0000000000000000000000000000000000000000",
            res.data.uri
          );

          Obj = await MINTTestnetBNB(data1);

          const data2 = {
            id: generateId.toString(),
            price: "0",
            walletAddress: user?.walletAddress,
            tokenAddress: "0x0000000000000000000000000000000000000000",
          };

          await axios
            .post(
              "https://backend.dslcommerce.com/api/v1/mint/save-nft",
              data2,
              {}
            )
            .then((res) => {
              if (res.status === 200) {
                setRequestLoading(false);
                const wrapper = document.createElement("div");
                wrapper.innerHTML = `
                <a href=${Obj.mint_hash} target="_any" className="link_hash">${Obj.mint_hash}</a>
                <br/>
                <p>Use the following information to import the NFT to your wallet</p>
                <p className="address">Contract Address: <br/> ${mintAddressTestnet}</p>
                <p>Token ID: ${Obj.ID}</p>
                `;
                swal({
                  title: "Successfully claimed",
                  content: wrapper,
                  icon: "success",
                  button: true,
                  className: "modal_class_success",
                });
              }
            })
            .catch((err) => {
              console.log(err);
              setRequestLoading(false);
              const wrapper = document.createElement("div");
              wrapper.innerHTML = `<a href=${Obj.mint_hash} target="_any" className="link_hash text-primary">${Obj.mint_hash}</a> <br/> <p className="success text-light">Your minted has been successful but error in while saving data.</p>`;
              swal({
                title: "Warning",
                content: wrapper,
                icon: "warning",
                button: "OK",
                className: "modal_class_success",
              });
            });
        }
      })
      .catch((err) => {
        console.log(err);
        setRequestLoading(false);
        if (err.code === 4001) {
          return swal({
            title: "Failed",
            text: "Minting Failed!",
            icon: "warning",
            button: "OK",
            dangerMode: true,
            className: "modal_class_success",
          });
        }
        return swal({
          title: "Attention",
          text: "Something went wrong. Please try again later.",
          icon: "warning",
          button: "OK",
          dangerMode: true,
          className: "modal_class_success",
        });
      });
  };
  // console.log(user, 'this is user');
  return (
    <>
      <div className="handleTheProfileBody ">
        <div className="container pt-5  ">
          <div className="position-change text-info ms-md-2 ">
            <h3 className="mb-4 ms-4 ms-md-5  profileTitile">Profile</h3>
          </div>

          <div className="shadow-lg rounded-lg py-5 px-4 p-md-5 align-items-center">
            {/* <p className='text-center'><span onClick={profileClickHere} className='text-primary' style={{ textDecoration: 'underline', cursor: 'pointer' }}>Click here</span> for your SFF 2022 Wheel of Fortune QR Code</p> */}
            {/* <p className='text-center '><span className='text-primary ' style={{textDecoration: 'underline', cursor: 'pointer'}}>Click here</span> for your SFF 2022 Wheel of Fortune QR Code</p> */}
            <div className="row" style={{ rowGap: "10px" }}>
              <div className="col-md-6 px-4">
                <div className="mb-2">
                  <label htmlFor="walletAddress">Wallet Address</label>
                  <div className="d-flex">
                    <input
                      type="text"
                      id="walletAddress"
                      name="walletAddress"
                      value={user?.walletAddress}
                      className="form-control bg-transparent  rounded-0 rounded-start"
                      disabled
                    />
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(user?.walletAddress, "Wallet Address")
                      }
                      className="border bg-success rounded-0 rounded-end"
                    >
                      <FontAwesomeIcon icon={faCopy} className="text-white" />
                    </button>
                  </div>
                </div>
                <div className="mb-2">
                  <label htmlFor="walletAddress">Email Address</label>
                  <div className="d-flex">
                    <input
                      style={
                        user.email
                          ? { textTransform: "unset" }
                          : {
                            textTransform: "unset",
                            borderTopRightRadius: "inherit",
                            borderBottomRightRadius: "inherit",
                          }
                      }
                      type="email"
                      name="email"
                      className="form-control "
                      placeholder="Email Address"
                      onChange={(e) => {
                        setEmail(e.target.value.toLocaleLowerCase());
                      }}
                      value={email1}
                      required
                    />
                    {!emailVerify && user?.email !== email1 && (
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
                <div className="mb-2">
                  <label htmlFor="bnb">BNB in wallet</label>
                  <input
                    type="text"
                    id="bnb"
                    name="bnb"
                    value={
                      metamaskBalance?.bnb
                        ? parseFloat(metamaskBalance?.bnb).toFixed(4)
                        : "0.0000"
                    }
                    className="form-control bg-transparent "
                    disabled
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="usdsc">USDSC in wallet</label>
                  <input
                    type="text"
                    id="usdsc"
                    name="usdsc"
                    value={
                      metamaskBalance?.usdsc
                        ? parseFloat(metamaskBalance?.usdsc).toFixed(4)
                        : "0.0000"
                    }
                    className="form-control bg-transparent "
                    disabled
                  />
                </div>

                <div className="mb-2">
                  <label htmlFor="bnb">DSL in wallet</label>
                  <input
                    type="text"
                    id="bnb"
                    name="bnb"
                    value={
                      metamaskBalance?.dsl
                        ? parseFloat(metamaskBalance?.dsl).toFixed(4)
                        : "0.0000"
                    }
                    className="form-control bg-transparent "
                    disabled
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="bnb">S39 in wallet</label>
                  <input
                    type="text"
                    id="bnb"
                    name="bnb"
                    value={
                      metamaskBalance?.s39
                        ? parseFloat(metamaskBalance?.s39).toFixed(4)
                        : "0.0000"
                    }
                    className="form-control bg-transparent "
                    disabled
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="bnb">FINQUEST in wallet</label>
                  <input
                    type="text"
                    id="bnb"
                    name="bnb"
                    value={
                      metamaskBalance?.Quest
                        ? parseFloat(metamaskBalance?.Quest).toFixed(4)
                        : "0.0000"
                    }
                    className="form-control bg-transparent "
                    disabled
                  />
                </div>
              </div>
              <div className="col-md-6 px-4">
                <div className="mb-2">
                  <label htmlFor="quantity-input">Claim Membership NFT</label>
                  <div className="d-flex">
                    {/* <input type="text" id='quantity-input' name="memberShipNft" className='form-control bg-transparent  rounded-0 rounded-start' value={1} disabled /> */}
                    <button
                      type="button"
                      className="btn btn-success  text-light rounded-0 rounded-end text-uppercase"
                      onClick={paymentCrypto}
                    >
                      Claim Free Now
                    </button>
                  </div>
                </div>
                <div className="mb-2">
                  <label htmlFor="referralID">Referral ID</label>
                  <div className="d-flex">
                    <input
                      type="text"
                      id="referralID"
                      name="referralID"
                      // value={user?.myReferralCode}
                      value={user?.email ? user?.myReferralCode : 'Verify email to view'}
                      className="form-control bg-transparent  rounded-0 rounded-start"
                      disabled
                    />
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(
                          user?.myReferralCode,
                          "My Referral Code"
                        )
                      }
                      className="border bg-success rounded-0 rounded-end"
                    >
                      <FontAwesomeIcon icon={faCopy} className="text-white" />
                    </button>
                  </div>
                </div>

                <div className="mb-2">
                  <label htmlFor="referralID">Affiliate Link</label>
                  <div className="d-flex">
                    <input
                      type="text"
                      id="referralID"
                      name="referralID"
                      value={emailVerify === true ? window.location.origin + "/" + user?.myReferralCode : 'Verify email to view'}
                      // {  window.location.origin + "/" + user?.myReferralCode }
                      className="form-control bg-transparent  rounded-0 rounded-start"
                      disabled
                    />
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(
                          window.location.origin + "/" + user?.myReferralCode,
                          "Affiliate Link "
                        )
                      }
                      className="border bg-success rounded-0 rounded-end"
                    >
                      <FontAwesomeIcon icon={faCopy} className="text-white" />
                    </button>
                  </div>
                </div>

                <div className="mb-2 social-div">
                  <div>
                    <label className="">Share Affiliate Link</label>
                    <div className="d-flex gap-2 mt-1">
                      <TwitterShareButton
                        url={
                          window.location.origin + "/" + user?.myReferralCode
                        }
                        title={`Get 10% discount at dslcommerce.com when you use my code.`}
                      >
                        <TwitterIcon size={40} round={true} />
                      </TwitterShareButton>
                      <LinkedinShareButton
                        url={
                          window.location.origin + "/" + user?.myReferralCode
                        }
                        summary={``}
                        title={`Get 10% discount at dslcommerce.com when you use my code.`}
                      >
                        <LinkedinIcon size={40} round={true} />
                      </LinkedinShareButton>
                      <WhatsappShareButton
                        url={
                          window.location.origin + "/" + user?.myReferralCode
                        }
                        title={`Get 10% discount at dslcommerce.com when you use my code.`}
                      >
                        <WhatsappIcon size={40} round={true} />
                      </WhatsappShareButton>
                    </div>
                  </div>
                </div>
                <p className="text-start">
                  Share your affiliate code to earn 10% of our sales which comes
                  from you. Your friend enjoy another 10% too.
                </p>
              </div>
              <div className="col-12 col-md-6 text-center d-flex justify-content-start align-items-center ms-0 button-margin px-4">
                {/* <button
                  onClick={() => updateUserProfile()}
                  className="btn btn-success  me-2"
                  type="submit"
                  disabled={
                    user?.email && emailVerify && email1 === user?.email
                      ? true
                      : false
                  }
                >
                  Update
                </button> */}
                <button
                  onClick={() => navigate(-1)}
                  className="btn btn-success  me-2"
                >
                  Cancel
                </button>
                {/* {console.log(
                  user?.email,
                  emailVerify,
                  email1 === user?.email,
                  "Checking if update button should be disabled"
                )} */}
                {/* <Link to={"/"}>
                  <button className="btn btn-danger me-2">Cancel</button>
                </Link> */}
                <button
                  className="btn btn-warning text-light mx-2"
                  type="button"
                  onClick={LogOut}
                >
                  Logout
                </button>
              </div>
              {/* <div className='col-4 text-center '>

              
            </div>
            <div className='col-4 text-center'>
             
            </div> */}
            </div>
          </div>
        </div>
      </div>

      <ProfileEmailVerify
        userRefetch={userRefetch}
        updateProfile={updateProfile}
        handleVerifyEmail={handleVerifyEmail}
        minutes={minutes}
        seconds={seconds}
        open={openEmail}
        setOpenEmail={setOpenEmail}
        otpVerify={otpVerify}
        setError={setError}
        otpCode={otpCode}
        setOtpCode={setOtpCode}
      />
    </>
  );
};

export default Profile;
