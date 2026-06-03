import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import toast from "react-hot-toast";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const API_URL = "https://congolese-community-platform.onrender.com";

function Admin() {
  const [housingRequests, setHousingRequests] = useState([]);
  const [foodRequests, setFoodRequests] = useState([]);
  const [healthcareRequests, setHealthcareRequests] = useState([]);
  const [immigrationRequests, setImmigrationRequests] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const darkMode = localStorage.getItem("darkMode") === "true";

  const fetchRequests = async () => {
    try {
      const [usersRes, housingRes, foodRes, healthcareRes, immigrationRes] =
        await Promise.all([
          axios.get(`${API_URL}/api/users`),
          axios.get(`${API_URL}/api/housing/requests`),
          axios.get(`${API_URL}/api/food/requests`),
          axios.get(`${API_URL}/api/healthcare/requests`),
          axios.get(`${API_URL}/api/immigration/requests`)
        ]);

      setUsers(usersRes.data || []);
      setHousingRequests(housingRes.data || []);
      setFoodRequests(foodRes.data || []);
      setHealthcareRequests(healthcareRes.data || []);
      setImmigrationRequests(immigrationRes.data || []);
    } catch (error) {
      console.log("ADMIN FETCH ERROR:", error);
      toast.error("Failed to load admin requests");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const allRequests = [
    ...housingRequests,
    ...foodRequests,
    ...healthcareRequests,
    ...immigrationRequests
  ];

  const stats = {
    users: users.length,
    housing: housingRequests.length,
    food: foodRequests.length,
    healthcare: healthcareRequests.length,
    immigration: immigrationRequests.length,
    pending: allRequests.filter((r) => r.status === "Pending").length,
    resolved: allRequests.filter((r) => r.status === "Resolved").length
  };


const totalUsers = users.length;

const totalPending =
  housingRequests.filter(r => r.status === "Pending").length +
  foodRequests.filter(r => r.status === "Pending").length +
  healthcareRequests.filter(r => r.status === "Pending").length +
  immigrationRequests.filter(r => r.status === "Pending").length;

const totalResolved =
  housingRequests.filter(r => r.status === "Resolved").length +
  foodRequests.filter(r => r.status === "Resolved").length +
  healthcareRequests.filter(r => r.status === "Resolved").length +
  immigrationRequests.filter(r => r.status === "Resolved").length;

  const chartData = {
  labels: ["Housing", "Food", "Healthcare", "Immigration"],
  datasets: [
    {
      label: "Requests",
      data: [
        housingRequests.length,
        foodRequests.length,
        healthcareRequests.length,
        immigrationRequests.length
      ],
      backgroundColor: ["#2563eb", "#16a34a", "#dc2626", "#7c3aed"]
    }
  ]
};




  const filterRequests = (requests) => {
    if (!searchTerm.trim()) return requests;

    return requests.filter((request) =>
      JSON.stringify(request)
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  };

  const resolveRequest = async (type, id) => {
    try {
      await axios.put(`${API_URL}/api/${type}/request/${id}`);
      toast.success("Request marked as resolved");
      fetchRequests();
    } catch (error) {
      console.log("RESOLVE ERROR:", error);
      toast.error("Failed to update request");
    }
  };

  const deleteRequest = async (type, id) => {
    try {
      await axios.delete(`${API_URL}/api/${type}/request/${id}`);
      toast.success("Request deleted");
      fetchRequests();
    } catch (error) {
      console.log("DELETE ERROR:", error);
      toast.error("Failed to delete request");
    }
  };

  const UploadedFile = ({ request }) => {
    if (!request?.fileUrl) return null;

    return (
      <p>
        <strong>Uploaded File:</strong>{" "}
        <a
          href={request.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#2563eb", fontWeight: "bold" }}
        >
          View Document
        </a>
      </p>
    );
  };

  const statCard = {
    backgroundColor: darkMode ? "#1f2937" : "white",
    color: darkMode ? "white" : "black",
    padding: "20px",
    borderRadius: "14px",
    textAlign: "center",
    boxShadow: "0 5px 15px rgba(0,0,0,0.12)"
  };

  return (
    <>
      <Navbar />

   <div
  style={{
    backgroundColor: darkMode ? "#1f2937" : "white",
    padding: "20px",
    borderRadius: "14px",
    marginBottom: "30px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.12)"
  }}
>
  <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
    Request Analytics
  </h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "25px"
    }}
  >
    <div style={{ height: "300px" }}>
      <Bar data={chartData} options={{ maintainAspectRatio: false }} />
    </div>

    <div style={{ height: "300px" }}>
      <Pie data={chartData} options={{ maintainAspectRatio: false }} />
    </div>
  </div>
</div>

      <div
        style={{
          minHeight: "100vh",
          padding: "40px 20px",
          backgroundColor: darkMode ? "#111827" : "#f3f4f6",
          color: darkMode ? "white" : "black"
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h1 style={{ textAlign: "center", color: "#2563eb" }}>
            Admin Dashboard
          </h1>

          <p style={{ textAlign: "center", marginBottom: "30px" }}>
            Manage community support requests.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "18px",
              marginBottom: "35px"
            }}
          >
            <div style={statCard}><h2>{stats.users}</h2><p>Total Users</p></div>
            <div style={statCard}><h2>{stats.housing}</h2><p>Housing</p></div>
            <div style={statCard}><h2>{stats.food}</h2><p>Food</p></div>
            <div style={statCard}><h2>{stats.healthcare}</h2><p>Healthcare</p></div>
            <div style={statCard}><h2>{stats.immigration}</h2><p>Immigration</p></div>
            <div style={statCard}><h2>{stats.pending}</h2><p>Pending</p></div>
            <div style={statCard}><h2>{stats.resolved}</h2><p>Resolved</p></div>
          </div>

          <input
            type="text"
            placeholder="Search requests by name, email, type, urgency, or status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "10px",
              border: "1px solid #374151",
              marginBottom: "30px",
              backgroundColor: darkMode ? "#1f2937" : "white",
              color: darkMode ? "white" : "black",
              fontSize: "16px",
              boxSizing: "border-box"
            }}
          />

          <RequestSection
            title="Housing Requests"
            requests={filterRequests(housingRequests)}
            type="housing"
            color="#2563eb"
            darkMode={darkMode}
            resolveRequest={resolveRequest}
            deleteRequest={deleteRequest}
            UploadedFile={UploadedFile}
            fields={[
              ["Name", "userName"],
              ["Email", "userEmail"],
              ["Address", "address"],
              ["Need Type", "needType"],
              ["Urgency", "urgency"],
              ["Description", "description"],
              ["Status", "status"]
            ]}
          />

          <RequestSection
            title="Food Requests"
            requests={filterRequests(foodRequests)}
            type="food"
            color="#16a34a"
            darkMode={darkMode}
            resolveRequest={resolveRequest}
            deleteRequest={deleteRequest}
            UploadedFile={UploadedFile}
            fields={[
              ["Name", "userName"],
              ["Email", "userEmail"],
              ["Food Need", "foodNeed"],
              ["Household Size", "householdSize"],
              ["Urgency", "urgency"],
              ["Description", "description"],
              ["Status", "status"]
            ]}
          />

          <RequestSection
            title="Healthcare Requests"
            requests={filterRequests(healthcareRequests)}
            type="healthcare"
            color="#dc2626"
            darkMode={darkMode}
            resolveRequest={resolveRequest}
            deleteRequest={deleteRequest}
            UploadedFile={UploadedFile}
            fields={[
              ["Name", "userName"],
              ["Email", "userEmail"],
              ["Health Need", "healthNeed"],
              ["Urgency", "urgency"],
              ["Description", "description"],
              ["Status", "status"]
            ]}
          />

          <RequestSection
            title="Immigration Requests"
            requests={filterRequests(immigrationRequests)}
            type="immigration"
            color="#7c3aed"
            darkMode={darkMode}
            resolveRequest={resolveRequest}
            deleteRequest={deleteRequest}
            UploadedFile={UploadedFile}
            fields={[
              ["Name", "userName"],
              ["Email", "userEmail"],
              ["Case Type", "caseType"],
              ["Urgency", "urgency"],
              ["Description", "description"],
              ["Status", "status"]
            ]}
          />
        </div>
      </div>
    </>
  );
}

