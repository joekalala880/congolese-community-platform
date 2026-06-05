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
      setStories(response.data);
    } catch (error) {
      console.error("Error fetching stories:", error);
    }
  };

  const addStory = async () => {
    if (!newStory.trim()) {
      alert("Please write your story first.");
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
      console.error("Error posting story:", error);
      alert("Failed to post story.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this story?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/api/stories/${id}`);

      setStories((prevStories) =>
        prevStories.filter((story) => story._id !== id)
      );
    } catch (error) {
      console.error("Error deleting story:", error);
      alert("Failed to delete story.");
    }
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          minHeight: "100vh",
          backgroundColor: darkMode ? "#111827" : "#f3f4f6",
          color: darkMode ? "#ffffff" : "#000000",
          padding: "40px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              color: "#2563eb",
              marginBottom: "10px",
            }}
          >
            Community Stories
          </h1>

          <p
            style={{
              textAlign: "center",
              marginBottom: "30px",
            }}
          >
            Share your experience with the Congolese Community Platform.
          </p>

          <div
            style={{
              backgroundColor: darkMode ? "#1f2937" : "#ffffff",
              padding: "20px",
              borderRadius: "12px",
              marginBottom: "30px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <textarea
              value={newStory}
              onChange={(e) => setNewStory(e.target.value)}
              placeholder="Write your story..."
              style={{
                width: "100%",
                minHeight: "120px",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                marginBottom: "15px",
                boxSizing: "border-box",
              }}
            />

            <button
              onClick={addStory}
              disabled={loading}
              style={{
                backgroundColor: "#2563eb",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              {loading ? "Posting..." : "Post Story"}
            </button>
          </div>

          {stories.length === 0 ? (
            <h2 style={{ textAlign: "center" }}>
              No stories have been posted yet.
            </h2>
          ) : (
            stories.map((story) => (
              <div
                key={story._id}
                style={{
                  backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                  padding: "20px",
                  borderRadius: "12px",
                  marginBottom: "20px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                }}
              >
                <h3>{story.name}</h3>

                <p>{story.story}</p>

                <small>
                  {story.createdAt
                    ? new Date(story.createdAt).toLocaleString()
                    : ""}
                </small>

                <br />

                <button
                  onClick={() => handleDelete(story._id)}
                  style={{
                    marginTop: "12px",
                    backgroundColor: "#dc2626",
                    color: "white",
                    border: "none",
                    padding: "8px 14px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Delete Story
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Stories;