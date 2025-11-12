import React, { useState } from "react";
import api from "../services/api";
import { saveAuth } from "../services/auth";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", { username, password });
      saveAuth(data.token, data.user);
      window.location.href = "/dashboard";
    } catch (e) {
      setError(e.response?.data?.message || "Login failed");
      setLoading(false);
    }
  };

  return (
    <div style={container}>
      <div style={bgGradient}></div>
      <div style={floatingShape1}></div>
      <div style={floatingShape2}></div>

      <form onSubmit={submit} style={formCard}>
        <div style={logoContainer}>
          <div style={logo}>🥩</div>
          <h1 style={title}>Steakz MIS</h1>
          <p style={subtitle}>Management Information System</p>
        </div>

        <div style={inputGroup}>
          <label style={label}>Username</label>
          <input
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={inp}
            required
          />
        </div>

        <div style={inputGroup}>
          <label style={label}>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inp}
            required
          />
        </div>

        {error && (
          <div style={errorBox}>
            <span>⚠️</span> {error}
          </div>
        )}

        <button style={btn} disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}

const container = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
  position: "relative",
  overflow: "hidden",
};

const bgGradient = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background:
    "radial-gradient(circle at 20% 50%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)",
  pointerEvents: "none",
};

const floatingShape1 = {
  position: "absolute",
  width: "300px",
  height: "300px",
  background:
    "linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(34, 197, 94, 0.05))",
  borderRadius: "50%",
  top: "-100px",
  right: "-100px",
  filter: "blur(60px)",
  animation: "float 6s ease-in-out infinite",
};

const floatingShape2 = {
  position: "absolute",
  width: "400px",
  height: "400px",
  background:
    "linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(59, 130, 246, 0.05))",
  borderRadius: "50%",
  bottom: "-150px",
  left: "-150px",
  filter: "blur(60px)",
  animation: "float 8s ease-in-out infinite",
};

const formCard = {
  background: "rgba(17, 24, 39, 0.8)",
  backdropFilter: "blur(20px)",
  padding: "48px 40px",
  borderRadius: "24px",
  width: "420px",
  maxWidth: "90%",
  boxShadow:
    "0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  position: "relative",
  zIndex: 1,
};

const logoContainer = {
  textAlign: "center",
  marginBottom: "32px",
};

const logo = {
  fontSize: "48px",
  marginBottom: "12px",
  display: "inline-block",
  animation: "bounce 2s ease-in-out infinite",
};

const title = {
  fontSize: "28px",
  fontWeight: "700",
  margin: "0 0 8px 0",
  background: "linear-gradient(135deg, #22c55e, #10b981)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

const subtitle = {
  fontSize: "14px",
  color: "#94a3b8",
  margin: 0,
  fontWeight: "400",
};

const inputGroup = {
  marginBottom: "20px",
};

const label = {
  display: "block",
  fontSize: "13px",
  fontWeight: "600",
  color: "#cbd5e1",
  marginBottom: "8px",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
};

const inp = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: "12px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  background: "rgba(15, 23, 42, 0.5)",
  color: "#e2e8f0",
  fontSize: "15px",
  transition: "all 0.3s ease",
  outline: "none",
  boxSizing: "border-box",
};

const btn = {
  width: "100%",
  padding: "14px",
  borderRadius: "12px",
  background: "linear-gradient(135deg, #22c55e, #10b981)",
  color: "#fff",
  border: "none",
  fontSize: "16px",
  fontWeight: "600",
  cursor: "pointer",
  transition: "all 0.3s ease",
  boxShadow: "0 4px 15px rgba(34, 197, 94, 0.3)",
  marginTop: "8px",
};

const errorBox = {
  padding: "12px 16px",
  borderRadius: "10px",
  background: "rgba(239, 68, 68, 0.1)",
  border: "1px solid rgba(239, 68, 68, 0.3)",
  color: "#fca5a5",
  fontSize: "14px",
  marginBottom: "16px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const hint = {
  marginTop: "24px",
  padding: "16px",
  borderRadius: "12px",
  background: "rgba(59, 130, 246, 0.05)",
  border: "1px solid rgba(59, 130, 246, 0.2)",
  fontSize: "12px",
  color: "#94a3b8",
  textAlign: "center",
  lineHeight: "1.6",
};
