// import { Link } from "react-router-dom";
// import plane from "../assets/plane1.jpg";

// const Home = () => {
//   return (
//     <div className="min-h-screen ">
//       {/* Hero Section */}
      
//       <section 
//         className="relative bg-cover bg-center bg-no-repeat min-h-screen flex items-center justify-center" 
//         style={{ backgroundImage: `url(${plane})` }}
//       >
//         <div className="absolute inset-0 bg-black bg-opacity-50"></div> {/* Overlay for better text visibility */}
//         <div className="relative text-center z-10 text-white">
//           <h1 className="text-4xl md:text-5xl font-bold mb-4">
//             Flight Price Prediction System
//           </h1>
//           <p className="text-lg md:text-xl mb-8">
//             Find the best time to book your flights and save on airfare!
//           </p>
//           <Link to="/price">
//             <button className="bg-blue-400 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-blue-300 transform hover:scale-105 transition">
//               Get Started
//             </button>
//           </Link>
//         </div>
//       </section>

//       {/* Feature Section */}
//       <section className="py-16">
//         <div className="container mx-auto px-4 text-center">
//           <h2 className="text-3xl font-semibold text-gray-800 mb-8">
//             Why Use Our Prediction System?
//           </h2>
//           <div className="grid md:grid-cols-3 gap-8">
//             <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
//               <div className="mb-4 text-blue-600">
//                 <i className="fas fa-chart-line text-4xl"></i>
//               </div>
//               <h3 className="text-xl font-bold text-blue-600 mb-4">
//                 Accurate Predictions
//               </h3>
//               <p>
//                 Our system provides accurate price predictions based on historical and real-time data.
//               </p>
//             </div>
//             <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
//               <div className="mb-4 text-blue-600">
//                 <i className="fas fa-user-friends text-4xl"></i>
//               </div>
//               <h3 className="text-xl font-bold text-blue-600 mb-4">
//                 User-Friendly Interface
//               </h3>
//               <p>
//                 Navigate through an intuitive interface that makes finding the best prices easy.
//               </p>
//             </div>
//             <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
//               <div className="mb-4 text-blue-600">
//                 <i className="fas fa-dollar-sign text-4xl"></i>
//               </div>
//               <h3 className="text-xl font-bold text-blue-600 mb-4">
//                 Save Money on Flights
//               </h3>
//               <p>
//                 Book flights at the right time to save money and travel more for less.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* How It Works Section */}
//       <section className="py-16 bg-gray-50">
//         <div className="container mx-auto px-4 text-center">
//           <h2 className="text-3xl font-semibold text-gray-800 mb-8">
//             How It Works
//           </h2>
//           <div className="grid md:grid-cols-3 gap-8">
//             <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
//               <div className="mb-4 text-blue-600">
//                 <i className="fas fa-plane-departure text-4xl"></i>
//               </div>
//               <h3 className="text-lg font-bold text-blue-600 mb-2">
//                 1. Enter Your Travel Details
//               </h3>
//               <p>Select your departure, destination, and preferred travel dates.</p>
//             </div>
//             <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
//               <div className="mb-4 text-blue-600">
//                 <i className="fas fa-database text-4xl"></i>
//               </div>
//               <h3 className="text-lg font-bold text-blue-600 mb-2">
//                 2. Analyze the Data
//               </h3>
//               <p>
//                 Our system analyzes historical and current flight prices to find trends.
//               </p>
//             </div>
//             <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
//               <div className="mb-4 text-blue-600">
//                 <i className="fas fa-check-circle text-4xl"></i>
//               </div>
//               <h3 className="text-lg font-bold text-blue-600 mb-2">
//                 3. Get Price Prediction
//               </h3>
//               <p>Receive the best time to book for optimal savings.</p>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;

import { Link } from "react-router-dom";
import plane from "../assets/plane1.jpg";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center bg-no-repeat min-h-screen flex items-center justify-center"
        style={{ backgroundImage: `url(${plane})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div> {/* Overlay */}
        <div className="relative text-center z-10 text-white">
          <h1
            className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-down"
            style={{ animationDelay: "0.3s" }}
          >
            Flight Price Prediction System
          </h1>
          <p
            className="text-lg md:text-xl mb-8 animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            Find the best time to book your flights and save on airfare!
          </p>
          <Link to="/price">
            <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:from-purple-500 hover:to-pink-500 transform hover:scale-105 transition-all duration-300">
              Get Started
            </button>
          </Link>
        </div>
        {/* Scroll Down Indicator */}
        <div className="absolute bottom-8 text-white animate-bounce">
          <i className="fas fa-chevron-down text-2xl"></i>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8">
            Why Use Our Prediction System?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "fas fa-chart-line",
                title: "Accurate Predictions",
                text: "Our system provides accurate price predictions based on historical and real-time data.",
              },
              {
                icon: "fas fa-user-friends",
                title: "User-Friendly Interface",
                text: "Navigate through an intuitive interface that makes finding the best prices easy.",
              },
              {
                icon: "fas fa-dollar-sign",
                title: "Save Money on Flights",
                text: "Book flights at the right time to save money and travel more for less.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-2"
              >
                <div
                  className={`mb-4 text-blue-600 ${feature.icon}`}
                  style={{ fontSize: "3rem" }}
                ></div>
                <h3 className="text-xl font-bold text-blue-600 mb-4">
                  {feature.title}
                </h3>
                <p>{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8">
            How It Works
          </h2>
          <div className="relative grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "fas fa-plane-departure",
                title: "1. Enter Your Travel Details",
                text: "Select your departure, destination, and preferred travel dates.",
              },
              {
                icon: "fas fa-database",
                title: "2. Analyze the Data",
                text: "Our system analyzes historical and current flight prices to find trends.",
              },
              {
                icon: "fas fa-check-circle",
                title: "3. Get Price Prediction",
                text: "Receive the best time to book for optimal savings.",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-2"
              >
                <div
                  className={`mb-4 text-blue-600 ${step.icon}`}
                  style={{ fontSize: "3rem" }}
                ></div>
                <h3 className="text-lg font-bold text-blue-600 mb-2">
                  {step.title}
                </h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
