import FormField from "../Form/FormField";
import GoogleButton from "../UI/GoogleButton";
import { styles } from "../../../../styles/authStyles";

export default function RoleForm({ role, formData, agreed, onUpdateField, onAgreeChange, onSubmit, onGoogleAuth, onBack }) {
  return (
    <div>
      <button
        onClick={onBack}
        style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: "#8b8380", fontSize: 13, marginBottom: 20, padding: 0 }}
      >
        ← Back
      </button>

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: role.light,
            border: `1px solid ${role.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
          }}
        >
          {role.emoji}
        </div>
        <div>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: "#5a5555", lineHeight: 1.2 }}>
            Register as {role.label}
          </h2>
          <p style={{ fontSize: 13, color: "#8b8280", marginTop: 2 }}>{role.desc}</p>
        </div>
      </div>

      {role.note && (
        <div style={{ background: "#fef9ec", border: "1px solid #fac775", borderRadius: 10, padding: "10px 14px", marginBottom: 20, fontSize: 12, color: "#854f0b", display: "flex", gap: 8 }}>
          <span>⏳</span>
          <span>{role.note}</span>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 20 }}>
        {role.fields.map((f) => (
          <FormField
            key={f.id}
            field={f}
            value={formData[f.id]}
            onChange={(val) => onUpdateField(f.id, val)}
          />
        ))}
      </div>

      <div style={{ marginBottom: 24, padding: "12px 14px", background: "#f4f9f0", borderRadius: 10, border: "1px solid #d4e8cc" }}>
        <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => onAgreeChange(e.target.checked)}
            style={{ marginTop: 2, accentColor: role.color, width: 16, height: 16 }}
          />
          <span style={{ fontSize: 13, color: "#5b5554", lineHeight: 1.6 }}>
            I agree to CivicBridge's{" "}
            <a href="#" style={{ color: role.color, textDecoration: "none" }}>Terms of Service</a>{" "}
            and{" "}
            <a href="#" style={{ color: role.color, textDecoration: "none" }}>Privacy Policy</a>.
            I understand my data will be used to match me with civic opportunities.
          </span>
        </label>
      </div>

      <button
        onClick={onSubmit}
        disabled={!agreed}
        style={{
          ...styles.primaryBtn,
          width: "100%",
          border: "none",
          background: agreed ? role.color : "#d8d3d0",
          cursor: agreed ? "pointer" : "not-allowed",
          color: "white",
        }}
      >
        {role.key === "ngo" ? "Submit for Verification" : `Create ${role.label} Account`}
      </button>

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 16 }}>
        <div style={{ flex: 1, height: 1, background: "#e6e4e1" }} />
        <span style={{ fontSize: 12, color: "#b8b2af" }}>or</span>
        <div style={{ flex: 1, height: 1, background: "#e6e4e1" }} />
      </div>

      <GoogleButton label="Register with Google instead" onClick={onGoogleAuth} style={{ marginTop: 12 }} />
    </div>
  );
}
