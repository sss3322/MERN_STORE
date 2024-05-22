import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminInfo: localStorage.getItem("adminInfo")
    ? JSON.parse(localStorage.getItem("adminInfo"))
    : null,
};

const adminAuthSlice = createSlice({
  name: "adminauth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
  
      if (action.payload.token) {
        
        state.adminInfo = action.payload;
        localStorage.setItem("adminInfo", JSON.stringify(action.payload));

        const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000; 
        localStorage.setItem("expirationTime", expirationTime);
      } else {
   
        state.adminInfo = null;
        localStorage.removeItem("adminInfo");
        localStorage.removeItem("expirationTime");
      }
    },
    logout: (state) => {
      state.adminInfo = null;
      localStorage.clear();
    },
  },
});

export const { setCredentials, logout } = adminAuthSlice.actions;

export default adminAuthSlice.reducer;
