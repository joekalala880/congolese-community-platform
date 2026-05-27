import Navbar from "./Navbar";

function Developer() {
  return (
    <>
      <Navbar />

      <div style={{ padding: "40px", maxWidth: "1000px", margin: "auto", color: "white" }}>
        <h1 style={{ textAlign: "center", marginBottom: "40px" }}>
          Developer Documentation
        </h1>

        <div style={{ backgroundColor: "#1f2937", padding: "30px", borderRadius: "15px", marginBottom: "30px" }}>
          <h2>👨‍💻 Developer Information</h2>
          <p><strong>Name:</strong> Joel Kalala</p>
          <p><strong>Major:</strong> Computer Science</p>
          <p><strong>Role:</strong> Full-Stack MERN Developer</p>
          <p>
            This platform was designed and developed to help the Congolese community access
            housing, immigration, food assistance, and healthcare support services.
          </p>
        </div>

        <div style={{ backgroundColor: "#1f2937", padding: "30px", borderRadius: "15px", marginBottom: "30px" }}>
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

        <div style={{ backgroundColor: "#1f2937", padding: "30px", borderRadius: "15px", marginBottom: "30px" }}>
          <h2>📄 Project Features</h2>
          <ul>
            <li>User authentication system</li>
            <li>Admin dashboard</li>
            <li>Housing, food, healthcare, and immigration request systems</li>
            <li>Role-based access control</li>
            <li>Search, filter, sort, and status badges</li>
            <li>Live deployed frontend</li>
          </ul>
        </div>

        <div style={{ backgroundColor: "#1f2937", padding: "30px", borderRadius: "15px", marginBottom: "30px" }}>
          <h2>🚀 Deployment</h2>
          <p>
            This project was deployed using Vercel and connected to GitHub for automatic
            deployments after each update.
          </p>
        </div>

        <div style={{ backgroundColor: "#1f2937", padding: "30px", borderRadius: "15px" }}>
          <h2>🛣️ Future Improvements & Scalability</h2>
          <ul>
            <li>MongoDB Atlas production database integration</li>
            <li>Backend deployment using Render or Railway</li>
            <li>Real-time admin dashboard</li>
            <li>Email notification system</li>
            <li>File upload support for documents</li>
            <li>AI chatbot community helper</li>
            <li>Fully mobile responsive UI</li>
            <li>Analytics and reporting dashboard</li>
            <li>JWT protected API authentication</li>
            <li>Advanced role-based permissions</li>
            <li>Public landing page</li>
            <li>Community announcements system</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Developer;