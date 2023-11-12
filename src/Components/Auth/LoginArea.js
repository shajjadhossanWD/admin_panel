import React, { useRef, useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

import AuthContext from "../../contexts/auth-context";
import { AdminContext } from "../../contexts/AdminContext";
import axios from "axios";
import swal from "sweetalert";

function LoginArea({ customClass = "" }) {
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [email, setEmail] = useState("");
  const password = useRef();
  const [alertMsg, setAlertMsg] = useState(null);
  const context = useContext(AuthContext);
  const { admin, token, isAuthenticating, login } = useContext(AdminContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticating) {
      navigate(`/admin/otp/${token}`, { replace: true });
    }
    if (admin?._id) {
      navigate("/admin", { replace: true });
    }
  }, [admin, navigate, isAuthenticating, token]);

  const handleLogin = (e) => {
    e.preventDefault();

    const password = e.target.password.value;
    // console.log(email);
    // console.log(password);
    login(email, password);
  };

  return (
    <div
      className={"login-form " + customClass}
      style={{ backgroundColor: "#d1d1d1" }}
    >
      {alertMsg &&
        (Array.isArray(alertMsg) ? (
          <div className="alert alert-danger" role="alert">
            <ul className="errors" style={{ marginBottom: 0 }}>
              {alertMsg.map((msg) => (
                <li key={msg} className="error">
                  {msg}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className={`alert alert-success`} role="alert">
            {alertMsg}
          </div>
        ))}
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

        <span className="text-center mt-4 loginTag "></span>

        {/* <h2 className=" ">Login</h2> */}
      </div>

      <form onSubmit={handleLogin}>
        <InputGroup className="mb-3 mt-5">
          <Form.Control
            aria-label="Amount (to the nearest dollar)"
            className=""
            placeholder="Enter Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value.toLocaleLowerCase())}
            required
          />
        </InputGroup>

        <InputGroup className="mb-3 mt-3">
          <Form.Control
            aria-label="Amount (to the nearest dollar)"
            className=""
            placeholder="Enter Password"
            type={visiblePassword ? "text" : "password"}
            name="password"
            ref={password}
            required
          />
          <InputGroup.Text
            className=" border fs-3 bg-dark"
            onClick={() => setVisiblePassword(!visiblePassword)}
            style={{ cursor: "pointer" }}
          >
            {visiblePassword ? (
              <AiOutlineEye style={{ fontSize: "20px" }} />
            ) : (
              <AiOutlineEyeInvisible style={{ fontSize: "20px" }} />
            )}
          </InputGroup.Text>
        </InputGroup>

        <div className="row align-items-center">
          <div className="col-lg-6 col-md-6 col-sm-6 lost-your-password text-left">
            <a href="login/forgetPassword" className="lost-your-password">
              Forgot your password?
            </a>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6">
            {/* <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="checkme"
              />
              <label className="form-check-label" htmlFor="checkme">
                Remember me
              </label>
            </div> */}
          </div>
        </div>

        <button type="submit">Login</button>
      </form>

      {/* <div className="important-text">
        <p>
          Don't have an account? <Link to="/admin/register">Register now!</Link>
        </p>
      </div> */}
    </div>
  );
}

export default LoginArea;
