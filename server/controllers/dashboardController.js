import Device from "../models/Device.js";
import PingLog from "../models/PingLog.js";

const getLatestPingMap = async () => {
  const logs = await PingLog.find({})
    .sort({ createdAt: -1 });

  const map = new Map();

  for (const log of logs) {
    if (!map.has(log.deviceId.toString())) {
      map.set(log.deviceId.toString(), log);
    }
  }

  return map;
};

export const getDashboardOverview = async (req, res) => {
  try {
    const devices = await Device.find({});
    const latestMap = await getLatestPingMap();

    let online = 0;
    let offline = 0;
    let unknown = 0;

    for (const device of devices) {
      const ping = latestMap.get(device._id.toString());
      const status = ping?.status || "unknown";

      if (status === "online") online++;
      else if (status === "offline") offine++;
      else unknown++;
    }

    res.json({
      total: devices.length,
      online,
      offline,
      unknown
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getDashboardDevices = async (req, res) => {
  try {
    const devices = await Device.find({});
    const latestMap = await getLatestPingMap();

    const result = devices.map((device) => {
      const ping = latestMap.get(device._id.toString());

      return {
        id: device._id,
        name: device.name,
        ipAddress: device.ipAddress,
        port: device.port,
        status: ping?.status || "unknown",
        latency: ping?.latency || null,
        lastChecked: ping?.createdAt || null
      };
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getDashboardEvents = async (req, res) => {
  try {
    const logs = await PingLog.find({})
      .sort({ createdAt: -1 })
      .limit(30)
      .populate("deviceId", "name host port");

    const events = logs.map((log) => ({
      device: log.deviceId?.name,
      ipAddress: log.deviceId?.ipAddress,
      port: log.deviceId?.port,
      status: log.status,
      latency: log.latency,
      timestamp: log.createdAt
    }));

    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};