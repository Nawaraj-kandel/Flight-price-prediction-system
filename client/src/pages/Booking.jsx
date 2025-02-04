import { useState, useEffect } from "react";

const Booking = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    flightNumber: "",
    date: "",
    time: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState("");
  const [minTime, setMinTime] = useState(""); // Tracks the minimum allowed time

  useEffect(() => {
    if (formData.date) {
      const today = new Date().toISOString().split("T")[0];
      if (formData.date === today) {
        // If today is selected, set min time to the current time
        const now = new Date();
        const currentTime = now.toTimeString().slice(0, 5); // Format: HH:MM
        setMinTime(currentTime);
      } else {
        // If a future date is selected, allow any time
        setMinTime("");
      }
    }
  }, [formData.date]); // Update minTime when the date changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    const now = new Date();
    const selectedDate = new Date(formData.date);
    const selectedTime = new Date(`${formData.date}T${formData.time}`);

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Phone number is invalid";
    if (!formData.flightNumber)
      newErrors.flightNumber = "Flight number is required";
    if (!formData.date) newErrors.date = "Date is required";

    // Check if the selected date is in the past
    if (selectedDate.setHours(0, 0, 0, 0) < now.setHours(0, 0, 0, 0)) {
      newErrors.date = "Date cannot be in the past";
    }

    if (!formData.time) newErrors.time = "Time is required";

    // Check if the selected time is in the past (only if today is selected)
    if (formData.date === now.toISOString().split("T")[0] && selectedTime < now) {
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
      const response = await fetch("https://your-backend-api.com/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to book the flight. Please try again.");
      }

      const data = await response.json();
      setConfirmation("Booking successful! Your booking ID is " + data.bookingId);
    } catch (error) {
      console.error("Error:", error);
      setConfirmation("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Get today's date to disable past dates
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r animate-gradient-x  from-blue-500  via-purple-500  to-pink-500">
      <div className="w-full max-w-md bg-white p-5 rounded-xl shadow-2xl transition-transform hover:scale-105 duration-300 mt-10 mb-10">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Book Your Flight
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          {[
            { label: "Name", type: "text", name: "name" },
            { label: "Email", type: "email", name: "email" },
            { label: "Phone Number", type: "text", name: "phone" },
            { label: "Flight Number", type: "text", name: "flightNumber" },
            { label: "Date", type: "date", name: "date" },
            { label: "Time", type: "time", name: "time" },
          ].map(({ label, type, name }) => (
            <div key={name} className="mb-2">
              <label className="block text-base font-medium text-gray-700">
                {label}
              </label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                min={name === "date" ? today : name === "time" ? minTime : undefined} // Disable past dates and set min time dynamically
                disabled={name === "time" && !formData.date} // Disable time input until date is selected
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none focus:border-purple-500 transition-shadow"
              />
              {errors[name] && (
                <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
              )}
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold p-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-md hover:shadow-lg"
            disabled={loading}
          >
            {loading ? "Booking..." : "Book Now"}
          </button>
        </form>
        {confirmation && (
          <p className="text-green-500 text-center mt-3">{confirmation}</p>
        )}
      </div>
    </div>
  );
};

export default Booking;
