import { useState } from "react";
import GoogleButton from "./UI/GoogleButton";
import { styles } from "../../styles/authStyles";
import { emailLogin } from "../../services/authAPI";

export default function Login({ onGoogleAuth, onSwitchToRegister, onLoginSuccess, onError }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await emailLogin(email, password);
      
      if (response.success) {
        // Store auth data from backend
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('userId', response.user.uid);
        localStorage.setItem('userRole', response.user.role);
        localStorage.setItem('userName', response.user.displayName || '');
        localStorage.setItem('userAvatar', response.user.profilePicture || '');
        localStorage.setItem('userEmail', response.user.email || '');
        if (response.user.ngoId) {
          localStorage.setItem('ngoId', response.user.ngoId);
        }
        
        // Call success callback
        if (onLoginSuccess) {
          onLoginSuccess(response.user);
        }
      }
    } catch (err) {
      const errorMsg = err.message || "Login failed. Please try again.";
      setError(errorMsg);
      if (onError) {
        onError(errorMsg);
      }
    } finally {
      setIsLoading(false);
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

      {error && (
        <div style={{
          padding: "10px 12px",
          marginBottom: "8px",
          backgroundColor: "#fee",
          border: "1px solid #fcc",
          borderRadius: "6px",
          color: "#c33",
          fontSize: "13px"
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSignIn} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div>
          <label style={styles.label}>Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

        <button
          type="submit"
          disabled={isLoading}
          style={{ ...styles.primaryBtn, marginTop: 12, background: isLoading ? "#888" : "#5f9c52", border: "none", width: "100%", cursor: isLoading ? "not-allowed" : "pointer" }}
          onMouseEnter={(e) => !isLoading && (e.target.style.background = "#4e8843")}
          onMouseLeave={(e) => !isLoading && (e.target.style.background = "#5f9c52")}
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
      </form>

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
