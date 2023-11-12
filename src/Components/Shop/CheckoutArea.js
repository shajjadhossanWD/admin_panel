import React, { useContext, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, useParams } from "react-router-dom";
import { DSLCommerceContext } from "../../contexts/DSLCommerceContext";
import { CartContext } from "../../contexts/cart-context";
import swal from "sweetalert";
import { ImCross } from "react-icons/im";
import { GiCheckMark } from "react-icons/gi";
import { useTimer } from "react-timer-hook";
import EmailVerifyModal from "../../pages/Profile/EmailVerifyModal";
import MobileVerifyModal from "../../pages/Profile/MobileVerifyModal";
import PhoneInput from "react-phone-number-input";
import CryptoMethod from "./PaymentMethod/CryptoMethod";
import PayNowMethod from "./PaymentMethod/PayNowMethod";
import Select from "react-select";
import { Typography } from "@mui/material";
import { useEffect } from "react";
import { BigNumber, ethers } from "ethers";
import CheckoutAreaEmailVerifyModal from "./CheckoutAreaEmailVerifyModal";
import { toast } from "react-hot-toast";

const selectOptions = [
  {
    value: "bnb",
    label: "BNB",
    image: "/bnb.png",
  },
  {
    value: "usdsc",
    label: "USDSC",
    image: "https://i.ibb.co/p1Vfjp0/usdsc.png",
  },
  {
    value: "dsl",
    label: "DSL",
    image: "/dsl.jpg",
  },
  {
    value: "s39",
    label: "S39",
    image: "/s39.jpeg",
  },
  {
    value: "finquest",
    label: "FINQUEST",
    image: "/FINQUEST.jpeg",
  },
];

