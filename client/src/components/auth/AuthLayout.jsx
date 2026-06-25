import { motion } from "framer-motion";
import { FaNetworkWired } from "react-icons/fa";

export default function AuthLayout({
  title,
  subtitle,
  children,
}) {
  return (
    <div className="min-h-screen bg-background flex">
      <div className="hidden lg:flex flex-1 border-r border-white/5 items-center justify-center p-10">
        <div className="max-w-md">
          <div className="flex items-center gap-3 mb-6">
            <FaNetworkWired className="text-accent text-4xl" />

            <h1 className="text-primaryText font-heading text-4xl">
              NetWatch
            </h1>
          </div>

          <h2 className="text-primaryText text-3xl font-bold mb-4">
            Network Visibility Starts Here
          </h2>

          <p className="text-secondaryText leading-relaxed">
            Monitor devices, track incidents,
            analyze uptime reports and gain
            complete visibility across your
            network infrastructure from a
            single dashboard.
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="w-full max-w-md"
        >
          <div className="mb-8">
            <h2 className="text-primaryText font-heading text-3xl mb-2">
              {title}
            </h2>

            <p className="text-secondaryText">
              {subtitle}
            </p>
          </div>

          {children}
        </motion.div>
      </div>
    </div>
  );
}