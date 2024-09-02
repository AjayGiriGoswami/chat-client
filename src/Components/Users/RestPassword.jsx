import React, { useState } from "react";
import "./Login.css"; // Import your custom CSS file for styling
import { NavLink, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

function RestPassword() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { id, token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/user/restpassword/${id}/${token}`,
        {password: password},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if(res.data.success){
        navigate("/login")
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Rest Password</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control" // Bootstrap class for styling
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Rest Password
        </button>
        <p className="mt-4 mb-0">
          I Have a account? {""}
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

export default RestPassword;
