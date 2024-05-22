import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useShopRegisterMutation } from "../../redux/api/shopApiSlice";
import { setCredentials } from "../../redux/features/shopauth/shopAuthSlice";
import { toast } from "react-toastify";

const SellerRegister = () => {
  const [shopname, setShopName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [shopRegister, { isLoading }] = useShopRegisterMutation();

  const { shopInfo } = useSelector((state) => state.shopauth);

  useEffect(() => {
    if (shopInfo) {
      navigate("/seller-login");
    }
  }, [navigate, shopInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await shopRegister({ shopname, email, password, description, address, phoneNumber }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/seller-login"); 
      toast.success("Shop successfully registered");
    } catch (err) {
      console.log(err);
      toast.error(err.data.message || 'Registration failed');
    }
  };

  return (
    <section className="pl-[10rem] flex flex-wrap">
      <div className="mr-[4rem] mt-[5rem]">
        <h1 className="text-2xl font-semibold mb-4">Shop Registration</h1>

        <form onSubmit={submitHandler} className="container w-[40rem]">
          <div className="my-[2rem]">
            <label htmlFor="shopname" className="block text-sm font-medium text-white">Shop Name</label>
            <input
              type="text"
              id="shopname"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter shop name"
              value={shopname}
              onChange={(e) => setShopName(e.target.value)}
            />
          </div>

          <div className="my-[2rem]">
            <label htmlFor="email" className="block text-sm font-medium text-white">Email Address</label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="my-[2rem]">
            <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="my-[2rem]">
            <label htmlFor="description" className="block text-sm font-medium text-white">Description</label>
            <textarea
              id="description"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter shop description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="my-[2rem]">
            <label htmlFor="address" className="block text-sm font-medium text-white">Address</label>
            <input
              type="text"
              id="address"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter shop address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="my-[2rem]">
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-white">Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>

          {isLoading && <Loader />}
        </form>

        <div className="mt-4">
          <p className="text-black">
            Already have an account?{" "}
            <Link
              to="/seller-login"
              className="text-pink-500 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SellerRegister;
