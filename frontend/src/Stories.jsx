import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const API_URL = "https://congolese-community-platform.onrender.com";

function Stories() {
  const darkMode = localStorage.getItem("darkMode") === "true";
  const user = JSON.parse(localStorage.getItem("user"));

  const [stories, setStories] = useState([]);
  const [newStory, setNewStory] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    const response = await axios.get(`${API_URL}/api/stories`);
    setStories(response.data || []);
  };

  const addStory = async () => {
    if (!newStory.trim()) return alert("Please write your story first");

    setLoading(true);
    await axios.post(`${API_URL}/api/stories`, {
      name: user?.firstName || "Anonymous User",
      userEmail: user?.email || "",
      story: newStory,
    });

    setNewStory("");
    setLoading(false);
    fetchStories();
  };

  const deleteStory = async (id) => {
    if (!window.confirm("Delete this story?")) return;
    await axios.delete(`${API_URL}/api/stories/${id}`);
    fetchStories();
  };

  const startEdit = (item) => {
    setEditingId(item._id);
    setEditText(item.story);
  };

  const saveEdit = async (id) => {
    if (!editText.trim()) return alert("Story cannot be empty");

    await axios.put(`${API_URL}/api/stories/${id}`, {
      story: editText,
    });

    setEditingId(null);
    setEditText("");
    fetchStories();
  };

  const likeStory = async (id) => {
    await axios.put(`${API_URL}/api/stories/${id}/like`);
    fetchStories();
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          minHeight: "100vh",
          backgroundColor: darkMode ? "#111827" : "#f3f4f6",
          color: darkMode ? "white" : "black",
          padding: "40px 20px",
        }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h1 style={{ textAlign: "center", color: "#2563eb" }}>
            Community Stories
          </h1>

          <p style={{ textAlign: "center", marginBottom: "30px" }}>
            Share how the Congolese Community Platform helped you.
          </p>

          <div
            style={{
              backgroundColor: darkMode ? "#1f2937" : "white",
              padding: "25px",
              borderRadius: "15px",
              marginBottom: "30px",
            }}
          >
            <textarea
              value={newStory}
              onChange={(e) => setNewStory(e.target.value)}
              placeholder="Write your story..."
              style={{
                width: "100%",
                minHeight: "120px",
                padding: "15px",
                borderRadius: "10px",
                marginBottom: "15px",
                boxSizing: "border-box",
              }}
            />

            <button
              onClick={addStory}
              disabled={loading}
              style={blueButton}
            >
              {loading ? "Posting..." : "Post Story"}
            </button>
          </div>

          {stories.map((item) => (
            <div
              key={item._id}
              style={{
                backgroundColor: darkMode ? "#1f2937" : "white",
                padding: "20px",
                borderRadius: "15px",
                marginBottom: "20px",
              }}
            >
              <h3>{item.name}</h3>

              {editingId === item._id ? (
                <>
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    style={{
                      width: "100%",
                      minHeight: "100px",
                      padding: "12px",
                      borderRadius: "10px",
                      marginBottom: "10px",
                      boxSizing: "border-box",
                    }}
                  />

                  <button onClick={() => saveEdit(item._id)} style={greenButton}>
                    Save
                  </button>

                  <button
                    onClick={() => setEditingId(null)}
                    style={grayButton}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <p>{item.story}</p>

                  <small>
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleString()
                      : ""}
                  </small>

                  <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
                    <button onClick={() => likeStory(item._id)} style={redButton}>
                      ❤️ Like {item.likes || 0}
                    </button>

                    {item.userEmail === user?.email && (
                      <>
                        <button onClick={() => startEdit(item)} style={yellowButton}>
                          Edit
                        </button>

                        <button onClick={() => deleteStory(item._id)} style={redButton}>
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

const blueButton = {
  backgroundColor: "#2563eb",
  color: "white",
  border: "none",
  padding: "12px 20px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
};

const greenButton = {
  ...blueButton,
  backgroundColor: "#16a34a",
  marginRight: "10px",
};

const redButton = {
  ...blueButton,
  backgroundColor: "#dc2626",
};

const yellowButton = {
  ...blueButton,
  backgroundColor: "#f59e0b",
};

const grayButton = {
  ...blueButton,
  backgroundColor: "#6b7280",
};

export default Stories;