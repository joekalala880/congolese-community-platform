import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const API_URL = "https://congolese-community-platform.onrender.com";

function Analytics() {
  const [housingRequests, setHousingRequests] = useState([]);
  const [foodRequests, setFoodRequests] = useState([]);
  const [healthcareRequests, setHealthcareRequests] = useState([]);
  const [immigrationRequests, setImmigrationRequests] = useState([]);

  const darkMode = localStorage.getItem("darkMode") === "true";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [housingRes, foodRes, healthcareRes, immigrationRes] =
        await Promise.all([
          axios.get(`${API_URL}/api/housing/requests`),
          axios.get(`${API_URL}/api/food/requests`),
          axios.get(`${API_URL}/api/healthcare/requests`),
          axios.get(`${API_URL}/api/immigration/requests`),
        ]);

      setHousingRequests(housingRes.data || []);
      setFoodRequests(foodRes.data || []);
      setHealthcareRequests(healthcareRes.data || []);
      setImmigrationRequests(immigrationRes.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const chartData = {
    labels: ["Housing", "Food", "Healthcare", "Immigration"],
    datasets: [
      {
        label: "Requests",
        data: [
          housingRequests.length,
          foodRequests.length,
          healthcareRequests.length,
          immigrationRequests.length,
        ],
        backgroundColor: [
          "#2563eb",
          "#16a34a",
          "#dc2626",
          "#7c3aed",
        ],
      },
    ],
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          minHeight: "100vh",
          padding: "30px",
          backgroundColor: darkMode ? "#0f172a" : "#f5f5f5",
          color: darkMode ? "white" : "black",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          Community Analytics
        </h1>

        <div
          style={{
            backgroundColor: darkMode ? "#1f2937" : "white",
            padding: "20px",
            borderRadius: "14px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.12)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(350px, 1fr))",
              gap: "30px",
            }}
          >
            <div style={{ height: "400px" }}>
              <Bar
                data={chartData}
                options={{ maintainAspectRatio: false }}
              />
            </div>

            <div style={{ height: "400px" }}>
              <Pie
                data={chartData}
                options={{ maintainAspectRatio: false }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Analytics;