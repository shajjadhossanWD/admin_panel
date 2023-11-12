import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import swal from "sweetalert";
import Button from "react-bootstrap/Button";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { Dialog } from "@mui/material";

const style = {
  bgcolor: "#1a1a25",
  boxShadow: 24,
  color: "white",
  paddingInline: "20px",
  position: "relative",
  paddingBlock: "16px",
};

export default function MobileVerifyModal({
  open,
  setOpenMobile,
  otpVerify,
  setError,
  handleVerifyMobile,
  minutes,
  seconds,
  mobile,
  handleVerifyOTP,
  setOtpVerify,
  setDisableAfterActivationMobile,
  otpCode,
  setOtpCode,
  setmobileNoVerify,
  handleUpdateUser,
}) {
  const [isOtpError, setOtpError] = useState(false);

  const handleClose = () => {
    setOpenMobile(false);
    setOtpError(false);
  };

  // Re-send OTP states
  const [forEnable, setForEnable] = useState(false);
  const [againEnable, setAgainEnable] = useState(true);
  const [count, setCount] = useState(2);
  const [disabled, setDisabled] = useState(false);
  const [otpVerified, setotpVerified] = useState();

  const hendelSubmit = async (e) => {
    setCount(count - 1);
    e.preventDefault();

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
          handleUpdateUser();

          // console.log(data);

          // swal({
          //   text: res.data.message,
          //   icon: "success",
          //   button: "OK!",
          //   className: "modal_class_success",
          // });
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setOtpVerify(err.response.data.message);

        if (count > 0) {
          console.log(count);
          let content2 = document.createElement("p");
          content2.innerHTML =
            'You have entered wrong OTP. Please try again. You have another <br/><span style="color: #0d6efd;">0' +
            count +
            "</span> more tries .";
          swal({
            content: content2,
            icon: "warning",
            button: "OK!",
            className: "modal_class_success",
          });

          setDisableAfterActivationMobile(false);
          // setCount(2);
          setOtpVerify("");
          // setDisabled(false);
          setOtpError(false);
        } else {
          setDisabled(true);
          swal({
            text: "You have entered wrong OTP, And you have no more tries left. You can request another OTP again",
            icon: "warning",
            button: "OK!",
            className: "modal_class_success",
          });
        }

        setOtpVerify("");
        setError("Mobile OTP Code not matched");
        setOtpError(true);
      });
  };

  const verifyAlert = () => {
    swal({
      text: "Please verify your mobile number before closing!",
      icon: "warning",
      button: "OK!",
      className: "modal_class_success",
    });
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={otpVerify == otpCode ? handleClose : ""}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="text-center"
        maxWidth="xs"
        fullWidth
      >
        <Box sx={style} id="">
          <button
            style={{
              color: "white",
              backgroundColor: "transparent",
              border: "none",
              textAlign: "right",
              position: "absolute",
              top: "6px",
              right: "6px",
            }}
            onClick={otpVerify == otpCode ? handleClose : verifyAlert}
          >
            <CloseIcon className="iconClose" />
          </button>
          <Typography
            id="modal-modal-title text-light"
            className="text-light pt-1"
            variant="h6"
            component="h2"
            align="center"
          >
            Verify Mobile
          </Typography>
          <Typography
            id="modal-modal-description text-light"
            sx={{ mt: 2, mb: "14px" }}
          >
            Check your mobile for OTP
          </Typography>
          <form className="d-flex input-group mt-2 mb-2">
            <input
              type="number"
              className="form-control"
              placeholder="OTP code"
              aria-label="OTP code !!"
              aria-describedby="button-addon2"
              onChange={(e) => setOtpCode(e.target.value)}
            />
            <button
              disabled={disabled ? true : false}
              className={`btn btn-outline-secondary ${
                otpCode !== "" ? "bg-danger" : "bg-secondary"
              } text-light`}
              onClick={hendelSubmit}
              type="submit"
              id="button-addon2"
            >
              Verify
            </button>
          </form>

          {isOtpError ? (
            <p style={{ color: "red" }}>You have entered wrong OTP</p>
          ) : (
            ""
          )}
          <div
            className="d-flex"
            style={{ justifyContent: "center", marginTop: "14px" }}
          >
            <button
              disabled={minutes == 0 && seconds == 0 ? false : true}
              type="submit"
              onClick={handleVerifyMobile}
              className={`submit banner-button2 font14 text-decoration-none rounded text-white p-2 ${
                minutes == 0 && seconds == 0 ? "bg-primary" : "bg-secondary"
              }`}
              id="font14"
            >
              Resend OTP (<span>{minutes}</span>:
              <span>{seconds < 10 ? `0${seconds}` : seconds}</span>)
            </button>
          </div>
        </Box>
      </Dialog>
    </div>
  );
}
