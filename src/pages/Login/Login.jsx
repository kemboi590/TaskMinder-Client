import React, { useEffect } from "react";
import "./login.css";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import authimage from "../../Images/authimage.jpg";
// import { apidomain } from "../../utils/domain";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../Redux/apiCall";
import { useSelector, useDispatch } from "react-redux";
// import Axios from "axios";

const schema = yup.object().shape({
  // UserName: yup.string().required("Full name is required"),
  email: yup.string().email("email is invalid").required("Email is required"),
  password: yup
    .string()
    .min(4, "password must be at least 4 characters")
    .required("password is required"),
});

function Login() {
  const dispatch = useDispatch();
  console.log(useSelector((state) => state.user.user));
  const userData = useSelector((state) => state.user.user);
  console.log(userData);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    loginUser(dispatch, data, () => navigate("/tasks"));
  };
  return (
    <div className="login_page">
      <div className="login_form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 className="login_title">LOGIN YOUR ACCOUNT</h3>

          <>
            <input
              className="inputFieldLogin"
              type="email"
              placeholder="Your email"
              {...register("email")}
            />
            <p className="errors">{errors.email?.message}</p>
          </>
          <br />

          {/* Input password */}
          <>
            <input
              className="inputFieldLogin"
              type="password"
              placeholder="Your password"
              {...register("password")}
            />
            <p className="errors">{errors.password?.message}</p>
          </>
          <br />
          {/* Confirm password */}

          <>
            <input type="submit" value="LOGIN" className="submit_btn" />
          </>
          <br />
        </form>
      </div>
      <div className="login_image">
        <div className="bg_image">
          <img src={authimage} alt="authimage" />
        </div>
      </div>
    </div>
  );
}

export default Login;
