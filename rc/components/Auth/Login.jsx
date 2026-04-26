import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleButton from "./UI/GoogleButton";
import { styles } from "../../styles/authStyles";
import { ROLES } from "../../data/roles";

export default function Login({ onGoogleAuth, onSwitchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === "ngo@test.com" && password === "1234") {
      localStorage.setItem("userRole", "ngo");
      navigate("/ngo");
    } else if (email === "volunteer@test.com" && password === "1234") {
      localStorage.setItem("userRole", "volunteer");
      navigate("/volunteer");
    } else if (email === "community@test.com" && password === "1234") {
      localStorage.setItem("userRole", "community");
      navigate("/community");
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 12 }}>
        <h1 style={styles.title}>Welcome back</h1>
        <p style={styles.subtitle}>Sign in to your CivicBridge account</p>
      </div>

      <GoogleButton label="Continue with Google" onClick={onGoogleAuth} />

      <div style={styles.divider}><span>or</span></div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div>
          <label style={styles.label}>Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            style={styles.input}
            onFocus={(e) => {
              e.target.style.border = "1.5px solid #5f9c52";
              e.target.style.boxShadow = "0 0 0 3px rgba(95,156,82,0.12)";
            }}
            onBlur={(e) => {
              e.target.style.border = "1px solid #d8d3d0";
              e.target.style.boxShadow = "none";
            }}
          />
        </div>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <label style={styles.label}>Password</label>
            <a href="#" style={{ fontSize: 12, color: "#5f9c52", textDecoration: "none" }}>
              Forgot password?
            </a>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            style={styles.input}
            onFocus={(e) => {
              e.target.style.border = "1.5px solid #5f9c52";
              e.target.style.boxShadow = "0 0 0 3px rgba(95,156,82,0.12)";
            }}
            onBlur={(e) => {
              e.target.style.border = "1px solid #d8d3d0";
              e.target.style.boxShadow = "none";
            }}
          />
        </div>
      </div>

      <button
        onClick={handleLogin}
        style={{ ...styles.primaryBtn, marginTop: 14, background: "#5f9c52", border: "none", width: "100%" }}
      >
        Sign In
      </button>

      <p style={{ textAlign: "center", fontSize: 13, color: "#8b8280", marginTop: 12 }}>
        New here?{" "}
        <button
          onClick={onSwitchToRegister}
          style={{ background: "none", border: "none", color: "#5f9c52", cursor: "pointer", fontSize: 13, fontWeight: 600 }}
        >
          Create a free account →
        </button>
      </p>
      
    </div>
  );
}
