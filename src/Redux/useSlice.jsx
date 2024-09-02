import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    authUser: localStorage.getItem("authUser")
    ? JSON.parse(localStorage.getItem("authUser"))
    : null,
    otherUsers: null,
    selectedUser: null,
    OnlineUsers:null,
  },
  reducers: {
    SetAuthUser: (state, action) => {
      state.authUser = action.payload;
      localStorage.setItem("authUser", JSON.stringify(action.payload));
    },
    SetotherUsers: (state, action) => {
      state.otherUsers = action.payload;
    },
    SetselectedUser: (state, action) => {
      state.selectedUser = action.payload; 
    },
    logout: (state) => {
      state.authUser = null;
      state.otherUsers = null;
      state.selectedUser =null;
      localStorage.removeItem("authUser");
    },
    SetOnlineUsers: (state,action)=>{
      state.OnlineUsers= action.payload
    }
  },
});

export const { SetAuthUser, SetotherUsers, SetselectedUser,logout,SetOnlineUsers } = userSlice.actions;
export default userSlice.reducer;