import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
    
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Function to validate the email format
    const validate = () => {
        // Check if the email includes "@gmail.com"
        if (!email.includes("@") || !email.includes(".com")) {
            setError("A valid email is required."); // Set error message if validation fails
            return false;
        }
        setError("");
        return true; 
    };

    // Function to handle the password reset request
    const requestPasswordReset = async () => {
       
        if (!validate()) return;
        setLoading(true); 

        try {
            // Send a POST request to the server to request a password reset
            const response = await axios.post("http://localhost:5000/request-reset", { email });
            if (response.data.success) {
                alert("Verification code sent to your email!"); // Alert user on success
                // Navigate to the VerifyCode component, passing the email in state
                navigate("/VerifyCode", { state: { email } });
            } else {
                alert("Failed to send code. Please try again."); // Alert user on failure
            }
        } catch (error) {
            alert("Error sending code. Please try again."); // Alert user on catch block
        } finally {
            setLoading(false); // Reset loading state after request completion
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
                <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">Forgot Password</h1>
                <input
                    type="email"
                    value={email} // Bind input value to email state
                    onChange={(e) => setEmail(e.target.value)} // Update email state on input change
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {error && <p className="text-red-500 text-sm">{error}</p>} {/* Show error message if exists */}

                <button
                    onClick={requestPasswordReset} // Trigger password reset request on button click
                    className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition mt-4"
                >
                    {loading ? "Loading..." : "Send Verification Code"} {/* Change button text based on loading state */}
                </button>
            </div>
        </div>
    );
};

export default ForgotPassword;