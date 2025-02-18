import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_BASE_URL } from "../Api/Api";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const login = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem("authToken", JSON.stringify({
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
          accessTokenExpiresAt: Date.now() + (15 * 60 * 1000), // 15 minutes
          refreshTokenExpiresAt: Date.now() + (30 * 24 * 60 * 60 * 1000) // 30 days
        }));
        localStorage.setItem("userInfo", JSON.stringify({
          email: formData.email,
          // Add any other user information you want to store
        }));
        setTimeout(() => {
          navigate("/price");
          window.location.reload();
        }, 1500);
        toast.success("Login Successful!");
      } else {
        toast.error(data.detail || "Invalid email or password.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again." + error);
    } finally {
      setLoading(false);
    }
  };

  const refreshToken = useCallback(async () => {
    const authToken = JSON.parse(localStorage.getItem("authToken"));
    if (!authToken) return;

    try {
      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: authToken.refreshToken }),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("authToken", JSON.stringify({
          accessToken: data.access_token,
          refreshToken: authToken.refreshToken,
          accessTokenExpiresAt: Date.now() + (15 * 60 * 1000), // 15 minutes
          refreshTokenExpiresAt: authToken.refreshTokenExpiresAt
        }));
        console.log("Token refreshed successfully"); // Debugging log
      } else {
        toast.error("Failed to refresh token. Please log in again.");
        navigate("/login");
      }
    } catch (error) {
      toast.error("An error occurred while refreshing token. Please log in again." + error);
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      const authToken = JSON.parse(localStorage.getItem("authToken"));
      if (authToken && Date.now() > authToken.accessTokenExpiresAt) {
        refreshToken();
      }
    }, 14 * 60 * 1000); // Refresh token every 14 minutes

    return () => clearInterval(interval);
  }, [refreshToken]);

  return (
    <div className="w-full h-screen bg-white flex items-center justify-center">
      <div className="w-11/12 md:w-1/3 bg-blue-100 p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>
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

        <button onClick={login} className="w-full bg-blue-500 text-white p-3 rounded-md mt-6 hover:bg-blue-600" disabled={loading}>
          {loading ? "Logging in..." : "Log In"}
        </button>

        <button onClick={() => navigate("/forgot-password")} className="w-full text-blue-500 p-3 mt-2 hover:underline">
          Forgot Password?
        </button>

        <p className="text-center text-gray-600 mt-4">
          Don’t have an account? <a href="/signup" className="text-blue-500 cursor-pointer">Sign Up</a>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;