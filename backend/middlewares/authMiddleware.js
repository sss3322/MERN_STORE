
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import Shop from "../models/shopModel.js";
import asyncHandler from "./asyncHandler.js";


const authenticate = asyncHandler(async (req, res, next) => {
  let token;

 
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      
      if (decoded.userType === 'regular') {
        req.user = await User.findById(decoded.userId).select("-password");
      } else if (decoded.userType === 'shopOwner') {
        req.shop = await Shop.findById(decoded.userId).select("-password");
      } else if (decoded.userType === 'admin') {
        req.admin = await User.findById(decoded.userId).select("-password");
      }

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed.");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token.");
  }
});

const authorizeAdmin = (req, res, next) => {
  if (req.admin && req.admin.isAdmin) {
    next();
  } else {
    res.status(401).send("Not authorized as an admin.");
  }
};

const authorizeShopOwner = (req, res, next) => {
  if (req.shop) {
    next();
  } else {
    res.status(401).send("Not authorized as a shop owner.");
  }
};

export { authenticate, authorizeAdmin, authorizeShopOwner };
