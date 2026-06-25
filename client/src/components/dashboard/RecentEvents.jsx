import { motion } from "framer-motion";
import {
  MdRouter,
  MdWarningAmber,
  MdCheckCircle,
} from "react-icons/md";

const iconMap = {
  online: {
    icon: MdCheckCircle,
    color: "text-success",
    bg: "bg-success/10",
  },
  offline: {
    icon: MdWarningAmber,
    color: "text-danger",
    bg: "bg-danger/10",
  },
  unknown: {
    icon: MdRouter,
    color: "text-accent",
    bg: "bg-accent/10",
  },
};

export default function RecentEvents({ events = [] }) {
  return (
    <section className="bg-surface rounded-2xl p-4 border border-white/5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="font-heading text-lg text-primaryText">
            Recent Events
          </h2>

          <p className="text-secondaryText text-sm">
            Latest network activities
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-5 top-0 bottom-0 w-px bg-accent/20" />

        <div className="space-y-5">
          {events.map((event, index) => {
            const config =
              iconMap[event.status] ||
              iconMap.unknown;

            const Icon = config.icon;

            return (
              <motion.div
                key={`${event.device}-${index}`}
                initial={{
                  opacity: 0,
                  x: -15,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.08,
                }}
                className="relative flex gap-4"
              >
                <div
                  className={`relative z-10 h-10 w-10 rounded-full flex items-center justify-center ${config.bg}`}
                >
                  <Icon
                    className={`text-lg ${config.color}`}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-primaryText text-sm font-medium break-words">
                    {event.status === "online"
                      ? `${event.device} is online`
                      : `${event.device} is offline`}
                  </p>

                  <div className="flex flex-wrap gap-3 mt-1 text-xs text-secondaryText">
                    <span>{event.ipAddress} : {event.port}</span>

                    {event.latency && (
                      <span>
                        {event.latency} ms
                      </span>
                    )}

                    <span>
                      {new Date(
                        event.timestamp
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}