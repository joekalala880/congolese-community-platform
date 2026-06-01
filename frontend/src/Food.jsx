import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const API_URL = "https://congolese-community-platform.onrender.com";

function Food() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    foodNeed: "",
    householdSize: "",
    urgency: "",
    description: ""
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const inputStyle = {
    width: "100%",
    padding: "14px",
    marginBottom: "18px",
    borderRadius: "8px",
    border: "1px solid #94a3b8",
    background: "#1e293b",
    color: "white"
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.foodNeed ||
      !formData.householdSize ||
      !formData.urgency ||
      !formData.description
    ) {
      toast.error("Please fill all fields");
      return;
    }

    if (isNaN(formData.householdSize)) {
      toast.error("Household size must be a number");
      return;
    }

    setLoading(true);

    try {
      let uploadedFileUrl = "";
      let uploadedFileName = "";

      if (file) {
        const uploadData = new FormData();
        uploadData.append("file", file);

        const uploadResponse = await axios.post(`${API_URL}/api/upload`, uploadData);
        uploadedFileUrl = uploadResponse.data.fileUrl || "";
        uploadedFileName = uploadResponse.data.fileName || "";
      }

      await axios.post(`${API_URL}/api/food/request`, {
        userEmail: user?.email || "",
        userName: user?.firstName || user?.name || "User",
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
      console.log("FOOD SUBMIT ERROR:", error);
      toast.error(error.response?.data?.message || "Failed to submit food request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", color: "white", padding: "40px" }}>
      <div style={{ maxWidth: "650px", margin: "0 auto", background: "#1e293b", padding: "35px", borderRadius: "15px" }}>
        <h2 style={{ textAlign: "center", color: "#16a34a" }}>🍲 Food Assistance</h2>
        <p style={{ textAlign: "center" }}>
          Request food support, emergency food help, or nutrition assistance.
        </p>

        <form onSubmit={handleSubmit}>
          <select name="foodNeed" value={formData.foodNeed} onChange={handleChange} style={inputStyle}>
            <option value="">Select Food Need</option>
            <option value="Emergency Food">Emergency Food</option>
            <option value="Food Pantry">Food Pantry</option>
            <option value="Baby Food">Baby Food</option>
            <option value="Nutrition Assistance">Nutrition Assistance</option>
          </select>

          <input
            type="number"
            name="householdSize"
            placeholder="Household Size"
            value={formData.householdSize}
            onChange={handleChange}
            style={inputStyle}
          />

          <select name="urgency" value={formData.urgency} onChange={handleChange} style={inputStyle}>
            <option value="">Select Urgency</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="Emergency">Emergency</option>
          </select>

          <textarea
            name="description"
            placeholder="Explain your food situation"
            value={formData.description}
            onChange={handleChange}
            style={{ ...inputStyle, height: "140px" }}
          />

          <label style={{ fontWeight: "bold" }}>Upload document optional</label>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,.webp"
            onChange={(e) => setFile(e.target.files[0] || null)}
            style={inputStyle}
          />

          {file && <p style={{ color: "#22c55e" }}>Selected file: {file.name}</p>}

          <button type="submit" disabled={loading} style={{ width: "100%", padding: "15px", background: "#16a34a", color: "white", border: "none", borderRadius: "8px", fontWeight: "bold" }}>
            {loading ? "Submitting..." : "Submit Food Request"}
          </button>

          <button type="button" onClick={() => navigate("/dashboard")} style={{ width: "100%", marginTop: "15px", padding: "15px", background: "#475569", color: "white", border: "none", borderRadius: "8px", fontWeight: "bold" }}>
            Back to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}

export default Food;