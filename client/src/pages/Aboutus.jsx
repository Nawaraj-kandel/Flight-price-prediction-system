
const Aboutus = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-4">
      {/* Main Container */}
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-blue-700 text-center mb-6 md:mb-10">
          Flight Price Prediction System
        </h1>

        {/* Description */}
        <div className="space-y-4 text-gray-700 text-base md:text-lg leading-relaxed">
          <p>
            Welcome to the Flight Price Prediction System! Our mission is to help travelers plan
            their trips more effectively by providing accurate predictions of airline ticket prices.
            Our system utilizes data analysis, machine learning, and statistical modeling techniques
            to examine historical flight data and forecast future prices.
          </p>
          <p>
            Our model considers key parameters like the number of stops, journey day, journey month,
            airline type (e.g., Air India, IndiGo), source, destination, and more to predict flight
            prices. After training this model using a powerful machine learning algorithm—the Random
            Forest Regressor—we fine-tune it using hyperparameter tuning to achieve a high level of
            accuracy.
          </p>
          <p>
            This system is designed to assist not only travelers but also travel agencies and
            airlines in refining their pricing strategies. We are committed to providing reliable
            and insightful price forecasts to enhance travel planning for everyone.
          </p>
        </div>
        </div>
      </div>
    
  );
};

export default Aboutus;

// import { useEffect, useState } from "react";
// import { API_BASE_URL } from "../Api/Api";

// const Aboutus = () => {
//   const [airlines, setAirlines] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch airline data from the API
//   useEffect(() => {
//     const fetchAirlines = async () => {
//       try {
//         const response = await fetch(`${API_BASE_URL}/flight/airlines`, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch airlines");
//         }

//         const data = await response.json();
//         setAirlines(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAirlines();
//   }, []);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-4">
//       {/* Main Container */}
//       <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
//         {/* Title */}
//         <h1 className="text-3xl md:text-4xl font-bold text-blue-700 text-center mb-6 md:mb-10">
//           Flight Price Prediction System
//         </h1>

//         {/* Description */}
//         <div className="space-y-4 text-gray-700 text-base md:text-lg leading-relaxed">
//           <p>
//             Welcome to the Flight Price Prediction System! Our mission is to help travelers plan
//             their trips more effectively by providing accurate predictions of airline ticket prices.
//             Our system utilizes data analysis, machine learning, and statistical modeling techniques
//             to examine historical flight data and forecast future prices.
//           </p>
//           <p>
//             Our model considers key parameters like the number of stops, journey day, journey month,
//             airline type (e.g., Air India, IndiGo), source, destination, and more to predict flight
//             prices. After training this model using a powerful machine learning algorithm—the Random
//             Forest Regressor—we fine-tune it using hyperparameter tuning to achieve a high level of
//             accuracy.
//           </p>
//           <p>
//             This system is designed to assist not only travelers but also travel agencies and
//             airlines in refining their pricing strategies. We are committed to providing reliable
//             and insightful price forecasts to enhance travel planning for everyone.
//           </p>
//         </div>

//         {/* Partner Airlines Section */}
//         <div className="mt-8">
//           <h2 className="text-2xl font-bold text-blue-700 text-center mb-4">Our Partner Airlines</h2>

//           {/* Loading and Error States */}
//           {loading ? (
//             <p className="text-gray-700 text-center">Loading airlines...</p>
//           ) : error ? (
//             <p className="text-red-500 text-center">{error}</p>
//           ) : (
//             // Display Airlines in a Responsive Grid
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//               {airlines.map((airline, index) => (
//                 <div
//                   key={index}
//                   className="bg-blue-50 p-4 rounded-lg shadow-md text-center flex items-center justify-center"
//                 >
//                   <p className="text-lg font-semibold text-gray-700">{airline}</p>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Aboutus;