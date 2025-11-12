import { createContext, useContext, useState, useCallback } from "react";
import Toast from "../components/Toast";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "success", duration = 3000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type, duration }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showSuccess = useCallback(
    (message) => addToast(message, "success"),
    [addToast]
  );
  const showError = useCallback(
    (message) => addToast(message, "error"),
    [addToast]
  );
  const showInfo = useCallback(
    (message) => addToast(message, "info"),
    [addToast]
  );
  const showWarning = useCallback(
    (message) => addToast(message, "warning"),
    [addToast]
  );

  return (
    <ToastContext.Provider
      value={{ showSuccess, showError, showInfo, showWarning }}
    >
      {children}
      <div style={toastContainer}>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}

const toastContainer = {
  position: "fixed",
  top: "24px",
  right: "24px",
  zIndex: 10000,
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};
