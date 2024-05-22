import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route } from "react-router-dom";

const AuthRoute = ({ type, ...props }) => {
  const { userInfo, shopInfo } = useSelector((state) => ({
    userInfo: state.userauth.userInfo,
    shopInfo: state.shopauth.shopInfo,
  }));

  // Check if user or seller is logged in
  const isAuthenticated =
    (type === "user" && userInfo) || (type === "seller" && shopInfo);

  return isAuthenticated ? <Navigate to="/dashboard" /> : <Route {...props} />;
};

export default AuthRoute;
