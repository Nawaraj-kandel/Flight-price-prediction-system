import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_BASE_URL } from "../Api/Api";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

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
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Login Successful!");
        localStorage.setItem(
          "authToken",
          JSON.stringify({ token: data.token, expiresAt: Date.now() + data.expiresIn * 1000 })
        );
        navigate("/price");
      } else {
        toast.error(data.message || "Invalid email or password.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again." + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-blue-100 flex items-center justify-center">
      <div className="w-11/12 md:w-1/3 bg-white p-8 rounded-lg shadow-md">
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
          {loading ? "Processing..." : "Log In"}
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
