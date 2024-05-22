import express from "express";
import formidable from "express-formidable";
import {
  createShop,
  loginShop,
  logoutCurrentShop,
  getAllShops,
  getCurrentSeller,
  updateCurrentSeller,
  getAllShopProducts,
  getShopOrders,
  calculateTotalSalesByShop,
  countTotalOrdersByShop,
  calculateTotalSalesByDateAndShop,
  addShopProduct,
  updateShopProductDetails,
  // addShopProduct
//   deleteShopById,
//   getShopById,
//   updateShopById,
} from "../controllers/shopController.js";

import { authenticate, authorizeAdmin, authorizeShopOwner } from "../middlewares/authMiddleware.js";
import { addProduct, fetchProductById, removeProduct, updateProductDetails } from "../controllers/productController.js";

const router = express.Router();

router
  .route("/")
  .post(createShop)
  .get(authenticate,authorizeShopOwner,getAllShops)


router.post("/auth", loginShop);
router.post("/logout", logoutCurrentShop);
router.get("/orders",authenticate,authorizeShopOwner,getShopOrders)
router.get("/products",authenticate,authorizeShopOwner,getAllShopProducts)
router.get("/total-shopsales",authenticate,authorizeShopOwner,calculateTotalSalesByShop)
router.get("/total-shoporders",authenticate,authorizeShopOwner,countTotalOrdersByShop)
router.get("/total-shopsales-by-date",authenticate,authorizeShopOwner, calculateTotalSalesByDateAndShop)
router.post("/createproduct",authenticate,authorizeShopOwner, formidable(),addShopProduct)
router.put("/update/:id",authenticate,authorizeShopOwner, formidable(),updateShopProductDetails)
router.delete("/delete/:id",authenticate,authorizeShopOwner,removeProduct)
router.get("/:id",authenticate,authorizeShopOwner,fetchProductById)


router
  .route("/profile")
  .get(authenticate, getCurrentSeller)
  .put(authenticate, updateCurrentSeller);
// router
//   .route("/products")
  // .get(authenticate,getAllShopProducts)


export default router;
