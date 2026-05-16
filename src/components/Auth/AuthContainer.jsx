import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import ModeToggle from "./UI/ModeToggle";
import Login from "./Login";
import RoleSelection from "./Register/RoleSelection";
import RoleForm from "./Register/RoleForm";
import { ROLES } from "../../data/roles";
import { styles } from "../../styles/authStyles";
import { emailRegister, registerNGO } from "../../services/authAPI";

export default function AuthContainer() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [selectedRole, setSelectedRole] = useState(null);
  const [formData, setFormData] = useState({});
  const [step, setStep] = useState(1); // 1 = role selection, 2 = role form
  const [animating, setAnimating] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [loginEmail, setLoginEmail] = useState("");

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
      setSubmitError("");
      setAnimating(false);
    }, 180);
  };

  const handleRoleSelect = (r) => {
    setSelectedRole(r);
    setStep(2);
  };

  const handleGoogleAuth = async (credentialResponse) => {
    try {
      if (!credentialResponse.credential) {
        throw new Error('No credential received from Google');
      }
      setSubmitting(true);
      const isLoginMode = mode === "login";
      const data = await authAPI.googleLogin(credentialResponse.credential, isLoginMode);
      if (data.token) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        handleLoginSuccess(data.user);
      }
    } catch (err) {
      console.error("Google login failed", err);
      setSubmitError(err.message || "Google login failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleLoginSuccess = (user) => {
    // Redirect based on user role
    if (user.role === 'ngo_admin') {
      navigate('/ngo/dashboard');
    } else if (user.role === 'volunteer') {
      navigate('/volunteer/dashboard');
    } else {
      navigate('/community');
    }
  };

  const handleSubmit = async () => {
    if (!agreed) return;

    // Client-side password validation
    const { password, confirmPassword } = formData;
    if (!password || password.length < 8) {
      setSubmitError("Password must be at least 8 characters.");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setSubmitError("Password must contain at least one uppercase letter.");
      return;
    }
    if (!/[0-9]/.test(password)) {
      setSubmitError("Password must contain at least one number.");
      return;
    }
    if (password !== confirmPassword) {
      setSubmitError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      if (selectedRole === "ngo") {
        // NGO registration
        await registerNGO({
          email: formData.email,
          password: formData.password,
          displayName: formData.displayName || formData.orgName,
          orgName: formData.orgName,
          regNumber: formData.regNumber,
          phone: formData.phone,
          city: formData.city,
          website: formData.website || "",
          focus: formData.focus || [],
        });
      } else {
        // Volunteer or Community registration
        const response = await emailRegister({
          email: formData.email,
          password: formData.password,
          displayName: formData.fullName,
          role: selectedRole, // 'volunteer' or 'community'
          phone: formData.phone,
          city: formData.city,
          neighbourhood: formData.neighbourhood || "",
          skills: formData.skills || [],
          availability: formData.availability || "",
        });

        // Auto-login for non-NGO roles (they are immediately verified)
        if (response.success && response.token) {
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('userId', response.user.uid);
          localStorage.setItem('userRole', response.user.role);
          localStorage.setItem('userName', response.user.displayName || '');
          localStorage.setItem('userEmail', response.user.email || '');

          // Redirect immediately
          if (response.user.role === 'volunteer') {
            navigate('/volunteer/dashboard');
          } else {
            navigate('/community');
          }
          return;
        }
      }

      // Success — show the confirmation screen
      setSubmitted(true);
    } catch (err) {
      const errMsg =
        err.errors?.[0]?.msg ||
        err.message ||
        "Registration failed. Please try again.";
        
      if (errMsg.toLowerCase().includes("already exists")) {
        setLoginEmail(formData.email);
        switchMode("login");
        alert("An account with this email already exists (e.g., from Google Auth). Please log in instead.");
        return;
      }
      
      setSubmitError(errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (id, val) =>
    setFormData((prev) => ({ ...prev, [id]: val }));

  if (submitted && role) {
    return (
      <div style={styles.page}>
        <Header />
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
          <div style={{ ...styles.card, textAlign: "center", padding: "36px 28px" }}>
          <div style={{ fontSize: 48, marginBottom: 20 }}><i className={role.icon} style={{ color: role.color }}></i></div>
          <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 26, color: "#5a5555", marginBottom: 12 }}>
            {role.key === "ngo" ? "Application submitted!" : "Welcome to CivicBridge!"}
          </div>
          <div style={{ color: "#8b8280", fontSize: 15, maxWidth: 360, margin: "0 auto 32px", lineHeight: 1.7 }}>
            {role.key === "ngo"
              ? "Your NGO account is under review. We verify all organisations within 24–48 hours. You'll receive an email once approved."
              : `Your ${role.label} account has been created. You can now sign in.`}
          </div>
          <button
            onClick={() => switchMode("login")}
            style={{ ...styles.primaryBtn, background: role.color, border: "none" }}
          >
            Go to Sign In
          </button>
          </div>
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

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
        <div style={{ ...styles.card, opacity: animating ? 0 : 1, transition: "opacity 0.18s" }}>
        <ModeToggle mode={mode} onSwitch={switchMode} />

        {mode === "login" && (
          <Login
            onGoogleAuth={handleGoogleAuth}
            onSwitchToRegister={() => switchMode("register")}
            onLoginSuccess={handleLoginSuccess}
            initialEmail={loginEmail}
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
            isSubmitting={isSubmitting}
            submitError={submitError}
            onUpdateField={updateField}
            onAgreeChange={setAgreed}
            onSubmit={handleSubmit}
            onGoogleAuth={handleGoogleAuth}
            onBack={() => setStep(1)}
          />
        )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
