import React, { useEffect, useState } from "react";
import api from "../services/api";
import { getUser } from "../services/auth";
import { Link } from "react-router-dom";

export default function Inventory() {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const user = getUser();

  const load = async () => {
    try {
      const { data } = await api.get("/inventory");
      setItems(data);
    } catch (error) {
      console.error("Failed to load inventory:", error);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const add = async (e) => {
    e.preventDefault();
    try {
      await api.post("/inventory", { itemName, quantity });
      setItemName("");
      setQuantity(0);
      load();
    } catch (error) {
      console.error("Failed to add item:", error);
    }
  };

  const remove = async (id) => {
    if (confirm("Are you sure you want to delete this item?")) {
      try {
        await api.delete(`/inventory/${id}`);
        load();
      } catch (error) {
        console.error("Failed to delete item:", error);
      }
    }
  };

  return (
    <div style={container}>
      <div style={header}>
        <Link to="/dashboard" style={backBtn}>
          <span>←</span> Back to Dashboard
        </Link>
        <h1 style={pageTitle}>Inventory Management</h1>
      </div>

      {(user.role === "admin" || user.role === "manager") && (
        <form onSubmit={add} style={formCard}>
          <h3 style={formTitle}>Add New Item</h3>
          <div style={formGrid}>
            <div style={inputGroup}>
              <label style={label}>Item Name</label>
              <input
                placeholder="e.g., Ribeye Steak"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                style={inp}
                required
              />
            </div>
            <div style={inputGroup}>
              <label style={label}>Quantity</label>
              <input
                type="number"
                placeholder="0"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                style={inp}
                min="0"
                required
              />
            </div>
            <button style={addBtn}>
              <span>+</span> Add Item
            </button>
          </div>
        </form>
      )}

      <div style={tableCard}>
        <div style={tableHeader}>
          <h3 style={tableTitle}>Current Inventory</h3>
          <div style={itemCount}>{items.length} items</div>
        </div>

        {items.length > 0 ? (
          <table style={table}>
            <thead>
              <tr>
                <th style={th}>Item Name</th>
                <th style={th}>Quantity</th>
                <th style={th}>Branch</th>
                <th style={th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((i) => (
                <tr key={i._id} style={tr}>
                  <td style={td}>
                    <div style={itemNameCell}>{i.itemName}</div>
                  </td>
                  <td style={td}>
                    <div style={quantityBadge(i.quantity)}>{i.quantity}</div>
                  </td>
                  <td style={td}>
                    <div style={branchBadge}>{i.branch?.name || "N/A"}</div>
                  </td>
                  <td style={td}>
                    {user.role === "admin" || user.role === "manager" ? (
                      <button onClick={() => remove(i._id)} style={deleteBtn}>
                        🗑️ Delete
                      </button>
                    ) : (
                      <span style={{ color: "#64748b" }}>—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={emptyState}>
            <div style={emptyIcon}>📦</div>
            <div>No inventory items found</div>
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
  marginBottom: "32px",
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

const pageTitle = {
  fontSize: "36px",
  fontWeight: "700",
  margin: "16px 0 0 0",
  background: "linear-gradient(135deg, #fff, #cbd5e1)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
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

const formGrid = {
  display: "grid",
  gridTemplateColumns: "2fr 1fr auto",
  gap: "16px",
  alignItems: "end",
};

const inputGroup = {
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

const addBtn = {
  padding: "12px 24px",
  borderRadius: "10px",
  background: "linear-gradient(135deg, #22c55e, #10b981)",
  color: "#fff",
  border: "none",
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

const itemCount = {
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
  transition: "background 0.2s ease",
};

const td = {
  padding: "20px 28px",
  color: "#cbd5e1",
};

const itemNameCell = {
  fontSize: "15px",
  fontWeight: "500",
};

const quantityBadge = (qty) => ({
  display: "inline-block",
  padding: "4px 12px",
  borderRadius: "6px",
  fontSize: "14px",
  fontWeight: "600",
  background: qty < 20 ? "rgba(239, 68, 68, 0.2)" : "rgba(34, 197, 94, 0.2)",
  color: qty < 20 ? "#ef4444" : "#22c55e",
});

const branchBadge = {
  display: "inline-block",
  padding: "4px 12px",
  borderRadius: "6px",
  fontSize: "13px",
  background: "rgba(59, 130, 246, 0.2)",
  color: "#3b82f6",
};

const deleteBtn = {
  padding: "8px 16px",
  borderRadius: "8px",
  background: "rgba(239, 68, 68, 0.1)",
  border: "1px solid rgba(239, 68, 68, 0.3)",
  color: "#ef4444",
  fontSize: "13px",
  fontWeight: "600",
  cursor: "pointer",
  transition: "all 0.2s ease",
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
