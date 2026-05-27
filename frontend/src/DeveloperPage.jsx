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
          <p><strong>GitHub:</strong> joekalala880</p>
          <p><strong>Project Type:</strong> Full-Stack MERN Community Support Platform</p>
        </div>
      </div>
    </>
  );
}

export default Developer;