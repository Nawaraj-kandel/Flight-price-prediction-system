// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify"; // Import ToastContainer
// import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
// import Logout from "../pages/Logout";

// const Login = () => {
// 	const [state, setState] = useState("Login");
// 	const [formData, setFormData] = useState({
// 		username: "",
// 		email: "",
// 		password: "",
// 	});
// 	const [errors, setErrors] = useState({});
// 	const [showPassword, setShowPassword] = useState(false); // Toggle password visibility

// 	const navigate = useNavigate();

// 	// Update form data state on input change
// 	const changeHandler = (e) => {
// 		setFormData({ ...formData, [e.target.name]: e.target.value });
// 		setErrors({ ...errors, [e.target.name]: "" });
// 	};

// 	// Validate form data
// 	const validateForm = () => {
// 		const newErrors = {};
// 		if (!formData.email) newErrors.email = "Email is required.";
// 		if (!formData.password) {
// 			newErrors.password = "Password is required.";
// 		} else if (
// 			state === "Sign Up" &&
// 			!/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(formData.password)
// 		) {
// 			newErrors.password =
// 				"Password must be at least 8 characters, with an uppercase letter and a number.";
// 		}
// 		if (state === "Sign Up" && !formData.username) {
// 			newErrors.username = "Username is required.";
// 		}
// 		setErrors(newErrors);
// 		return Object.keys(newErrors).length === 0;
// 	};

// 	// Handle login

// 	const login = async () => {
// 		if (!validateForm()) return;

// 		try {
// 			const response = await fetch("/api/auth/login", {
// 				method: "POST",
// 				headers: { "Content-Type": "application/json" },
// 				body: JSON.stringify({
// 					email: formData.email,
// 					password: formData.password,
// 				}),
// 			});
// 			const data = await response.json();
// 			if (response.ok) {
// 				toast.success("Login Successful!");
// 				const { token, expiresIn } = data;
// 				localStorage.setItem(
// 					"authToken",
// 					JSON.stringify({ token, expiresAt: Date.now() + expiresIn * 1000 })
// 				);
// 				navigate("/");
// 			} else {
// 				toast.error(data.message || "Invalid email or password.");
// 			}
// 		} catch (error) {
// 			toast.error("An error occurred. Please try again." + error);
// 		}
// 	};



// 	// Handle signup
// 	const signup = async () => {
// 		if (!validateForm()) return;

// 		try {
// 			const response = await fetch("/api/auth/signup", {
// 				method: "POST",
// 				headers: { "Content-Type": "application/json" },
// 				body: JSON.stringify({
// 					username: formData.username,
// 					email: formData.email,
// 					password: formData.password,
// 				}),
// 			});
// 			const data = await response.json();
// 			if (response.ok) {
// 				toast.success("Signup Successful! Please log in.");
// 				setState("Login");
// 				setFormData({ username: "", email: "", password: "" });
// 			} else {
// 				toast.error(data.message || "Signup failed. Please try again.");
// 			}
// 		} catch (error) {
// 			toast.error("An error occurred. Please try again." + error);
// 		}
// 	};

// 	// Route guarding
// 	useEffect(() => {
// 		const auth = localStorage.getItem("authToken");
// 		if (auth) {
// 			const { expiresAt } = JSON.parse(auth);
// 			if (Date.now() >= expiresAt) {
// 				Logout();
// 			}
// 		} else if (state === "Login") {
// 			navigate("/login");
// 		}
// 	}, [navigate, state]);

// 	return (
// 		<div className="w-full h-screen bg-blue-100 flex items-center justify-center">
// 			<div className="w-11/12 md:w-1/3 bg-white p-8 rounded-lg shadow-md">
// 				<h1 className="text-2xl font-semibold mb-6 text-center">{state}</h1>

