import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEditUserMutation } from "../slices/UsersApiSlice";
import Navbar from "../components/Navbar";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [editUser, { isLoading }] = useEditUserMutation();

  const [isEditPassword, setIsEditPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name || "");
      setEmail(userInfo.email || "");
    }
  }, [userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      (password || confirmPassword) &&
      password !== confirmPassword &&
      isEditPassword
    ) {
      toast.error("Passwords do not match");
      return;
    }

    const updatedData = {
      _id: userInfo._id,
      name,
      email,
    };

    if (password) updatedData.password = password;

    try {
      const res = await editUser(updatedData).unwrap();
      dispatch(setCredentials(res));
      toast.success("Profile updated successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error || "Update failed.");
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="min-h-screen flex justify-center items-center px-4 bg-gray-100">
        <div className="bg-white p-10 rounded-xl shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Edit Profile
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Name */}
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            {/* Email */}
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {isEditPassword ? (
              <>
                {/* Password */}
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Leave blank to keep current"
                />

                {/* Confirm Password */}
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-6"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat new password"
                />
              </>
            ) : (
              <button
                type="submit"
                onClick={() =>
                  setIsEditPassword(true)
                }
                disabled={isLoading}
                className="text-grey py-2 text-blue-500 hover:text-red-500 transition"
              >
                Change password
              </button>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
