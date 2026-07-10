function colorToChipClass(color = "") {
  if (color.includes("green")) return "chip-green";
  if (color.includes("blue")) return "chip-blue";
  if (color.includes("red")) return "chip-red";
  if (color.includes("yellow") || color.includes("yolk") || color.includes("orange")) return "chip-orange";
  return "";
}

function KpiCard({ title, value, icon, color }) {
  return (
    <div className="card" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 14 }}>
      <div>
        <p style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink-soft)", margin: "0 0 10px", textTransform: "uppercase", letterSpacing: 0.4 }}>
          {title}
        </p>
        <span style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 500, color: "var(--ink)" }}>
          {value}
        </span>
      </div>

      <div className={`icon-chip ${colorToChipClass(color)}`}>{icon}</div>
    </div>
  );
}

export default KpiCard;
