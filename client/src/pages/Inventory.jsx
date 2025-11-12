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
    const { data } = await api.get("/inventory");
    setItems(data);
  };
  useEffect(() => {
    load();
  }, []);

  const add = async (e) => {
    e.preventDefault();
    await api.post("/inventory", { itemName, quantity });
    setItemName("");
    setQuantity(0);
    load();
  };
  const remove = async (id) => {
    await api.delete(`/inventory/${id}`);
    load();
  };

  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 12 }}>
        <Link to="/dashboard" style={link}>
          ← Back
        </Link>
      </div>
      <h2>Inventory</h2>
      {(user.role === "admin" || user.role === "manager") && (
        <form
          onSubmit={add}
          style={{ display: "flex", gap: 8, margin: "12px 0" }}
        >
          <input
            placeholder="Item name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            style={inp}
          />
          <input
            type="number"
            placeholder="Qty"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            style={inp}
          />
          <button style={btn}>Add</button>
        </form>
      )}
      <table style={table}>
        <thead>
          <tr>
            <th>Item</th>
            <th>Qty</th>
            <th>Branch</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((i) => (
            <tr key={i._id}>
              <td>{i.itemName}</td>
              <td>{i.quantity}</td>
              <td>{i.branch?.name}</td>
              <td>
                {user.role === "admin" || user.role === "manager" ? (
                  <button onClick={() => remove(i._id)} style={btnDanger}>
                    Delete
                  </button>
                ) : (
                  "-"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const table = {
  width: "100%",
  borderCollapse: "collapse",
  background: "#111827",
  borderRadius: 12,
  overflow: "hidden",
};
const inp = {
  padding: 8,
  borderRadius: 8,
  border: "1px solid #374151",
  background: "#0b1220",
  color: "#e2e8f0",
};
const btn = {
  padding: "8px 12px",
  borderRadius: 8,
  background: "#22c55e",
  border: "none",
  color: "#0b1220",
  fontWeight: 600,
};
const btnDanger = {
  padding: "6px 10px",
  borderRadius: 8,
  background: "#ef4444",
  border: "none",
  color: "#fff",
};
const link = { color: "#93c5fd", textDecoration: "none" };
