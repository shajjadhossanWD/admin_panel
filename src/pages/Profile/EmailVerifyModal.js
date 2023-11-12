import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useContext, useState } from "react";
import swal from "sweetalert";
import Button from "react-bootstrap/Button";
import CloseIcon from "@mui/icons-material/Close";
import { Dialog, IconButton } from "@mui/material";
import { KycContext } from "../../contexts/KycContext";
import axios from "axios";

const style = {
  bgcolor: "#1a1a25",
  boxShadow: 24,
  color: "white",
  paddingInline: "20px",
  position: "relative",
  paddingBlock: "16px",
};

export default function EmailVerifyModal({
  open,
  userRefetch,
  handleVerifyOTP,
  setOpenEmail,
  updateProfile,
  otpVerify,
  setError,
  handleVerifyEmail,
  minutes,
  setOtpVerify,
  seconds,
  otpCode,
  setOtpCode,
  email,
  setDisableAfterActivation,
  handleUpdateUser,
}) {
  const [isOtpError, setOtpError] = useState(false);

  const handleClose = () => setOpenEmail(false);

  // Re-send OTP states
  const [forEnable, setForEnable] = useState(false);
  const [againEnable, setAgainEnable] = useState(true);
  const [count, setCount] = useState(2);
  const [disabled, setDisabled] = useState(false);
  const {
    kycUser,
    emailVerified,
    setEmailVerified,
    setRefetch,
    refetch,
    setisVerifiedProfile,
    isVerifiedProfile,
  } = useContext(KycContext);

  const hendelSubmit = async (e) => {
    setCount(count - 1);
    e.preventDefault();

    await axios
      .post(`https://backend.dslcommerce.com/api/email/otp/${email}`, {
        otp: otpCode,
      })

      .then((res) => {
        if (res.status === 200) {
          setOtpVerify(res.data.message);
          setEmailVerified(true);
          setRefetch(!refetch);
          handleUpdateUser();
          // swal({
          //   text: res.data.message,
          //   icon: "success",
          //   button: "OK!",
          //   className: "modal_class_success",
          // });
        }

        setOpenEmail(false);
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

          setDisableAfterActivation(false);
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
      text: "Please verify your email address before closing!",
      icon: "warning",
      button: "OK!",
      className: "modal_class_success",
    });
  };

  return (
    // <div>
    //   <Modal
    //     open={open}
    //     onClose={otpVerify == otpCode && handleClose}
    //     aria-labelledby="modal-modal-title"
    //     aria-describedby="modal-modal-description"
    //     className="text-center"
    //   >
    //     <Box sx={style} id="">
    //       <div className='closeD'>
    //         <Button className='iconClose' onClick={otpVerify == otpCode ? handleClose : verifyAlert}><CloseIcon className='iconClose' style={{ color: "red" }} /></Button>
    //       </div>
    //       <Typography id="modal-modal-title text-light" className='text-light' variant="h6" component="h2">
    //         Verify Email
    //       </Typography>
    //       <Typography id="modal-modal-description text-light" sx={{ mt: 2 }}>
    //         Check your email for OTP
    //       </Typography>
    //       <form className="input-group mt-2 mb-2" >
    //         <input type="number" className="form-control" placeholder="OTP code" aria-label="OTP code !!" aria-describedby="button-addon2" onChange={e => setOtpCode(e.target.value)} /> <br />
    //         <button disabled={disabled ? true : false} className="btn btn-outline-secondary bg-danger text-light" onClick={hendelSubmit} type="submit" id="button-addon2">Verify and Update</button>
    //       </form>

    //       {isOtpError ? <p style={{ color: 'red' }}>You have entered wrong OTP</p> : ''}
    //       <div className='d-flex' style={{ justifyContent: 'center' }}>
    //         <button disabled={minutes == 0 && seconds == 0 ? false : true} type='submit' onClick={handleVerifyEmail} className='submit banner-button2 font14 text-decoration-none pb-2' style={minutes == 0 && seconds == 0 ? { backgroundColor: '#007bff' } : { backgroundColor: '#7b7b94' }} id="font14">Resend OTP</button>
    //       </div>
    //       <div className='text-center text-white mt-3'>
    //         <span>{minutes < 10 ? `0${minutes}` : minutes}</span>:<span>{seconds < 10 ? `0${seconds}` : seconds}</span>
    //       </div>
    //     </Box>
    //   </Modal>
    // </div>
    <div>
      {/* <Modal */}
      <Dialog
        open={open}
        onClose={otpVerify == otpCode && handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="text-center"
        maxWidth="xs"
        fullWidth
      >
        <Box sx={style} id="">
          {/* <div className="closeD text-right"> */}
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
          {/* </div> */}
          <Typography
            id="modal-modal-title text-light"
            className="text-light pt-1"
            variant="h6"
            component="h2"
            align="center"
          >
            Verify Email
          </Typography>
          <Typography
            id="modal-modal-description text-light"
            sx={{ mt: 2, mb: "14px" }}
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
            style={{ justifyContent: "center", marginTop: "18px" }}
          >
            <button
              disabled={minutes == 0 && seconds == 0 ? false : true}
              type="submit"
              onClick={handleVerifyEmail}
              className={`submit banner-button2 font14 text-decoration-none text-white p-2 rounded ${
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
      {/* </Modal> */}
    </div>
  );
}
