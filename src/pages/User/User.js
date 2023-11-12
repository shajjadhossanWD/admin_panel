import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import AuthContext from "../../contexts/auth-context";
import PageTitle from "../../Components/Common/PageTitle";
import UserArea from "../../Components/User/UserArea";

function User() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    role: "user",
    orders: [],
  });
  // const { userId } = useContext(AuthContext);

  // useEffect(() => {
  //   axios
  //     .get(`/user/${userId}`)
  //     .then((res) => {
  //       setUser(res.data.user);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  return (
    <div className="user_wrapper">
      <PageTitle title="User" />
      <UserArea user={user} />
    </div>
  );
}

export default User;
