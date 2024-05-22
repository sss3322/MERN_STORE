import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";


import Register from "./pages/Auth/Register";

import AdminRoute from "./pages/Admin/AdminRoute";
import Profile from "./pages/User/Profile";
import UserList from "./pages/Admin/UserList";

import CategoryList from "./pages/Admin/CategoryList";

import ProductList from "./pages/Admin/ProductList.jsx";
import AllProducts from "./pages/Admin/AllProducts";
import ProductUpdate from "./pages/Admin/ProductUpdate";

import Home from "./pages/Home.jsx";
import Favorites from "./pages/Products/Favorites.jsx";
import ProductDetails from "./pages/Products/ProductDetails.jsx";

import Cart from "./pages/Cart.jsx";
import Shop from "./pages/Shop.jsx";

import Shipping from "./pages/Orders/Shipping.jsx";
import PlaceOrder from "./pages/Orders/PlaceOrder.jsx";
import Order from "./pages/Orders/Order.jsx";
import OrderList from "./pages/Admin/OrderList.jsx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import UserLogin from "./pages/Auth/UserLogin.jsx";
import SellerLogin from "./pages/Auth/sellerLogin.jsx";
import SellerProfile from "./pages/Seller/SellerProfile.jsx";
import SellerOrderList from "./pages/Seller/SellerOrderList.jsx";
import SellerDashboard from "./pages/Seller/SellerDashboard.jsx";
import SellerProduct from "./pages/Seller/sellerProductList.jsx";
import AllShopProducts from "./pages/Seller/sellerAllShopProducts.jsx";
import SellerProductUpdate from "./pages/Seller/SellerProductUpdate.jsx";
import AdminProfile from "./pages/Admin/AdminProfile.jsx";
import AdminLogin from "./pages/Auth/AdminLogin.jsx";
import AdminRegister from "./pages/Auth/AdminRegister.jsx";
import SellerRegister from "./pages/Auth/SellerRegister.jsx";
import UserOrder from "./pages/User/UserOrder.jsx";



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<UserLogin/>} />
      <Route path="/seller-login" element={<SellerLogin/>} />
      <Route path="/seller-register" element={<SellerRegister/>} />
      <Route path="/register" element={<Register/>} />
      <Route index={true} path="/" element={<Home />} />
      <Route path="/favorite" element={<Favorites />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/seller-profile" element={<SellerProfile/>} />
      <Route path="/seller/orderlist" element={<SellerOrderList/>} />
      <Route path="/seller/dashboard" element={<SellerDashboard/>} />
      <Route path="/seller/createproduct" element={<SellerProduct/>} />
      <Route path="/seller/allproducts" element={<AllShopProducts/>} />
      <Route path="/seller/product/update/:_id" element={<SellerProductUpdate/>} />
      
      <Route path="/admin/profile" element={<AdminProfile/>} />
      <Route path="/user-orders" element={<UserOrder/>} />
      <Route path="/order/:id" element={<Order />} />

     
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
        
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
       
        
      </Route>
      <Route path="/admin-login" element={<AdminLogin/>} />
      <Route path="/admin-register" element={<AdminRegister/>} />
      <Route path="/admin" element={<AdminRoute />}>
      
      
        <Route path="userlist" element={<UserList />} />
        <Route path="categorylist" element={<CategoryList />} />
        <Route path="productlist" element={<ProductList />} />
        <Route path="allproductslist" element={<AllProducts />} />
        <Route path="productlist/:pageNumber" element={<ProductList />} />
        <Route path="product/update/:_id" element={<ProductUpdate />} />
        <Route path="orderlist" element={<OrderList />} />
        <Route path="dashboard" element={<AdminDashboard />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PayPalScriptProvider>
      <RouterProvider router={router} />
    </PayPalScriptProvider>
  </Provider>
);