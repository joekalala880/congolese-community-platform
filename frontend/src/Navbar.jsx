import { Link } from "react-router-dom";
import { useState } from "react";


function Navbar() {

   const [darkMode, setDarkMode] = useState(
  localStorage.getItem("darkMode") === "true"
);

  const user = JSON.parse(localStorage.getItem("user"));

  const logoutUser = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    window.location.href = "/";
  };

  const toggleDarkMode = () => {
  const newMode = !darkMode;

  setDarkMode(newMode);
  localStorage.setItem("darkMode", newMode);

  window.location.reload();
};

  return (
    <div
  className={
    darkMode
      ? "bg-black text-white shadow-lg"
      : "bg-blue-700 text-white shadow-lg"
  }
>

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 className="text-2xl font-bold">
          Congolese Community
        </h1>

        <div className="flex gap-6 items-center">

            <button
 onClick={toggleDarkMode}
  className="bg-gray-800 px-4 py-2 rounded-lg"
>
  {darkMode ? "☀️ Light" : "🌙 Dark"}
</button>

          <button
            onClick={() => window.location.href = "/dashboard"}
            className="hover:text-gray-200"
          >
            Dashboard
          </button>

          <button
            onClick={() => window.location.href = "/profile"}
            className="hover:text-gray-200"
          >
            Profile
          </button>
          
          <button
  onClick={() => window.location.href = "/my-requests"}
  className="hover:text-gray-200"
>
  My Requests
</button>


     {user?.role === "admin" && (
  <>
    <button
      onClick={() => window.location.href = "/admin"}
      style={{
        background: "none",
        border: "none",
        color: "white",
        cursor: "pointer",
        fontSize: "18px"
      }}
    >
      Admin
    </button>

    <button
      onClick={() => window.location.href = "/users"}
      style={{
        background: "none",
        border: "none",
        color: "white",
        cursor: "pointer",
        fontSize: "18px"
      }}
    >
      Users
    </button>
  </>
)}

          <button
            onClick={logoutUser}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-bold"
          >
            Logout
          </button>

        </div>
      </div>
    </div>
  );
}

export default Navbar;