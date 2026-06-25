import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function TopDevicesChart({
  devices,
}) {
  return (
    <div className="bg-surface rounded-xl border border-white/5 p-5">
      <h2 className="text-primaryText font-heading text-lg mb-6">
        Top Problem Devices
      </h2>

      <div className="h-[320px]">
        <ResponsiveContainer>
          <BarChart
            layout="vertical"
            data={devices}
          >
            <CartesianGrid
              stroke="#1E293B"
              strokeDasharray="3 3"
            />

            <XAxis
              type="number"
              stroke="#94A3B8"
            />

            <YAxis
              dataKey="device"
              type="category"
              stroke="#94A3B8"
              width={120}
            />

            <Tooltip />

            <Bar
              dataKey="incidents"
              fill="#00D9FF"
              radius={[0, 8, 8, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}