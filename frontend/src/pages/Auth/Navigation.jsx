import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/userApiSlice";
import { logout } from "../../redux/features/auth/userAuthSlice";
import FavoritesCount from "../Products/FavoritesCount";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.userauth);
  const { adminInfo } = useSelector((state) => state.adminauth);
  const { shopInfo } = useSelector((state) => state.shopauth);
  const { cartItems } = useSelector((state) => state.cart);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{ zIndex: 9999 }}
      className="xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-black bg-[#fff] w-[6%] hover:w-[15%] h-[100vh] fixed transition-all duration-300"
      id="navigation-container"
    >
      <div className="flex flex-col justify-center space-y-2">
        <Link to="/" className="nav-item flex items-center transition-transform transform hover:translate-x-2">
          <AiOutlineHome className="mr-2 mt-[1rem]" size={26} />
          <span className="hidden nav-item-name mt-[1rem]">HOME</span>
        </Link>

        <Link to="/shop" className="nav-item flex items-center transition-transform transform hover:translate-x-2">
          <AiOutlineShopping className="mr-2 mt-[1rem]" size={26} />
          <span className="hidden nav-item-name mt-[1rem]">SHOP</span>
        </Link>

        <Link to="/cart" className="nav-item flex relative">
          <div className="flex items-center transition-transform transform hover:translate-x-2">
            <AiOutlineShoppingCart className="mt-[1rem] mr-2" size={26} />
            <span className="hidden nav-item-name mt-[1rem]">Cart</span>
          </div>

          <div className="absolute top-4 right-0">
            {cartItems.length > 0 && (
              <span>
                <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </span>
              </span>
            )}
          </div>
        </Link>

        <Link to="/favorite" className="nav-item flex relative">
          <div className="flex justify-center items-center transition-transform transform hover:translate-x-2">
            <FaHeart className="mt-[1rem] mr-2" size={20} />
            <span className="hidden nav-item-name mt-[1rem]">Favorites</span>
            <FavoritesCount />
          </div>
        </Link>
      </div>

      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center text-gray-800 focus:outline-none"
        >
          {userInfo ? (
            <span className="text-black">{userInfo.username}</span>
          ) : adminInfo ? (
            <span className="text-black">{adminInfo.username}</span>
          ) : shopInfo ? (
            <span className="text-black">{shopInfo.shopname}</span>
          ) : (
            <></>
          )}
          {(userInfo || adminInfo || shopInfo) && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ml-1 ${dropdownOpen ? "transform rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
            </svg>
          )}
        </button>

        {dropdownOpen && userInfo && (
  <ul className="absolute right-0 bottom-full mb-2 space-y-2 bg-white text-black w-48">
    <li>
      <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
        Profile
      </Link>
    </li>
    <li>
      <button onClick={logoutHandler} className="block w-full px-4 py-2 text-left hover:bg-gray-100">
        Logout
      </button>
    </li>
  </ul>
)}

{dropdownOpen && adminInfo && (
  <ul className="absolute right-0 bottom-full mb-2 space-y-2 bg-white text-black w-48">
    <li>
      <Link to="/admin/dashboard" className="block px-4 py-2 hover:bg-gray-100">
        Dashboard
      </Link>
    </li>
    <li>
      <Link to="/admin/productlist" className="block px-4 py-2 hover:bg-gray-100">
        Create Product
      </Link>
    </li>
    <li>
      <Link to="/admin/allproductslist" className="block px-4 py-2 hover:bg-gray-100">
        All Products
      </Link>
    </li>
    <li>
      <Link to="/admin/orderlist" className="block px-4 py-2 hover:bg-gray-100">
        Orders
      </Link>
    </li>
    <li>
      <Link to="/admin/userlist" className="block px-4 py-2 hover:bg-gray-100">
        All Users
      </Link>
    </li>
    <li>
      <Link to="/admin/profile" className="block px-4 py-2 hover:bg-gray-100">
        Profile
      </Link>
    </li>
    <li>
      <button onClick={logoutHandler} className="block w-full px-4 py-2 text-left hover:bg-gray-100">
        Logout
      </button>
    </li>
  </ul>
)}

{dropdownOpen && shopInfo && (
  <ul className="absolute right-0 bottom-full mb-2 space-y-2 bg-white text-black w-48">
    <li>
      <Link to="/seller/dashboard" className="block px-4 py-2 hover:bg-gray-100">
        Dashboard
      </Link>
    </li>
    <li>
      <Link to="/seller/createproduct" className="block px-4 py-2 hover:bg-gray-100">
        Create Product
      </Link>
    </li>
    <li>
      <Link to="/seller/allproducts" className="block px-4 py-2 hover:bg-gray-100">
        All Products
      </Link>
    </li>
    <li>
      <Link to="/seller/orderlist" className="block px-4 py-2 hover:bg-gray-100">
        Orders
      </Link>
    </li>
    <li>
      <Link to="/seller-profile" className="block px-4 py-2 hover:bg-gray-100">
        Profile
      </Link>
    </li>
    <li>
      <button onClick={logoutHandler} className="block w-full px-4 py-2 text-left hover:bg-gray-100">
        Logout
      </button>
    </li>
  </ul>
)}

        {!(userInfo || adminInfo || shopInfo) && (
          <ul>
            <li>
              <Link to="/login" className="nav-item flex items-center mt-4 transition-transform transform hover:translate-x-2">
                <AiOutlineLogin className="mr-2" size={26} />
                <span className="hidden nav-item-name">User Login</span>
              </Link>
            </li>
            
            <li>
              <Link to="/admin-login" className="nav-item flex items-center mt-4 transition-transform transform hover:translate-x-2">
                <AiOutlineLogin className="mr-2" size={26} />
                <span className="hidden nav-item-name">Admin Login</span>
              </Link>
            </li>
           
            <li>
              <Link to="/seller-login" className="nav-item flex items-center mt-4 transition-transform transform hover:translate-x-2">
                <AiOutlineLogin className="mr-2" size={26} />
                <span className="hidden nav-item-name">Shop Login</span>
              </Link>
            </li>
            
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navigation;
