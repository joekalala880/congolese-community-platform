import Navbar from "./Navbar";

function Dashboard() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const darkMode = localStorage.getItem("darkMode") === "true";

  if (!token) {
    window.location.href = "/";
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const services = [
    {
      title: "🏠 Housing Assistance",
      text: "Find housing support, rent help, and shelter resources.",
      link: "/housing",
    },
    {
      title: "🍲 Food Assistance",
      text: "Request food help and nutrition support.",
      link: "/food",
    },
    {
      title: "🩺 Healthcare Support",
      text: "Access healthcare guidance and medical services.",
      link: "/healthcare",
    },
    {
      title: "🌍 Immigration Services",
      text: "Get immigration information and legal support.",
      link: "/immigration",
    },
    {
      title: "👤 My Profile",
      text: "View and manage your personal account.",
      link: "/profile",
    },
  ];

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
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h1 style={{ color: "#2563eb" }}>
            Welcome, {user?.firstName}
          </h1>

          <p style={{ fontSize: "18px" }}>
            You are logged in successfully.
          </p>
        </div>

        <div
          style={{
            maxWidth: "550px",
            margin: "0 auto 45px auto",
            backgroundColor: darkMode ? "#1f2937" : "white",
            padding: "25px",
            borderRadius: "18px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
            textAlign: "center",
          }}
        >
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Phone:</strong> {user?.phone}</p>
          <p><strong>Concern:</strong> {user?.concern}</p>
          <p><strong>Role:</strong> {user?.role}</p>
        </div>

        <h2 style={{ textAlign: "center", marginBottom: "25px" }}>
          Community Support Services
        </h2>

        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "25px",
          }}
        >
          {services.map((service) => (
            <div
              key={service.title}
              onClick={() => (window.location.href = service.link)}
              style={{
                backgroundColor: darkMode ? "#1f2937" : "white",
                padding: "30px",
                borderRadius: "18px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
                cursor: "pointer",
                textAlign: "center",
              }}
            >
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "45px" }}>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "#dc2626",
              color: "white",
              border: "none",
              padding: "14px 30px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default Dashboard;