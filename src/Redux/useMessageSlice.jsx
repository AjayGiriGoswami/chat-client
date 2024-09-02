import { createSlice } from '@reduxjs/toolkit';

const messageSlice = createSlice({
  name: 'message',
  initialState: {
    messages: null,
  },
  reducers: {
    Setmessages: (state, action) => {
      state.messages = action.payload;
    },
  },
});

export const { Setmessages} = messageSlice.actions;
export default messageSlice.reducer;