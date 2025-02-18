import { useState } from "react";

const Cancel = () => {
  const [bookingId, setBookingId] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setBookingId(e.target.value);
  };

  const handleCancel = async (e) => {
    e.preventDefault();
    setError("");
    setConfirmation("");

    if (!bookingId.trim()) {
      setError("Booking ID is required.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + `/cancel/${bookingId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Cancellation failed. Try again.");
      const data = await response.json();
      setConfirmation(`Booking ID ${data.bookingId} has been cancelled successfully.`);
      setBookingId("");
    } catch (err) 
    {
        setError(err.message);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500">
      <div className="w-full max-w-md bg-white p-5 rounded-xl shadow-2xl mt-10 mb-10">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Cancel Your Booking</h2>
        <form onSubmit={handleCancel} className="space-y-3">
          <div className="mb-2">
            <label className="block text-base font-medium text-gray-700">Booking ID</label>
            <input
              type="text"
              name="bookingId"
              value={bookingId}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold p-2 rounded-lg"
            disabled={loading}
          >
            {loading ? "Cancelling..." : "Cancel Booking"}
          </button>
        </form>

        {confirmation && <p className="text-green-500 text-center mt-3">{confirmation}</p>}
      </div>
    </div>
  );
};

export default Cancel;
