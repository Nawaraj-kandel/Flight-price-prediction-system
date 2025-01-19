
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Viewprice = () => {
  const navigate = useNavigate();

  // Initialize state for form data, predicted price, and error handling
  const [formData, setFormData] = useState({
    departureDate: "",
    arrivalDate: "",
    source: "",
    destination: "",
    stoppage: "Non-Stop",
    airline: "",
  });
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [error, setError] = useState(null);

  // Effect hook to check if the user is authenticated, otherwise redirect to login
  useEffect(() => {
    const auth = localStorage.getItem("authToken");
    if (!auth) {
      navigate("/login"); // Redirect to login if not authenticated
    }
  }, [navigate]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to send POST request and retrieve predicted price
  const handlePredict = async () => {
    try {
      // Send formData to the backend for prediction
      const response = await fetch("http://your-backend-url/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Check if response is okay
      if (response.ok) {
        const result = await response.json();
        setPredictedPrice(result.price); // Assuming 'price' is the backend response key
        setError(null); // Clear any previous error
      } else {
        setError("Error fetching prediction. Please try again.");
        setPredictedPrice(null);
      }
    } catch (error) {
      setError("Failed to connect to server. Please check your connection."+error);
      setPredictedPrice(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-8">
          Flight Price Prediction
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Departure Date */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-600">Departure Date</label>
            <input
              type="datetime-local"
              name="departureDate"
              value={formData.departureDate}
              onChange={handleChange}
              className="mt-2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Arrival Date */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-600">Arrival Date</label>
            <input
              type="datetime-local"
              name="arrivalDate"
              value={formData.arrivalDate}
              onChange={handleChange}
              className="mt-2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Source */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-600">Source</label>
            <select
              name="source"
              value={formData.source}
              onChange={handleChange}
              className="mt-2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Source</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi</option>
              {/* Add more options as needed */}
            </select>
          </div>

          {/* Destination */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-600">Destination</label>
            <select
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              className="mt-2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Destination</option>
              <option value="Delhi">Delhi</option>
              <option value="Mumbai">Mumbai</option>
              {/* Add more options as needed */}
            </select>
          </div>

          {/* Stoppage */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-600">Stoppage</label>
            <select
              name="stoppage"
              value={formData.stoppage}
              onChange={handleChange}
              className="mt-2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Non-Stop">Non-Stop</option>
              <option value="1 Stop">1 Stop</option>
              <option value="2+ Stops">2+ Stops</option>
            </select>
          </div>

          {/* Airline */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-600">Select Airline</label>
            <select
              name="airline"
              value={formData.airline}
              onChange={handleChange}
              className="mt-2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Airline</option>
              <option value="IndiGo">IndiGo</option>
              <option value="Air India">Air India</option>
              {/* Add more options as needed */}
            </select>
          </div>
        </div>

        {/* Predict Button */}
        <div className="mt-6 text-center">
          <button
            onClick={handlePredict}
            className="px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
          >
            Predict
          </button>
        </div>

        {/* Display Predicted Price or Error Message */}
        {predictedPrice !== null && (
          <div className="mt-6 text-center text-xl font-semibold text-gray-800">
            Your Flight Price is Rs. {predictedPrice}
          </div>
        )}
        {error && (
          <div className="mt-4 text-center text-red-600 font-semibold">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default Viewprice;
