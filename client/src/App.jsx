import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Viewprice from './pages/Viewprice';
import Aboutus from './pages/Aboutus';
import Footer from './components/Footer';
import VerifyCode from './pages/VerifyCode';
import ForgotPassword from './pages/Forgetpassword';

function App() {
  return (
    <Router>
      <Navbar />
      
      <div className="container mx-auto px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Aboutus />} />
          <Route path="/price-view" element={<Viewprice />} />
          <Route path="/login" element={<Login />} />
          <Route path="/VerifyCode" element={<VerifyCode />} />  
          <Route path="/ForgotPassword" element={<ForgotPassword />} />   
          
                



        </Routes>
      </div>
      <Footer/>
    </Router>
  );
}

export default App;
