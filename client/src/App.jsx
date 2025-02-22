import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Aboutus from "./pages/Aboutus";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import PricePrediction from "./pages/PricePrediction";
import Booking from "./pages/Booking";
import Terms from "./components/Terms";
import Signup from "./pages/Signup";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import CancelBooking from "./Cancel/CancelBooking";
import VerifyCode from "./pages/VerifyCode";


function App() {
  return (
    <Router>
      <ToastContainer />
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Aboutus />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/price" element={<PrivateRoute><PricePrediction /></PrivateRoute>} />
          <Route path="/booking" element={<PrivateRoute><Booking /></PrivateRoute>} />
          <Route path="/forgot-password" element={<ForgotPassword />} /> 
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/profile" element={ <PrivateRoute><Profile /> </PrivateRoute> } />
          <Route path="/cancel-booking" element={<PrivateRoute><CancelBooking /></PrivateRoute>} />
          <Route path="/reset-password" element={<VerifyCode />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;