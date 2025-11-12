import React, { useEffect, useState } from "react";
import api from "../services/api";
import { getUser } from "../services/auth";
import { Link } from "react-router-dom";
import { useToast } from "../hooks/useToast";

export default function Sales() {
  const [sales, setSales] = useState([]);
  const [amount, setAmount] = useState("");
  const user = getUser();
  const { showSuccess, showError } = useToast();

  const load = async () => {
    try {
      const { data } = await api.get("/sales");
      setSales(data.slice(0, 50));
    } catch (error) {
      showError("Failed to load sales data");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const add = async (e) => {
    e.preventDefault();
    try {
      await api.post("/sales", { amount: Number(amount) });
      setAmount("");
      load();
      showSuccess(
        `Sale of LKR ${Number(amount).toLocaleString()} recorded successfully!`
      );
    } catch (error) {
      showError("Failed to record sale");
    }
  };

  return (
    <div style={container}>
      <div style={header}>
        <Link to="/dashboard" style={backBtn}>
          <span>←</span> Back to Dashboard
        </Link>
        <div style={titleContainer}>
          <div style={iconBox}>💵</div>
          <h1 style={pageTitle}>Sales Management</h1>
        </div>
      </div>

      <div style={userInfo}>
        <span style={infoBadge}>👤 {user.role}</span>
        {user.branch && <span style={infoBadge}>📍 {user.branch.name}</span>}
      </div>

      <form onSubmit={add} style={formCard}>
        <h3 style={formTitle}>Record New Sale</h3>
        <div style={formRow}>
          <div style={inputGroup}>
            <label style={label}>Amount (LKR)</label>
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={inp}
              required
              min="0"
              step="0.01"
            />
          </div>
          <button style={btn}>
            <span>+</span> Record Sale
          </button>
        </div>
      </form>

      <div style={tableCard}>
        <div style={tableHeader}>
          <h3 style={tableTitle}>Recent Sales</h3>
          <div style={salesCount}>{sales.length} records</div>
        </div>

        {sales.length > 0 ? (
          <table style={table}>
            <thead>
              <tr>
                <th style={th}>Date & Time</th>
                <th style={th}>Amount (LKR)</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((s) => (
                <tr key={s._id} style={tr}>
                  <td style={td}>{new Date(s.date).toLocaleString()}</td>
                  <td style={tdAmount}>LKR {s.amount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={emptyState}>
            <div style={emptyIcon}>💰</div>
            <div>No sales recorded yet</div>
          </div>
        )}
      </div>
    </div>
  );
}

const container = {
  padding: "32px",
  minHeight: "100vh",
  background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
};

const header = {
  marginBottom: "24px",
};

const backBtn = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  padding: "10px 20px",
  background: "rgba(17, 24, 39, 0.6)",
  backdropFilter: "blur(20px)",
  borderRadius: "10px",
  color: "#cbd5e1",
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: "500",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  marginBottom: "16px",
};

const titleContainer = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
  marginTop: "16px",
};

const iconBox = {
  fontSize: "36px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "56px",
  height: "56px",
  background:
    "linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(16, 185, 129, 0.1))",
  borderRadius: "12px",
  border: "1px solid rgba(34, 197, 94, 0.3)",
  boxShadow: "0 4px 15px rgba(34, 197, 94, 0.2)",
};

const pageTitle = {
  fontSize: "36px",
  fontWeight: "700",
  margin: 0,
  background: "linear-gradient(135deg, #fff, #cbd5e1)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const userInfo = {
  display: "flex",
  gap: "12px",
  marginBottom: "24px",
};

const infoBadge = {
  padding: "8px 16px",
  background: "rgba(59, 130, 246, 0.2)",
  border: "1px solid rgba(59, 130, 246, 0.3)",
  borderRadius: "10px",
  fontSize: "14px",
  color: "#3b82f6",
  fontWeight: "500",
};

const formCard = {
  padding: "28px",
  background: "rgba(17, 24, 39, 0.6)",
  backdropFilter: "blur(20px)",
  borderRadius: "16px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  marginBottom: "24px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
};

const formTitle = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#e2e8f0",
  marginTop: 0,
  marginBottom: "20px",
};

const formRow = {
  display: "flex",
  gap: "16px",
  alignItems: "end",
};

const inputGroup = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
};

const label = {
  fontSize: "13px",
  fontWeight: "600",
  color: "#cbd5e1",
  marginBottom: "8px",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
};

const inp = {
  padding: "12px 16px",
  borderRadius: "10px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  background: "rgba(15, 23, 42, 0.5)",
  color: "#e2e8f0",
  fontSize: "15px",
  outline: "none",
};

const btn = {
  padding: "12px 24px",
  borderRadius: "10px",
  background: "linear-gradient(135deg, #22c55e, #10b981)",
  border: "none",
  color: "#fff",
  fontSize: "15px",
  fontWeight: "600",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  boxShadow: "0 4px 15px rgba(34, 197, 94, 0.3)",
  whiteSpace: "nowrap",
};

const tableCard = {
  background: "rgba(17, 24, 39, 0.6)",
  backdropFilter: "blur(20px)",
  borderRadius: "16px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  overflow: "hidden",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
};

const tableHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "24px 28px",
  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
};

const tableTitle = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#e2e8f0",
  margin: 0,
};

const salesCount = {
  padding: "6px 16px",
  background: "rgba(34, 197, 94, 0.2)",
  borderRadius: "20px",
  fontSize: "13px",
  fontWeight: "600",
  color: "#22c55e",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
};

const th = {
  padding: "16px 28px",
  textAlign: "left",
  fontSize: "13px",
  fontWeight: "600",
  color: "#94a3b8",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
};

const tr = {
  borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
};

const td = {
  padding: "20px 28px",
  color: "#cbd5e1",
  fontSize: "15px",
};

const tdAmount = {
  padding: "20px 28px",
  color: "#22c55e",
  fontSize: "16px",
  fontWeight: "600",
};

const emptyState = {
  padding: "64px",
  textAlign: "center",
  color: "#64748b",
};

const emptyIcon = {
  fontSize: "64px",
  marginBottom: "16px",
};
