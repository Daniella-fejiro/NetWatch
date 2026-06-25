import { motion } from "framer-motion";
import { MdWarning, MdCheckCircle, MdPendingActions } from "react-icons/md";

export default function IncidentStats({ incidents }) {
  const active = incidents.filter(
    (i) => i.status !== "resolved"
  ).length;

  const resolved = incidents.filter(
    (i) => i.status === "resolved"
  ).length;

  const acknowledged = incidents.filter(
    (i) => i.status === "acknowledged"
  ).length;

  const cards = [
    {
      title: "Active Incidents",
      value: active,
      icon: MdWarning,
      color: "text-danger",
    },
    {
      title: "Acknowledged",
      value: acknowledged,
      icon: MdPendingActions,
      color: "text-warning",
    },
    {
      title: "Resolved",
      value: resolved,
      icon: MdCheckCircle,
      color: "text-success",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3 mb-6">
      {cards.map((card) => (
        <motion.div
          key={card.title}
          whileHover={{ y: -3 }}
          className="bg-surface border border-white/5 rounded-xl p-5"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-secondaryText text-sm">
                {card.title}
              </p>

              <h3 className="text-primaryText text-3xl font-bold mt-2">
                {card.value}
              </h3>
            </div>

            <card.icon className={`text-3xl ${card.color}`} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}