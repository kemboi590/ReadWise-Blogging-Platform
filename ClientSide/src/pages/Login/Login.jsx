import React from "react";
import "./login.css";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Axios from "axios";
import { useNavigate } from "react-router-dom"; //import useNavigate
import { useContext } from "react";
import { Context } from "../../context/userContext/Context";
import { apidomain } from "../../utils/domain";

const schema = yup.object().shape({
  Email: yup.string().email("Email is invalid").required("Email is required"),
  password: yup
    .string()
    .min(4, "Password must be at least 4 characters")
    .required("Password is required"),
});

function Login() {
  const { user, dispatch } = useContext(Context);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const sendDataToServer = (data) => {
    Axios.post(`${apidomain}/auth/login`, data)
      .then(({ data }) => {
        if (data.token) {
          alert("You are logged in!");
          navigate("/");
          console.log(user);
          dispatch({ type: "LOGIN_SUCCESS", payload: data });
        }
      })
      .catch(({ response }) => {
        alert(response.data.error);
      });
  };

  return (
    <div className="loginPage">
      <h2 className="loginTitle">LOG-IN</h2>

      <form onSubmit={handleSubmit(sendDataToServer)} className="myFormLogin">
        <>
          <input
            type="email"
            placeholder="Your email"
            {...register("Email")}
            className="inputFieldLogin"
          />
          <p>{errors.email?.message}</p>
        </>
        <>
          <input
            className="inputFieldLogin"
            type="password"
            placeholder="Your password"
            {...register("password")}
          />
          <p>{errors.password?.message}</p>
        </>
        <div className="toLogIn">
          <h4 className="forgotPasword">Forgot Password</h4>
          <h4 className="noAccount">Don't have an account?</h4>
        </div>
        <input type="submit" value="LOG IN" className="submitbtn" />
      </form>
    </div>
  );
}

export default Login;
