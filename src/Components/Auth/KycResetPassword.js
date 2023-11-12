
import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router";
import swal from "sweetalert";

const KycResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (password !== confirmPassword) {
      swal({
        title: "Attention",
        text: `Password did not match.`,
        icon: "warning",
        button: "OK!",
        className: "modal_class_success",
      });
      return;
    }

    axios
      .post(
        "https://backend.dslcommerce.com/api/user-panel/user/reset-password/",
        { newPassword: confirmPassword },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          swal({
            title: "Success",
            text: `${res.data.message}`,
            icon: "success",
            button: "OK!",
            className: "modal_class_success",
          });
          navigate("/kyc/login");
        }
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

  return (
    <>
      <section className="login-area ptb-50">
        <div className="container">
          <div className="login-form">


            <h2>Password Reset</h2>

            <form onSubmit={(e) => onSubmit(e)}>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="New Password"
                  name="password"

                />
              </div>

              <div className="form-group">
                <input
                  type="password"
                  className="form-control"

                  placeholder="Confirm New Password"
                  name="confirmPassword"

                />
              </div>

              <button type="submit">Reset Password</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default KycResetPassword;
