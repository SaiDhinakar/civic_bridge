export default function BuildWithAIBadge() {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        background: "linear-gradient(135deg, #e8f0fe 0%, #fce8e6 100%)",
        border: "1px solid rgba(66,133,244,0.2)",
        borderRadius: 99,
        padding: "4px 12px 4px 8px",
        fontSize: 11,
        fontFamily: "'JetBrains Mono', monospace",
        color: "#185fa5",
        letterSpacing: "0.04em",
        fontWeight: 500,
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
          stroke="#4285F4"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Google Build with AI · Hackathon 2026
    </div>
  );
}
