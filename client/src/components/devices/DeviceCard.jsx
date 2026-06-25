import { motion } from "framer-motion";

import {
  MdRouter,
  MdHub,
  MdDns,
  MdSecurity,
  MdComputer,
  MdVisibility,
  MdEdit,
  MdDelete,
  MdDevices
} from "react-icons/md";

const iconMap = {
  Router: MdRouter,
  Switch: MdHub,
  Server: MdDns,
  Firewall: MdSecurity,
  PC: MdComputer,
  Other: MdDevices,
};

export default function DeviceCard({
  device,
  onView,
  onEdit,
  onDelete,
}) {
  const Icon =
    iconMap[device.type] || MdDevices;

  const statusColor = {
    Online: "bg-success",
    Offline: "bg-danger",
    Unknown: "bg-warning",
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      whileHover={{
        y: -4,
      }}
      className="
        bg-surface
        border
        border-white/10
        rounded-2xl
        p-4
      "
    >
      <div className="flex justify-between items-start">
        <div className="flex gap-3">
          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
            <Icon
              className="text-accent"
              size={24}
            />
          </div>

          <div>
            <h3 className="font-semibold text-primaryText">
              {device.name}
            </h3>

            <p className="text-secondaryText text-sm">
              {device.ipAddress}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${statusColor[device.status]}`}
          />

          <span className="text-xs text-primaryText">
            {device.status}
          </span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="bg-background px-3 py-1 rounded-lg text-xs text-primaryText">
          {device.type}
        </span>

        <span className="bg-background px-3 py-1 rounded-lg text-xs text-primaryText">
          {device.monitorType}
        </span>

        <span className="bg-background px-3 py-1 rounded-lg text-xs text-primaryText">
          Port {device.port}
        </span>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => onView(device)}
          className="flex-1 py-2 rounded-xl bg-accent/10 text-accent text-sm flex justify-center items-center gap-1"
        >
          <MdVisibility />
          View
        </button>

        <button
          onClick={() => onEdit(device)}
          className="flex-1 py-2 rounded-xl bg-warning/10 text-warning text-sm flex justify-center items-center gap-1"
        >
          <MdEdit />
          Edit
        </button>

        <button
          onClick={() => onDelete(device)} className=" flex-1 py-2 rounded-xl bg-danger/10 text-danger text-sm flex justify-center items-center gap-1"
        >
          <MdDelete />
          Delete
        </button>
      </div>
    </motion.div>
  );
}