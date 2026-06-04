import Navbar from "./Navbar";

function Donate() {
  const darkMode = localStorage.getItem("darkMode") === "true";

  const donationOptions = [
    {
      title: "💳 Stripe",
      description:
        "Support the Congolese Community using a secure credit or debit card payment.",
      button: "Donate with Stripe",
      color: "#2563eb",
      link: "https://buy.stripe.com/test_7sY00jbqM2tG12xd6c9R601",
    },
    {
      title: "🅿️ PayPal",
      description: "Send support through PayPal.",
      button: "Donate with PayPal",
      color: "#0ea5e9",
      link: "https://www.paypal.me/joekalala",
    },
    {
      title: "💵 CashApp",
      description: "Support directly through Cash App.",
      button: "Donate with CashApp",
      color: "#16a34a",
      link: "https://cash.app/$kalalajoe",
    },
  ];

  const handleDonate = (link) => {
    window.open(link, "_blank");
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          minHeight: "100vh",
          backgroundColor: darkMode ? "#0f172a" : "#f3f4f6",
          color: darkMode ? "white" : "black",
          padding: "40px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              color: "#3b82f6",
              marginBottom: "10px",
            }}
          >
            Support the Community
          </h1>

          <p
            style={{
              textAlign: "center",
              fontSize: "18px",
              marginBottom: "30px",
            }}
          >
            Help support food drives, housing assistance, healthcare access,
            immigration help, and community events.
          </p>

          <h2
            style={{
              textAlign: "center",
              marginBottom: "15px",
            }}
          >
            Community Fund Goal
          </h2>

          <div
            style={{
              width: "100%",
              background: "#374151",
              borderRadius: "12px",
              overflow: "hidden",
              marginBottom: "40px",
            }}
          >
            <div
              style={{
                width: "35%",
                background: "#22c55e",
                padding: "12px",
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
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "25px",
            }}
          >
            {donationOptions.map((option) => (
              <div
                key={option.title}
                style={{
                  backgroundColor: darkMode ? "#1e293b" : "white",
                  padding: "25px",
                  borderRadius: "16px",
                  borderTop: `5px solid ${option.color}`,
                  boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
                }}
              >
                <h2
                  style={{
                    color: option.color,
                    marginBottom: "10px",
                  }}
                >
                  {option.title}
                </h2>

                <p>{option.description}</p>

                <button
                  onClick={() => handleDonate(option.link)}
                  style={{
                    width: "100%",
                    marginTop: "15px",
                    padding: "12px",
                    border: "none",
                    borderRadius: "10px",
                    backgroundColor: option.color,
                    color: "white",
                    fontWeight: "bold",
                    cursor: "pointer",
                    fontSize: "16px",
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