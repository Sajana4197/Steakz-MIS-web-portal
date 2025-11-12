import React, { useEffect } from "react";

export default function Toast({
  message,
  type = "success",
  onClose,
  duration = 3000,
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div style={toastContainer}>
      <div style={{ ...toastBox, ...toastStyle(type) }}>
        <span style={icon}>{getIcon(type)}</span>
        <span style={messageText}>{message}</span>
        <button onClick={onClose} style={closeBtn}>
          ✕
        </button>
      </div>
    </div>
  );
}

const getIcon = (type) => {
  switch (type) {
    case "success":
      return "✓";
    case "error":
      return "⚠️";
    case "info":
      return "ℹ️";
    case "warning":
      return "⚡";
    default:
      return "✓";
  }
};

const toastContainer = {
  position: "fixed",
  top: "24px",
  right: "24px",
  zIndex: 10000,
  animation: "slideIn 0.3s ease-out",
};

const toastBox = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "16px 20px",
  borderRadius: "12px",
  boxShadow:
    "0 10px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(20px)",
  minWidth: "300px",
  maxWidth: "500px",
  animation: "slideIn 0.3s ease-out",
};

const toastStyle = (type) => {
  const styles = {
    success: {
      background: "rgba(34, 197, 94, 0.15)",
      border: "1px solid rgba(34, 197, 94, 0.3)",
    },
    error: {
      background: "rgba(239, 68, 68, 0.15)",
      border: "1px solid rgba(239, 68, 68, 0.3)",
    },
    info: {
      background: "rgba(59, 130, 246, 0.15)",
      border: "1px solid rgba(59, 130, 246, 0.3)",
    },
    warning: {
      background: "rgba(245, 158, 11, 0.15)",
      border: "1px solid rgba(245, 158, 11, 0.3)",
    },
  };
  return styles[type] || styles.success;
};

const icon = {
  fontSize: "20px",
  fontWeight: "bold",
  color: "#22c55e",
};

const messageText = {
  flex: 1,
  fontSize: "14px",
  fontWeight: "500",
  color: "#e2e8f0",
  lineHeight: "1.5",
};

const closeBtn = {
  background: "transparent",
  border: "none",
  color: "#94a3b8",
  fontSize: "18px",
  cursor: "pointer",
  padding: "4px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  opacity: 0.7,
  transition: "opacity 0.2s ease",
};
