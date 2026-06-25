import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

import { dashboardMock } from "./mockData";

const COLORS = ["#fffb24", "#48ff00", "#0be5f5"];

export default function DeviceDistribution({device}) {
  const data = [
    { name: "Online", value: device.online },
    { name: "Offline", value: device.offline },
    { name: "Maintenance", value: device.unknown },
  ];
  return (
    <div className="bg-surface p-4 rounded-xl border border-white/5">
      
      <h2 className="text-primaryText font-heading text-lg mb-4">
        Device Distribution
      </h2>

      <div className="w-full h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={4}
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: "#151D2A",
                border: "1px solid #1F2937",
                borderRadius: "8px",
                color: "#F8FAFC",
              }}
            />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}