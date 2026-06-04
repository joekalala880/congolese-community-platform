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

  const handleDonate = (option) => {
    if (option.title.includes("PayPal")) {
      window.open("https://www.paypal.me/joekalala", "_blank");
    } else if (option.title.includes("CashApp")) {
      window.open("https://cash.app/$kalalajoe", "_blank");
    } else {
      alert("Stripe integration coming soon.");
    }
  };

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

          <p
            style={{
              textAlign: "center",
              marginBottom: "30px",
              fontSize: "18px",
            }}
          >
            Help support food drives, housing assistance, healthcare access,
            immigration help, and community events.
          </p>

          <h2 style={{ textAlign: "center", marginBottom: "15px" }}>
            Community Fund Goal
          </h2>

          <div
            style={{
              width: "100%",
              background: "#374151",
              borderRadius: "10px",
              overflow: "hidden",
              marginBottom: "40px",
            }}
          >
            <div
              style={{
                width: "35%",
                background: "#22c55e",
                padding: "10px",
                textAlign: "center",
                color: "white",
                fontWeight: "bold",
              }}
            >
              $3,500 Raised of $10,000
            </div>
          </div>

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
                  onClick={() => handleDonate(option)}
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