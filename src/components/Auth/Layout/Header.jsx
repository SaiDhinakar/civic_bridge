import BuildWithAIBadge from "../UI/Badge";

export default function Header() {
  return (
    <div style={{ textAlign: "center", padding: "36px 24px 20px" }}>
      <BuildWithAIBadge />
      <div
        style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: 28,
          color: "#5a5555",
          marginTop: 16,
          letterSpacing: "-0.02em",
        }}
      >
        Civic<span style={{ color: "#5f9c52", fontStyle: "italic" }}>Bridge</span>
      </div>
      <div style={{ fontSize: 13, color: "#8b8280", marginTop: 4, fontWeight: 300 }}>
        AI-powered volunteer coordination
      </div>
    </div>
  );
}