// 				{/* Input Fields */}
// 				<div className="flex flex-col space-y-4">
// 					{state === "Sign Up" && (
// 						<div>
// 							<input
// 								type="text"
// 								name="username"
// 								value={formData.username}
// 								onChange={changeHandler}
// 								placeholder="Username"
// 								className={`border p-3 rounded-md w-full ${errors.username ? "border-red-500" : "border-gray-300"
// 									}`}
// 							/>
// 							{errors.username && (
// 								<p className="text-red-500 text-sm mt-1">
// 									{errors.username}
// 								</p>
// 							)}
// 						</div>
// 					)}

// 					<div>
// 						<input
// 							type="email"
// 							name="email"
// 							value={formData.email}
// 							onChange={changeHandler}
// 							placeholder="Email Address"
// 							className={`border p-3 rounded-md w-full ${errors.email ? "border-red-500" : "border-gray-300"
// 								}`}
// 						/>
// 						{errors.email && (
// 							<p className="text-red-500 text-sm mt-1">{errors.email}</p>
// 						)}
// 					</div>

// 					<div className="relative">
// 						<input
// 							type={showPassword ? "text" : "password"}
// 							name="password"
// 							value={formData.password}
// 							onChange={changeHandler}
// 							placeholder="Password"
// 							className={`border p-3 rounded-md w-full ${errors.password ? "border-red-500" : "border-gray-300"
// 								}`}
// 						/>
// 						<button
// 							type="button"
// 							className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
// 							onClick={() => setShowPassword(!showPassword)}
// 						>
// 							{showPassword ? "Hide" : "Show"}
// 						</button>
// 						{errors.password && (
// 							<p className="text-red-500 text-sm mt-1">{errors.password}</p>
// 						)}
// 					</div>
// 				</div>

// 				{/* Submit Button */}
// 				<button
// 					onClick={state === "Login" ? login : signup}
// 					className="w-full bg-blue-500 text-white p-3 rounded-md mt-6 hover:bg-blue-600"
// 				>
// 					{state === "Login" ? "Log In" : "Sign Up"}
// 				</button>

// 				{/* Toggle between Login and Sign Up */}
// 				<p className="text-center text-gray-600 mt-4">
// 					{state === "Login" ? (
// 						<>
// 							Do not have an account?{" "}
// 							<span
// 								onClick={() => setState("Sign Up")}
// 								className="text-blue-500 cursor-pointer"
// 							>
// 								Sign Up
// 							</span>
// 						</>
// 					) : (
// 						<>
// 							Already have an account?{" "}
// 							<span
// 								onClick={() => setState("Login")}
// 								className="text-blue-500 cursor-pointer"
// 							>
// 								Log In
// 							</span>
// 						</>
// 					)}
// 				</p>

// 				{/* Terms and Conditions */}
// 				{state === "Sign Up" && (
// 					<div className="flex items-center mt-4">
// 						<input type="checkbox" name="agree" id="agree" className="mr-2" />
// 						<p className="text-gray-600 text-sm">
// 							By continuing, I agree to the{" "}
// 							<span className="text-blue-500 cursor-pointer">terms</span> &{" "}
// 							<span className="text-blue-500 cursor-pointer">
// 								privacy policy
// 							</span>
// 							.
// 						</p>
// 					</div>
// 				)}
// 			</div>
// 			<ToastContainer />
// 		</div>
// 	);
// };

// export default Login;


