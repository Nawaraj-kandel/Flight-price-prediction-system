
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_BASE_URL } from "../Api/Api";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  // Handle password input and validation
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Validation rules
    const validationErrors = {};
    if (newPassword.length < 8) {
      validationErrors.password = "Password must be at least 8 characters long.";
    } else if (!/[A-Z]/.test(newPassword)) {
      validationErrors.password = "Password must contain at least one uppercase letter.";
    } else if (!/[a-z]/.test(newPassword)) {
      validationErrors.password = "Password must contain at least one lowercase letter.";
    } else if (!/[0-9]/.test(newPassword)) {
      validationErrors.password = "Password must contain at least one number.";
    } else if (!/[!@#$%^&*]/.test(newPassword)) {
      validationErrors.password = "Password must contain at least one special character.";
    }

    setErrors(validationErrors);
  };

  // Handle password reset request
  const handleResetPassword = async () => {
    if (!password) {
      setErrors({ password: "Password is required." });
      return;
    }

    if (Object.keys(errors).length > 0) {
      toast.error("Please fix the errors before proceeding.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/register/reset-password?token=${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        toast.success("Password reset successful. Please log in with your new password.");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        const data = await response.text();
        const errorDetail = data ? JSON.parse(data).detail : "Failed to reset password.";
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
        <h1 className="text-2xl font-semibold mb-6 text-center">Reset Password</h1>
        <div className="flex flex-col space-y-4">
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="New Password"
            className={`border p-3 rounded-md w-full ${errors.password ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        <button
          onClick={handleResetPassword}
          className="w-full bg-blue-500 text-white p-3 rounded-md mt-6 hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ResetPassword;
