import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div style={{ background: "var(--ink)", color: "#fff", padding: "8px 12px", borderRadius: 8, fontSize: 12.5 }}>
      <div style={{ fontWeight: 600, marginBottom: 4 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ display: "flex", gap: 10, justifyContent: "space-between" }}>
          <span>{p.name}</span>
          <span>{p.value?.toLocaleString?.() ?? p.value}</span>
        </div>
      ))}
    </div>
  );
}

function AllocationBarChart({ data }) {
  return (
    <div className="card">
      <h3 style={{ fontSize: 15, marginBottom: 14 }}>Allocation Status</h3>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ left: -14, right: 8 }}>
          <CartesianGrid stroke="var(--line)" vertical={false} />
          <XAxis dataKey="_id" tick={{ fontSize: 11, fill: "var(--ink-soft)" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "var(--ink-soft)" }} axisLine={false} tickLine={false} />
          <Tooltip content={<ChartTooltip />} cursor={{ fill: "var(--yolk-paleer)" }} />
          <Bar dataKey="count" name="Count" fill="var(--yolk)" radius={[6, 6, 0, 0]} maxBarSize={48} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AllocationBarChart;
