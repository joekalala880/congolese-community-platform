import Navbar from "./Navbar";

function Resources() {
  const darkMode = localStorage.getItem("darkMode") === "true";

  return (
    <>
      <Navbar />

      <div
        style={{
          minHeight: "100vh",
          backgroundColor: darkMode ? "#0f172a" : "#f8fafc",
          color: darkMode ? "white" : "black",
          padding: "40px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          Community Resources
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          <div className="card">
            <h2>🏠 Housing Resources</h2>
            <p>Emergency shelters</p>
            <p>Rental assistance programs</p>
            <p>Affordable housing information</p>
          </div>

          <div className="card">
            <h2>🍎 Food Resources</h2>
            <p>Food pantries</p>
            <p>Community meals</p>
            <p>SNAP assistance</p>
          </div>

          <div className="card">
            <h2>🏥 Healthcare Resources</h2>
            <p>Free clinics</p>
            <p>MaineCare information</p>
            <p>Mental health support</p>
          </div>

          <div className="card">
            <h2>🌍 Immigration Resources</h2>
            <p>Citizenship workshops</p>
            <p>Legal assistance</p>
            <p>Translation services</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Resources;