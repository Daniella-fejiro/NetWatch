import Notification from "../models/Notification.js";
import { getIO } from "../io.js";

export const createNotification = async ({
  userId,
  deviceId = null,
  title,
  message,
  type = "info",
}) => {
  try {
    const notification = await Notification.create({
      userId,
      deviceId,
      title,
      message,
      type,
    });

    const io = getIO();

    io.to(userId.toString()).emit(
      "new-notification",
      notification
    );

    return notification;
  } catch (error) {
    console.error(
      "Notification Creation Error:",
      error.message
    );

    throw error;
  }
};