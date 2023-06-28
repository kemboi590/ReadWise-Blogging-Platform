import React from "react";

import { useContext } from "react";
import { Context } from "./../../context/userContext/Context";

function Profile() {
  const { user } = useContext(Context);
  console.log(user);
  return (
    <div>
      <h1>Profile</h1>
      <h4>Username: {user.UserName}</h4>
      <h4>Email: {user.Email}</h4>
    </div>
  );
}

export default Profile;
