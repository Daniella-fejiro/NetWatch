import { motion } from "framer-motion";

export default function StatsCard({ label, value, icon: Icon, color = "accent" }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-surface p-4 rounded-xl border border-white/5"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-secondaryText text-sm">{label}</p>
          <h2 className="text-primaryText text-2xl font-heading mt-1">
            {value}
          </h2>
        </div>

        {Icon && (
          <div className={`text-${color} text-2xl`}>
            <Icon />
          </div>
        )}
      </div>
    </motion.div>
  );
}