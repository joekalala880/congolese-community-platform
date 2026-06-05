import Navbar from "./Navbar";

function Dashboard() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const darkMode = localStorage.getItem("darkMode") === "true";

  if (!token) {
    window.location.href = "/";
  }

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

  const heroButton = {
    backgroundColor: "#2563eb",
    color: "white",
    padding: "12px 20px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
  };

  const statCard = {
    backgroundColor: darkMode ? "#1f2937" : "white",
    padding: "22px",
    borderRadius: "15px",
    textAlign: "center",
    boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
  };

  const storyCard = {
    backgroundColor: darkMode ? "#111827" : "#f3f4f6",
    padding: "20px",
    borderRadius: "14px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
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
        <div style={{ maxWidth: "1150px", margin: "0 auto" }}>
          {/* Hero Section */}
          <div
            style={{
              backgroundColor: darkMode ? "#1f2937" : "white",
              padding: "40px",
              borderRadius: "18px",
              textAlign: "center",
              marginBottom: "35px",
              boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
            }}
          >
            <h1 style={{ color: "#2563eb", marginBottom: "15px" }}>
              Welcome to the Congolese Community Platform
            </h1>

            <p style={{ fontSize: "18px", marginBottom: "25px" }}>
              Connecting Congolese families with housing, healthcare, food
              assistance, immigration support, events, and community resources.
            </p>

            <div
              style={{
                display: "flex",
                gap: "15px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={() => (window.location.href = "/housing")}
                style={heroButton}
              >
                Request Help
              </button>

              <button
                onClick={() => (window.location.href = "/donate")}
                style={heroButton}
              >
                Donate
              </button>

              <button
                onClick={() => (window.location.href = "/resources")}
                style={heroButton}
              >
                View Resources
              </button>
            </div>
          </div>

          {/* Welcome User Section */}
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <h1 style={{ color: "#2563eb" }}>
              Welcome, {user?.firstName}
            </h1>

            <p style={{ fontSize: "18px" }}>
              You are logged in successfully.
            </p>
          </div>

          {/* User Info Card */}
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
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
            <p>
              <strong>Phone:</strong> {user?.phone}
            </p>
            <p>
              <strong>Concern:</strong> {user?.concern}
            </p>
            <p>
              <strong>Role:</strong> {user?.role}
            </p>
          </div>

          {/* Community Statistics */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "20px",
              marginBottom: "35px",
            }}
          >
            <div style={statCard}>
              <h2>125</h2>
              <p>Families Helped</p>
            </div>

            <div style={statCard}>
              <h2>$4,250</h2>
              <p>Donations Raised</p>
            </div>

            <div style={statCard}>
              <h2>18</h2>
              <p>Events Hosted</p>
            </div>

            <div style={statCard}>
              <h2>45</h2>
              <p>Volunteers</p>
            </div>
          </div>

          {/* Success Stories */}
          <div
            style={{
              backgroundColor: darkMode ? "#1f2937" : "white",
              padding: "30px",
              borderRadius: "18px",
              marginBottom: "35px",
              boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
            }}
          >
            <h2
              style={{
                textAlign: "center",
                color: "#2563eb",
                marginBottom: "25px",
              }}
            >
              Success Stories
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "20px",
              }}
            >
              <div style={storyCard}>
                <p>
                  “Thanks to this platform my family found housing support.”
                </p>
                <strong>- Community Member</strong>
              </div>

              <div style={storyCard}>
                <p>
                  “The immigration resources helped me become a U.S. citizen.”
                </p>
                <strong>- Community Member</strong>
              </div>
            </div>
          </div>

          <h2 style={{ textAlign: "center", marginBottom: "25px" }}>
            Community Support Services
          </h2>

          {/* Services */}
          <div
            style={{
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
        </div>
      </div>
    </>
  );
}

export default Dashboard;