import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white text-black py-4 shadow-lg  border-t border-gray-300 ">
      <div className=" mx-auto px-4 flex flex-col md:flex-row justify-center items-center space-x-10">
        
        {/* Contact Information */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="font-bold">Flight Price Predictor</p>
          <p>Email: contact@flightpricepredictor.com</p>
          
        </div>

        {/* Quick Links */}
        <div className="flex flex-col font-semibold space-y-2 px-10 ">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/about" className="hover:underline">About Us</Link>
          <Link to="price" className="hover:underline">Price View</Link>
        </div>
        
      </div>
      <div>

          <p className="text-sm flex justify-center pt-4">
                    © {new Date().getFullYear()} Flight Price Predictor. All Rights Reserved.
                </p>

          </div>
    </footer>
  );
};

export default Footer;


