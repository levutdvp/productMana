import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../axios-instance";
export const login = createAsyncThunk('login',
  async data => {
  const response = await api.get(`/user?name=${data.name}&&email=${data.email}`)
  return response.data;
})

export const UserLoginSlice = createSlice({
  name: 'userLogin',
  initialState: {
    name: '',
    email:'',
    id: '',
    isLoginSuccess: false
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.id = action.payload.id
    }
  },
  extraReducers(builder){
    builder.addCase(login.fulfilled, (state, action) => {
      
      if (action.payload.length > 0) {
        state.name = action.payload[0].name;
        state.email = action.payload[0].email;
        state.id = action.payload[0].id;
        state.isLoginSuccess = true;
      } else {
        state.isLoginSuccess = false
      }
    })
  }
})

export const { loginSuccess } = UserLoginSlice.actions;
export default UserLoginSlice.reducer;