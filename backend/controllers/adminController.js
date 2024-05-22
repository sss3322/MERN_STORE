import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";
import User from "../models/userModel.js";
import Shop from "../models/shopModel.js";

const createAdmin = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new Error("Please fill all the inputs.");
  }

  const adminExists = await User.findOne({ email });
  if (adminExists) {
    res.status(400).send("Admin already exists");
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newAdmin = new User({
    username,
    email,
    password: hashedPassword,
    isAdmin: true, 
  });

  try {
    await newAdmin.save();

    res.status(201).json({
      _id: newAdmin._id,
      username: newAdmin.username,
      email: newAdmin.email,
      isAdmin: newAdmin.isAdmin,
    });
  } catch (error) {
    res.status(400);
    throw new Error("Invalid admin data");
  }
});

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const existingAdmin = await User.findOne({ email });

  if (existingAdmin) {
    const isPasswordValid = await bcrypt.compare(password, existingAdmin.password);

    if (isPasswordValid && existingAdmin.isAdmin) {
      const token = createToken(res, existingAdmin._id, 'admin');

      res.status(201).json({
        _id: existingAdmin._id,
        username: existingAdmin.username,
        email: existingAdmin.email,
        isAdmin: existingAdmin.isAdmin,
        token: token
      });
      return;
    }
  }

  res.status(401).json({ message: "Invalid email or password" });
});

const logoutCurrentAdmin = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ isAdmin: false }).select("-password");
  res.json(users);
});

const getAllShops = asyncHandler(async (req, res) => {
  const shops = await Shop.find({}).select("-adminpassword");
  res.json(shops);
});

const getCurrentAdminProfile = asyncHandler(async (req, res) => {
  const admin = await User.findById(req.user._id).select("-password");

  if (admin && admin.isAdmin) {
    res.json({
      _id: admin._id,
      username: admin.username,
      email: admin.email,
    });
  } else {
    res.status(404);
    throw new Error("Admin not found.");
  }
});

const updateCurrentAdminProfile = asyncHandler(async (req, res) => {
  const admin = await User.findById(req.user._id);

  if (admin && admin.isAdmin) {
    admin.username = req.body.username || admin.username;
    admin.email = req.body.email || admin.email;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      admin.password = hashedPassword;
    }

    const updatedAdmin = await admin.save();

    res.json({
      _id: updatedAdmin._id,
      username: updatedAdmin.username,
      email: updatedAdmin.email,
      isAdmin: updatedAdmin.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("Admin not found");
  }
});

const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Cannot delete admin user");
    }

    await User.deleteOne({ _id: user._id });
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  createAdmin,
  loginAdmin,
  logoutCurrentAdmin,
  getAllUsers,
  getAllShops,
  getCurrentAdminProfile,
  updateCurrentAdminProfile,
  deleteUserById,
  getUserById,
  updateUserById,
};
