import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { toast } from "react-hot-toast";
import PhoneInput from "react-phone-number-input";
import { useTimer } from "react-timer-hook";
import swal from "sweetalert";
import { KycContext } from "../../../contexts/KycContext";
import MobileVerifyModal from "../../../pages/Profile/MobileVerifyModal";
import "./KycMobile.css";

const KycMobile = ({ expiryTimestamp }) => {
  const [otpCode, setOtpCode] = useState("");
  const [openMobile, setOpenMobile] = useState(false);
  const [otpVerify, setOtpVerify] = useState();
  const [isError, setError] = useState(false);
  const [mobile, setMobile] = useState("");
  console.log(mobile, "This is number");
  const [disableAfterActivationMobile, setDisableAfterActivationMobile] =
    useState(false);
  const [disableAfterActivation, setDisableAfterActivation] = useState(false);
  // const [mobileNoVerify, setmobileNoVerify] = useState(false);
  const {
    kycUser,
    setmobileNoVerify,
    mobileNoVerify,
    setRefetch,
    refetch,
    setisVerifiedProfile,
  } = useContext(KycContext);

  console.log(kycUser);

  useEffect(() => {
    if (kycUser && kycUser.mobileVerified) {
      setMobile(kycUser?.mobile);
      setOtpVerify(true);
    }
  }, [kycUser]);

  const { seconds, minutes, restart } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });

  const restarting = (sec) => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + sec);
    restart(time);
  };

  // const handleVerifyMobileOTP = async (otpCode) => {
  //   console.log("handleVerifyMobileOTP", mobile, otpCode);

  //   await axios
  //     .post(`https://backend.dslcommerce.com/api/number/otp`, {
  //       phone: mobile,
  //       otp: otpCode,
  //     })

  //     .then((res) => {
  //       console.log(res);
  //       if (res.status === 200) {
  //         setmobileNoVerify(true);
  //         setOtpVerify(res.data.message);
  //         setRefetch(!refetch);
  //         swal({
  //           text: res.data.message,
  //           icon: "success",
  //           button: "OK!",
  //           className: "modal_class_success",
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       console.dir(err);
  //       setOtpVerify(err.response.data.message);
  //     });
  // };

  const handleVerifyMobile = async (e) => {
    // console.log("handleVerifyMobile");
    setDisableAfterActivationMobile(true);
    // console.log("mobileNo" , value);
    if (mobile.length > 0) {
      console.log(mobile, "Mobile number");
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
          // console.log("setopenMobile");
          setOpenMobile(true);
        })
        .catch((err) => {
          // console.log(err.response.data.message);
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
          // console.log("finally");
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

  const handleUpdateUser = async () => {
    const data = {
      mobile: mobile,
      otp: otpCode,
    };

    // console.log(data);

    await axios
      .put(
        `https://backend.dslcommerce.com/api/user-panel/user/update/${kycUser?.walletAddress}`,
        data
      )
      .then((res) => {
        // console.log(res, "inside the update");
        if (res.status === 200) {
          setisVerifiedProfile(!refetch);
          setRefetch(!refetch);
          swal({
            text: "Successfully updated your mobile .",
            icon: "success",
            button: "OK!",
            className: "modal_class_success",
          });
        }
      })
      .catch((err) => {
        // console.log(err, "inside the update erro");
        console.dirxml(err);
        swal({
          title: "Attention",
          text: `${err.response.data.message}`,
          icon: "warning",
          button: "OK!",
          className: "modal_class_success",
        });
      });
  };

  return (
    <div>
      <Form className="default-width-container">
        <Form.Group className="mb-3 customStyle" controlId="formBasicEmail">
          <Form.Label>
            mobile number <span>★</span>{" "}
          </Form.Label>
          <div className="d-flex kyc-phone-number-input-container">
            <PhoneInput
              international
              defaultCountry="SG"
              countryCallingCodeEditable={true}
              className="form-control"
              type="text"
              onChange={setMobile}
              value={mobile}
              style={{ border: "none" }}
              // disabled={user.mobileNo ? true : false}
              required
              inputProps={{
                name: "phone",
                required: true,
                autoFocus: true,
              }}
            />
            <Button
              type="button"
              onClick={handleVerifyMobile}
              disabled={
                mobile?.length === 0 ||
                disableAfterActivationMobile ||
                (otpVerify === true && mobile === kycUser.mobile)
                  ? true
                  : false
              }
              // (mobile?.length === 0 || disableAfterActivationMobile) &&
              className={`kyc-mobile-verify-button text-white
                ${mobile !== undefined ? "btn-primary" : "btn-secondary"}`}
              style={{
                borderBottomLeftRadius: "0px",
                borderTopLeftRadius: "0px",
              }}
            >
              {kycUser?.mobile == mobile ? "Verified" : "Verify"}
            </Button>
          </div>
          {/* {!mobileNoVerify ? (
            <Button className="mt-4 text-uppercase" variant="primary" disabled>
              {" "}
              Submit
            </Button>
          ) : (
            <Button
              onClick={handleUpdateUser}
              className="mt-4 text-uppercase"
              variant="primary"
              disabled={mobileNoVerify ? true : false}
            >
              {" "}
              Submit
            </Button>
          )} */}
        </Form.Group>
      </Form>
      {/* <MobileVerifyModal
        handleVerifyMobile={handleVerifyMobile}
        handleVerifyOTP={handleVerifyMobileOTP}
        minutes={minutes}
        seconds={seconds}
        open={openMobile}
        setOpenMobile={setOpenMobile}
        otpVerify={otpVerify}
        otpCode={otpCode}
        setOtpCode={setOtpCode}
        setError={setError}
        mobile={setMobile}
        setOtpVerify={setOtpVerify}
        setDisableAfterActivationMobile={setDisableAfterActivationMobile}
      /> */}

      <MobileVerifyModal
        handleUpdateUser={handleUpdateUser}
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
  );
};

export default KycMobile;
