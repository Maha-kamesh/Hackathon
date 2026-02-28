import React, { useState } from "react";
import "./Logincss/Login.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ switchToRegister }) => {

  const navigate = useNavigate();
  const [popupMsg, setPopupMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitCall = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        data,
        { withCredentials: true }
      );

      if (response.status === 200) {
        alert("Login Successful!");

        localStorage.setItem("role", response.data.role);

        if (response.data.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/home");
        }
      }
    } catch (error) {
      setPopupMsg(
        error.response?.data?.message ||
          "Invalid email or password"
      );
    }
  };

  return (
    <>
      <div className="login-card">

        <h2>Login</h2>
        <p>Welcome back! Please enter your details.</p>

        <form onSubmit={handleSubmit(submitCall)}>

          <input
            placeholder="Email"
            {...register("email", { required: true })}
          />

          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />

          <button className="btn-login">
            Login
          </button>

        </form>

        <div className="divider">
          <span>Or login with</span>
        </div>

        <button className="btn-google">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_勇敢_Logo.svg"
            alt="google"
          />
          Google
        </button>

        <p className="auth-switch">
          New to LWD?
          <span onClick={switchToRegister}>
            Register for free
          </span>
        </p>

      </div>

      {popupMsg && (
        <div className="popup-overlay">
          <div className="popup-box">
            <p>{popupMsg}</p>
            <button onClick={() => setPopupMsg("")}>
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;