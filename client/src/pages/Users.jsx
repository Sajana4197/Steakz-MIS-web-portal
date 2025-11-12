import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "employee",
    branchId: "",
  });
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    (async () => {
      const u = await api.get("/users");
      setUsers(u.data);
      // Get branches by piggybacking inventory (quick demo trick)
      const inv = await api.get("/inventory");
      const uniq = Object.values(
        inv.data.reduce((acc, i) => {
          if (i.branch) acc[i.branch._id] = i.branch;
          return acc;
        }, {})
      );
      setBranches(uniq);
    })();
  }, []);

  const add = async (e) => {
    e.preventDefault();
    await api.post("/users", form);
    setForm({ username: "", password: "", role: "employee", branchId: "" });
    const u = await api.get("/users");
    setUsers(u.data);
  };
  const delUser = async (id) => {
    await api.delete("/users/" + id);
    const u = await api.get("/users");
    setUsers(u.data);
  };

  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 12 }}>
        <Link to="/dashboard" style={link}>
          ← Back
        </Link>
      </div>
      <h2>User Management (Admin)</h2>
      <form
        onSubmit={add}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 8,
          margin: "12px 0",
        }}
      >
        <input
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          style={inp}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          style={inp}
        />
        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          style={inp}
        >
          <option value="employee">employee</option>
          <option value="manager">manager</option>
          <option value="admin">admin</option>
        </select>
        <select
          value={form.branchId}
          onChange={(e) => setForm({ ...form, branchId: e.target.value })}
          style={inp}
        >
          <option value="">(optional) Branch</option>
          {branches.map((b) => (
            <option key={b._id} value={b._id}>
              {b.name}
            </option>
          ))}
        </select>
        <button style={{ gridColumn: "span 4", ...btn }}>Create User</button>
      </form>
      <table style={table}>
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
            <th>Branch</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.username}</td>
              <td>{u.role}</td>
              <td>{u.branch?.name || "-"}</td>
              <td>
                <button onClick={() => delUser(u._id)} style={btnDanger}>
                  Delete
                </button>
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
