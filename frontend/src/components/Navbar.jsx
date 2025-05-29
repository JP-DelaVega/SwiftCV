import { UserCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md py-4 px-8 flex justify-between items-center z-50">
      {/* Title */}
      <div className="text-2xl font-bold text-gray-800">
        SwiftCV
      </div>

      {/* Navigation Links */}
      <div className="flex items-center space-x-8">
      <Link
          to="/"
          className="text-gray-600 hover:text-black transition text-md"
        >
          Home
        </Link>
      
        <Link
          to="/Templates" 
          className="text-gray-600 hover:text-black transition text-md"
        >
          Resume Templates
        </Link> 

        {/* Profile Button */}
        <Link 
          to="/Login"
          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-full transition">
          <UserCircle className="h-5 w-5" />
          Profile
        </Link>
      </div>
    </nav>
  );
}
