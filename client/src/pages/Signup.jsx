import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_BASE_URL } from "../Api/Api";

const Signup = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Handle Input Changes
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // Validate Form Inputs
  const validateForm = () => {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }

    // Password validation: At least 8 characters, 1 number, 1 special character
    // const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d.*\d)(?=.*[@$!%*?&].*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (!passwordPattern.test(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters, include a number & a special character.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const signup = async () => {
    if (!validateForm()) return;
    console.log(formData);
    setLoading(true);
    try {
      // Register User
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        // Call the mail verification API
        const verifyResponse = await fetch(`${API_BASE_URL}/mail/verify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email }),
        });

        if (verifyResponse.ok) {
          toast.success("Signup successful! Check your email for verification.");
        } else {
          toast.error("Signup successful, check mail for verification.");
        }
      } else {
        toast.error(data.detail || "Signup failed. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again. " + error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      navigate("/login");
      }, 1500);
    }
  };

  return (
    <div className="w-full h-screen bg-white flex items-center justify-center">
      <div className="w-11/12 md:w-1/3 bg-blue-100 p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold mb-6 text-center">Sign Up</h1>
        <div className="flex flex-col space-y-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={changeHandler}
            placeholder="Email Address"
            className={`border p-3 rounded-md w-full ${errors.email ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={changeHandler}
              placeholder="Password"
              className={`border p-3 rounded-md w-full ${errors.password ? "border-red-500" : "border-gray-300"}`}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
        </div>

        <button
          onClick={signup}
          className="w-full bg-blue-500 text-white p-3 rounded-md mt-6 hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Registering..." : "Sign Up"}
        </button>

        <p className="text-center text-gray-600 mt-4">
          Already have an account? <a href="/login" className="text-blue-500 cursor-pointer">Log In</a>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
