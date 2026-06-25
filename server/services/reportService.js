import PingLog from "../models/PingLog.js";
import Device from "../models/Device.js";

export const calculateUptime = async (
  deviceId,
  rangeHours = 24
) => {
  const since = new Date(
    Date.now() - rangeHours * 60 * 60 * 1000
  );

  const logs = await PingLog.find({
    deviceId,
    createdAt: { $gte: since },
  });

  if (!logs.length) {
    return {
      uptimePercent: 0,
      downtimeMinutes: 0,
      totalChecks: 0,
    };
  }

  const onlineCount = logs.filter(
    (log) => log.status === "Online"
  ).length;

  const uptimePercent =
    (onlineCount / logs.length) * 100;

  return {
    uptimePercent: Number(
      uptimePercent.toFixed(2)
    ),
    downtimeMinutes:
      logs.length - onlineCount,
    totalChecks: logs.length,
  };
};

export const getDeviceTimeline = async (
  deviceId,
  rangeHours = 6
) => {
  const since = new Date(
    Date.now() - rangeHours * 60 * 60 * 1000
  );

  const logs = await PingLog.find({
    deviceId,
    createdAt: { $gte: since },
  }).sort({ createdAt: 1 });

  return logs.map((log) => ({
    time: log.createdAt.toISOString(),
    status:
      log.status === "Online" ? 1 : 0,
    latency: log.responseTime || 0,
  }));
};

export const getSystemReport = async (
  userId,
  rangeHours = 24
) => {
  const since = new Date(
    Date.now() - rangeHours * 60 * 60 * 1000
  );

  const devices = await Device.find({
    user: userId,
  });

  const logs = await PingLog.find({
    user: userId,
    createdAt: { $gte: since },
  });

  const totalDevices = devices.length;

  let online = 0;
  let offline = 0;

  logs.forEach((log) => {
    if (log.status === "Online") online++;
    else offline++;
  });

  const averageUptime =
    logs.length > 0
      ? (online / logs.length) * 100
      : 0;

  const analytics = {
    averageUptime: Number(
      averageUptime.toFixed(2)
    ),
    totalDevices,
    totalIncidents: offline,
    mttr: "N/A",
  };

  const timelineMap = {};

  logs.forEach((log) => {
    const day = log.createdAt.toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
      }
    );

    if (!timelineMap[day]) {
      timelineMap[day] = 0;
    }

    if (log.status === "Offline") {
      timelineMap[day]++;
    }
  });

  const timeline = Object.entries(
    timelineMap
  ).map(([date, incidents]) => ({
    date,
    incidents,
  }));

  const incidentDistribution = [
    {
      name: "Online",
      value: online,
    },
    {
      name: "Offline",
      value: offline,
    },
  ];

  const deviceReports = [];

  for (const device of devices) {
    const deviceLogs = logs.filter(
      (log) =>
        log.deviceId.toString() ===
        device._id.toString()
    );

    const deviceOnline =
      deviceLogs.filter(
        (log) => log.status === "Online"
      ).length;

    const uptime =
      deviceLogs.length > 0
        ? (
            (deviceOnline /
              deviceLogs.length) *
            100
          ).toFixed(2)
        : 0;

    const incidents = deviceLogs.filter(
      (log) => log.status === "Offline"
    ).length;

    deviceReports.push({
      id: device._id,
      device: device.name,
      incidents,
      uptime: Number(uptime),
      type:device.type,
      downtime:deviceLogs.length - deviceOnline,

    });
  }

  deviceReports.sort(
    (a, b) => b.incidents - a.incidents
  );

  return {
    analytics,
    timeline,
    incidentDistribution,
    deviceReports,
  };
};