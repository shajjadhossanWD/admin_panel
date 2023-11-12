import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import swal from "sweetalert";
import { DSLCommerceContext } from "../../contexts/DSLCommerceContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function OtpPopUp({ handleClose, setOpen, open }) {
  const [otp, setOtp] = React.useState("");
  const { user1, setUser } = React.useContext(DSLCommerceContext);

  const handleOtp = (e) => {
    const otp = e.target.value;
    setOtp(otp);
  };

  const handleEmailOtp = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://backend.grighund.net/api/users/verifyOtp",
        { otp },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          handleClose();
          setUser({ ...user1, isEmailVerified: true });
          swal({
            title: "Good job!",
            text: "Successfully verify your Email Address",
            icon: "success",
            button: "OK!1",
            className: "modal_class_success",
          });
        }
      })
      .catch((error) => {
        swal({
          title: "Attention!",
          text: error.response.data.message,
          icon: "warning",
          button: "OK!",
          className: "modal_class_success",
        });
      });
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Your Email OTP
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <h6 className="text-dark">Please Check your Email for OTP.</h6>
            <input
              className="form-control"
              placeholder="OTP code"
              type="number"
              name="otp"
              required
              value={otp}
              onChange={handleOtp}
            />
            <button className="otpBtn" onClick={handleEmailOtp}>
              Submit
            </button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
