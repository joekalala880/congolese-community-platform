import Navbar from "./Navbar";

function Events() {
  const darkMode = localStorage.getItem("darkMode") === "true";

  const events = [
    {
      title: "🍎 Food Drive",
      date: "June 15",
      location: "Portland Community Center",
      description: "Free food support for families and new arrivals.",
    },
    {
      title: "👥 Community Meeting",
      date: "June 20",
      location: "Lewiston Public Library",
      description: "Discuss community needs, resources, and support programs.",
    },
    {
      title: "🌍 Citizenship Workshop",
      date: "June 25",
      location: "USM Portland Campus",
      description: "Help with citizenship forms, questions, and documents.",
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
        <h1 style={{ textAlign: "center", color: "#2563eb" }}>
          Community Events
        </h1>

        <p style={{ textAlign: "center", marginBottom: "40px" }}>
          Upcoming events for the Congolese community.
        </p>

        <div
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "25px",
          }}
        >
          {events.map((event) => (
            <div
              key={event.title}
              style={{
                backgroundColor: darkMode ? "#1f2937" : "white",
                padding: "25px",
                borderRadius: "16px",
                boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
              }}
            >
              <h2>{event.title}</h2>
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p>{event.description}</p>

              <button
                style={{
                  backgroundColor: "#2563eb",
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
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Events;