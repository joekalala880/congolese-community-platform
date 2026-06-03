import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

function MyRequests() {
  const [sortOrder, setSortOrder] = useState("newest");
  const [allRequests, setAllRequests] = useState([]);
  const [search, setSearch] = useState("");
  const [serviceFilter, setServiceFilter] = useState("All");

  const user = JSON.parse(localStorage.getItem("user"));
  const darkMode = localStorage.getItem("darkMode") === "true";

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const [housingResponse, foodResponse, immigrationResponse, healthcareResponse] =
        await Promise.all([
          axios.get("https://congolese-community-platform.onrender.com/api/housing/requests"),
          axios.get("https://congolese-community-platform.onrender.com/api/food/requests"),
          axios.get("https://congolese-community-platform.onrender.com/api/immigration/requests"),
          axios.get("https://congolese-community-platform.onrender.com/api/healthcare/requests"),
        ]);

      const myHousingRequests = housingResponse.data
        .filter((request) => request.userEmail === user?.email)
        .map((request) => ({ ...request, service: "Housing" }));

      const myFoodRequests = foodResponse.data
        .filter((request) => request.userEmail === user?.email)
        .map((request) => ({ ...request, service: "Food" }));

      const myImmigrationRequests = immigrationResponse.data
        .filter((request) => request.userEmail === user?.email)
        .map((request) => ({ ...request, service: "Immigration" }));

      const myHealthcareRequests = healthcareResponse.data
        .filter((request) => request.userEmail === user?.email)
        .map((request) => ({ ...request, service: "Healthcare" }));

      setAllRequests([
        ...myHousingRequests,
        ...myFoodRequests,
        ...myImmigrationRequests,
        ...myHealthcareRequests,
      ]);
    } catch (error) {
      console.log("MY REQUESTS FETCH ERROR:", error);
    }
  };

  const deleteRequest = async (request) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this request?"
    );

    if (!confirmDelete) return;

    try {
      const service = request.service.toLowerCase();

      await axios.delete(
        `https://congolese-community-platform.onrender.com/api/${service}/request/${request._id}`
      );

      setAllRequests(allRequests.filter((item) => item._id !== request._id));
    } catch (error) {
      console.log("DELETE REQUEST ERROR:", error);
    }
  };

  const filteredRequests = allRequests
    .filter((request) => {
      const searchText = JSON.stringify(request).toLowerCase();

      const matchesSearch = searchText.includes(search.toLowerCase());

      const matchesService =
        serviceFilter === "All" || request.service === serviceFilter;

      return matchesSearch && matchesService;
    })
    .sort((a, b) =>
      sortOrder === "newest"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt)
    );

  const counterCard = {
    backgroundColor: darkMode ? "#1f2937" : "white",
    padding: "20px",
    borderRadius: "15px",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  };

  const requestCard = {
    backgroundColor: darkMode ? "#1f2937" : "white",
    padding: "25px",
    borderRadius: "15px",
    marginBottom: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  };

  const inputStyle = {
    width: "100%",
    padding: "14px",
    marginBottom: "20px",
    borderRadius: "12px",
    border: "1px solid #d1d5db",
    fontSize: "16px",
    backgroundColor: darkMode ? "#1f2937" : "white",
    color: darkMode ? "white" : "black",
    boxSizing: "border-box",
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          minHeight: "100vh",
          backgroundColor: darkMode ? "#111827" : "#f3f4f6",
          padding: "40px 20px",
          color: darkMode ? "white" : "black",
        }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h1 style={{ textAlign: "center", marginBottom: "40px" }}>
            My Requests
          </h1>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "20px",
              marginBottom: "35px",
            }}
          >
            <div style={counterCard}>
              <h3>Total Requests</h3>
              <h1>{allRequests.length}</h1>
            </div>

            <div style={counterCard}>
              <h3>Pending</h3>
              <h1>
                {allRequests.filter((request) => request.status !== "Resolved").length}
              </h1>
            </div>

            <div style={counterCard}>
              <h3>Resolved</h3>
              <h1>
                {allRequests.filter((request) => request.status === "Resolved").length}
              </h1>
            </div>
          </div>

          <input
            type="text"
            placeholder="Search requests..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={inputStyle}
          />

          <select
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
            style={inputStyle}
          >
            <option value="All">All Services</option>
            <option value="Housing">Housing</option>
            <option value="Food">Food</option>
            <option value="Immigration">Immigration</option>
            <option value="Healthcare">Healthcare</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            style={inputStyle}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>

          {filteredRequests.length === 0 ? (
            <h2 style={{ textAlign: "center" }}>No requests found</h2>
          ) : (
            filteredRequests.map((request) => (
              <div key={request._id} style={requestCard}>
                <h2>
                  {request.needType ||
                    request.foodNeed ||
                    request.caseType ||
                    request.healthNeed ||
                    "Request"}
                </h2>

                <p>
                  <strong>Service:</strong>{" "}
                  <span
                    style={{
                      backgroundColor: "#2563eb",
                      color: "white",
                      padding: "5px 10px",
                      borderRadius: "15px",
                      fontWeight: "bold",
                      fontSize: "14px",
                    }}
                  >
                    {request.service === "Housing" && "🏠 Housing"}
                    {request.service === "Food" && "🍲 Food"}
                    {request.service === "Immigration" && "🌍 Immigration"}
                    {request.service === "Healthcare" && "🩺 Healthcare"}
                  </span>
                </p>

                {request.address && (
                  <p>
                    <strong>Address:</strong> {request.address}
                  </p>
                )}

                {request.householdSize && (
                  <p>
                    <strong>Household Size:</strong> {request.householdSize}
                  </p>
                )}

                <p>
                  <strong>Urgency:</strong>{" "}
                  <span
                    style={{
                      backgroundColor:
                        request.urgency === "High" ||
                        request.urgency === "Emergency"
                          ? "#dc2626"
                          : request.urgency === "Medium"
                          ? "#f59e0b"
                          : "#16a34a",
                      color: "white",
                      padding: "5px 10px",
                      borderRadius: "15px",
                      fontWeight: "bold",
                      fontSize: "14px",
                    }}
                  >
                    {request.urgency || "N/A"}
                  </span>
                </p>

                <p>
                  <strong>Description:</strong> {request.description || "N/A"}
                </p>

                {request.fileUrl && (
                  <p>
                    <strong>Uploaded File:</strong>{" "}
                    <a
                      href={request.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "#2563eb",
                        fontWeight: "bold",
                      }}
                    >
                      View Document
                    </a>
                  </p>
                )}

                <p>
                  <strong>Submitted:</strong>{" "}
                  {request.createdAt
                    ? new Date(request.createdAt).toLocaleString()
                    : "N/A"}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    style={{
                      backgroundColor:
                        request.status === "Resolved" ? "#16a34a" : "#f59e0b",
                      color: "white",
                      padding: "6px 12px",
                      borderRadius: "20px",
                      fontWeight: "bold",
                      fontSize: "14px",
                    }}
                  >
                    {request.status || "Pending"}
                  </span>
                </p>

                <button
                  onClick={() => deleteRequest(request)}
                  style={{
                    marginTop: "15px",
                    backgroundColor: "#dc2626",
                    color: "white",
                    border: "none",
                    padding: "10px 16px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Delete Request
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default MyRequests;