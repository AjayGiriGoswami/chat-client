import React, { useState } from "react";
import "./Login.css"; // Import your custom CSS file for styling
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/forgot",
        { email: email },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control" // Bootstrap class for styling
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Send
        </button>
        <p className="mt-4 mb-0">
          I Have a Password?{""}
          <NavLink
            to="/login"
            className="text-decoration-none "
            style={{ color: "red" }}
          >
            Login
          </NavLink>
        </p>
      </form>
    </div>
  );
}

export default ForgotPassword;
