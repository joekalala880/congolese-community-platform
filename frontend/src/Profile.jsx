import Navbar from "./Navbar";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const darkMode = localStorage.getItem("darkMode") === "true";

  const logoutUser = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/";
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
            maxWidth: "600px",
            margin: "0 auto",
            backgroundColor: darkMode ? "#1f2937" : "white",
            padding: "35px",
            borderRadius: "18px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.15)"
          }}
        >
          <h1 style={{ textAlign: "center", color: "#2563eb" }}>
            👤 User Profile
          </h1>

          <div style={{ marginTop: "30px", fontSize: "18px" }}>
            <p><strong>First Name:</strong> {user?.firstName}</p>
            <p><strong>Last Name:</strong> {user?.lastName}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Phone:</strong> {user?.phone}</p>
            <p><strong>Concern:</strong> {user?.concern}</p>
            <p><strong>Role:</strong> {user?.role}</p>
          </div>

          <button
            onClick={() => window.location.href = "/dashboard"}
            style={{
              width: "100%",
              padding: "14px",
              backgroundColor: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontWeight: "bold",
              cursor: "pointer",
              marginTop: "25px"
            }}
          >
            Back to Dashboard
          </button>

          <button
            onClick={logoutUser}
            style={{
              width: "100%",
              padding: "14px",
              backgroundColor: "#dc2626",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontWeight: "bold",
              cursor: "pointer",
              marginTop: "15px"
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default Profile;