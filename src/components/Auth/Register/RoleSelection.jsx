import GoogleButton from "../UI/GoogleButton";
import { styles } from "../../../../styles/authStyles";
import { ROLES } from "../../../../data/roles";

export default function RoleSelection({ onSelectRole, onGoogleAuth, onSwitchToLogin }) {
  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <h1 style={styles.title}>Join CivicBridge</h1>
        <p style={styles.subtitle}>I want to join as a…</p>
      </div>

      <GoogleButton label="Sign up with Google" onClick={onGoogleAuth} />

      <div style={styles.divider}><span>or register manually</span></div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {Object.values(ROLES).map((r) => (
          <button
            key={r.key}
            onClick={() => onSelectRole(r.key)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              padding: "16px 20px",
              borderRadius: 14,
              background: r.light,
              border: `1.5px solid ${r.border}`,
              cursor: "pointer",
              textAlign: "left",
              transition: "all 0.15s",
              width: "100%",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateX(4px)";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(26,18,8,0.10)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateX(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div
              style={{
                fontSize: 28,
                width: 48,
                height: 48,
                background: "white",
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: `1px solid ${r.border}`,
                flexShrink: 0,
              }}
            >
              {r.emoji}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, color: r.color, fontSize: 15, fontFamily: "'DM Sans', sans-serif" }}>
                {r.label}
              </div>
              <div style={{ fontSize: 13, color: "#6a6361", marginTop: 2 }}>{r.tagline}</div>
            </div>
            <div style={{ color: r.color, fontSize: 16 }}>→</div>
          </button>
        ))}
      </div>

      <p style={{ textAlign: "center", fontSize: 13, color: "#8b8280", marginTop: 24 }}>
        Already have an account?{" "}
        <button
          onClick={onSwitchToLogin}
          style={{ background: "none", border: "none", color: "#5f9c52", cursor: "pointer", fontSize: 13, fontWeight: 600 }}
        >
          Sign in →
        </button>
      </p>
    </div>
  );
}
