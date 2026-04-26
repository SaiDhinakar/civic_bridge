import { styles } from "../../../styles/authStyles";

export default function ModeToggle({ mode, onSwitch }) {
  return (
    <div style={styles.modeToggle}>
      {["login", "register"].map((m) => (
        <button
          key={m}
          onClick={() => onSwitch(m)}
          style={{
            ...styles.modeBtn,
            background: mode === m ? "white" : "transparent",
            color: mode === m ? "#3f3a3a" : "#8b8380",
            boxShadow: mode === m ? "0 1px 4px rgba(26,18,8,0.10)" : "none",
            fontWeight: mode === m ? 600 : 400,
          }}
        >
          {m === "login" ? "Sign In" : "Create Account"}
        </button>
      ))}
    </div>
  );
}
