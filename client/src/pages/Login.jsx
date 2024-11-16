// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation, Link } from "react-router-dom";
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
//     const [forgotPasswordStep, setForgotPasswordStep] = useState(0);
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
//         if (!formData.password && forgotPasswordStep === 0) {
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
//                 setForgotPasswordStep(2);
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
//                 setForgotPasswordStep(0);
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
//                             <>
//                                 <div className="flex space-x-4">
//                                     <input
//                                         name="firstName"
//                                         value={formData.firstName}
//                                         onChange={handleChange}
//                                         type="text"
//                                         placeholder="First Name"
//                                         className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                     />
//                                     <input
//                                         name="lastName"
//                                         value={formData.lastName}
//                                         onChange={handleChange}
//                                         type="text"
//                                         placeholder="Last Name"
//                                         className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                     />
//                                 </div>
//                                 {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
//                                 {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}

//                                 <input
//                                     name="dob"
//                                     value={formData.dob}
//                                     onChange={handleChange}
//                                     type="date"
//                                     placeholder="Date of Birth"
//                                     className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 />
//                                 {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}

//                                 <input
//                                     name="phone"
//                                     value={formData.phone}
//                                     onChange={handleChange}
//                                     type="tel"
//                                     placeholder="Phone Number"
//                                     className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 />
//                                 {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
//                             </>
//                         )}

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
//                                     placeholder="Verification Code"
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
//                                 <button onClick={verifyAndResetPassword} className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
//                                     Reset Password
//                                 </button>
//                             </>
//                         )}

//                         {state === "Sign Up" && (
//                             <div className="flex items-center space-x-2">
//                                 <input
//                                     type="checkbox"
//                                     checked={agree}
//                                     onChange={() => setAgree(!agree)}
//                                     className="h-4 w-4 text-blue-600"
//                                 />
//                                 <label className="text-gray-600">I agree to the terms & privacy policy</label>
//                             </div>
//                         )}

//                         <button
//                             onClick={state === "Login" ? login : signup}
//                             className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//                         >
//                             {loading ? "Loading..." : state}
//                         </button>

//                         <p className="text-gray-600 text-center mt-4">
//                             {state === "Login" ? "Don't have an account?" : "Already have an account?"}
//                             <span
//                                 className="text-blue-600 cursor-pointer ml-2"
//                                 onClick={() => setState(state === "Login" ? "Sign Up" : "Login")}
//                             >
//                                 {state === "Login" ? "Sign Up" : "Login"}
//                             </span>
//                         </p>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Login;

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [state, setState] = useState("Login");
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        dob: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [agree, setAgree] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("isAuthenticated") === "true");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (isAuthenticated && location.state?.fromViewPrice) {
            navigate("/viewprice");
        }
    }, [isAuthenticated, location, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        let newErrors = {};

        if (state === "Sign Up") {
            if (!formData.firstName) newErrors.firstName = "First Name is required";
            if (!formData.lastName) newErrors.lastName = "Last Name is required";
            if (!formData.dob) newErrors.dob = "Date of Birth is required";
            if (!formData.phone) newErrors.phone = "Phone Number is required";
            if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = "Passwords do not match";
            }
            if (!agree) newErrors.agree = "You must agree to the terms & privacy policy";
        }

        if (!formData.email.includes("@") || !formData.email.includes(".com")) {
            newErrors.email = "A valid email is required.";
        }
        
        if (!formData.password) {
            newErrors.password = "Password is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const signup = async () => {
        if (!validate()) return;
        setLoading(true);

        try {
            await axios.post("http://localhost:5000/signup", {
                firstName: formData.firstName,
                lastName: formData.lastName,
                dob: formData.dob,
                phone: formData.phone,
                email: formData.email,
                password: formData.password,
            });

            alert("Sign-up successful! You can now log in.");
            setState("Login");
        } catch (error) {
            alert("Sign-up failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const login = async () => {
        if (!validate()) return;
        setLoading(true);

        try {
            const response = await axios.get("http://localhost:5000/login", {
                params: {
                    email: formData.email,
                    password: formData.password,
                },
            });

            if (response.data.success) {
                alert("Login successful!");
                localStorage.setItem("isAuthenticated", true);
                setIsAuthenticated(true);
                navigate(location.state?.fromViewPrice ? "/viewprice" : "/");
            } else {
                alert("Login failed. Invalid email or password.");
            }
        } catch (error) {
            alert("Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem("isAuthenticated");
        setIsAuthenticated(false);
        navigate("/login");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
                <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">
                    {isAuthenticated ? "Account" : state}
                </h1>

                {isAuthenticated ? (
                    <div className="text-center">
                        <p className="text-gray-700 mb-4">You are logged in.</p>
                        <button
                            onClick={logout}
                            className="w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {state === "Sign Up" && (
                            <>
                                <div className="flex space-x-4">
                                    <input
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        type="text"
                                        placeholder="First Name"
                                        className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <input
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        type="text"
                                        placeholder="Last Name"
                                        className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}

                                <input
                                    name="dob"
                                    value={formData.dob}
                                    onChange={handleChange}
                                    type="date"
                                    placeholder="Date of Birth"
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}

                                <input
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    type="tel"
                                    placeholder="Phone Number"
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                            </>
                        )}

                        <input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            type="email"
                            placeholder="Email Address"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

                        <input
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            type="password"
                            placeholder="Password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

                        <button
                            onClick={state === "Login" ? login : signup}
                            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            {loading ? "Loading..." : state}
                        </button>

                        <p className="text-gray-600 text-center mt-4">
                            {state === "Login" ? "Don't have an account?" : "Already have an account?"}
                            <span
                                className="text-blue-600 cursor-pointer ml-2"
                                onClick={() => setState(state === "Login" ? "Sign Up" : "Login")}
                            >
                                {state === "Login" ? "Sign Up" : "Login"}
                            </span>
                        </p>

                        {state === "Login" && (
                            <p
                                className="text-blue-600 cursor-pointer text-sm text-center mt-2"
                                onClick={() => navigate("/ForgotPassword")}
                            >
                                Forgot Password?
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;

