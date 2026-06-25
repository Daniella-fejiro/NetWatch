import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const COLORS = [
  "#22C55E",
  "#EF4444",
  "#F59E0B",
];

export default function IncidentDistributionChart({
  data,
}) {
  return (
    <div className="bg-surface rounded-xl border border-white/5 p-5">
      <h2 className="text-primaryText font-heading text-lg mb-6">
        Incident Distribution
      </h2>

      <div className="h-[320px]">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={70}
              outerRadius={110}
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[
                      index % COLORS.length
                    ]
                  }
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}