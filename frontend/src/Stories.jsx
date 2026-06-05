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
    try {
      const response = await axios.get(`${API_URL}/api/stories`);
      setStories(response.data || []);
    } catch (error) {
      console.error("FETCH STORIES ERROR:", error);
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
      console.error("ADD STORY ERROR:", error);
      alert("Failed to post story");
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (story) => {
    setEditingId(story._id);
    setEditText(story.story);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const saveEdit = async (id) => {
    if (!editText.trim()) {
      alert("Story cannot be empty");
      return;
    }

    try {
      const response = await axios.put(`${API_URL}/api/stories/${id}`, {
        story: editText,
      });

      setStories((prevStories) =>
        prevStories.map((story) =>
          story._id === id ? response.data : story
        )
      );

      cancelEdit();
    } catch (error) {
      console.error("EDIT STORY ERROR:", error);
      alert("Failed to update story");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this story?")) return;

    try {
      await axios.delete(`${API_URL}/api/stories/${id}`);

      setStories((prevStories) =>
        prevStories.filter((story) => story._id !== id)
      );
    } catch (error) {
      console.error("DELETE STORY ERROR:", error);
      alert("Failed to delete story");
    }
  };

  const handleLike = async (id) => {
    try {
      const response = await axios.put(`${API_URL}/api/stories/${id}/like`);

      setStories((prevStories) =>
        prevStories.map((story) =>
          story._id === id ? response.data : story
        )
      );
    } catch (error) {
      console.error("LIKE STORY ERROR:", error);
      alert("Failed to like story");
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
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h1 style={{ textAlign: "center", color: "#2563eb" }}>
            Community Stories
          </h1>

          <p style={{ textAlign: "center", marginBottom: "30px" }}>
            Share your experience with the Congolese Community Platform.
          </p>

          <div
            style={{
              backgroundColor: darkMode ? "#1f2937" : "white",
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
                backgroundColor: loading ? "#9ca3af" : "#2563eb",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "8px",
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
                  borderRadius: "12px",
                  marginBottom: "20px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                }}
              >
                <h3>{story.name}</h3>

                {editingId === story._id ? (
                  <>
                    <textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      style={{
                        width: "100%",
                        minHeight: "100px",
                        padding: "12px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        marginBottom: "10px",
                        boxSizing: "border-box",
                      }}
                    />

                    <button
                      onClick={() => saveEdit(story._id)}
                      style={{
                        backgroundColor: "#16a34a",
                        color: "white",
                        border: "none",
                        padding: "8px 14px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "bold",
                        marginRight: "10px",
                      }}
                    >
                      Save
                    </button>

                    <button
                      onClick={cancelEdit}
                      style={{
                        backgroundColor: "#6b7280",
                        color: "white",
                        border: "none",
                        padding: "8px 14px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <p>{story.story}</p>

                    <small>
                      {story.createdAt
                        ? new Date(story.createdAt).toLocaleString()
                        : ""}
                    </small>

                    <br />

                    <button
                      onClick={() => handleLike(story._id)}
                      style={{
                        marginTop: "12px",
                        backgroundColor: "#e11d48",
                        color: "white",
                        border: "none",
                        padding: "8px 14px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "bold",
                        marginRight: "10px",
                      }}
                    >
                      ❤️ Like {story.likes || 0}
                    </button>

                    <button
                      onClick={() => startEdit(story)}
                      style={{
                        marginTop: "12px",
                        backgroundColor: "#f59e0b",
                        color: "white",
                        border: "none",
                        padding: "8px 14px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "bold",
                        marginRight: "10px",
                      }}
                    >
                      Edit
                    </button>

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
                      Delete
                    </button>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Stories;