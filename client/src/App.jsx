import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Aboutus from "./pages/Aboutus";
import Footer from "./components/Footer";;
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure Toastify styles are imported
import PricePrediction from "./pages/PricePrediction";
import Booking from "./pages/Booking";
import Terms from "./components/Terms";
import PrivateRoute from "./components/PrivateRoute";


function App() {
  return (
    

    <Router>
      <ToastContainer />
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Aboutus />} />
          {/* <Route path="/price" element={<PricePrediction />} /> */}
          <Route path="/terms" element={<Terms />} />
          <Route path="/login" element={<Login />} />
          <Route path="/price" element={  <PrivateRoute> <PricePrediction /> </PrivateRoute> } />
       
          <Route path="/booking" element={<Booking />} />
        </Routes>
      </div>
      <Footer />
    </Router>
            
  );
}

export default App;
