import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import menuIcon from "../assets/menu.png";
import logo from "../assets/logo.png";
import { isAuthenticated, logout } from "../Utils/auth"; // Importing utilities
import { toast } from "react-toastify";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // To handle redirects

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  // Check if the user is authenticated
  useEffect(() => {
    setIsLoggedIn(isAuthenticated()); // Set login state based on authentication status
  }, []);

  // Handle logout
  const handleLogout = () => {
    logout(); // Clear token
    setIsLoggedIn(false); // Update local state to reflect logged out status
    toast.info("You have been logged out.");
    navigate("/login"); // Redirect to login page using React Router
  };

  return (
    <nav className="bg-blue-600 p-4 text-white flex items-center justify-between relative">
      {/* Logo Section */}
      <div>
        <Link to="/" className="text-lg font-bold flex items-center space-x-2">
          <img src={logo} alt="logo" className="h-12 w-12" />
          <span>Flight Price Prediction</span>
        </Link>
      </div>

      {/* Centered Links - Visible only on medium and larger screens */}
      <ul className="hidden md:flex space-x-8">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/price">Price</Link></li>
      </ul>

      {/* Right-aligned Links */}
      <div className="flex items-center space-x-4">
        {/* Conditional rendering of Login/Logout button */}
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="hidden md:inline-block focus:outline-none px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-700 transition"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="hidden md:inline-block focus:outline-none px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-700 transition"
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
        <div className="absolute top-16 left-0 w-full bg-blue-600 md:hidden z-10">
          <ul className="flex flex-col items-center space-y-4 py-4">
            <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
            <li><Link to="/about" onClick={toggleMenu}>About Us</Link></li>
            <li><Link to="/price" onClick={toggleMenu}>Price</Link></li>
            {isLoggedIn ? (
              <li><button onClick={handleLogout} className="focus:outline-none bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-700 transition">Logout</button></li>
            ) : (
              <li><Link to="/login" onClick={toggleMenu} className="focus:outline-none bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-700 transition">Login</Link></li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
