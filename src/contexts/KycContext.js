import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { DSLCommerceContext } from "./DSLCommerceContext";

export const KycContext = createContext();

export default function KycProvider({ children }) {
  const navigate = useNavigate();
  const [kycUser, setKycUser] = useState({});
  console.log(kycUser, "The kyc user");
  const [refetch, setRefetch] = useState(false);
  const { user } = useContext(DSLCommerceContext);
  const [emailVerified, setEmailVerified] = useState(false);
  const [mobileNoVerify, setmobileNoVerify] = useState(false);
  const [isVerifiedProfile, setisVerifiedProfile] = useState(false);
  const [isVerifiedPhotId, setisVerifiedPhotId] = useState(false);
  const [isVerifiedAddress, setisVerifiedAddress] = useState(false);

  //get current user data..........
  useEffect(() => {
    axios
      .get(`https://backend.dslcommerce.com/api/user-panel/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("kycUserToken")}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setKycUser(res.data.result);
      })
      .catch((err) => {
        setKycUser(null);
      });
  }, [refetch]);

  //************************************ User Register ***********************************
  const handleRegister = async (data) => {
    await axios
      .post(`https://backend.dslcommerce.com/api/user-panel/signup`, data)
      .then((res) => {
        if (res.status === 200) {
          setRefetch(!refetch);
          localStorage.setItem("kycUserToken", res.data.token);
          // console.log(res.data.token);
          toast.success("Register Success .");
          navigate("/kyc/profile");
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

  //************************************ User login ************************************
  const handleUserLogin = async (data) => {
    await axios
      .post(`https://backend.dslcommerce.com/api/user-panel/signin`, data)
      .then((res) => {
        if (res.status === 200) {
          setRefetch(!refetch);
          localStorage.setItem("kycUserToken", res.data.token);
          // console.log(res.data.token);
          toast.success("Welcome to your profile .");
          navigate("/kyc/profile");
        }
      })
      .catch((err) => {
        swal({
          title: "Attention",
          text: ` Your email is not exist !`,
          icon: "warning",
          button: "OK!",
          className: "modal_class_success",
        });
      });
  };

  // // ************************************User Update ************************************
  // const handleUpdateUser = async (dataUser) => {
  //   console.log(dataUser, "data to update");
  //   await axios
  //     .put(
  //       `https://backend.dslcommerce.com/api/user-panel/user/update/${kycUser?.walletAddress}`,
  //       dataUser
  //     )
  //     .then((res) => {
  //       console.log(res, "inside the update");
  //       if (res.status === 200) {

  //         setisVerifiedProfile(!refetch);
  //         setRefetch(!refetch);
  //         toast.success("Successfully updated your profile .");
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err, "inside the update erro");
  //       swal({
  //         title: "Attention",
  //         text: `${err.response.data.message}`,
  //         icon: "warning",
  //         button: "OK!",
  //         className: "modal_class_success",
  //       });
  //     });
  // };

  // //************************************ User Address ***********************************
  // const handleAddress = async (data) => {
  //   await axios
  //     .post(`https://backend.dslcommerce.com/api/address`, data, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("kycUserToken")}`,
  //       },
  //     })
  //     .then((res) => {
  //       if (res.status === 200) {
  //         setRefetch(!refetch);
  //         toast.success("Successfully updated your address .");
  //       }
  //     })
  //     .catch((err) => {
  //       swal({
  //         title: "Attention",
  //         text: `${err.response.data.message}`,
  //         icon: "warning",
  //         button: "OK!",
  //         className: "modal_class_success",
  //       });
  //     });
  // };

  //user logout
  const logout = () => {
    console.log("Making the user null");
    localStorage.removeItem("kycUserToken");
    setKycUser(null);
    navigate("/");
  };

  return (
    <KycContext.Provider
      value={{
        handleRegister,
        handleUserLogin,
        setKycUser,
        kycUser,
        // handleUpdateUser,
        // handleAddress,
        refetch,
        setRefetch,
        logout,
        emailVerified,
        setEmailVerified,
        mobileNoVerify,
        setmobileNoVerify,
        isVerifiedAddress,
        isVerifiedPhotId,
        isVerifiedProfile,
        setisVerifiedAddress,
        setisVerifiedPhotId,
        setisVerifiedProfile,
      }}
    >
      {children}
    </KycContext.Provider>
  );
}
