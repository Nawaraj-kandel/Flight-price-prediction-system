// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";

// const Login = () => {
//     const [state, setState] = useState("Login");
//     const [formData, setFormData] = useState({
//         firstName: "",
//         lastName: "",
//         dob: "",
//         phone: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//         verificationCode: "",
//         newPassword: ""
//     });
//     const [agree, setAgree] = useState(false); 
//     const [errors, setErrors] = useState({});
//     const [loading, setLoading] = useState(false);
//     const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("isAuthenticated") === "true");
//     const [forgotPasswordStep, setForgotPasswordStep] = useState(0); // Track forgot password process step
//     const navigate = useNavigate();
//     const location = useLocation();

//     useEffect(() => {
//         if (isAuthenticated && location.state?.fromViewPrice) {
//             navigate("/viewprice");
//         }
//     }, [isAuthenticated, location, navigate]);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const validate = () => {
//         let newErrors = {};

//         if (state === "Sign Up") {
//             if (!formData.firstName) newErrors.firstName = "First Name is required";
//             if (!formData.lastName) newErrors.lastName = "Last Name is required";
//             if (!formData.dob) newErrors.dob = "Date of Birth is required";
//             if (!formData.phone) newErrors.phone = "Phone Number is required";
//             if (formData.password !== formData.confirmPassword) {
//                 newErrors.confirmPassword = "Passwords do not match";
//             }
//             if (!agree) newErrors.agree = "You must agree to the terms & privacy policy";
//         }

//         if (!formData.email.includes("@gmail.com")) {
//             newErrors.email = "Email should contain @gmail.com";
//         }
//         if (!formData.password) {
//             newErrors.password = "Password is required";
//         }

//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const signup = async () => {
//         if (!validate()) return;
//         setLoading(true);

//         try {
//             const response = await axios.post("http://localhost:5000/signup", {
//                 firstName: formData.firstName,
//                 lastName: formData.lastName,
//                 dob: formData.dob,
//                 phone: formData.phone,
//                 email: formData.email,
//                 password: formData.password
//             });

//             alert("Sign-up successful! You can now log in.");
//             setState("Login");
//         } catch (error) {
//             alert("Sign-up failed. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const login = async () => {
//         if (!validate()) return;
//         setLoading(true);

//         try {
//             const response = await axios.get("http://localhost:5000/login", {
//                 params: {
//                     email: formData.email,
//                     password: formData.password
//                 }
//             });

//             if (response.data.success) {
//                 alert("Login successful!");
//                 localStorage.setItem("isAuthenticated", true);
//                 setIsAuthenticated(true);
//                 navigate(location.state?.fromViewPrice ? "/viewprice" : "/");
//             } else {
//                 alert("Login failed. Invalid email or password.");
//             }
//         } catch (error) {
//             alert("Login failed. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const logout = () => {
//         localStorage.removeItem("isAuthenticated");
//         setIsAuthenticated(false);
//         navigate("/login");
//     };

//     const requestPasswordReset = async () => {
//         try {
//             const response = await axios.post("http://localhost:5000/request-reset", {
//                 email: formData.email
//             });
//             if (response.data.success) {
//                 alert("Verification code sent to your email!");
//                 setForgotPasswordStep(2); // Proceed to enter verification code
//             } else {
//                 alert("Failed to send code. Please try again.");
//             }
//         } catch (error) {
//             alert("Error sending code. Please try again.");
//         }
//     };

//     const verifyAndResetPassword = async () => {
//         try {
//             const response = await axios.post("http://localhost:5000/reset-password", {
//                 email: formData.email,
//                 verificationCode: formData.verificationCode,
//                 newPassword: formData.newPassword
//             });
//             if (response.data.success) {
//                 alert("Password reset successful! You can now log in.");
//                 setForgotPasswordStep(0); // Reset process
//                 setState("Login");
//             } else {
//                 alert("Invalid code or failed to reset password.");
//             }
//         } catch (error) {
//             alert("Error resetting password. Please try again.");
//         }
//     };

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-100">
//             <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
//                 <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">{isAuthenticated ? "Account" : state}</h1>
                
//                 {isAuthenticated ? (
//                     <div className="text-center">
//                         <p className="text-gray-700 mb-4">You are logged in.</p>
//                         <button
//                             onClick={logout}
//                             className="w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
//                         >
//                             Logout
//                         </button>
//                     </div>
//                 ) : (
//                     <div className="space-y-4">
//                         {state === "Sign Up" && (
//                             // Signup fields as in original code
//                         )}

//                         {/* Forgot Password Steps */}
//                         {forgotPasswordStep === 0 && (
//                             <>
//                                 <input
//                                     name="email"
//                                     value={formData.email}
//                                     onChange={handleChange}
//                                     type="email"
//                                     placeholder="Email Address"
//                                     className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 />
//                                 {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

//                                 <input
//                                     name="password"
//                                     value={formData.password}
//                                     onChange={handleChange}
//                                     type="password"
//                                     placeholder="Password"
//                                     className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 />
//                                 {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

//                                 <p className="text-blue-600 cursor-pointer text-sm text-right" onClick={() => setForgotPasswordStep(1)}>
//                                     Forgot Password?
//                                 </p>
//                             </>
//                         )}

//                         {forgotPasswordStep === 1 && (
//                             <>
//                                 <input
//                                     name="email"
//                                     value={formData.email}
//                                     onChange={handleChange}
//                                     type="email"
//                                     placeholder="Enter your email"
//                                     className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 />
//                                 <button onClick={requestPasswordReset} className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
//                                     Send Verification Code
//                                 </button>
//                             </>
//                         )}

//                         {forgotPasswordStep === 2 && (
//                             <>
//                                 <input
//                                     name="verificationCode"
//                                     value={formData.verificationCode}
//                                     onChange={handleChange}
//                                     type="text"
//                                     placeholder="Enter 6-digit code"
//                                     className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 />
//                                 <input
//                                     name="newPassword"
//                                     value={formData.newPassword}
//                                     onChange={handleChange}
//                                     type="password"
//                                     placeholder="New Password"
//                                     className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 />
//                                 <button onClick={verifyAndResetPassword} className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
//                                     Reset Password
//                                 </button>
//                             </>
//                         )}

//                         {/* Continue button */}
//                         {forgotPasswordStep === 0 && (
//                             <button onClick={state === "Login" ? login : signup} className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition" disabled={loading}>
//                                 {loading ? "Please wait..." : "Continue"}
//                             </button>
//                         )}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Login;
