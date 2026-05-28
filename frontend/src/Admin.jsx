import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import toast from "react-hot-toast";

function Admin() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "admin") {
    return (
      <h1 style={{ textAlign: "center", marginTop: "50px", color: "red" }}>
        Access Denied
      </h1>
    );
  }

  const [users, setUsers] = useState([]);
  const [housingRequests, setHousingRequests] = useState([]);
  const [immigrationRequests, setImmigrationRequests] = useState([]);
  const [foodRequests, setFoodRequests] = useState([]);
  const [healthcareRequests, setHealthcareRequests] = useState([]);

  const darkMode = localStorage.getItem("darkMode") === "true";

  useEffect(() => {
    fetchAllRequests();
  }, []);

  const fetchAllRequests = async () => {
    try {
      const usersResponse = await axios.get("https://congolese-community-platform.onrender.com/api/auth/users");
      const housing = await axios.get("https://congolese-community-platform.onrender.com/api/housing/requests");
      const immigration = await axios.get("https://congolese-community-platform.onrender.com/api/immigration/requests");
      const food = await axios.get("https://congolese-community-platform.onrender.com/api/food/requests");
      const healthcare = await axios.get("https://congolese-community-platform.onrender.com/api/healthcare/requests");

      setUsers(usersResponse.data);
      setHousingRequests(housing.data);
      setImmigrationRequests(immigration.data);
      setFoodRequests(food.data);
      setHealthcareRequests(healthcare.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load admin requests");
    }
  };

  const resolveRequest = async (service, id) => {
    try {
      const response = await axios.put(
        `https://congolese-community-platform.onrender.com/api/${service}/request/${id}`
      );
      toast.success(response.data.message);
      fetchAllRequests();
    } catch (error) {
      console.log(error);
      toast.error("Failed to resolve request");
    }
  };

  const deleteRequest = async (service, id) => {
    try {
      const response = await axios.delete(
        "https://congolese-community-platform.onrender.com/api/${service}/request/${id}"
      );
      toast.success(response.data.message);
      fetchAllRequests();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete request");
    }
  };

  const statCard = {
    backgroundColor: "white",
    color: "black",
    padding: "25px",
    borderRadius: "15px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "center"
  };

  const requestCard = {
    backgroundColor: "white",
    color: "black",
    padding: "20px",
    marginBottom: "15px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
  };

  const buttonStyle = {
    color: "white",
    border: "none",
    padding: "8px 15px",
    borderRadius: "6px",
    cursor: "pointer",
    marginRight: "10px"
  };

  const chartData = [
    { name: "Housing", requests: housingRequests.length },
    { name: "Immigration", requests: immigrationRequests.length },
    { name: "Food", requests: foodRequests.length },
    { name: "Healthcare", requests: healthcareRequests.length }
  ];

  return (
    <>
      <Navbar />

      <div
        style={{
          padding: "30px",
          backgroundColor: darkMode ? "#111827" : "#f3f4f6",
          color: darkMode ? "white" : "black",
          minHeight: "100vh"
        }}
      >
        <h1 style={{ textAlign: "center", color: "#2563eb", marginBottom: "30px" }}>
          Super Admin Dashboard
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "20px",
            marginBottom: "40px"
          }}
        >
          <div style={statCard}>
            <h3>Total Users</h3>
            <h1>{users.length}</h1>
          </div>

          <div style={statCard}>
            <h3>Housing</h3>
            <h1>{housingRequests.length}</h1>
          </div>

          <div style={statCard}>
            <h3>Immigration</h3>
            <h1>{immigrationRequests.length}</h1>
          </div>

          <div style={statCard}>
            <h3>Food</h3>
            <h1>{foodRequests.length}</h1>
          </div>

          <div style={statCard}>
            <h3>Healthcare</h3>
            <h1>{healthcareRequests.length}</h1>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "white",
            color: "black",
            padding: "25px",
            borderRadius: "15px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            marginBottom: "40px"
          }}
        >
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
            Requests by Service
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="requests" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <h2>Housing Requests</h2>
        {housingRequests.map((request) => (
          <div key={request._id} style={requestCard}>
            <p><strong>Name:</strong> {request.userName}</p>
            <p><strong>Email:</strong> {request.userEmail}</p>
            <p><strong>Address:</strong> {request.address}</p>
            <p><strong>Need:</strong> {request.needType}</p>
            <p><strong>Urgency:</strong> {request.urgency}</p>
            <p><strong>Description:</strong> {request.description}</p>
            <p><strong>Status:</strong> {request.status}</p>

            <button onClick={() => resolveRequest("housing", request._id)} style={{ ...buttonStyle, backgroundColor: "green" }}>
              Mark Resolved
            </button>

            <button onClick={() => deleteRequest("housing", request._id)} style={{ ...buttonStyle, backgroundColor: "red" }}>
              Delete
            </button>
          </div>
        ))}

        <h2>Immigration Requests</h2>
        {immigrationRequests.map((request) => (
          <div key={request._id} style={requestCard}>
            <p><strong>Name:</strong> {request.userName}</p>
            <p><strong>Email:</strong> {request.userEmail}</p>
            <p><strong>Case Type:</strong> {request.caseType}</p>
            <p><strong>Urgency:</strong> {request.urgency}</p>
            <p><strong>Description:</strong> {request.description}</p>
            <p><strong>Status:</strong> {request.status}</p>

            <button onClick={() => resolveRequest("immigration", request._id)} style={{ ...buttonStyle, backgroundColor: "green" }}>
              Mark Resolved
            </button>

            <button onClick={() => deleteRequest("immigration", request._id)} style={{ ...buttonStyle, backgroundColor: "red" }}>
              Delete
            </button>
          </div>
        ))}

        <h2>Food Requests</h2>
        {foodRequests.map((request) => (
          <div key={request._id} style={requestCard}>
            <p><strong>Name:</strong> {request.userName}</p>
            <p><strong>Email:</strong> {request.userEmail}</p>
            <p><strong>Food Need:</strong> {request.foodNeed}</p>
            <p><strong>Household Size:</strong> {request.householdSize}</p>
            <p><strong>Urgency:</strong> {request.urgency}</p>
            <p><strong>Description:</strong> {request.description}</p>
            <p><strong>Status:</strong> {request.status}</p>

            <button onClick={() => resolveRequest("food", request._id)} style={{ ...buttonStyle, backgroundColor: "green" }}>
              Mark Resolved
            </button>

            <button onClick={() => deleteRequest("food", request._id)} style={{ ...buttonStyle, backgroundColor: "red" }}>
              Delete
            </button>
          </div>
        ))}

        <h2>Healthcare Requests</h2>
        {healthcareRequests.map((request) => (
          <div key={request._id} style={requestCard}>
            <p><strong>Name:</strong> {request.userName}</p>
            <p><strong>Email:</strong> {request.userEmail}</p>
            <p><strong>Health Need:</strong> {request.healthNeed}</p>
            <p><strong>Urgency:</strong> {request.urgency}</p>
            <p><strong>Description:</strong> {request.description}</p>
            <p><strong>Status:</strong> {request.status}</p>

            <button onClick={() => resolveRequest("healthcare", request._id)} style={{ ...buttonStyle, backgroundColor: "green" }}>
              Mark Resolved
            </button>

            <button onClick={() => deleteRequest("healthcare", request._id)} style={{ ...buttonStyle, backgroundColor: "red" }}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Admin;