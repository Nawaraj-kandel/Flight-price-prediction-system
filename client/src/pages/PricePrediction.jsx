import { useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../Api/Api";

const PricePrediction = () => {
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    departure_time: "",
    arrival_time: "",
    transit_count: "",
  });

  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    const currentDate = new Date();
    const departureDate = new Date(formData.departure_time);
    const arrivalDate = new Date(formData.arrival_time);

    if (!formData.origin) newErrors.origin = "Origin is required.";
    if (!formData.destination) newErrors.destination = "Destination is required.";
    if (formData.origin && formData.destination && formData.origin === formData.destination) {
      newErrors.destination = "Origin and destination cannot be the same.";
    }
    if (!formData.departure_time) {
      newErrors.departure_time = "Departure time is required.";
    } else if (departureDate < currentDate) {
      newErrors.departure_time = "Departure time cannot be in the past.";
    }
    if (!formData.arrival_time) {
      newErrors.arrival_time = "Arrival time is required.";
    } else if (arrivalDate <= departureDate) {
      newErrors.arrival_time = "Arrival time must be after departure time.";
    }
    if (formData.transit_count === "" || formData.transit_count < 0) {
      newErrors.transit_count = "Transit count is required and must be a non-negative number.";
    } else if (formData.transit_count > 4) {
      newErrors.transit_count = "Transit count cannot be greater than 4.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    setPredictions([]); // Clear previous predictions
    

    try {
      console.log("Form Data Sent to API:", formData);
      const response = await fetch(`${API_BASE_URL}/flight/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch predictions. Please try again.");
      }

      const data = await response.json();
      console.log("API Response Data:", data);
      if (!data.data || data.data.length === 0) {
        throw new Error("No predictions available for the selected criteria.");
      }

      setPredictions(data.data);
    } catch (error) {
      console.error("Error fetching predictions:", error);
      setErrors({ apiError: error.message });
    } finally {
      setLoading(false);
    }
  };

  const origin = ["Chennai", "Delhi", "Kolkata", "Mumbai"];
  const destination = ["Cochin", "Delhi", "Hyderabad","Kolkata", "New Delhi"];

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-200">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg mt-10">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Predict Flight Prices
          </h2>

          {/* Origin and Destination */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="origin" className="block text-sm font-medium text-gray-700 mb-2">
                Origin
              </label>
              <select
                name="origin"
                value={formData.origin}
                onChange={handleChange}
                className={`w-full p-3 border ${errors.origin ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none`}
              >
                <option value="">Select Origin</option>
                {origin.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
              {errors.origin && <p className="text-red-500 text-sm mt-1">{errors.origin}</p>}
            </div>

            <div>
              <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-2">
                Destination
              </label>
              <select
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                className={`w-full p-3 border ${errors.destination ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none`}
              >
                <option value="">Select Destination</option>
                {destination
                  .filter((loc) => loc !== formData.origin)
                  .map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
              </select>
              {errors.destination && <p className="text-red-500 text-sm mt-1">{errors.destination}</p>}
            </div>
          </div>

          {/* Departure and Arrival Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="departure_time" className="block text-sm font-medium text-gray-700 mb-2">
                Departure Time
              </label>
              <input
                type="datetime-local"
                name="departure_time"
                value={formData.departure_time}
                onChange={handleChange}
                className={`w-full p-3 border ${errors.departure_time ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none`}
              />
              {errors.departure_time && (
                <p className="text-red-500 text-sm mt-1">{errors.departure_time}</p>
              )}
            </div>

            <div>
              <label htmlFor="arrival_time" className="block text-sm font-medium text-gray-700 mb-2">
                Arrival Time
              </label>
              <input
                type="datetime-local"
                name="arrival_time"
                value={formData.arrival_time}
                onChange={handleChange}
                className={`w-full p-3 border ${errors.arrival_time ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none`}
              />
              {errors.arrival_time && (
                <p className="text-red-500 text-sm mt-1">{errors.arrival_time}</p>
              )}
            </div>
          </div>

          {/* Transit Count */}
          <div className="mb-6">
            <label htmlFor="transit_count" className="block text-sm font-medium text-gray-700 mb-2">
              Transit Count
            </label>
            <input
              type="number"
              name="transit_count"
              value={formData.transit_count}
              onChange={handleChange}
              className={`w-full p-3 border ${errors.transit_count ? "border-red-500" : "border-gray-300"
                } rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none`}
              placeholder="Enter Transit Count"
              min="0"
            />
            {errors.transit_count && (
              <p className="text-red-500 text-sm mt-1">{errors.transit_count}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-200"
              disabled={loading}
            >
              {loading ? "Predicting..." : "Predict"}
            </button>
          </div>
        </form>
      </div>

      {/* Loader */}
      {loading && (
        <div className="flex justify-center items-center mt-4">
          <div className="w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Predictions */}
      {predictions.length > 0 && (
        <div className="m-8 bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Predicted Prices</h3>
          <div className="overflow-y-auto max-h-80">
            <ul>
              {predictions.map((prediction, index) => (
                <li
                  key={index}
                  className="p-4 border-b last:border-b-0 flex items-center justify-between"
                >
                  {/* Flight Name */}
                  <p className="text-lg font-semibold text-gray-700 flex-1">{prediction.airline}</p>

                  {/* Price */}
                  <p className="text-green-600 font-medium text-lg flex-1 text-center">
                    Rs. {prediction.predicted_price}
                  </p>

                  {/* Book Button */}
                  <Link to="/booking" className="flex-1 text-right">
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-200">
                      Book
                    </button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* No Predictions Message */}
      {!loading && predictions.length === 0 && (
        window.scrollTo({ top: 0, behavior: "smooth" }),
        <div className="mt-8 mb-10 bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full">
          <div className="overflow-y-auto max-h-40 p-4">
            {errors.apiError ? (
              <p className="text-red-500">{errors.apiError}</p>
            ) : (
              <>
                <h3 className="text-xl font-semibold text-gray-800">No predictions found</h3>
                <p className="text-gray-600">Try adjusting your search criteria.</p>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default PricePrediction;
