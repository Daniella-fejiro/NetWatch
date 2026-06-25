import { motion } from "framer-motion";

export default function RecentIncidents({
  incidents = [],
}) {
  return (
    <div className="bg-surface p-4 rounded-xl border border-white/5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-primaryText font-heading text-lg">
          Recent Incidents
        </h2>

        <a href="/incidents">
          <button className="text-accent text-sm hover:underline">
            View all
          </button>
        </a>
      </div>

      <div className="space-y-3">
        {incidents.length === 0 ? (
          <div className="p-4 bg-background rounded-lg text-center">
            <p className="text-secondaryText text-sm">
              No active incidents
            </p>
          </div>
        ) : (
          incidents.map((incident, index) => (
            <motion.div
              key={incident.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between p-3 bg-background rounded-lg"
            >
              <div>
                <p className="text-primaryText text-sm font-medium">
                  {incident.title}
                </p>

                <p className="text-secondaryText text-xs">
                  {incident.id} •{" "}
                  {new Date(
                    incident.time
                  ).toLocaleString()}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    incident.severity ===
                    "Critical"
                      ? "bg-danger/20 text-danger"
                      : "bg-accent/20 text-accent"
                  }`}
                >
                  {incident.severity}
                </span>

                <span className="text-xs text-secondaryText capitalize">
                  {incident.status}
                </span>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}