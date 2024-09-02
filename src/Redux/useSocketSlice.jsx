import { createSlice } from "@reduxjs/toolkit";
const socketSlice = createSlice({
    name: "socket",
    initialState: {
        socket: null,
    },
    reducers:{
        SetSocket:(state,action)=>{
            state.socket = action.payload;
        }
    }
})

export const {SetSocket} = socketSlice.actions
export default socketSlice.reducer