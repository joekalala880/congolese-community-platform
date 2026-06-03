import Navbar from "./Navbar";

function Resources() {
  const darkMode = localStorage.getItem("darkMode") === "true";

  const resources = [
    {
      title: "🏠 Housing Resources",
      color: "#2563eb",
      items: [
        "Emergency shelters",
        "Rental assistance programs",
        "Affordable housing information",
        "Landlord and tenant help",
      ],
      button: "Find Housing Help",
    },
    {
      title: "🍎 Food Resources",
      color: "#16a34a",
      items: [
        "Food pantries",
        "Community meals",
        "SNAP assistance",
        "Emergency food support",
      ],
      button: "Find Food Help",
    },
    {
      title: "🏥 Healthcare Resources",
      color: "#dc2626",
      items: [
        "Free clinics",
        "MaineCare information",
        "Mental health support",
        "Appointment help",
      ],
      button: "Find Healthcare Help",
    },
    {
      title: "🌍 Immigration Resources",
      color: "#7c3aed",
      items: [
        "Citizenship workshops",
        "Legal assistance",
        "Translation services",
        "Visa and paperwork support",
      ],
      button: "Find Immigration Help",
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
          padding: "45px 25px",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h1 style={{ textAlign: "center", color: "#2563eb" }}>
            Community Resources
          </h1>

          <p
            style={{
              textAlign: "center",
              marginBottom: "40px",
              fontSize: "18px",
            }}
          >
            Helpful services for housing, food, healthcare, and immigration
            support.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "25px",
            }}
          >
            {resources.map((resource) => (
              <div
                key={resource.title}
                style={{
                  backgroundColor: darkMode ? "#1f2937" : "white",
                  padding: "25px",
                  borderRadius: "16px",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
                  borderTop: `5px solid ${resource.color}`,
                }}
              >
                <h2 style={{ color: resource.color, marginBottom: "18px" }}>
                  {resource.title}
                </h2>

                <ul style={{ lineHeight: "1.9", marginBottom: "25px" }}>
                  {resource.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <button
                  onClick={() => {
                    if (resource.title.includes("Housing")) {
                      window.location.href = "/housing";
                    } else if (resource.title.includes("Food")) {
                      window.location.href = "/food";
                    } else if (resource.title.includes("Healthcare")) {
                      window.location.href = "/healthcare";
                    } else if (resource.title.includes("Immigration")) {
                      window.location.href = "/immigration";
                    }
                  }}
                  style={{
                    backgroundColor: resource.color,
                    color: "white",
                    padding: "10px 16px",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    width: "100%",
                  }}
                >
                  {resource.button}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Resources;