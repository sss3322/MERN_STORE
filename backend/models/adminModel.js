import mongoose from "mongoose";

const adminSchema =  mongoose.Schema(
  {
    adminname: {
      type: String,
      required: true
     
    },
    adminemail: {
      type: String,
      required: true,
      unique: true,
      
    },
    adminpassword: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
