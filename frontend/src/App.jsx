import { useState } from "react";
import axios from "axios";

function App() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const loginUser = async () => {
    try {
      const response = await axios.post(
       "https://congolese-community-platform.onrender.com/api/auth/login",
        loginData
      );

      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);

      alert(response.data.message);

      window.location.href = "/dashboard";
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-4xl font-bold text-blue-700 mb-2 text-center">
          Congolese Community
        </h1>

        <p className="text-gray-500 text-center mb-8">
          Support System Login
        </p>

        <div className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleLoginChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleLoginChange}
            className="border p-3 rounded-lg"
          />

          <button
            onClick={loginUser}
            className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg font-bold"
          >
            Login
          </button>

          <button
            onClick={() => window.location.href = "/forgot-password"}
            className="text-blue-600 font-bold"
          >
            Forgot Password?
          </button>

          <button
            onClick={() => window.location.href = "/register"}
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-bold"
          >
            Create New Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;