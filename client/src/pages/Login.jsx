import React, { useState, useEffect } from "react";
import api from "../services/api";
import { saveAuth } from "../services/auth";
import PasswordInput from "../components/PasswordInput";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate floating particles
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", { username, password });
      saveAuth(data.token, data.user);
      window.location.href = "/dashboard";
    } catch (e) {
      setError(e.response?.data?.message || "Login failed");
      setLoading(false);
    }
  };

  return (
    <div style={container}>
      {/* Animated Background */}
      <div style={backgroundLayer1}></div>
      <div style={backgroundLayer2}></div>
      <div style={backgroundLayer3}></div>

      {/* Floating Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          style={{
            ...floatingParticle,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}

      {/* Glowing Orbs */}
      <div style={glowOrb1}></div>
      <div style={glowOrb2}></div>
      <div style={glowOrb3}></div>

      {/* Login Form */}
      <div style={formWrapper}>
        <div style={scanLineEffect}></div>

        <form onSubmit={submit} style={formCard}>
          {/* Logo Section */}
          <div style={logoContainer}>
            <div style={logoRing}>
              <div style={logoInnerRing}>
                <div style={logoIcon}>🥩</div>
              </div>
            </div>
            <h1 style={title}>
              <span style={titleGlow}>STEAKZ</span> MIS
            </h1>
            <div style={subtitle}>
              <span style={subtitleLine}></span>
              <span style={subtitleText}>SECURE ACCESS PORTAL</span>
              <span style={subtitleLine}></span>
            </div>
          </div>

          {/* Input Fields */}
          <div style={inputSection}>
            <div style={inputGroup}>
              <label style={label}>
                <span style={labelIcon}>👤</span>
                USERNAME
              </label>
              <div style={inputWrapper}>
                <input
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={inp}
                  required
                  autoComplete="username"
                />
                <div style={inputGlow}></div>
              </div>
            </div>

            <div style={inputGroup}>
              <label style={label}>
                <span style={labelIcon}>🔐</span>
                PASSWORD
              </label>
              <div style={inputWrapper}>
                <PasswordInput
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  showRequirements={false}
                  required
                />
                <div style={inputGlow}></div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div style={errorBox}>
              <div style={errorIcon}>⚠</div>
              <div style={errorContent}>
                <div style={errorTitle}>Authentication Failed</div>
                <div style={errorMessage}>{error}</div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button style={loading ? btnLoading : btn} disabled={loading}>
            <div style={btnContent}>
              {loading ? (
                <>
                  <div style={spinner}></div>
                  <span>AUTHENTICATING</span>
                  <div style={loadingDots}>
                    <span style={dot1}>.</span>
                    <span style={dot2}>.</span>
                    <span style={dot3}>.</span>
                  </div>
                </>
              ) : (
                <>
                  <span>ACCESS SYSTEM</span>
                  <span style={btnArrow}>→</span>
                </>
              )}
            </div>
            <div style={btnGlow}></div>
          </button>

          {/* Footer */}
          <div style={footer}>
            <div style={footerText}>
              © 2025 Steakz MIS • Secure System Access
            </div>
          </div>
        </form>

        {/* Corner Decorations */}
        <div style={cornerTL}></div>
        <div style={cornerTR}></div>
        <div style={cornerBL}></div>
        <div style={cornerBR}></div>
      </div>
    </div>
  );
}

// Styles
const container = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  background: "#050a12",
  position: "relative",
  overflow: "hidden",
};

const backgroundLayer1 = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background:
    "radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.15) 0%, transparent 50%)",
  animation: "pulse 8s ease-in-out infinite",
};

const backgroundLayer2 = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background:
    "radial-gradient(circle at 80% 30%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)",
  animation: "pulse 6s ease-in-out infinite reverse",
};

const backgroundLayer3 = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundImage: `
    linear-gradient(rgba(16, 185, 129, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(16, 185, 129, 0.03) 1px, transparent 1px)
  `,
  backgroundSize: "50px 50px",
  animation: "gridMove 20s linear infinite",
};

const floatingParticle = {
  position: "absolute",
  background: "rgba(16, 185, 129, 0.6)",
  borderRadius: "50%",
  animation: "float 15s ease-in-out infinite",
  boxShadow: "0 0 10px rgba(16, 185, 129, 0.5)",
  pointerEvents: "none",
};

const glowOrb1 = {
  position: "absolute",
  width: "400px",
  height: "400px",
  background:
    "radial-gradient(circle, rgba(16, 185, 129, 0.2), transparent 70%)",
  borderRadius: "50%",
  top: "-200px",
  left: "-200px",
  filter: "blur(60px)",
  animation: "orbFloat1 15s ease-in-out infinite",
};

