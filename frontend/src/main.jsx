import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import { Toaster } from "react-hot-toast";

import App from "./App";
import Dashboard from "./Dashboard";
import Housing from "./Housing";
import Immigration from "./Immigration";
import Food from "./Food";
import Healthcare from "./Healthcare";
import Admin from "./Admin";
import Profile from "./Profile";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";
import Users from "./Users";
import MyRequests from "./MyRequests";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Toaster
      position="top-right"
      reverseOrder={false}
    />

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/housing" element={<Housing />} />
        <Route path="/immigration" element={<Immigration />} />
        <Route path="/food" element={<Food />} />
        <Route path="/healthcare" element={<Healthcare />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/my-requests" element={<MyRequests />} />

        <Route
          path="/admin"
          element={
            JSON.parse(localStorage.getItem("user"))?.role === "admin" ? (
              <Admin />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />

        <Route
          path="/users"
          element={
            JSON.parse(localStorage.getItem("user"))?.role === "admin" ? (
              <Users />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);