import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import swal from "sweetalert";
import Button from "react-bootstrap/Button";
import CloseIcon from "@mui/icons-material/Close";
import { Dialog } from "@mui/material";

const style = {
  bgcolor: "#1a1a25",
  boxShadow: 24,
  color: "white",
  paddingInline: "20px",
  position: "relative",
  paddingBlock: "16px",
};

export default function ProfileEmailVerify({
  open,
  userRefetch,
  setOpenEmail,
  updateProfile,
  otpVerify,
  setError,
  handleVerifyEmail,
  minutes,
  seconds,
  otpCode,
  setOtpCode,
}) {
  const [isOtpError, setOtpError] = useState(false);

  const handleClose = () => setOpenEmail(false);

  // Re-send OTP states
  const [forEnable, setForEnable] = useState(false);
  const [againEnable, setAgainEnable] = useState(true);
  const [count, setCount] = useState(2);
  const [disabled, setDisabled] = useState(false);

  const hendelSubmit = (e) => {
    setCount(count - 1);
    e.preventDefault();
    if (otpVerify != otpCode) {
      return swal({
        title: "Warning",
        text: "Before updating please verify your email!",
        icon: "warning",
        button: "OK",
        dangerMode: true,
        className: "modal_class_success",
      });
    } else if (otpVerify == otpCode) {
      swal({
        text: "Email Verified and updated your profile.",
        icon: "success",
        button: "OK!",
        className: "modal_class_success",
      });
      updateProfile();
      handleClose();
      setOtpError(false);
      setError(false);
      handleClose(false);
      return;
    }
    if (count > 0) {
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
    } else {
      setDisabled(true);
      swal({
        text: "You have entered wrong OTP, And you have no more tries left. You can request another OTP again",
        icon: "warning",
        button: "OK!",
        className: "modal_class_success",
      });
    }
    setError("Email OTP Code not matched");
    setOtpError(true);
  };

  const verifyAlert = () => {
    swal({
      text: "Please verify your email address before closing!",
      icon: "warning",
      button: "OK!",
      className: "modal_class_success",
    });
  };

  return (
    <div>
      <Dialog
        open={open}
        P
        onClose={otpVerify == otpCode && handleClose}
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
            align="left"
          >
            Verify Email
          </Typography>
          <Typography
            id="modal-modal-description text-light"
            sx={{ mt: 2 }}
            style={{ textAlign: "left" }}
          >
            Check your email for OTP
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
              className={`btn btn-outline-secondary ${otpCode !== "" || otpCode !== undefined
                  ? "bg-danger"
                  : "bg-secondary"
                } text-light`}
              onClick={hendelSubmit}
              type="submit"
              id="button-addon2"
            >
              Verify and update
            </button>
          </form>

          {isOtpError ? (
            <p style={{ color: "red" }}>You have entered wrong OTP</p>
          ) : (
            ""
          )}

          <div
            className="d-flex"
            style={{ justifyContent: "center", marginTop: "18px" }}
          >
            <button
              disabled={minutes == 0 && seconds == 0 ? false : true}
              type="submit"
              onClick={handleVerifyEmail}
              className={`submit banner-button2 font14 text-decoration-none text-white p-2 rounded ${minutes == 0 && seconds == 0 ? "bg-primary" : "bg-secondary"
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
