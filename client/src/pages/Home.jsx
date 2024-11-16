import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen mt-10">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Flight Price Prediction System</h1>
          <p className="text-lg md:text-xl mb-8">
            Find the best time to book your flights and save on airfare!
          </p>
          <Link to="/price-view">
            <button className="bg-yellow-400 text-blue-600 font-semibold px-6 py-3 rounded-full hover:bg-yellow-300">
              Get Started
            </button>
          </Link>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8">Why Use Our Prediction System?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-blue-600 mb-4">Accurate Predictions</h3>
              <p>Our system provides accurate price predictions based on historical and real-time data.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-blue-600 mb-4">User-Friendly Interface</h3>
              <p>Navigate through an intuitive interface that makes finding the best prices easy.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-blue-600 mb-4">Save Money on Flights</h3>
              <p>Book flights at the right time to save money and travel more for less.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-blue-600 mb-2">1. Enter Your Travel Details</h3>
              <p>Select your departure, destination, and preferred travel dates.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-blue-600 mb-2">2. Analyze the Data</h3>
              <p>Our system analyzes historical and current flight prices to find trends.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-blue-600 mb-2">3. Get Price Prediction</h3>
              <p>Receive the best time to book for optimal savings.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
