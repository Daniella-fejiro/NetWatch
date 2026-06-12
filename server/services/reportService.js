import PingLog from "../models/PingLog.js";

export const calculateUptime = async (deviceId, rangeHours = 24) => {
  const since = new Date(Date.now() - rangeHours * 60 * 60 * 1000);

  const logs = await PingLog.find({
    deviceId,
    createdAt: { $gte: since }
  });

  if (!logs.length) {
    return {
      uptimePercent: 0,
      downtimeMinutes: 0,
      totalChecks: 0
    };
  }

  let onlineCount = 0;

  for (const log of logs) {
    if (log.status === "online") onlineCount++;
  }

  const uptimePercent = (onlineCount / logs.length) * 100;
  const downtimeMinutes = (logs.length - onlineCount); // assuming 1 check = 1 min

  return {
    uptimePercent: Number(uptimePercent.toFixed(2)),
    downtimeMinutes,
    totalChecks: logs.length
  };
};

export const getDeviceTimeline = async (deviceId, rangeHours = 6) => {
  const since = new Date(Date.now() - rangeHours * 60 * 60 * 1000);

  const logs = await PingLog.find({
    deviceId,
    createdAt: { $gte: since }
  }).sort({ createdAt: 1 });

  return logs.map((log) => ({
    time: log.createdAt.toISOString(),
    status: log.status === "online" ? 1 : 0,
    latency: log.latency || 0
  }));
};

export const getSystemReport = async (rangeHours = 24) => {
  const since = new Date(Date.now() - rangeHours * 60 * 60 * 1000);

  const logs = await PingLog.find({
    createdAt: { $gte: since }
  });

  let online = 0;
  let offline = 0;

  for (const log of logs) {
    if (log.status === "online") online++;
    else offline++;
  }

  return {
    averageUptime: logs.length ? (online / logs.length) * 100 : 0,
    totalDowntimeEvents: offline,
    totalChecks: logs.length
  };
};