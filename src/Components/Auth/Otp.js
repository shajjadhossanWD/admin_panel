import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { AiFillLock } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { useTimer } from "react-timer-hook";
import { AdminContext } from "../../contexts/AdminContext";
import swal from "sweetalert";

const Otp = ({ expiryTimestamp }) => {
  const { token } = useParams();
  const { admin, setAdmin } = useContext(AdminContext);
  const [forEnable, setForEnable] = useState(false);
  const [pasteText, setPasteText] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (admin?._id) {
      navigate("/admin");
    }
  }, [admin, navigate]);

  // for maintaining re-send otp button's disable enable
  const enableing = () => {
    setForEnable(true);
  };

  setTimeout(enableing, 180000);
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });

  const resendOTP = () => {
    axios
      .get(`https://backend.dslcommerce.com/api/admin/resend-otp`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          // alert(res.data.message);
          // alert("OTP resent");
          swal({
            text: "OTP resent",
            icon: "success",
            button: "OK!",
            className: "modal_class_success",
          });
          setForEnable(false);
        }
      })
      .catch((err) => {
        // alert(err.res.data.message);
        swal({
          text: err.res.data.message,
          icon: "warning",
          button: "OK!",
          className: "modal_class_success",
        });
      });
  };

  const handleOTP = (e) => {
    e.preventDefault();
    const otp = e.target.otp.value;
    axios
      .post(
        `https://backend.dslcommerce.com/api/admin/verify-otp/`,
        {
          otp,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setAdmin(res.data.admin);
          localStorage.setItem("adminDslCommerce", res.data.token);
          localStorage.removeItem("verify-tokens");
          navigate("/admin/dashboard");
        }
      })
      .catch((err) => {
        swal({
          text: err.response.data.message,
          icon: "warning",
          button: "OK!",
          className: "modal_class_success",
        });
      });
  };

  const CustomTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
    },
  }));

  const handlePasteText = () => {
    navigator.clipboard.readText().then(
      (cliptext) => setPasteText(cliptext),
      (err) => console.log(err)
    );
    setPasteText(null);
  };

  return (
    <div>
      <div className="handleTheLoginBody">
        <div className="container mx-auto">
          <div className=" forCard  w-50 p-5 rounded mx-auto">
            <div className="mx-auto text-center">
              <img
                style={{
                  width: "80px",
                  marginTop: "-20px",
                }}
                src="https://testnet.grighund.net/static/media/logo192.ea779dfe5e580c22a76f.png"
                className="handleLogoLogin"
                alt="logo"
              />
              <p className="text-dark mt-3 pb-3">
                Please check your email for OTP
              </p>
            </div>

            <div className="mt-3 pt-2">
              <form onSubmit={handleOTP}>
                <InputGroup className="mb-3 mt-3">
                  <InputGroup.Text className="bg-dark text-light border-0">
                    <AiFillLock></AiFillLock>
                  </InputGroup.Text>
                  <Form.Control
                    aria-label="Amount (to the nearest dollar)"
                    className="inputBackground"
                    defaultValue={pasteText}
                    placeholder="Enter OTP"
                    type="number"
                    name="otp"
                    required
                  />
                  <CustomTooltip title="paste">
                    <InputGroup.Text
                      style={{ cursor: "pointer" }}
                      className="bg-dark text-light border-0"
                      onClick={() => handlePasteText()}
                    >
                      <i className="fas fa-paste"></i>
                    </InputGroup.Text>
                  </CustomTooltip>
                </InputGroup>

                <br />
                <div className="mx-auto text-center">
                  <Button
                    className="button-34 submit_OTP_btn ps-4 pe-4"
                    type="submit"
                  >
                    Submit
                  </Button>
                </div>
              </form>
              <div className="mx-auto text-center mt-3">
                <Button
                  disabled={!forEnable}
                  className="button-34 resend_OTP_btn border-0 text-center ps-4 pe-4 pt-2 pb-2"
                  type="button"
                  onClick={() => resendOTP()}
                >
                  Re-Send OTP
                </Button>
              </div>
              <div className="text-center text-dark fw-bolder mt-3">
                <span>{minutes}</span>:
                <span>{seconds < 10 ? `0${seconds}` : seconds}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Otp;
