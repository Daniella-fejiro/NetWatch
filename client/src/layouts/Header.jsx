
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  MdNotificationsNone,
  MdKeyboardArrowDown,
  MdMenu,
} from "react-icons/md";
import { FaCircle } from "react-icons/fa";
import NotificationModal from "./NotifictionModal";

export default function Header({ onMenuClick }) {
  const [user, setUser] = useState(null);
  const [notificationCount, setNotificationCount] =
    useState(0);
  const [showNotifications, setShowNotifications] =
    useState(false);

  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) return;

        const [profileRes, notificationRes] =
          await Promise.all([
            fetch(
              "http://localhost:5000/api/auth/profile",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            ),
            fetch(
              "http://localhost:5000/api/notification/unread-count",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            ),
          ]);

        if (profileRes.ok) {
          const profileData = await profileRes.json();
          setUser(profileData.user);
        }

        if (notificationRes.ok) {
          const notificationData =
            await notificationRes.json();

          setNotificationCount(
            notificationData.count || 0
          );
        }
      } catch (error) {
        console.error(
          "Failed to fetch header data:",
          error
        );
      }
    };

    fetchHeaderData();
  }, []);

  const initials = user?.username
    ? user.username
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "NA";

  return (
    <>
      <header className="sticky top-0 z-30 h-20 bg-surface/90 backdrop-blur-xl border-b border-white/10">
        <div className="h-full px-4 md:px-8 flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-3 md:gap-4">
            <button
              onClick={onMenuClick}
              className="lg:hidden shrink-0 w-11 h-11 rounded-xl bg-background border border-white/10 flex items-center justify-center text-primaryText"
            >
              <MdMenu size={22} />
            </button>

            <div>
              <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-lg sm:text-xl md:text-2xl font-heading font-bold text-primaryText"
              >
                Dashboard
              </motion.h1>

              <div className="flex items-center gap-2 mt-1">
                <FaCircle
                  size={8}
                  className="text-success animate-pulse"
                />

                <span className="hidden sm:block text-xs text-secondaryText">
                  Monitoring services running
                </span>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Notification */}
            <motion.button
              onClick={() =>
                setShowNotifications(true)
              }
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-11 h-11 md:w-12 md:h-12 rounded-2xl bg-background border border-white/10 flex items-center justify-center text-secondaryText hover:text-accent hover:border-accent/40 transition-all duration-300"
            >
              <MdNotificationsNone size={24} />

              {notificationCount > 0 && (
                <>
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring" }}
                    className="absolute -top-1 -right-1 min-w-[20px] h-[20px] md:min-w-[22px] md:h-[22px] px-1 rounded-full bg-danger text-white text-[10px] md:text-xs font-semibold flex items-center justify-center"
                  >
                    {notificationCount}
                  </motion.span>

                  <motion.div
                    animate={{
                      scale: [1, 1.8, 1],
                      opacity: [0.6, 0, 0.6],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                    }}
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-danger"
                  />
                </>
              )}
            </motion.button>

            {/* User Card */}
            <motion.button
              whileHover={{ y: -2 }}
              className="group flex items-center gap-2 md:gap-3 bg-background border border-white/10 hover:border-accent/40 px-2 md:px-3 py-2 rounded-2xl transition-all duration-300"
            >
              <div className="relative">
                <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-accent/10 flex items-center justify-center text-accent font-bold">
                  {initials}
                </div>

                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-success border-2 border-surface" />
              </div>

              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold text-primaryText">
                  {user?.username || "Loading..."}
                </p>

                <p className="text-xs text-secondaryText">
                  Network Admin
                </p>
              </div>

              <MdKeyboardArrowDown
                size={18}
                className="hidden sm:block text-secondaryText group-hover:text-accent transition"
              />
            </motion.button>
          </div>
        </div>
      </header>

      <NotificationModal
        isOpen={showNotifications}
        onClose={() =>
          setShowNotifications(false)
        }
        onCountChange={setNotificationCount}
      />
    </>
  );
}

