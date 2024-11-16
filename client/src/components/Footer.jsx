import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-center items-center space-x-10">
        
        {/* Contact Information */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="font-bold">Flight Price Predictor</p>
          <p>123 Aviation Road, Suite 100</p>
          <p>Phone: (123) 456-7890</p>
          <p>Email: contact@flightpricepredictor.com</p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col space-y-2 ">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/about" className="hover:underline">About Us</Link>
          <Link to="/price-view" className="hover:underline">Price View</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
