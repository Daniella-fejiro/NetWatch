import express from "express";

import { getNotifications, getUnreadCount, markAsRead, markAllAsRead, deleteNotification, clearNotifications} from "../controllers/notificationController.js";

import { protect } from "../middlewares/userMiddleware.js";

const router = express.Router();

router.get("/", protect, getNotifications);

router.get("/unread-count", protect, getUnreadCount);

router.patch("/read-all", protect, markAllAsRead);

router.patch("/:id/read", protect,markAsRead);

router.delete("/:id", protect, deleteNotification);

router.delete("/", protect, clearNotifications);

export default router;