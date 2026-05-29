import { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import toast from "react-hot-toast";

const API_URL = "https://congolese-community-platform.onrender.com";

function Healthcare() {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const darkMode = localStorage.getItem("darkMode") === "true";

  const [formData, setFormData] = useState({
    healthNeed: "",
    urgency: "",
    description: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const submitHealthcareRequest = async () => {
    try {
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

      await axios.post(`${API_URL}/api/healthcare/request`, {
        userName: user?.firstName,
        userEmail: user?.email,
        ...formData,
        fileUrl: uploadedFileUrl,
        fileName: uploadedFileName
      });

      toast.success("Healthcare request submitted successfully");

      setFormData({
        healthNeed: "",
        urgency: "",
        description: ""
      });

      setFile(null);
    } catch (error) {
      console.log(error);
      toast.error("Failed to submit healthcare request");
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
          <h1 style={{ textAlign: "center", color: "#dc2626" }}>
            🩺 Healthcare Support
          </h1>

          <p style={{ textAlign: "center", marginBottom: "30px" }}>
            Request healthcare assistance, medical support, appointments, or health resources.
          </p>

          <select
            name="healthNeed"
            value={formData.healthNeed}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="">Select Healthcare Need</option>
            <option value="Doctor Appointment">Doctor Appointment</option>
            <option value="Health Insurance">Health Insurance</option>
            <option value="Medication Help">Medication Help</option>
            <option value="Mental Health Support">Mental Health Support</option>
            <option value="Emergency Medical Help">Emergency Medical Help</option>
          </select>

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
            placeholder="Explain your healthcare situation"
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
            accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
            onChange={(e) => setFile(e.target.files[0])}
            style={inputStyle}
          />

          {file && (
            <p style={{ marginBottom: "15px", color: "#dc2626" }}>
              Selected file: {file.name}
            </p>
          )}

          <button
            onClick={submitHealthcareRequest}
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              backgroundColor: loading ? "#9ca3af" : "#dc2626",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
              marginTop: "10px"
            }}
          >
            {loading ? "Submitting..." : "Submit Healthcare Request"}
          </button>

          <button
            onClick={() => window.location.href = "/dashboard"}
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

export default Healthcare;