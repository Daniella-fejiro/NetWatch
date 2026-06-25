import cron from "node-cron";
import { monitorDevices } from "./monitoringService.js";

export const startMonitoring = (io) => {
  let isRunning = false;

    cron.schedule("* * * * *", async () => {
    if (isRunning) return;

    isRunning = true;

    try {
        console.log("Running Device Monitoring...");
        await monitorDevices(io);
    } finally {
        isRunning = false;
    }
    });
};