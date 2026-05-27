import Navbar from "./Navbar";

function Developer() {
  return (
    <>
      <Navbar />

      <div
        style={{
          textAlign: "center",
          marginTop: "40px",
          marginBottom: "40px",
        }}
      >
        <h1
          style={{
            color: "#2563eb",
            fontSize: "36px",
            fontWeight: "bold",
          }}
        >
          Project Documentation
        </h1>

        <p style={{ color: "#6b7280", fontSize: "18px" }}>
          Built by Joel Kalala — Full-Stack MERN Developer
        </p>
      </div>

      <div
        style={{
          padding: "40px",
          maxWidth: "1000px",
          margin: "auto",
          color: "white",
        }}
      >
        <div
          style={{
            backgroundColor: "#1f2937",
            padding: "30px",
            borderRadius: "15px",
            marginBottom: "30px",
          }}
        >
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

        <div
          style={{
            backgroundColor: "#1f2937",
            padding: "30px",
            borderRadius: "15px",
            marginBottom: "30px",
          }}
        >
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

        <div
          style={{
            backgroundColor: "#1f2937",
            padding: "30px",
            borderRadius: "15px",
            marginBottom: "30px",
          }}
        >
          <h2>📄 Project Features</h2>
          <ul>
            <li>User authentication system</li>
            <li>Admin dashboard</li>
            <li>Housing, food, healthcare, and immigration request systems</li>
            <li>Role-based access control</li>
            <li>Responsive mobile-friendly design</li>
          </ul>
        </div>

        <div
          style={{
            backgroundColor: "#1f2937",
            padding: "30px",
            borderRadius: "15px",
            marginBottom: "30px",
          }}
        >
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
  width: "120px",
  height: "120px",
  borderRadius: "50%",
  marginBottom: "20px",
  border: "4px solid #2563eb",
  boxShadow: "0 0 20px #2563eb",
  transition: "0.3s",
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
  }}
>
              Open Platform
            </a>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#1f2937",
            padding: "30px",
            borderRadius: "15px",
            marginBottom: "30px",
          }}
        >
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
    </>
  );
}

export default Developer;