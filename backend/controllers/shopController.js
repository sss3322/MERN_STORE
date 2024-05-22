import Shop from "../models/shopModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";
import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";

function calcPrices(orderItems) {
  const itemsPrice = orderItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxRate = 0.15;
  const taxPrice = (itemsPrice * taxRate).toFixed(2);

  const totalPrice = (
    itemsPrice +
    shippingPrice +
    parseFloat(taxPrice)
  ).toFixed(2);

  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice,
    totalPrice,
  };
}

const createShop = asyncHandler(async (req, res) => {
  const { shopname, email, password,description,address,phoneNumber} = req.body;

  if (!shopname || !email || !password||!description||!address||!phoneNumber) {
    throw new Error("Please fill all the required inputs.");
  }

  const shopExists = await Shop.findOne({ email });
  if (shopExists) {
    res.status(400).send("Shop already exists");
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newShop = new Shop({ 
    shopname, 
    email, 
    password: hashedPassword,
    description,
    address,
    phoneNumber
   
  });

  try {
    await newShop.save();
    

    res.status(201).json({
      _id: newShop._id,
      shopname: newShop.shopname,
      email: newShop.email,
      description: newShop.description,
      address: newShop.address,
      phoneNumber: newShop.phoneNumber
    
    });
  } catch (error) {
    res.status(400);
    throw new Error("Invalid shop data");
  }
});

const loginShop = asyncHandler(async (req, res) => {
  const { email,password } = req.body;

  const existingShop = await Shop.findOne({ email });

  if (existingShop) {
    const PasswordValid = await bcrypt.compare(
      password,
      existingShop.password
    );

    if (PasswordValid) {
      const token=createToken(res, existingShop._id, 'shopOwner');

      res.status(201).json({
        _id: existingShop._id,
        shopname: existingShop.shopname,
        email: existingShop.email,
        description: existingShop.description,
        address: existingShop.address,
        phoneNumber: existingShop.phoneNumber,
        token:token
       
      });
      return;
    }
  }

  res.status(401).json({ message: "Invalid email or password" });
});

const logoutCurrentShop = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
});

// Add other shop controller methods (getAllShops, getShopById, updateShopById, deleteShopById)
const getAllShops = asyncHandler(async (req, res) => {
  const shops = await Shop.find({});
  res.json(shops);
});
const getCurrentSeller = asyncHandler(async (req, res) => {
  const shop = await Shop.findById(req.shop._id);

  if (shop) {
    res.json({
      _id: shop._id,
      shopname: shop.shopname,
      email: shop.email,
      description:shop.description
    });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

const updateCurrentSeller = asyncHandler(async (req, res) => {
  const shop = await Shop.findById(req.shop._id);

  if (shop) {
    shop.shopname = req.body.shopname || shop.shopname;
    shop.email = req.body.email || shop.email;
    shop.description=req.body.description||shop.description;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
    }

    const updatedShop = await shop.save();

    res.json({
      _id: updatedShop._id,
      shopname: updatedShop.shopname,
      email: updatedShop.email,
      description:updatedShop.description
      // isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const getAllShopProducts = asyncHandler(async (req, res) => {

  const shopname = req.shop.shopname; 
 const products = await Product.find({ shopname });
 res.json(products);
  
});
const getShopOrders= async (req, res) => {
  try {
    const { shopname } = req.shop 
    console.log("req.shop")
    const orders = await Order.find({ "orderItems.shopname": shopname  });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const calculateTotalSalesByShop = async (req, res) => {
  try {
    const shopname = req.shop.shop;
    const orders = await Order.find({ shopname });
    const totalSales = orders.reduce((sum, order) => sum + order.totalPrice, 0);
    res.json({ totalSales });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const countTotalOrdersByShop = async (req, res) => {
  try {
    const shopname = req.shop;
    const totalOrders = await Order.countDocuments({ shopname });
    res.json({ totalOrders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const calculateTotalSalesByDateAndShop = async (req, res) => {
  try {
    const shopname = req.shop;
    const salesByDate = await Order.aggregate([
      {
        $match: {
          shopname,
          isPaid: true,
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$paidAt" },
          },
          totalSales: { $sum: "$totalPrice" },
        },
      },
    ]);
    res.json(salesByDate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const addShopProduct = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, quantity, brand } = req.fields;
    
    // Get shopname from the logged-in seller's information if available
    const shopname = req.shop.shopname;

    // Validation
    const requiredFields = ['name', 'description', 'price', 'category', 'quantity', 'brand'];
    for (const field of requiredFields) {
      if (!req.fields[field]) {
        return res.status(400).json({ error: `${field.charAt(0).toUpperCase() + field.slice(1)} is required` });
      }
    }

    // Create product with shopname automatically added if available
    const productData = { ...req.fields };
    if (shopname) {
      productData.shopname = shopname;
    }

    const product = new Product(productData);
    await product.save();

    // Include shopname in the response
    res.json({ ...product._doc});
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});
const updateShopProductDetails = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, quantity, brand} = req.fields;

    // Validation
    switch (true) {
      case !name:
        return res.json({ error: "Name is required" });
      case !brand:
        return res.json({ error: "Brand is required" });
      case !description:
        return res.json({ error: "Description is required" });
      case !price:
        return res.json({ error: "Price is required" });
      case !category:
        return res.json({ error: "Category is required" });
      case !quantity:
        return res.json({ error: "Quantity is required" });
        
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.fields },
      { new: true }
    );

    await product.save();

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});




export {
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
  // removeShopProduct
};
