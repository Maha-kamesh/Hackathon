import { useState } from "react";
import "./Logincss/Signup.css";

import { Link,useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import axios from "axios";


const Register = () =>{
const navigate = useNavigate();
const [popupMsg, setPopupMsg] = useState("");


  const{register,
    handleSubmit,
    formState:{errors},
  }=useForm();


const submitCall =async (data)=>{
  console.log(data);
  try{
    const response = await axios.post(" http://localhost:3000/api/users/register",data);
    if (response.status==201){
      alert("Registration Sucessfull!")
      navigate ("/login");
    }
  }catch (error) {
  if (error.response?.data?.message) {
    setPopupMsg(error.response.data.message);
  } else {
    setPopupMsg("Something went wrong. Please try again.");
  }
}
}



  return (
  <>
    <div className="lwd-page-wrapper">
      <div className="form-box-container">
        <h1 className="form-title">Step Into Your Future Career Today</h1>
        <p className="form-subtitle">5 lakh+ jobs for you to explore</p>

        <form onSubmit={handleSubmit(submitCall)}>

          {/* NAME */}
          <label className="lwd-label" htmlFor="name">Full Name</label>
          <input
            type="text"
            placeholder="What is your name?"
            className={`lwd-input ${errors.name ? "input-error" : ""}`}
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 4,
                message: "Name must be at least 4 characters",
              },
            })}
          />
          {errors.name && <div className="error-text">{errors.name.message}</div>}


          {/* EMAIL */}
          <label className="lwd-label" htmlFor="email">Email ID</label>
          <input
            type="email"
            placeholder="Tell us your Email ID"
            className={`lwd-input ${errors.email ? "input-error" : ""}`}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid Email address",
              },
            })}
          />
          {errors.email && <div className="error-text">{errors.email.message}</div>}


          {/* PASSWORD */}
          <label className="lwd-label" htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Create a password"
            className={`lwd-input ${errors.password ? "input-error" : ""}`}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && <div className="error-text">{errors.password.message}</div>}


          {/* MOBILE */}
          <label className="lwd-label" htmlFor="mobile">Mobile Number</label>
          <input
            type="tel"
            placeholder="Mobile Number"
            className={`lwd-input ${errors.mobile ? "input-error" : ""}`}
            {...register("mobile", {
              required: "Mobile number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Mobile number must be 10 digits",
              },
            })}
          />
          {errors.mobile && <div className="error-text">{errors.mobile.message}</div>}


          {/* WORK STATUS */}
          <label className="lwd-label">Work Status</label>
          <div className="exp-row">
            <label>
              <input type="radio" value="fresher" {...register("workStatus", { required: true })} />
              <span className="font-bold text-sm"> I'm a Fresher</span>
            </label>

            <label>
              <input type="radio" value="experienced" {...register("workStatus", { required: true })} />
              <span className="font-bold text-sm"> I'm Experienced</span>
            </label>
          </div>

          <button type="submit" className="btn-submit">Register Now</button>

          <p className="text-center text-xs text-gray-400 mt-4">
            By clicking Register, you agree to the Terms and Conditions of LWD.com
          </p>

        </form>
      </div>
    </div>

    <footer className="lwd-footer">
      <div className="footer-content">
        <p>© 2026 LWD.com | All rights reserved</p>
        <div className="footer-links">
          <a href="#">About Us</a>
          <a href="#">Contact</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms & Conditions</a>
        </div>
      </div>
    </footer>

    {popupMsg && (
      <div className="popup-overlay">
        <div className="popup-box">
          <p>{popupMsg}</p>
          <button onClick={() => setPopupMsg("")}>OK</button>
        </div>
      </div>
    )}
  </>
);
}
export default Register;
