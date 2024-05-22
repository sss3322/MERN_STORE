
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const userAuthSlice = createSlice({
  name: "userauth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
     
      if (action.payload.token) {
        
        state.userInfo = action.payload;
        localStorage.setItem("userInfo", JSON.stringify(action.payload));

        const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000; 
        localStorage.setItem("expirationTime", expirationTime);
      } else {
        
        state.userInfo = null;
        localStorage.removeItem("userInfo");
        localStorage.removeItem("expirationTime");
      }
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.clear();
    },
  },
});

export const { setCredentials, logout } = userAuthSlice.actions;

export default userAuthSlice.reducer;
