import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { getAuthToken, getUserInfo } from "../Utils/auth";
import { API_BASE_URL } from "../Api/Api";

const Profile = () => {
  const [userBookings, setUserBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [selectedBookingId, setSelectedBookingId] = useState(null); // Track selected booking for cancellation
  const [showConfirmModal, setShowConfirmModal] = useState(false); // Modal visibility

  useEffect(() => {
    const userInfo = getUserInfo();
    setEmail(userInfo.email);
    fetchUserBookings();
  }, []);

  const fetchUserBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const authToken = getAuthToken();
      if (!authToken) throw new Error("User not authenticated.");

      const response = await fetch(`${API_BASE_URL}/flight/booked/logs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`,
        },
        // credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch booking history (Status: ${response.status})`);
      }

      const data = await response.json();
      setUserBookings(data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const confirmCancellation = (bookingId) => {
    setSelectedBookingId(bookingId);
    setShowConfirmModal(true);
  };

  const handleCancelBooking = async () => {
    if (!selectedBookingId) {
      toast.error("Error: Booking ID is missing.");
      return;
    }

    try {
      const authToken = getAuthToken();
      const response = await fetch(`${API_BASE_URL}/flight/cancel?booking_id=${selectedBookingId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`,
        },
        credentials: "include",
        body: JSON.stringify({ booking_id: selectedBookingId }),
      });

      if (!response.ok) {
        const responseText = await response.text();
        let errorData;
        try {
          errorData = JSON.parse(responseText);
        } catch {
          console.error("API Error (Raw Text):", responseText);
        }

        if (errorData?.detail === "Flight already cancelled") {
          toast.info("This flight has already been cancelled.");
        } else {
          throw new Error(errorData?.detail?.[0]?.msg || "Failed to cancel the booking.");
        }
      } else {
        toast.success("Your flight has been successfully canceled.");
        fetchUserBookings(); // Refresh booking list
      }
    } catch (error) {
      setError(error.message || "Something went wrong. Please try again.");
    } finally {
      setSelectedBookingId(null);
      setShowConfirmModal(false); // Close modal
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-2">Your Email:</h2>
        <p className="text-gray-800 mb-4">{email}</p>
        <h2 className="text-xl font-semibold mb-2">Your Booking History:</h2>
        <div className="border border-gray-300 p-4 h-80 overflow-auto">
          {loading ? (
            <p className="text-gray-800">Loading...</p>
          ) : error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : userBookings.length > 0 ? (
            <table className="min-w-full bg-white table-auto">
              <thead>
                <tr>
                  <th className="py-2 px-4">Booking ID</th>
                  <th className="py-2 px-4">Flight</th>
                  <th className="py-2 px-4">Origin</th>
                  <th className="py-2 px-4">Destination</th>
                  <th className="py-2 px-4">Departure</th>
                  <th className="py-2 px-4">Arrival</th>
                  <th className="py-2 px-4">Price</th>
                  <th className="py-2 px-4">Status</th>
                  <th className="py-2 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {userBookings
                  .sort((a, b) => {
                    const aDepartureTime = new Date(a.flight_details.departure_time);
                    const bDepartureTime = new Date(b.flight_details.departure_time);

                    if (!a.cancelled && b.cancelled) return -1;
                    if (a.cancelled && !b.cancelled) return 1;
                    return bDepartureTime - aDepartureTime;
                  })
                  .map((booking, index) => {
                    const currentTime = new Date();
                    const departureTime = new Date(booking.flight_details.departure_time);
                    return (
                      <tr key={index} className="border-b">
                        <td className="py-2 px-4">{booking._id}</td>
                        <td className="py-2 px-4">{booking.flight_details.airline}</td>
                        <td className="py-2 px-4">{booking.flight_details.origin}</td>
                        <td className="py-2 px-4">{booking.flight_details.destination}</td>
                        <td className="py-2 px-4">{departureTime.toLocaleString()}</td>
                        <td className="py-2 px-4">{new Date(booking.flight_details.arrival_time).toLocaleString()}</td>
                        <td className="py-2 px-4">{booking.flight_details.predicted_price}</td>
                        <td className="py-2 px-4">{booking.cancelled ? <span className="text-red-500">Cancelled</span> : ""}</td>
                        <td className="py-2 px-6">
                          {!booking.cancelled && currentTime < departureTime && (
                            <button
                              onClick={() => confirmCancellation(booking._id)}
                              className="p-2 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600"
                            >
                              Cancel Flight
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">No bookings found.</p>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-bold">Cancel Booking</h2>
            <p className="text-gray-600 mt-2">Are you sure you want to cancel this flight?</p>
            <div className="flex justify-center space-x-4 mt-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                No, Keep It
              </button>
              <button
                onClick={handleCancelBooking}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;