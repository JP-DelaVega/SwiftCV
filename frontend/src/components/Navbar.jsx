import { useState } from 'react';
import { UserCircle, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation }  from '../slices/UsersApiSlice';
import { logout } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async() => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/Login');
      toast.success('Logout successful');
    }
    catch (error) {
      toast.error('Logout failed:', error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md py-4 px-8 flex justify-between items-center z-50">
      {/* Title */}
      <div className="text-2xl font-bold text-gray-800">SwiftCV</div>

      {/* Navigation Links */}
      <div className="flex items-center space-x-8 relative">
        <Link to="/" className="text-gray-600 hover:text-black transition text-md">
          Home
        </Link>

        <Link to="/Templates" className="text-gray-600 hover:text-black transition text-md">
          Resume Templates
        </Link>

        {/* Authenticated Dropdown */}
        {userInfo ? (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-full transition"
            >
              <UserCircle className="h-5 w-5" />
              <span>{userInfo.name}</span>
              <ChevronDown className="h-4 w-4" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          // Unauthenticated Profile Button
          <Link
            to="/Login"
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-full transition"
          >
            <UserCircle className="h-5 w-5" />
            Profile
          </Link>
        )}
      </div>
    </nav>
  );
}
