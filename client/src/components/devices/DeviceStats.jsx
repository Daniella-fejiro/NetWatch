import { motion } from "framer-motion";
import {
  MdDevices,
  MdCheckCircle,
  MdCancel,
  MdHelp,
} from "react-icons/md";

export default function DeviceStats({ devices }) {
  const total = devices.length;

  const online = devices.filter(
    (device) => device.status === "Online"
  ).length;

  const offline = devices.filter(
    (device) => device.status === "Offline"
  ).length;

  const unknown = devices.filter(
    (device) => device.status === "Unknown"
  ).length;

  const stats = [
    {
      title: "Total Devices",
      value: total,
      icon: MdDevices,
      color: "text-accent",
      bg: "bg-accent/10",
    },
    {
      title: "Online",
      value: online,
      icon: MdCheckCircle,
      color: "text-success",
      bg: "bg-success/10",
    },
    {
      title: "Offline",
      value: offline,
      icon: MdCancel,
      color: "text-danger",
      bg: "bg-danger/10",
    },
    {
      title: "Unknown",
      value: unknown,
      icon: MdHelp,
      color: "text-warning",
      bg: "bg-warning/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.08,
            }}
            className="
              bg-surface
              border
              border-white/10
              rounded-2xl
              p-4
            "
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-secondaryText text-xs">
                  {stat.title}
                </p>

                <h3 className="text-2xl font-bold text-primaryText mt-1">
                  {stat.value}
                </h3>
              </div>

              <div
                className={`${stat.bg} w-11 h-11 rounded-xl flex items-center justify-center`}
              >
                <Icon
                  className={stat.color}
                  size={22}
                />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}