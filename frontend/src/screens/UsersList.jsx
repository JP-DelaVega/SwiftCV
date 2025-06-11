import React, { useState } from "react";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserByIdMutation,
} from "../slices/UsersApiSlice";
import Navbar from "../components/Navbar";
import Pagination from "../components/pagination";
import { FaTrash, FaUndo } from "react-icons/fa";
import { toast } from "react-toastify";
function UsersList() {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState(""); // "", "admin", "user"

  const [deleteUser] = useDeleteUserMutation();
  const [updateUserById] = useUpdateUserByIdMutation();

  const { data, refetch, error, isLoading } = useGetUsersQuery({
    page: currentPage,
    limit: usersPerPage,
    search: searchTerm,
    role: roleFilter,
  });

  const users = data?.users || [];
  const totalPages = data?.totalPages || 1;

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUser(id);
    }
  };
  const handleUpdate = async (user) => {
    const updatedUser = {
      ...user,
      isActive: !user.isActive, // Toggle active status
    };
    try {
      if (window.confirm("Are you sure you want to delete this user?")) {
        await updateUserById(updatedUser).unwrap();
      }

      toast.success(
        user.isActive
          ? "User deleted successfully!"
          : "User recovered successfully!"
      );
    } catch (error) {
      console.error("Failed to update user:", error);
      alert("Failed to update user.");
    }
    refetch(); // Refresh the user list after update
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to page 1 on search
  };

  return (
    <div className="min-h-screen bg-gray-100 p-[20px] flex flex-col items-center">
      <Navbar />

      <div className="w-full max-w-3xl mt-[9vh] mb-6 flex flex-row justify-start items-start gap-4">
        {/* Search Input */}
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by name or email"
          className="w-full md:w-[60%] p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />

        {/* Role Filter Dropdown */}
        <select
          value={roleFilter}
          onChange={(e) => {
            setRoleFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-[35%] p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        >
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        <select
          value={roleFilter}
          onChange={(e) => {
            setRoleFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-[25%] p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        >
          <option value="">All Status</option>
          <option value="admin">Active</option>
          <option value="user">Inactive</option>
        </select>
        <button
          type="button"
          onClick={() => {
            setCurrentPage(1);
            setSearchTerm("");
            setRoleFilter("");
          }}
          disabled={isLoading}
          className="w-16 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Clear
        </button>
      </div>

      {isLoading && <div className="text-center">Loading...</div>}
      {error && (
        <div className="text-center text-red-500">Error: {error.message}</div>
      )}

      <div className="flex flex-row items-start justify-start min-h-[70vh] min-w-[85vw] rounded p-4 text-l pt-[5vh]">
        <ul className="flex flex-wrap">
          {users.map((user) => (
            <li
              key={user.id}
              className={`bg-white rounded m-2 p-4 shadow-md transition-shadow duration-300 min-h-[16vh] min-w-[17vw] ${
                !user.isActive ? "opacity-50 text-gray-400" : "hover:shadow-lg"
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <p className="text-lg font-semibold">{user.name}</p>
                {user.isActive ? (
                  <FaTrash
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                    title="Delete User"
                    onClick={() => handleUpdate(user)}
                  />
                ) : (
                  <FaUndo
                    className="text-green-500 hover:text-green-700 cursor-pointer"
                    title="Recover User"
                    onClick={() => handleUpdate(user)}
                  />
                )}
              </div>
              <p>Email: {user.email}</p>
              <div>
                Role:{" "}
                <span className={user.isAdmin ? "text-red-500" : ""}>
                  {user.isAdmin ? "Admin" : "User"}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default UsersList;
