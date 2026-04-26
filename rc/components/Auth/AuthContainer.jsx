import { useState } from "react";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import ModeToggle from "./UI/ModeToggle";
import Login from "./Login";
import RoleSelection from "./Register/RoleSelection";
import RoleForm from "./Register/RoleForm";
import { ROLES } from "../../data/roles";
import { styles } from "../../styles/authStyles";

export default function AuthContainer() {
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [selectedRole, setSelectedRole] = useState(null);
  const [formData, setFormData] = useState({});
  const [step, setStep] = useState(1); // 1 = role selection, 2 = role form
  const [animating, setAnimating] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const role = selectedRole ? ROLES[selectedRole] : null;

  const switchMode = (m) => {
    setAnimating(true);
    setTimeout(() => {
      setMode(m);
      setSelectedRole(null);
      setStep(1);
      setFormData({});
      setAgreed(false);
      setSubmitted(false);
      setAnimating(false);
    }, 180);
  };

  const handleRoleSelect = (r) => {
    setSelectedRole(r);
    setStep(2);
  };

  const handleGoogleAuth = () => {
    alert("Google OAuth flow would initiate here.\nScopes: profile, email\nRedirect: /auth/google/callback");
  };

  const handleSubmit = () => {
    if (!agreed) return;
    setSubmitted(true);
  };

  const updateField = (id, val) =>
    setFormData((prev) => ({ ...prev, [id]: val }));

  if (submitted && role) {
    return (
      <div style={styles.page}>
        <Header />
        <div style={{ ...styles.card, textAlign: "center", padding: "56px 40px" }}>
          <div style={{ fontSize: 48, marginBottom: 20 }}>{role.emoji}</div>
          <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 26, color: "#5a5555", marginBottom: 12 }}>
            {role.key === "ngo" ? "Application submitted!" : "Welcome to CivicBridge!"}
          </div>
          <div style={{ color: "#8b8280", fontSize: 15, maxWidth: 360, margin: "0 auto 32px", lineHeight: 1.7 }}>
            {role.key === "ngo"
              ? "Your NGO account is under review. We verify all organisations within 24–48 hours. You'll receive an email once approved."
              : `Your ${role.label} account has been created. You can now sign in with Google.`}
          </div>
          <button
            onClick={() => switchMode("login")}
            style={{ ...styles.primaryBtn, background: role.color, border: "none" }}
          >
            Go to Sign In
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #eeece9; }
        input:focus, select:focus { outline: none; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #d8d3d0; border-radius: 4px; }
      `}</style>

      <Header />

      <div style={{ ...styles.card, opacity: animating ? 0 : 1, transition: "opacity 0.18s" }}>
        <ModeToggle mode={mode} onSwitch={switchMode} />

        {mode === "login" && (
          <Login
            onGoogleAuth={handleGoogleAuth}
            onSwitchToRegister={() => switchMode("register")}
          />
        )}

        {mode === "register" && step === 1 && (
          <RoleSelection
            onSelectRole={handleRoleSelect}
            onGoogleAuth={handleGoogleAuth}
            onSwitchToLogin={() => switchMode("login")}
          />
        )}

        {mode === "register" && step === 2 && role && (
          <RoleForm
            role={role}
            formData={formData}
            agreed={agreed}
            onUpdateField={updateField}
            onAgreeChange={setAgreed}
            onSubmit={handleSubmit}
            onGoogleAuth={handleGoogleAuth}
            onBack={() => setStep(1)}
          />
        )}
      </div>

      <Footer />
    </div>
  );
}
