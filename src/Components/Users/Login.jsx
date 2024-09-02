import React, { useState } from "react";
import "./Login.css"; // Import your custom CSS file for styling
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { SetAuthUser } from "../../Redux/useSlice";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch(SetAuthUser(res.data));

      navigate("/");
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="form-control" // Bootstrap class for styling
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="form-control" // Bootstrap class for styling
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
        <p className="mt-4">
          Don't have an account?{""}
          <NavLink
            to="/register"
            className="text-decoration-none"
            style={{ color: "red" }}
          >
            Create Account
          </NavLink>
        </p>
        <p className="mt-4 mb-1">
          Forgot Password {""}
          <NavLink
            to="/forgotpassword"
            className="text-decoration-none"
            style={{ color: "blue" }}
          >
            Check Here
          </NavLink>
        </p>
      </form>
    </div>
  );
}

export default Login;
