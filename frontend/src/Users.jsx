import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import toast from "react-hot-toast";

function Users() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "admin") {
    return (
      <h1 style={{ textAlign: "center", marginTop: "50px", color: "red" }}>
        Access Denied
      </h1>
    );
  }

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    fetch("https://congolese-community-platform.onrender.com/api/auth/users/${id}")
      .then((res) => res.json())
      .then((data) => {
        console.log("USERS DATA:", data);
        setUsers(data);
      })
      .catch((error) => {
        console.log("USERS FETCH ERROR:", error);
        toast.error(error.message);
      });
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(
        `https://congolese-community-platform.onrender.com/api/auth/users/${id}`,
        {
          method: "DELETE"
        }
      );

      const data = await response.json();

      toast.success(data.message);

      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete user");
    }
  };

  const updateRole = async (id, role) => {
    try {
      const response = await fetch(
       "https://congolese-community-platform.onrender.com/api/auth/users/${id}/role",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ role })
        }
      );

      const updatedUser = await response.json();

      setUsers(
        users.map((user) =>
          user._id === id ? updatedUser : user
        )
      );

      toast.success("User role updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update user role");
    }
  };

  const filteredUsers = users.filter((user) => {
    const email = user.email || "";
    const firstName = user.firstName || "";
    const lastName = user.lastName || "";

    return (
      email.toLowerCase().includes(search.toLowerCase()) ||
      firstName.toLowerCase().includes(search.toLowerCase()) ||
      lastName.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <>
      <Navbar />

      <div style={{ padding: "30px" }}>
        <h1 style={{ textAlign: "center" }}>
          Registered Users
        </h1>

        <input
          type="text"
          placeholder="Search users by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            display: "block",
            margin: "20px auto",
            padding: "12px",
            width: "400px",
            borderRadius: "8px",
            border: "1px solid gray"
          }}
        />

        {filteredUsers.map((user) => (
          <div
            key={user._id}
            style={{
              border: "1px solid lightgray",
              padding: "20px",
              margin: "20px auto",
              width: "400px",
              borderRadius: "10px"
            }}
          >
            <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Concern:</strong> {user.concern}</p>
            <p><strong>Role:</strong> {user.role}</p>

            <select
              value={user.role}
              onChange={(e) => updateRole(user._id, e.target.value)}
              style={{
                padding: "8px",
                marginRight: "10px",
                borderRadius: "5px"
              }}
            >
              <option value="user">user</option>
              <option value="admin">admin</option>
              <option value="new_arrival">new_arrival</option>
            </select>

            <button
              onClick={() => deleteUser(user._id)}
              style={{
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: "8px 15px",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Delete User
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Users;