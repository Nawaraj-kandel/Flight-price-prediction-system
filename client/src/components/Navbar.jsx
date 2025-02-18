import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import menuIcon from "../assets/menu.png";
import logo from "../assets/logo.png";
import userIcon from "../assets/user.png"; // Added user icon image
import { isAuthenticated, logout } from "../Utils/auth";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); // State for user menu
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen((prev) => !prev);
  };

  const closeUserMenu = () => {
    setIsUserMenuOpen(false);
  };

  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
  }, []);

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    toast.info("You have been logged out.");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md p-4 text-gray-900 flex items-center justify-between relative">
      {/* Logo Section */}
      <div>
        <Link to="/" className="text-lg font-bold flex items-center space-x-2">
          <img src={logo} alt="logo" className="h-12 w-12" />
          <span>Flight Price Prediction</span>
        </Link>
      </div>

      {/* Centered Links - Visible only on medium and larger screens */}
      <ul className="hidden md:flex space-x-12">
        <li><Link to="/" className="hover:text-blue-500 text-lg font-semibold">Home</Link></li>
        <li><Link to="/about" className="hover:text-blue-500 text-lg font-semibold">About Us</Link></li>
        <li><Link to="/price" className="hover:text-blue-500 text-lg font-semibold">Price</Link></li>
      </ul>

      {/* Right-aligned Links and User Info */}
      <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          <div className="relative">
            <img
              src={userIcon}
              alt="User"
              className="h-8 w-8 rounded-full cursor-pointer"
              onClick={toggleUserMenu}
            />
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-20">
                <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={closeUserMenu}>Profile</Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="hidden md:inline-block focus:outline-none px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-700 transition"
          >
            Login
          </Link>
        )}

        {/* Mobile Menu Icon */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isOpen ? (
            <span className="text-xl font-bold">X</span>
          ) : (
            <img src={menuIcon} alt="Menu" className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu - Dropdown */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden z-10">
          <ul className="flex flex-col items-center space-y-4 py-4">
            <li><Link to="/" onClick={toggleMenu} className="hover:text-blue-500">Home</Link></li>
            <li><Link to="/about" onClick={toggleMenu} className="hover:text-blue-500">About Us</Link></li>
            <li><Link to="/price" onClick={toggleMenu} className="hover:text-blue-500">Price</Link></li>
            {isLoggedIn ? (
              <li>
                <button onClick={handleLogout} className="focus:outline-none bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Logout</button>
              </li>
            ) : (
              <li>
                <Link to="/login" onClick={toggleMenu} className="focus:outline-none bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Login</Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;