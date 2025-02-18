import { useState } from "react";
import { getAuthToken } from "../Utils/auth"; 
import { API_BASE_URL } from "../Api/Api";

const CancelBooking = () => {
  const [bookingId, setBookingId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setBookingId(e.target.value);
  };

  const validate = () => {
    const newErrors = {};
    if (!bookingId.trim()) newErrors.bookingId = "Booking ID is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setMessage(validationErrors.bookingId);
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const authToken = getAuthToken();
      console.log("Auth Token:", authToken); // Debugging log
      console.log("Booking ID:", bookingId); // Debugging log
      const response = await fetch(`${API_BASE_URL}/flight/cancel/${bookingId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`,
        },
      });

      console.log("Response Status:", response.status); // Debugging log
      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData); // Debugging log
        throw new Error(errorData.detail || "Failed to cancel the booking.");
      }

      const data = await response.json();
      console.log("API Response Data:", data); // Debugging log
      setMessage(`Booking with ID ${data.id} has been successfully canceled.`);
    } catch (error) {
      console.error("Error canceling booking:", error);
      setMessage(error.message || "No booking found. Please check the booking ID and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-5">Cancel Flight Booking</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-base font-medium text-gray-700">Booking ID</label>
            <input
              type="text"
              name="booking_id"
              value={bookingId}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full p-2 rounded-lg font-semibold text-white ${
              loading ? "bg-gray-400" : "bg-gradient-to-r from-purple-600 to-pink-600"
            }`}
            disabled={loading}
          >
            {loading ? "Canceling..." : "Cancel Booking"}
          </button>
        </form>
        {message && <p className="text-center mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default CancelBooking;