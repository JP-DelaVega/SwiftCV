import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/UsersApiSlice';
import { setCredentials } from '../slices/authSlice';

import { toast } from 'react-toastify';
const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const {userinfo} = useSelector((state) => state.auth);
  const {search} = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userinfo) {
      navigate(redirect);
    }
  }, [userinfo, navigate, redirect]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success('Login successful!');
      navigate(redirect);
    }
    catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">
        {/* SwiftCV Logo/Image */}
        
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Welcome to SwiftCV</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
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
            <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
