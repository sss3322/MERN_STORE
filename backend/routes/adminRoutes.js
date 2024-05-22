import express from "express";
import {
  createAdmin,
  loginAdmin,
  logoutCurrentAdmin,
  getAllUsers,
  getCurrentAdminProfile,
  updateCurrentAdminProfile,
  deleteUserById,
  getUserById,
  updateUserById,
  getAllShops,

} from "../controllers/adminController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  router.post("/create",createAdmin);
  router.get("/users",authenticate, authorizeAdmin, getAllUsers);
  router.get("/shops",authenticate, authorizeAdmin, getAllShops);
  
  

router.post("/login", loginAdmin);
router.post("/logout", logoutCurrentAdmin);


router
  .route("/profile")
  .get(authenticate, getCurrentAdminProfile)
  .put(authenticate, updateCurrentAdminProfile);


router
  .route("/:id")
  .delete(authenticate, authorizeAdmin, deleteUserById)
  .get(authenticate, authorizeAdmin, getUserById)
  .put(authenticate, authorizeAdmin, updateUserById);

export default router;