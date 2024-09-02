import React, { useState } from "react";
import "./Login.css"; // Import your custom CSS file for styling
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

function Register() {
  const [user, setUser] = useState({
    fullname: "",
    email: "",
    password: "",
    gender: "",
  });
  const navigate = useNavigate();

  const handleGenderChange = (event) => {
    setUser({ ...user, gender: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/register",
        user,
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
      console.log(error);
    }
  };

  return (
    <div className="login-container">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="name"
            id="name"
            placeholder="Enter your full name"
            className="form-control" // Bootstrap class for styling
            value={user.fullname}
            onChange={(e) => setUser({ ...user, fullname: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="form-control" // Bootstrap class for styling
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            className="form-control" // Bootstrap class for styling
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>{" "}
        <label>Gender</label>
        <div className="form-group gender-selection">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              id="male"
              value="male"
              name="gender"
              checked={user.gender === "male"}
              onChange={handleGenderChange}
            />
            <label className="form-check-label" htmlFor="male">
              Male
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              id="female"
              value="female"
              name="gender"
              checked={user.gender === "female"}
              onChange={handleGenderChange}
            />
            <label className="form-check-label" htmlFor="female">
              Female
            </label>
          </div>
          {/* Add more options if needed */}
        </div>
        <button type="submit" className="btn btn-primary">
          Create Account
        </button>
        <p className="mt-4">
          I Have a account?{" "}
          <NavLink
            to="/login"
            className="text-decoration-none"
            style={{ color: "red" }}
          >
            Login
          </NavLink>
        </p>
      </form>
    </div>
  );
}

export default Register;
