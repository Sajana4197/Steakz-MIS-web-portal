import React, { useEffect, useState } from "react";
import api from "../services/api";
import { logout, getUser } from "../services/auth";
import { Link } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [sales, setSales] = useState([]);
  const user = getUser();

  useEffect(() => {
    (async () => {
      const s = await api.get("/reports/summary");
      setSummary(s.data);
      const sl = await api.get("/sales");
      setSales(sl.data.reverse().slice(-7));
    })();
  }, []);

  const chartData = {
    labels: sales.map((s) => new Date(s.date).toLocaleDateString()),
    datasets: [{ label: "Sales", data: sales.map((s) => s.amount) }],
  };

  return (
    <div style={{ padding: 24 }}>
      <TopNav user={user} />
      <h2 style={{ marginTop: 12 }}>Dashboard</h2>
      {summary ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 12,
            marginTop: 12,
          }}
        >
          <Card
            title="Total Sales (7d)"
            value={summary.totalSales.toLocaleString()}
          />
          <Card title="Transactions" value={summary.salesCount} />
          <Card title="Inventory Items" value={summary.inventoryItems} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <div
        style={{
          background: "#111827",
          padding: 16,
          borderRadius: 12,
          marginTop: 16,
        }}
      >
        <h3>Last 7 days sales</h3>
        <Bar data={chartData} />
      </div>
    </div>
  );
}

function TopNav({ user }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <strong>Steakz MIS</strong> —{" "}
        <span style={{ opacity: 0.8 }}>Role: {user?.role}</span>
      </div>
      <nav style={{ display: "flex", gap: 12 }}>
        <Link to="/dashboard" style={link}>
          Dashboard
        </Link>
        <Link to="/inventory" style={link}>
          Inventory
        </Link>
        <Link to="/sales" style={link}>
          Sales
        </Link>
        {user?.role === "admin" && (
          <Link to="/users" style={link}>
            Users
          </Link>
        )}
        <button
          onClick={logout}
          style={{ ...link, background: "#ef4444", color: "#fff" }}
        >
          Logout
        </button>
      </nav>
    </div>
  );
}
function Card({ title, value }) {
  return (
    <div style={{ background: "#111827", padding: 16, borderRadius: 12 }}>
      <div style={{ opacity: 0.8, fontSize: 12 }}>{title}</div>
      <div style={{ fontSize: 24, fontWeight: 700 }}>{value}</div>
    </div>
  );
}
const link = {
  padding: "8px 12px",
  background: "#0b1220",
  borderRadius: 8,
  color: "#e2e8f0",
  textDecoration: "none",
  border: "1px solid #374151",
};
