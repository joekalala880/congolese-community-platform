import { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import toast from "react-hot-toast";

const API_URL = "https://congolese-community-platform.onrender.com";

function Immigration() {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const darkMode = localStorage.getItem("darkMode") === "true";

  const [formData, setFormData] = useState({
    caseType: "",
    urgency: "",
    description: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const submitImmigrationRequest = async () => {
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

      await axios.post(`${API_URL}/api/immigration/request`, {
        userName: user?.firstName,
        userEmail: user?.email,
        ...formData,
        fileUrl: uploadedFileUrl,
        fileName: uploadedFileName
      });

      toast.success("Immigration request submitted successfully");

      setFormData({
        caseType: "",
        urgency: "",
        description: ""
      });

      setFile(null);
    } catch (error) {
      console.log(error);
      toast.error("Failed to submit immigration request");
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
          <h1 style={{ textAlign: "center", color: "#2563eb" }}>
            🌍 Immigration Support
          </h1>

          <p style={{ textAlign: "center", marginBottom: "30px" }}>
            Get help with immigration cases, paperwork, citizenship, asylum, visas, and legal support.
          </p>

          <select
            name="caseType"
            value={formData.caseType}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="">Select Immigration Case</option>
            <option value="Citizenship">Citizenship</option>
            <option value="Green Card">Green Card</option>
            <option value="Asylum">Asylum</option>
            <option value="Work Permit">Work Permit</option>
            <option value="Family Petition">Family Petition</option>
            <option value="Visa Help">Visa Help</option>
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
            placeholder="Explain your immigration issue"
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
            <p style={{ marginBottom: "15px", color: "#2563eb" }}>
              Selected file: {file.name}
            </p>
          )}

          <button
            onClick={submitImmigrationRequest}
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              backgroundColor: loading ? "#9ca3af" : "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
              marginTop: "10px"
            }}
          >
            {loading ? "Submitting..." : "Submit Immigration Request"}
          </button>

          <button
            onClick={() => window.location.href = "/dashboard"}
            style={{
              width: "100%",
              padding: "14px",
              backgroundColor: darkMode ? "#374151" : "#e5e7eb",
              color: darkMode ? "white" : "black",
              border: "none",
              borderRadius: "10px",
              fontWeight: "bold",
              cursor: "pointer",
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

export default Immigration;