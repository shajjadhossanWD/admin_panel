import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { KycContext } from "../../contexts/KycContext";

const RequireKycAuth = ({ children }) => {
  const kycToken = localStorage.getItem("kycUserToken");

  const { kycUser } = useContext(KycContext);
  console.log(kycUser, "KYC user");

  if (kycUser?._id) {
    return <Outlet />;
  }

  return <Navigate to="/kyc/login" />;
};

export default RequireKycAuth;
