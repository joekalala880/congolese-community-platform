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

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/stories`);
      setStories(response.data || []);
    } catch (error) {
      console.log("FETCH STORIES ERROR:", error);
    }
  };

  const addStory = async () => {
    if (!newStory.trim()) {
      alert("Please write your story first");
      return;
    }

    try {
      setLoading(true);

      await axios.post(`${API_URL}/api/stories`, {
        name: user?.firstName || "Anonymous User",
        userEmail: user?.email || "",
        story: newStory,
      });

      setNewStory("");
      fetchStories();
    } catch (error) {
      console.log("ADD STORY ERROR:", error);
      alert("Failed to post story");
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
          color: darkMode ? "white" : "black",
          padding: "40px 20px",
        }}
      >
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <h1 style={{ textAlign: "center", color: "#2563eb" }}>
            Community Stories
          </h1>

          <p style={{ textAlign: "center", marginBottom: "35px" }}>
            Share how the Congolese Community Platform helped you.
          </p>

          <div
            style={{
              backgroundColor: darkMode ? "#1f2937" : "white",
              padding: "25px",
              borderRadius: "15px",
              marginBottom: "30px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
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
                border: "1px solid #ccc",
                marginBottom: "15px",
                boxSizing: "border-box",
              }}
            />

            <button
              onClick={addStory}
              disabled={loading}
              style={{
                backgroundColor: loading ? "#9ca3af" : "#2563eb",
                color: "white",
                border: "none",
                padding: "12px 20px",
                borderRadius: "10px",
                cursor: loading ? "not-allowed" : "pointer",
                fontWeight: "bold",
              }}
            >
              {loading ? "Posting..." : "Post Story"}
            </button>
          </div>

          {stories.length === 0 ? (
            <h2 style={{ textAlign: "center" }}>No stories yet</h2>
          ) : (
            stories.map((story) => (
              <div
                key={story._id}
                style={{
                  backgroundColor: darkMode ? "#1f2937" : "white",
                  padding: "20px",
                  borderRadius: "15px",
                  marginBottom: "20px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              >
                <h3>{story.name}</h3>
                <p>{story.story}</p>
                <small>
                  {story.createdAt
                    ? new Date(story.createdAt).toLocaleString()
                    : ""}
                </small>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Stories;