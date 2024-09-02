import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./useSlice";
import messageReducer from "./useMessageSlice";
import socketReducer from "./useSocketSlice"

const store = configureStore({
  reducer: {
    user: userReducer,
    message: messageReducer,
    socket : socketReducer
  },
});

export default store;
