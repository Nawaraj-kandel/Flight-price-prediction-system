import { useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { API_BASE_URL } from "../Api/Api";


const VerifyCode = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');



    const handleResetPassword = async () => {
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const apiBaseUrl = API_BASE_URL;

            // Make the POST request with the password field and token as a query parameter
            const response = await axios.post(
                `${apiBaseUrl}/register/reset-password/?token=${token}`,
                { password },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.success) {
                alert("Password reset successfully!");
                navigate("/login");
            } else {
                alert("Password reset failed.");
            }
        } catch (error) {
            alert("An error occurred. Please try again." + error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-semibold text-center mb-6">Reset Password</h2>

                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="New Password"
                    className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm New Password"
                    className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <button
                    onClick={handleResetPassword}
                    className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                    Reset Password
                </button>
            </div>
        </div>
    );
};

export default VerifyCode;