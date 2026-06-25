import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function NetworkHealthChart({
  data,
}) {
  return (
    <div className="bg-surface rounded-xl border border-white/5 p-5">
      <h2 className="text-primaryText font-heading text-lg mb-6">
        Incident Trend
      </h2>

      <div className="h-[320px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <AreaChart data={data}>
            <defs>
              <linearGradient
                id="incidentGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#00D9FF"
                  stopOpacity={0.4}
                />

                <stop
                  offset="100%"
                  stopColor="#00D9FF"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="#1E293B"
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="date"
              stroke="#94A3B8"
            />

            <YAxis stroke="#94A3B8" />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="incidents"
              stroke="#00D9FF"
              fill="url(#incidentGradient)"
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}