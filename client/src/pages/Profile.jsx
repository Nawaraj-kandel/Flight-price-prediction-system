import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthToken, getUserInfo } from "../Utils/auth"; // Import getUserInfo
import { API_BASE_URL } from "../Api/Api";

const Profile = () => {
  const [userBookings, setUserBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState(""); // Add email state
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = getUserInfo(); // Get user information
    setEmail(userInfo.email); // Set email state
    fetchUserBookings();
  }, []);

  const fetchUserBookings = async () => {
    setLoading(true);
    setError(null);

    try {
      const authToken = getAuthToken();
      console.log("Auth Token:", authToken); // Debugging log

      if (!authToken) {
        throw new Error("User not authenticated.");
      }

      const response = await fetch(`${API_BASE_URL}/flight/booked/logs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`,
        },
        credentials: 'include', // Include credentials in the request
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch booking history (Status: ${response.status})`);
      }

      const data = await response.json();
      console.log("API Data:", data); // Debugging log

      setUserBookings(data.data); // Set user bookings from the response data
    } catch (error) {
      console.error("Error fetching booking history:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = () => {
    navigate("/cancel-booking");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-2">Your Email:</h2>
        <p className="text-gray-800 mb-4">{email}</p> {/* Display email */}
        <h2 className="text-xl font-semibold mb-2">Your Booking History:</h2>
        <div className="border border-gray-300 p-4 h-64 overflow-auto">
          {loading ? (
            <p className="text-gray-800">Loading...</p>
          ) : error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : userBookings.length > 0 ? (
            <ul className="text-gray-800">
              {userBookings.map((booking, index) => (
                <li key={index} className="p-2 border-b">
                  <strong>ID:</strong> {booking._id} | <strong>Flight:</strong> {booking.airline} | <strong>Origin:</strong> {booking.origin} | <strong>Destination:</strong> {booking.destination} | <strong>Departure:</strong> {new Date(booking.departure_time).toLocaleString()} | <strong>Arrival:</strong> {new Date(booking.arrival_time).toLocaleString()} | <strong>Price:</strong> {booking.predicted_price}
                  <button
                    onClick={handleCancelBooking}
                    className="ml-4 p-2 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600"
                  >
                    Cancel Flight
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No bookings found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;