import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { BiLeftArrow, BiLeftArrowAlt } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { KycContext } from "../../../../contexts/KycContext";

const KycLogin = () => {
  const [isVisible, setVisible] = useState(false);
  const { handleUserLogin, kycUser } = useContext(KycContext);
  const navigate = useNavigate();

  const handleShow = () => {
    setVisible(!isVisible);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const data = {
      email: email,
      password: password,
    };
    // console.log(data)
    handleUserLogin(data);
  };

  useEffect(() => {
    if (kycUser?._id) {
      navigate("/kyc/profile");
    }
  }, [kycUser]);

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div style={{ width: "25rem", paddingInline: "12px" }}>
        <Link to="/">
          <BiLeftArrowAlt className="fs-4 mb-2" />
          Back{" "}
        </Link>
        <Card
          className="shadow bg-white rounded"
          style={{ border: "none", width: "100%" }}
        >
          <Card.Body>
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <div className="mb-3">
                  <Form.Label className="text-uppercase fw-bold">
                    Email address
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    required
                    name="email"
                  />
                </div>

                <div className="mb-3">
                  <div className="d-flex justify-content-between">
                    <Form.Label className="text-uppercase fw-bold">
                      Password
                    </Form.Label>
                    <Link to="/kyc/login/forgetPassword">Forgot Password?</Link>
                  </div>
                  <div className="d-flex align-items-center">
                    <Form.Control
                      name="password"
                      type={!isVisible ? "password" : "text"}
                    />
                    <div
                      onClick={handleShow}
                      style={{
                        marginLeft: "-40px",
                        background: "transparent",
                        cursor: "pointer",
                      }}
                    >
                      {isVisible ? (
                        <AiFillEye size={30} className="text-dark" />
                      ) : (
                        <AiFillEyeInvisible size={30} className="text-dark" />
                      )}
                    </div>
                  </div>
                </div>

                {/* <div className='mb-3'>
                <Form.Check
                  type='checkbox'
                  id='checkbox'
                  label='Remember me on this computer'
                />
              </div> */}

                <Button
                  className="mt-1 w-100 bg-primary"
                  as="input"
                  type="submit"
                  value="LOG IN"
                />
              </Form.Group>
            </Form>
            <hr />
            <p>
              Don't have an account? <Link to="/kyc/sign-up">Signup</Link>
            </p>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default KycLogin;
