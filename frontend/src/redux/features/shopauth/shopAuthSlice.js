import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shopInfo: localStorage.getItem("shopInfo")
    ? JSON.parse(localStorage.getItem("shopInfo"))
    : null,
};

const shopAuthSlice = createSlice({
  name: "shopauth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      
      if (action.payload.token) {
        
        state.shopInfo = action.payload;
        localStorage.setItem("shopInfo", JSON.stringify(action.payload));

        const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000; 
        localStorage.setItem("expirationTime", expirationTime);
      } else {
       
        state.shopInfo = null;
        localStorage.removeItem("shopInfo");
        localStorage.removeItem("expirationTime");
      }
    },
    logout: (state) => {
      state.shopInfo = null;
      localStorage.clear();
    },
  },
});

export const { setCredentials, logout } = shopAuthSlice.actions;

export default shopAuthSlice.reducer;
