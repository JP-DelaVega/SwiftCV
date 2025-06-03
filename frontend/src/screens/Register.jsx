import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../slices/UsersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState({
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userinfo } = useSelector((state) => state.auth);
  const [register, { isLoading }] = useRegisterMutation();

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";
  useEffect(() => {
    if (userinfo) {
      navigate(redirect);
    }
  }, [userinfo, navigate, redirect]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.password !== password.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    } else {
      try {
        const res = await register({ name, email, password:password.password }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Register successful!");
        navigate(redirect);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  const slideAnimation = {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
    transition: { duration: 0.5, ease: "easeInOut" },
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <motion.div {...slideAnimation} className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">
        {/* SwiftCV Logo/Image */}

        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Create an account
        </h2>

        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="John Doe"
            />

            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password.password}
              onChange={(e) => {setPassword((prev) => ({
                ...prev,
                password: e.target.value,
              }));}}
              required
              placeholder="••••••••"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password.confirmPassword}
              onChange={(e) => {setPassword((prev) => ({
                ...prev,
                confirmPassword: e.target.value,
              }));}}
              required
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Register
          </button>
          {isLoading && (
            <div className="mt-4 text-center">
              <span className="text-gray-600">Loading...</span>
            </div>
          )}
          <div className="w-full text-center mt-4 flex justify-center items-center space-x-2">
            <p className="text-gray-700">Already have an account?</p>
            <button
              type="button"
              onClick={() => navigate(redirect?`/login?redirect=${redirect}`:'/login')}
              disabled={isLoading}
              className="text-blue-600 hover:text-red-500 transition"
            >
              Sign In
            </button>
          </div>
        </form>
      </motion.div >
    </div>
  );
};

export default Register;
