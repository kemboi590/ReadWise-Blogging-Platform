import React from "react";
import "./profile.css";
import { useContext } from "react";
import { Context } from "./../../context/userContext/Context";
import profileIMG from "./../../images/profileIMG.png";

function Profile() {
  const { user } = useContext(Context);
  console.log(user);
  return (
    <div className="profilePage">
      <h1 className="profileTitle">Profile</h1>
      <div className="dp">
        <img src={profileIMG} alt="profile" />
      </div>
      <div className="userDetails">
        <h4>Username: {user.UserName}</h4>
        <h4>Email: {user.Email}</h4>
        <h4>Role: {user.Role}</h4>
        <h4>UserID: {user.UserID}</h4>
      </div>
    </div>
  );
}

export default Profile;
