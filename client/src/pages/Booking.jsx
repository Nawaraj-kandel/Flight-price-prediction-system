import { useState,  } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../Api/Api";
import { getAuthToken, getUserInfo } from "../Utils/auth";

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract flight details from URL and fallback to location.state
  const searchParams = new URLSearchParams(location.search);
  const flight_id = searchParams.get("flight_id") || location.state?.flight_id || ""; // Ensures flight_id is retrieved
  const airline = searchParams.get("airline") || location.state?.airline || "";
  const price = parseFloat(searchParams.get("price")) || location.state?.price || 0;

  // Fetch user details
  const userInfo = getUserInfo(); // Should return { user_name, phone_number, email }

  // State management
  const [formData, setFormData] = useState({
    name: userInfo?.user_name || "",
    email: userInfo?.email || "",
    phone: userInfo?.phone_number || "",
    datetime: "",
    airline,
    price,
    quantity: 1,
    flight_id, // Include flight_id in formData
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Math.max(1, parseInt(value, 10) || 1) : value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Phone number must be 10 digits";
    if (!formData.flight_id) newErrors.flight_id = "Flight ID is required"; // Validate flight_id
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
      const authToken = getAuthToken();
      if (!authToken) {
        navigate("/login");
        return;
      }

      const response = await fetch(`${API_BASE_URL}/flight/book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          flight_id: formData.flight_id, // Ensure flight_id is included in the request body
          phone_number: formData.phone, // Required by backend
          user_name: formData.name, // Required by backend
          email: formData.email, // Required by backend
          quantity: formData.quantity, // Required by backend
          datetime: formData.datetime, // Required by backend
          airline: formData.airline, // Additional data
          price: formData.price, // Additional data
          created_at: new Date().toISOString(), // Additional data
          cancelled: false, // Additional data
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        
        console.error("API Error:", errorData);
        throw new Error(errorData.detail || "Failed to book the flight.");
      }
      const data = await response.json();
      console.log("API Response Data:", data);
      
      setConfirmation("Booking successful!");
    } catch (error) {
      console.error("Booking Error:", error);
      setConfirmation(error.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-5">Book Your Flight</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: "Name", type: "text", name: "name" },
            { label: "Email", type: "email", name: "email" },
            { label: "Phone Number", type: "text", name: "phone" },
            { label: "Airline Name", type: "text", name: "airline", disabled: true },
            { label: "Price per Ticket (Rs)", type: "number", name: "price", disabled: true },
            { label: "Quantity", type: "number", name: "quantity", min: 1 },
          ].map(({ label, type, name, disabled, min }) => (
            <div key={name}>
              <label className="block text-base font-medium text-gray-700">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                min={min}
                disabled={disabled}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
              {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
            </div>
          ))}

          <p className="text-lg font-semibold text-center text-gray-700">
            Total Price: Rs. {formData.price * formData.quantity}
          </p>

          <button
            type="submit"
            className={`w-full p-2 rounded-lg font-semibold text-white ${
              loading ? "bg-gray-400" : "bg-gradient-to-r from-purple-600 to-pink-600"
            }`}
            disabled={loading}
          >
            {loading ? "Booking..." : "Book Now"}
          </button>
        </form>

        {confirmation && <p className="text-green-500 text-center mt-3">{confirmation}</p>}
      </div>
    </div>
  );
};

export default Booking;