import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { BiLeftArrowAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import { DSLCommerceContext } from "../../../../contexts/DSLCommerceContext";
import { KycContext } from "../../../../contexts/KycContext";

const KycSignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { handleRegister } = useContext(KycContext);

  const { user } = useContext(DSLCommerceContext);
  const [userName, setUserName] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const fullName = e.target.fullName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword?.value;

    if (password !== confirmPassword) {
      toast.error("Password Not Match");
      return;
    }

    const data = {
      name: fullName,
      walletAddress: user?.walletAddress,
      email: email,
      username: userName,
      password: password,
    };
    // console.log(data);
    handleRegister(data);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      className="merchant-sign-up-container"
    >
      {/* <div
        style={{ paddingBlock: "30px", paddingInline: "30px" }}
        className="default-width-container bg-white"
      > */}
      <div
        style={{
          width: "25rem",
          border: "none",
          marginBlock: "40px",
          paddingInline: "12px",
        }}
      >
        <Link to="/">
          <BiLeftArrowAlt className="fs-4 mb-2" />
          Back{" "}
        </Link>
        <Card className="shadow bg-white rounded">
          <Card.Body>
            <Form onSubmit={(e) => handleFormSubmit(e)}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="fw-bold">
                  Enter your Full Name as per your PhotoId
                </Form.Label>
                <Form.Control
                  name="fullName"
                  type="text"
                  placeholder="Enter Full Name "
                  required
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="fw-bold">Enter User Name</Form.Label>
                <Form.Control
                  name="userName"
                  value={userName}
                  onChange={(e) =>
                    setUserName(e.target.value.toLocaleLowerCase())
                  }
                  type="text"
                  placeholder="Enter your User Name"
                  required
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="fw-bold">Enter your email</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="fw-bold">Enter Password</Form.Label>
                <div className="d-flex align-items-center">
                  <Form.Control
                    name="password"
                    placeholder="Enter your Password"
                    required
                    type={!showPassword ? "password" : "text"}
                  />
                  <div
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      marginLeft: "-40px",
                      background: "transparent",
                      cursor: "pointer",
                    }}
                  >
                    {showPassword ? (
                      <AiFillEye size={30} className="text-dark" />
                    ) : (
                      <AiFillEyeInvisible size={30} className="text-dark" />
                    )}
                  </div>
                </div>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="fw-bold">
                  Confirm your Password
                </Form.Label>
                <div className="d-flex align-items-center">
                  <Form.Control
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    required
                    type={!showConfirmPassword ? "password" : "text"}
                  />
                  <div
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{
                      marginLeft: "-40px",
                      background: "transparent",
                      cursor: "pointer",
                    }}
                  >
                    {showConfirmPassword ? (
                      <AiFillEye size={30} className="text-dark" />
                    ) : (
                      <AiFillEyeInvisible size={30} className="text-dark" />
                    )}
                  </div>
                </div>
              </Form.Group>
              <Button className="my-3 w-100" variant="primary" type="submit">
                SIGN UP
              </Button>
            </Form>
            <hr />
            <p>
              Don't have an account? <Link to="/kyc/login">Login</Link>
            </p>
          </Card.Body>
        </Card>
      </div>
    </div>
    // </div>
  );
};

export default KycSignUp;
