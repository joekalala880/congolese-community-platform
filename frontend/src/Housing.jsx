import { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import toast from "react-hot-toast";

const API_URL = "https://congolese-community-platform.onrender.com";

function Housing() {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const darkMode = localStorage.getItem("darkMode") === "true";

  const [formData, setFormData] = useState({
    address: "",
    needType: "",
    urgency: "",
    description: "",
  });

  const inputStyle = {
    width: "100%",
    padding: "14px",
    marginBottom: "18px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    fontSize: "16px",
    boxSizing: "border-box",
    backgroundColor: darkMode ? "#111827" : "white",
    color: darkMode ? "white" : "black",
  };

  const allowedFileTypes = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      setFile(null);
      return;
    }

    if (!allowedFileTypes.includes(selectedFile.type)) {
      toast.error("Only PDF and image files are allowed");
      e.target.value = "";
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  const submitHousingRequest = async () => {
    if (!formData.address || !formData.needType || !formData.urgency || !formData.description) {
      toast.error("Please complete all fields");
      return;
    }

    try {
      setLoading(true);

      let uploadedFileUrl = "";
      let uploadedFileName = "";

      if (file) {
        const uploadData = new FormData();
        uploadData.append("file", file);

        const uploadResponse = await axios.post(
          `${API_URL}/api/upload`,
          uploadData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        uploadedFileUrl = uploadResponse.data.fileUrl;
        uploadedFileName = uploadResponse.data.fileName;
      }

      await axios.post(`${API_URL}/api/housing/request`, {
        userName: user?.firstName || "Anonymous User",
        userEmail: user?.email || "",
        ...formData,
        fileUrl: uploadedFileUrl,
        fileName: uploadedFileName,
      });

      toast.success("Housing request submitted successfully");

      setFormData({
        address: "",
        needType: "",
        urgency: "",
        description: "",
      });

      setFile(null);
    } catch (error) {
      console.log("HOUSING SUBMIT ERROR:", error);
      toast.error(
        error.response?.data?.message || "Failed to submit housing request"
      );
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
          color: darkMode ? "white" : "black",
        }}
      >
        <div
          style={{
            maxWidth: "650px",
            margin: "0 auto",
            backgroundColor: darkMode ? "#1f2937" : "white",
            padding: "35px",
            borderRadius: "18px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
          }}
        >
          <h1 style={{ textAlign: "center", color: "#2563eb" }}>
            🏠 Housing Support
          </h1>

          <p style={{ textAlign: "center", marginBottom: "30px" }}>
            Submit housing needs, rent help, shelter support, or landlord issues.
          </p>

          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address or city"
            style={inputStyle}
          />

          <select
            name="needType"
            value={formData.needType}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="">Select Housing Need</option>
            <option value="Rent Help">Rent Help</option>
            <option value="Shelter Support">Shelter Support</option>
            <option value="Landlord Issue">Landlord Issue</option>
            <option value="Utility Help">Utility Help</option>
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
            placeholder="Explain your housing problem"
            rows="5"
            style={{
              ...inputStyle,
              resize: "vertical",
            }}
          />

          <label
            style={{
              fontWeight: "bold",
              display: "block",
              marginBottom: "8px",
            }}
          >
           Upload document optional (PDF, Word, or image)
          </label>

          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx"
            onChange={handleFileChange}
            style={inputStyle}
          />

          {file && (
            <p style={{ marginBottom: "15px", color: "#2563eb" }}>
              Selected file: {file.name}
            </p>
          )}

          <button
            onClick={submitHousingRequest}
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
              marginTop: "10px",
            }}
          >
            {loading ? "Submitting..." : "Submit Housing Request"}
          </button>

          <button
            onClick={() => (window.location.href = "/dashboard")}
            style={{
              width: "100%",
              padding: "14px",
              backgroundColor: darkMode ? "#374151" : "#e5e7eb",
              color: darkMode ? "white" : "black",
              border: "none",
              borderRadius: "10px",
              fontWeight: "bold",
              cursor: "pointer",
              marginTop: "15px",
            }}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </>
  );
}

export default Housing;