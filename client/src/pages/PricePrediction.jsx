import { useState } from "react";

const PricePrediction = () => {
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    date: "",
    time: "",
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
    const selectedDate = new Date(formData.date);
    const selectedTime = new Date(`${formData.date}T${formData.time}`);

    if (!formData.origin) newErrors.origin = "Origin is required";
    if (!formData.destination) newErrors.destination = "Destination is required";
    if (formData.origin && formData.destination && formData.origin === formData.destination) {
      newErrors.destination = "Origin and destination cannot be the same";
    }
    if (!formData.date) {
      newErrors.date = "Date is required";
    } else if (selectedDate < currentDate.setHours(0, 0, 0, 0)) {
      newErrors.date = "Date cannot be in the past";
    }
    if (!formData.time) {
      newErrors.time = "Time is required";
    } else if (selectedTime < new Date()) {
      newErrors.time = "Time cannot be in the past";
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

    try {
      const response = await fetch('API_BASE_URL/flight/predict', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        let errorMessage = "Something went wrong. Please try again.";
        if (response.status === 400) errorMessage = "Invalid input data. Please check your form.";
        else if (response.status === 404) errorMessage = "No flights found for the selected route.";
        else if (response.status === 500) errorMessage = "Internal server error. Please try later.";
        throw new Error(errorMessage);
      }

      const data = await response.json();

      if (!data.predictions || data.predictions.length === 0) {
        throw new Error("No predictions available for the selected criteria.");
      }

      setPredictions(data.predictions);
    } catch (error) {
      console.error("Error fetching predictions:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();  // Prevent the default behavior (form submission or page reload)
      handleSubmit(e); // Call the handleSubmit function
    }
  };

  const locations = ["Bangalore", "Delhi", "Kolkata", "Mumbai", "Cochin", "New Delhi", "Hyderabad"];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {/* Card Container */}
      <div className="w-full max-w-3xl bg-blue-200 p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}  onKeyDown={handleKeyDown}>
          {/* Header */}
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
            Predict Flight Prices
          </h2>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Origin */}
            <div className="relative">
              <label className="sr-only" htmlFor="origin">
                Origin
              </label>
              <select
                name="origin"
                value={formData.origin}
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select Origin</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
              {errors.origin && <p className="text-red-500 text-sm">{errors.origin}</p>}
            </div>

            {/* Destination */}
            <div className="relative">
              <label className="sr-only" htmlFor="destination">
                Destination
              </label>
              <select
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select Destination</option>
                {locations
                  .filter((loc) => loc !== formData.origin)
                  .map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
              </select>
              {errors.destination && <p className="text-red-500 text-sm">{errors.destination}</p>}
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="sr-only" htmlFor="date">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400"
                min={new Date().toISOString().split("T")[0]}
              />
              {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
            </div>

            <div>
              <label className="sr-only" htmlFor="time">
                Time
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400"
              />
              {errors.time && <p className="text-red-500 text-sm">{errors.time}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full md:w-auto bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-200"
              disabled={loading}
            >
              {loading ? "Predicting..." : "Predict"}
            </button>
          </div>
        </form>
      </div>

      {/* Predictions Section */}
      {predictions.length > 0 && (
        <div className="flex items-center justify-center py-12 px-4">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
            <h3 className="text-xl font-semibold mb-4">Predicted Prices</h3>
            <ul>
              {predictions.map((prediction, index) => (
                <li key={index} className="mb-4 p-4 border rounded-md">
                  <p className="text-lg font-semibold">{prediction.flightName}</p>
                  <p className="text-green-500">{prediction.price}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricePrediction;

