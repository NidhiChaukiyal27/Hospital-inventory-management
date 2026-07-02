import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#f59e0b",
  "#ef4444",
  "#10b981",
  "#3b82f6",
];

function AllocationPieChart({
  data,
}) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-md w-full">
      <h2 className="text-xl font-bold mb-6">
        Allocation Distribution
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="_id"
            outerRadius={80}
            label
          >
            {data.map(
              (entry, index) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[
                      index %
                        COLORS.length
                    ]
                  }
                />
              )
            )}
          </Pie>

          <Tooltip />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AllocationPieChart;