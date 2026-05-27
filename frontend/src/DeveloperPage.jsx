import Navbar from "./Navbar";

function Developer() {
  const cardStyle = {
    backgroundColor: "#1f2937",
    padding: "30px",
    borderRadius: "15px",
    marginBottom: "30px",
    boxShadow: "0 0 20px rgba(37, 99, 235, 0.15)",
    transition: "0.3s ease",
  };

  const hoverUp = (e) => {
    e.currentTarget.style.transform = "translateY(-5px)";
  };

  const hoverDown = (e) => {
    e.currentTarget.style.transform = "translateY(0px)";
  };

  return (
    <>
      <Navbar />
      <style>
  {`
    @keyframes pulse {
      0% { opacity: 0.7; }
      50% { opacity: 1; }
      100% { opacity: 0.7; }
    }
  `}
</style>

      <div style={{ textAlign: "center", marginTop: "40px", marginBottom: "40px" }}>
        <h1 style={{ color: "#2563eb", fontSize: "36px", fontWeight: "bold" }}>
          Project Documentation
        </h1>

       <p
  style={{
    color: "#6b7280",
    fontSize: "18px",
    letterSpacing: "1px",
    animation: "pulse 2s infinite",
  }}
>
  Building technology solutions for the Congolese community 🚀
</p>
      </div>

      <div style={{ padding: "40px", maxWidth: "1000px", margin: "auto", color: "white" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <div style={{ ...cardStyle, textAlign: "center" }} onMouseOver={hoverUp} onMouseOut={hoverDown}>
            <h2>4+</h2>
            <p>Support Services</p>
          </div>

          <div style={{ ...cardStyle, textAlign: "center" }} onMouseOver={hoverUp} onMouseOut={hoverDown}>
            <h2>3</h2>
            <p>User Roles</p>
          </div>

          <div style={{ ...cardStyle, textAlign: "center" }} onMouseOver={hoverUp} onMouseOut={hoverDown}>
            <h2>100%</h2>
            <p>Responsive Goal</p>
          </div>
        </div>

        <div style={{ ...cardStyle, textAlign: "left" }} onMouseOver={hoverUp} onMouseOut={hoverDown}>
          <h2>🌍 About the Platform</h2>
          <p style={{ marginTop: "10px" }}>
            Congolese Community is a full-stack support platform designed to help
            community members request assistance with housing, food, healthcare,
            and immigration services.
          </p>

          <p>
            The goal of this project is to make support easier to access, organize
            requests for administrators, and provide a clean digital system for
            community service management.
          </p>
        </div>

        <div style={cardStyle} onMouseOver={hoverUp} onMouseOut={hoverDown}>
          <h2>🧑‍💻 Developer Information</h2>

          <img
            src="https://avatars.githubusercontent.com/u/9919?v=4"
            alt="Developer"
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              marginBottom: "20px",
              border: "4px solid #2563eb",
              boxShadow: "0 0 20px #2563eb",
              transition: "0.3s",
              cursor: "pointer",
            }}
          />

          <p><strong>Name:</strong> Joel Kalala</p>
          <p><strong>Major:</strong> Computer Science</p>
          <p><strong>Role:</strong> Full-Stack MERN Developer</p>

          <p>
            This platform was designed and developed to help the Congolese
            community access housing, immigration, food assistance, and
            healthcare support services.
          </p>
        </div>

        <div style={cardStyle} onMouseOver={hoverUp} onMouseOut={hoverDown}>
          <h2>⚙️ Technologies Used</h2>
          <ul>
            <li>React.js and Vite frontend</li>
            <li>Node.js and Express backend</li>
            <li>MongoDB database</li>
            <li>React Router navigation</li>
            <li>GitHub version control</li>
            <li>Vercel deployment</li>
          </ul>
        </div>

        <div style={cardStyle} onMouseOver={hoverUp} onMouseOut={hoverDown}>
          <h2>📄 Project Features</h2>
          <ul>
            <li>User authentication system</li>
            <li>Admin dashboard</li>
            <li>Housing, food, healthcare, and immigration request systems</li>
            <li>Role-based access control</li>
            <li>Responsive mobile-friendly design</li>
          </ul>
        </div>

        <div style={cardStyle} onMouseOver={hoverUp} onMouseOut={hoverDown}>
          <h2>📬 Contact & Portfolio</h2>

          <p><strong>Developer:</strong> Joel Kalala</p>
          <p><strong>Email:</strong> kalalajoel27@gmail.com</p>

          <p>
            <strong>GitHub:</strong>{" "}
            <a
              href="https://github.com/joekalala880"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#60a5fa", textDecoration: "underline" }}
            >
              joekalala880
            </a>
          </p>

          <p>
            <strong>Project Type:</strong> Full-Stack MERN Community Support Platform
          </p>

          <div style={{ marginTop: "20px" }}>
            <a
              href="https://github.com/joekalala880"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: "#2563eb",
                color: "white",
                padding: "10px 20px",
                borderRadius: "10px",
                textDecoration: "none",
                marginRight: "10px",
                display: "inline-block",
                transition: "0.3s",
                cursor: "pointer",
              }}
            >
              View GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/joel-kalala1-079492293"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: "#0a66c2",
                color: "white",
                padding: "10px 20px",
                borderRadius: "10px",
                textDecoration: "none",
                marginRight: "10px",
                display: "inline-block",
                transition: "0.3s",
                cursor: "pointer",
              }}
            >
              LinkedIn
            </a>

            <a
              href="/dashboard"
              style={{
                backgroundColor: "#16a34a",
                color: "white",
                padding: "10px 20px",
                borderRadius: "10px",
                textDecoration: "none",
                display: "inline-block",
                transition: "0.3s",
                cursor: "pointer",
              }}
            >
              Open Platform
            </a>
          </div>
        </div>

        <div style={cardStyle} onMouseOver={hoverUp} onMouseOut={hoverDown}>
          <h2>🚀 Future Improvements</h2>
          <ul>
            <li>MongoDB Atlas production database</li>
            <li>Backend deployment on Render or Railway</li>
            <li>JWT protected API</li>
            <li>Admin analytics dashboard</li>
            <li>Email notifications</li>
            <li>File uploads for request documents</li>
            <li>AI chatbot helper</li>
            <li>Community announcements system</li>
          </ul>
        </div>
      </div>
      <div
  style={{
    backgroundColor: "#1f2937",
    padding: "30px",
    borderRadius: "15px",
    marginBottom: "30px",
    boxShadow: "0 0 20px rgba(37, 99, 235, 0.15)",
    transition: "0.3s ease",
  }}
  onMouseOver={hoverUp}
  onMouseOut={hoverDown}
>
  <h2>🟢 System Status</h2>

  <p>✅ Frontend Deployment: Online</p>
  <p>✅ Vercel Hosting: Active</p>
  <p>✅ React Router: Working</p>
  <p>✅ Authentication System: Running</p>
  <p>🟡 MongoDB Atlas: Future Upgrade</p>
  <p>🟡 Backend API Hosting: In Progress</p>
</div>

      <footer
        style={{
          textAlign: "center",
          padding: "20px",
          color: "#9ca3af",
          marginTop: "40px",
        }}
      >
        © 2026 Joel Kalala — Congolese Community Platform
      </footer>
    </>
  );
}

export default Developer;