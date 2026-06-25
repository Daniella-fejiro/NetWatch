
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MdClose,
  MdDeleteOutline,
  MdDone,
  MdNotificationsNone,
} from "react-icons/md";

export default function NotificationModal({
  isOpen,
  onClose,
  onCountChange,
}) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const updateUnreadCount = (data) => {
    const unreadCount = data.filter(
      (item) => !item.isRead
    ).length;

    onCountChange?.(unreadCount);
  };

  const fetchNotifications = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        "http://localhost:5000/api/notification",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      setNotifications(data);
      updateUnreadCount(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await fetch(
        `http://localhost:5000/api/notification/${id}/read`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotifications((prev) => {
        const updated = prev.map((item) =>
          item._id === id
            ? { ...item, isRead: true }
            : item
        );

        updateUnreadCount(updated);

        return updated;
      });
    } catch (error) {
      console.error(error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await fetch(
        "http://localhost:5000/api/notification/read-all",
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotifications((prev) => {
        const updated = prev.map((item) => ({
          ...item,
          isRead: true,
        }));

        updateUnreadCount(updated);

        return updated;
      });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNotification = async (id) => {
    try {
      await fetch(
        `http://localhost:5000/api/notification/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotifications((prev) => {
        const updated = prev.filter(
          (item) => item._id !== id
        );

        updateUnreadCount(updated);

        return updated;
      });
    } catch (error) {
      console.error(error);
    }
  };

  const clearNotifications = async () => {
    try {
      await fetch(
        "http://localhost:5000/api/notification",
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotifications([]);
      onCountChange?.(0);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed right-0 top-0 h-screen w-full sm:w-[420px] bg-surface border-l border-white/10 z-50 flex flex-col"
          >
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-primaryText">
                  Notifications
                </h2>

                <p className="text-xs text-secondaryText mt-1">
                  Network alerts and events
                </p>
              </div>

              <button
                onClick={onClose}
                className="text-secondaryText hover:text-primaryText"
              >
                <MdClose size={24} />
              </button>
            </div>

            {notifications.length > 0 && (
              <div className="flex gap-2 p-4 border-b border-white/10">
                <button
                  onClick={markAllAsRead}
                  className="flex-1 bg-accent hover:opacity-90 text-white py-2 rounded-xl text-sm font-medium"
                >
                  Mark All Read
                </button>

                <button
                  onClick={clearNotifications}
                  className="flex-1 bg-danger hover:opacity-90 text-white py-2 rounded-xl text-sm font-medium"
                >
                  Clear All
                </button>
              </div>
            )}

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-secondaryText">
                    Loading notifications...
                  </p>
                </div>
              ) : notifications.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <MdNotificationsNone
                    size={60}
                    className="text-secondaryText"
                  />

                  <p className="text-secondaryText mt-3">
                    No notifications available
                  </p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <motion.div
                    key={notification._id}
                    layout
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    className={`rounded-2xl border p-4 transition-all ${
                      notification.isRead
                        ? "border-white/10 bg-background"
                        : "border-accent/40 bg-accent/5"
                    }`}
                  >
                    <div className="flex justify-between gap-3">
                      <div className="flex-1">
                        <p className="text-primaryText font-medium">
                          {notification.message}
                        </p>

                        {notification.deviceId && (
                          <p className="text-xs text-secondaryText mt-2">
                            Device:{" "}
                            {notification.deviceId.name}
                          </p>
                        )}

                        <p className="text-xs text-secondaryText mt-2">
                          {new Date(
                            notification.createdAt
                          ).toLocaleString()}
                        </p>
                      </div>

                      <div className="flex flex-col gap-2">
                        {!notification.isRead && (
                          <button
                            onClick={() =>
                              markAsRead(
                                notification._id
                              )
                            }
                            className="text-success hover:scale-110 transition"
                          >
                            <MdDone size={20} />
                          </button>
                        )}

                        <button
                          onClick={() =>
                            deleteNotification(
                              notification._id
                            )
                          }
                          className="text-danger hover:scale-110 transition"
                        >
                          <MdDeleteOutline size={20} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