function CheckoutArea({ expiryTimestamp }) {
  const { totalPrice } = useParams();
  // console.log(totalPrice)
  const {
    setRequestLoading,
    user,
    signBuyFunction,
    payAmount,
    openWalletModal,
    mintAddressTestnet,
    DSLtokenAddressTestnet,
    USDSCtokenAddressTestnet,
    S39tokenAddressTestnet,
    QuesttokenAddressTestnet,
    payByTestnetBNB,
    payByTestnetUSDSC,
    payByTestnetDSL,
    payByTestnetS39,
    payByTestnetQuest,
  } = useContext(DSLCommerceContext);
  const { carts, setCartRefetch } = useContext(CartContext);
  // console.log("user info", user);
  const [isAdmin, setIsAdmin] = useState(false);
  // console.log(isAdmin, "Isamidn")

  useEffect(() => {
    axios.get("https://backend.dslcommerce.com/api/admin/").then((res) => {
      // console.log(res.data)
      const admin = res.data.find((admin) => admin?.email === user?.email);
      // console.log(admin.email , "addminnnnn");
      if (admin.email === user?.email) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    });
  }, []);

  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postCode, setPostCode] = useState("");
  const [orderNotes, setOrderNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  // const [emailVerify, setEmailVerify] = useState(false);
  // const [email1, setEmail] = useState("");
  const [tokenId, setTokenId] = useState();
  // const [mobileNo, setmobileNo] = useState("");
  const [mobile, setMobile] = useState();
  const [mobileNoVerify, setmobileNoVerify] = useState(false);
  const [disableAfterActivation, setDisableAfterActivation] = useState(false);
  const [disableAfterActivationMobile, setDisableAfterActivationMobile] =
    useState(false);
  const [otpVerify, setOtpVerify] = useState();
  const [openEmail, setOpenEmail] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);
  const [otpCode, setOtpCode] = useState(false);
  const [isError, setError] = useState(false);
  const [cryptoPayment, setCryptoPayment] = useState("on");
  const [payNowPayment, setPayNowPayment] = useState(null);

  const [allUsers, setAllUsers] = useState([]);
  const [affiliateWalletAddress, setAffiliateWalletAddress] = useState("");
  const navigate = useNavigate();
  const [gotRefCode, setGotRefCode] = useState(false);
  const [token, setToken] = useState("bnb");
  const [bnbToken, setBnbToken] = useState();
  const [dslToken, setDslToken] = useState();
  const [s39Token, setS39Token] = useState();
  const [selectedOption, setSelectedOption] = useState({
    value: "bnb",
    label: "BNB",
    image: "/bnb.png",
  });

  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      color: "#000",
      backgroundColor: "#fff",
    }),

    singleValue: (provided, state) => {
      return { ...provided };
    },
  };

  // console.log("carts", carts);

  useEffect(() => {
    axios
      .get("https://dslegends.org/api/get-asset-price.php?asset=BNB", {
        headers: {
          Tokenkey: `f02063004b60270f693bfefcbd8a37e91273a4290fdcc9e4ea7b0f531a9d9e64`,
        },
      })
      .then((res) => {
        setBnbToken(res.data.message);
        // setBnbToken(282.130);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://dslegends.org/api/get-asset-price.php?asset=DSL", {
        headers: {
          Tokenkey: `f02063004b60270f693bfefcbd8a37e91273a4290fdcc9e4ea7b0f531a9d9e64`,
        },
      })
      .then((res) => {
        setDslToken(res.data.message);
        // setDslToken(0.0103);
        // console.log(res.data.message)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://dslegends.org/api/get-asset-price.php?asset=S39", {
        headers: {
          Tokenkey: `f02063004b60270f693bfefcbd8a37e91273a4290fdcc9e4ea7b0f531a9d9e64`,
        },
      })
      .then((res) => {
        setS39Token(res.data.message);
        // setS39Token(0.3843);
        // console.log(res.data.message)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

  // const handleVerifyOTP = async (otpCode) => {
  //   await axios
  //     .post(`https://backend.dslcommerce.com/api/email/otp/${email1}`, {
  //       otp: otpCode,
  //     })

  //     .then((res) => {
  //       if (res.status === 200) {
  //         setOtpVerify(res.data.message);
  //         setEmailVerify(true);
  //         swal({
  //           text: res.data.message,
  //           icon: "success",
  //           button: "OK!",
  //           className: "modal_class_success",
  //         });
  //       }
  //       setOpenEmail(false);
  //     })
  //     .catch((err) => {
  //       // console.log(err.response.data.message);
  //       setOtpVerify(err.response.data.message);
  //     });
  // };

  const handleVerifyMobileOTP = async (otpCode) => {
    // console.log("handleVerifyMobileOTP", otpCode);

    await axios
      .post(`https://backend.dslcommerce.com/api/number/otp`, {
        phone: mobile,
        otp: otpCode,
      })

      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          console.log(res.data.message);
          setmobileNoVerify(true);
          setOpenMobile(false);
          setOtpVerify(res.data.message);
          swal({
            text: res.data.message,
            icon: "success",
            button: "OK!",
            className: "modal_class_success",
          });
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setOtpVerify(err.response.data.message);
      });
  };

  const handleVerifyMobile = async (e) => {
    // console.log("handleVerifyMobile");
    setDisableAfterActivationMobile(true);
    // console.log("mobileNo" , value);
    if (mobile.length > 0) {
      // setLoading(true);
      // setEmailVerify(true);
      await axios
        .post("https://backend.dslcommerce.com/api/number/", {
          phone: mobile,
        })
        .then((res) => {
          // console.log("res");
          // console.log(res);

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

            setOtpVerify(res.data.otp);

            setTimeout(() => {
              setDisableAfterActivation(false);
            }, 120000);
          }
          console.log("setOpenMobile");
          setOpenMobile(true);
        })
        .catch((err) => {
          console.log(err);
          setOpenMobile(false);
          swal({
            title: "Attention",
            text: err.response.data.message,
            icon: "warning",
            button: "OK!",
            className: "modal_class_success",
          });
        })
        .finally(() => {
          console.log("finally");
          // setLoading(false);
        });
    }
  };

  // const handleVerifyEmail = async (e) => {
  //   // check if email is valid
  //   setDisableAfterActivation(true);
  //   if (email1.length > 0 && email1.includes("@" && ".")) {
  //     // setLoading(true);
  //     setEmailVerify(true);
  //     await axios
  //       .post("https://backend.dslcommerce.com/api/users/email", {
  //         email: email1,
  //       })
  //       .then((res) => {
  //         if (res.status === 200) {
  //           // alert(res.data.message);
  //           // setSendMail(res.data.email)
  //           restarting(180);
  //           swal({
  //             text: res.data.message,
  //             icon: "success",
  //             button: "OK!",
  //             className: "modal_class_success",
  //           });
  //           console.log("emtiaz", res.data);
  //           setOtpVerify(res.data.otp);

  //           setTimeout(() => {
  //             setDisableAfterActivation(false);
  //           }, 120000);
  //         }
  //         setOpenEmail(true);
  //       })
  //       .catch((err) => {
  //         // alert(err.response.data.message);
  //         setEmailVerify(false);
  //         swal({
  //           title: "Attention",
  //           text: err.response.data.message,
  //           icon: "warning",
  //           button: "OK!",
  //           className: "modal_class_success",
  //         });
  //       })
  //       .finally(() => {
  //         // setLoading(false);
  //       });
  //   } else {
  //     swal({
  //       title: "Attention",
  //       text: "Please enter a valid email address",
  //       icon: "warning",
  //       button: "OK!",
  //       className: "modal_class_success",
  //     });
  //   }
  // };

  // minting part

  // Referal Code Discount
  const discountReferal = (10 / 100) * totalPrice;
  const disRefTwoDec = discountReferal.toFixed(2);

  // Calculation
  let totalUsd;

  if (!gotRefCode) {
    totalUsd = totalPrice;
  } else {
    totalUsd = totalPrice - disRefTwoDec;
  }

  const usd = totalUsd;

  // BNB Price
  const bnb = usd / (bnbToken ? bnbToken : 314.8100000000);
  const bnbTwoDec = bnb.toFixed(4);

  // DSL Price
  const dsl = usd / (dslToken ? dslToken : 0.0108856926);
  const dslTwoDec = dsl.toFixed(2);

  // USDSC Price
  const usdsc = parseFloat(usd).toFixed(2);

  // S39 Price
  const s39 = usd / (s39Token ? s39Token : 0.51);
  const s39TwoDec = s39.toFixed(2);

  // FINQUEST Price
  const finquest = usd / 0.0005;
  const finquestTwoDec = finquest.toFixed(2);

  // USD Discount
  const discountUsd = (30 / 100) * usd;
  const disUsdTwoDec = discountUsd.toFixed(2);

  // Calculation without discounts

  // BNB Price
  const bnb01 = totalPrice / bnbToken;
  const bnbTwoDec01 = bnb01.toFixed(4);

  // DSL Price
  const dsl01 = totalPrice / dslToken;
  const dslTwoDec01 = dsl01.toFixed(2);

  // USDSC Price
  const usdsc01 = parseFloat(totalPrice).toFixed(2);

  // S39 Price
  const s3901 = totalPrice / s39Token;
  const s39TwoDec01 = s3901.toFixed(2);

  // FINQUEST Price
  const finquest01 = totalPrice / 0.0005;
  const finquestTwoDec01 = finquest01.toFixed(2);

  // Saved prices calculation
  const savedBNB = bnbTwoDec01 - bnbTwoDec;
  const savedDSL = dslTwoDec01 - dslTwoDec;
  const savedUSDSC = usdsc01 - usdsc;
  const savedS39 = s39TwoDec01 - s39TwoDec;
  const savedFINQ = finquestTwoDec01 - finquestTwoDec;

  const savedBNB4Digit = savedBNB.toFixed(4);
  const savedDSL4Digit = savedDSL.toFixed(4);
  const savedUSDSC4Digit = savedUSDSC.toFixed(4);
  const savedS394Digit = savedS39.toFixed(4);
  const savedFINQ4Digit = savedFINQ.toFixed(4);

  let newDate = new Date();
  let dd = String(newDate.getDate()).padStart(2, "0");
  let mm = String(newDate.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = newDate.getFullYear();
  let hh = newDate.getHours();
  let min = newDate.getMinutes();
  let ss = newDate.getSeconds();
  newDate = dd + "/" + mm + "/" + yyyy + "  " + hh + ":" + min + ":" + ss;
  // const nftId = random?.toString();

  const postDataAfterPayment = async (
    name,
    email,
    phone,
    country,
    address,
    city,
    postCode,
    orderNotes,
    walletAddress,
    orderItems,
    token,
    payAmount,
    tokenAddress,
    refAddress,
    payMethod,
    status,
    date
  ) => {
    const data = {
      NFTWebsite: "https://dslcommerce.net",
      name,
      email,
      phone,
      country,
      address,
      city,
      postCode,
      orderNotes,
      walletAddress,
      orderItems,
      token,
      payAmount,
      tokenAddress,
      refAddress,
      payMethod,
      status,
      date,
    };
    console.log(data);

    await axios
      .post("https://backend.dslcommerce.com/api/payment/", data, {})
      .then((res) => {
        if (res.status === 200) {
          console.log("Successfully data passed");
        }
      })
      .catch((err) => {
        swal({
          title: "Attention",
          text: err.response.data.message,
          icon: "warning",
          button: "OK!",
          className: "modal_class_success",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // console.log(affiliateWalletAddress);

  /// send full details to user
  const handleSubmit = async (urlByPayment, priceAmmount, orderID) => {
    // console.log("token", tokenId, TokeNID);
    // const NFTID = TokeNID;

    const transactionURL = urlByPayment;
    const id = orderID;
    const email = user?.email;
    const price = priceAmmount + " " + selectedOption.label;
    const orderItems = carts.map((cart) => cart.productName);
    const estimatedArrival = "10 Days";
    const contact = "Email: support@dslcommerce.com, Phone: +60149939183";


    await axios
      .post(
        "https://backend.dslcommerce.com/api/v1/mint/send-user",
        {
          transactionURL,
          price,
          orderItems,
          estimatedArrival,
          contact,
          email,
          id,
        },
        {}
      )
      .then((res) => {
        if (res.status === 200) {
          // console.log(res.data.message)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const subNo = (e) => {
    e.preventDefault();
  };


  // console.log(single);
  //===============//// MINTED NFT FUNCTION////===================//

  const paymentCrypto = async (
    priceByToken,
    tokenAddress,
    affiliateWalletAddress
  ) => {


    if (!user.email) {
      return swal({
        text: "Before payment please update your profile. We will send the details to you.",
        icon: "warning",
        button: true,
        dangerMode: true,
        className: "modal_class_success",
      }).then((willDelete) => {
        if (willDelete) {
          navigate(`/profile`);
        } else {
          console.log("ok");
        }
      });
    }
    // setIsClickedMint(true)

    // console.log('asad');
    if (!name || !country || !address || !city || !user?.email || !postCode || !orderNotes) {
      return swal({
        title: "Attention",
        text: "Please fill up billing details",
        icon: "warning",
        button: "OK",
        dangerMode: true,
        className: "modal_class_success",
      });
    }



    // else if (!mobileNoVerify) {
    //   swal({
    //     title: "Attention",
    //     text: "Please verify your mobile number",
    //     icon: "warning",
    //     button: "OK",
    //     dangerMode: true,
    //     className: "modal_class_success",
    //   });
    // }
    else {
      setRequestLoading(true);
      console.log(USDSCtokenAddressTestnet);

      // console.log("222222", priceByToken, tokenAddress, affiliateWalletAddress);

      const generateId = Math.floor(Math.random() * 1000000000000);
      const data = new FormData();
      data.append("id", generateId.toString());
      data.append("price", priceByToken);
      data.append("tokenAddress", tokenAddress);
      data.append("nonce", uuidv4());
      data.append("refAddress", affiliateWalletAddress);
      data.append("walletAddress", user.walletAddress);

      // ************************ Data *************************//
      const walletAddress = user?.walletAddress;
      const phone = mobile;
      const email = user?.email;
      const orderItems = carts;
      const status = "pending";
      const date = newDate;
      const refAddress = affiliateWalletAddress;
      const payMethod = "crypto";
      // ************************ Data *************************//

      await axios
        .post(
          "https://backend.dslcommerce.com/api/v1/mint/uri-json-nft",
          data,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem(
                "tokendslcommerce"
              )}`,
            },
          }
        )
        .then(async (res) => {
          console.log(res, "Order's primary res");
          let Obj = {};
          // console.log("111111123: ", data);
          // console.log(res.data.uri);
          if (res.status === 200) {
            const data1 = await signBuyFunction(
              generateId.toString(),
              ethers.utils.parseEther(priceByToken),
              tokenAddress,
              affiliateWalletAddress,
              res.data.uri
            );
            // console.log("11111112322222222222222222222299", data1);

            if (token === "bnb") {
              Obj = await payByTestnetBNB(data1);
            } else if (token === "usdsc") {
              Obj = await payByTestnetUSDSC(data1);
            } else if (token === "dsl") {
              Obj = await payByTestnetDSL(data1);
            } else if (token === "s39") {
              Obj = await payByTestnetS39(data1);
            } else if (token === "finquest") {
              Obj = await payByTestnetQuest(data1);
            }

            const oId = generateId.toString();
            const price = priceByToken + " " + selectedOption.label;

            // console.log("After Order Order ID Emtiaz ", oId, price);

            const data3 = {
              name: name,
              email: email,
              administerOrder: isAdmin,
              country: country,
              phone: mobile,
              address: address,
              walletAddress: user?.walletAddress,
              town: city,
              postCode: postCode,
              orderNote: orderNotes,
              orderItems: carts,
              orderId: oId,
              date: newDate,
              amount: price,
              paymentMethod: "crypto",
            };

            console.log("Data 3 bro", data3);

            //******************************* Order Record  ****************/
            const orderAmount = {
              amount: parseFloat(totalPrice),
            };
            // console.log(orderAmount, "Record amount eeeeeeeeeeeeee ");
            axios
              .post(
                "https://backend.dslcommerce.com/api/bill-record",
                orderAmount
              )
              .then((res) => console.log(res));

            // after confirm payment, items added to order list
            console.log("Data 3 bro", data3);
            axios
              .post("https://backend.dslcommerce.com/api/order", data3)
              .then((res) => console.log(res));

            // after confirm payment cart item deletion
            axios
              .delete(
                `https://backend.dslcommerce.com/api/cart/${user?.walletAddress}`,
                {
                  headers: {
                    authorization: `Bearer ${localStorage.getItem(
                      "tokendslcommerce"
                    )}`,
                  },
                }
              )
              .then((res) => {
                console.log("cart item deleted", res);
                setCartRefetch(true);
              });

            const data2 = {
              id: generateId.toString(),
              price: priceByToken,
              walletAddress: walletAddress,
              tokenAddress: tokenAddress,
              orderItems: orderItems,
              refAddress: refAddress,
            };
            // console.log("Emtiaz Emon Data", data2);
            data.append("mint_hash", Obj.mint_hash);
            setTokenId(Obj.ID);
            // console.log(data2);
            await axios
              .post(
                "https://backend.dslcommerce.com/api/v1/mint/save-nft",
                data2,
                {
                  // headers: {
                  //   'authorization': `Bearer ${localStorage.getItem('tokendslcommerce')}`
                  // }
                }
              )
              .then((res) => {
                if (res.status === 200) {
                  setRequestLoading(false);
                  const wrapper = document.createElement("div");
                  wrapper.innerHTML = `
              <a href=${Obj.mint_hash} target="_any" className="link_hash">${Obj.mint_hash}</a>
              <br/>
               `;
                  swal({
                    title: "Payment are completed",
                    content: wrapper,
                    icon: "success",
                    buttons: true,
                    className: "modal_class_success",
                  }).then((willDelete) => {
                    if (willDelete) {
                      // navigate(`/mintednft/${Obj.ID}/${mintAddressTestnet}`);
                      navigate(`/`);
                      swal({
                        title: "Success",
                        text: "Please Check your email for payment details",
                        icon: "success",
                        button: "OK!",
                        className: "modal_class_success",
                      });
                    } else {
                      console.log("good job");
                      swal({
                        title: "Success",
                        text: "Please Check your email for payment details",
                        icon: "success",
                        button: "OK!",
                        className: "modal_class_success",
                      });
                    }
                  });
                  postDataAfterPayment(
                    name,
                    email,
                    phone,
                    country,
                    address,
                    city,
                    postCode,
                    orderNotes,
                    walletAddress,
                    orderItems,
                    token,
                    payAmount,
                    tokenAddress,
                    refAddress,
                    payMethod,
                    status,
                    date
                  );
                  handleSubmit(
                    Obj.mint_hash,
                    priceByToken,
                    generateId.toString()
                  );
                }
              })
              .catch((err) => {
                console.log(err);
                setRequestLoading(false);
                const wrapper = document.createElement("div");
                wrapper.innerHTML = `<a href=${Obj.mint_hash} target="_any" className="link_hash text-primary">${Obj.mint_hash}</a> <br/> <p className="success text-light">Your payment has been successful but error in while saving data.</p>`;
                swal({
                  title: "Warning",
                  content: wrapper,
                  icon: "warning",
                  button: "OK",
                  className: "modal_class_success",
                });
              });
            // console.log(res.data.Img)
          }
        })
        .catch((err) => {
          console.log(err);
          setRequestLoading(false);
          if (err.code === 4001) {
            return swal({
              title: "Failed",
              text: "Payment Failed!",
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
    }
  };

  // Referal code discount
  useEffect(() => {
    if (localStorage.getItem("tokendslcommerce")) {
      axios.get("https://backend.dslcommerce.com/api/users/all").then((res) => {
        setAllUsers(res.data);
      });
    }
  }, []);
  // console.log(allUsers);
  const othersRefCodes = allUsers.filter(
    (i) => i?.myReferralCode !== user?.myReferralCode
  );

  const handleAffiliateCode = (e) => {
    console.log(e.target.value);
    const refCode = othersRefCodes.find(
      (i) => i?.myReferralCode === e.target.value
    );
    setAffiliateWalletAddress(refCode?.walletAddress);
    if (refCode?.myReferralCode === e.target.value) {
      setGotRefCode(true);
    } else {
      setGotRefCode(false);
    }
  };

  // console.log(gotRefCode);
  // Select options functionality
  const handleChoosePayment = (e) => {
    setSelectedOption(e);
    setToken(e.value);
  };
  // old one
  //paymnet amount by bnb,dsl,s39, usdsc,finquest
  //BNB payment
  // const bnb = totalPrice / bnbToken;
  // const bnbTwoDec = bnb.toFixed(5);

  //USDSC payment
  // const usdsc = totalPrice;

  // DSL Price
  // const dsl = totalPrice / dslToken;
  // const dslTwoDec = dsl.toFixed(4);

  // const discountDsl = dslTwoDec * 30 / 100;

  // const discountTotalDsl = dslTwoDec - discountDsl;
  // const DiscountdslTwoDec = discountTotalDsl.toFixed(4);

  // const savedAmount = dslTwoDec - DiscountdslTwoDec;
  // const savedUsdAmount = dslToken * savedAmount;

  // s39 Price
  // const s39 = totalPrice / s39Token;
  // const s39TwoDec = s39.toFixed(4);

  // finquest Price
  // const finquest = totalPrice / 0.0005;
  // const finquestTwoDec = finquest.toFixed(4);

  return (
    <section className="checkout-area ptb-50">
      <div className="container">
        {message !== "" && (
          <div
            className={`
        ${message === "Order successfully added"
              } ? alert alert-success : alert alert-danger 
      `}
            role="alert"
          >
            {message}
          </div>
        )}
        <form onSubmit={subNo}>
          <div className="row">
            <div className="col-lg-8 col-md-12">
              <div className="billing-details">
                <h3 className="title">Billing Details</h3>

                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>
                        Your Name <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Your Name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Email */}

                  {/* Phone */}
                  {/* <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label
                        htmlFor="Mobile"
                        className="text-dark d-flex pb-1 pt-2"
                      >
                        Phone
                      </label>
                      <div className="d-flex">
                       
                        <PhoneInput
                          international
                          defaultCountry="SG"
                          countryCallingCodeEditable={true}
                          className="form-control "
                          type="text"
                          onChange={setMobile}
                          value={mobile}
                          disabled={user.mobileNo ? true : false}
                          required
                          inputProps={{
                            name: "phone",
                            required: true,
                            autoFocus: true,
                          }}
                        />
                        {!user.mobileNo && (
                          <button
                            type="button"
                            onClick={handleVerifyMobile}
                            disabled={
                              mobile?.length === 0 ||
                                disableAfterActivationMobile
                                ? true
                                : false
                            }
                            style={{
                              backgroundColor: "#15407f",
                              color: "#fff",
                            }}
                            className={
                              (mobile?.length === 0 ||
                                disableAfterActivationMobile) &&
                              "border bg-secondary text-white"
                            }
                          >
                            {" "}
                            Verify
                          </button>
                        )}
                      </div>
                    </div>
                  </div> */}

                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>
                        Country <span className="required">*</span>
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        placeholder="Country"
                        required
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>
                        Address <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Address"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>
                        Town / City <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Town / City"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>
                        Postcode <span className="required">*</span>
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Postcode"
                        required
                        value={postCode}
                        onChange={(e) => setPostCode(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>
                        Order Note <span className="required">*</span>
                      </label>
                      <textarea
                        value={orderNotes}
                        onChange={(e) => setOrderNotes(e.target.value)}
                        name="notes"
                        id="notes"
                        cols="30"
                        rows="5"
                        placeholder="Order Notes"
                        required
                        className="form-control"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-12">
              <div className="order-details">
                <div className="payment-box">
                  <h3 className="title">Pay by Crypto</h3>
                  {/* 
                  <div className="payment-method"> */}
                  {/* <p>
                      <input
                        type="radio"
                        id="cash-on-delivery"
                        name="radio-group"
                        checked
                      />
                      <label htmlFor="cash-on-delivery">Cash on Delivery</label>
                    </p> */}
                  {/* <p>
                      <input
                        type="radio"
                        id="pay-by-crypto"
                        name="radio-group"
                        defaultChecked={true}
                        onChange={(e) => {
                          setCryptoPayment(e.target.value)
                          setPayNowPayment(null)
                        }}
                      />
                      <label htmlFor="pay-by-crypto">Pay by Crypto</label>
                    </p> */}
                  {/* <p>
                      <input
                        type="radio"
                        id="pay-by-paynow"
                        name="radio-group"
                        onChange={(e) => {
                          setCryptoPayment(null)
                          // console.log(e.target.value)
                          setPayNowPayment(e.target.value)
                        }}
                      />
                      <label htmlFor="pay-by-paynow">Pay by PayNow</label>
                    </p> */}
                  {/* </div> */}
                  {/* Crypto payment method */}

                  <div className="mt-3 border p-2">
                    <span className=" pt-1 text-primary mb-2 fontArial fontExtand">
                      Choose how you want to pay:
                    </span>

                    <div className="widthDetailsInput mt-1">
                      <Select
                        isSearchable={false}
                        value={selectedOption}
                        onChange={handleChoosePayment}
                        options={selectOptions}
                        styles={customStyles}
                        formatOptionLabel={(option) => (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "5px",
                            }}
                          >
                            <img
                              src={option.image}
                              style={{
                                width: "20px",
                                height: "20px",
                                borderRadius: "100px",
                              }}
                              alt=""
                            />
                            <span>{option.label}</span>
                          </div>
                        )}
                      />
                    </div>

                    <Typography
                      className="pt-2 pb-3"
                      variant="subtitle2"
                      gutterBottom
                      component="div"
                    >
                      ({" "}
                      <span className="spanDiscount ">
                        30% discount if paid with DSL tokens
                      </span>
                      )
                    </Typography>
                    {/* {token === "dsl" && <p style={{ margin: '0' }}>You saved {savedUsdAmount} USD</p>} */}
                    {/* Saved bucks */}
                    {gotRefCode && (
                      <div style={{ textAlign: "start" }}>
                        {token === "bnb" && (
                          <Typography
                            className="pt-1 pb-1  text-gradient"
                            variant="subtitle2"
                            gutterBottom
                            component="div"
                          >
                            <span className="spanDiscount ">
                              You saved {savedBNB4Digit} BNB
                            </span>
                          </Typography>
                        )}
                        {token === "usdsc" && (
                          <Typography
                            className="pt-1 pb-1  text-gradient"
                            variant="subtitle2"
                            gutterBottom
                            component="div"
                          >
                            <span className="spanDiscount ">
                              You saved {savedUSDSC4Digit} USDSC
                            </span>
                          </Typography>
                        )}
                        {token === "dsl" && (
                          <Typography
                            className="pt-1 pb-1  text-gradient"
                            variant="subtitle2"
                            gutterBottom
                            component="div"
                          >
                            <span className="spanDiscount ">
                              You saved {savedDSL4Digit} DSL
                            </span>
                          </Typography>
                        )}
                        {token === "s39" && (
                          <Typography
                            className="pt-1 pb-1  text-gradient"
                            variant="subtitle2"
                            gutterBottom
                            component="div"
                          >
                            <span className="spanDiscount ">
                              You saved {savedS394Digit} S39
                            </span>
                          </Typography>
                        )}
                        {token === "finquest" && (
                          <Typography
                            className="pt-1 pb-1  text-gradient"
                            variant="subtitle2"
                            gutterBottom
                            component="div"
                          >
                            <span className="spanDiscount ">
                              You saved {savedFINQ4Digit} FINQUEST
                            </span>
                          </Typography>
                        )}
                      </div>
                    )}

                    <Typography
                      className="pt-1 pb-1  text-gradient"
                      variant="subtitle2"
                      gutterBottom
                      component="div"
                    >
                      <span className="spanDiscount ">
                        Enjoy 10% if you have affiliate code.
                      </span>
                    </Typography>

                    <div>
                      <p>Affiliate Code : </p>
                      <div className="d-flex" style={{ width: "100%" }}>
                        <input
                          type="text"
                          onChange={handleAffiliateCode}
                          // value={user?.affiliateCode ? user?.affiliateCode : affiliateCode}
                          // disabled={user.affiliateCode ? true : false}
                          className="form-control "
                          style={{ borderRadius: "0.25rem 0px 0px 0.25rem" }}
                        />
                        {!gotRefCode ? (
                          <>
                            <button
                              disabled
                              style={{
                                borderRadius: "0px 0.25rem 0.25rem 0px",
                              }}
                              className="bg-danger d-flex justify-content-center align-items-center text-white border-0"
                            >
                              <ImCross />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              disabled
                              style={{
                                borderRadius: "0.25rem 0px 0px 0.25rem",
                              }}
                              className="bg-success d-flex justify-content-center align-items-center text-white border-0"
                            >
                              <GiCheckMark />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      color: "black",
                      marginTop: "1rem",
                      textAlign: "start",
                    }}
                  >
                    {token === "bnb" && (
                      <p style={{ margin: "0" }}>
                        You need to pay {bnbTwoDec} BNB
                      </p>
                    )}
                    {token === "usdsc" && (
                      <p style={{ margin: "0" }}>
                        You need to pay {usdsc} USDSC
                      </p>
                    )}
                    {token === "dsl" && (
                      <p style={{ margin: "0" }}>
                        You need to pay {dslTwoDec} DSL
                      </p>
                    )}
                    {token === "s39" && (
                      <p style={{ margin: "0" }}>
                        You need to pay {s39TwoDec} S39
                      </p>
                    )}
                    {token === "finquest" && (
                      <p style={{ margin: "0" }}>
                        You need to pay {finquestTwoDec} FINQUEST
                      </p>
                    )}
                  </div>
                  <div className="dslDiscountForPayment">
                    {token === "dsl" && (
                      <p
                        style={{ margin: "0", color: "green" }}
                        className="fw-bold"
                      >
                        YOU GET DISCOUNT OF : USD {disUsdTwoDec}
                      </p>
                    )}
                  </div>
                  <div
                    className="d-flex"
                    style={{ alignItems: "flex-end", justifyContent: "start" }}
                  >
                    {!user.walletAddress ||
                      user.walletAddress === "undefined" ? (
                      <button
                        type="submit"
                        className="default-btn"
                        style={{ cursor: "pointer" }}
                        onClick={openWalletModal}
                      >
                        <i className="fas fa-wallet me-1"></i>{" "}
                        <span>Connect Wallet</span>
                      </button>
                    ) : (
                      <Typography>
                        {token === "bnb" && (
                          <button
                            type="submit"
                            className="default-btn"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              paymentCrypto(
                                bnbTwoDec,
                                "0x0000000000000000000000000000000000000000",
                                affiliateWalletAddress
                              )
                            }
                            href="#!"
                          >
                            Place Order FOR {bnbTwoDec} BNB
                          </button>
                        )}
                        {token === "usdsc" && (
                          <button
                            type="submit"
                            className="default-btn"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              paymentCrypto(
                                usdsc,
                                USDSCtokenAddressTestnet,
                                affiliateWalletAddress
                              )
                            }
                            href="#!"
                          >
                            Place Order FOR {usdsc} USDSC
                          </button>
                        )}
                        {token === "dsl" && (
                          <button
                            type="submit"
                            className="default-btn"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              paymentCrypto(
                                dslTwoDec,
                                DSLtokenAddressTestnet,
                                affiliateWalletAddress
                              )
                            }
                            href="#!"
                          >
                            Place Order FOR {dslTwoDec} DSL
                          </button>
                        )}
                        {token === "s39" && (
                          <button
                            type="submit"
                            className="default-btn"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              paymentCrypto(
                                s39TwoDec,
                                S39tokenAddressTestnet,
                                affiliateWalletAddress
                              )
                            }
                            href="#!"
                          >
                            Place Order FOR {s39TwoDec} S39
                          </button>
                        )}
                        {token === "finquest" && (
                          <button
                            type="submit"
                            className="default-btn"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              paymentCrypto(
                                finquestTwoDec,
                                QuesttokenAddressTestnet,
                                affiliateWalletAddress
                              )
                            }
                            href="#!"
                          >
                            Place Order FOR {finquestTwoDec} FINQUEST
                          </button>
                        )}
                      </Typography>
                    )}
                  </div>
                  {/* PayNow payment method */}
                  {/* {
                    payNowPayment &&
                    <PayNowMethod totalPrice={totalPrice} />
                  } */}
                  {/* <button
                    type="submit"
                    className="default-btn"
                    style={{ cursor: "pointer" }}
                  >
                    Place Order
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* <CheckoutAreaEmailVerifyModal
          handleVerifyEmail={handleVerifyEmail}
          minutes={minutes}
          seconds={seconds}
          open={openEmail}
          setOpenEmail={setOpenEmail}
          otpVerify={otpVerify}
          setError={setError}
          otpCode={otpCode}
          setOtpCode={setOtpCode}
        /> */}

        <MobileVerifyModal
          otpCode={otpCode}
          setOtpCode={setOtpCode}
          handleVerifyMobile={handleVerifyMobile}
          // handleVerifyOTP={handleVerifyMobileOTP}
          minutes={minutes}
          seconds={seconds}
          open={openMobile}
          setOpenMobile={setOpenMobile}
          otpVerify={otpVerify}
          setError={setError}
          mobile={mobile}
          setOtpVerify={setOtpVerify}
          setmobileNoVerify={setmobileNoVerify}
          setDisableAfterActivationMobile={setDisableAfterActivationMobile}
        />
      </div>
    </section>
  );
}

export default CheckoutArea;
