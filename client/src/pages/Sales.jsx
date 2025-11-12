import React, { useEffect, useState } from "react";
import api from "../services/api";
import { getUser } from "../services/auth";
import { Link } from "react-router-dom";

export default function Sales() {
  const [sales, setSales] = useState([]);
  const [amount, setAmount] = useState("");
  const user = getUser();

  const load = async () => {
    const { data } = await api.get("/sales");
    setSales(data.slice(0, 50));
  };
  useEffect(() => {
    load();
  }, []);

  const add = async (e) => {
    e.preventDefault();
    await api.post("/sales", { amount: Number(amount) });
    setAmount("");
    load();
  };

  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 12 }}>
        <Link to="/dashboard" style={link}>
          ← Back
        </Link>
      </div>
      <h2>Sales</h2>
      <div style={{ opacity: 0.8, marginBottom: 8 }}>
        Role: {user.role} {user.branch ? `| Branch: ${user.branch.name}` : ""}
      </div>
      <form
        onSubmit={add}
        style={{ display: "flex", gap: 8, margin: "12px 0" }}
      >
        <input
          type="number"
          placeholder="Amount (LKR)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={inp}
        />
        <button style={btn}>Record Sale</button>
      </form>
      <table style={table}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount (LKR)</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((s) => (
            <tr key={s._id}>
              <td>{new Date(s.date).toLocaleString()}</td>
              <td>{s.amount.toLocaleString()}</td>
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
const link = { color: "#93c5fd", textDecoration: "none" };
