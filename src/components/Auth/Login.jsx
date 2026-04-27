import { useState } from "react";
import GoogleButton from "./UI/GoogleButton";
import { styles } from "../../styles/authStyles";

export default function Login({ onSignIn, onGoogleAuth, onSwitchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignInClick = () => {
    if (onSignIn) {
      onSignIn(email, password);
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

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
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
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
            <label style={styles.label}>Password</label>
            <a
              href="#"
              style={{ fontSize: 12, color: "#5f9c52", textDecoration: "none", fontWeight: 500, transition: "opacity 0.15s" }}
              onMouseEnter={(e) => (e.target.style.opacity = "0.75")}
              onMouseLeave={(e) => (e.target.style.opacity = "1")}
            >
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
        style={{ ...styles.primaryBtn, marginTop: 12, background: "#5f9c52", border: "none", width: "100%" }}
        onMouseEnter={(e) => (e.target.style.background = "#4e8843")}
        onMouseLeave={(e) => (e.target.style.background = "#5f9c52")}
        onClick={handleSignInClick}
      >
        Sign In
      </button>

      <p style={{ textAlign: "center", fontSize: 13, color: "#6e6a69", marginTop: 12 }}>
        New here?{" "}
        <button
          onClick={onSwitchToRegister}
          style={{ background: "none", border: "none", color: "#5f9c52", cursor: "pointer", fontSize: 13, fontWeight: 600, transition: "opacity 0.15s" }}
          onMouseEnter={(e) => (e.target.style.opacity = "0.75")}
          onMouseLeave={(e) => (e.target.style.opacity = "1")}
        >
          Create a free account →
        </button>
      </p>
    </div>
  );
}
