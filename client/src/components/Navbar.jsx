
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import menuIcon from '../assets/menu.png'; // Import the custom menu image
// import logo from '../assets/logo.png';

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const navigate = useNavigate();

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   // Handle View Price button/link click based on authentication
//   const handleViewPriceClick = () => {
//     const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
//     if (isAuthenticated) {
//       navigate("/price-view"); // Navigate to Price View if logged in
//     } else {
//       navigate("/login", { state: { fromViewPrice: true } }); // Redirect to login with intent to view price
//     }
//   };

//   return (
//     <nav className="bg-blue-600 p-2 text-white flex items-center justify-between">
//       {/* Logo Section */}
//       <div>
//         <Link to="/" className="text-lg font-bold flex items-center space-x-2 mx-6">
//           <img src={logo} alt="logo" className="h-14 w-16" />
//           Flight Price Prediction
//         </Link>
//       </div>

//       {/* Centered Links - Visible only on medium and larger screens */}
//       <ul className="hidden md:flex space-x-10">
//         <li><Link to="/">Home</Link></li>
//         <li><Link to="/about">About Us</Link></li>
//         <li><button onClick={handleViewPriceClick} className="focus:outline-none">Price View</button></li>
//       </ul>

//       {/* Right-aligned Links */}
//       <div className="flex items-center space-x-4 mx-8">
//         <Link to="/login">Login</Link>

//         {/* Mobile Menu Icon */}
//         <button className="md:hidden" onClick={toggleMenu}>
//           {isOpen ? (
//             <span className="text-xl font-bold">X</span> // Close icon as "X"
//           ) : (
//             <img src={menuIcon} alt="Menu" className="h-6 w-6" />
//           )}
//         </button>
//       </div>

//       {/* Mobile Menu - Dropdown */}
//       {isOpen && (
//         <div className="absolute top-16 left-0 w-full bg-blue-600 md:hidden">
//           <ul className="flex flex-col items-center space-y-4 py-4">
//             <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
//             <li><Link to="/about" onClick={toggleMenu}>About Us</Link></li>
//             <li><button onClick={() => { handleViewPriceClick(); toggleMenu(); }} className="focus:outline-none">Price View</button></li>
//           </ul>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import menuIcon from '../assets/menu.png';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check authentication status on component mount
  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true");
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Handle View Price button/link click based on authentication
  const handleViewPriceClick = () => {
    if (isAuthenticated) {
      navigate("/price-view"); // Navigate to Price View if logged in
    } else {
      navigate("/login", { state: { fromViewPrice: true } }); // Redirect to login with intent to view price
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 p-2 text-white flex items-center justify-between">
      {/* Logo Section */}
      <div>
        <Link to="/" className="text-lg font-bold flex items-center space-x-2 mx-6">
          <img src={logo} alt="logo" className="h-14 w-16" />
          Flight Price Prediction
        </Link>
      </div>

      {/* Centered Links - Visible only on medium and larger screens */}
      <ul className="hidden md:flex space-x-10">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><button onClick={handleViewPriceClick} className="focus:outline-none">Price View</button></li>
      </ul>

      {/* Right-aligned Links */}
      <div className="flex items-center space-x-4 mx-8">
        {isAuthenticated ? (
          <button onClick={handleLogout} className="focus:outline-none bg-red-500 px-3 py-1 rounded-lg hover:bg-red-600 transition">Logout</button>
        ) : (
          <Link to="/login" className="focus:outline-none px-3 py-1 rounded-lg hover:bg-green-600 transition">Login</Link>
        )}

        {/* Mobile Menu Icon */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isOpen ? (
            <span className="text-xl font-bold">X</span> // Close icon as "X"
          ) : (
            <img src={menuIcon} alt="Menu" className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu - Dropdown */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-blue-600 md:hidden">
          <ul className="flex flex-col items-center space-y-4 py-4">
            <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
            <li><Link to="/about" onClick={toggleMenu}>About Us</Link></li>
            <li><button onClick={() => { handleViewPriceClick(); toggleMenu(); }} className="focus:outline-none">Price View</button></li>
            <li>
              {isAuthenticated ? (
                <button onClick={() => { handleLogout(); toggleMenu(); }} className="focus:outline-none bg-red-500 px-3 py-1 rounded-lg hover:bg-red-600 transition">Logout</button>
              ) : (
                <Link to="/login" onClick={toggleMenu} className="focus:outline-none bg-green-500 px-3 py-1 rounded-lg hover:bg-green-600 transition">Login</Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
