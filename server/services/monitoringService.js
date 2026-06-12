import net from "net";

import Device from "../models/Device.js";
import PingLog from "../models/PingLog.js";
import { getIO } from "../io.js";
import { createNotification } from "./notificationService.js";

// NEW: Incident model
import Incident from "../models/Incident.js";

const checkPort = (host, port, timeout = 5000) => {
  return new Promise((resolve) => {
    const startTime = Date.now();

    const socket = new net.Socket();

    socket.setTimeout(timeout);

    socket.on("connect", () => {
      const responseTime = Date.now() - startTime;

      socket.destroy();

      resolve({
        alive: true,
        responseTime,
      });
    });

    socket.on("timeout", () => {
      socket.destroy();

      resolve({
        alive: false,
        responseTime: 0,
      });
    });

    socket.on("error", () => {
      socket.destroy();

      resolve({
        alive: false,
        responseTime: 0,
      });
    });

    socket.connect(port, host);
  });
};

export const monitorDevices = async () => {
  try {
    const io = getIO();

    const devices = await Device.find();

    for (const device of devices) {
      let status = "Offline";
      let responseTime = 0;

      const oldStatus = device.status;

      try {
        const result = await checkPort(device.ipAddress, device.port);

        status = result.alive ? "Online" : "Offline";
        responseTime = result.responseTime;
      } catch {
        status = "Offline";
      }

      await PingLog.create({
        user: device.user,
        deviceId: device._id,
        status,
        responseTime,
      });

      console.log(device.ipAddress, device.port, status, responseTime);

      if (oldStatus !== status) {
        await Device.findByIdAndUpdate(device._id, {
          status,
        });

        console.log(
          `${device.name} (${device.ipAddress}:${device.port}) changed from ${oldStatus} to ${status}`
        );

        io.emit("device-status-changed", {
          deviceId: device._id,
          name: device.name,
          oldStatus,
          newStatus: status,
          responseTime,
        });

        if (status === "Offline") {
          await createNotification({
            userId: device.user,
            deviceId: device._id,
            title: "Device Offline",
            message: `${device.name} (${device.ipAddress}:${device.port}) is unreachable`,
            type: "critical",
          });

          const existingIncident = await Incident.findOne({
            device: device._id,
            type: "offline",
            isActive: true,
          });

          if (!existingIncident) {
            const incident = await Incident.create({
              device: device._id,
              type: "offline",
              severity: "high",
              message: `${device.name} is offline`,
              status: "open",
              firstOccurredAt: new Date(),
              lastOccurredAt: new Date(),
              occurrenceCount: 1,
              isActive: true,
            });

            io.emit("incident:new", incident);
          } else {
            existingIncident.lastOccurredAt = new Date();
            existingIncident.occurrenceCount += 1;
            existingIncident.status = "ongoing";

            await existingIncident.save();

            io.emit("incident:update", existingIncident);
          }
        }

        if (status === "Online") {
          await createNotification({
            userId: device.user,
            deviceId: device._id,
            title: "Device Restored",
            message: `${device.name} (${device.ipAddress}:${device.port}) is back online`,
            type: "success",
          });

          const incident = await Incident.findOne({
            device: device._id,
            type: "offline",
            isActive: true,
          });

          if (incident) {
            incident.status = "resolved";
            incident.resolvedAt = new Date();
            incident.isActive = false;

            await incident.save();

            io.emit("incident:resolved", incident);
          }
        }
      }
    }
  } catch (error) {
    console.error("Monitoring Error:", error.message);
  }
};