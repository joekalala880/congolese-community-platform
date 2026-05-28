import { useState } from "react";
import axios from "axios";

function Register() {
  const [registerData, setRegisterData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    concern: ""
  });

  const handleChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value
    });
  };

  const registerUser = async () => {
  try {
    const response = await axios.post(
      "http://localhost:3001/api/auth/register",
      registerData
    );

    alert(response.data.message);
    window.location.href = "/";
  } catch (error) {
    console.log("Registration error:", error);
    alert(error.response?.data?.message || "Registration failed");
  }
};

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
          Create Account
        </h1>

        <div className="flex flex-col gap-4">
          <input name="firstName" placeholder="First Name" onChange={handleChange} className="border p-3 rounded-lg" />
          <input name="middleName" placeholder="Middle Name" onChange={handleChange} className="border p-3 rounded-lg" />
          <input name="lastName" placeholder="Last Name" onChange={handleChange} className="border p-3 rounded-lg" />
          <input name="email" placeholder="Email" onChange={handleChange} className="border p-3 rounded-lg" />
          <input name="phone" placeholder="Phone" onChange={handleChange} className="border p-3 rounded-lg" />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} className="border p-3 rounded-lg" />

          <select name="concern" onChange={handleChange} className="border p-3 rounded-lg">
            <option value="">Select Concern</option>
            <option value="Housing">Housing</option>
            <option value="Immigration">Immigration</option>
            <option value="Food Assistance">Food Assistance</option>
            <option value="Healthcare">Healthcare</option>
          </select>

          <button onClick={registerUser} className="bg-blue-600 text-white p-3 rounded-lg font-bold">
            Create Account
          </button>

          <button onClick={() => window.location.href = "/"} className="text-blue-600 font-bold">
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;