import React from "react";
import { Button } from "@mui/material";
import { InputGroup } from "react-bootstrap";
import MailIcon from "@mui/icons-material/Mail";
import { FiSend } from "react-icons/fi";
import swal from "sweetalert";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { AiOutlineLogin } from "react-icons/ai";

const KycForgetPassword = () => {
  const navigate = useNavigate();

  const handleGoToLogin = () => {
    navigate("/kyc/login");
  };

  const sendResetLink = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    // console.log(email)

    await axios
      .post(
        "https://backend.dslcommerce.com/api/user-panel/user/send-reset-password-link/",
        { email }
      )
      .then((res) => {
        if (res.status === 200) {
          // alert(res.data.message);
          swal({
            // title: "Success",
            text: `${res.data.message}`,
            icon: "success",
            button: "OK!",
            className: "modal_class_success",
          });
          navigate("/kyc/login");
        }
      })
      .catch((err) => {
        // alert(err.response.data.message);
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
                alt="logo"
              />
              <p className="py-1" style={{ fontSize: "34px" }}>
                Forget Password
              </p>
            </div>
            <hr />
            <div className="mt-4 pt-2">
              <form onSubmit={sendResetLink}>
                <InputGroup className="mb-3 mt-3">
                  <InputGroup.Text className=" border fs-3 bg-dark">
                    <MailIcon style={{ fontSize: "20px", color: "white" }} />
                  </InputGroup.Text>
                  <Form.Control
                    aria-label="Amount (to the nearest dollar)"
                    className=""
                    placeholder="Enter Email"
                    type="email"
                    name="email"
                    required
                  />
                </InputGroup>

                <div
                  className="mx-auto text-center"
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <Button
                    style={{ backgroundColor: "#f74545", height: "28px" }}
                    className="button-34 px-4 "
                    type="submit"
                    // onClick={handleGoToLogin}
                  >
                    <FiSend></FiSend> Send
                  </Button>
                  <Button
                    style={{ backgroundColor: "#f74545", height: "28px" }}
                    className="button-34 px-4"
                    type="button"
                    onClick={handleGoToLogin}
                  >
                    <AiOutlineLogin /> Login
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KycForgetPassword;