const glowOrb2 = {
  position: "absolute",
  width: "500px",
  height: "500px",
  background:
    "radial-gradient(circle, rgba(34, 197, 94, 0.15), transparent 70%)",
  borderRadius: "50%",
  bottom: "-250px",
  right: "-250px",
  filter: "blur(80px)",
  animation: "orbFloat2 18s ease-in-out infinite",
};

const glowOrb3 = {
  position: "absolute",
  width: "350px",
  height: "350px",
  background:
    "radial-gradient(circle, rgba(52, 211, 153, 0.12), transparent 70%)",
  borderRadius: "50%",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  filter: "blur(100px)",
  animation: "pulse 10s ease-in-out infinite",
};

const formWrapper = {
  position: "relative",
  zIndex: 10,
  animation: "fadeInUp 0.8s ease-out",
};

const scanLineEffect = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  height: "2px",
  background:
    "linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.8), transparent)",
  animation: "scanLine 3s linear infinite",
  zIndex: 100,
  pointerEvents: "none",
};

const formCard = {
  background: "rgba(10, 20, 30, 0.85)",
  backdropFilter: "blur(30px) saturate(150%)",
  padding: "50px 45px",
  borderRadius: "24px",
  width: "480px",
  maxWidth: "90%",
  boxShadow: `
    0 0 0 1px rgba(16, 185, 129, 0.2),
    0 25px 80px rgba(0, 0, 0, 0.6),
    inset 0 1px 0 rgba(255, 255, 255, 0.05)
  `,
  border: "1px solid rgba(16, 185, 129, 0.2)",
  position: "relative",
  animation: "cardGlow 3s ease-in-out infinite",
};

const logoContainer = {
  textAlign: "center",
  marginBottom: "30px",
};

const logoRing = {
  width: "120px",
  height: "120px",
  margin: "0 auto 20px",
  background:
    "linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(34, 197, 94, 0.1))",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  animation: "rotate 20s linear infinite",
  boxShadow: "0 0 30px rgba(16, 185, 129, 0.3)",
};

const logoInnerRing = {
  width: "90px",
  height: "90px",
  background:
    "linear-gradient(135deg, rgba(10, 20, 30, 0.9), rgba(15, 25, 35, 0.8))",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "2px solid rgba(16, 185, 129, 0.3)",
};

const logoIcon = {
  fontSize: "48px",
  animation: "bounce 2s ease-in-out infinite",
  filter: "drop-shadow(0 0 10px rgba(16, 185, 129, 0.5))",
};

const title = {
  fontSize: "36px",
  fontWeight: "900",
  margin: "0 0 16px 0",
  color: "#fff",
  letterSpacing: "4px",
  fontFamily: "'Orbitron', monospace",
  textShadow: "0 0 20px rgba(16, 185, 129, 0.5)",
};

const titleGlow = {
  background: "linear-gradient(135deg, #10b981, #34d399)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  animation: "shimmer 3s ease-in-out infinite",
};

const subtitle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "12px",
  marginTop: "12px",
};

const subtitleLine = {
  height: "1px",
  width: "40px",
  background:
    "linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.5), transparent)",
};

const subtitleText = {
  fontSize: "11px",
  fontWeight: "700",
  color: "#10b981",
  letterSpacing: "3px",
  fontFamily: "'Orbitron', monospace",
};

const inputSection = {
  marginBottom: "24px",
};

const inputGroup = {
  marginBottom: "24px",
};

const label = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontSize: "11px",
  fontWeight: "700",
  color: "#10b981",
  marginBottom: "10px",
  letterSpacing: "2px",
  fontFamily: "'Orbitron', monospace",
};

const labelIcon = {
  fontSize: "14px",
  filter: "drop-shadow(0 0 5px rgba(16, 185, 129, 0.5))",
};

const inputWrapper = {
  position: "relative",
};

const inp = {
  width: "100%",
  padding: "16px 18px",
  borderRadius: "12px",
  border: "1px solid rgba(16, 185, 129, 0.3)",
  background: "rgba(5, 10, 18, 0.6)",
  color: "#e2e8f0",
  fontSize: "15px",
  transition: "all 0.3s ease",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "'Inter', sans-serif",
  boxShadow: "inset 0 2px 10px rgba(0, 0, 0, 0.3)",
};

const inputGlow = {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  height: "2px",
  background: "linear-gradient(90deg, transparent, #10b981, transparent)",
  opacity: 0,
  transition: "opacity 0.3s ease",
};

const errorBox = {
  display: "flex",
  gap: "12px",
  padding: "16px",
  borderRadius: "12px",
  background: "rgba(220, 38, 38, 0.1)",
  border: "1px solid rgba(220, 38, 38, 0.3)",
  marginBottom: "20px",
  animation: "shake 0.5s ease-in-out",
};