function RequestSection({
  title,
  requests,
  type,
  color,
  darkMode,
  resolveRequest,
  deleteRequest,
  UploadedFile,
  fields
}) {
  return (
    <div style={{ marginBottom: "40px" }}>
      <h2 style={{ color }}>{title}</h2>

      {requests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        requests.map((request) => (
          <div
            key={request._id}
            style={{
              backgroundColor: darkMode ? "#1f2937" : "white",
              padding: "20px",
              borderRadius: "14px",
              marginBottom: "18px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.12)"
            }}
          >
            {fields.map(([label, key]) => (
              <p key={key}>
                <strong>{label}:</strong> {request?.[key] || "N/A"}
              </p>
            ))}

            <UploadedFile request={request} />

            {request.status !== "Resolved" && (
              <button
                onClick={() => resolveRequest(type, request._id)}
                style={{
                  ...buttonStyle,
                  backgroundColor: "#16a34a"
                }}
              >
                Mark Resolved
              </button>
            )}

            <button
              onClick={() => deleteRequest(type, request._id)}
              style={{
                ...buttonStyle,
                backgroundColor: "#dc2626"
              }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

const buttonStyle = {
  padding: "10px 14px",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontWeight: "bold",
  cursor: "pointer",
  marginRight: "10px",
  marginTop: "10px"
};

export default Admin;