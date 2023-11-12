import React from "react";
import PasswordResetArea from "../../Components/Auth/PasswordResetArea";
import PageTitle from "../../Components/Common/PageTitle";
import Footer from "../../Components/Layout/Footer/Footer";

const ResetPassword = () => {
  return (
    <>
      <PageTitle title="Reset Password" />
      <PasswordResetArea />
      <Footer />
    </>
  );
};

export default ResetPassword;
