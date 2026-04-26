export default function MultiSelect({ options, value = [], onChange }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 2 }}>
      {options.map((opt) => {
        const sel = value.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(sel ? value.filter((v) => v !== opt) : [...value, opt])}
            style={{
              padding: "5px 12px",
              borderRadius: 99,
              fontSize: 12,
              fontWeight: 500,
              border: sel ? "1.5px solid currentColor" : "1px solid #d8d3d0",
              background: sel ? "#e8f0e3" : "white",
              color: sel ? "#4f8a43" : "#6a6361",
              cursor: "pointer",
              transition: "all 0.15s",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
