import Navbar from "./Navbar";

function Donate() {
  const darkMode = localStorage.getItem("darkMode") === "true";

  const donationOptions = [
    {
      title: "💳 Stripe",
      description: "Support with credit or debit card.",
      button: "Donate with Stripe",
      color: "#2563eb",
    },
    {
      title: "🅿️ PayPal",
      description: "Send support through PayPal.",
      button: "Donate with PayPal",
      color: "#0ea5e9",
    },
    {
      title: "💵 CashApp",
      description: "Support directly through CashApp.",
      button: "Donate with CashApp",
      color: "#16a34a",
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
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h1 style={{ textAlign: "center", color: "#2563eb" }}>
            Support the Community
          </h1>

          <p style={{ textAlign: "center", marginBottom: "40px" }}>
            Help support food drives, housing assistance, healthcare access,
            immigration help, and community events.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "25px",
            }}
          >
            {donationOptions.map((option) => (
              <div
                key={option.title}
                style={{
                  backgroundColor: darkMode ? "#1f2937" : "white",
                  padding: "25px",
                  borderRadius: "16px",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
                  borderTop: `5px solid ${option.color}`,
                }}
              >
                <h2 style={{ color: option.color }}>{option.title}</h2>
                <p>{option.description}</p>

                <button
                  onClick={() =>
                    alert("Donation payment setup coming soon.")
                  }
                  style={{
                    backgroundColor: option.color,
                    color: "white",
                    padding: "10px 16px",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    width: "100%",
                    marginTop: "15px",
                  }}
                >
                  {option.button}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Donate;