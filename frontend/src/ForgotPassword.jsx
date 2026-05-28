import { useState } from "react";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleResetRequest = async () => {
    try {
      const response = await axios.post(
        "https://congolese-community-platform.onrender.com/api/auth/forgot-password",
        { email }
      );

      alert(response.data.message);
      window.location.href = "/";
    } catch (error) {
      alert("Failed to send password reset request");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-blue-700 mb-4 text-center">
          Forgot Password
        </h1>

        <p className="text-gray-500 text-center mb-6">
          Enter your email to request a password reset.
        </p>

        <input
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          className="border p-3 rounded-lg w-full mb-4"
        />

        <button
          onClick={handleResetRequest}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-bold w-full"
        >
          Send Reset Request
        </button>

        <button
          onClick={() => window.location.href = "/"}
          className="text-blue-600 font-bold w-full mt-4"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;