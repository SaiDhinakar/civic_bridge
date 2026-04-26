export default function Footer() {
  return (
    <div style={{ textAlign: "center", padding: "20px 24px 36px", color: "#b8b2af", fontSize: 12 }}>
      <p>Built with Gemini AI · Powered by Google Cloud</p>
      <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 8 }}>
        <a href="#" style={{ color: "#b8b2af", textDecoration: "none" }}>Privacy</a>
        <a href="#" style={{ color: "#b8b2af", textDecoration: "none" }}>Terms</a>
        <a href="#" style={{ color: "#b8b2af", textDecoration: "none" }}>Contact</a>
      </div>
    </div>
  );
}
