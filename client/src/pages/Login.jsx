import React, { useState } from "react";
import api from "../services/api";
import { saveAuth } from "../services/auth";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await api.post("/auth/login", { username, password });
      saveAuth(data.token, data.user);
      window.location.href = "/dashboard";
    } catch (e) {
      setError(e.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ display: "grid", placeItems: "center", minHeight: "100vh" }}>
      <form
        onSubmit={submit}
        style={{
          background: "#111827",
          padding: 28,
          borderRadius: 14,
          width: 360,
        }}
      >
        <h2 style={{ marginBottom: 16 }}>Steakz MIS Login</h2>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={inp}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inp}
        />
        {error && (
          <div style={{ color: "#f87171", marginBottom: 12 }}>{error}</div>
        )}
        <button style={btn}>Sign In</button>
        <div style={{ fontSize: 12, opacity: 0.7, marginTop: 12 }}>
          Try: admin/admin123, manager_colombo/manager123,
          employee_colombo/employee123
        </div>
      </form>
    </div>
  );
}

const inp = {
  width: "100%",
  padding: 10,
  marginBottom: 12,
  borderRadius: 8,
  border: "1px solid #374151",
  background: "#0b1220",
  color: "#e2e8f0",
};
const btn = {
  width: "100%",
  padding: 10,
  borderRadius: 8,
  background: "#22c55e",
  color: "#0b1220",
  border: "none",
  fontWeight: 600,
};
