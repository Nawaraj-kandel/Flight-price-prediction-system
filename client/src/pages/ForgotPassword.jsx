import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_BASE_URL } from "../Api/Api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrors({});
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setErrors({ email: "Email is required." });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/register/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        toast.success("Password reset link sent to your email.");
      } else {
        const data = await response.text();
        const errorDetail = data ? JSON.parse(data).detail : "Failed to send password reset link.";
        toast.error(errorDetail);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again." + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-white flex items-center justify-center">
      <div className="w-11/12 md:w-1/3 bg-blue-100 p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">Forgot Password</h1>
        <div className="flex flex-col space-y-4">
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email Address"
            className={`border p-3 rounded-md w-full ${errors.email ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <button onClick={handleForgotPassword} className="w-full bg-blue-500 text-white p-3 rounded-md mt-6 hover:bg-blue-600" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;