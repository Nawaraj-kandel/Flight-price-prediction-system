// // import { Link } from "react-router-dom";
// // import plane from "../assets/plane1.jpg";

// // const Home = () => {
// //   return (
// //     <div className="min-h-screen">
// //       {/* Hero Section */}
// //       <section
// //         className="relative bg-cover bg-center bg-no-repeat min-h-screen flex items-center justify-center"
// //         style={{ backgroundImage: `url(${plane})` }}
// //       >
// //         <div className="absolute inset-0 bg-black bg-opacity-60"></div> {/* Overlay */}
// //         <div className="relative text-center z-10 text-white">
// //           <h1
// //             className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-down"
// //             style={{ animationDelay: "0.3s" }}
// //           >
// //             Flight Price Prediction System
// //           </h1>
// //           <p
// //             className="text-lg md:text-xl mb-8 animate-fade-in-up"
// //             style={{ animationDelay: "0.6s" }}
// //           >
// //             Find the best time to book your flights and save on airfare!
// //           </p>
// //           <Link to="/price">
// //             <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:from-purple-500 hover:to-pink-500 transform hover:scale-105 transition-all duration-300">
// //               Get Started
// //             </button>
// //           </Link>
// //         </div>
// //         {/* Scroll Down Indicator */}
// //         <div className="absolute bottom-8 text-white animate-bounce">
// //           <i className="fas fa-chevron-down text-2xl"></i>
// //         </div>
// //       </section>

// //       {/* Feature Section */}
// //       <section className="py-16 bg-gradient-to-r from-gray-50 to-gray-100">
// //         <div className="container mx-auto px-4 text-center">
// //           <h2 className="text-3xl font-semibold text-gray-800 mb-8">
// //             Why Use Our Prediction System?
// //           </h2>
// //           <div className="grid md:grid-cols-3 gap-8">
// //             {[
// //               {
// //                 icon: "fas fa-chart-line",
// //                 title: "Accurate Predictions",
// //                 text: "Our system provides accurate price predictions based on historical and real-time data.",
// //               },
// //               {
// //                 icon: "fas fa-user-friends",
// //                 title: "User-Friendly Interface",
// //                 text: "Navigate through an intuitive interface that makes finding the best prices easy.",
// //               },
// //               {
// //                 icon: "fas fa-dollar-sign",
// //                 title: "Save Money on Flights",
// //                 text: "Book flights at the right time to save money and travel more for less.",
// //               },
// //             ].map((feature, index) => (
// //               <div
// //                 key={index}
// //                 className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-2"
// //               >
// //                 <div
// //                   className={`mb-4 text-blue-600 ${feature.icon}`}
// //                   style={{ fontSize: "3rem" }}
// //                 ></div>
// //                 <h3 className="text-xl font-bold text-blue-600 mb-4">
// //                   {feature.title}
// //                 </h3>
// //                 <p>{feature.text}</p>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* How It Works Section */}
// //       <section className="py-16 bg-gradient-to-r from-purple-50 to-blue-50">
// //         <div className="container mx-auto px-4 text-center">
// //           <h2 className="text-3xl font-semibold text-gray-800 mb-8">
// //             How It Works
// //           </h2>
// //           <div className="relative grid md:grid-cols-3 gap-8">
// //             {[
// //               {
// //                 icon: "fas fa-plane-departure",
// //                 title: "1. Enter Your Travel Details",
// //                 text: "Select your departure, destination, and preferred travel dates.",
// //               },
// //               {
// //                 icon: "fas fa-database",
// //                 title: "2. Analyze the Data",
// //                 text: "Our system analyzes historical and current flight prices to find trends.",
// //               },
// //               {
// //                 icon: "fas fa-check-circle",
// //                 title: "3. Get Price Prediction",
// //                 text: "Receive the best time to book for optimal savings.",
// //               },
// //             ].map((step, index) => (
// //               <div
// //                 key={index}
// //                 className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-2"
// //               >
// //                 <div
// //                   className={`mb-4 text-blue-600 ${step.icon}`}
// //                   style={{ fontSize: "3rem" }}
// //                 ></div>
// //                 <h3 className="text-lg font-bold text-blue-600 mb-2">
// //                   {step.title}
// //                 </h3>
// //                 <p>{step.text}</p>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>
// //     </div>
// //   );
// // };

// // export default Home;

import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-6">
        <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
           Flight Price Prediction System
        </h1>
        <p className="text-lg text-gray-700 mt-4 max-w-2xl">
          Get predictions on flight prices and book at the best time to save money. Experience seamless and intelligent booking.
        </p>
        <Link to="/price">
          <button className="mt-6 px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition">
            Get Started
          </button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
            Why Choose Our System?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "AI-Powered Accuracy",
                text: "Our advanced algorithm analyzes historical and real-time data for precise predictions.",
              },
              {
                title: "User-Friendly Experience",
                text: "Easily navigate and get the best prices with an intuitive interface.",
              },
              {
                title: "Save More on Travel",
                text: "Book smarter and cut your travel costs significantly.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition transform hover:-translate-y-2"
              >
                <h3 className="text-xl font-bold text-blue-600 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-700">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50 ">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "1. Enter Travel Details",
                text: "Select your departure, destination, and travel dates.",
              },
              {
                title: "2. Analyze Data",
                text: "Our AI reviews historical trends and live prices.",
              },
              {
                title: "3. Get Smart Predictions",
                text: "Find the perfect time to book your flight at the best price.",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-2"
              >
                <h3 className="text-lg font-bold text-blue-600 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-700">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

     
    </div>
  );
};

export default Home;
