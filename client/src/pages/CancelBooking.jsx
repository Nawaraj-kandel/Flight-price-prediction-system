// import { useState } from "react";

// const Cancel = () => {
//   const [bookingId, setBookingId] = useState("");
//   const [confirmation, setConfirmation] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setBookingId(e.target.value);
//   };

//   const handleCancel = async (e) => {
//     e.preventDefault();
//     setError("");
//     setConfirmation("");

//     if (!bookingId.trim()) {
//       setError("Booking ID is required.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await fetch(import.meta.env.VITE_API_URL + `/cancel/${bookingId}`, {
//         method: "DELETE",
//       });

//       if (!response.ok) throw new Error("Cancellation failed. Try again.");
//       const data = await response.json();
//       setConfirmation(`Booking ID ${data.bookingId} has been cancelled successfully.`);
//       setBookingId("");
//     } catch (err) 
//     {
//         setError(err.message);
//       setError("An error occurred. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500">
//       <div className="w-full max-w-md bg-white p-5 rounded-xl shadow-2xl mt-10 mb-10">
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Cancel Your Booking</h2>
//         <form onSubmit={handleCancel} className="space-y-3">
//           <div className="mb-2">
//             <label className="block text-base font-medium text-gray-700">Booking ID</label>
//             <input
//               type="text"
//               name="bookingId"
//               value={bookingId}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded-lg"
//             />
//             {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold p-2 rounded-lg"
//             disabled={loading}
//           >
//             {loading ? "Cancelling..." : "Cancel Booking"}
//           </button>
//         </form>

//         {confirmation && <p className="text-green-500 text-center mt-3">{confirmation}</p>}
//       </div>
//     </div>
//   );
// };

// export default Cancel;
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
      console.log("Auth Token:", authToken);
      console.log("Entered Booking ID:", bookingId);

      // Call the cancellation API with the booking_id as a query parameter
      const cancelResponse = await fetch(`${API_BASE_URL}/flight/cancel?booking_id=${bookingId}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${authToken}`,
        },
        credentials: 'include',
      });

      console.log("Cancel Response Status:", cancelResponse.status);

      if (!cancelResponse.ok) {
        const errorData = await cancelResponse.json();
        throw new Error(errorData?.detail?.[0]?.msg || "Failed to cancel the booking.");
      }

      const cancelData = await cancelResponse.json();
      console.log("Cancellation Response:", cancelData);

      setMessage(`Booking with ID ${cancelData.booking_id} has been successfully canceled.`);

    } catch (error) {
      console.error("Error:", error);
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
              className={`w-full p-2 border rounded-lg ${message ? "border-red-500" : "border-gray-300"}`}
              required
            />
            {message && <p className="text-red-500 text-sm mt-1">{message}</p>}
          </div>
          <button
            type="submit"
            className={`w-full p-2 rounded-lg font-semibold text-white ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-purple-600 to-pink-600"
            }`}
            disabled={loading}
            aria-busy={loading}
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