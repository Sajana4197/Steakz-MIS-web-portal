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
    datasets: [
      {
        label: "Sales (LKR)",
        data: sales.map((s) => s.amount),
        backgroundColor: "rgba(34, 197, 94, 0.8)",
        borderColor: "rgba(34, 197, 94, 1)",
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(17, 24, 39, 0.9)",
        padding: 12,
        borderColor: "rgba(34, 197, 94, 0.5)",
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        grid: { color: "rgba(255, 255, 255, 0.05)" },
        ticks: { color: "#94a3b8" },
      },
      x: {
        grid: { display: false },
        ticks: { color: "#94a3b8" },
      },
    },
  };

  return (
    <div style={container}>
      <TopNav user={user} />

      <div style={header}>
        <h1 style={pageTitle}>Dashboard</h1>
        <div style={userBadge}>
          <span style={userIcon}>👤</span>
          <div>
            <div style={userName}>{user?.username}</div>
            <div style={userRole}>{user?.role}</div>
          </div>
        </div>
      </div>

      {summary ? (
        <div style={cardsGrid}>
          <Card
            title="Total Sales (7d)"
            value={`LKR ${summary.totalSales.toLocaleString()}`}
            icon="💰"
            gradient="linear-gradient(135deg, #22c55e, #10b981)"
          />
          <Card
            title="Transactions"
            value={summary.salesCount}
            icon="🛒"
            gradient="linear-gradient(135deg, #3b82f6, #2563eb)"
          />
          <Card
            title="Inventory Items"
            value={summary.inventoryItems}
            icon="📦"
            gradient="linear-gradient(135deg, #f59e0b, #d97706)"
          />
        </div>
      ) : (
        <div style={loading}>Loading dashboard data...</div>
      )}

      <div style={chartWrapper}>
        <div style={chartCard}>
          <h3 style={chartTitle}>Sales Trend - Last 7 Days</h3>
          <div style={chartContainer}>
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}

function TopNav({ user }) {
  return (
    <nav style={navBar}>
      <div style={navBrand}>
        <span style={brandIcon}>🥩</span>
        <span style={brandText}>Steakz MIS</span>
      </div>
      <div style={navLinks}>
        <Link to="/inventory" style={navLink}>
          <span>📦</span> Inventory
        </Link>
        <Link to="/sales" style={navLink}>
          <span>💵</span> Sales
        </Link>
        {user?.role === "admin" && (
          <Link to="/users" style={navLink}>
            <span>👥</span> Users
          </Link>
        )}
        <button onClick={logout} style={logoutBtn}>
          <span>⏻</span> Logout
        </button>
      </div>
    </nav>
  );
}

function Card({ title, value, icon, gradient }) {
  return (
    <div style={cardStyle}>
      <div style={{ ...cardGradient, background: gradient }}></div>
      <div style={cardIcon}>{icon}</div>
      <div style={cardContent}>
        <div style={cardTitle}>{title}</div>
        <div style={cardValue}>{value}</div>
      </div>
    </div>
  );
}

const container = {
  padding: "32px",
  minHeight: "100vh",
  background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
};

const navBar = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "20px 28px",
  background: "rgba(17, 24, 39, 0.6)",
  backdropFilter: "blur(20px)",
  borderRadius: "16px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  marginBottom: "32px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
};

const navBrand = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  fontSize: "20px",
  fontWeight: "700",
};

const brandIcon = {
  fontSize: "28px",
};

const brandText = {
  background: "linear-gradient(135deg, #22c55e, #10b981)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const navLinks = {
  display: "flex",
  gap: "8px",
  alignItems: "center",
};

const navLink = {
  padding: "10px 20px",
  borderRadius: "10px",
  color: "#cbd5e1",
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: "500",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  transition: "all 0.3s ease",
  background: "rgba(255, 255, 255, 0.05)",
  border: "1px solid transparent",
};

const logoutBtn = {
  padding: "10px 20px",
  borderRadius: "10px",
  background: "linear-gradient(135deg, #ef4444, #dc2626)",
  color: "#fff",
  border: "none",
  fontSize: "14px",
  fontWeight: "600",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  boxShadow: "0 4px 12px rgba(239, 68, 68, 0.3)",
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "32px",
};

const pageTitle = {
  fontSize: "36px",
  fontWeight: "700",
  margin: 0,
  background: "linear-gradient(135deg, #fff, #cbd5e1)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const userBadge = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "12px 20px",
  background: "rgba(17, 24, 39, 0.6)",
  backdropFilter: "blur(20px)",
  borderRadius: "12px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
};

const userIcon = {
  fontSize: "24px",
};

const userName = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#e2e8f0",
};

const userRole = {
  fontSize: "12px",
  color: "#94a3b8",
  textTransform: "capitalize",
};

const cardsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "24px",
  marginBottom: "32px",
};

const cardStyle = {
  position: "relative",
  padding: "24px",
  background: "rgba(17, 24, 39, 0.6)",
  backdropFilter: "blur(20px)",
  borderRadius: "16px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  overflow: "hidden",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
};

const cardGradient = {
  position: "absolute",
  top: 0,
  right: 0,
  width: "100px",
  height: "100px",
  borderRadius: "50%",
  filter: "blur(40px)",
  opacity: 0.3,
};

const cardIcon = {
  fontSize: "36px",
  marginBottom: "12px",
};

const cardContent = {
  position: "relative",
  zIndex: 1,
};

const cardTitle = {
  fontSize: "13px",
  color: "#94a3b8",
  fontWeight: "600",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  marginBottom: "8px",
};

const cardValue = {
  fontSize: "32px",
  fontWeight: "700",
  color: "#e2e8f0",
};

const chartWrapper = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
};

const chartCard = {
  padding: "28px",
  background: "rgba(17, 24, 39, 0.6)",
  backdropFilter: "blur(20px)",
  borderRadius: "16px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
  width: "100%",
  maxWidth: "800px",
};

const chartTitle = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#e2e8f0",
  marginBottom: "20px",
  marginTop: 0,
};

const chartContainer = {
  height: "280px",
  width: "100%",
};

const loading = {
  padding: "48px",
  textAlign: "center",
  color: "#94a3b8",
  fontSize: "16px",
};
