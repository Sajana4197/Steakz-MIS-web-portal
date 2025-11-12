import React, { useEffect, useState } from "react";
import api from "../services/api";
import { getUser } from "../services/auth";
import { Link } from "react-router-dom";
import PasswordInput from "../components/PasswordInput";
import { useToast } from "../hooks/useToast";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "employee",
    branchId: "",
  });
  const [branches, setBranches] = useState([]);
  const [editingPassword, setEditingPassword] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);
  const currentUser = getUser();
  const { showSuccess, showError, showWarning } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const u = await api.get("/users");
      setUsers(u.data);
      const inv = await api.get("/inventory");
      const uniq = Object.values(
        inv.data.reduce((acc, i) => {
          if (i.branch) acc[i.branch._id] = i.branch;
          return acc;
        }, {})
      );
      setBranches(uniq);
    } catch (error) {
      console.error("Failed to load data:", error);
      showError("Failed to load users data");
    }
  };

  const add = async (e) => {
    e.preventDefault();
    try {
      await api.post("/users", form);
      setForm({ username: "", password: "", role: "employee", branchId: "" });
      loadData();
      showSuccess(`User "${form.username}" created successfully!`);
    } catch (error) {
      showError(error.response?.data?.message || "Failed to create user");
    }
  };

  const delUser = async (userId, username) => {
    if (currentUser.username === username) {
      showWarning("You cannot delete yourself!");
      return;
    }

    setConfirmDelete({ userId, username });
  };

  const confirmDeleteUser = async () => {
    try {
      await api.delete("/users/" + confirmDelete.userId);
      showSuccess(`User "${confirmDelete.username}" deleted successfully`);
      setConfirmDelete(null);
      loadData();
    } catch (error) {
      showError(error.response?.data?.message || "Failed to delete user");
    }
  };

  const handlePasswordReset = async (userId, username) => {
    if (!newPassword || newPassword.length < 6) {
      showWarning("Password must be at least 6 characters long");
      return;
    }

    try {
      await api.put(`/users/${userId}/password`, { password: newPassword });
      showSuccess(`Password updated successfully for ${username}`);
      setEditingPassword(null);
      setNewPassword("");
    } catch (error) {
      showError(error.response?.data?.message || "Failed to update password");
    }
  };

  return (
    <div style={container}>
      {/* Confirmation Modal */}
      {confirmDelete && (
        <div style={modalOverlay} onClick={() => setConfirmDelete(null)}>
          <div style={modalBox} onClick={(e) => e.stopPropagation()}>
            <div style={modalIcon}>⚠️</div>
            <h3 style={modalTitle}>Delete User</h3>
            <p style={modalMessage}>
              Are you sure you want to delete user{" "}
              <strong>"{confirmDelete.username}"</strong>?
              <br />
              This action cannot be undone.
            </p>
            <div style={modalButtons}>
              <button
                onClick={() => setConfirmDelete(null)}
                style={modalCancelBtn}
              >
                Cancel
              </button>
              <button onClick={confirmDeleteUser} style={modalDeleteBtn}>
                Delete User
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={header}>
        <Link to="/dashboard" style={backBtn}>
          <span>←</span> Back to Dashboard
        </Link>
        <div style={titleContainer}>
          <span style={titleIcon}>👥</span>
          <h1 style={pageTitle}>User Management</h1>
        </div>
      </div>

      <form onSubmit={add} style={formCard}>
        <h3 style={formTitle}>Create New User</h3>
        <div style={formGrid}>
          <div style={inputGroup}>
            <label style={label}>Username</label>
            <input
              placeholder="Enter username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              style={inp}
              required
            />
          </div>
          <div style={inputGroup}>
            <label style={label}>Password</label>
            <PasswordInput
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Enter password"
              showRequirements={true}
              required
              minLength={6}
            />
          </div>
          <div style={inputGroup}>
            <label style={label}>Role</label>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              style={inp}
            >
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div style={inputGroup}>
            <label style={label}>Branch (Optional)</label>
            <select
              value={form.branchId}
              onChange={(e) => setForm({ ...form, branchId: e.target.value })}
              style={inp}
            >
              <option value="">No Branch</option>
              {branches.map((b) => (
                <option key={b._id} value={b._id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button style={createBtn}>
          <span>+</span> Create User
        </button>
      </form>

      <div style={tableCard}>
        <div style={tableHeader}>
          <h3 style={tableTitle}>All Users</h3>
          <div style={userCount}>{users.length} users</div>
        </div>

        {users.length > 0 ? (
          <table style={table}>
            <thead>
              <tr>
                <th style={th}>Username</th>
                <th style={th}>Role</th>
                <th style={th}>Branch</th>
                <th style={th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} style={tr}>
                  <td style={td}>
                    <div style={usernameCell}>
                      <span style={userIcon}>
                        {u.role === "admin"
                          ? "👑"
                          : u.role === "manager"
                          ? "👔"
                          : "👤"}
                      </span>
                      {u.username}
                      {currentUser.username === u.username && (
                        <span style={youBadge}>You</span>
                      )}
                    </div>
                  </td>
                  <td style={td}>
                    <span style={roleBadge(u.role)}>{u.role}</span>
                  </td>
                  <td style={td}>
                    <span style={branchBadge}>{u.branch?.name || "—"}</span>
                  </td>
                  <td style={td}>
                    <div style={actionButtons}>
                      {editingPassword === u._id ? (
                        <div style={passwordResetBox}>
                          <PasswordInput
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="New password"
                            showRequirements={true}
                            minLength={6}
                            style={passwordInputSmall}
                          />
                          <button
                            onClick={() =>
                              handlePasswordReset(u._id, u.username)
                            }
                            style={saveBtn}
                          >
                            ✓ Save
                          </button>
                          <button
                            onClick={() => {
                              setEditingPassword(null);
                              setNewPassword("");
                            }}
                            style={cancelBtn}
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <>
                          <button
                            onClick={() => setEditingPassword(u._id)}
                            style={resetBtn}
                            title="Reset Password"
                          >
                            🔑 Reset Password
                          </button>
                          <button
                            onClick={() => delUser(u._id, u.username)}
                            style={
                              currentUser.username === u.username
                                ? disabledDeleteBtn
                                : deleteBtn
                            }
                            disabled={currentUser.username === u.username}
                            title={
                              currentUser.username === u.username
                                ? "You cannot delete yourself"
                                : "Delete user"
                            }
                          >
                            🗑️ Delete
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={emptyState}>
            <div style={emptyIcon}>👥</div>
            <div>No users found</div>
          </div>
        )}
      </div>
    </div>
  );
}

// Modal styles
const modalOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0, 0, 0, 0.7)",
  backdropFilter: "blur(4px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
  animation: "fadeIn 0.2s ease-out",
};

const modalBox = {
  background: "rgba(17, 24, 39, 0.95)",
  backdropFilter: "blur(20px)",
  padding: "32px",
  borderRadius: "16px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
  maxWidth: "420px",
  width: "90%",
  animation: "scaleIn 0.2s ease-out",
};

const modalIcon = {
  fontSize: "48px",
  textAlign: "center",
  marginBottom: "16px",
};

const modalTitle = {
  fontSize: "24px",
  fontWeight: "700",
  color: "#e2e8f0",
  textAlign: "center",
  marginBottom: "12px",
  marginTop: 0,
};

const modalMessage = {
  fontSize: "15px",
  color: "#94a3b8",
  textAlign: "center",
  lineHeight: "1.6",
  marginBottom: "24px",
};

const modalButtons = {
  display: "flex",
  gap: "12px",
};

const modalCancelBtn = {
  flex: 1,
  padding: "12px",
  borderRadius: "10px",
  background: "rgba(100, 116, 139, 0.2)",
  border: "1px solid rgba(100, 116, 139, 0.3)",
  color: "#cbd5e1",
  fontSize: "15px",
  fontWeight: "600",
  cursor: "pointer",
};

const modalDeleteBtn = {
  flex: 1,
  padding: "12px",
  borderRadius: "10px",
  background: "linear-gradient(135deg, #ef4444, #dc2626)",
  border: "none",
  color: "#fff",
  fontSize: "15px",
  fontWeight: "600",
  cursor: "pointer",
  boxShadow: "0 4px 15px rgba(239, 68, 68, 0.3)",
};

const passwordInputSmall = {
  padding: "8px 40px 8px 12px",
  fontSize: "13px",
};

// ... (keep all other existing styles from previous version)
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

const titleContainer = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
  marginTop: "16px",
};

const titleIcon = {
  fontSize: "42px",
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
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "16px",
  marginBottom: "20px",
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

const createBtn = {
  width: "auto",
  padding: "12px 32px",
  borderRadius: "10px",
  background: "linear-gradient(135deg, #22c55e, #10b981)",
  color: "#fff",
  border: "none",
  fontSize: "15px",
  fontWeight: "600",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  boxShadow: "0 4px 15px rgba(34, 197, 94, 0.3)",
  margin: "0 auto",
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

const userCount = {
  padding: "6px 16px",
  background: "rgba(59, 130, 246, 0.2)",
  borderRadius: "20px",
  fontSize: "13px",
  fontWeight: "600",
  color: "#3b82f6",
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
};

const usernameCell = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  fontSize: "15px",
  fontWeight: "500",
};

const userIcon = {
  fontSize: "18px",
};

const youBadge = {
  padding: "2px 8px",
  background: "rgba(34, 197, 94, 0.2)",
  borderRadius: "4px",
  fontSize: "11px",
  fontWeight: "600",
  color: "#22c55e",
  textTransform: "uppercase",
};

const roleBadge = (role) => ({
  display: "inline-block",
  padding: "4px 12px",
  borderRadius: "6px",
  fontSize: "13px",
  fontWeight: "600",
  textTransform: "capitalize",
  background:
    role === "admin"
      ? "rgba(239, 68, 68, 0.2)"
      : role === "manager"
      ? "rgba(59, 130, 246, 0.2)"
      : "rgba(148, 163, 184, 0.2)",
  color:
    role === "admin" ? "#ef4444" : role === "manager" ? "#3b82f6" : "#94a3b8",
});

const branchBadge = {
  display: "inline-block",
  padding: "4px 12px",
  borderRadius: "6px",
  fontSize: "13px",
  background: "rgba(168, 85, 247, 0.2)",
  color: "#a855f7",
};

const actionButtons = {
  display: "flex",
  gap: "8px",
  alignItems: "center",
};

const resetBtn = {
  padding: "8px 16px",
  borderRadius: "8px",
  background: "rgba(59, 130, 246, 0.1)",
  border: "1px solid rgba(59, 130, 246, 0.3)",
  color: "#3b82f6",
  fontSize: "13px",
  fontWeight: "600",
  cursor: "pointer",
  whiteSpace: "nowrap",
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
};

const disabledDeleteBtn = {
  padding: "8px 16px",
  borderRadius: "8px",
  background: "rgba(100, 116, 139, 0.1)",
  border: "1px solid rgba(100, 116, 139, 0.2)",
  color: "#64748b",
  fontSize: "13px",
  fontWeight: "600",
  cursor: "not-allowed",
  opacity: 0.5,
};

const passwordResetBox = {
  display: "flex",
  gap: "8px",
  alignItems: "center",
  flexWrap: "wrap",
};

const saveBtn = {
  padding: "8px 16px",
  borderRadius: "8px",
  background: "rgba(34, 197, 94, 0.2)",
  border: "1px solid rgba(34, 197, 94, 0.3)",
  color: "#22c55e",
  fontSize: "13px",
  fontWeight: "600",
  cursor: "pointer",
};

const cancelBtn = {
  padding: "8px 12px",
  borderRadius: "8px",
  background: "rgba(239, 68, 68, 0.1)",
  border: "1px solid rgba(239, 68, 68, 0.3)",
  color: "#ef4444",
  fontSize: "13px",
  fontWeight: "600",
  cursor: "pointer",
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
