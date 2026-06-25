import { motion } from "framer-motion";
import { MdChevronRight } from "react-icons/md";

export default function IncidentCard({ incident, onClick }) {
  const statusStyles = {
    open: "bg-danger/20 text-danger",
    acknowledged: "bg-warning/20 text-warning",
    resolved: "bg-success/20 text-success",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      onClick={() => onClick(incident)}
      className="w-full bg-surface border border-white/5 rounded-xl p-5 text-left"
    >
      <div className="flex justify-between gap-4">
        <div>
          <h3 className="text-primaryText font-semibold">
            {incident.title}
          </h3>

          <p className="text-secondaryText text-sm mt-2">
            {incident.message}
          </p>
        </div>

        <MdChevronRight className="text-secondaryText text-2xl shrink-0" />
      </div>

      <div className="flex flex-wrap gap-3 mt-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[incident.status]}`}
        >
          {incident.status}
        </span>

        <span className="text-secondaryText text-xs">
          {incident.device}
        </span>

        <span className="text-secondaryText text-xs">
          {incident.createdAt}
        </span>
      </div>
    </motion.button>
  );
}