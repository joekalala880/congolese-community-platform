import { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import toast from "react-hot-toast";

const API_URL = "https://congolese-community-platform.onrender.com";

function Food() {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const darkMode = localStorage.getItem("darkMode") === "true";

  const [formData, setFormData] = useState({
    foodNeed: "",
    householdSize: "",
    urgency: "",
    description: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const submitFoodRequest = async () => {
    try {
      if (!formData.foodNeed || !formData.householdSize || !formData.urgency || !formData.description) {
        toast.error("Please fill all fields");
        return;
      }

      setLoading(true);

      let uploadedFileUrl = "";
      let uploadedFileName = "";

      if (file) {
        const uploadData = new FormData();
        uploadData.append("file", file);

        const uploadResponse = await axios.post(`${API_URL}/api/upload`, uploadData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });

        uploadedFileUrl = uploadResponse.data.fileUrl;
        uploadedFileName = uploadResponse.data.fileName;
      }

      await axios.post(`${API_URL}/api/food/request`, {
        userName: user?.firstName,
        userEmail: user?.email,
        foodNeed: formData.foodNeed,
        householdSize: formData.householdSize,
        urgency: formData.urgency,
        description: formData.description,
        fileUrl: uploadedFileUrl,
        fileName: uploadedFileName
      });

      toast.success("Food request submitted successfully");

      setFormData({
        foodNeed: "",
        householdSize: "",
        urgency: "",
        description: ""
      });

      setFile(null);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to submit food request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          minHeight: "100vh",
          backgroundColor: darkMode ? "#111827" : "#f3f4f6",
          padding: "50px 20px",
          color: darkMode ? "white" : "black"
        }}
      >
        <div
          style={{
            maxWidth: "650px",
            margin: "0 auto",
            backgroundColor: darkMode ? "#1f2937" : "white",
            padding: "35px",
            borderRadius: "18px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.15)"
          }}
        >
          <h1 style={{ textAlign: "center", color: "#16a34a" }}>
            🍲 Food Assistance
          </h1>

          <p style={{ textAlign: "center", marginBottom: "30px" }}>
            Request food support, emergency food help, or nutrition assistance.
          </p>

          <select
            name="foodNeed"
            value={formData.foodNeed}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="">Select Food Need</option>
            <option value="Emergency Food">Emergency Food</option>
            <option value="Food Pantry">Food Pantry</option>
            <option value="Baby Food">Baby Food</option>
            <option value="Nutrition Support">Nutrition Support</option>
          </select>

          <input
            name="householdSize"
            value={formData.householdSize}
            onChange={handleChange}
            placeholder="Household Size"
            style={inputStyle}
          />

          <select
            name="urgency"
            value={formData.urgency}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="">Select Urgency</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Emergency">Emergency</option>
          </select>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Explain your food situation"
            rows="5"
            style={{
              ...inputStyle,
              resize: "vertical"
            }}
          />

          <label style={{ fontWeight: "bold", display: "block", marginBottom: "8px" }}>
            Upload document optional
          </label>

          <input
            type="file"
            accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.webp"
            onChange={(e) => setFile(e.target.files[0])}
            style={inputStyle}
          />

          {file && (
            <p style={{ marginBottom: "15px", color: "#16a34a" }}>
              Selected file: {file.name}
            </p>
          )}

          <button
            onClick={submitFoodRequest}
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              backgroundColor: loading ? "#9ca3af" : "#16a34a",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
              marginTop: "10px"
            }}
          >
            {loading ? "Submitting..." : "Submit Food Request"}
          </button>

          <button
            onClick={() => (window.location.href = "/dashboard")}
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              backgroundColor: darkMode ? "#374151" : "#e5e7eb",
              color: darkMode ? "white" : "black",
              border: "none",
              borderRadius: "10px",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
              marginTop: "15px"
            }}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginBottom: "18px",
  borderRadius: "10px",
  border: "1px solid #d1d5db",
  fontSize: "16px",
  boxSizing: "border-box"
};

export default Food;