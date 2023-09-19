import { createSlice } from "@reduxjs/toolkit";

export const UserLoginSlice = createSlice({
  name: 'userLogin',
  initialState: {
    name: ''
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.name = action.payload;
    }
  }
})

export const { loginSuccess } = UserLoginSlice.actions;
export default UserLoginSlice.reducer;