const errorIcon = {
  fontSize: "24px",
  color: "#ef4444",
  animation: "pulse 1s ease-in-out infinite",
};

const errorContent = {
  flex: 1,
};

const errorTitle = {
  fontSize: "13px",
  fontWeight: "700",
  color: "#ef4444",
  marginBottom: "4px",
  letterSpacing: "1px",
};

const errorMessage = {
  fontSize: "13px",
  color: "#fca5a5",
};

const btn = {
  width: "100%",
  padding: "18px",
  borderRadius: "12px",
  background: "linear-gradient(135deg, #10b981, #059669)",
  color: "#fff",
  border: "none",
  fontSize: "14px",
  fontWeight: "700",
  cursor: "pointer",
  position: "relative",
  overflow: "hidden",
  letterSpacing: "2px",
  fontFamily: "'Orbitron', monospace",
  boxShadow:
    "0 4px 20px rgba(16, 185, 129, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
  transition: "all 0.3s ease",
};

const btnLoading = {
  ...btn,
  background: "rgba(16, 185, 129, 0.3)",
  cursor: "not-allowed",
};

const btnContent = {
  position: "relative",
  zIndex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
};

const btnArrow = {
  fontSize: "18px",
  transition: "transform 0.3s ease",
};

const btnGlow = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "0%",
  height: "100%",
  background: "rgba(255, 255, 255, 0.2)",
  transform: "translate(-50%, -50%)",
  borderRadius: "12px",
  transition: "width 0.3s ease",
};

const spinner = {
  width: "16px",
  height: "16px",
  border: "2px solid rgba(255, 255, 255, 0.3)",
  borderTop: "2px solid #fff",
  borderRadius: "50%",
  animation: "spin 0.8s linear infinite",
};

const loadingDots = {
  display: "flex",
  gap: "2px",
};

const dot1 = {
  animation: "blink 1.4s infinite",
  animationDelay: "0s",
};

const dot2 = {
  animation: "blink 1.4s infinite",
  animationDelay: "0.2s",
};

const dot3 = {
  animation: "blink 1.4s infinite",
  animationDelay: "0.4s",
};

const demoSection = {
  marginTop: "32px",
  padding: "20px",
  background: "rgba(16, 185, 129, 0.05)",
  borderRadius: "12px",
  border: "1px solid rgba(16, 185, 129, 0.2)",
};

const demoTitle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  fontSize: "11px",
  fontWeight: "700",
  color: "#10b981",
  marginBottom: "16px",
  letterSpacing: "2px",
  fontFamily: "'Orbitron', monospace",
};

const demoIcon = {
  fontSize: "14px",
};

const demoGrid = {
  display: "grid",
  gap: "12px",
};

const demoCard = {
  padding: "12px 16px",
  background: "rgba(5, 10, 18, 0.6)",
  borderRadius: "8px",
  border: "1px solid rgba(16, 185, 129, 0.2)",
};

const demoRole = {
  fontSize: "10px",
  fontWeight: "700",
  color: "#10b981",
  marginBottom: "6px",
  letterSpacing: "1.5px",
  textTransform: "uppercase",
};

const demoCredential = {
  fontSize: "13px",
  color: "#94a3b8",
  fontFamily: "'Courier New', monospace",
};

const footer = {
  marginTop: "32px",
  paddingTop: "20px",
  borderTop: "1px solid rgba(16, 185, 129, 0.1)",
};

const footerText = {
  fontSize: "11px",
  color: "#64748b",
  textAlign: "center",
  letterSpacing: "1px",
};

// Corner Decorations
const cornerStyle = {
  position: "absolute",
  width: "30px",
  height: "30px",
  border: "2px solid rgba(16, 185, 129, 0.4)",
  pointerEvents: "none",
};

const cornerTL = {
  ...cornerStyle,
  top: "-15px",
  left: "-15px",
  borderRight: "none",
  borderBottom: "none",
  animation: "cornerPulse 2s ease-in-out infinite",
};

const cornerTR = {
  ...cornerStyle,
  top: "-15px",
  right: "-15px",
  borderLeft: "none",
  borderBottom: "none",
  animation: "cornerPulse 2s ease-in-out infinite 0.5s",
};

const cornerBL = {
  ...cornerStyle,
  bottom: "-15px",
  left: "-15px",
  borderRight: "none",
  borderTop: "none",
  animation: "cornerPulse 2s ease-in-out infinite 1s",
};

const cornerBR = {
  ...cornerStyle,
  bottom: "-15px",
  right: "-15px",
  borderLeft: "none",
  borderTop: "none",
  animation: "cornerPulse 2s ease-in-out infinite 1.5s",
};
