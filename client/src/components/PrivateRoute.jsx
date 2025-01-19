import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../Utils/auth";

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};
console.log("Checking authentication status...");
console.log("isAuthenticated:", isAuthenticated());


// Define PropTypes
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired, // Ensure children is a valid React node and required
};

export default PrivateRoute;
