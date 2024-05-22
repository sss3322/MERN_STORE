import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useAdminRegisterMutation } from "../../redux/api/adminApiSlice";
import { setCredentials } from "../../redux/features/adminauth/adminAuthSlice";
import { toast } from "react-toastify";

const AdminRegister = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [adminRegister, { isLoading }] = useAdminRegisterMutation();

  const { adminInfo } = useSelector((state) => state.adminauth);

  useEffect(() => {
    if (adminInfo) {
      navigate("/admin-login");
    }
  }, [navigate, adminInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await adminRegister({ username, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/admin-login"); // Redirect to admin login page after successful registration
      toast.success("Admin successfully registered");
    } catch (err) {
      console.log(err);
      toast.error(err.data.message || 'Registration failed');
    }
  };

  return (
    <section className="pl-[10rem] flex flex-wrap">
      <div className="mr-[4rem] mt-[5rem]">
        <h1 className="text-2xl font-semibold mb-4">Admin Registration</h1>

        <form onSubmit={submitHandler} className="container w-[40rem]">
          <div className="my-[2rem]">
            <label htmlFor="username" className="block text-sm font-medium text-white">Admin Name</label>
            <input
              type="text"
              id="username"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter admin name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              to="/admin-login"
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

export default AdminRegister;
