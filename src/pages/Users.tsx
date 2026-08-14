import { useEffect, useState } from "react";
import axios from "axios";
import api from "../services/api";
import type { User } from "../types/Employee";

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get<User[]>("/users");

      setUsers(response.data);
    } catch (err) {
      console.error(err);

      setError(
        axios.isAxiosError(err)
          ? err.message
          : "Failed to load users."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Loading
  if (loading) {
    return (
      <div className="page">
        <h2>User List</h2>
        <p className="loading">Loading users...</p>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="page">
        <h2>User List</h2>

        <p className="error">
          {error}
        </p>

        <button
          className="primary-btn"
          onClick={fetchUsers}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="page">

      <h2>User List</h2>

      <p className="page-sub">
        Fetched using Axios · GET /users
      </p>

      <div className="user-grid">

        {users.map((user) => {

          const userId = Number(user.id);

          const avatar =
            `https://i.pravatar.cc/150?img=${(userId % 70) + 1}`;

          return (
            <div
              className="user-card"
              key={user.id}
            >

              <img
                className="avatar"
                src={avatar}
                alt={user.name}
                loading="lazy"
              />

              <div className="user-info">

                <h3>
                  {user.name}
                </h3>

                <ul>
                  <li>
                    ✉️ {user.email}
                  </li>

                  <li>
                    📞 {user.phone}
                  </li>

                  <li>
                    📍 {user.city}
                  </li>
                </ul>

              </div>

            </div>
          );
        })}

      </div>

      {/* No Users */}
      {users.length === 0 && (
        <p className="no-results">
          No users found.
        </p>
      )}

    </div>
  );
}