import { useState,  } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Login = () => {
  
  const [state, setState] = useState("Login"); // State to toggle between Login and Sign Up
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false); 
  const [loading, setLoading] = useState(false); 

  const navigate = useNavigate();

  // Handle input changes
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (
      state === "Sign Up" &&
      !/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(formData.password)
    ) {
      newErrors.password =
        "Password must be at least 8 characters, with an uppercase letter and a number.";
    }
    if (state === "Sign Up" && !formData.username) {
      newErrors.username = "Username is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle login
  const login = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
    //  Commented out the API call for testing purposes
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Login Successful!");
        const { token, expiresIn } = data;
        localStorage.setItem(
          "authToken",
          JSON.stringify({ token, expiresAt: Date.now() + expiresIn * 1000 })
        );
        console.log("Redirecting to /price...");
        navigate("/");
      } else {
       console.log("Login failed");
        toast.error(data.message || "Invalid email or password.");
      }

      // Bypass login for testing purposes
      // const defaultEmail = "test@example.com";
      // const defaultPassword = "Password123";
      // if (formData.email === defaultEmail && formData.password === defaultPassword) {
      //   toast.success("Login Successful!");
      //   localStorage.setItem(
      //     "authToken",
      //     JSON.stringify({ token: "dummyToken", expiresAt: Date.now() + 3600 * 1000 })
      //   );
      //   console.log("Redirecting to /price...");
      //   navigate("/price");
      // } else {
      //   console.log("Login failed");
      //   toast.error("Invalid email or password.");
      // }
    } catch (error) {
      toast.error("An error occurred. Please try again." + error);
    } finally {
      setLoading(false);
    }
  };
  /* const login = async () => {
  if (!validateForm()) return;

  setLoading(true);
  try {
    const mockResponse = {
      token: "mock-token",
      expiresIn: 3600,
    };

    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulate successful response
    localStorage.setItem(
      "authToken",
      JSON.stringify({ token: mockResponse.token, expiresAt: Date.now() + mockResponse.expiresIn * 1000 })
    );
    toast.success("Login Successful!");
    navigate("/");
  } catch (error) {
    toast.error("An error occurred. Please try again.");
  } finally {
    setLoading(false);
  }
};
 */

  // Handle signup
  const signup = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
    //  Commented out the API call for testing purposes
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Signup Successful! Please log in.");
        setState("Login");
        setFormData({ username: "", email: "", password: "" });
      } else {
        toast.error(data.message || "Signup failed. Please try again.");
      }

      // Bypass signup for testing purposes
      // toast.success("Signup Successful! Please log in.");
      // setState("Login");
      // setFormData({ username: "", email: "", password: "" });
    } catch (error) {
      toast.error("An error occurred. Please try again." + error);
    } finally {
      setLoading(false);
    }
  };

  
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
      login();
    }
  };
  return (
    <div className="w-full h-screen bg-blue-100 flex items-center justify-center">
      <div className="w-11/12 md:w-1/3 bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">{state}</h1>

        {/* Input Fields */}
        <div className="flex flex-col space-y-4">
          {state === "Sign Up" && (
            <div>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={changeHandler}
                onKeyDown={handleKeyDown}
                placeholder="Username"
                className={`border p-3 rounded-md w-full ${
                  errors.username ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </div>
          )}

          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={changeHandler}
              onKeyDown={handleKeyDown}
              placeholder="Email Address"
              className={`border p-3 rounded-md w-full ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={changeHandler}
              onKeyDown={handleKeyDown}
              placeholder="Password"
              className={`border p-3 rounded-md w-full ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={state === "Login" ? login : signup}
          className="w-full bg-blue-500 text-white p-3 rounded-md mt-6 hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Processing..." : state === "Login" ? "Log In" : "Sign Up"}
        </button>

        {/* Toggle between Login and Sign Up */}
        <p className="text-center text-gray-600 mt-4">
          {state === "Login" ? (
            <>
              Do not have an account?{" "}
              <span
                onClick={() => setState("Sign Up")}
                className="text-blue-500 cursor-pointer"
              >
                Sign Up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setState("Login")}
                className="text-blue-500 cursor-pointer"
              >
                Log In
              </span>
            </>
          )}
        </p>

        {/* Terms and Conditions */}
        {state === "Sign Up" && (
          <div className="flex items-center mt-4">
            <input type="checkbox" name="agree" id="agree" className="mr-2" />
            <p className="text-gray-600 text-sm">
              By continuing, I agree to the{" "}
              <span className=" text-blue-500 cursor-pointer"> <a href="/terms"> terms & privacy policy </a></span> 
              
            </p>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;

