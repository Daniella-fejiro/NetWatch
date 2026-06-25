import { AnimatePresence, motion } from "framer-motion";
import { MdClose } from "react-icons/md";

import IncidentTimeline from "./IncidentTimeline";

export default function IncidentDetailsModal({
  open,
  incident,
  onClose,
}) {
  return (
    <AnimatePresence>
      {open && incident && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 z-40"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.25 }}
            className="fixed right-0 top-0 h-screen w-full md:w-[500px] bg-background border-l border-white/10 z-50 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl text-primaryText font-heading">
                  Incident Details
                </h2>

                <button onClick={onClose}>
                  <MdClose className="text-2xl text-primaryText" />
                </button>
              </div>

              <div className="mb-8">
                <h3 className="text-primaryText text-lg font-semibold">
                  {incident.title}
                </h3>

                <p className="text-secondaryText mt-3">
                  {incident.message}
                </p>
              </div>

              <IncidentTimeline incident={incident} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}