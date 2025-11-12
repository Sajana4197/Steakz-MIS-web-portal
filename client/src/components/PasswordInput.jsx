import React, { useState } from "react";

export default function PasswordInput({
  value,
  onChange,
  placeholder = "Enter password",
  showRequirements = false,
  required = false,
  minLength = 6,
  style = {},
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);

  const requirements = [
    {
      test: (val) => val.length >= minLength,
      message: `At least ${minLength} characters`,
    },
    {
      test: (val) => /[a-z]/.test(val),
      message: "One lowercase letter",
    },
    {
      test: (val) => /[A-Z]/.test(val),
      message: "One uppercase letter",
    },
    {
      test: (val) => /[0-9]/.test(val),
      message: "One number",
    },
  ];

  const showValidation = showRequirements && (focused || value.length > 0);

  return (
    <div style={containerStyle}>
      <div style={inputWrapper}>
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          required={required}
          minLength={minLength}
          style={{ ...inputStyle, ...style }}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          style={toggleButton}
          title={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? "👁️" : "👁️‍🗨️"}
        </button>
      </div>

      {showValidation && (
        <div style={requirementsBox}>
          <div style={requirementsTitle}>Password must contain:</div>
          {requirements.map((req, index) => {
            const passed = req.test(value);
            return (
              <div key={index} style={requirementItem(passed)}>
                <span style={requirementIcon(passed)}>
                  {passed ? "✓" : "○"}
                </span>
                <span>{req.message}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

const containerStyle = {
  width: "100%",
  position: "relative",
};

const inputWrapper = {
  position: "relative",
  display: "flex",
  alignItems: "center",
};

const inputStyle = {
  width: "100%",
  padding: "12px 45px 12px 16px",
  borderRadius: "10px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  background: "rgba(15, 23, 42, 0.5)",
  color: "#e2e8f0",
  fontSize: "15px",
  outline: "none",
  transition: "all 0.3s ease",
};

const toggleButton = {
  position: "absolute",
  right: "12px",
  background: "transparent",
  border: "none",
  cursor: "pointer",
  fontSize: "18px",
  padding: "4px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  opacity: 0.7,
  transition: "opacity 0.2s ease",
};

const requirementsBox = {
  marginTop: "12px",
  padding: "12px 16px",
  background: "rgba(15, 23, 42, 0.5)",
  borderRadius: "10px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
};

const requirementsTitle = {
  fontSize: "12px",
  fontWeight: "600",
  color: "#94a3b8",
  marginBottom: "8px",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
};

const requirementItem = (passed) => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontSize: "13px",
  color: passed ? "#22c55e" : "#94a3b8",
  marginBottom: "6px",
  transition: "color 0.3s ease",
});

const requirementIcon = (passed) => ({
  fontSize: "16px",
  fontWeight: "bold",
  color: passed ? "#22c55e" : "#475569",
});
