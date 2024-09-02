import React, { useEffect, useRef } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Components/Navbar/Header";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Users/Login";
import { Toaster } from "react-hot-toast";
import Register from "./Components/Users/Register";
import ForgotPassword from "./Components/Users/ForgotPassword";
import RestPassword from "./Components/Users/RestPassword";
import Home from "./Components/Home/Home";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { SetSocket } from "./Redux/useSocketSlice";
import { SetOnlineUsers } from "./Redux/useSlice";
import ProtectedRoute from "./Components/Home/Protect";

const App = () => {
  const { authUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  let socketio = useRef(null);

  useEffect(() => {
    if (authUser) {
      const socketio = io("http://localhost:8000", {
        query: {
          userId: authUser._id,
        },
      });
      dispatch(SetSocket(socketio));

      socketio.on("getOnlineUsers", (OnlineUsers) => {
        dispatch(SetOnlineUsers(OnlineUsers));
      });
    }
    return () => {
      if (socketio.current) {
        socketio.current.disconnect();
      }
    };
  }, [authUser]);
  return (
    <div>
      <>
        <Header />
        <Toaster />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/restpassword/:id/:token" element={<RestPassword />} />
        </Routes>
      </>
    </div>
  );
};

export default App;
