import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const RAMP = ["#F6B400", "#2F5FA8", "#2F7D4F", "#C6273B", "#C97A1D", "#8A6100"];

function ChartTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null;
  const p = payload[0];
  return (
    <div style={{ background: "var(--ink)", color: "#fff", padding: "8px 12px", borderRadius: 8, fontSize: 12.5 }}>
      {p.name}: {p.value}
    </div>
  );
}

function AllocationPieChart({ data }) {
  return (
    <div className="card">
      <h3 style={{ fontSize: 15, marginBottom: 14 }}>Allocation Distribution</h3>

      <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
        <ResponsiveContainer width={190} height={190}>
          <PieChart>
            <Pie data={data} dataKey="count" nameKey="_id" innerRadius={54} outerRadius={88} paddingAngle={2}>
              {data.map((entry, index) => (
                <Cell key={entry._id ?? index} fill={RAMP[index % RAMP.length]} stroke="#fff" strokeWidth={2} />
              ))}
            </Pie>
            <Tooltip content={<ChartTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {data.map((entry, index) => (
            <div key={entry._id ?? index} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 10, height: 10, borderRadius: 3, background: RAMP[index % RAMP.length] }} />
              <span style={{ fontSize: 12.5, color: "var(--ink)" }}>{entry._id}</span>
              <span style={{ fontSize: 12.5, color: "var(--ink-soft)" }}>{entry.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllocationPieChart;
