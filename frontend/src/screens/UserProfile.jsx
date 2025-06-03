import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  useEditUserMutation,
  useGetUserProfileQuery,
} from "../slices/UsersApiSlice";
import Navbar from "../components/Navbar";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [editUser, { isLoading }] = useEditUserMutation();

  // No argument here, and no array destructuring, just get data directly:
  const { data: userProfile, refetch } = useGetUserProfileQuery();
  const [isEditPassword, setIsEditPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Populate form once profile data is fetched
  useEffect(() => {
    if (userProfile) {
      setName(userProfile.name || "");
      setEmail(userProfile.email || "");
    }
  }, [userProfile]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      isEditPassword &&
      (password || confirmPassword) &&
      password !== confirmPassword
    ) {
      toast.error("Passwords do not match");
      return;
    }

    const updatedData = {
      _id: userProfile._id,
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
      <Navbar />
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

            {/* Toggle Password Edit */}
            {!isEditPassword && (
              <button
                type="button"
                onClick={() => setIsEditPassword(true)}
                className="mb-4 text-sm text-blue-600 hover:text-red-500 transition"
              >
                Change password
              </button>
            )}

            {isEditPassword && (
              <>
                {/* New Password */}
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
            )}

            {/* Submit Button */}
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
