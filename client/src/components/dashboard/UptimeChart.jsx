import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { dashboardMock } from "./mockData";

export default function UptimeChart({devices}) {
  const [range, setRange] = useState("24h");

  const data = devices;

  return (
    <div className="bg-surface p-4 rounded-xl border border-white/5">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-primaryText font-heading text-lg">
          Network Uptime Trend
        </h2>

        {/* Toggle */}
        <div className="flex gap-2">
          {["24h", "7d"].map((item) => (
            <button
              key={item}
              onClick={() => setRange(item)}
              className={`px-3 py-1 text-sm rounded-lg transition ${
                range === item
                  ? "bg-accent text-black"
                  : "bg-background text-secondaryText"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            
            <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />

            <XAxis
              dataKey="time"
              stroke="#94A3B8"
              tick={{ fontSize: 12 }}
            />

            <YAxis
              domain={[99, 100]}
              stroke="#94A3B8"
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `${value}%`}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#151D2A",
                border: "1px solid #1F2937",
                borderRadius: "8px",
                color: "#F8FAFC",
              }}
              formatter={(value) => [`${value}%`, "Uptime"]}
            />

            <Line
              type="monotone"
              dataKey="uptime"
              stroke="#00D9FF"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}