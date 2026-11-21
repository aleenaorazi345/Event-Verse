import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth"; // Ensure path is correct
import NotificationBell from "./NotificationBell";
import { LogOut } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-600">
        EventVerse
      </Link>

      <div className="flex items-center gap-6">
        <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">
          Dashboard
        </Link>

        {user ? (
          <div className="flex items-center gap-4">
            {/* 🔔 Bell Icon */}
            <NotificationBell /> 

            <span className="text-sm font-semibold text-gray-700">
              {user.name} ({user.role})
            </span>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-red-600 hover:text-red-700"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;