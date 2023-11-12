import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import swal from "sweetalert";
import "./Profile.css";
import { css } from "@emotion/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
// import OtpPopUp from "../OtpPopUp/OtpPopUp";
import { GridLoader } from "react-spinners";
import { CopyToClipboard } from "react-copy-to-clipboard";
// import { FlightNFTContext } from "../../Context/FlightNFTContext";

const Profile2 = () => {
  const [selectedImage, setSelectedImage] = useState();
  const [image, setImage] = useState();
  // const { user, setUser, logOut } = useContext(FlightNFTContext);
  const { user, setUser, logOut } = useContext([]);
  let [loading] = useState(true);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const url = useLocation()?.state?.pathname;
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (user) {
      if (user.name) {
        setName(user.name);
      }
      if (user.email) {
        setEmail(user.email);
      }
      if (user.username) {
        setUsername(user.username);
      }
    }
  }, [user]);

  const override = css`
    display: block;
    margin: 0 auto;
  `;
  useEffect(() => {
    if (!selectedImage) {
      setImage(user?.avatar || "https://i.ibb.co/DkGL0H4/maleprofile.jpg");
      return;
    }

    const objectUrl = URL.createObjectURL(selectedImage);
    setImage(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImage, user?.avatar]);

  const changePhoto = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedImage(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedImage(e.target.files[0]);
  };

  const checkUsername = () => {
    if (!username || username.length === 0) {
      swal({
        title: "Attention",
        text: "Please enter your username",
        icon: "warning",
        button: "OK!",
        className: "modal_class_success",
      });
    } else {
      axios
        .get(`https://backend.dslcommerce.com/api/users/username/${username}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setError("");
            swal({
              // title: "S",
              text: res.data.message,
              icon: "success",
              button: "OK!",
              className: "modal_class_success",
            });
          }
        })
        .catch((err) => {
          if (err.response.status === 409) {
            setError(true);
            swal({
              title: "Attention",
              text: err.response.data.message,
              icon: "warning",
              button: "OK!",
              className: "modal_class_success",
            });
          }
        });
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const username = e.target.username.value;
    const email = e.target.email.value;
    const walletAddress = e.target.walletAddress.value;
    const network = e.target.network.value;

    if (email && !user.isEmailVerified) {
      return swal({
        title: "Attention",
        text: "Please verify your email first",
        icon: "warning",
        button: "OK!",
        className: "modal_class_success",
      });
    }

    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("name", name);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("walletAddress", walletAddress);
    formData.append("network", network);

    await axios
      .put(
        `https://backend.dslcommerce.com/api/users/${user.walletAddress}`,
        formData
      )
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data.user);
          swal({
            title: "Good job!",
            text: res.data.message,
            icon: "success",
            button: "OK!",
            className: "modal_class_success",
          });
          if (
            res.data.user.name &&
            res.data.user.email &&
            res.data.user.username &&
            res.data.user.isEmailVerified
          ) {
            navigate("/");
          }
        }
      })
      .catch((error) => {
        swal({
          title: "Attention",
          text: error.response.data.message,
          icon: "warning",
          button: "OK!",
          className: "modal_class_success",
        });
      });
  };
  console.log(
    error ||
      (name === user?.name &&
        username === user?.username &&
        email === user?.email &&
        image === user?.avatar)
  );
  const handleEmailChange = (e) => {
    const data = e.target.value;
    setEmail(data.toLocaleLowerCase());
  };

  const handleEmail = (e) => {
    e.preventDefault();

    if (!email || email.length === 0) {
      swal({
        title: "Attention",
        text: "Please enter your email",
        icon: "warning",
        button: "OK!",
        className: "modal_class_success",
      });
    } else {
      axios
        .post(
          "https://backend.dslcommerce.com/api/users/emailVerification",
          { email },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            setOpen(true);
          }
        })
        .catch((error) => {
          swal({
            title: "Attention",
            text: error.response.data.message,
            icon: "warning",
            button: "OK!",
            className: "modal_class_success",
          });
        });
    }
  };

  const Logout = () => {
    logOut();
    navigate("/");

    swal({
      // title: "S",
      text: "You have successfully logged out.",
      icon: "success",
      button: "OK!",
      className: "modal_class_success",
    });
  };

  return (
    <div className="container py-3 profileContainer">
      <div className="container"></div>
      <h3 className="text-start text-white-50 profileTitles">Profile</h3>

      {user ? (
        <form
          className="mb-5 shadow-lg rounded-lg pt-3 pb-5 px-4 p-md-5 align-items-center profileForm"
          onSubmit={updateProfile}
        >
          <div className="row" style={{ rowGap: "10px" }}>
            <div className="col-md-6 px-0 imgProfileDiv">
              <p>
                <img
                  src={image}
                  alt=""
                  style={{
                    width: 150,
                    height: 150,
                    borderRadius: "50%",
                    margin: "0px auto",
                    border: "8px solid #d4d4d4",
                  }}
                />
              </p>
              <input
                type="file"
                name="profilePic"
                accept="image/jpg, image/png, image/jpeg"
                className="form-control profileImgInput"
                onChange={changePhoto}
              />
            </div>
            <div className="col-md-6 px-0">
              <div className="mb-2">
                <label htmlFor="name" className="text-white d-flex pb-1 pt-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="enter full name"
                  className="form-control profileInput"
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="username"
                  className="text-white d-flex pb-1 pt-2 text-start"
                >
                  Username
                </label>
                <p>
                  <small className="text-danger d-flex errorMsg">{error}</small>
                </p>
                <div className="profileUser">
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) =>
                      setUsername(e.target.value.toLocaleLowerCase())
                    }
                    placeholder="Enter Username"
                    className="form-control profileInput"
                  />
                  <button
                    type="button"
                    onClick={checkUsername}
                    className={
                      username.length === 0 || username === user.username
                        ? "btn-secondary"
                        : ""
                    }
                    disabled={
                      username.length === 0 || username === user?.username
                        ? true
                        : false
                    }
                  >
                    Check Now
                  </button>
                </div>
              </div>
              <div className="mb-2">
                <label htmlFor="email" className="text-white d-flex pb-1 pt-2">
                  Email Address
                </label>
                <div className="profileUser">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter email address"
                    className="form-control profileInput"
                    value={email}
                    onChange={handleEmailChange}
                  />
                  <button
                    type="button"
                    onClick={handleEmail}
                    className={
                      email.length === 0 ||
                      (email === user.email && user.isEmailVerified)
                        ? "btn-secondary"
                        : ""
                    }
                    disabled={
                      email.length === 0 ||
                      (email === user.email && user.isEmailVerified)
                        ? true
                        : false
                    }
                  >
                    Verify Now
                  </button>
                </div>
              </div>

              {user.walletAddress && (
                <div className="mb-2">
                  <label
                    htmlFor="walletAddress"
                    className="text-white d-flex pb-1 pt-2"
                  >
                    Wallet Address
                  </label>
                  <div className="d-flex">
                    <input
                      type="text"
                      id="walletAddress"
                      name="walletAddress"
                      value={user.walletAddress}
                      className="form-control profileInput"
                      disabled
                    />
                    <CopyToClipboard text={user.walletAddress}>
                      <button className="copyBtn">
                        <ContentCopyIcon />
                      </button>
                    </CopyToClipboard>
                  </div>
                </div>
              )}

              {user.walletAddress && (
                <div className="mb-2">
                  <label
                    htmlFor="network"
                    className="text-white d-flex pb-1 pt-2"
                  >
                    Network{" "}
                  </label>
                  <input
                    type="text"
                    id="network"
                    name="network"
                    value="Binance Chain"
                    className="form-control profileInput"
                    disabled
                  />
                </div>
              )}
              <div className="mt-4 d-flex justify-content-center">
                <Link
                  to="/"
                  underline="none"
                  className="profileBtn fw-bold text-decoration-none"
                >
                  Cancel
                </Link>
                <button
                  className={`profileBtn fw-bold ${
                    error ||
                    (name === user?.name &&
                      username === user?.username &&
                      email === user?.email &&
                      image === user?.avatar)
                      ? "btn-secondary"
                      : ""
                  }`}
                  type="submit"
                  disabled={
                    error ||
                    (name === user?.name &&
                      username === user?.username &&
                      email === user?.email &&
                      image === user?.avatar)
                      ? true
                      : false
                  }
                >
                  Save
                </button>
                <button
                  className="profileBtn fw-bold"
                  type="button"
                  onClick={Logout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <GridLoader
          size={60}
          color={"#DC3545"}
          css={override}
          loading={loading}
        />
      )}
      {/* <OtpPopUp handleClose={handleClose} open={open}></OtpPopUp> */}
    </div>
  );
};

export default Profile2;
